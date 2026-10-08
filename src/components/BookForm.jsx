import { useState } from "react";
import Field from "./Field";

const empty = { title: "", author: "", genre: "", isbn: "", quantity: "" };

// used for BOTH adding and editing a book
export default function BookForm({ initial, onSubmit, onCancel, isbnTaken }) {
  const [form, setForm] = useState(initial ? { ...initial, quantity: String(initial.quantity) } : empty);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Title is required.";
    if (!form.author.trim()) err.author = "Author is required.";
    if (!form.genre.trim()) err.genre = "Genre is required.";
    if (!/^[\d-]{10,17}$/.test(form.isbn.trim())) err.isbn = "ISBN must be 10-17 digits (hyphens allowed).";
    else if (isbnTaken && isbnTaken(form.isbn.trim())) err.isbn = "A book with this ISBN already exists.";
    const q = Number(form.quantity);
    if (form.quantity === "" || !Number.isInteger(q) || q < 0) err.quantity = "Quantity must be a whole number, 0 or more.";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;
    onSubmit({
      title: form.title.trim(), author: form.author.trim(), genre: form.genre.trim(),
      isbn: form.isbn.trim(), quantity: Number(form.quantity),
    });
    if (!initial) setForm(empty);
  };

  return (
    <form className="card form-grid" onSubmit={handleSubmit} noValidate>
      <Field label="Title" error={errors.title}><input name="title" value={form.title} onChange={handleChange} /></Field>
      <Field label="Author" error={errors.author}><input name="author" value={form.author} onChange={handleChange} /></Field>
      <Field label="Genre" error={errors.genre}><input name="genre" value={form.genre} onChange={handleChange} /></Field>
      <Field label="ISBN" error={errors.isbn}><input name="isbn" value={form.isbn} onChange={handleChange} /></Field>
      <Field label={initial ? "Quantity" : "Initial quantity"} error={errors.quantity}>
        <input name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} />
      </Field>
      <div className="actions">
        <button className="btn" type="submit">{initial ? "Save changes" : "Add book"}</button>
        {onCancel && <button className="btn ghost" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
