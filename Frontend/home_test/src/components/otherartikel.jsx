"use client";
import { Getallitem } from "@/app/API/Route";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // Import next/link untuk navigasi
import { usePathname } from "next/navigation";

export default function OtherArtikel({ jumm }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = jumm;
  const [error, setError] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const loadProduckt = async () => {
      try {
        const response = await Getallitem();

        if (!response.ok) {
          throw new Error(
            `Failed to load product: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    loadProduckt();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  if (error) return <div>Error: {error}</div>; // Menampilkan error jika ada masalah
  if (!data.length) return <div>Loading...</div>; // Menunggu data produk

  return (
    <main>
      <section className="w-full min-h-screen bg-white flex flex-col items-center px-4">
        {/* Menampilkan informasi jumlah item hanya di root */}
        {pathname === "/" && (
          <p className="text-gray-600 flex text-sm w-full text-left pl-4 mb-4">
            Showing : {currentItems.length} of {data.length} items
          </p>
        )}

        {/* Grid Artikel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {currentItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <p className="text-gray-600 font-medium text-xs">{item.date}</p>
                <h4 className="font-bold text-sm">
                  <Link
                    href={`/articles/${item.id}`}
                    className="hover:underline"
                  >
                    {item.title}
                  </Link>
                </h4>
                <p className="text-gray-600 text-xs">{item.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {item.tags}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-gray-600 disabled:opacity-50"
          >
            &lt; Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 ${
                currentPage === i + 1 ? "border border-black rounded-md" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-gray-600 disabled:opacity-50"
          >
            Next &gt;
          </button>
        </div>
      </section>
    </main>
  );
}
