"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '', email: '', password: '', confirm_password: ''
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirm_password) {
      setModalMsg("Fjalëkalimet nuk përputhen!");
      setIsSuccess(false);
      setShowModal(true);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { full_name: formData.full_name } }
    });

    if (error) {
      setModalMsg("Gabim: " + error.message);
      setIsSuccess(false);
    } else {
      setModalMsg("Regjistrimi u krye me sukses! Kontrolloni email-in.");
      setIsSuccess(true);
    }
    setShowModal(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Këtu e rrita gjerësinë në max-w-[500px] dhe padding në p-10 */}
      <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-slate-800 w-full max-w-[500px]">
        
        {/* Header i zgjeruar */}
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
            <p className="text-gray-400 dark:text-slate-500 text-xs mt-1 font-bold uppercase tracking-widest">Krijo llogarinë tënde</p>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 ml-1 uppercase">Emri i plotë</label>
            <input 
              type="text" 
              required 
              placeholder="John Doe"
              className="w-full p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 outline-none focus:border-[#1a5f7a] dark:focus:border-[#38bdf8] focus:bg-white dark:focus:bg-slate-800 text-base transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600" 
              onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 ml-1 uppercase">Email</label>
            <input 
              type="email" 
              required 
              placeholder="user@example.com"
              className="w-full p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 outline-none focus:border-[#1a5f7a] dark:focus:border-[#38bdf8] focus:bg-white dark:focus:bg-slate-800 text-base transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 ml-1 uppercase">Fjalëkalimi</label>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 outline-none focus:border-[#1a5f7a] dark:focus:border-[#38bdf8] focus:bg-white dark:focus:bg-slate-800 text-base transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600" 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 ml-1 uppercase">Konfirmo</label>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 outline-none focus:border-[#1a5f7a] dark:focus:border-[#38bdf8] focus:bg-white dark:focus:bg-slate-800 text-base transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600" 
                onChange={(e) => setFormData({...formData, confirm_password: e.target.value})} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-[#1a5f7a] hover:bg-[#144a5f] text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 mt-4 text-sm uppercase tracking-widest"
          >
            {loading ? 'Duke u procesuar...' : 'Krijo Llogarinë'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 dark:text-slate-500 mt-8 pt-6 border-t border-gray-50 dark:border-slate-800">
          Keni llogari? <a href="/" className="text-[#1a5f7a] dark:text-[#38bdf8] font-bold hover:underline">Hyr këtu</a>
        </p>

        {/* Modal i suksesit/gabimit */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-[350px] w-full shadow-2xl text-center border border-gray-50 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
              <div className={`w-16 h-16 ${isSuccess ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {isSuccess ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
               <h3 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-2">{isSuccess ? 'Sukses!' : 'Gabim'}</h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-6">{modalMsg}</p>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition-colors text-sm uppercase"
              >
                Mbyll
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}