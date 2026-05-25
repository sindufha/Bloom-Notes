import { useState } from "react";
import { Plus, Trash2, Pencil, X, Check } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

type StickyNote = {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: number;
};

const NOTE_COLORS = [
  { name: "Kuning", value: "bg-sunny" },
  { name: "Pink", value: "bg-bubblegum" },
  { name: "Hijau", value: "bg-mint" },
  { name: "Biru", value: "bg-sky" },
  { name: "Ungu", value: "bg-lavender" },
  { name: "Putih", value: "bg-white" },
];

export default function StickyNotes() {
  const [notes, setNotes] = useLocalStorage<StickyNote[]>("bloom-sticky-notes", []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newColor, setNewColor] = useState(NOTE_COLORS[0].value);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editColor, setEditColor] = useState("");

  const addNote = () => {
    if (!newTitle.trim() && !newContent.trim()) return;
    const note: StickyNote = {
      id: uuidv4(),
      title: newTitle.trim(),
      content: newContent.trim(),
      color: newColor,
      createdAt: Date.now(),
    };
    setNotes((prev) => [note, ...prev]);
    setNewTitle("");
    setNewContent("");
    setNewColor(NOTE_COLORS[0].value);
    setShowNew(false);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const startEdit = (note: StickyNote) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditColor(note.color);
  };

  const saveEdit = (id: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, title: editTitle.trim(), content: editContent.trim(), color: editColor }
          : n
      )
    );
    setEditingId(null);
  };

  const tiltClasses = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-0", "-rotate-3"];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-4xl">Catatan Tempel</h1>
          <p className="font-body text-ink/70 mt-1">
            Catatan warna-warni yang disimpan langsung di peramban kamu.
          </p>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="inline-flex items-center gap-2 px-5 py-3 font-display font-semibold bg-sunny border-3 border-ink rounded-full shadow-cartoon-sm hover:-translate-y-0.5 hover:shadow-cartoon transition-all"
        >
          {showNew ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          {showNew ? "Batal" : "Catatan baru"}
        </button>
      </div>

      {showNew && (
        <div className="bg-white border-3 border-ink rounded-blob p-6 shadow-cartoon-lg mb-8 max-w-lg">
          <input
            type="text"
            placeholder="Judul"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full font-display font-bold text-xl bg-transparent outline-none placeholder:text-ink/30 mb-3"
          />
          <textarea
            placeholder="Tulis catatanmu di sini..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={4}
            className="w-full font-body bg-transparent outline-none placeholder:text-ink/30 resize-none mb-4"
          />
          <div className="flex items-center gap-2 mb-4">
            {NOTE_COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => setNewColor(c.value)}
                aria-label={c.name}
                className={`w-8 h-8 rounded-full border-3 ${c.value} ${
                  newColor === c.value ? "border-ink scale-110" : "border-transparent"
                } transition-all`}
              />
            ))}
          </div>
          <button
            onClick={addNote}
            className="inline-flex items-center gap-2 px-5 py-2.5 font-display font-semibold bg-mint border-3 border-ink rounded-full shadow-cartoon-sm hover:-translate-y-0.5 hover:shadow-cartoon transition-all"
          >
            <Check className="h-4 w-4" /> Tambah catatan
          </button>
        </div>
      )}

      {notes.length === 0 && !showNew && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-sunny border-3 border-ink rounded-full shadow-cartoon-sm mb-4">
            <Pencil className="h-8 w-8 text-ink" />
          </div>
          <p className="font-display text-xl font-semibold text-ink/60">
            Belum ada catatan. Yuk, buat yang pertama!
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {notes.map((note, i) => (
          <div
            key={note.id}
            className={`${note.color} border-3 border-ink rounded-blob p-5 shadow-cartoon ${
              tiltClasses[i % tiltClasses.length]
            } hover:rotate-0 transition-transform duration-200`}
          >
            {editingId === note.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full font-display font-bold text-lg bg-white/50 rounded-lg px-2 py-1 outline-none border-2 border-ink/20 mb-2"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={3}
                  className="w-full font-body bg-white/50 rounded-lg px-2 py-1 outline-none border-2 border-ink/20 resize-none mb-3"
                />
                <div className="flex items-center gap-2 mb-3">
                  {NOTE_COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setEditColor(c.value)}
                      aria-label={c.name}
                      className={`w-6 h-6 rounded-full border-2 ${c.value} ${
                        editColor === c.value ? "border-ink scale-110" : "border-transparent"
                      } transition-all`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(note.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-display font-semibold bg-white border-2 border-ink rounded-full"
                  >
                    <Check className="h-3 w-3" /> Simpan
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-display font-semibold bg-white/60 border-2 border-ink/40 rounded-full"
                  >
                    <X className="h-3 w-3" /> Batal
                  </button>
                </div>
              </>
            ) : (
              <>
                {note.title && (
                  <h3 className="font-display font-bold text-lg mb-1">{note.title}</h3>
                )}
                <p className="font-body text-sm text-ink/80 whitespace-pre-wrap">
                  {note.content}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-body text-xs text-ink/40">
                    {new Date(note.createdAt).toLocaleDateString("id-ID")}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => startEdit(note)}
                      aria-label="Sunting catatan"
                      className="p-1.5 rounded-full hover:bg-white/50 transition-colors"
                    >
                      <Pencil className="h-4 w-4 text-ink/60" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      aria-label="Hapus catatan"
                      className="p-1.5 rounded-full hover:bg-white/50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-ink/60" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
