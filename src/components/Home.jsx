import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addTopaste, updateToPaste } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => { 
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId, allPastes])

    function createPaste() {
        if (!title.trim() || !value.trim()) return; // prevent empty paste

        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if (pasteId) {
            dispatch(updateToPaste(paste));
        } else {
            dispatch(addTopaste(paste));
        }

        // reset after creation/updation
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className="min-h-screen  flex flex-col items-center p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-3xl p-6 flex flex-col md:flex-row gap-4 md:gap-6">
                <input 
                    className="flex-1 p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    type="text" 
                    placeholder="Enter title here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button 
                    onClick={createPaste}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 transition shadow-md"
                >
                    {pasteId ? "Update Paste" : "Create Paste"}
                </button>
            </div>

            <div className="w-full max-w-4xl mt-6">
                <textarea
                    className="w-full rounded-2xl border border-gray-300 p-4 min-h-[300px] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none shadow-sm"
                    value={value}
                    placeholder="Enter content here"
                    onChange={(e) => setValue(e.target.value)}
                    rows={15}
                />
            </div>
        </div>
    )
}

export default Home;