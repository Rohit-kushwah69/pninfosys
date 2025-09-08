'use client';
import React from 'react';

export default function ContactCardModal({ isOpen, closeModal, formData, handleChange, handleSubmit, preview, isSubmitting, editId }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{editId ? 'Edit Contact Card' : 'Add New Contact Card'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-1 focus:ring-blue-500" required />
                    <input type="text" name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-1 focus:ring-blue-500" required />
                    <label className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                        {preview ? <img src={preview} alt="preview" className="w-24 h-24 object-cover rounded-md" /> : 'Upload Image'}
                        <input type="file" name="image" accept=".jpg,.png,.jpeg" onChange={handleChange} className="hidden" />
                    </label>
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400">{isSubmitting ? 'Submitting...' : editId ? 'Update' : 'Create'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
