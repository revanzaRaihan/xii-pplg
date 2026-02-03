import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    exit={{ 
                        clipPath: 'inset(0 0 100% 0)', // Efek menutup seperti tirai kamera
                        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[10000] bg-[#0a0a0a] flex flex-col items-center justify-center pointer-events-none"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-center px-10"
                    >
                        {/* Judul dengan Efek Emas Mengkilap */}
                        <motion.h1 
                            className="font-serif text-4xl md:text-6xl italic mb-6 tracking-tight"
                            style={{ 
                                color: '#d4af37', // Warna Gold murni (Hex)
                                textShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
                            }}
                        >
                            RPL <span className="text-white/90">Class</span>
                        </motion.h1>

                        {/* Progress Bar yang Lebih Mewah */}
                        <div className="w-64 h-[2px] bg-white/5 relative overflow-hidden mx-auto">
                            <motion.div 
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    ease: "easeInOut" 
                                }}
                                className="absolute inset-0 w-full"
                                style={{ 
                                    background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' 
                                }}
                            />
                        </div>

                        {/* Subtitle dengan Animasi Huruf Muncul Satu Per Satu */}
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-white text-[10px] uppercase tracking-[0.6em] mt-8 font-light"
                        >
                            Preparing the Experience
                        </motion.p>
                    </motion.div>

                    {/* Background Dekoratif (Opsional, agar tidak terlalu gelap total) */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/10 blur-[120px] rounded-full" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;