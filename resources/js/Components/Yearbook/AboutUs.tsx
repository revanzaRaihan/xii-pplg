// resources/js/Components/Yearbook/AboutUs.tsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StudentCard from '@/Components/UI/StudentCard';
import { Student } from '@/types/yearbook';

interface AboutUsProps {
    students?: Student[];
}

const AboutUs: React.FC<AboutUsProps> = ({ students }) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Default students data jika tidak ada dari backend
    const defaultStudents: Student[] = [
        {
            id: 1,
            name: 'Ahmad Rizki',
            nickname: 'Rizki',
            role: 'Full Stack Developer',
            github: 'https://github.com/ahmadrizki',
            instagram: 'https://instagram.com/ahmadrizki',
            portrait: '/images/students/student-1.jpg',
            bio: 'Passionate about creating beautiful web applications.',
        },
        {
            id: 2,
            name: 'Siti Nurhaliza',
            nickname: 'Siti',
            role: 'Frontend Developer',
            github: 'https://github.com/sitinur',
            instagram: 'https://instagram.com/sitinur',
            portrait: '/images/students/student-2.jpg',
            bio: 'UI/UX enthusiast with love for clean design.',
        },
        // Tambahkan siswa lainnya...
    ];

    const studentData = students || defaultStudents;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const titleY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative min-h-screen py-32 overflow-hidden grain-texture"
            style={{ backgroundColor: 'var(--cream)' }}
        >
            {/* Section Header */}
            <motion.div
                style={{ y: titleY, opacity: titleOpacity }}
                className="max-w-7xl mx-auto px-6 lg:px-12 mb-20"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                    <div>
                        <h2
                            className="text-display"
                            style={{
                                fontSize: 'clamp(3rem, 8vw, 6rem)',
                                lineHeight: '0.9',
                                color: 'var(--charcoal)',
                            }}
                        >
                            Meet
                            <br />
                            <span style={{ color: 'var(--burgundy)' }}>The Team</span>
                        </h2>
                    </div>
                    <div>
                        <p
                            className="text-body"
                            style={{
                                fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                                color: 'var(--warm-gray)',
                                lineHeight: '1.8',
                            }}
                        >
                            Kami adalah siswa Rekayasa Perangkat Lunak yang bersemangat dalam
                            menciptakan solusi teknologi. Setiap individu membawa keunikan dan
                            keahlian yang berkontribusi pada kesuksesan bersama.
                        </p>
                        <div className="mt-6 flex gap-8">
                            <div>
                                <p
                                    className="text-display"
                                    style={{
                                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                                        color: 'var(--burgundy)',
                                    }}
                                >
                                    {studentData.length}
                                </p>
                                <p
                                    className="text-body text-xs uppercase tracking-widest"
                                    style={{ color: 'var(--cool-gray)' }}
                                >
                                    Students
                                </p>
                            </div>
                            <div>
                                <p
                                    className="text-display"
                                    style={{
                                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                                        color: 'var(--burgundy)',
                                    }}
                                >
                                    01
                                </p>
                                <p
                                    className="text-body text-xs uppercase tracking-widest"
                                    style={{ color: 'var(--cool-gray)' }}
                                >
                                    Class
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Student Cards Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {studentData.map((student, index) => (
                        <StudentCard key={student.id} student={student} index={index} />
                    ))}
                </div>
            </div>

            {/* Bottom Quote */}
            <motion.div
                className="max-w-7xl mx-auto px-6 lg:px-12 mt-32"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <div className="border-t-2 pt-12" style={{ borderColor: 'var(--warm-gray)' }}>
                    <p
                        className="text-heading italic text-center"
                        style={{
                            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                            color: 'var(--charcoal)',
                            maxWidth: '48rem',
                            margin: '0 auto',
                        }}
                    >
                        "Individually we are one drop, together we are an ocean."
                    </p>
                    <p
                        className="text-body text-center mt-4"
                        style={{
                            fontSize: '0.875rem',
                            color: 'var(--cool-gray)',
                            letterSpacing: '0.1em',
                        }}
                    >
                        — RPL Class 2024
                    </p>
                </div>
            </motion.div>

            {/* Decorative Elements */}
            <div
                className="absolute top-1/3 right-0 w-96 h-96 rounded-full opacity-5"
                style={{
                    background: `radial-gradient(circle, var(--burgundy) 0%, transparent 70%)`,
                    filter: 'blur(120px)',
                }}
            />
            <div
                className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full opacity-5"
                style={{
                    background: `radial-gradient(circle, var(--forest-green) 0%, transparent 70%)`,
                    filter: 'blur(100px)',
                }}
            />
        </section>
    );
};

export default AboutUs;