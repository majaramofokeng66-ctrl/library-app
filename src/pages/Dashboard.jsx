import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { books } = useApp();
  const lowStock = books.filter((b) => b.quantity < 2);

  return (
    <section>
      <h1>Dashboard</h1>
      <p className="summary">
        {books.length} titles in the catalogue.{" "}
        {lowStock.length > 0 ? `${lowStock.length} running low.` : "Stock levels are healthy."}
      </p>
      {books.length === 0 ? (
        <p className="empty">No books yet. Add your first book on the Books page.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Title</th><th>Author</th><th>Genre</th><th>In stock</th><th>Status</th></tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.id} className={b.quantity < 2 ? "low" : ""}>
                  <td>{b.title}</td><td>{b.author}</td><td>{b.genre}</td><td>{b.quantity}</td>
                  <td>{b.quantity === 0 ? "Out of stock" : b.quantity < 2 ? "Low stock" : "Available"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
