'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [hasPoolData, setHasPoolData] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
      router.replace("/home");
    }, [router]);

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
        <p className="mt-4 text-green-600">loading...</p>
    </main>
  );
}
