'use client'
import React from 'react';

const TagsSelector = ({ tags, setTags }) => {
  return (
    <div className="rounded-xl p-6 w-sm">
      <h2 className="text-lg text-[#282828] mb-4">Tags</h2>
      <select
        id="examTags"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      >
        <option value="">Select</option>
        <option value="tag1">tag 1</option>
        <option value="tag2">tag 2</option>
        <option value="tag3">tag 3</option>
      </select>
    </div>
  );
};

export default TagsSelector;
