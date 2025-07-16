"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "./logo-alsolved.png";

const bandi = [
  {
    id: 1,
    nome: "Bando Innovazione",
    descrizione: "Contributo a fondo perduto per progetti innovativi.",
    percentuale: 50,
  },
  {
    id: 2,
    nome: "Bando Digitalizzazione",
    descrizione: "Voucher per spese in tecnologie digitali.",
    percentuale: 40,
  },
  {
    id: 3,
    nome: "Bando Formazione",
    descrizione: "Rimborso spese per attività formative.",
    percentuale: 60,
  },
];

export default function Home() {
  const [fatturato, setFatturato] = useState("");
  const [contributo, setContributo] = useState(null);
  const [selected, setSelected] = useState(null);

  const calcola = (bando) => {
    setSelected(bando.id);
    const valore = parseFloat(fatturato.replace(",", "."));
    if (!isNaN(valore)) {
      const contributoCalcolato = (valore * bando.percentuale) / 100;
      setContributo({
        nome: bando.nome,
        valore: contributoCalcolato.toFixed(2),
        percentuale: bando.percentuale,
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-center mb-6">
          <Image src={logo} alt="Logo Alsolved" width={200} height={60} />
        </div>
        <h1 className="text-2xl font-bold text-center text-[#0a3d62] mb-6">
          Simulatore Finanza Agevolata
        </h1>
        <input
          type="text"
          placeholder="Inserisci il tuo fatturato"
          value={fatturato}
          onChange={(e) => setFatturato(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-6"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {bandi.map((bando) => (
            <div
              key={bando.id}
              onClick={() => calcola(bando)}
              className={`transition-shadow hover:shadow-lg rounded-2xl border-2 p-5 ${
                selected === bando.id ? "border-[#ec008c]" : "border-white"
              }`}
            >
              <h2 className="text-lg font-semibold text-[#0a3d62]">{bando.nome}</h2>
              <p className="text-gray-700 text-sm mb-2">{bando.descrizione}</p>
              <p className="text-sm font-semibold">Contributo: {bando.percentuale}%</p>
            </div>
          ))}
        </div>
        {contributo && (
          <div className="mt-6 text-center text-[#0a3d62] font-bold">
            Con il bando <u>{contributo.nome}</u> potresti ottenere un contributo di{" "}
            <span className="text-[#ec008c]">€ {contributo.valore}</span>
          </div>
        )}
      </div>
    </main>
  );
}
