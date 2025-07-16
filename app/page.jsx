
"use client";
import { useState } from "react";
import Image from "next/image";

const bandi = [
  {
    id: 1,
    nome: "Bando Innovazione Digitale Lazio",
    descrizione: "Fino al 50% a fondo perduto per investimenti in digitalizzazione nella Regione Lazio.",
    percentuale: 50,
    massimale: 100000,
    regione: "Lazio"
  },
  {
    id: 2,
    nome: "Voucher Digitali Lazio",
    descrizione: "Voucher per l'adozione di soluzioni tecnologiche digitali, fino al 70%.",
    percentuale: 70,
    massimale: 50000,
    regione: "Lazio"
  },
  {
    id: 3,
    nome: "Contributi per l'Internazionalizzazione",
    descrizione: "Contributo del 40% per fiere e missioni internazionali.",
    percentuale: 40,
    massimale: 30000,
    regione: "Lazio"
  },
  {
    id: 4,
    nome: "Bando Formazione e Competenze",
    descrizione: "Fino al 60% per percorsi di formazione continua dei dipendenti.",
    percentuale: 60,
    massimale: 20000,
    regione: "Lazio"
  },
  {
    id: 5,
    nome: "Efficienza Energetica PMI",
    descrizione: "Contributi per investimenti in efficienza energetica fino al 45%.",
    percentuale: 45,
    massimale: 80000,
    regione: "Lazio"
  },
  {
    id: 6,
    nome: "Voucher Expo Osaka 2025",
    descrizione: "Voucher €5.000 (50%) per partecipazione a Expo Osaka.",
    percentuale: 50,
    massimale: 5000,
    regione: "Lazio"
  },
  {
    id: 7,
    nome: "Sviluppo Impresa CCIAA Roma",
    descrizione: "Fino a €15.000 per innovazione e digitalizzazione.",
    percentuale: 100,
    massimale: 15000,
    regione: "Roma"
  },
  {
    id: 8,
    nome: "Nuove Imprese CCIAA Roma",
    descrizione: "Contributo fino a €2.500 per startup.",
    percentuale: 100,
    massimale: 2500,
    regione: "Roma"
  },
  {
    id: 9,
    nome: "POR FESR Innovazione Digitale",
    descrizione: "Fondo a fondo perduto per progetti digitali (MPMI).",
    percentuale: 50,
    massimale: 50000,
    regione: "Lazio"
  },
  {
    id: 10,
    nome: "NFPC/NFF Lazio Innova",
    descrizione: "Prestito a tasso zero 10‑50 k€ per startup e micro‑imprese.",
    percentuale: 100,
    massimale: 50000,
    regione: "Lazio"
  }
];

export default function SimulatoreAgevolazioni() {
  const [scelte, setScelte] = useState([]);

  const toggleBando = (bando) => {
    const exists = scelte.find((b) => b.id === bando.id);
    if (exists) {
      setScelte(scelte.filter((b) => b.id !== bando.id));
    } else {
      setScelte([...scelte, { ...bando, spesa: bando.massimale }]);
    }
  };

  const setSpesa = (id, valore) => {
    setScelte((prevScelte) =>
      prevScelte.map((b) =>
        b.id === id ? { ...b, spesa: parseFloat(valore) || 0 } : b
      )
    );
  };

  const totale = scelte.reduce(
    (acc, b) => acc + (b.spesa * b.percentuale) / 100,
    0
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 font-sans bg-gray-50 min-h-screen">
      <header className="text-center">
        <div className="flex justify-center mb-4">
          <Image src="/logo-alsolved.png" alt="Logo Alsolved" width={180} height={60} />
        </div>
        <h1 className="text-3xl font-bold text-[#0a3d62]">Simulatore Agevolazioni Regione Lazio</h1>
        <p className="text-sm text-gray-600">Scopri quante agevolazioni puoi ottenere per la tua impresa</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bandi.map((bando) => {
          const selected = scelte.find((b) => b.id === bando.id);
          return (
            <div
              key={bando.id}
              className={\`transition-shadow hover:shadow-lg rounded-2xl border-2 p-5 \${selected ? "border-[#ec008c]" : "border-white"}\`}
            >
              <h2 className="text-lg font-semibold text-[#0a3d62]">{bando.nome}</h2>
              <p className="text-gray-700 text-sm mb-2">{bando.descrizione}</p>
              <button
                onClick={() => toggleBando(bando)}
                className="text-sm mb-3 border px-3 py-1 rounded border-gray-300 hover:bg-gray-100"
              >
                {selected ? "Rimuovi" : "Aggiungi"}
              </button>
              {selected && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-600">Spesa prevista (€)</label>
                  <input
                    type="number"
                    className="mt-1 w-full border border-[#ec008c] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                    value={selected.spesa}
                    onChange={(e) => setSpesa(bando.id, e.target.value)}
                    max={bando.massimale}
                    step="100"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {scelte.length > 0 && (
        <div className="mt-10 p-6 bg-white border border-[#ec008c] rounded-xl shadow">
          <h3 className="text-xl font-bold text-[#0a3d62] mb-4">Riepilogo simulazione</h3>
          <ul className="space-y-2">
            {scelte.map((b) => (
              <li key={b.id} className="text-gray-800">
                <span className="font-medium">{b.nome}</span>: {((b.spesa * b.percentuale) / 100).toLocaleString("it-IT", { style: "currency", currency: "EUR" })}
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <p className="text-lg text-gray-900">Totale contributi simulati: <strong className="text-[#ec008c]">{totale.toLocaleString("it-IT", { style: "currency", currency: "EUR" })}</strong></p>
        </div>
      )}

      <div className="text-center mt-8">
        <button className="bg-[#ec008c] hover:bg-[#c20076] text-white text-lg px-6 py-3 rounded-xl">
          Richiedi Consulenza Personalizzata
        </button>
      </div>
    </div>
  );
}
