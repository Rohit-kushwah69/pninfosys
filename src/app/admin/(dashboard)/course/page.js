// app/dashboard/course/page.jsx
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import CourseEditModal from '@/component/CourseEditModal'
import {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
  useUpdateCourseMutation,

} from '../../../../../redux/features/course/courseApi'


export default function CoursePage() {
  // Course state
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    level: '',
    image: null,
  })
  const [coursePreview, setCoursePreview] = useState(null)
  const [courseEditId, setCourseEditId] = useState(null)
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false)
  const [isCourseSubmitting, setIsCourseSubmitting] = useState(false)

  const { data, isLoading, error } = useGetAllCoursesQuery()
  const courses = Array.isArray(data?.courses) ? data.courses : []

  const [createCourse] = useCreateCourseMutation()
  const [updateCourse] = useUpdateCourseMutation()
  const [deleteCourse] = useDeleteCourseMutation()

  const handleCourseChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0]
      setCourseForm({ ...courseForm, image: file })
      setCoursePreview(URL.createObjectURL(file))
    } else {
      setCourseForm({ ...courseForm, [e.target.name]: e.target.value })
    }
  }

  const resetCourseForm = () => {
    setCourseForm({ title: '', description: '', price: '', duration: '', level: '', image: null })
    setCoursePreview(null)
    setCourseEditId(null)
    setIsCourseModalOpen(false)
  }

  const handleCourseSubmit = async (e) => {
    e.preventDefault()
    setIsCourseSubmitting(true)
    const form = new FormData()
    form.append('title', courseForm.title)
    form.append('description', courseForm.description)
    form.append('price', courseForm.price)
    form.append('duration', courseForm.duration)
    form.append('level', courseForm.level)
    if (courseForm.image) form.append('image', courseForm.image)

    try {
      if (courseEditId) {
        await updateCourse({ id: courseEditId, formData: form }).unwrap()
        toast.success('Course updated successfully')
      } else {
        await createCourse(form).unwrap()
        toast.success('Course created successfully')
      }
      resetCourseForm()
    } catch {
      toast.error('Failed to submit course')
    } finally {
      setIsCourseSubmitting(false)
    }
  }

  const handleCourseEdit = (course) => {
    setCourseForm({
      title: course.title,
      description: course.description,
      price: course.price,
      duration: course.duration,
      level: course.level,
      image: null,
    })
    setCoursePreview(course.image?.url || '')
    setCourseEditId(course._id)
    setIsCourseModalOpen(true)
  }

  const handleCourseDelete = async (id) => {
    if (confirm('Are you sure to delete this course?')) {
      try {
        await deleteCourse(id).unwrap()
        toast.success('Course deleted')
      } catch {
        toast.error('Failed to delete')
      }
    }
  }

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📚 Manage Courses</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsCourseModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Course
          </button>

          {/* ✅ Student Page Button */}
          <Link
            href="/admin/student"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Manage Students
          </Link>
 
        </div>
      </div>

      {isLoading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load courses</p>
      ) : courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="overflow-x-auto border rounded shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Image</th>
                <th className="p-2">Title</th>
                <th className="p-2">Description</th>
                <th className="p-2">Price</th>
                <th className="p-2">Duration</th>
                <th className="p-2">Level</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c, i) => (
                <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">
                    {c.image && <img src={c.image.url} className="w-16 h-16 object-cover" />}
                  </td>
                  <td className="p-2">{c.title}</td>
                  <td className="p-2">{c.description}</td>
                  <td className="p-2">{c.price}</td>
                  <td className="p-2">{c.duration}</td>
                  <td className="p-2">{c.level}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleCourseEdit(c)}
                      className="px-2 py-1 bg-yellow-400 rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleCourseDelete(c._id)}
                      className="px-2 py-1 bg-red-500 rounded text-white"
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

      {/* Course Modal */}
      <CourseEditModal
        isOpen={isCourseModalOpen}
        closeModal={resetCourseForm}
        formData={courseForm}
        handleChange={handleCourseChange}
        handleSubmit={handleCourseSubmit}
        preview={coursePreview}
        isSubmitting={isCourseSubmitting}
        editId={courseEditId}
      />
    </div>
  )
}
