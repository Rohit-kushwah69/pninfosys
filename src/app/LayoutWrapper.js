"use client";

import Footer from '@/component/Footer';
import Header from '@/component/Header';
import { usePathname } from 'next/navigation';

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin'); // ✅ check if admin route

    return (
        <>
            {!isAdminRoute && <Header />}
            <main className="flex-grow pt-20">{children}</main>
            {!isAdminRoute && <Footer />}
        </>
    );
}
