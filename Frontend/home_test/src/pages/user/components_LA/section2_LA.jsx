"use client";
import { Getallitem } from "@/app/API/Route";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // Import next/link untuk navigasi
import OtherArtikel from "@/components/otherartikel";

export default function section2() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [error, setError] = useState(null);

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
      <OtherArtikel jumm={9} />
    </main>
  );
}
