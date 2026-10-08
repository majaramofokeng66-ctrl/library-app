import { useState } from "react";
import { useApp } from "../context/AppContext";
import LoginForm from "../components/LoginForm";
import UserForm from "../components/UserForm";

export default function Users() {
  const { currentUser, users, addUser, updateUser, deleteUser } = useApp();
  const [editing, setEditing] = useState(null);

  // not logged in: show the login form
  if (!currentUser) {
    return (
      <section>
        <h1>Users</h1>
        <LoginForm />
      </section>
    );
  }

  if (currentUser.role !== "admin") {
    return (
      <section>
        <h1>Users</h1>
        <p className="empty">Signed in as {currentUser.name}. Only admins can manage users.</p>
      </section>
    );
  }

  const idTaken = (id, ignoreId) =>
    users.some((u) => u.membershipId.toLowerCase() === id.toLowerCase() && u.id !== ignoreId);

  const handleDelete = (u) => {
    if (u.id === currentUser.id) return alert("You can't delete the account you're logged in with.");
    if (window.confirm(`Delete ${u.name}?`)) deleteUser(u.id);
  };

  return (
    <section>
      <h1>Users</h1>
      <h2>{editing ? `Editing: ${editing.name}` : "Add a user"}</h2>
      {editing ? (
        <UserForm
          key={editing.id}
          initial={editing}
          idTaken={(id) => idTaken(id, editing.id)}
          onSubmit={(data) => { updateUser(editing.id, data); setEditing(null); }}
          onCancel={() => setEditing(null)}
        />
      ) : (
        <UserForm idTaken={(id) => idTaken(id)} onSubmit={addUser} />
      )}

      <h2>All users</h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Membership ID</th><th>Role</th><th></th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td><td>{u.membershipId}</td><td>{u.role}</td>
                <td className="row-actions">
                  <button className="btn small" onClick={() => setEditing(u)}>Update</button>
                  <button className="btn small danger" onClick={() => handleDelete(u)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
