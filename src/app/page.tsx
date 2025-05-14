"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const router = useRouter();

  function handleContinue() {
    if (selectedType) {
      router.push(`/spectrum?type=${selectedType}`);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-500 to-violet-600">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-md w-full flex flex-col items-center">
        <div className="flex flex-col gap-4 w-full mb-8">
          <button
            className={`w-full rounded-xl p-4 font-bold border-2 transition text-black ${selectedType === "sert" ? "bg-violet-500 border-violet-700" : "bg-white border-gray-300 hover:bg-violet-100"}`}
            onClick={() => setSelectedType("sert")}
          >
            Jargon severim
          </button>
          <button
            className={`w-full rounded-xl p-4 font-bold border-2 transition text-black ${selectedType === "soft" ? "bg-violet-500 border-violet-700" : "bg-white border-gray-300 hover:bg-violet-100"}`}
            onClick={() => setSelectedType("soft")}
          >
            Küfürün hiçbir türünden hoşlanmam
          </button>
        </div>
        <button
          className={`w-full bg-black text-white rounded-xl p-4 font-bold mt-2 transition ${!selectedType ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
          disabled={!selectedType}
          onClick={handleContinue}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
