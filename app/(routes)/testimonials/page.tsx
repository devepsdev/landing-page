"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TestimonialsRedirect = () => {
    const router = useRouter();
    useEffect(() => { router.replace('/server'); }, [router]);
    return null;
};

export default TestimonialsRedirect;
