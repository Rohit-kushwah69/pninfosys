'use client'

import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/utils/cropImage' // helper to crop canvas
import 'react-easy-crop/react-easy-crop.css'

export default function StudentModal({ isOpen, closeModal, formData, handleChange, handleSubmit, preview, isSubmitting, editId }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels)
    }, [])

    const generateCroppedImage = async () => {
        if (!preview || !croppedAreaPixels) return null
        const croppedImage = await getCroppedImg(preview, croppedAreaPixels)
        return croppedImage
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const croppedImage = await generateCroppedImage()
        if (croppedImage) {
            handleChange({ target: { name: 'image', files: [croppedImage] } })
        }
        handleSubmit(e)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Student' : 'Add New Student'}</h2>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full mb-2 p-2 border rounded"
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full mb-2 p-2 border rounded"
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleChange}
                        className="mb-2"
                    />

                    {preview && (
                        <div className="relative w-full h-64 bg-gray-200 mb-4">
                            <Cropper
                                image={preview}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                    )}

                    <div className="flex space-x-2 items-center mb-4">
                        <label>Zoom:</label>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(e.target.value)}
                            className="flex-1"
                        />
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded">
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
