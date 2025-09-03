import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Fail to delete note");
    } 
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-content/10 border-l-4 border-primary shadow-sm hover:shadow-lg 
    transition-all duration-200 rounded-xl ml-5 mr-5"
    >
      <div className="card-body">
        {/* Title */}
        <h3 className="card-title text-lg font-semibold text-base-content">
          {note.title}
        </h3>

        {/* Content preview */}
        <p className="text-base-content/70 text-sm line-clamp-3">
          {note.content}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          {/* Date */}
          <span className="text-xs text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-xs text-primary flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              Edit
            </button>
            <button
              className="btn btn-ghost btn-xs text-error flex items-center gap-1"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
