"use client";
import Image from "next/image";
import Link from "next/link";
import Navbaradmin from "@/components/navbaradmin";
import Navtop from "@/components/navtopadmin";
import { Getallitem } from "@/app/API/Route";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Kategori() {
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
  if (error) return <div>Error: {error}</div>; // Menampilkan error jika ada masalah
  if (!data.length) return <div>Loading...</div>; // Menunggu data produk
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <main className="flex">
      <Navbaradmin />
      <section className="w-full lg:h-[73rem] xl:h-[75rem]  flex-1  bg-gray-50 flex flex-col items-center px-4">
        <Navtop />
        <div className="w-full h-[70rem] xl:h-[60rem] mb-14 rounded-md bg-slate-200 border  flex flex-col mt-20 ">
          <section className="w-full  p-[24px] gap-[10px] rounded-t-md bg-gray-50  border border-slate-200 flex text-base font-medium text-slate-800 ">
            <span>Total Category : {data.length} </span>
          </section>

          <section className="w-full p-[24px] gap-[10px] bg-gray-50 border border-slate-200 flex text-base font-medium">
            <div className="flex-1 max-w-52 bg-white flex items-center rounded-md">
              <Input
                type="text"
                placeholder="Search Category"
                iconSrc="/img/search.png"
                iconAlt="Search Icon"
              />
            </div>
            <div className="flex items-center justify-end ml-auto gap-2 cursor-pointer">
              <button className="bg-blue-600 text-slate-50 text-sm font-medium rounded-md px-4 py-2 flex items-center gap-2">
                <Image
                  src="/img/plus.png"
                  alt="tambah"
                  width={20}
                  height={20}
                />
                <Addkategori />
              </button>
            </div>
          </section>

          <section className="px-[20px] pt-[10px] gap-[10px] mb-5 border border-slate-200 flex items-center text-base font-medium">
            <table className="w-full table-fixed">
              <thead className="sticky top-0  z-10">
                <tr className="text-slate-900 text-sm border-b border-slate-200 font-medium">
                  <th className="px-4 py-2 text-center">Category</th>
                  <th className="px-4 py-2 text-center">Created at</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 border-t border border-slate-200 ">
                {currentItems.map((item, index) => (
                  <tr className="border border-slate-200 mb-2 " key={index}>
                    <td className="p-[24px] text-center">{item.category}</td>

                    <td className="px-4  text-center">{item.date}</td>
                    <td className="px-4  text-center">
                      <div className="flex items-center gap-5 justify-center">
                        <Edit />
                        <DeleteButton />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="w-full mb-5 p-[24px] gap-[10px] bg-gray-50 border rounded-b-md border-slate-200 flex justify-center items-end text-base font-medium mb">
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
    <>
      <AlertDialog>
        <AlertDialogTrigger className="underline text-sm cursor-pointer text-red-600 flex items-center ">
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Delete category “Technology”? This will remove it from master data
              permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function Addkategori() {
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();

    // Cek apakah input kosong
    if (!category) {
      setError("Category field cannot be empty");

      // Menghapus pesan error setelah 1 detik
      setTimeout(() => {
        setError("");
      }, 1000);
    } else {
      setError("");
      // Logika untuk menambahkan kategori atau aksi lainnya
      console.log("Category added:", category);
      // Reset input jika berhasil
      setCategory("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-sm cursor-pointer text-gray-50 flex items-center">
          Add Category
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900">
            Add Category
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2 ml-4">
            <label className="text-sm font-semibold text-slate-900">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-[2.5rem] bg-white border border-slate-200 rounded-md px-3"
              placeholder="Input category..."
            />
            {error && (
              <span className="text-red-600 text-xs mt-1">{error}</span>
            )}
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-row justify-center">
            <Button
              type="submit"
              onClick={handleAddCategory}
              className="bg-blue-600 border hover:bg-blue-800"
            >
              Add
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function Edit() {
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();

    // Cek apakah input kosong
    if (!category) {
      setError("Category field cannot be empty");

      // Menghapus pesan error setelah 1 detik
      setTimeout(() => {
        setError("");
      }, 1000);
    } else {
      setError("");
      // Logika untuk menambahkan kategori atau aksi lainnya
      console.log("Category added:", category);
      // Reset input jika berhasil
      setCategory("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-sm  underline cursor-pointer text-blue-600 flex items-center">
          Edit
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900">
            Edit Category
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2 ml-4">
            <label className="text-sm font-semibold text-slate-900">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-[2.5rem] bg-white border border-slate-200 rounded-md px-3"
              placeholder="Input category..."
            />
            {error && (
              <span className="text-red-600 text-xs mt-1">{error}</span>
            )}
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-row justify-center">
            <Button
              type="submit"
              onClick={handleAddCategory}
              className="bg-blue-600 border hover:bg-blue-800"
            >
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
