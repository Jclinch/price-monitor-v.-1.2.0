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
    <div className="max-w-7xl mx-auto mt-10 p-5">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex flex-col items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full max-w-lg text-black"
          placeholder="Search for a product..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-2 max-w-lg w-full"
        >
          Search
        </button>
      </form>

      {/* Loading and Error Messages */}
      {loading && <p className="mt-5 text-center">Loading...</p>}
      {error && <p className="text-red-500 mt-5 text-center">{error}</p>}

      {/* Results */}
      <div className="mt-10">
        {results.length === 0 && !loading && !error && (
          <p className="text-center">No results found.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <p className="font-bold text-lg">{product.name}</p>
                <p>
                  <strong>Price:</strong> {product.price}
                </p>
                <p>
                  <strong>Availability:</strong>{" "}
                  {product.inStock ? "In stock" : "Out of stock"}
                </p>
                <p>
                  <strong>Shipped From:</strong> {product.shippedFrom}
                </p>
                {product.rating !== undefined && (
                  <p>
                    <strong>Rating:</strong> {product.rating}
                  </p>
                )}
                <a
                  href={`https://www.jumia.com.ng${product.link}`}
                  className="text-blue-500 underline mt-2 block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Product
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}