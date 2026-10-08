import { useState } from "react";
import Field from "./Field";

const empty = { name: "", membershipId: "", role: "member", password: "" };

// used for BOTH adding and editing a user
export default function UserForm({ initial, onSubmit, onCancel, idTaken }) {
  const [form, setForm] = useState(initial ? { ...initial, password: "" } : empty);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Name is required.";
    if (!form.membershipId.trim()) err.membershipId = "Membership ID is required.";
    else if (idTaken(form.membershipId.trim())) err.membershipId = "This membership ID is already used.";
    if ((!initial || form.password) && form.password.length < 6) err.password = "Password must be at least 6 characters.";
    setErrors(err);
    if (Object.keys(err).length) return;

    const data = { name: form.name.trim(), membershipId: form.membershipId.trim(), role: form.role };
    if (form.password) data.password = form.password; // blank on edit keeps the old password
    onSubmit(data);
    if (!initial) setForm(empty);
  };

  return (
    <form className="card form-grid" onSubmit={handleSubmit} noValidate>
      <Field label="Name" error={errors.name}><input name="name" value={form.name} onChange={handleChange} /></Field>
      <Field label="Membership ID" error={errors.membershipId}><input name="membershipId" value={form.membershipId} onChange={handleChange} /></Field>
      <Field label="Role">
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="member">Member</option>
          <option value="librarian">Librarian</option>
          <option value="admin">Admin</option>
        </select>
      </Field>
      <Field label={initial ? "New password (optional)" : "Password"} error={errors.password}>
        <input name="password" type="password" value={form.password} onChange={handleChange} />
      </Field>
      <div className="actions">
        <button className="btn" type="submit">{initial ? "Save changes" : "Add user"}</button>
        {onCancel && <button className="btn ghost" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
