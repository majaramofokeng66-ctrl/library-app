import { useState } from "react";
import { useApp } from "../context/AppContext";
import BookForm from "../components/BookForm";
import BookRow from "../components/BookRow";

export default function Books() {
  const { books, addBook, updateBook, deleteBook } = useApp();
  const [editing, setEditing] = useState(null);

  const handleDelete = (book) => {
    if (window.confirm(`Delete "${book.title}"?`)) deleteBook(book.id);
  };

  return (
    <section>
      <h1>Books</h1>

      <h2>{editing ? `Editing: ${editing.title}` : "Add a book"}</h2>
      {editing ? (
        <BookForm
          key={editing.id}
          initial={editing}
          isbnTaken={(isbn) => books.some((b) => b.isbn === isbn && b.id !== editing.id)}
          onSubmit={(data) => { updateBook(editing.id, data); setEditing(null); }}
          onCancel={() => setEditing(null)}
        />
      ) : (
        <BookForm isbnTaken={(isbn) => books.some((b) => b.isbn === isbn)} onSubmit={addBook} />
      )}

      <h2>All books</h2>
      {books.length === 0 ? (
        <p className="empty">No books yet. Use the form above to add one.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Qty</th><th></th></tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <BookRow key={b.id} book={b} onUpdate={setEditing} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
