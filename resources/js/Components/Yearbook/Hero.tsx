import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const yLeft = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const yRight = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacityContent = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const titleWords = "MEMORIES".split("");

    return (
        <div ref={containerRef} className="relative h-screen bg-[#F4F1EE]">
            <section className="relative h-full w-full flex items-center justify-center overflow-hidden">
                {/* 1. Grain Texture */}
                <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-10" />

                {/* 2. Floating Images */}
                <motion.div
                    style={{ y: yLeft, opacity: opacityContent }}
                    className="absolute left-[5%] top-[20%] w-[15vw] aspect-[3/4] z-20 shadow-xl rounded-sm border-[6px] border-white hidden md:block"
                >
                    <img
                        src="https://images.unsplash.com/photo-1523240682765-e70e80db93d4?q=80&w=800"
                        className="w-full h-full object-cover grayscale"
                        alt="Class"
                    />
                </motion.div>

                <motion.div
                    style={{ y: yRight, opacity: opacityContent }}
                    className="absolute right-[5%] bottom-[20%] w-[20vw] aspect-video z-20 shadow-xl rounded-sm border-[6px] border-white rotate-3 hidden md:block"
                >
                    <img
                        src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800"
                        className="w-full h-full object-cover grayscale"
                        alt="Team"
                    />
                </motion.div>

                {/* 3. Main Content Center - FIXED WIDTH & FLEX */}
                <motion.div
                    style={{ opacity: opacityContent }}
                    className="relative z-30 w-full max-w-[90vw] md:max-w-[80vw] text-center flex flex-col items-center justify-center mx-auto"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 text-[var(--warm-gray)] text-[10px] md:text-xs font-mono tracking-[0.5em] uppercase whitespace-nowrap"
                    >
                        Software Engineering Edition
                    </motion.span>

                    {/* Container kata-kata agar tidak overflow ke kanan */}
                    <div className="flex flex-wrap justify-center items-center w-full overflow-visible">
                        {titleWords.map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 1,
                                    delay: 0.2 + i * 0.05,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                // Mengurangi ukuran font sedikit agar lebih aman di layar sedang
                                className="block text-[16vw] md:text-[12vw] leading-none font-serif italic text-[#1a1a1a] select-none"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="max-w-xs md:max-w-md text-[10px] md:text-sm leading-relaxed text-gray-500 font-light px-4 uppercase tracking-[0.3em] mt-4"
                    >
                        Sebuah Yearbook kelas Rekayasa Perangkat Lunak 2024.
                    </motion.p>
                </motion.div>

                {/* 4. Bottom Quote Section - FIXED WIDTH */}
                <motion.div
                    style={{ opacity: opacityContent }}
                    className="absolute bottom-12 left-0 right-0 text-center z-40 px-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <p
                        className="font-serif leading-tight"
                        style={{
                            fontSize: "clamp(0.875rem, 2.5vw, 1.25rem)",
                            color: "var(--burgundy)",
                            fontStyle: "italic",
                        }}
                    >
                        "Our journey, our stories, our legacy"
                    </p>
                </motion.div>

                {/* 5. Decorative Label */}
                <div className="absolute top-32 left-8 hidden lg:block opacity-30 z-40">
                    <p className="text-[10px] font-mono rotate-90 origin-left tracking-widest text-[#1a1a1a]">
                        RPL_MOD_V.01
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Hero;
