const Book = require("../model/bookModel");

exports.createBook = async (req, res) => {
  const body = req.body;
  if (!body.bookName || !body.bookTitle || !body.author || !body.sellingPrice) {
    return res.status(400).json({
      status: "failed",
      message: "all field required",
    });
  }

  const user = await Book.create(body);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
exports.getAllBook = async (req, res) => {
  try {
    const user = await Book.find();

    return res.status(200).json({
      status: "success",
      totalBook: user.length,
      data: {
        user,
      },
    });
  } catch (error) {
     res.status(400).json({
    status: "failed",
    message:error.message
    
  });
  }
};


// Delete book by ID
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params; // book ID from URL

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        status: "failed",
        message: "Book not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Book deleted successfully",
    //   deletedBook: book, // optional, shows what got deleted
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};




// ✅ Update Book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params; // id will come from URL
    const body = req.body;

    // check if book exists
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        status: "failed",
        message: "Book not found",
      });
    }

    // update book
    const updatedBook = await Book.findByIdAndUpdate(id, body, {
      new: true, // return updated document
      runValidators: true, // validates data according to schema
    });

    return res.status(200).json({
      status: "success",
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
