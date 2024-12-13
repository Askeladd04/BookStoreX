import { FC, memo, useEffect, useState } from "react";
import { Image } from "antd";
import { motion } from "framer-motion";
import "./Card.css";
import { IBook } from "../../project_data/IBook";
import GetSVGSelector from "../../common/GetSVGSelector";
import { actionsBookReducer } from "../../redux/BookSlice";
import useMessage from "antd/es/message/useMessage";
import { useNavigate } from "react-router-dom";
import { allBooks, useAppDispatch } from "../../redux/redux-store";

type Props = {
  book: IBook;
};

const Card: FC<Props> = memo(({ book }) => {
  const [cardMode, setCardMode] = useState(false);
  const [activeBook, setActiveBook] = useState<string | IBook[]>("");
  const [messageApi, contextHolder] = useMessage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (book: IBook) => {
    dispatch<any>(actionsBookReducer.addBook(book));
    messageApi.open({
      type: "success",
      content: "Book added successfully , check your basket.",
    });
  };

  const isMediumScreen = Number(window.screen.availWidth) <= 1400;

  useEffect(() => {
    if (isMediumScreen) {
      setCardMode(true);
      setActiveBook(allBooks);
    } else {
      setCardMode(false);
      setActiveBook(" ");
    }
  }, [window.screen.availWidth]);

  const openInfo = (id: number) => {
    navigate(`/book/${id}`);
  };

  const handleMouseLeave = () => {
    if (!isMediumScreen) {
      setCardMode(false);
      setActiveBook("");
    }
  };

  return (
    <div className={`card_wrapper`}>
      <Image
        src={book.image}
        style={{width:'260px'}}
        alt="logo"
        className="card_image"
        onMouseEnter={() => {
          setCardMode(true);
          setActiveBook(book.title);
        }}
        onMouseLeave={handleMouseLeave}
      />
      {cardMode && (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
          className={
            activeBook === book.title || activeBook === allBooks
              ? "activeZone"
              : ""
          }
          onMouseEnter={() => {
            setCardMode(true);
            setActiveBook(book.title);
          }}
          onMouseLeave={handleMouseLeave}
        >
          <h3 style={{ textAlign: "center" }}>{book.title}</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              margin: "0 auto",
              gap: "10px",
            }}
          >
            <span>Price: {book.price} TMT</span>
            <span>Language: {book.language}</span>
            <div className="card_btn">
              <button onClick={() => openInfo(book.id)}>Info</button>
              {contextHolder}
              <button onClick={() => handleClick(book)}>
                <GetSVGSelector id={"basket"} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
});

export default Card;
