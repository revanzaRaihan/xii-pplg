// resources/js/Components/Yearbook/Goodbye.tsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Goodbye: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Animasi yang lebih halus menggunakan Spring
    const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.8, 1]), {
        stiffness: 100,
        damping: 30,
    });
    
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section
            id="goodbye"
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#faf9f6]"
        >
            {/* Grainy Texture Layer */}
            <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <motion.div
                style={{ scale, opacity }}
                className="relative z-10 max-w-5xl mx-auto px-6 text-center"
            >
                {/* Main Heading dengan Efek Parallax */}
                <motion.div style={{ y: yText }} className="mb-12">
                    <span className="block text-[10px] uppercase tracking-[0.8em] text-[#8b7e74] mb-8 font-bold">
                        End of Chapter
                    </span>
                    <h2 
                        className="font-serif italic leading-[0.8] text-[#1a1a1a]" 
                        style={{ fontSize: 'clamp(5rem, 15vw, 12rem)' }}
                    >
                        Thank <br />
                        <span className="text-[#630d0d] relative">
                            You
                            {/* Decorative Line under "You" */}
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                transition={{ duration: 1.5, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
                                className="absolute -bottom-4 left-0 h-[2px] bg-[#630d0d]/20"
                            />
                        </span>
                    </h2>
                </motion.div>

                {/* Subtitle & Description */}
                <div className="space-y-8 max-w-xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-[#5b5b5b] text-lg font-light leading-relaxed"
                    >
                        Perjalanan kami sebagai siswa RPL mungkin berakhir di sini, 
                        namun kode yang kami tulis dan kenangan yang kami buat akan tetap abadi.
                    </motion.p>

                    {/* Social links dengan Hover Effect yang Lincah */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center justify-center gap-12 pt-8"
                    >
                        {[
                            { name: 'Instagram', url: 'https://instagram.com/rpl.class' },
                            { name: 'GitHub', url: 'https://github.com/rpl-class' }
                        ].map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                className="group relative text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1a1a]"
                                whileHover={{ y: -2 }}
                            >
                                {link.name}
                                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#1a1a1a] transition-all duration-500 group-hover:w-full" />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Footer / Credits Section - Dibuat sangat elegan */}
            <div className="absolute bottom-12 left-0 w-full px-12 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="text-left">
                    <p className="text-[8px] uppercase tracking-[0.4em] text-[#8b7e74] mb-2">Developed By</p>
                    <p className="font-serif italic text-[#1a1a1a] text-lg">Your Name</p>
                    <p className="text-[9px] text-[#5b5b5b] tracking-wider">Full Stack Developer — Class of 2024</p>
                </div>

                <div className="text-right hidden md:block">
                    <p className="text-[8px] uppercase tracking-[0.4em] text-[#8b7e74] mb-2">Engineered With</p>
                    <p className="text-[10px] text-[#1a1a1a] font-medium tracking-tighter">
                        Laravel • React • TS • Framer Motion
                    </p>
                </div>
            </div>

            {/* Floating Star Ornament */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-20 -right-20 opacity-[0.03] pointer-events-none"
            >
                <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5l4.226 8.56 9.447 1.372-6.837 6.665 1.614 9.403L12 18.102l-8.45 4.448 1.614-9.403-6.837-6.665 9.447-1.372L12 .5z"/>
                </svg>
            </motion.div>
        </section>
    );
};

export default Goodbye;