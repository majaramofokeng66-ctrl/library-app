import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/users");
  };

  return (
    <header className="navbar">
      <span className="brand">Community Library</span>
      <nav>
        {currentUser && (
          <>
            <NavLink to="/" end>Dashboard</NavLink>
            <NavLink to="/books">Books</NavLink>
            <NavLink to="/transactions">Transactions</NavLink>
          </>
        )}
        <NavLink to="/users">{currentUser ? "Users" : "Login"}</NavLink>
      </nav>
      {currentUser && (
        <div className="who">
          <span>{currentUser.name} ({currentUser.role})</span>
          <button className="btn small ghost" onClick={handleLogout}>Log out</button>
        </div>
      )}
    </header>
  );
}
