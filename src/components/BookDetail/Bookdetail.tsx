import { FC } from "react";
import { useParams } from "react-router-dom";
import { allBooks } from "../../redux/redux-store";
import { IBook } from "../../project_data/IBook";
import "./BookDetail.css";
import GetSVGSelector from "../../common/GetSVGSelector";
import { actionsBookReducer } from "../../redux/BookSlice";
import useMessage from "antd/es/message/useMessage";
import { useAppDispatch } from "../../redux/redux-store";

type BookDetailLPropsType = {};

const BookDetail: FC<BookDetailLPropsType> = () => {
  const { id } = useParams();

  const book: IBook = allBooks.find((book) => book.id === Number(id))!;

  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = useMessage()


  const handleClick = (book: IBook) => {
    dispatch<any>(actionsBookReducer.addBook(book))
    messageApi.open({
        type: 'success',
        content: 'Book added successfully, check your basket'
      })
  }

  return (
    <div className="book_details_wrapper">
      <div className="book_details_content">
        <span className="book_title">{book.title}</span>
        <div className="book_author">
          <GetSVGSelector id="pero" /> By {book.author}
        </div>
        <div className="book_others">
        <span>Language: {book.language}</span>
        <span>Price: {book.price} TMT</span>
        </div>
        
        <div className="book_description">Description: {book.description}</div>
        {contextHolder}
        <button onClick={() => handleClick(book)}>Add </button>
      </div>
      <div className="book_image">
          <img src={book.image} alt="" />
    </div>
    </div>
  );
};

export default BookDetail;
