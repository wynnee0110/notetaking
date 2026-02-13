import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";
import NoteCard from "../components/NoteCard";
import { Plus, Search } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const { notes, addNote, deleteNote } = useNotes();
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = useMemo(() => {
    let filtered = notes;
    if (searchQuery) {
      filtered = filtered.filter(note =>
        (note.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.content || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [notes, searchQuery]);

  const handleAdd = () => {
    if (inputText.trim()) {
      addNote(inputText);
      setInputText("");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#FFFFFF] text-[#1C1C1E] overflow-hidden">

      {/* Header / Toolbar */}
      <div className="px-8 py-6 border-b border-[#E0E0E0] bg-white/80 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1C1C1E]">All Notes</h1>
          <p className="text-[#8E8E93] text-sm font-medium mt-1">{filteredNotes.length} notes</p>
        </div>

        <div className="flex gap-4 items-center">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="pl-9 pr-4 py-2 bg-[#E3E3E8] rounded-lg text-sm w-48 focus:w-64 transition-all outline-none placeholder-[#8E8E93] text-[#1C1C1E]"
            />
          </div>

          {/* Quick Add */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="New note title..."
              className="border border-[#E0E0E0] rounded-lg px-4 py-2 text-sm outline-none focus:border-[#F8D349] transition-colors"
            />
            <button
              onClick={handleAdd}
              disabled={!inputText.trim()}
              className="bg-[#F8D349] hover:bg-[#E0BE40] text-black font-semibold p-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-[#F5F5F7]">
        {filteredNotes.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-[#8E8E93]">
            <p className="text-lg font-medium">No notes found</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="cursor-pointer"
                onClick={() => navigate(`/note/${note.id}`)}
              >
                <NoteCard note={note} onDelete={deleteNote} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
