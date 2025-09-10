'use client';
import { useState } from 'react';


const chlorineSteps = [0, 1, 2, 3, 5, 7.5, 10];
const chemicalFields = [
  { key: 'chlorine', label: 'Chlorine (Cl)', min: 0, max: 10, step: 1 },
  { key: 'pH', label: 'pH', min: 7.0, max: 8.0, step: 0.2 },
  { key: 'alkalinity', label: 'Alkalinity', min: 0, max: 150, step: 10 },
  { key: 'calcium', label: 'Calcium', min: 0, max: 400, step: 10 },
  { key: 'CYA', label: 'CYA', min: 0, max: 100, step: 10 },
  { key: 'salt', label: 'Salt', min: 0, max: 3800, step: 200 },
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
  const [currentTouched, setCurrentTouched] = useState({
    chlorine: false,
    pH: false,
    alkalinity: false,
    calcium: false,
    CYA: false,
    salt: false,
  });

  function handleIdealChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setIdeal({ ...ideal, [name]: Number(value) });
  }

  function handleCurrentChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setCurrent({ ...current, [name]: Number(value) });
    setCurrentTouched({ ...currentTouched, [name]: true });
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Pool Chemical Calculator</h1>
  <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
  <form className="space-y-4 p-4 border rounded bg-white/80 max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-2">Current Pool Chemical Levels</h2>
          {chemicalFields.map(({ key, label, min, max, step }) => (
            <div key={key}>
              <label className="mr-2">{label}: {currentTouched[key as keyof typeof currentTouched] ? current[key as keyof typeof current] : <span className="text-gray-400">--</span>}</label>
              {key === 'chlorine' ? (
                <>
                  <input
                    type="range"
                    name={key}
                    min={0}
                    max={chlorineSteps.length - 1}
                    step={1}
                    value={currentTouched.chlorine ? chlorineSteps.indexOf(current.chlorine) : 0}
                    onChange={e => {
                      const idx = Number(e.target.value);
                      setCurrent({ ...current, chlorine: chlorineSteps[idx] });
                      setCurrentTouched({ ...currentTouched, chlorine: true });
                    }}
                    style={{ opacity: currentTouched.chlorine ? 1 : 0.5 }}
                    className="w-full h-8 accent-blue-500 slider-thumb-lg slider-track-lg"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{chlorineSteps[0]}</span>
                    <span>{chlorineSteps[Math.floor(chlorineSteps.length/2)]}</span>
                    <span>{chlorineSteps[chlorineSteps.length-1]}</span>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="range"
                    name={key}
                    min={min}
                    max={max}
                    step={step}
                    value={currentTouched[key as keyof typeof currentTouched] ? current[key as keyof typeof current] : min}
                    onChange={handleCurrentChange}
                    style={{ opacity: currentTouched[key as keyof typeof currentTouched] ? 1 : 0.5 }}
                    className="w-full h-8 accent-blue-500 slider-thumb-lg slider-track-lg value-inside-thumb"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{min}</span>
                    <span>{Math.round((min + max) / 2)}</span>
                    <span>{max}</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </form>
        
  <form className="space-y-4 p-4 border rounded bg-white/80 max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-2">Ideal Chemical Levels</h2>
          {chemicalFields.map(({ key, label, min, max, step }) => (
            <div key={key}>
                <label className="mr-2">{label}: {ideal[key as keyof typeof ideal]}</label>
              {key === 'chlorine' ? (
                <>
                  <input
                    type="range"
                    name={key}
                    min={0}
                    max={chlorineSteps.length - 1}
                    step={1}
                    value={chlorineSteps.indexOf(ideal.chlorine)}
                    onChange={e => {
                      const idx = Number(e.target.value);
                      setIdeal({ ...ideal, chlorine: chlorineSteps[idx] 
                      });
                    }}
                    className="w-full h-8 accent-blue-500 slider-thumb-lg slider-track-lg value-inside-thumb"
                    data-value={ideal.chlorine}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{chlorineSteps[0]}</span>
                    <span>{chlorineSteps[Math.floor(chlorineSteps.length/2)]}</span>
                    <span>{chlorineSteps[chlorineSteps.length-1]}</span>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="range"
                    name={key}
                    min={min}
                    max={max}
                    step={step}
                    value={ideal[key as keyof typeof ideal]}
                    onChange={handleIdealChange}
                    className="w-full h-8 accent-blue-500 slider-thumb-lg slider-track-lg value-inside-thumb"
                    data-value={ideal[key as keyof typeof ideal]}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{min}</span>
                    <span>{Math.round((min + max) / 2)}</span>
                    <span>{max}</span>
                  </div>
                  </>
              )}
            </div>
          ))}
        </form>

  <div className="space-y-4 p-4 border rounded bg-white/80 max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-2">Suggested Chemicals to Add</h2>
          <ul>
            {chemicalFields.map(({ key, label }) => {
              // Only show if user has interacted with the slider
              if (!currentTouched[key as keyof typeof currentTouched]) return null;
              const diff = ideal[key as keyof typeof ideal] - current[key as keyof typeof current];
              if (Math.abs(diff) < 0.01) return (
                <li key={key} className="text-gray-500">{label}: No adjustment needed</li>
              );
              return (
                <li key={key}>
                  {label}: {diff > 0 ? `Add ${diff}` : `Remove ${Math.abs(diff)}`}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <style jsx global>{`
        input[type='range'].slider-thumb-lg::-webkit-slider-thumb {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            position: relative;
            /* Center thumb vertically in Safari */
            transform: translateY(-16px);
        }
        input[type='range'].slider-thumb-lg::-webkit-slider-thumb::after {
          content: attr(data-value);
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 1rem;
          font-weight: bold;
          pointer-events: none;
        }
        input[type='range'].slider-thumb-lg::-moz-range-thumb {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        input[type='range'].slider-thumb-lg::-ms-thumb {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        input[type='range'].slider-track-lg::-webkit-slider-runnable-track {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
        }
        input[type='range'].slider-track-lg::-moz-range-track {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
        }
        input[type='range'].slider-track-lg::-ms-fill-lower,
        input[type='range'].slider-track-lg::-ms-fill-upper {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
        }
      `}</style>
    </main>
  );
}
