'use client'

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useCreateContactCardMutation, useDeleteContactCardMutation, useGetAllContactCardsQuery, useUpdateContactCardMutation } from '../../../../../redux/features/contactCard/page';
import ContactCardModal from '@/component/ContactCardModal';

export default function ContactCard() {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        image: null,
    });
    const [preview, setPreview] = useState(null);
    const [editId, setEditId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data, isLoading, error } = useGetAllContactCardsQuery()
    const cards = Array.isArray(data?.contactCard) ? data.contactCard : [];

    const [createContactCard] = useCreateContactCardMutation()
    const [updateContactCard] = useUpdateContactCardMutation()
    const [deleteContactCard] = useDeleteContactCardMutation()

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            setFormData({ ...formData, image: file });
            setPreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const resetForm = () => {
        setFormData({ title: '', subtitle: '', image: null });
        setPreview(null);
        setEditId(null);
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = new FormData();
        form.append('title', formData.title);
        form.append('subtitle', formData.subtitle);
        if (formData.image) form.append('image', formData.image);

        try {
            if (editId) {
                await updateContactCard({ id: editId, formData: form }).unwrap();
                toast.success('Contact card updated successfully');
            } else {
                await createContactCard(form).unwrap();
                toast.success('Contact card created successfully');
            }
            resetForm();
        } catch {
            toast.error('Failed to submit contact card');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (card) => {
        setFormData({ title: card.title, subtitle: card.subtitle, image: null });
        setPreview(card.image?.url || '');
        setEditId(card._id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this contact card?')) {
            try {
                await deleteContactCard(id).unwrap();
                toast.success('Contact card deleted');
            } catch {
                toast.error('Delete failed');
            }
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">📇 Manage Contact Cards</h2>
                    <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition">+ Add New Card</button>
                </div>

                {isLoading ? (
                    <p className="text-lg">Loading contact cards...</p>
                ) : error ? (
                    <p className="text-red-500">Failed to load contact cards</p>
                ) : cards.length === 0 ? (
                    <p className="text-gray-500">No contact cards available.</p>
                ) : (
                    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                        <table className="min-w-full bg-white text-sm">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                                <tr>
                                    <th className="p-4 text-left">#</th>
                                    <th className="p-4 text-left">Image</th>
                                    <th className="p-4 text-left">Title</th>
                                    <th className="p-4 text-left">Subtitle</th>
                                    <th className="p-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cards.map((card, index) => (
                                    <tr key={card._id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-medium">{index + 1}</td>
                                        <td className="p-4"><img src={card.image?.url} alt={card.title} className="w-16 h-16 object-cover rounded-md border" /></td>
                                        <td className="p-4 font-semibold">{card.title}</td>
                                        <td className="p-4">{card.subtitle}</td>
                                        <td className="p-4 space-x-2">
                                            <button onClick={() => handleEdit(card)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md">Edit</button>
                                            <button onClick={() => handleDelete(card._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <ContactCardModal
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
    );
}
