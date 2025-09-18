import { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

function Home() {
  const [Form, setForm] = useState({
    bookName: "",
    bookTitle: "",
    author: "",
    sellingPrice: "",
    publishDate: "",
  });

  const [editId, setEditId] = useState(null); // ✅ track which book is being edited
  const [allBook, setAllBook] = useState([]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch books
  const getAllBook = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:4000/book/booklist");
      setAllBook(response.data.data.user);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getAllBook();
  }, []);

  // ✅ Handle Submit (Create / Update both)
  const handleSubmit = async () => {
    try {
      if (!Form.bookName || !Form.bookTitle || !Form.author || !Form.publishDate || !Form.sellingPrice) {
        return alert("All fields are required");
      }

      if (editId) {
        // ✅ Update mode
        const { data } = await axios.put(`http://127.0.0.1:4000/book/updatebook/${editId}`, Form);
        if (data?.status === "success") {
          alert("Book updated successfully!");
        }
      } else {
        // ✅ Create mode
        const { data } = await axios.post("http://127.0.0.1:4000/book/addbook", Form);
        if (data?.status === "success") {
          alert("Book added successfully!");
        }
      }

      setForm({
        bookName: "",
        bookTitle: "",
        author: "",
        sellingPrice: "",
        publishDate: "",
      });
      setEditId(null); // reset edit mode
      getAllBook();
    } catch (error) {
      console.log("Error", error);
    }
  };

  // ✅ Delete Book
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://127.0.0.1:4000/book/deletebook/${id}`);
      if (data?.status === "success") {
        alert("Book deleted successfully!");
        getAllBook();
      }
    } catch (error) {
      console.log("Error deleting book", error);
    }
  };

  // ✅ Edit Book (send row data to form)
  const handleEdit = (book) => {
    setForm({
      bookName: book.bookName,
      bookTitle: book.bookTitle,
      author: book.author,
      sellingPrice: book.sellingPrice,
      publishDate: book.publishDate?.split("T")[0] || "", // format date for input[type=date]
    });
    setEditId(book._id); // store editing book id
  };

  return (
    <div className="home-container">
      <form className="book-form">
        <label>Book name</label>
        <input type="text" name="bookName" value={Form.bookName} onChange={handleFormChange} />

        <label>Book title</label>
        <input type="text" name="bookTitle" value={Form.bookTitle} onChange={handleFormChange} />

        <label>Author</label>
        <input type="text" name="author" value={Form.author} onChange={handleFormChange} />

        <label>Selling Price</label>
        <input type="text" name="sellingPrice" value={Form.sellingPrice} onChange={handleFormChange} />

        <label>Publish date</label>
        <input type="date" name="publishDate" value={Form.publishDate} onChange={handleFormChange} />
      </form>

      <button className="home-btn" onClick={handleSubmit}>
        {editId ? "Update Book" : "Add Book"} {/* ✅ change button text */}
      </button>

      <table className="book-table">
        <thead>
          <tr>
            <th>Book name</th>
            <th>Book title</th>
            <th>Author</th>
            <th>Selling price</th>
            <th>Publish date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allBook?.map((x, index) => (
            <tr key={index}>
              <td>{x?.bookName}</td>
              <td>{x?.bookTitle}</td>
              <td>{x?.author}</td>
              <td>{x?.sellingPrice}</td>
              <td>{x?.publishDate?.split("T")[0]}</td>
             <div>
              <td onClick={() => handleDelete(x._id)}>
                <MdDelete />
              </td>
              <td onClick={() => handleEdit(x)}>
                <FaPen />
              </td>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
