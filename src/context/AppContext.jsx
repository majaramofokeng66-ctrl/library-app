import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// default admin so you can log in the first time
const seedUsers = [
  { id: "u1", name: "Admin", membershipId: "ADMIN001", role: "admin", password: "admin123" },
];

export function AppProvider({ children }) {
  const [books, setBooks] = useLocalStorage("books", []);
  const [users, setUsers] = useLocalStorage("users", seedUsers);
  const [transactions, setTransactions] = useLocalStorage("transactions", []);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);

  // ---------- auth ----------
  const login = (membershipId, password) => {
    const user = users.find(
      (u) => u.membershipId.toLowerCase() === membershipId.trim().toLowerCase() && u.password === password
    );
    if (!user) return false;
    setCurrentUser(user);
    return true;
  };
  const logout = () => setCurrentUser(null);

  // ---------- books ----------
  const addBook = (book) => setBooks((prev) => [...prev, { ...book, id: uid() }]);
  const updateBook = (id, data) => setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
  const deleteBook = (id) => setBooks((prev) => prev.filter((b) => b.id !== id));

  // ---------- users ----------
  const addUser = (user) => setUsers((prev) => [...prev, { ...user, id: uid() }]);
  const updateUser = (id, data) => setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
  const deleteUser = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));

  // ---------- transactions ----------
  // returns an error message, or null when it worked
  const recordTransaction = ({ bookId, type, qty, memberId }) => {
    const book = books.find((b) => b.id === bookId);
    if (!book) return "Choose a book.";
    if (!Number.isInteger(qty) || qty < 1) return "Quantity must be a whole number of at least 1.";
    if (type === "borrow" && qty > book.quantity)
      return `Only ${book.quantity} cop${book.quantity === 1 ? "y" : "ies"} of "${book.title}" in stock.`;

    updateBook(bookId, { quantity: type === "add" ? book.quantity + qty : book.quantity - qty });
    setTransactions((prev) => [
      { id: uid(), bookId, bookTitle: book.title, type, qty, memberId: memberId || "", staff: currentUser?.name || "", date: new Date().toISOString() },
      ...prev,
    ]);
    return null;
  };

  const value = {
    books, users, transactions, currentUser,
    login, logout, addBook, updateBook, deleteBook,
    addUser, updateUser, deleteUser, recordTransaction,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
