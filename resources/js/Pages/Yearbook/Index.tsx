import React from 'react';
import YearbookLayout from '@/Layouts/YearbookLayout';
import Hero from '@/Components/Yearbook/Hero';
import Memory from '@/Components/Yearbook/Memory';
import AboutUs from '@/Components/Yearbook/AboutUs';
import LeaveYourMark from '@/Components/Yearbook/LeaveYourMark';
import Goodbye from '@/Components/Yearbook/Goodbye';
import { PageProps } from '@/types/yearbook';

const Index: React.FC<PageProps> = ({ students, comments, memories }) => {
    return (
        <YearbookLayout title="RPL Class 2024 - Our Journey">
            <Hero />
            <Memory/>
            <AboutUs students={students} />
            <LeaveYourMark comments={comments} />
            <Goodbye />
        </YearbookLayout>
    );
};

export default Index;