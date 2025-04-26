import Link from "next/link";

export default function UserProfile() {
  return (
    <main>
      <section className="w-full min-h-screen bg-white  flex flex-col items-center justify-center px-4 mt-10 p-10">
        <div className="text-slate-900 w-[400px] h-[436px] pt-[24px] pr-[16px] pb-[24px] pl-[16px] gap-[36px] flex flex-col text-center justify-center align-top ">
          <h1 className="text-xl text-slate-900 font-semibold">User Profile</h1>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-blue-200 w-[68px] h-[68px]  rounded-full flex items-center justify-center font-medium">
              <p className="text-blue-900 font-medium text-2xl">J</p>
            </div>
          </div>
          <div className="flex bg-gray-100 w-[368px]  h-[44px]  border-slate-200 rounded-md border-[1px] justify-between pt-[10px] pr-[12px] pb-[10px] pl-[12px]">
            <span className="font-semibold">Username</span>
            <span className="font-semibold">:</span>
            <span className="text-gray-700">James Dean</span>
          </div>
          <div className="flex bg-gray-100 w-[368px]  h-[44px]  border-slate-200 rounded-md border-[1px] justify-between pt-[10px] pr-[12px] pb-[10px] pl-[12px]">
            <span className="font-semibold">Password</span>
            <span className="font-semibold">:</span>
            <span className="text-gray-700">Admin123</span>
          </div>
          <div className="flex bg-gray-100 w-[368px]  h-[44px]  border-slate-200 rounded-md border-[1px] justify-between pt-[10px] pr-[12px] pb-[10px] pl-[12px]">
            <span className="font-semibold">Role</span>
            <span className="font-semibold">:</span>
            <span className="text-gray-700">User</span>
          </div>
          <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md">
            <Link href="/">Back to home</Link>
          </button>
        </div>
      </section>
    </main>
  );
}
