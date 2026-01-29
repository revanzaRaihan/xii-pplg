// resources/js/types/yearbook.d.ts

export interface Student {
    id: number;
    name: string;
    nickname?: string;
    role: string;
    github: string;
    instagram: string;
    portrait: string;
    bio?: string;
}

export interface Comment {
    id: number;
    name: string;
    message: string;
    created_at: string;
    emoji?: string;
}

export interface MemoryImage {
    id: number;
    src: string;
    alt: string;
    caption?: string;
    gridColumn?: string;
    gridRow?: string;
}

export interface ScrollAnimationConfig {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export interface PageProps {
    students?: Student[];
    comments?: Comment[];
    memories?: MemoryImage[];
    auth?: {
        user: any;
    };
}