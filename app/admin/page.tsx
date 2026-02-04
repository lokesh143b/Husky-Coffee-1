"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import AddProduct from "@/components/admin/AddProduct";
import AllProducts from "@/components/admin/AllProducts";

export default function AdminPage() {
  const [active, setActive] = useState<"add" | "all">("add");

  return (
    <div className="
      flex flex-col md:flex-row pt-26
      min-h-screen
      text-white
      bg-gradient-to-br from-black via-zinc-900 to-black
    ">
      {/* Sidebar */}
      <Sidebar active={active} setActive={setActive} />

      {/* Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {active === "add" && <AddProduct />}
        {active === "all" && <AllProducts />}
      </main>
    </div>
  );
}
