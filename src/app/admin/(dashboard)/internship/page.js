"use client";
import React, { useState, useMemo } from "react";
import {
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaFilePdf,
  FaSearch,
  FaDownload,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import {
  useGetAllInternshipsQuery,
  useAcceptInternshipMutation,
  useRejectInternshipMutation,
  useViewInternshipQuery,
  useDeleteInternshipMutation,
  useBulkDeleteInternshipsMutation,
} from "../../../../../redux/features/internship/page";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { motion, AnimatePresence } from "framer-motion";

export default function InternshipDashboard() {
  const { data, isLoading, isError, refetch } = useGetAllInternshipsQuery();
  const [acceptInternship] = useAcceptInternshipMutation();
  const [rejectInternship] = useRejectInternshipMutation();
  const [deleteInternship] = useDeleteInternshipMutation();
  const [bulkDeleteInternship] = useBulkDeleteInternshipsMutation()

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [message, setMessage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, ids: [] });


  const { data: viewData, isLoading: viewLoading } = useViewInternshipQuery(selectedId, {
    skip: !selectedId, // tabhi fetch kare jab ID ho
  });




  const applications = data?.data || [];

  const filteredData = useMemo(() => {
    return applications
      .filter((app) =>
        filterStatus === "All" ? true : app.status === filterStatus
      )
      .filter((app) =>
        [
          app.name,
          app.email,
          app.phone,
          app.internshipDomain,
          app.internshipType,
          app.skills?.join(", "),
          app.status,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
  }, [applications, searchTerm, filterStatus]);

  const handleOpenResume = (url) => window.open(url, "_blank");

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Internship Applications", 14, 10);
    doc.autoTable({
      head: [["Name", "Email", "Phone", "Domain", "Type", "Skills", "Status", "Applied On"]],
      body: filteredData.map((app) => [
        app.name,
        app.email,
        app.phone,
        app.internshipDomain,
        app.internshipType || "—",
        app.skills?.join(", ") || "—",
        app.status || "Pending",
        app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "—",
      ]),
    });
    doc.save("internship_applications.pdf");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredData.map((app) => ({
        Name: app.name,
        Email: app.email,
        Phone: app.phone,
        Domain: app.internshipDomain,
        Type: app.internshipType || "—",
        Skills: app.skills?.join(", ") || "—",
        Status: app.status || "Pending",
        "Applied On": app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "—",
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applications");
    XLSX.writeFile(wb, "internship_applications.xlsx");
  };

  const handleStatusChange = async (id, type) => {
    try {
      if (type === "accept") {
        await acceptInternship(id).unwrap();
        setMessage({ type: "success", text: "✅ Internship selected successfully!" });
      } else {
        await rejectInternship(id).unwrap();
        setMessage({ type: "error", text: "❌ Internship rejected." });
      }
      refetch();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Error updating status:", err);
      setMessage({ type: "error", text: "⚠️ Failed to update status." });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDelete = async (ids) => {
    try {
      if (ids.length === 1) {
        await deleteInternship(ids[0]).unwrap();
      } else {
        await bulkDeleteInternship({ ids }).unwrap();
      }
      setMessage({ type: "success", text: "🗑️ Deleted successfully!" });
      refetch();
      setSelectedItems([]);
      setDeleteConfirm({ open: false, ids: [] });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Error deleting:", err);
      setMessage({ type: "error", text: "⚠️ Failed to delete." });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (isLoading) return <p className="text-center text-lg mt-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">Error loading data</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Toast Notification */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={`fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white font-medium ${message.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Internship Dashboard ({filteredData.length})
        </h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={exportPDF}
            className="bg-red-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition"
          >
            <FaFilePdf /> PDF
          </button>
          <button
            onClick={exportExcel}
            className="bg-green-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
          >
            <FaDownload /> Excel
          </button>
          {selectedItems.length > 0 && (
            <button
              onClick={() => setDeleteConfirm({ open: true, ids: selectedItems })}
              className="bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
            >
              <FaTrash /> Delete Selected ({selectedItems.length})
            </button>
          )}
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex gap-3 mb-6">
        {["All", "Selected", "Rejected", "Pending"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${filterStatus === status
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b text-gray-700">
              <th className="py-3 px-4">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedItems(
                      e.target.checked ? filteredData.map((a) => a._id) : []
                    )
                  }
                  checked={
                    selectedItems.length > 0 &&
                    selectedItems.length === filteredData.length
                  }
                />
              </th>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Applicant</th>
              <th className="py-3 px-4 text-left">Domain</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((app, index) => (
              <tr
                key={app._id}
                className={`transition-all duration-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50`}
              >
                <td className="py-4 px-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(app._id)}
                    onChange={(e) =>
                      setSelectedItems((prev) =>
                        e.target.checked
                          ? [...prev, app._id]
                          : prev.filter((id) => id !== app._id)
                      )
                    }
                  />
                </td>
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4">{app.name}</td>
                <td className="py-4 px-4">{app.internshipDomain}</td>
                <td className="py-4 px-4">{app.internshipType || "N/A"}</td>
                <td className="py-4 px-4">{app.status || "Pending"}</td>
                <td className="py-4 px-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedId(app._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  {app.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(app._id, "accept")}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                      >
                        <FaCheckCircle /> Select
                      </button>
                      <button
                        onClick={() => handleStatusChange(app._id, "reject")}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setDeleteConfirm({ open: true, ids: [app._id] })}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <p className="text-center py-6 text-gray-500">No applications found.</p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm.open && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
              <p className="mb-6 text-gray-600">
                Are you sure you want to delete {deleteConfirm.ids.length} application(s)?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm({ open: false, ids: [] })}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm.ids)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl shadow-md mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-wide">Application Details</h2>
                <button
                  onClick={() => setSelectedId(null)}
                  className="text-white hover:text-gray-200 transition text-lg"
                >
                  ✖
                </button>
              </div>

              {/* Body */}
              {viewLoading ? (
                <p className="text-gray-500 text-center py-6 animate-pulse">
                  Loading details...
                </p>
              ) : viewData?.data ? (
                <div className="space-y-4 text-gray-800">
                  <div className="grid grid-cols-2 gap-4">
                    <p><span className="font-semibold text-gray-600">👤 Name:</span> {viewData.data.name}</p>
                    <p><span className="font-semibold text-gray-600">📧 Email:</span> {viewData.data.email}</p>
                    <p><span className="font-semibold text-gray-600">📞 Phone:</span> {viewData.data.phone}</p>
                    <p><span className="font-semibold text-gray-600">💼 Domain:</span> {viewData.data.internshipDomain}</p>
                    <p><span className="font-semibold text-gray-600">📂 Type:</span> {viewData.data.internshipType || "N/A"}</p>
                    <p><span className="font-semibold text-gray-600">⭐ Status:</span> {viewData.data.status || "Pending"}</p>
                  </div>

                  <p>
                    <span className="font-semibold text-gray-600">🛠️ Skills:</span>{" "}
                    {viewData.data.skills?.join(", ") || "—"}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-600">📅 Applied On:</span>{" "}
                    {viewData.data.createdAt
                      ? new Date(viewData.data.createdAt).toLocaleDateString()
                      : "—"}
                  </p>

                  {viewData.data.message && (
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-300 shadow-sm">
                      <p className="whitespace-pre-line text-gray-700">
                        {viewData.data.message}
                      </p>
                    </div>
                  )}

                  {viewData.data.resume?.url && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOpenResume(viewData.data.resume.url)}
                      className="mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow-md"
                    >
                      <FaFilePdf /> View Resume
                    </motion.button>
                  )}
                </div>
              ) : (
                <p className="text-red-500 text-center py-6">❌ No details found.</p>
              )}

              {/* Footer */}
              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedId(null)}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-5 py-2 rounded-lg shadow-md"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>




    </div>
  );
}
