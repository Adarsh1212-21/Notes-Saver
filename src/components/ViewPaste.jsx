import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) return <p className="text-center text-gray-500 mt-10">Paste not found</p>;

  return (
    <div className="min-h-screen  flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-3xl p-6 flex flex-col gap-6">
        <input 
          type="text"
          value={paste.title}
          disabled
          className="w-full p-3 rounded-2xl border border-gray-300 bg-gray-100 text-gray-700 font-semibold focus:outline-none"
        />

        <textarea
          value={paste.content}
          disabled
          rows={15}
          className="w-full p-4 rounded-2xl border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none resize-none shadow-sm whitespace-pre-wrap"
        />
      </div>
    </div>
  )
}

export default ViewPaste;