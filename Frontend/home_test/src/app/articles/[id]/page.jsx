import { Viewitem } from "@/app/API/Route";

export default async function ArticleDetail({ params }) {
  const { id } = params;
  const article = await Viewitem(id);

  return (
    <div className="p-6">
      
    </div>
  );
}
