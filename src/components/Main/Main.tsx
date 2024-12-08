import { FC, memo, useEffect } from "react";
import "./Main.css";
import Home from "../Home/Home";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Search from "../search/search";
import Category from "../Category/Category";
import BookDetail from "../BookDetail/Bookdetail";

type Props = {
  overlay: boolean;
};

const Main: FC<Props> = memo(({ overlay }) => {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

  },[pathname])

  return (
    <div className={`main_wrapper ${overlay && "overlay"}`}>
        <Routes>
          <Route path="/home/:id?" element={<Home/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/category/:name?" element={<Category/>}/>
          <Route path="book/:id?" element={<BookDetail/>} />
          <Route path="/" element={<Navigate to={'/home'}/>}/>
        </Routes>
    </div>
  );
});

export default Main;
