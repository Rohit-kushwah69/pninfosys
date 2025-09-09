'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AdminNavbar from '@/component/AdminNavbar';
import AdminFooter from '@/component/AdminFooter';
import Sidebar from '@/component/sidebar';
import { useGetAdminProfileQuery } from '../../../../redux/features/adminAuth/adminAuthApi';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data, error, isLoading } = useGetAdminProfileQuery()

  // Redirect if not authenticated or not admin
  // useEffect(() => {
  //   if (error || !data?.user) {
  //     router.push('/admin/login'); // Not logged in
  //   } else if (data.user.role !== 'admin') {
  //     router.push('/'); // Logged in but not admin
  //   }
  // }, [error, data, router]);

  // Loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
            Checking authentication...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className=" flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white">
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        className="hidden lg:block lg:w-64 fixed top-0 left-0 h-full bg-black/90 backdrop-blur-lg z-20 shadow-2xl overflow-y-auto"
      >
        <Sidebar isOpen={true} />
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex lg:hidden"
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="relative z-50 w-64 bg-black/95 backdrop-blur-xl h-full shadow-xl overflow-y-auto"
            >
              <Sidebar isOpen={true} closeSidebar={() => setSidebarOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full lg:ml-64">
        {/* Navbar */}
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-50 w-full shadow-md bg-gray-100/90 dark:bg-gray-900/90 backdrop-blur-md"
        >
          <AdminNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </motion.div>

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-grow p-4 sm:p-6 lg:p-10 pt-20 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        >
          {children}
        </motion.main>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AdminFooter />
        </motion.div>
      </div>
    </div>
  );
}
