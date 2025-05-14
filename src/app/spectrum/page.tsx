"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { quizData } from '../../../quiz-data';

export default function Spectrum() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");
  const [started, setStarted] = useState(false);
  // Sert quiz state'leri her zaman tanımlı olmalı (hook sırası bozulmasın diye)
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  if (!type || (type !== "sert" && type !== "soft")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-500 to-violet-600">
        <div className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-xl w-full flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Hatalı Yönlendirme</h2>
          <p className="mb-4">Lütfen ana sayfadan testi başlatın.</p>
          <button className="bg-black text-white rounded-xl p-3 font-bold" onClick={() => router.push("/")}>Geri Dön</button>
        </div>
      </div>
    );
  }

  // Spectrum başlığı ve açıklamaları
  const spectrumTitle =
    type === "sert"
      ? "% KAÇ GAVATSIN?"
      : "İlişkide Ne Kadar Kıskanç / Korumacısın?";
  const leftLabel = type === "sert" ? "Dağ Ayısı / Mağara Adamı" : "Maço";
  const rightLabel = type === "sert" ? "Godoş / Gavat" : "Entellektüel";

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-500 to-violet-600">
        <div className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-xl w-full flex flex-col items-center">
          <h2 className="text-2xl font-extrabold mb-4 text-center text-black">{spectrumTitle}</h2>
          <div className="flex w-full justify-between items-center mb-8">
            <span className="text-sm font-semibold text-gray-700">{leftLabel}</span>
            <div className="flex-1 h-2 mx-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full" />
            <span className="text-sm font-semibold text-gray-700">{rightLabel}</span>
          </div>
          <button
            className="w-full bg-black text-white rounded-xl p-3 font-bold mt-2 hover:scale-105 transition"
            onClick={() => setStarted(true)}
          >
            Teste Başla
          </button>
        </div>
      </div>
    );
  }

  // Quiz akışı
  if (type === "soft") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-500 to-violet-600">
        <div className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-xl w-full flex flex-col items-center">
          <h2 className="text-2xl font-extrabold mb-4 text-center">Soft Quiz Yakında</h2>
          <p className="mb-4">Bu yol için içerik çok yakında eklenecek.</p>
          <button className="bg-black text-white rounded-xl p-3 font-bold" onClick={() => router.push("/")}>Ana Sayfa</button>
        </div>
      </div>
    );
  }

  // Sert quiz akışı
  const question = quizData[current];
  const isLast = current === quizData.length - 1;

  function handleNext() {
    if (selected === null) return;
    const nextAnswers = [...answers, selected];
    setAnswers(nextAnswers);
    setSelected(null);
    if (isLast) {
      // Skor hesapla: A=10, B=5, C=2, D=0
      const scoreTable = [10, 5, 2, 0];
      const score = nextAnswers.reduce((acc, v) => acc + scoreTable[v], 0);
      router.push(`/result?score=${score}&type=sert`);
    } else {
      setCurrent(current + 1);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-500 to-violet-600">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-xl w-full flex flex-col items-center">
        <h2 className="text-xl font-bold mb-6 text-center text-black">{question.question}</h2>
        <div className="flex flex-col gap-3 w-full mb-8">
          {question.options.map((opt, i) => (
            <button
              key={i}
              className={`w-full rounded-xl p-3 font-semibold border-2 transition text-left ${selected === i ? "bg-violet-500 text-black border-violet-700" : "bg-white border-gray-300 hover:bg-violet-100 text-black"}`}
              onClick={() => setSelected(i)}
            >
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          ))}
        </div>
        <button
          className={`w-full bg-black text-white rounded-xl p-3 font-bold mt-2 transition ${selected === null ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
          disabled={selected === null}
          onClick={handleNext}
        >
          {isLast ? "Sonucu Gör" : "Devam Et"}
        </button>
      </div>
    </div>
  );
}
