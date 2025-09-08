'use client'

import React from 'react'

export default function LearningModal({
  isOpen,
  closeModal,
  formData,
  handleChange,
  handleSubmit,
  preview,
  isSubmitting,
  editId,
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-2xl font-bold mb-4">
          {editId ? 'Edit Learning' : 'Add New Learning'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              {isSubmitting ? 'Saving...' : editId ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
