import React from 'react';
import { motion } from 'framer-motion';
import { Comment } from '@/types/yearbook';

interface CommentBubbleProps {
    comment: Comment;
    index: number; // Tambahkan baris ini untuk menghilangkan error
}

const CommentBubble: React.FC<CommentBubbleProps> = ({ comment, index }) => {
    const date = new Date(comment.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
    });

    return (
        <motion.div 
            // Animasi muncul berurutan berdasarkan index
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.6, 
                delay: index * 0.1, // Semakin besar index, semakin lambat munculnya
                ease: [0.215, 0.61, 0.355, 1] 
            }}
            whileHover={{ x: 10 }} 
            className="group relative flex items-start gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-gold/30 transition-all duration-500"
        >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
                {comment.emoji || '💬'}
            </div>

            <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold/80 font-sans">
                        {comment.name}
                    </h4>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono">
                        {date}
                    </span>
                </div>
                
                <p className="text-gray-300 font-light leading-relaxed text-sm italic">
                    "{comment.message}"
                </p>

                <div className="mt-4 w-0 h-[1px] bg-gold/30 group-hover:w-full transition-all duration-700" />
            </div>
        </motion.div>
    );
};

export default CommentBubble;