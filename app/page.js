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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Calculadora de Tamaño de Posición - ATFX
        </h1>

        <div className="space-y-4">

          <div>
            <label>Par de Divisas</label>
            <select value={pair} onChange={e => setPair(e.target.value)} className="w-full p-2 border rounded">
              <option>EURUSD</option>
              <option>GBPUSD</option>
              <option>USDJPY</option>
              <option>XAUUSD</option>
            </select>
          </div>

          <div>
            <label>Tamaño de la Cuenta</label>
            <input type="number" value={accountSize} onChange={e => setAccountSize(e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label>Riesgo (%)</label>
            <input type="number" value={riskPercent} onChange={e => setRiskPercent(e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label>Stop Loss (pips)</label>
            <input type="number" value={stopPips} onChange={e => setStopPips(e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <button onClick={calculate} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold">
            Calcular
          </button>
        </div>

        {results && (
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <h2 className="text-lg font-bold mb-2">Resultados</h2>
            <p><b>Dinero en riesgo:</b> ${results.riskMoney}</p>
            <p><b>Tamaño recomendado:</b> {results.lotSize} lotes</p>
            <p><b>Unidades:</b> {results.units}</p>
          </div>
        )}
      </div>
    </div>
  );
}
