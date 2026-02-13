import { useNavigate } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";

export default function Sidebar() {
  const { notes, addNote, activeNoteId, setActiveNoteId, deleteNote } = useNotes();
  const navigate = useNavigate();

  const handleAddNote = () => {
    const newNote = addNote();
    navigate(`/note/${newNote.id}`);
  };

  return (
    <aside className="fixed top-0 h-screen w-80 bg-[#F5F5F5] flex flex-col border-r border-[#E0E0E0] font-sans">

      {/* Header */}
      <div className="p-4 pt-6 pb-2">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="font-bold text-2xl text-[#1C1C1E] tracking-tight">Notes</h2>
          <button
            onClick={handleAddNote}
            className="text-[#F8D349] hover:text-[#E0BE40] transition-colors p-1"
            title="New Note"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Search Bar Placeholder */}
        <div className="px-2 mb-2">
          <div className="bg-[#E3E3E8] rounded-lg flex items-center p-1.5 px-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500 text-[#1C1C1E]"
            />
          </div>
        </div>
      </div>

      {/* The List of Notes */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
        {notes.length === 0 && (
          <div className="text-center text-gray-400 mt-10 text-sm">
            No notes yet
          </div>
        )}
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => {
              setActiveNoteId(note.id);
              navigate(`/note/${note.id}`);
            }}
            className={`
                group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out
                ${note.id === activeNoteId
                ? "bg-[#F8D349] text-black shadow-sm"
                : "hover:bg-[#E8E8E8] text-[#1C1C1E]"}
            `}
          >
            <div className="flex flex-col gap-1">
              <h4 className={`font-bold text-[15px] truncate leading-tight ${note.id === activeNoteId ? "text-black" : ""}`}>
                {note.title || "Untitled Note"}
              </h4>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${note.id === activeNoteId ? "text-black/70" : "text-[#8E8E93]"}`}>
                  {note.date ? note.date.split('/')[0] + '/' + note.date.split('/')[1] : ''}
                </span>
                <p className={`text-xs truncate flex-1 ${note.id === activeNoteId ? "text-black/80" : "text-[#8E8E93]"}`}>
                  {note.content || "No additional text"}
                </p>
              </div>
            </div>

            {/* Hover Delete - subtle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
                if (activeNoteId === note.id) {
                  navigate('/');
                }
              }}
              className={`
                    absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
                    p-1.5 rounded-full transition-all
                    ${note.id === activeNoteId
                  ? "text-black/50 hover:bg-black/10 hover:text-black"
                  : "text-gray-400 hover:bg-gray-200 hover:text-red-500"}
                `}
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}