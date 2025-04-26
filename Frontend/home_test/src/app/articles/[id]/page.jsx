import { Viewitem } from "@/app/API/Route";
import OtherArtikel from "@/components/otherartikel";

export default async function ArticleDetail({ params }) {
  const { id } = params;
  const article = await Viewitem(id);

  return (
    <main>
      <div className="w-full min-h-screen bg-white  flex flex-col items-center justify-center px-4 mt-20 p-10">
        <div className="flex flex-col text-center justify-center align-top">
          <p className="text-slate-600 text-xs mb-5">
            {article.date} . Created by Admin
          </p>
          <h1 className="text-3xl mb-5 font-bold text-slate-900">
            {article.title}
          </h1>
        </div>

        <img
          src={article.image}
          alt={article.title}
          className="mb-5 rounded-md h-[70vh] w-[140vh] object-cover"
        />
        <div className="text-left text-slate-700 text-base p-10">
          <section className="mb-5">
            <p>
              In the ever-evolving world of digital product design,
              collaboration between designers and developers has always been a
              crucial—yet often challenging—part of <br /> the process. In April
              2025, Figma introduced Dev Mode, a powerful new feature aimed at
              streamlining that collaboration more than ever before.
            </p>
          </section>
          <section className="mb-5">
            <b>🔧 What Is Dev Mode?</b>
            <p>
              Dev Mode is a new interface within Figma that provides
              developer-focused tools and removes unnecessary UI clutter that
              designers typically use. Instead,
              <br /> developers can view ready-to-implement specs, such as
              spacing, color values, font styles, and asset exports—without
              disrupting the design file or asking the <br /> design team for
              clarifications.
            </p>
          </section>
          <section className="mb-5">
            <b>🤝 Bridging the Gap Between Design & Development</b>
            <p>
              Traditionally, handing off designs involved back-and-forth
              communication, misunderstandings, and occasional delays. With Dev
              Mode, handoff becomes real-time and seamless:
            </p>
            <ul className="list-disc pl-5 ">
              <li>
                Live Design Specs: Developers can inspect the design without
                needing additional tools or extensions..
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
                Integrated Comments: Developers can leave feedback directly in
                the design file.
              </li>
            </ul>
          </section>
          <section className="mb-5">
            <b>🚀 Why It Matters</b>
            <p>
              For design teams working in agile environments, the speed of
              handoff can make or break a sprint. Figma’s Dev Mode turns a
              typically messy phase into a <br /> collaborative, real-time
              experience that reduces errors, shortens build times, and improves
              the designer-developer relationship.
            </p>
          </section>
          <section className="mb-5">
            <b>🧠 Final Thoughts</b>
            <p>
              Whether you're a solo designer working with freelance developers
              or part of a large product team, Figma’s Dev Mode introduces a
              smoother, smarter way to <br /> collaborate. It's not just a
              feature—it's a shift in how digital products are built.
            </p>
          </section>
          <section>
            <p>
              💬 What do you think of Dev Mode? Have you tried it yet? Share
              your experience in the comments!
            </p>
          </section>
        </div>

        <div className="flex flex-col text-left w-full px-10 py-5 mb-[-20px]">
          <h1 className="font-bold text-left">Other articles</h1>
        </div>
        <section className="">
          <OtherArtikel jumm={3} />
        </section>
      </div>
    </main>
  );
}
