
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
