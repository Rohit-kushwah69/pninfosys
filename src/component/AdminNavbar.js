'use client';
import React from 'react';
import { Menu } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { clearAdmin } from '../../redux/features/adminAuth/adminAuthSlice';
import { useLogoutAdminMutation } from '../../redux/features/adminAuth/adminAuthApi';

function AdminNavbar({ onToggleSidebar }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutAdmin] = useLogoutAdminMutation() // ✅ Correct hook

  // Handle logout
  const handleLogout = async () => {
    try {
      await logoutAdmin().unwrap(); // ✅ Call the mutation
      dispatch(clearAdmin()); // ✅ Call the function
      toast.success('Logged out successfully!');
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
      toast.error(err?.data?.message || 'Logout failed');
    }
  };

  // Navigate to Profile page
  const handleProfile = () => {
    router.push('/admin/profile');
  };

  return (
    <nav className="bg-white shadow px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 z-50 relative">
      {/* Left: Menu + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
      </div>

      {/* Right: Profile + Logout */}
      <div className="flex gap-2 sm:gap-4">
        <button
          onClick={handleProfile}
          className="text-xs sm:text-sm md:text-base bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="text-xs sm:text-sm md:text-base bg-red-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
