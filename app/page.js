"use client";
import { useState } from "react";

export default function Home() {
  const [pair, setPair] = useState("EURUSD");
  const [accountSize, setAccountSize] = useState("");
  const [riskPercent, setRiskPercent] = useState("");
  const [stopPips, setStopPips] = useState("");
  const [results, setResults] = useState(null);

  const pipValuePerLot = {
    "EURUSD": 10,
    "GBPUSD": 10,
    "USDJPY": 9,
    "XAUUSD": 1,
  };

  const calculate = () => {
    if (!accountSize || !riskPercent || !stopPips) return;

    const riskMoney = (accountSize * riskPercent) / 100;
    const pipValue = pipValuePerLot[pair] || 10;
    const lotSize = riskMoney / (stopPips * pipValue);

    setResults({
      riskMoney: riskMoney.toFixed(2),
      lotSize: lotSize.toFixed(2),
      units: (lotSize * 100000).toFixed(0),
    });
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#0A1A2F] px-4 py-10">
    
    <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-white/20">

      {/* LOGO ATFX */}
      <div className="w-full flex justify-center mb-6">
        <img src="/atfx-logo.png" alt="ATFX" className="h-12" />
      </div>

      {/* TÍTULO */}
      <h1 className="text-2xl font-extrabold text-center text-white tracking-wide mb-6">
        Calculadora de Tamaño de Posición
      </h1>

      {/* INPUTS */}
      <div className="space-y-5">

        <div>
          <label className="text-white">Par de Divisas</label>
          <select 
            value={pair} 
            onChange={e => setPair(e.target.value)} 
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 mt-1"
          >
            <option className="text-black">EURUSD</option>
            <option className="text-black">GBPUSD</option>
            <option className="text-black">USDJPY</option>
            <option className="text-black">XAUUSD</option>
          </select>
        </div>

        <div>
          <label className="text-white">Tamaño de la Cuenta</label>
          <input 
            type="number"
            value={accountSize}
            onChange={e => setAccountSize(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 mt-1"
          />
        </div>

        <div>
          <label className="text-white">Riesgo (%)</label>
          <input 
            type="number"
            value={riskPercent}
            onChange={e => setRiskPercent(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 mt-1"
          />
        </div>

        <div>
          <label className="text-white">Stop Loss (pips)</label>
          <input 
            type="number"
            value={stopPips}
            onChange={e => setStopPips(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 mt-1"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-[#FF6A00] text-white font-bold py-3 rounded-lg shadow-lg hover:bg-[#e85f00] transition"
        >
          Calcular
        </button>
      </div>

      {/* RESULTADOS */}
      {results && (
        <div className="mt-8 p-5 bg-white/20 rounded-xl border border-white/30 text-white">
          <h2 className="text-xl font-bold mb-3">Resultados</h2>
          <p><b>Dinero en riesgo:</b> ${results.riskMoney}</p>
          <p><b>Tamaño recomendado:</b> {results.lotSize} lotes</p>
          <p><b>Unidades:</b> {results.units}</p>
        </div>
      )}
    </div>
  </div>
);
}
