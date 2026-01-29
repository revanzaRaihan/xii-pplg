// resources/js/Components/UI/StudentCard.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Student } from '@/types/yearbook';

interface StudentCardProps {
    student: Student;
    index: number;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group"
        >
            {/* Card Container */}
            <div
                className="relative overflow-hidden rounded-lg transition-all duration-500"
                style={{
                    backgroundColor: 'var(--beige)',
                    aspectRatio: '3/4',
                }}
            >
                {/* Portrait Image */}
                <div className="relative w-full h-full overflow-hidden">
                    <motion.img
                        src={student.portrait}
                        alt={student.name}
                        className="w-full h-full object-cover"
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Gradient Overlay */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background:
                                'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
                        }}
                        animate={{
                            opacity: isHovered ? 1 : 0.7,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Student Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <motion.h3
                        className="text-heading mb-1"
                        style={{
                            fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                            color: 'var(--cream)',
                        }}
                        animate={{
                            y: isHovered ? -10 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {student.name}
                    </motion.h3>

                    {student.nickname && (
                        <motion.p
                            className="text-body mb-2"
                            style={{
                                fontSize: '0.875rem',
                                color: 'var(--gold)',
                            }}
                            animate={{
                                opacity: isHovered ? 1 : 0.7,
                            }}
                        >
                            "{student.nickname}"
                        </motion.p>
                    )}

                    <motion.p
                        className="text-body"
                        style={{
                            fontSize: '0.75rem',
                            color: 'var(--warm-gray)',
                            letterSpacing: '0.05em',
                        }}
                        animate={{
                            opacity: isHovered ? 1 : 0.6,
                        }}
                    >
                        {student.role}
                    </motion.p>

                    {/* Bio (shows on hover) */}
                    {student.bio && (
                        <motion.p
                            className="text-body mt-3"
                            style={{
                                fontSize: '0.75rem',
                                color: 'var(--cream)',
                                lineHeight: '1.6',
                            }}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                height: isHovered ? 'auto' : 0,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {student.bio}
                        </motion.p>
                    )}
                </div>

                {/* Social Links */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between z-10">
                    {/* GitHub Link - Top Left */}
                    <motion.a
                        href={student.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-underline text-body"
                        style={{
                            fontSize: '0.75rem',
                            color: 'var(--cream)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            x: isHovered ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        whileHover={{ x: 5 }}
                    >
                        GitHub →
                    </motion.a>

                    {/* Instagram Link - Top Right */}
                    <motion.a
                        href={student.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-underline text-body"
                        style={{
                            fontSize: '0.75rem',
                            color: 'var(--cream)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            x: isHovered ? 0 : 20,
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        whileHover={{ x: -5 }}
                    >
                        ← Instagram
                    </motion.a>
                </div>

                {/* Border Glow on Hover */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        boxShadow: `inset 0 0 0 2px var(--burgundy)`,
                    }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Floating Number Badge */}
            <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center z-20"
                style={{
                    backgroundColor: 'var(--burgundy)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
                animate={{
                    scale: isHovered ? 1.1 : 1,
                    rotate: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                <span
                    className="text-body font-bold"
                    style={{
                        fontSize: '1rem',
                        color: 'var(--cream)',
                    }}
                >
                    {(index + 1).toString().padStart(2, '0')}
                </span>
            </motion.div>
        </motion.div>
    );
};

export default StudentCard;