"use client";
import Navbaradmin from "@/components/navbaradmin";
import Navtop from "@/components/navtopadmin";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ArtikelUpload() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [kategori, setKategori] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!image) newErrors.image = "Please select a thumbnail.";
    if (!title) newErrors.title = "Please enter a title.";
    if (!kategori || kategori === "Select category") newErrors.kategori = "Please select a category.";
    if (!content) newErrors.content = "Content field cannot be empty.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Article uploaded successfully!");
      // lanjut ke proses upload ke server
    }
  };

  return (
    <main className="flex">
      <Navbaradmin />
      <section className="min-h-screen flex-1 bg-gray-50 flex flex-col items-center px-4">
        <Navtop />
        <form
          onSubmit={handleSubmit}
          className="w-full h-[58rem] mb-20 rounded-md bg-slate-100 border flex flex-col mt-20"
        >
          {/* Grup pertama */}
          <section className="w-full p-[24px] gap-[10px] flex">
            <Image src="/img/left.png" alt="Logo" width={20} height={20} />
            <label className="text-base font-medium text-slate-900">
              Create Articles
            </label>
          </section>

          {/* Grup kedua */}
          <section className="w-full p-[24px] gap-[10px] flex flex-col">
            {/* Thumbnail */}
            <label className="text-sm font-medium text-gray-900 mb-2">Thumbnails</label>
            <div className="border-2 w-52 h-52 p-4 border-dashed bg-white border-gray-300 rounded-xl flex flex-col items-center justify-center mb-2">
              <label className="cursor-pointer text-slate-500 flex flex-col items-center text-center">
                <Image src="/img/ima.png" alt="Logo" width={20} height={20} />
                <p className="mt-1 text-xs font-normal text-gray-600">
                  Click to select files
                </p>
                <p className="text-xs font-normal text-gray-400">
                  Support File Type: .jpg or .png
                </p>
                <input
                  onChange={(e) => setImage(e.target.value)}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
              {errors.image && <span className="text-xs text-red-500">{errors.image}</span>}

            {/* Title */}
            <div>
              <label className="text-sm font-medium text-gray-900 mb-2">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Input title"
                className="border w-full border-slate-200 rounded-md p-2 bg-white"
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
            </div>

            {/* Category */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-900 mb-2">Category</label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full border bg-white border-slate-200 rounded-md p-2"
              >
                <option>Select category</option>
                <option>Technology</option>
                <option>Education</option>
                <option>Culture</option>
              </select>
              {errors.kategori && <p className="text-xs text-red-500">{errors.kategori}</p>}
              <p className="text-sm text-gray-500 mt-1">
                The existing category list can be seen in the{" "}
                <span className="text-blue-600 cursor-pointer">category</span> menu
              </p>
            </div>

            {/* Content */}
            <div>
              <div className="bg-white rounded-t-md p-2">
                <Image src="/img/text.png" alt="Logo" width={244} height={18} />
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type a content..."
                className="w-full h-48 bg-white rounded-b-md p-3 resize-none"
              ></textarea>
              {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
              <p className="text-sm text-gray-500 mt-1 text-left">0 Words</p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                className="px-6 py-3 rounded-md bg-white border-slate-200 text-slate-900 hover:bg-slate-200"
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="px-6 py-3 rounded-md bg-slate-200 border-slate-500 hover:bg-slate-500 text-slate-900"
              >
                Preview
              </Button>
              <Button
                type="submit"
                className="px-6 py-3 rounded-md bg-blue-600 border-blue-900 hover:bg-blue-900 text-slate-50"
              >
                Upload
              </Button>
            </div>
          </section>
        </form>
      </section>
    </main>
  );
}
