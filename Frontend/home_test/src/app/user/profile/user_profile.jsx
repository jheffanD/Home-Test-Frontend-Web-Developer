import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserProfile() {

  const {data} = useSession();
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6">
      <section className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-slate-900">User Profile</h1>

        <div className="bg-blue-200 w-20 h-20 rounded-full flex items-center justify-center">
          <p className="text-blue-900 text-3xl font-semibold">J</p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <ProfileField label="Username" value="James Dean" />
          <ProfileField label="Password" value="Admin123" />
          <ProfileField label="Role" value="User" />
        </div>

        <Link href="/" className="w-full">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition">
            Back to Home
          </button>
        </Link>
      </section>
    </main>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md border border-slate-200">
      <span className="font-semibold text-slate-800">{label}</span>
      <span className="text-slate-600">:</span>
      <span className="text-slate-700">{value}</span>
    </div>
  );
}
