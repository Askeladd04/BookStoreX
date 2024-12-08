import { FC, memo } from "react";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import { biography } from "../../project_data/biography";
import { fantasy } from "../../project_data/fantasy";
import { romance } from "../../project_data/romance";
import '../Home/Home.css'

export interface ICategoryProps {
}

 const  Category: FC<ICategoryProps> =  memo(({}) => {

    const {name} = useParams()
  return (
    <div className="home_content">
      {name === 'biography' && <><h2>Biography</h2> {biography.map(book => <Card book={book}/>)}</>}
      {name === 'romance' && <><h2>Romance</h2> {romance.map(book => <Card book={book}/>)} </>}
      {name === 'fantasy' && <><h2>Fantasy</h2> {fantasy.map(book => <Card book={book}/>)}</>}
    </div>
  );
})

export  default Category
