import { useState } from "react";
import Field from "./Field";
import { useApp } from "../context/AppContext";

export default function StockForm() {
  const { books, users, recordTransaction } = useApp();
  const [form, setForm] = useState({ bookId: "", qty: "1", memberId: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // type is "add" or "borrow", chosen by which button was pressed
  const submit = (type) => {
    setMessage("");
    if (type === "borrow" && !form.memberId) return setError("Choose the member borrowing the book.");
    const result = recordTransaction({ bookId: form.bookId, type, qty: Number(form.qty), memberId: form.memberId });
    setError(result || "");
    if (!result) setMessage(type === "add" ? "Stock added." : "Book borrowed.");
  };

  return (
    <form className="card form-grid" onSubmit={(e) => e.preventDefault()}>
      <Field label="Book">
        <select name="bookId" value={form.bookId} onChange={handleChange}>
          <option value="">Select a book</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>{b.title} ({b.quantity} in stock)</option>
          ))}
        </select>
      </Field>
      <Field label="Quantity">
        <input name="qty" type="number" min="1" value={form.qty} onChange={handleChange} />
      </Field>
      <Field label="Member (for borrowing)">
        <select name="memberId" value={form.memberId} onChange={handleChange}>
          <option value="">Select a member</option>
          {users.map((u) => (
            <option key={u.id} value={u.membershipId}>{u.name} ({u.membershipId})</option>
          ))}
        </select>
      </Field>
      <div className="actions">
        <button className="btn" type="button" onClick={() => submit("add")}>Add stock</button>
        <button className="btn danger" type="button" onClick={() => submit("borrow")}>Borrow</button>
      </div>
      {error && <small className="error full">{error}</small>}
      {message && <small className="ok full">{message}</small>}
    </form>
  );
}
