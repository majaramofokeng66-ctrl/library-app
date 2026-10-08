import { useState } from "react";
import Field from "./Field";
import { useApp } from "../context/AppContext";

export default function LoginForm() {
  const { login } = useApp();
  const [form, setForm] = useState({ membershipId: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.membershipId.trim() || !form.password) return setError("Enter your membership ID and password.");
    if (!login(form.membershipId, form.password)) setError("Membership ID or password is incorrect.");
  };

  return (
    <form className="card login" onSubmit={handleSubmit} noValidate>
      <h2>Log in</h2>
      <Field label="Membership ID"><input name="membershipId" value={form.membershipId} onChange={handleChange} /></Field>
      <Field label="Password"><input name="password" type="password" value={form.password} onChange={handleChange} /></Field>
      {error && <small className="error">{error}</small>}
      <button className="btn" type="submit">Log in</button>
      <p className="hint">First time? Use ADMIN001 / admin123</p>
    </form>
  );
}
