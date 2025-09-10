'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [hasPoolData, setHasPoolData] = useState(false);

  useEffect(() => {
    async function checkCookie() {
      const res = await fetch('/api/pooldata');
      const data = await res.json();
      setHasPoolData(!!data.poolData);
    }
    checkCookie();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Pool Cleaning Helper</h1>
      <p className="mb-6">Easily calculate and store your pool data.</p>
      <Link href="/home" className="px-4 py-2 bg-blue-500 text-white rounded">Go to Pool Chem Calculator</Link>
      {hasPoolData && (
        <p className="mt-4 text-green-600">You have saved pool data!</p>
      )}
    </main>
  );
}
