import { FC, memo } from "react";
import { motion } from "framer-motion";
import { SmileOutlined } from "@ant-design/icons";
import "./Basket.css";
import { AppStore, useAppSelector } from "../../redux/redux-store";
import { IBook } from "../../project_data/IBook";
import BookItems from "../BookItem/BookItem";

type BasketPropsType = {};
const Basket: FC<BasketPropsType> = memo(({}) => {


  let books: Array<IBook> = useAppSelector<AppStore, Array<IBook>>(
    (state) => state.BookReducer.basket || []
  ) as Array<IBook>;

  const totalPrice = books.reduce((acc , el) => {
     return acc + ((el.quantity || 1) * el.price)
  }, 0)

  const isBook = books.length === 0 




  return (
    <motion.div
      className="basket_wrapper"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="basket_content">
        {isBook? (
          <div className="empty">
            <SmileOutlined style={{ fontSize: "50px" }} />
            <h2>Empty</h2>
          </div>
        ) : (
          <>
            {books.map((book) => (
              <BookItems key={book.id} book={book}/>
            ))}

          </>
        )}
      </div>
      { !isBook && <div className="total_price">
        <span>Total price: </span>
        <span>
        {totalPrice} TMT
        </span>
      </div>}
    </motion.div>
  );
});

export default Basket;
