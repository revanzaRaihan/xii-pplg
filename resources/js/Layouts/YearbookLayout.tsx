// resources/js/Layouts/YearbookLayout.tsx

import React, { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import { useSmoothScroll } from '@/Hooks/useSmoothScroll';
import Navbar from '@/Components/Yearbook/Navbar';
import CustomCursor from '@/Components/UI/CustomCursor';
import Preloader from '@/Components/UI/Preloader';

interface YearbookLayoutProps {
    children: ReactNode;
    title?: string;
}

const YearbookLayout: React.FC<YearbookLayoutProps> = ({ 
    children, 
    title = 'RPL Class 2024 - Digital Yearbook' 
}) => {
    // Initialize smooth scroll
    useSmoothScroll({
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
    });

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Digital yearbook for RPL Class 2024 - A collection of memories, stories, and achievements." />
                <meta property="og:title" content={title} />
                <meta property="og:description" content="Digital yearbook for RPL Class 2024" />
                <meta property="og:type" content="website" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                {/* Font Preloads */}
                <link rel="preload" href="/fonts/Essones/Essones-Regular.otf" as="font" type="font/otf" crossOrigin="anonymous" />
                <link rel="preload" href="/fonts/Parlare/Parlare-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
                <link rel="preload" href="/fonts/Domus/Domus-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
            </Head>

            <div className="relative min-h-screen">
                {/* UI Components */}
                <CustomCursor />
                <Preloader />

                {/* Navbar */}
                <Navbar />

                {/* Main Content */}
                <main className="smooth-scroll">
                    {children}
                </main>
            </div>
        </>
    );
};

export default YearbookLayout;