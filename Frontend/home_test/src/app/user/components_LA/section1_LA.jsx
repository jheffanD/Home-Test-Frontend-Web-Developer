"use client";

import Image from "next/image";
import { useRef } from "react";

import { useState, useEffect } from "react";
export default function section1() {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const timeoutRef = useRef(null);

  const fetchArticlesDebounced = (query) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      if (query) {
        try {
          const response = await Viewitem(query);
          setArticles(response);
        } catch (error) {
          console.error("Error fetching articles:", error);
        }
      } else {
        setArticles([]);
      }
    }, 500);
  };

  useEffect(() => {
    fetchArticlesDebounced(searchQuery);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery]);

  return (
    <main>
      <section className="w-full min-h-screen bg-blue-600 relative flex flex-col items-center justify-center text-white px-4">
        {/* Background Image */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Image
            src="/img/back.jpg"
            alt="Background"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Blue Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-75 z-10"></div>

        {/* Text Content */}
        <div className="text-center max-w-2xl z-20 relative">
          <p className="mb-2 text-sm">Blog genzet</p>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            The Journal : Design Resources, <br /> Interviews, and Industry News
          </h1>
          <p className="text-base">Your daily dose of design insights!</p>
        </div>

        {/* Search and Category Section */}
        <div className="max-w-xl mt-8 px-2 flex flex-col sm:flex-row justify-center items-center gap-4 bg-blue-500 h-auto sm:h-14 w-full sm:w-[30rem] rounded-lg z-20 relative font-normal">
          {/* Select Category */}
          <select className="w-full sm:w-40 bg-white text-black p-2 rounded-md outline-none">
            <option>Select category</option>
            <option>Design</option>
            <option>Interview</option>
            <option>News</option>
          </select>

          {/* Search Bar */}
          <div className="flex-1 w-full bg-white flex items-center rounded-md overflow-hidden">
            <Image
              src="/img/search.png"
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
              className="w-full py-2 px-4 outline-none text-black"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
