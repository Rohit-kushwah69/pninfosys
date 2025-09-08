'use client'
import React from 'react';
import toast from 'react-hot-toast';
import {
  useDeleteEnquiryMutation,
  useGetAllEnquiriesQuery
} from '../../../../../redux/features/courseEnquiry/courseEnquiryApi';

export default function CourseEnquiryPage() {
  const { data, isLoading, error } = useGetAllEnquiriesQuery()
  const enquiries = Array.isArray(data?.data) ? data.data : [];

  const [deleteEnquiry] = useDeleteEnquiryMutation()

  const handleDelete = async (id) => {
    if (confirm('Are you sure to delete this enquiry?')) {
      try {
        await deleteEnquiry(id).unwrap();
        toast.success(' Enquiry deleted');
      } catch (err) {
        toast.error(err?.data?.message || '❌ Failed to delete');
      }
    }
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-white dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">📋 Course Enquiries</h1>

      {isLoading ? (
        <p>Loading enquiries...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load enquiries</p>
      ) : enquiries.length === 0 ? (
        <p>No enquiries available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg shadow-md">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs md:text-sm uppercase text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-2 md:p-3 text-left">#</th>
                <th className="p-2 md:p-3 text-left">First Name</th>
                <th className="p-2 md:p-3 text-left">Last Name</th>
                <th className="p-2 md:p-3 text-left">Phone</th>
                <th className="p-2 md:p-3 text-left">Email</th>
                <th className="p-2 md:p-3 text-left">Course</th>
                <th className="p-2 md:p-3 text-left">Batch</th>
                <th className="p-2 md:p-3 text-left">Mode</th>
                <th className="p-2 md:p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e, i) => (
                <tr key={e._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 border-b">
                  <td className="p-2 md:p-3">{i + 1}</td>
                  <td className="p-2 md:p-3">{e.firstName}</td>
                  <td className="p-2 md:p-3">{e.lastName}</td>
                  <td className="p-2 md:p-3">{e.phone}</td>
                  <td className="p-2 md:p-3">{e.email}</td>
                  <td className="p-2 md:p-3">{e.course}</td>
                  <td className="p-2 md:p-3">{e.preferredBatch}</td>
                  <td className="p-2 md:p-3">{e.modeOfLearning}</td>
                  <td className="p-2 md:p-3">
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="px-2 py-1 md:px-3 md:py-1.5 bg-red-500 rounded text-white hover:bg-red-600 transition-all"
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
    </div>
  );
}
