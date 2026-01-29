// resources/js/Components/UI/CommentBubble.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Comment } from '@/types/yearbook';

interface CommentBubbleProps {
    comment: Comment;
    index: number;
}

const CommentBubble: React.FC<CommentBubbleProps> = ({ comment, index }) => {
    // Random positioning untuk bubble effect
    const randomX = Math.random() * 20 - 10; // -10 to 10
    const randomRotate = Math.random() * 10 - 5; // -5 to 5

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.5,
                y: 100,
                x: randomX,
                rotate: randomRotate,
            }}
            whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
                x: 0,
                rotate: 0,
            }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.34, 1.56, 0.64, 1], // Bounce effect
            }}
            whileHover={{
                scale: 1.05,
                rotate: randomRotate / 2,
                transition: { duration: 0.2 },
            }}
            className="relative group"
        >
            {/* Bubble Container */}
            <div
                className="relative p-6 rounded-3xl transition-all duration-300"
                style={{
                    backgroundColor: 'var(--beige)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                }}
            >
                {/* Emoji (if exists) */}
                {comment.emoji && (
                    <motion.div
                        className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                        style={{
                            backgroundColor: 'var(--gold)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        }}
                        animate={{
                            rotate: [0, -10, 10, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                    >
                        {comment.emoji}
                    </motion.div>
                )}

                {/* Message */}
                <p
                    className="text-body mb-4"
                    style={{
                        fontSize: '0.875rem',
                        color: 'var(--charcoal)',
                        lineHeight: '1.6',
                    }}
                >
                    "{comment.message}"
                </p>

                {/* Author & Date */}
                <div className="flex items-center justify-between gap-4">
                    <p
                        className="text-body font-bold"
                        style={{
                            fontSize: '0.75rem',
                            color: 'var(--burgundy)',
                        }}
                    >
                        {comment.name}
                    </p>
                    <p
                        className="text-body"
                        style={{
                            fontSize: '0.625rem',
                            color: 'var(--cool-gray)',
                            letterSpacing: '0.05em',
                        }}
                    >
                        {formatDate(comment.created_at)}
                    </p>
                </div>

                {/* Decorative Corner */}
                <div
                    className="absolute bottom-0 right-0 w-16 h-16 opacity-10 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at bottom right, var(--burgundy) 0%, transparent 70%)`,
                        borderBottomRightRadius: '1.5rem',
                    }}
                />
            </div>

            {/* Hover Shadow */}
            <motion.div
                className="absolute inset-0 -z-10 rounded-3xl"
                style={{
                    backgroundColor: 'var(--burgundy)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 0.2 }}
            />
        </motion.div>
    );
};

export default CommentBubble;