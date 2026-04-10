import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeToPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();


  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  function handleDelete(pasteId) {
    dispatch(removeToPaste(pasteId));
    toast.success("Paste deleted!");
  }

  function handleShare(paste) {
  const textToCopy = `Title: ${paste.title}\n\n${paste.content}`;

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      toast.success("Note copied to clipboard!");
    })
    .catch(() => {
      toast.error("Failed to copy!");
    });
}

  return (
    <div className="p-6 max-w-5xl mx-auto">
      
      <input
        className='p-3 rounded-2xl w-full md:w-[500px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm'
        type="search"
        placeholder='Search your pastes...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      
      <div className='flex flex-col gap-6 mt-6'>
        {filterData.length > 0 ? filterData.map((paste) => (
          <div key={paste._id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 transition hover:shadow-2xl">
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800">{paste.title}</h2>

            
            <p className="text-gray-700 whitespace-pre-wrap">{paste.content}</p>

            
            <div className="flex flex-wrap gap-2 items-center mt-3">
              <Link to={`/?pasteId=${paste._id}`} className="px-4 py-1 rounded-lg border border-gray-400 text-gray-800 hover:bg-gray-100 transition">
                Edit
              </Link>

              <Link to={`/pastes/${paste._id}`} className="px-4 py-1 rounded-lg border border-gray-400 text-gray-800 hover:bg-gray-100 transition">
                View
              </Link>

              <button onClick={() => handleDelete(paste._id)} className="px-4 py-1 rounded-lg border border-gray-400 text-gray-800 hover:bg-gray-100 transition">
                Delete
              </button>

              <button onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("Copied to clipboard!");
              }} className="px-4 py-1 rounded-lg border border-gray-400 text-gray-800 hover:bg-gray-100 transition">
                Copy
              </button>

             <button
  onClick={() => handleShare(paste)}
  className="px-4 py-1 rounded-lg border border-gray-400 text-gray-800 hover:bg-gray-100 transition"
>
  Share
</button>

              
              <span className="ml-auto text-gray-500 text-sm">{new Date(paste.createdAt).toLocaleString()}</span>
            </div>
          </div>
        )) : (
          <p className="text-gray-200 mt-6 text-center">No pastes found.</p>
        )}
      </div>
    </div>
  )
}

export default Paste;