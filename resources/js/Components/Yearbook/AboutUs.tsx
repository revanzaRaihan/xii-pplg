// resources/js/Components/Yearbook/AboutUs.tsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import StudentCard from '@/Components/UI/StudentCard';
import { Student } from '@/types/yearbook';

interface AboutUsProps {
    students?: Student[];
}

const AboutUs: React.FC<AboutUsProps> = ({ students }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

    const studentData = students || []; // Data disingkat untuk efisiensi contoh

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const titleY = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative min-h-screen py-32 overflow-hidden bg-[#fdfbf7]"
        >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none grain-texture" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Judul dengan Animasi "Mask Reveal" */}
                    <motion.div 
                        className="lg:col-span-7"
                        style={{ y: titleY, opacity }}
                    >
                        <div className="overflow-hidden">
                            <motion.h2
                                initial={{ y: "100%" }}
                                animate={isInView ? { y: 0 } : { y: "100%" }}
                                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                                className="text-display font-serif"
                                style={{
                                    fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                                    lineHeight: '0.85',
                                    color: '#1a1a1a',
                                    letterSpacing: '-0.04em'
                                }}
                            >
                                Meet
                                <br />
                                <span className="italic" style={{ color: '#800020', fontWeight: 300 }}>The Team</span>
                            </motion.h2>
                        </div>
                    </motion.div>

                    {/* Deskripsi dengan Staggered Lines */}
                    <motion.div 
                        className="lg:col-span-5 pt-8 lg:pt-20"
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p
                            className="text-body font-light italic"
                            style={{
                                fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                                color: '#4a4a4a',
                                lineHeight: '1.8',
                                borderLeft: '2px solid #800020',
                                paddingLeft: '1.5rem'
                            }}
                        >
                            Kami adalah siswa Rekayasa Perangkat Lunak yang bersemangat dalam
                            menciptakan solusi teknologi. Setiap individu membawa keunikan dan
                            keahlian yang berkontribusi pada kesuksesan bersama.
                        </p>

                        {/* Statistik dengan Animasi Angka */}
                        <div className="mt-12 flex gap-12 items-center">
                            <div className="relative group cursor-default">
                                <motion.p 
                                    className="text-5xl font-serif text-burgundy"
                                    whileHover={{ scale: 1.1, color: '#d4af37' }}
                                >
                                    {studentData.length}
                                </motion.p>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-2">Students</p>
                                {/* Line Decor ala Yucca */}
                                <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
                            </div>
                            
                            <div className="w-[1px] h-12 bg-gray-200" />
                            
                            <div className="relative group cursor-default">
                                <motion.p 
                                    className="text-5xl font-serif text-burgundy tracking-tighter"
                                    whileHover={{ scale: 1.1, color: '#d4af37' }}
                                >
                                    01
                                </motion.p>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-2">Class</p>
                                <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Grid Kartu Siswa */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                    {studentData.map((student, index) => (
                        <StudentCard key={student.id} student={student} index={index} />
                    ))}
                </div>
            </div>

            {/* Quote dengan Hover Effect */}
            <motion.div
                className="max-w-4xl mx-auto px-6 mt-40 text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <motion.div 
                    className="inline-block w-12 h-[1px] bg-gold mb-8 transition-all duration-700 group-hover:w-24" 
                />
                <p
                    className="font-serif italic leading-snug transition-colors duration-500 group-hover:text-burgundy"
                    style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                        color: '#1a1a1a',
                    }}
                >
                    "Individually we are one drop, together we are an ocean."
                </p>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.5em] text-gray-400">
                    — RPL Class 2024 —
                </p>
            </motion.div>

            {/* Orbs tetap subtle */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-burgundy/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
};

export default AboutUs;