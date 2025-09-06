'use client'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
import { useLoginAdminMutation } from '../../../../redux/features/adminAuth/adminAuthApi'
import { setAdmin } from '../../../../redux/features/adminAuth/adminAuthSlice'

export default function AdminLoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [loginAdmin, { isLoading }] = useLoginAdminMutation()
    const dispatch = useDispatch()
    const router = useRouter()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await loginAdmin(formData).unwrap()

            // ✅ Save admin user in Redux
            dispatch(setAdmin(res.user))

            toast.success('Login successful!')

            // ✅ Redirect to dashboard only if admin
            if (res.user.role === 'admin') {
                router.push('/admin/dashboard')
            } else {
                router.push('/') // Non-admin users go to home
            }
        } catch (err) {
            console.error("Login failed:", err)
            toast.error(err?.data?.message || 'Login failed')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Toaster position="top-right" />
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Admin Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 rounded text-white font-semibold transition-all duration-200 ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* 🔹 Register link */}
                <p className="mt-4 text-center text-gray-600">
                    Don’t have an account?{' '}
                    <button
                        type="button"
                        onClick={() => router.push('/admin/register')}
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    )
}
