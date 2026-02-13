
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";

export default function EditorPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { notes, setNotes, setActiveNoteId } = useNotes();
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef(null);
    const titleRef = useRef(null);

    const note = notes.find((n) => n.id === parseInt(id));

    useEffect(() => {
        if (note) {
            setActiveNoteId(note.id);
        } else if (notes.length > 0 && id) {
            navigate("/");
        }
    }, [id, note, setActiveNoteId, navigate, notes.length]);

    const updateNote = (field, value) => {
        if (!note) return;
        const updatedNote = { ...note, [field]: value };
        setNotes((prevNotes) =>
            prevNotes.map((n) => (n.id === note.id ? updatedNote : n))
        );
    };

    const handleTitleFocus = () => {
        setIsFocused(true);
        titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const autoResizeContent = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    if (!note) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 p-8">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <span className="text-2xl font-mono">📝</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Loading your note</h1>
                    <p className="text-slate-500">Just a moment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all duration-200"
                        title="Back to notes"
                    >
                        ← Back
                    </button>
                    <div className="text-sm text-slate-500 font-medium">
                        Draft saved -  {note.content?.length || 0} chars
                    </div>
                    <div className="w-12" />
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12 lg:px-0">
                {/* Title Input */}
                <div
                    className="mb-12 group"
                    ref={titleRef}
                >
                    <input
                        type="text"
                        value={note.title || ""}
                        onChange={(e) => updateNote("title", e.target.value)}
                        placeholder="Your note title"
                        className="w-full text-4xl lg:text-5xl font-bold text-slate-900 bg-transparent 
                                   outline-none placeholder-slate-400/70 pb-8 border-b-2 border-transparent
                                   group-hover:border-slate-200 focus:border-indigo-500 focus:placeholder-transparent
                                   transition-all duration-300 resize-none min-h-[120px]
                                   focus:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.2)]"
                        onFocus={handleTitleFocus}
                    />
                </div>

                {/* Content Editor */}
                <div className={`bg-white/70 backdrop-blur-sm  lg:shadow-2xl 
                               rounded-3xl p-8 lg:p-12 transition-all duration-500 relative overflow-hidden
                               ${isFocused ? ' scale-[1.01]' : 'hover:scale-[1.005]'}`}>

                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-transparent to-pink-50/30 -z-10" />

                    <textarea
                        ref={textareaRef}
                        value={note.content || ""}
                        onChange={(e) => {
                            updateNote("content", e.target.value);
                            autoResizeContent();
                        }}
                        placeholder="Write your thoughts here... 
                        
"
                        className="w-full min-h-[400px] lg:min-h-[600px] resize-none outline-none 
                                   text-lg lg:text-xl leading-8 lg:leading-10 text-slate-800 placeholder-slate-400/60
                                   bg-transparent pt-4 scrollbar-thin scrollbar-thumb-slate-300/50 
                                   scrollbar-track-slate-100/50 hover:scrollbar-thumb-slate-400
                                   focus:scrollbar-thumb-indigo-500 focus:placeholder-transparent
                                   selection:bg-indigo-200/60"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>

                {/* Footer Stats */}
                {note.content && (
                    <div className="mt-8 pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center text-sm text-slate-500">
                        <div className="flex items-center space-x-6">
                            <span>{note.content.length} characters</span>
                            <span>{note.content.split('\n').length} lines</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                            Saved
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
