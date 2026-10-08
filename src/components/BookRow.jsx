export default function BookRow({ book, onUpdate, onDelete }) {
  return (
    <tr className={book.quantity < 2 ? "low" : ""}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.genre}</td>
      <td>{book.isbn}</td>
      <td>{book.quantity}</td>
      <td className="row-actions">
        <button className="btn small" onClick={() => onUpdate(book)}>Update</button>
        <button className="btn small danger" onClick={() => onDelete(book)}>Delete</button>
      </td>
    </tr>
  );
}
