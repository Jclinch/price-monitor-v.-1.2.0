// // app/components/SearchForm.tsx

"use client";

import Image from "next/image";
import { useState } from "react";

interface Product {
  image: string;
  name: string;
  price: string;
  inStock: boolean;
  shippedFrom: string;
  link: string;
  rating?: number;
}

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Adjust API request or use static data for testing
      const res = await fetch(`/api/search?term=${searchTerm}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setResults(data.products || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full text-black"
          placeholder="Search for a product..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-5">
        {results.length === 0 && !loading && !error && <p>No results found.</p>}
        {results.map((product, index) => (
          <div key={index} className="p-2 border rounded mb-2">
            <Image src={product.image} alt={product.name} width={500} height={500} className="w-full h-64 object-cover" />
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> {product.price}</p>
            <p><strong>Availability:</strong> {product.inStock ? "In stock" : "Out of stock"}</p>
            <p><strong>Shipped From:</strong> {product.shippedFrom}</p>
            {product.rating !== undefined && <p><strong>Rating:</strong> {product.rating}</p>}
            <a href={`https://www.jumia.com.ng${product.link} || #`} className="text-blue-500" target="_blank" rel="noopener noreferrer">View Product</a>
          </div>
        ))}
      </div>
    </div>
  );
}
