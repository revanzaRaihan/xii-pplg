// resources/js/Components/Yearbook/Hero.tsx

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '@/Hooks/useScrollAnimation';

const Hero: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
    const [descRef, descVisible] = useScrollAnimation({ threshold: 0.3, triggerOnce: true });
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden grain-texture"
            style={{ backgroundColor: 'var(--cream)' }}
        >
            <motion.div
                style={{ y, opacity }}
                className="max-w-7xl mx-auto px-6 lg:px-12 w-full"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Side - Welcome Text */}
                    <div
                        ref={titleRef}
                        className={`blur-in ${titleVisible ? 'visible' : ''}`}
                        style={{ transitionDelay: '0.2s' }}
                    >
                        <motion.h1
                            className="text-display"
                            style={{
                                fontSize: 'clamp(3rem, 10vw, 8rem)',
                                lineHeight: '0.9',
                                color: 'var(--charcoal)',
                            }}
                            initial={{ opacity: 0, y: 100 }}
                            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Welcome
                            <br />
                            to our
                            <br />
                            <span style={{ color: 'var(--burgundy)' }}>Class!</span>
                        </motion.h1>
                    </div>

                    {/* Right Side - Description */}
                    <div
                        ref={descRef}
                        className={`blur-in ${descVisible ? 'visible' : ''}`}
                        style={{ transitionDelay: '0.6s' }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={descVisible ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                        >
                            <p
                                className="text-heading mb-6"
                                style={{
                                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                    color: 'var(--charcoal)',
                                    lineHeight: '1.3',
                                }}
                            >
                                Rekayasa Perangkat Lunak
                            </p>
                            <p
                                className="text-body"
                                style={{
                                    fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                                    color: 'var(--warm-gray)',
                                    lineHeight: '1.8',
                                    maxWidth: '28rem',
                                }}
                            >
                                Selamat datang di yearbook digital kami. Ini adalah koleksi kenangan,
                                perjalanan, dan cerita dari kami sebagai siswa Rekayasa Perangkat Lunak.
                                Kami telah belajar, bertumbuh, dan menciptakan sesuatu yang bermakna bersama-sama.
                            </p>
                            <motion.div
                                className="mt-8"
                                initial={{ opacity: 0 }}
                                animate={descVisible ? { opacity: 1 } : {}}
                                transition={{ delay: 1, duration: 0.8 }}
                            >
                                <p
                                    className="text-body"
                                    style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--cool-gray)',
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Scroll untuk menjelajahi ↓
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Quote */}
                <motion.div
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <p
                        className="text-body"
                        style={{
                            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                            color: 'var(--burgundy)',
                            fontStyle: 'italic',
                        }}
                    >
                        "Our journey, our stories, our legacy"
                    </p>
                </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div
                className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10"
                style={{
                    background: `radial-gradient(circle, var(--burgundy) 0%, transparent 70%)`,
                    filter: 'blur(80px)',
                }}
            />
            <div
                className="absolute bottom-20 left-20 w-96 h-96 rounded-full opacity-10"
                style={{
                    background: `radial-gradient(circle, var(--forest-green) 0%, transparent 70%)`,
                    filter: 'blur(100px)',
                }}
            />
        </section>
    );
};

export default Hero;