import React from 'react';

const NewUsersCard = () => {
  const users = [
    { id: 1, name: 'English Course', enrolledStudents: 1, offer: 'Premium' },
    { id: 2, name: 'English Course', enrolledStudents: 1, offer: 'Premium' },
    { id: 3, name: 'English Course', enrolledStudents: 1, offer: 'Premium' },
  ];

  return (
    <div className="border border-gray-300 rounded-2xl bg-white p-6 w-full max-w-xl shadow-sm">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">New Courses</h2>

      <div className="space-y-4">
        {users.map((user) => {
          const avatarLetter = user.name.charAt(0).toUpperCase();

          return (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:shadow transition duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-[#7D287E] text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md">
                  {avatarLetter}
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.enrolledStudents} Student{user.enrolledStudents > 1 ? 's' : ''}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-[#7D287E]">{user.offer}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="bg-[#7D287E] hover:bg-[#6b226e] text-white font-semibold py-2.5 px-6 rounded-xl shadow hover:shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
          View All
        </button>
      </div>
    </div>
  );
};

export default NewUsersCard;
