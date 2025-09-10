
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PoolCalcPage() {
  const [form, setForm] = useState({
    length: '',
    width: '',
    shallow: '',
    deep: '',
    name: '',
  });
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const pool = {
      ...form,
      name: form.name || 'Pool 1',
    };
    await fetch('/api/pooldata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pool }),
    });
    setSuccess(true);
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push('/home');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Calculate Your Pool</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="length" placeholder="Length (ft)" value={form.length} onChange={handleChange} className="border p-2" required />
        <input name="width" placeholder="Width (ft)" value={form.width} onChange={handleChange} className="border p-2" required />
        <input name="shallow" placeholder="Shallow End (ft)" value={form.shallow} onChange={handleChange} className="border p-2" required />
        <input name="deep" placeholder="Deep End (ft)" value={form.deep} onChange={handleChange} className="border p-2" required />
        <input name="name" placeholder="Pool Name (optional)" value={form.name} onChange={handleChange} className="border p-2" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save Pool</button>
      </form>
      {success && <p className="mt-4 text-green-600">Pool saved! Redirecting to homepage...</p>}
    </main>
  );
}
