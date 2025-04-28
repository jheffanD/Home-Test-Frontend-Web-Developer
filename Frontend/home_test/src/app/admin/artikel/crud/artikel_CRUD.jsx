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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ArtikelCrud() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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

  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>Loading...</div>;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  return (
    <main className="flex flex-col lg:flex-row">
      <Navbaradmin />
      <section className="w-full lg:w-[calc(100%-240px)] h-[73rem] xl:h-[65rem] flex-1 bg-gray-50 flex flex-col items-center px-4">
        {/* Hide Navtop on mobile and show on larger screens */}
        <div className="lg:block hidden">
          <Navtop />
        </div>

        <div className="w-full h-auto xl:h-[60rem] mb-14 rounded-md bg-slate-200 border flex flex-col mt-20">
          <section className="w-full p-[24px] gap-[10px] rounded-t-md bg-gray-50 border border-slate-200 flex text-base font-medium text-slate-800">
            <span>Total Articles : {data.length}</span>
          </section>

          <section className="w-full p-[24px] gap-[10px] bg-gray-50 border border-slate-200 flex flex-col sm:flex-row sm:justify-between items-center">
            {/* Category Dropdown */}
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <Select className="w-full">
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Technology</SelectItem>
                  <SelectItem value="dark">Design</SelectItem>
                  <SelectItem value="system">AI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Input */}
            <div className="w-full sm:w-auto flex-1 max-w-[250px] sm:max-w-[400px] bg-white flex items-center rounded-md mb-4 sm:mb-0">
              <Input
                type="text"
                placeholder="Search by title"
                iconSrc="/img/search.png"
                iconAlt="Search Icon"
              />
            </div>

            {/* Add Artikel Button */}
            <div className="w-full sm:w-auto flex items-center justify-center sm:ml-4">
              <button className="bg-blue-600 text-slate-50 text-sm font-medium rounded-md px-4 py-2 flex items-center gap-2">
                <Image
                  src="/img/plus.png"
                  alt="tambah"
                  width={20}
                  height={20}
                />
                <Link href="/admin/artikel/up">Add Article</Link>
              </button>
            </div>
          </section>

          {/* Table Section */}
          <section className="px-[24px] pt-[10px] gap-[10px] mb-5 border border-slate-200 flex items-center text-base font-medium">
            <div className="overflow-x-auto w-full">
              <table className="min-w-full table-fixed">
                <thead>
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
                    <tr className="border border-slate-200 mb-2" key={index}>
                      <td className="px-4 py-2 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt="Thumbnail"
                          width={60}
                          height={60}
                          className="rounded-sm border border-slate-600"
                        />
                      </td>
                      <td className="px-4 text-left">{item.title}</td>
                      <td className="px-4 text-center">{item.category}</td>
                      <td className="px-4 text-center">{item.date}</td>
                      <td className="px-4 text-center">
                        <div className="flex items-center justify-center space-x-4">
                          <button className="text-blue-600 underline text-sm cursor-pointer">
                            <Link href="#">Preview</Link>
                          </button>
                          <button className="text-blue-600 underline text-sm cursor-pointer">
                            <Link href={`/admin/artikel/edit/${item.id}`}>
                              Edit
                            </Link>
                          </button>
                          <DeleteButton />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Pagination Section */}
          <section className="w-full mb-5 p-[24px] gap-[10px] bg-gray-50 border border-slate-200 flex justify-center items-end text-base font-medium">
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

function DeleteButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="underline text-sm cursor-pointer text-red-600">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Articles</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this article is permanent and cannot be undone. All related
            content will be removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
