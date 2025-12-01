"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [pair, setPair] = useState("EURUSD");
  const [accountSize, setAccountSize] = useState("");
  const [riskPercent, setRiskPercent] = useState("");
  const [stopPips, setStopPips] = useState("");
  const [results, setResults] = useState(null);

  // VALOR DEL PIP POR LOTE
  const pipValuePerLot = {
    "EURUSD": 10,
    "GBPUSD": 10,
    "USDJPY": 9,
    "EURJPY": 9,
    "GBPJPY": 9,
    "XAUUSD": 1,
    "XAGUSD": 0.5,
    "NAS100": 1,
    "SP500": 1,
    "US30": 1,
    "BTCUSD": 1,
  };

  // CARGAR TICKER TAPE
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:EURUSD", title: "EUR/USD" },
        { proName: "FOREXCOM:GBPUSD", title: "GBP/USD" },
        { proName: "FOREXCOM:USDJPY", title: "USD/JPY" },
        { proName: "OANDA:XAUUSD", title: "XAU/USD" },
        { proName: "FOREXCOM:NAS100", title: "NASDAQ 100" },
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:NSXUSD", title: "US 30" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" }
      ],
      showSymbolLogo: true,
      colorTheme: "dark",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "es"
    });

    document.getElementById("ticker-tape").appendChild(script);
  }, []);

  // CALCULAR
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
    <>
      {/* TICKER TAPE EN LA PARTE SUPERIOR */}
      <div id="ticker-tape" className="w-full"></div>

      {/* FONDO + CALCULADORA */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#061322] to-[#0A1A2F] px-4 py-10">

        <div className="bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-lg border border-white/10">

          {/* LOGO ATFX */}
          <div className="w-full flex justify-center mb-6">
            <img src="/atfx-logo.png" alt="ATFX" className="h-20 drop-shadow-lg" />
          </div>

          {/* TÍTULO */}
          <h1 className="text-2xl font-extrabold text-center text-white tracking-wide mb-6">
            Calculadora de Tamaño de Posición
          </h1>

          {/* CAMPOS */}
          <div className="space-y-5">

            {/* PAR */}
            <div>
              <label className="text-white">Par de Divisas</label>
              <select
                value={pair}
                onChange={e => setPair(e.target.value)}
                className="w-full p-3 sm:p-4 rounded-lg bg-white/20 text-white border border-white/30 mt-1"
              >
                <option className="text-black">EURUSD</option>
                <option className="text-black">GBPUSD</option>
                <option className="text-black">USDJPY</option>
                <option className="text-black">EURJPY</option>
                <option className="text-black">GBPJPY</option>
                <option className="text-black">XAUUSD</option>
                <option className="text-black">XAGUSD</option>
                <option className="text-black">NAS100</option>
                <option className="text-black">SP500</option>
                <option className="text-black">US30</option>
                <option className="text-black">BTCUSD</option>
              </select>
            </div>

            {/* ACCOUNT SIZE */}
            <div>
              <label className="text-white">Tamaño de la Cuenta</label>
              <input
                type="number"
                value={accountSize}
                onChange={e => setAccountSize(e.target.value)}
                className="w-full p-3 sm:p-4 rounded-lg bg-white/20 text-white border border-white/30 mt-1"
                placeholder="Ej: 1000"
              />
            </div>

            {/* RIESGO */}
            <div>
              <label className="text-white">Riesgo (%)</label>
              <input
                type="number"
                value={riskPercent}
                onChange={e => setRiskPercent(e.target.value)}
                className="w-full p-3 sm:p-4 rounded-lg bg-white/20 text-white border border-white/30 mt-1"
                placeholder="Ej: 1"
              />
            </div>

            {/* STOP LOSS */}
            <div>
              <label className="text-white">Stop Loss (pips)</label>
              <input
                type="number"
                value={stopPips}
                onChange={e => setStopPips(e.target.value)}
                className="w-full p-3 sm:p-4 rounded-lg bg-white/20 text-white border border-white/30 mt-1"
                placeholder="Ej: 30"
              />
            </div>

            {/* BOTÓN */}
            <button
              onClick={calculate}
              className="w-full bg-[#FF6A00] text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg hover:bg-[#e85f00] transition text-lg"
            >
              Calcular
            </button>
          </div>

          {/* RESULTADOS */}
          {results && (
            <div className="mt-8 p-5 sm:p-6 bg-white/10 rounded-xl border border-white/20 text-white shadow-inner">
              <h2 className="text-xl font-bold mb-3">Resultados</h2>
              <p><b>Dinero en riesgo:</b> ${results.riskMoney}</p>
              <p><b>Tamaño recomendado:</b> {results.lotSize} lotes</p>
              <p><b>Unidades:</b> {results.units}</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
