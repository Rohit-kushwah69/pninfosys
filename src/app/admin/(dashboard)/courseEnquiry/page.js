'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {
  useCreateEnquiryMutation,
  useDeleteEnquiryMutation,
  useGetAllEnquiriesQuery,
  useUpdateEnquiryMutation
} from '../../../../../redux/features/courseEnquiry/courseEnquiryApi'

export default function CourseEnquiryPage() {
  const [enquiryForm, setEnquiryForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    gender: '',
    qualification: '',
    experience: '',
    course: '',
    preferredBatch: '',
    modeOfLearning: '',
    message: '',
  })
  const [enquiryEditId, setEnquiryEditId] = useState(null)
  const [isEnquirySubmitting, setIsEnquirySubmitting] = useState(false)

  const { data, isLoading, error } = useGetAllEnquiriesQuery()
  const enquiries = Array.isArray(data?.enquiries) ? data.enquiries : []

  const [createEnquiry] = useCreateEnquiryMutation()
  const [updateEnquiry] = useUpdateEnquiryMutation()
  const [deleteEnquiry] = useDeleteEnquiryMutation()

  const handleEnquiryChange = (e) => {
    setEnquiryForm({ ...enquiryForm, [e.target.name]: e.target.value })
  }

  const resetEnquiryForm = () => {
    setEnquiryForm({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      gender: '',
      qualification: '',
      experience: '',
      course: '',
      preferredBatch: '',
      modeOfLearning: '',
      message: '',
    })
    setEnquiryEditId(null)
  }

  const handleEnquirySubmit = async (e) => {
    e.preventDefault()
    setIsEnquirySubmitting(true)

    try {
      if (enquiryEditId) {
        await updateEnquiry({ id: enquiryEditId, data: enquiryForm }).unwrap()
        toast.success('✅ Enquiry updated successfully')
      } else {
        await createEnquiry(enquiryForm).unwrap()
        toast.success('✅ Enquiry created successfully')
      }
      resetEnquiryForm()
    } catch (err) {
      toast.error(err?.data?.message || '❌ Failed to submit enquiry')
    } finally {
      setIsEnquirySubmitting(false)
    }
  }

  const handleEnquiryEdit = (enq) => {
    setEnquiryForm({ ...enq })
    setEnquiryEditId(enq._id)
  }

  const handleEnquiryDelete = async (id) => {
    if (confirm('Are you sure to delete this enquiry?')) {
      try {
        await deleteEnquiry(id).unwrap()
        toast.success('🗑️ Enquiry deleted')
      } catch (err) {
        toast.error(err?.data?.message || '❌ Failed to delete')
      }
    }
  }

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📋 Manage Course Enquiries</h1>
      </div>

      {/* Enquiry Form */}
      <form onSubmit={handleEnquirySubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input name="firstName" value={enquiryForm.firstName} onChange={handleEnquiryChange} placeholder="First Name" className="border p-2 rounded" required />
        <input name="lastName" value={enquiryForm.lastName} onChange={handleEnquiryChange} placeholder="Last Name" className="border p-2 rounded" />
        <input name="phone" value={enquiryForm.phone} onChange={handleEnquiryChange} placeholder="Phone" className="border p-2 rounded" required />
        <input name="email" value={enquiryForm.email} onChange={handleEnquiryChange} placeholder="Email" className="border p-2 rounded" required />

        {/* Dropdowns for enum fields */}
        <select name="gender" value={enquiryForm.gender} onChange={handleEnquiryChange} className="border p-2 rounded" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input name="qualification" value={enquiryForm.qualification} onChange={handleEnquiryChange} placeholder="Qualification" className="border p-2 rounded" required />
        <input name="experience" value={enquiryForm.experience} onChange={handleEnquiryChange} placeholder="Experience" className="border p-2 rounded" required />
        <input name="course" value={enquiryForm.course} onChange={handleEnquiryChange} placeholder="Course" className="border p-2 rounded" required />

        <select name="preferredBatch" value={enquiryForm.preferredBatch} onChange={handleEnquiryChange} className="border p-2 rounded" required>
          <option value="">Select Batch</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Weekend">Weekend</option>
        </select>

        <select name="modeOfLearning" value={enquiryForm.modeOfLearning} onChange={handleEnquiryChange} className="border p-2 rounded" required>
          <option value="">Select Mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <textarea name="message" value={enquiryForm.message} onChange={handleEnquiryChange} placeholder="Message" className="col-span-2 border p-2 rounded"></textarea>

        <button type="submit" disabled={isEnquirySubmitting} className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {enquiryEditId ? 'Update Enquiry' : 'Add Enquiry'}
        </button>
      </form>

      {/* Table */}
      {isLoading ? (
        <p>Loading enquiries...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load enquiries</p>
      ) : enquiries.length === 0 ? (
        <p>No enquiries available.</p>
      ) : (
        <div className="overflow-x-auto border rounded shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">First Name</th>
                <th className="p-2">Last Name</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Email</th>
                <th className="p-2">Course</th>
                <th className="p-2">Batch</th>
                <th className="p-2">Mode</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e, i) => (
                <tr key={e._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{e.firstName}</td>
                  <td className="p-2">{e.lastName}</td>
                  <td className="p-2">{e.phone}</td>
                  <td className="p-2">{e.email}</td>
                  <td className="p-2">{e.course}</td>
                  <td className="p-2">{e.preferredBatch}</td>
                  <td className="p-2">{e.modeOfLearning}</td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => handleEnquiryEdit(e)} className="px-2 py-1 bg-yellow-400 rounded text-white">
                      Edit
                    </button>
                    <button onClick={() => handleEnquiryDelete(e._id)} className="px-2 py-1 bg-red-500 rounded text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
