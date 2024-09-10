import puppeteer from 'puppeteer';

interface Product {
  image: string;
  name: string;
  price: string;
  inStock: boolean;
  shippedFrom: string;
  link: string;
  rating?: number;
}

export const scrapeJumiaCatalog = async (searchTerm: string): Promise<Product[]> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the Jumia search results page
  await page.goto(`https://www.jumia.com.ng/catalog/?q=${encodeURIComponent(searchTerm)}`);

  // Wait for the catalog to load
  await page.waitForSelector('div[data-catalog="true"]');

  // Extract product data
  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll('div[data-catalog="true"] article.prd');
    return Array.from(productElements).map((element) => {
      const image = element.querySelector('img')?.getAttribute('data-src') || '';
      const name = element.querySelector('.name')?.textContent?.trim() || '';
      const price = element.querySelector('.prc')?.textContent?.trim() || '';
      const link = element.querySelector('.core')?.getAttribute('href') || '';
      const rating = parseFloat(element.querySelector('.rev .stars')?.textContent?.trim() || '');
      console.log('Extracted link:', link);


      const cleanLink = link
        .replace(/%20%7C%7C%20#$/, '') // Remove trailing %20%7C%7C%20#
        .replace(/%20$/, ''); // Remove trailing %20


      return {
        image,
        name,
        price,
        inStock: price !== '', // Check if price is available to determine stock
        shippedFrom: 'Nigeria', // Default value since it is not available in the provided HTML
        link: `${cleanLink}`, // Construct full URL
        rating: isNaN(rating) ? undefined : rating, // Use undefined if rating is not a number
      };
    });
  });

  await browser.close();
  return products;
};
