import { useApp } from "../context/AppContext";
import StockForm from "../components/StockForm";

export default function Transactions() {
  const { transactions } = useApp();

  return (
    <section>
      <h1>Transactions</h1>
      <StockForm />

      <h2>History</h2>
      {transactions.length === 0 ? (
        <p className="empty">No transactions yet. Add stock or record a borrow above.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Date</th><th>Book</th><th>Type</th><th>Qty</th><th>Member</th><th>Recorded by</th></tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{new Date(t.date).toLocaleString()}</td>
                  <td>{t.bookTitle}</td>
                  <td>{t.type === "add" ? "Stock added" : "Borrowed"}</td>
                  <td>{t.type === "add" ? `+${t.qty}` : `-${t.qty}`}</td>
                  <td>{t.memberId || "-"}</td>
                  <td>{t.staff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
