import { FC, memo, useState } from "react";
import { IBook } from "../../project_data/IBook";
import { actionsBookReducer } from "../../redux/BookSlice";
import "./BookItem.css";
import { useAppDispatch } from "../../redux/redux-store";

type BookItemsType = {
  book: IBook;
};

const BookItems: FC<BookItemsType> = memo(({ book }) => {
  const dispatch = useAppDispatch();
  const handleClick = (book: IBook) => {
    dispatch<any>(actionsBookReducer.removeBook(book));
  };
  const [activeItem, setActiveItem] = useState<string>("");

  const bookTotalPrice =
    book.quantity && book.quantity > 1
      ? book.price * book.quantity
      : book.price;

  return (
    <div
      className={`books_content_item ${
        activeItem === book.title && "active_book"
      }`}
      onMouseEnter={() => setActiveItem(book.title)}
      onMouseLeave={() => setActiveItem("")}
    >
      <span>
        {book.title}
        {book.quantity && book.quantity > 1 && `(x${book.quantity})` }
      </span>
      <span className="price">Price: {bookTotalPrice} TMT</span>
      {book.title === activeItem && (
        <button  className="close_btn" onClick={handleClick.bind(null, book)}>
          X
        </button>
      )}
    </div>
  );
});

export default BookItems;
