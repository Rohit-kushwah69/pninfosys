"use client";

import Link from 'next/link'
import React, { useState } from "react";
import {
    useDeleteContactMutation,
    useGetAllContactsQuery
} from "../../../../../redux/features/contact/page";

export default function ContactDashboard() {
    const { data, isLoading } = useGetAllContactsQuery();
    const contacts = data?.contact || [];
    const [deleteContact] = useDeleteContactMutation();
    const [search, setSearch] = useState("");

    const [selectedContact, setSelectedContact] = useState(null); // View modal
    const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Delete confirm

    const filteredContacts = contacts.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            c.phone.includes(search)
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    📩 Contact Messages
                    <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                        {contacts.length} total
                    </span>
                </h1>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by name, email, phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-72"
                />
                {/* ✅ Student Page Button */}
                <Link
                    href="/admin/contactCard"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Contact Card
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
                {filteredContacts.length > 0 ? (
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-blue-600 text-white uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Phone</th>
                                <th className="px-6 py-4">Message</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContacts.map((contact, idx) => (
                                <tr
                                    key={contact._id}
                                    className={`border-b transition ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-blue-50`}
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {contact.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                                            {contact.email}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                                            {contact.phone}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                                        {contact.message}
                                    </td>
                                    <td className="px-6 py-4 text-center flex gap-2 justify-center">
                                        <button
                                            onClick={() => setSelectedContact(contact)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-xs transition"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => setConfirmDeleteId(contact._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-xs transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-10 text-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4076/4076507.png"
                            alt="No data"
                            className="w-24 mx-auto mb-4 opacity-70"
                        />
                        <p className="text-gray-500">No contact messages found.</p>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {selectedContact && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
                        <button
                            onClick={() => setSelectedContact(null)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-4">Contact Details</h2>
                        <p><strong>Name:</strong> {selectedContact.name}</p>
                        <p><strong>Email:</strong> {selectedContact.email}</p>
                        <p><strong>Phone:</strong> {selectedContact.phone}</p>
                        <p><strong>Message:</strong> {selectedContact.message}</p>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDeleteId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl text-center">
                        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                        <p className="text-gray-600 mb-6">
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    deleteContact(confirmDeleteId);
                                    setConfirmDeleteId(null);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
