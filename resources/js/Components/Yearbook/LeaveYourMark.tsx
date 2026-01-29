// resources/js/Components/Yearbook/LeaveYourMark.tsx

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useForm } from '@inertiajs/react';
import CommentBubble from '@/Components/UI/CommentBubble';
import { Comment } from '@/types/yearbook';

interface LeaveYourMarkProps {
    comments?: Comment[];
}

const LeaveYourMark: React.FC<LeaveYourMarkProps> = ({ comments }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [selectedEmoji, setSelectedEmoji] = useState<string>('');

    const emojis = ['😊', '🎉', '❤️', '🌟', '👍', '🎓', '💪', '🚀'];

    // Inertia form handling
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        message: '',
        emoji: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/api/comments', {
            onSuccess: () => {
                reset();
                setSelectedEmoji('');
            },
        });
    };

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const titleY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    // Default comments
    const defaultComments: Comment[] = [
        {
            id: 1,
            name: 'Alumni 2023',
            message: 'Semangat untuk kalian! Masa-masa ini akan jadi kenangan terindah.',
            created_at: '2024-01-15T10:30:00Z',
            emoji: '🎓',
        },
        {
            id: 2,
            name: 'Guru Pembimbing',
            message: 'Bangga melihat perkembangan kalian. Keep up the good work!',
            created_at: '2024-01-16T14:20:00Z',
            emoji: '👍',
        },
    ];

    const commentData = comments || defaultComments;

    return (
        <section
            id="leave-mark"
            ref={sectionRef}
            className="relative min-h-screen py-32 overflow-hidden"
            style={{ backgroundColor: 'var(--charcoal)' }}
        >
            {/* Section Header */}
            <motion.div
                style={{ y: titleY, opacity: titleOpacity }}
                className="max-w-7xl mx-auto px-6 lg:px-12 mb-20"
            >
                <h2
                    className="text-display mb-6"
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        lineHeight: '0.9',
                        color: 'var(--cream)',
                    }}
                >
                    Leave
                    <br />
                    Your <span style={{ color: 'var(--gold)' }}>Mark</span>
                </h2>
                <p
                    className="text-body"
                    style={{
                        fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                        color: 'var(--warm-gray)',
                        maxWidth: '32rem',
                        lineHeight: '1.8',
                    }}
                >
                    Tinggalkan pesan, doa, atau kenangan untuk kami. Setiap kata yang kamu
                    tuliskan akan menjadi bagian dari perjalanan kami.
                </p>
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Comment Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="sticky top-32"
                    >
                        <div
                            className="p-8 rounded-3xl"
                            style={{
                                backgroundColor: 'var(--deep-gray)',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                            }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Input */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="text-body block mb-2"
                                        style={{
                                            fontSize: '0.875rem',
                                            color: 'var(--cream)',
                                            letterSpacing: '0.05em',
                                        }}
                                    >
                                        Nama Kamu
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg text-body transition-all duration-300 focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: 'var(--charcoal)',
                                            color: 'var(--cream)',
                                            fontSize: '0.875rem',
                                            border: '2px solid transparent',
                                            borderColor: errors.name
                                                ? 'var(--burgundy)'
                                                : 'transparent',
                                        }}
                                        placeholder="Masukkan nama kamu..."
                                        required
                                    />
                                    {errors.name && (
                                        <p
                                            className="text-body mt-1"
                                            style={{ fontSize: '0.75rem', color: 'var(--wine)' }}
                                        >
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Message Input */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="text-body block mb-2"
                                        style={{
                                            fontSize: '0.875rem',
                                            color: 'var(--cream)',
                                            letterSpacing: '0.05em',
                                        }}
                                    >
                                        Pesan Kamu
                                    </label>
                                    <textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg text-body transition-all duration-300 focus:outline-none focus:ring-2 resize-none"
                                        style={{
                                            backgroundColor: 'var(--charcoal)',
                                            color: 'var(--cream)',
                                            fontSize: '0.875rem',
                                            lineHeight: '1.6',
                                            border: '2px solid transparent',
                                            borderColor: errors.message
                                                ? 'var(--burgundy)'
                                                : 'transparent',
                                        }}
                                        placeholder="Tuliskan pesan, doa, atau kenangan..."
                                        required
                                    />
                                    {errors.message && (
                                        <p
                                            className="text-body mt-1"
                                            style={{ fontSize: '0.75rem', color: 'var(--wine)' }}
                                        >
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                {/* Emoji Selector */}
                                <div>
                                    <label
                                        className="text-body block mb-3"
                                        style={{
                                            fontSize: '0.875rem',
                                            color: 'var(--cream)',
                                            letterSpacing: '0.05em',
                                        }}
                                    >
                                        Pilih Emoji (Opsional)
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {emojis.map((emoji) => (
                                            <motion.button
                                                key={emoji}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedEmoji(emoji);
                                                    setData('emoji', emoji);
                                                }}
                                                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300"
                                                style={{
                                                    backgroundColor:
                                                        selectedEmoji === emoji
                                                            ? 'var(--gold)'
                                                            : 'var(--charcoal)',
                                                    border: '2px solid',
                                                    borderColor:
                                                        selectedEmoji === emoji
                                                            ? 'var(--gold)'
                                                            : 'transparent',
                                                }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {emoji}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 rounded-lg text-body font-bold uppercase tracking-widest transition-all duration-300"
                                    style={{
                                        backgroundColor: 'var(--gold)',
                                        color: 'var(--charcoal)',
                                        fontSize: '0.875rem',
                                    }}
                                    whileHover={{ scale: processing ? 1 : 1.02 }}
                                    whileTap={{ scale: processing ? 1 : 0.98 }}
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Pesan'}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Comments Display */}
                    <div className="space-y-6">
                        {commentData.length > 0 ? (
                            commentData.map((comment, index) => (
                                <CommentBubble key={comment.id} comment={comment} index={index} />
                            ))
                        ) : (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-body text-center"
                                style={{
                                    fontSize: '1rem',
                                    color: 'var(--warm-gray)',
                                    padding: '4rem 2rem',
                                }}
                            >
                                Belum ada pesan. Jadilah yang pertama! 💫
                            </motion.p>
                        )}
                    </div>
                </div>
            </div>

            {/* Decorative Blur */}
            <div
                className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-5"
                style={{
                    background: `radial-gradient(circle, var(--gold) 0%, transparent 70%)`,
                    filter: 'blur(120px)',
                }}
            />
        </section>
    );
};

export default LeaveYourMark;