import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import CommentBubble from '@/Components/UI/CommentBubble';
import { Comment } from '@/types/yearbook';

interface LeaveYourMarkProps {
    comments?: Comment[];
}

const LeaveYourMark: React.FC<LeaveYourMarkProps> = ({ comments: initialComments = [] }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [comments, setComments] = useState<Comment[]>(initialComments);

    const emojis = ['😊', '🎉', '❤️', '🌟', '👍', '🎓', '💪', '🚀'];
    const [data, setData] = useState({ name: '', message: '', emoji: '🌟' });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => { fetchComments(); }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get('/api/comments');
            setComments(response.data.data);
        } catch (error) { console.error('Failed to fetch comments:', error); }
    };

    const reset = () => setData({ name: '', message: '', emoji: '🌟' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        axios.post('/api/comments', data).then((response) => {
            reset();
            setShowSuccess(true);
            setComments(prevComments => [response.data.data, ...prevComments]);
            setTimeout(() => setShowSuccess(false), 2000);
        }).catch((error) => {
            if (error.response?.data.errors) setErrors(error.response.data.errors);
        }).finally(() => setProcessing(false));
    };

    return (
        <section id="leave-mark" ref={sectionRef} className="relative min-h-screen py-24 bg-[#080808] overflow-hidden selection:bg-gold/30">
            {/* Elegant Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    {/* LEFT SIDE: EDITORIAL FORM (Sticky) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-[1px] bg-gold/50" />
                                <span className="text-gold text-[10px] uppercase tracking-[0.6em] font-bold">The Guestbook</span>
                            </div>
                            <h2 className="font-serif text-white leading-[0.9] mb-6 text-6xl xl:text-8xl">
                                Leave <br />
                                <span className="italic font-light text-gold/90">Your Legacy</span>
                            </h2>
                            <p className="text-gray-500 font-light text-base leading-relaxed max-w-sm">
                                Your words are a part of our history. Share a memory, a wish, or a simple goodbye.
                            </p>
                        </motion.div>

                        <motion.div 
                            className="bg-white/[0.01] border border-white/5 p-8 lg:p-10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden group"
                        >
                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                {/* Name Input - Minimalist Editorial Style */}
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gold/60 font-medium ml-1">Identity</label>
                                    <input
                                        type="text"
                                        placeholder="Your name or alias..."
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-gold/50 focus:bg-white/[0.05] transition-all duration-500 font-light"
                                        required
                                    />
                                </div>

                                {/* Message Input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gold/60 font-medium ml-1">The Message</label>
                                    <textarea
                                        placeholder="Write something memorable..."
                                        value={data.message}
                                        onChange={(e) => setData({ ...data, message: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-gold/50 focus:bg-white/[0.05] transition-all duration-500 font-light resize-none min-h-[120px]"
                                        required
                                    />
                                </div>

                                {/* Mood Selector */}
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-widest text-gold/60 font-medium ml-1">Current Mood</label>
                                    <div className="flex flex-wrap gap-2">
                                        {emojis.map((emoji) => (
                                            <button
                                                key={emoji}
                                                type="button"
                                                onClick={() => setData({ ...data, emoji: emoji })}
                                                className={`w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all duration-500 border ${data.emoji === emoji ? 'bg-gold border-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-5 bg-white text-black rounded-full font-black uppercase tracking-[0.4em] text-[11px] hover:bg-gold hover:text-white transition-all duration-500 shadow-xl"
                                >
                                    {processing ? 'Recording...' : 'Post My Mark'}
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE: THE ARCHIVE (Masonry-like Scroll) */}
                    <div className="lg:col-span-7 pt-4 lg:pt-0">
                        <div className="flex items-end justify-between mb-8 border-b border-white/5 pb-6">
                            <div>
                                <h4 className="text-xl font-serif text-white italic">The Archive</h4>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-1">Voices of the Class</p>
                            </div>
                            <span className="text-gold font-mono text-xs tracking-tighter bg-gold/10 px-3 py-1 rounded-full">{comments.length} MARKS</span>
                        </div>

                        <div className="space-y-6 max-h-[1000px] overflow-y-auto pr-4 custom-scrollbar">
                            <AnimatePresence mode="popLayout">
                                {comments.length > 0 ? (
                                    comments.map((comment, idx) => (
                                        <motion.div
                                            key={comment.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <CommentBubble comment={comment} index={idx} />
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="py-20 text-center border border-dashed border-white/10 rounded-[2rem]">
                                        <span className="text-gray-600 uppercase tracking-[0.5em] text-[10px]">Silence is waiting for you</span>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeaveYourMark;