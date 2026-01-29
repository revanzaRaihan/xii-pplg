// resources/js/Components/Yearbook/Goodbye.tsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Goodbye: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <section
            id="goodbye"
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden grain-texture"
            style={{ backgroundColor: 'var(--cream)' }}
        >
            <motion.div
                style={{ scale, opacity }}
                className="max-w-5xl mx-auto px-6 lg:px-12 text-center"
            >
                {/* Main Thank You Message */}
                <motion.h2
                    className="text-display mb-8"
                    style={{
                        fontSize: 'clamp(4rem, 12vw, 10rem)',
                        lineHeight: '0.9',
                        color: 'var(--charcoal)',
                    }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    Thank
                    <br />
                    <span style={{ color: 'var(--burgundy)' }}>You</span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    className="text-heading mb-12"
                    style={{
                        fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                        color: 'var(--warm-gray)',
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    For visiting our digital yearbook
                </motion.p>

                {/* Description */}
                <motion.p
                    className="text-body mb-16"
                    style={{
                        fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                        color: 'var(--cool-gray)',
                        maxWidth: '32rem',
                        margin: '0 auto 4rem',
                        lineHeight: '1.8',
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Kami harap perjalanan melalui kenangan kami memberikan inspirasi dan
                    gambaran tentang semangat kami sebagai siswa RPL.
                </motion.p>

                {/* Call to Action */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.7 }}
                >
                    <p
                        className="text-body mb-6"
                        style={{
                            fontSize: '0.875rem',
                            color: 'var(--charcoal)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}
                    >
                        Check us out!
                    </p>
                    <div className="flex items-center justify-center gap-6 flex-wrap">
                        <motion.a
                            href="https://instagram.com/rpl.class"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover-underline text-body"
                            style={{
                                fontSize: '1rem',
                                color: 'var(--burgundy)',
                                fontWeight: 'bold',
                            }}
                            whileHover={{ x: 5 }}
                        >
                            Instagram →
                        </motion.a>
                        <motion.a
                            href="https://github.com/rpl-class"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover-underline text-body"
                            style={{
                                fontSize: '1rem',
                                color: 'var(--burgundy)',
                                fontWeight: 'bold',
                            }}
                            whileHover={{ x: 5 }}
                        >
                            GitHub →
                        </motion.a>
                    </div>
                </motion.div>

                {/* Divider */}
                <motion.div
                    className="w-32 h-px mx-auto mb-16"
                    style={{ backgroundColor: 'var(--warm-gray)' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '8rem' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.9 }}
                />

                {/* Credits */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.1 }}
                >
                    <div>
                        <p
                            className="text-body mb-2"
                            style={{
                                fontSize: '0.625rem',
                                color: 'var(--cool-gray)',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                            }}
                        >
                            Website Created By
                        </p>
                        <p
                            className="text-heading"
                            style={{
                                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                                color: 'var(--charcoal)',
                            }}
                        >
                            [Your Name]
                        </p>
                        <p
                            className="text-body"
                            style={{
                                fontSize: '0.75rem',
                                color: 'var(--warm-gray)',
                            }}
                        >
                            Full Stack Developer - RPL 2024
                        </p>
                    </div>

                    <div>
                        <p
                            className="text-body mb-2"
                            style={{
                                fontSize: '0.625rem',
                                color: 'var(--cool-gray)',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                            }}
                        >
                            Built With
                        </p>
                        <p
                            className="text-body"
                            style={{
                                fontSize: '0.75rem',
                                color: 'var(--warm-gray)',
                            }}
                        >
                            Laravel 12 • React • TypeScript • Framer Motion • Lenis
                        </p>
                    </div>

                    <div className="pt-8">
                        <p
                            className="text-body"
                            style={{
                                fontSize: '0.625rem',
                                color: 'var(--cool-gray)',
                                letterSpacing: '0.1em',
                            }}
                        >
                            © 2024 RPL Class. All memories preserved with love.
                        </p>
                    </div>
                </motion.div>

                {/* Floating Decoration */}
                <motion.div
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ opacity: 0.3 }}
                    >
                        <path
                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                            fill="var(--burgundy)"
                        />
                    </svg>
                </motion.div>
            </motion.div>

            {/* Background Decorative Elements */}
            <div
                className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-5"
                style={{
                    background: `radial-gradient(circle, var(--burgundy) 0%, transparent 70%)`,
                    filter: 'blur(80px)',
                }}
            />
            <div
                className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-5"
                style={{
                    background: `radial-gradient(circle, var(--gold) 0%, transparent 70%)`,
                    filter: 'blur(100px)',
                }}
            />
        </section>
    );
};

export default Goodbye;