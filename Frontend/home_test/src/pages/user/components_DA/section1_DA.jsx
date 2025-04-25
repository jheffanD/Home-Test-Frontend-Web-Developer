export default function DetailArtikel(params) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-4">Detail Artikel</h1>
      <p className="text-gray-600 text-sm mb-2">Artikel ID: {params.id}</p>
      <p className="text-gray-600 text-sm mb-2">
        Artikel Title: {params.title}
      </p>
      <p className="text-gray-600 text-sm mb-2">
        Artikel Description: {params.description}
      </p>
    </div>
  );
}
