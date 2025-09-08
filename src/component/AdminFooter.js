'use client';
import React from 'react';

function AdminFooter() {
  return (
    <footer className="bg-white text-gray-500 text-sm text-center py-4 border-t border-gray-200">
      © {new Date().getFullYear()} PN INFOSYS. All rights reserved.
    </footer>
  );
}

export default AdminFooter;
