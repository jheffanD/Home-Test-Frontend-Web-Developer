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
        <div className="flex flex-col md:flex-row items-center justify-between mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-gray-600 disabled:opacity-50 transition duration-200 ease-in-out hover:bg-gray-200 rounded-md"
          >
            &lt; Previous
          </button>

          <div className="flex items-center gap-2 mt-2 md:mt-0">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-sm md:text-base transition duration-200 ease-in-out ${
                  currentPage === i + 1
                    ? "border border-black rounded-md bg-gray-200"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-gray-600 disabled:opacity-50 transition duration-200 ease-in-out hover:bg-gray-200 rounded-md"
          >
            Next &gt;
          </button>
        </div>
      </section>
    </main>
  );
}
