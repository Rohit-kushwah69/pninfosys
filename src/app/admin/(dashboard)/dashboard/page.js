import React from 'react';

const Page = () => {
  return (
    <div className=" sm:p-6 lg:p-8 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8">
        Welcome Admin
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Sliders */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
          <h2 className="text-lg font-semibold">Total Sliders</h2>
          <p className="text-4xl font-bold mt-2">8</p>
        </div>

        {/* Total Users */}
        <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-4xl font-bold mt-2">120</p>
        </div>

        {/* Total Courses */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
          <h2 className="text-lg font-semibold">Total Courses</h2>
          <p className="text-4xl font-bold mt-2">25</p>
        </div>
      </div>
    </div>
  );
};

export default Page; 