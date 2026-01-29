// resources/js/Components/Yearbook/Navbar.tsx

import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled ? 'py-4' : 'py-6'
            }`}
            style={{
                mixBlendMode: 'difference',
                filter: 'invert(1)',
            }}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => scrollToSection('hero')}
                        className="text-body font-bold tracking-wider hover-grow"
                        style={{ fontFamily: 'var(--font-parlare)' }}
                    >
                        <span className="text-2xl">RPL</span>
                        <span className="text-sm ml-2 opacity-70">2024</span>
                    </button>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className="hover-underline text-sm uppercase tracking-widest transition-opacity hover:opacity-70"
                            style={{ fontFamily: 'var(--font-domus)' }}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection('memory')}
                            className="hover-underline text-sm uppercase tracking-widest transition-opacity hover:opacity-70"
                            style={{ fontFamily: 'var(--font-domus)' }}
                        >
                            Memories
                        </button>
                        <button
                            onClick={() => scrollToSection('about')}
                            className="hover-underline text-sm uppercase tracking-widest transition-opacity hover:opacity-70"
                            style={{ fontFamily: 'var(--font-domus)' }}
                        >
                            About Us
                        </button>
                        <button
                            onClick={() => scrollToSection('leave-mark')}
                            className="hover-underline text-sm uppercase tracking-widest transition-opacity hover:opacity-70"
                            style={{ fontFamily: 'var(--font-domus)' }}
                        >
                            Leave Mark
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;