export default function NoteCard({ note, onDelete }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group h-48 flex flex-col relative overflow-hidden">

      {/* Title */}
      <h3 className="font-bold text-lg text-[#1C1C1E] mb-2 truncate">
        {note.title || "Untitled Note"}
      </h3>

      {/* Date */}
      <div className="text-xs text-[#8E8E93] mb-3">
        {note.date}
      </div>

      {/* Content Preview */}
      <p className="text-sm text-[#48484A] line-clamp-4 leading-relaxed flex-1">
        {note.content || "No additional text"}
      </p>

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* Hover Actions */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="text-gray-400 hover:text-red-500 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm"
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}