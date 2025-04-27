"use client";

import Image from "next/image";
import debounce from "lodash.debounce";
import { useState, useEffect } from "react";
export default function section1() {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Debounced version of fetchArticles
  const fetchArticlesDebounced = debounce(async (query) => {
    if (query) {
      try {
        const response = await Viewitem(query); // Ganti dengan API pencarian artikel yang sesuai
        setArticles(response); // Asumsikan response adalah array artikel
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    } else {
      setArticles([]); // Kosongkan hasil artikel jika query kosong
    }
  }, 500); // Debounce dengan delay 500ms

  // Memanggil pencarian artikel ketika query berubah
  useEffect(() => {
    fetchArticlesDebounced(searchQuery);

    // Cleanup debounce on unmount
    return () => {
      fetchArticlesDebounced.cancel();
    };
  }, [searchQuery]);

  return (
    <main>
      <section className="w-full min-h-screen bg-blue-600 relative flex flex-col items-center justify-center text-white px-4">
        {/* Background Image */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Image
            src="/img/back.jpg" // Ganti dengan path gambar Anda
            alt="Background"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Blue Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-75 z-10"></div>

        {/* Text Section */}
        <div className="text-center max-w-2xl z-20 relative">
          <p className="mb-2 text-sm">Blog genzet</p>
          <h1 className="text-4xl  font-bold leading-tight mb-4">
            The Journal : Design Resources, <br /> Interviews, and Industry News
          </h1>
          <p className="text-base ">Your daily dose of design insights!</p>
        </div>

        {/* Search Section */}
        <div className=" max-w-xl mt-8 px-2 flex flex-row justify-center items-center gap-4 bg-blue-500 h-14 w-[30rem] rounded-lg z-20 relative font-normal">
          {/* Select Category */}
          <select className="w-40  bg-white text-black p-2 pr-2 rounded-md outline-none">
            <option>Select category</option>
            <option>Design</option>
            <option>Interview</option>
            <option>News</option>
          </select>

          {/* Search Bar */}
          <div className="flex-1 bg-white flex items-center rounded-md overflow-hidden">
            <Image
              src="/img/search.png" // Ganti dengan path gambar Anda
              alt="Search Icon"
              width={18}
              height={18}
              className="ml-2"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search articles"
              className="w-full py-2 px-4 rounded-md outline-none text-black"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
