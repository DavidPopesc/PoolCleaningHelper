'use client';
import { useState } from 'react';


const chemicalFields = [
  { key: 'chlorine', label: 'Chlorine (Cl)', min: 0, max: 10, step: 1 },
  { key: 'pH', label: 'pH', min: 7.0, max: 8.0, step: 0.2 },
  { key: 'alkalinity', label: 'Alkalinity', min: 0, max: 150, step: 10 },
  { key: 'calcium', label: 'Calcium', min: 0, max: 500, step: 10 },
  { key: 'CYA', label: 'CYA', min: 0, max: 150, step: 10 },
  { key: 'salt', label: 'Salt', min: 0, max: 3700, step: 10 },
];

const defaultIdeal = {
  chlorine: 3,
  pH: 7.4,
  alkalinity: 80,
  calcium: 250,
  CYA: 30,
  salt: 3000,
};

const defaultCurrent = {
  chlorine: 0,
  pH: 7.0,
  alkalinity: 0,
  calcium: 0,
  CYA: 0,
  salt: 0,
};


export default function HomePage() {
  const [ideal, setIdeal] = useState(defaultIdeal);
  const [current, setCurrent] = useState(defaultCurrent);

  function handleIdealChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setIdeal({ ...ideal, [name]: Number(value) });
  }

  function handleCurrentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCurrent({ ...current, [name]: Number(value) });
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Pool Chemical Calculator</h1>
      <div className="w-full max-w-xl grid grid-cols-1 md:grid-cols-2 gap-8">
                <form className="space-y-4 p-4 border rounded bg-white/80">
          <h2 className="text-lg font-semibold mb-2">Current Pool Chemical Levels</h2>
          {chemicalFields.map(({ key, label, min, max, step }) => (
            <div key={key}>
              <label className="mr-2">{label}:</label>
              <input
                type="range"
                name={key}
                min={min}
                max={max}
                step={step}
                value={current[key as keyof typeof current]}
                onChange={handleCurrentChange}
              />
              <span className="ml-2">{current[key as keyof typeof current]}</span>
            </div>
          ))}
        </form>
        
        <form className="space-y-4 p-4 border rounded bg-white/80">
          <h2 className="text-lg font-semibold mb-2">Ideal Chemical Levels</h2>
          {chemicalFields.map(({ key, label, min, max, step }) => (
            <div key={key}>
              <label className="mr-2">{label}:</label>
              <input
                type="range"
                name={key}
                min={min}
                max={max}
                step={step}
                value={ideal[key as keyof typeof ideal]}
                onChange={handleIdealChange}
              />
              <span className="ml-2">{ideal[key as keyof typeof ideal]}</span>
            </div>
          ))}
        </form>

      </div>
    </main>
  );
}
