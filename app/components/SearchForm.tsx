// // app/components/SearchForm.tsx

"use client";
// import Image from "next/image";
// import { useState } from "react";

// interface Product {
//   image: string;
//   name: string;
//   price: string;
//   inStock: boolean;
//   shippedFrom: string;
//   link: string;
//   rating?: number; // Make rating optional if it might not be provided
// }

// interface SearchResponse {
//   products: Product[];
// }

// export default function SearchForm() {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [results, setResults] = useState<Product[]>([]);
//   const [error, setError] = useState<string | null>(null); // Add error state

//   // Make the function async since it uses 'await'
//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null); // Reset error state

//     try {
//       // Static data for testing
//       // const staticData: SearchResponse = {
//       //   products: [
//       //     {
//       //       image: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/12/3747141/1.jpg?4481",
//       //       name: "Hp Stream 11 Intel Celeron 2GB RAM- 32GB HDD WIN 10",
//       //       price: "₦ 140,000",
//       //       inStock: true,
//       //       shippedFrom: "Nigeria",
//       //       link: "https://www.jumia.com.ng/hp-stream-11-intel-celeron-2gb-ram-32gb-hdd-win-10-141747321.html",
//       //       rating: 4.8,
//       //     },
//       //   ],
//       // };
//       // setResults(staticData.products);
//       //static data for testing ends
      
//       // Uncomment when using live data
//       const res = await fetch(`/api/search?term=${searchTerm}`);
//       if (!res.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const data: SearchResponse = await res.json();
//       console.log('Fetched data:', data);
//       setResults(data.products || []);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("An unexpected error occurred");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10">
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border p-2 rounded w-full"
//           placeholder="Search for a product..."
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded mt-2"
//         >
//           Search
//         </button>
//       </form>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
//       <div className="mt-5">
//         {results.length === 0 && !loading && !error && <p>No results found.</p>} {/* Show message when no results */}
//         {results.map((product, index) => (
//           <div key={index} className="p-2 border rounded mb-2">
//             <Image src={product.image} alt={product.name} width={500} height={500} className="w-full h-64 object-cover" />
//             <p><strong>Name:</strong> {product.name}</p>
//             <p><strong>Price:</strong> {product.price}</p>
//             <p><strong>Availability:</strong> {product.inStock ? "In stock" : "Out of stock"}</p>
//             <p><strong>Shipped From:</strong> {product.shippedFrom}</p>
//             {product.rating !== undefined && <p><strong>Rating:</strong> {product.rating}</p>} {/* Conditionally render rating */}
//             <a href={product.link} className="text-blue-500" target="_blank" rel="noopener noreferrer">View Product</a> {/* Link to product */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




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
          className="border p-2 rounded w-full"
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
