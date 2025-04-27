"use client";
import Navbaradmin from "@/components/navbaradmin";
import Navtop from "@/components/navtopadmin";
import { Getallitem } from "@/app/API/Route";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ArtikelCrud() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [error, setError] = useState(null);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
  if (error) return <div>Error: {error}</div>; // Menampilkan error jika ada masalah
  if (!data.length) return <div>Loading...</div>; // Menunggu data produk
  const totalPages = Math.ceil(data.length / itemsPerPage);
  return (
    <main className="flex">
      <Navbaradmin />
      <section className="min-h-screen flex-1  bg-gray-50 flex flex-col items-center px-4">
        <Navtop />
        <div className="w-full h-[47rem] mb-14 rounded-md bg-slate-200 border  flex flex-col mt-20 ">
          {/* ini pertama */}
          <section className="w-full  p-[24px] gap-[10px] rounded-t-md bg-gray-50  border border-slate-200 flex text-base font-medium text-slate-800 ">
            <span>Total Articles : 25</span>
          </section>
          {/* ini kedua */}
          <section className="w-full p-[24px] gap-[10px] bg-gray-50 border border-slate-200 flex text-base font-medium">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1 max-w-52 bg-white flex items-center rounded-md">
              <Input
                type="text"
                placeholder="Search by title"
                iconSrc="/img/search.png"
                iconAlt="Search Icon"
              />
            </div>
            <div className="flex items-center justify-end ml-auto">
              <button className="bg-blue-600 text-slate-50 text-sm font-medium rounded-md px-4 py-2 flex items-center gap-2">
                <Image
                  src="/img/plus.png"
                  alt="tambah"
                  width={20}
                  height={20}
                />
                Add Article
              </button>
            </div>
          </section>

          {/* ini ke tiga */}
          <section className="w-full  px-[24px] pt-[10px] gap-[10px] mb-5 border border-slate-200 flex items-center text-base font-medium">
            <table className="w-full table-fixed">
              <thead className="sticky top-0  z-10">
                <tr className="text-slate-900 text-sm border-b border-slate-200 font-medium">
                  <th className="px-4 py-2 text-center">Thumbnails</th>
                  <th className="px-4 py-2 text-center">Title</th>
                  <th className="px-4 py-2 text-center">Category</th>
                  <th className="px-4 py-2 text-center">Created at</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 border-t border border-slate-200">
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt="Thumbnail"
                        width={60}
                        height={60}
                        className="rounded-sm border border-slate-600"
                      />
                    </td>
                    <td className="px-4  text-left">{item.title}</td>
                    <td className="px-4 text-center">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="mr-2">
                          {tag},
                        </span>
                      ))}
                    </td>

                    <td className="px-4  text-center">{item.date}</td>
                    <td className="px-4  text-center">
                      <button className=" text-blue-600 underline rounded-md px-2 py-1 text-sm cursor-pointer">
                        <Link href="#">
                          <span>Priview</span>
                        </Link>
                      </button>
                      <button className=" text-blue-600 underline rounded-md px-2 py-1 text-sm cursor-pointer">
                        <Link href="#">
                          <span>Edit</span>
                        </Link>
                      </button>
                      <button className=" text-red-600 underline rounded-md px-2 py-1 text-sm cursor-pointer">
                        <Link href="#">
                          <span>Edit</span>
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="w-full mb-5 p-[24px] gap-[10px] bg-gray-50 border border-slate-200 flex justify-center items-center text-base font-medium">
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-gray-600 disabled:opacity-50 min-w-[80px] text-center"
              >
                &lt; Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 min-w-[40px] text-center ${
                    currentPage === i + 1
                      ? "bg-transparent border-2 border-black rounded-md"
                      : "border-2 border-transparent"
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
                className="px-4 py-2 text-gray-600 disabled:opacity-50 min-w-[80px] text-center"
              >
                Next &gt;
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
