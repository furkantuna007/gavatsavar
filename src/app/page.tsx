"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [choice, setChoice] = useState<"sert" | "soft" | null>(null);
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-500 to-violet-600">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-xl w-full flex flex-col items-center">
        <div className="flex flex-col sm:flex-row gap-4 w-full mb-6">
          <button
            className={`flex-1 bg-black text-white rounded-xl p-3 hover:scale-105 transition font-bold border-2 ${choice === "sert" ? "border-purple-500" : "border-transparent"}`}
            onClick={() => setChoice("sert")}
          >
            Sert jargon severim
          </button>
          <button
            className={`flex-1 bg-black text-white rounded-xl p-3 hover:scale-105 transition font-bold border-2 ${choice === "soft" ? "border-purple-500" : "border-transparent"}`}
            onClick={() => setChoice("soft")}
          >
            Küfürün hiçbir türünden hoşlanmam
          </button>
        </div>
        <button
          className={`w-full ${choice ? "bg-purple-700" : "bg-black"} text-white rounded-xl p-3 font-bold mt-2 transition ${!choice ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
          disabled={!choice}
          onClick={() => {
            if (choice) router.push(`/spectrum?type=${choice}`);
          }}
        >
          Devam Et
        </button>
      </div>
    </div>
  );
}
