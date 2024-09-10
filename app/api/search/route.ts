// import { NextResponse } from "next/server";
// import axios from "axios";
// import * as cheerio from "cheerio";

// interface Product {
//   image: string;
//   name: string;
//   price: string;
//   inStock: boolean;
//   shippedFrom: string;
//   link: string;
//   rating: number;
// }

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const searchTerm = searchParams.get("term") || "";

//   const url = `https://www.jumia.com.ng/catalog/?q=${encodeURIComponent(
//     searchTerm
//   )}`;

//   try {
//     const { data: html } = await axios.get(url);
//     const $ = cheerio.load(html);

//     const products: Product[] = [];
//     $(".sku").each((_index, element) => {
//       const image = $(element).find("img").attr("data-src") || "";
//       const name = $(element).find(".name").text().trim();
//       const price = $(element).find(".prc").text().trim();
//       const inStock = $(element)
//         .find(".-fs12")
//         .text()
//         .toLowerCase()
//         .includes("in stock");
//       const shippedFrom = $(element).find(".-fs12").text().trim();
//       const ratingText = $(element).find(".stars").text().trim();
//       const rating = ratingText
//         ? parseFloat(ratingText.match(/(\d+(\.\d+)?)/)?.[0] || "0")
//         : 0;
//       const link =
//         "https://www.jumia.com.ng" + $(element).find(".core").attr("href");

//       products.push({ image, name, price, link, inStock, shippedFrom, rating });
//     });
//     return NextResponse.json({ products });
//   } catch (error) {
//     console.error("Error scraping Jumia", error);
//     return NextResponse.json({ products: [] }, { status: 500 });
//   }
// }



import { NextResponse } from 'next/server';
import { scrapeJumiaCatalog } from '../../../scripts/scrapeJumiaCatalog'; // Adjust path as needed

export async function GET(request: Request) {
  const url = new URL(request.url);
  const term = url.searchParams.get('term') || '';

  try {
    const products = await scrapeJumiaCatalog(term);
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ products: [] });
  }
}
