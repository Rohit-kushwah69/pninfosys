'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import TechnologyEditModal from '@/component/TechnologyModal'
import {
    useCreateTechnologyMutation,
    useDeleteTechnologyMutation,
    useGetAllTechnologyQuery,
    useUpdateTechnologyMutation
} from '../../../../../redux/features/technology/technologyApi'

export default function Technology() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
    })

    const [preview, setPreview] = useState(null)
    const [editId, setEditId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { data, isLoading, error } = useGetAllTechnologyQuery()
    const technology = Array.isArray(data?.technology) ? data.technology : []

    const [createTechnology] = useCreateTechnologyMutation()
    const [updateTechnology] = useUpdateTechnologyMutation()
    const [deleteTechnology] = useDeleteTechnologyMutation()

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'image') {
            const file = files[0]
            setFormData((prev) => ({ ...prev, image: file }))
            setPreview(file ? URL.createObjectURL(file) : null)
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            image: null,
        })
        setPreview(null)
        setEditId(null)
        setIsModalOpen(false)
        setIsSubmitting(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const form = new FormData()

        // Append text fields
        form.append('title', formData.title)
        form.append('description', formData.description)

        // Append image ONLY if it's a new file
        if (formData.image instanceof File) {
            form.append('image', formData.image)
        }

        try {
            if (editId) {
                await updateTechnology({ id: editId, formData: form }).unwrap()
                toast.success('Technology updated successfully')
            } else {
                await createTechnology(form).unwrap()
                toast.success('Technology created successfully')
            }
            resetForm()
        } catch (err) {
            toast.error('Failed to submit technology')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleEdit = (tech) => {
        setFormData({
            title: tech.title || '',
            description: tech.description || '',
            image: tech.image || null,
        })
        setPreview(tech.image?.url || null)
        setEditId(tech._id)
        setIsModalOpen(true)
    }


    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this technology?')) {
            try {
                await deleteTechnology(id).unwrap()
                toast.success('Technology deleted')
            } catch (err) {
                toast.error('Delete failed')
            }
        }
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0f172a] dark:text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">🛠️ Manage Technologies</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
                    >
                        + Add New Technology
                    </button>
                </div>

                {isLoading ? (
                    <p className="text-lg">Loading technologies...</p>
                ) : error ? (
                    <p className="text-red-500">Failed to load technologies</p>
                ) : technology.length === 0 ? (
                    <p className="text-gray-500">No technologies available.</p>
                ) : (
                    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="min-w-full bg-white dark:bg-gray-900 text-sm">
                            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase text-xs">
                                <tr>
                                    <th className="p-4 text-left">#</th>
                                    <th className="p-4 text-left">Image</th>
                                    <th className="p-4 text-left">Title</th>
                                    <th className="p-4 text-left">Description</th>
                                    <th className="p-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {technology.map((tech, index) => (
                                    <tr
                                        key={tech._id}
                                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                                    >
                                        <td className="p-4 font-medium">{index + 1}</td>
                                        <td className="p-4">
                                            <img
                                                src={tech.image?.url}
                                                alt={tech.title}
                                                className="w-16 h-16 object-cover rounded-md border"
                                            />
                                        </td>
                                        <td className="p-4 font-semibold">{tech.title}</td>
                                        <td className="p-4">{tech.description}</td>
                                        <td className="p-4 space-x-2">
                                            <button
                                                onClick={() => handleEdit(tech)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(tech._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Technology modal */}
                <TechnologyEditModal
                    isOpen={isModalOpen}
                    closeModal={resetForm}
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    preview={preview}
                    isSubmitting={isSubmitting}
                    editId={editId}
                />
            </div>
        </div>
    )
}
