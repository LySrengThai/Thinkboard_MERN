import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import axios from "axios";
import { toast } from "react-hot-toast";
import NoteCard from "../component/NoteCard";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");

        setNotes(res.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
        toast.error("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />

      <div className="max-w-7xl mx-auto p-4 mt-6"></div>
      {loading && (
        <div className="text-center text-primary py-10">Loading Notes...</div>
      )}

      {!loading && notes.length === 0 && (
        <div className="text-center text-gray-500 py-10">No notes found</div>
      )}

      {notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
