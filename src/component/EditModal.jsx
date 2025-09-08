'use client'

import React from 'react'

export default function EditModal({
  isOpen,
  closeModal,
  formData,
  handleChange,
  handleSubmit,
  preview,
  isSubmitting, // ✅ add this prop
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded shadow-lg p-6 relative">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            {formData._id ? 'Edit Slide' : 'Add Slide'}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold"
            disabled={isSubmitting}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-50"
              disabled={isSubmitting}
            />
          </div>

          {preview && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="h-32 rounded border object-contain"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              {isSubmitting && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              )}
              {isSubmitting
                ? formData._id
                  ? 'Updating...'
                  : 'Saving...'
                : formData._id
                  ? 'Update'
                  : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
