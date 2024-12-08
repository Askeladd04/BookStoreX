
import { IBook } from "../../project_data/IBook";
import { motion } from "framer-motion";
import "./search.css";
import { ChangeEvent, FC, memo, useState } from "react";
import Card from "../Card/Card";
import { allBooks } from "../../redux/redux-store";




export interface ISearchProps {}

const Search: FC<ISearchProps> = memo(({}) => {
  const [foundBook, setFoundBook] = useState<Array<IBook>>(allBooks);

  const searchBook = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value.toLowerCase();

    if(searchValue === ''){
      setFoundBook(allBooks)
      return
    }
    const foundsBook: Array<IBook> = allBooks.filter((el) => {
      return el.title.toLowerCase().includes(searchValue);
    });
    setFoundBook(foundsBook);
  };

  return (
    <div className="search_wrapper">
    <motion.div
      className="search_input"
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
    >
      <div className="search_content">
        <input type="text" onChange={(e) => searchBook(e)} placeholder="Search"  autoFocus/>
      </div>
    </motion.div>
    <div className="books_wrapper">
    {foundBook.map(book => <Card  book={book}/>)}
    </div>
    </div>
  );
});

export default Search;
