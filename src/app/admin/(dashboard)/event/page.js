'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {
    useCreateEventMutation,
    useDeleteEventMutation,
    useGetAllEventsQuery,
    useUpdateEventMutation
} from '../../../../../redux/features/event/eventApi'
import EventModal from '@/component/EventModal'

export default function Event() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
    })

    const [preview, setPreview] = useState(null)
    const [editId, setEditId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { data, isLoading, error } = useGetAllEventsQuery()
    const events = Array.isArray(data?.event) ? data.event : []

    const [createEvent] = useCreateEventMutation()
    const [updateEvent] = useUpdateEventMutation()
    const [deleteEvent] = useDeleteEventMutation()

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
        form.append('price', formData.price)
        form.append('date', formData.date)
        form.append('location', formData.location)
        if (formData.image) form.append('image', formData.image)

        try {
            if (editId) {
                await updateEvent({ id: editId, formData: form }).unwrap()
                toast.success('Event updated successfully')
            } else {
                await createEvent(form).unwrap()
                toast.success('Event created successfully')
            }
            resetForm()
        } catch (err) {
            toast.error('Failed to submit event')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleEdit = (event) => {
        setFormData({
            title: event.title,
            description: event.description,
            image: null,
        })
        setPreview(event.image?.url || '')
        setEditId(event._id)
        setIsModalOpen(true)
    }

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEvent(id).unwrap()
                toast.success('Event deleted')
            } catch (err) {
                toast.error('Delete failed')
            }
        }
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0f172a] dark:text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">🎉 Manage Events</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
                    >
                        + Add New Event
                    </button>
                </div>

                {isLoading ? (
                    <p className="text-lg">Loading events...</p>
                ) : error ? (
                    <p className="text-red-500">Failed to load events</p>
                ) : events.length === 0 ? (
                    <p className="text-gray-500">No events available.</p>
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
                                {events.map((event, index) => (
                                    <tr
                                        key={event._id}
                                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    >
                                        <td className="p-4 font-medium">{index + 1}</td>
                                        <td className="p-4">
                                            <img
                                                src={event.image?.url}
                                                alt={event.title}
                                                className="w-16 h-16 object-cover rounded-md border"
                                            />
                                        </td>
                                        <td className="p-4 font-semibold">{event.title}</td>
                                        <td className="p-4">{event.description}</td>
                                        <td className="p-4 space-x-2">
                                            <button
                                                onClick={() => handleEdit(event)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(event._id)}
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

                {/* 🧩 EventEditModal handles the event form */}
                <EventModal
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
