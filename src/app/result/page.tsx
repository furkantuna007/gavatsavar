"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { results } from "../../results";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Result() {
  return (
    <Suspense>
      <ResultContent />
    </Suspense>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const score = Number(searchParams.get("score"));
  const type = searchParams.get("type");

  if (!type || isNaN(score)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-500 to-violet-600">
        <div className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-xl w-full flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Hatalı Sonuç</h2>
          <p className="mb-4">Lütfen testi baştan başlatın.</p>
          <button className="bg-black text-white rounded-xl p-3 font-bold" onClick={() => router.push("/")}>Ana Sayfa</button>
        </div>
      </div>
    );
  }

  // Hem 'sert' hem 'soft' için aynı sonuç kategorisini bul
  const result = results.find(r => score >= r.min && score <= r.max);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-500 to-violet-600">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-xl w-full flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-4 text-center text-black">{result?.title || "Sonuç Bulunamadı"}</h2>
        <div className="text-lg text-black whitespace-pre-line mb-8 text-center">{result?.desc || "Beklenmeyen bir hata oluştu."}</div>
        <button className="bg-black text-white rounded-xl p-3 font-bold" onClick={() => router.push("/")}>Tekrar Dene</button>
      </div>
    </div>
  );
}
