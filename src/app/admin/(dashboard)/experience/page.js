'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import ExperienceModal from '@/component/ExperienceModal'
import { useCreateExperienceMutation, useDeleteExperienceMutation,
     useGetAllExperienceQuery, useUpdateExperienceMutation } from '../../../../../redux/features/experience/experienceApi'


export default function Experience() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
    })

    const [preview, setPreview] = useState(null)
    const [editId, setEditId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { data, isLoading, error } = useGetAllExperienceQuery()
    const experiences = Array.isArray(data?.experience) ? data.experience : []

    const [createExperience] = useCreateExperienceMutation()
    const [updateExperience] = useUpdateExperienceMutation()
    const [deleteExperience] = useDeleteExperienceMutation()

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0]
            setFormData({ ...formData, image: file })
            setPreview(URL.createObjectURL(file))
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const form = new FormData()
        form.append('title', formData.title)
        form.append('description', formData.description)
        if (formData.image) form.append('image', formData.image)

        try {
            if (editId) {
                await updateExperience({ id: editId, formData: form }).unwrap()
                toast.success('Experience updated successfully')
            } else {
                await createExperience(form).unwrap()
                toast.success('Experience created successfully')
            }
            resetForm()
        } catch (err) {
            toast.error('Failed to submit experience')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleEdit = (experience) => {
        setFormData({
            title: experience.title,
            description: experience.description,
            image: null,
        })
        setPreview(experience.image?.url || '')
        setEditId(experience._id)
        setIsModalOpen(true)
    }

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            try {
                await deleteExperience(id).unwrap()
                toast.success('Experience deleted')
            } catch (err) {
                toast.error('Delete failed')
            }
        }
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0f172a] dark:text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">💼 Manage Experience</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
                    >
                        + Add New Experience
                    </button>
                </div>

                {isLoading ? (
                    <p className="text-lg">Loading experiences...</p>
                ) : error ? (
                    <p className="text-red-500">Failed to load experiences</p>
                ) : experiences.length === 0 ? (
                    <p className="text-gray-500">No experiences available.</p>
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
                                {experiences.map((experience, index) => (
                                    <tr
                                        key={experience._id}
                                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    >
                                        <td className="p-4 font-medium">{index + 1}</td>
                                        <td className="p-4">
                                            <img
                                                src={experience.image?.url}
                                                alt={experience.title}
                                                className="w-16 h-16 object-cover rounded-md border"
                                            />
                                        </td>
                                        <td className="p-4 font-semibold">{experience.title}</td>
                                        <td className="p-4">{experience.description}</td>
                                        <td className="p-4 space-x-2">
                                            <button
                                                onClick={() => handleEdit(experience)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(experience._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <ExperienceModal
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
