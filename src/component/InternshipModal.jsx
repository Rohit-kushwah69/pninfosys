'use client';

import React from 'react';

export default function InternshipModal({
  isOpen,
  closeModal,
  formData,
  handleChange,
  handleSubmit,
  preview,
  isSubmitting,
  editId,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl p-5 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            {editId ? 'Edit Internship' : 'Apply for Internship'}
          </h2>
          <button
            onClick={closeModal}
            className="text-2xl text-gray-400 hover:text-gray-700"
            disabled={isSubmitting}
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          {/* Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Resume */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Resume</label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
              disabled={isSubmitting}
              className="w-full border border-gray-300 rounded file:py-1.5 file:px-3 file:bg-blue-600 file:text-white file:border-none file:rounded-md hover:file:bg-blue-700 cursor-pointer"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              disabled={isSubmitting}
              accept="image/*"
              className="w-full border border-gray-300 rounded file:py-1.5 file:px-3 file:bg-blue-600 file:text-white file:border-none file:rounded-md hover:file:bg-blue-700 cursor-pointer"
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Image Preview:</p>
              <div className="h-28 w-full overflow-hidden rounded border">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1.5 rounded disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-1.5 rounded font-medium flex items-center gap-2 disabled:opacity-60"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              )}
              {isSubmitting
                ? editId
                  ? 'Updating...'
                  : 'Submitting...'
                : editId
                  ? 'Update'
                  : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
