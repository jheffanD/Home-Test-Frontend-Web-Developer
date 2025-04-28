import { Viewitem } from "@/app/API/Route";
import OtherArtikel from "@/components/otherartikel";
import Image from "next/image";

export default async function ArticleDetail({ params }) {
  const  id  = params.id;
  const article = await Viewitem(id);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-4 py-20">
      {/* Header */}
      <div className="max-w-2xl w-full flex flex-col text-center">
        <p className="text-slate-600 text-xs mb-4">
          {article.date} • Created by Admin
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
          {article.title}
        </h1>
      </div>

      {/* Featured Image */}
      <div className="relative w-full max-w-2xl h-64 md:h-96 rounded-md overflow-hidden mb-8">
        <Image
          src={article.image}
          alt={article.title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Content */}
      <div className="w-full max-w-2xl text-slate-700 text-base flex flex-col gap-6">
        {/* Sections */}
        <section>
          <p>
            In the ever-evolving world of digital product design, collaboration
            between designers and developers has always been a crucial—yet often
            challenging—part of the process. In April 2025, Figma introduced Dev
            Mode, a powerful new feature aimed at streamlining that
            collaboration more than ever before.
          </p>
        </section>

        <section>
          <h2 className="font-bold mb-2">🔧 What Is Dev Mode?</h2>
          <p>
            Dev Mode is a new interface within Figma that provides
            developer-focused tools and removes unnecessary UI clutter that
            designers typically use. Instead, developers can view
            ready-to-implement specs—such as spacing, color values, font styles,
            and asset exports—without disrupting the design file or asking the
            design team for clarifications.
          </p>
        </section>

        <section>
          <h2 className="font-bold mb-2">
            🤝 Bridging the Gap Between Design & Development
          </h2>
          <p className="mb-2">
            Traditionally, handing off designs involved back-and-forth
            communication, misunderstandings, and occasional delays. With Dev
            Mode, handoff becomes real-time and seamless:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Live Design Specs: Developers can inspect the design without
              needing additional tools.
            </li>
            <li>
              Code Snippets: Automatically generated CSS, iOS (Swift), and
              Android (XML) code help speed up implementation.
            </li>
            <li>
              Version History Access: Stay aligned with design updates without
              asking for a new export every time.
            </li>
            <li>
              Integrated Comments: Developers can leave feedback directly in the
              design file.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold mb-2">🚀 Why It Matters</h2>
          <p>
            For design teams working in agile environments, the speed of handoff
            can make or break a sprint. Figma’s Dev Mode turns a typically messy
            phase into a collaborative, real-time experience that reduces
            errors, shortens build times, and improves the designer-developer
            relationship.
          </p>
        </section>

        <section>
          <h2 className="font-bold mb-2">🧠 Final Thoughts</h2>
          <p>
            Whether you're a solo designer working with freelance developers or
            part of a large product team, Figma’s Dev Mode introduces a
            smoother, smarter way to collaborate. It's not just a feature—it's a
            shift in how digital products are built.
          </p>
        </section>

        <section>
          <p>
            💬 What do you think of Dev Mode? Have you tried it yet? Share your
            experience in the comments!
          </p>
        </section>

        {/* Other Articles */}
        <div className="pt-10">
          <h2 className="font-bold text-slate-900 mb-4">Other articles</h2>
          <OtherArtikel jumm={3} />
        </div>
      </div>
    </main>
  );
}
