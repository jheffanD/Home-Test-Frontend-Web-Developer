import Navbaradmin from "@/components/navbaradmin";
import Navtop from "@/components/navtopadmin";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Viewitem } from "@/app/API/Route";

export default async function ArtikelEdit({ params }) {
  const id = params.id;

  const article = await Viewitem(id);

  return (
    <main className="flex">
      <Navbaradmin />
      <section className="min-h-screen flex-1 bg-gray-50 flex flex-col items-center px-4">
        <Navtop />
        <form className="w-full h-[58rem] mb-20 rounded-md bg-slate-100 border flex flex-col mt-20">
          {/* Grup pertama */}
          <section className="w-full p-[24px] gap-[10px] flex">
            <Link className="cursor-pointer" href="/admin/artikel/crud">
              <Image src="/img/left.png" alt="Logo" width={20} height={20} />
            </Link>

            <label className="text-base font-medium text-slate-900">
              Edit Article
            </label>
          </section>

          {/* Grup kedua */}
          <section className="w-full p-[24px] gap-[10px] flex flex-col">
            {/* Thumbnail */}
            <label className="text-sm font-medium text-gray-900 mb-2">
              Thumbnails
            </label>
            <div className="border-2 w-52 h-52 p-4 border bg-white border-gray-300 rounded-xl flex flex-col items-center justify-center mb-2">
              <div className="cursor-pointer text-slate-500 flex flex-col items-center text-center">
                <img src={article.image} alt="Thumbnail" className="mb-2 rounded-lg" />
                <div className="text-xs font-normal ">
                  <span className="text-blue-600 p-2 underline">Changes</span>
                  <span className="text-red-500 p-2 underline">Delete</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-medium text-gray-900 mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Input title"
                defaultValue={article.title}
                className="border w-full border-slate-200 rounded-md p-2 bg-white"
              />
            </div>

            {/* Category */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-900 mb-2">
                Category
              </label>
              <select className="w-full border bg-white border-slate-200 rounded-md p-2">
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Culture">Culture</option>
              </select>

              <p className="text-sm text-gray-500 mt-1">
                The existing category list can be seen in the{" "}
                <span className="text-blue-600 cursor-pointer">category</span>{" "}
                menu
              </p>
            </div>

            {/* Content */}
            <div>
              <div className="bg-white rounded-t-md p-2">
                <Image src="/img/text.png" alt="Logo" width={244} height={18} />
              </div>
              <textarea
                placeholder="Type a content..."
                className="w-full h-48 bg-white rounded-b-md p-3 resize-none"
              >
                {article.description}
              </textarea>

              <p className="text-sm text-gray-500 mt-1 text-left">
                {article.description.length} Words
              </p>
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
