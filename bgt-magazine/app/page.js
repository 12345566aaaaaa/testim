"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Identifikimi në Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        setErrorMsg("Gabim: " + authError.message);
        setLoading(false);
        return;
      }

      // 2. Marrja e rolit direkt nga tabela 'profiles'
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError || !profileData) {
        router.push('/dashboard');
      } else {
        const userRole = profileData.role;

        // 3. Ridrejtimi sipas rolit në tabelë
        if (userRole === 'editor') {
          router.push('/editor');
        } else if (userRole === 'gazetar') {
          router.push('/jurnalist');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      setErrorMsg("Ndodhi një gabim i papritur.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-slate-800 w-full max-w-[500px]">
        
        {/* Header - Stili BGT */}
        <div className="flex flex-row items-center gap-5 border-b border-gray-100 dark:border-slate-800 pb-8 mb-8">
          <div className="bg-white dark:bg-slate-800 p-2.5 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-700 flex-shrink-0">
            <Image src="/logo-bgt.png" alt="Logo" width={65} height={65} className="object-contain dark:invert-[0.1]" priority />
          </div>
          <div className="flex flex-col text-left">
            <h1 className="text-2xl font-extrabold tracking-tight leading-tight">
              <span className="text-gray-300 dark:text-slate-600">BGT-</span>
              <span className="text-[#1a5f7a] dark:text-[#38bdf8]">Gazeta</span>
              <span className="text-[#f59e0b]"> Online</span>
            </h1>
            <p className="text-gray-400 dark:text-slate-500 text-xs mt-1 font-bold uppercase tracking-widest">Identifikohu</p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 text-xs font-bold rounded-lg border border-red-100 text-center uppercase">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 ml-1 uppercase text-left">Email</label>
            <input 
              type="email" 
              required 
              placeholder="user@example.com"
              className="w-full p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 outline-none focus:border-[#1a5f7a] dark:focus:border-[#38bdf8] focus:bg-white dark:focus:bg-slate-800 text-base transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Fjalëkalimi</label>
              {/* Korigjimi këtu: className në vend të class */}
              <a href="/forgot-password" title="Rivendos fjalëkalimin" className="text-[10px] text-[#1a5f7a] font-bold hover:underline">
                Harruat fjalëkalimin?
              </a>
            </div>
            <input 
              type="password" 
              required 
              placeholder="••••••••"
              className="w-full p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 outline-none focus:border-[#1a5f7a] dark:focus:border-[#38bdf8] focus:bg-white dark:focus:bg-slate-800 text-base transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-[#1a5f7a] hover:bg-[#144a5f] text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 mt-4 text-sm uppercase tracking-widest"
          >
            {loading ? 'Duke u procesuar...' : 'Identifikohu'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 dark:text-slate-500 mt-8 pt-6 border-t border-gray-50 dark:border-slate-800">
          Nuk keni llogari? <a href="/register" className="text-[#f59e0b] font-bold hover:underline">Regjistrohu</a>
        </p>
      </div>
    </div>
  );
}