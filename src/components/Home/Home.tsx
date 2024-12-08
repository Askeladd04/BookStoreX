import { newBooks } from '../../project_data/new';
import { trending } from '../../project_data/trending';
import { popular } from '../../project_data/popular';
import Card from '../Card/Card';
import './Home.css'
export interface IHomeProps {
}

export default function Home ({}: IHomeProps) {
  return (
      <div className="home_content">
      <h2>Popular</h2>
      {popular.map(book => <Card book={book} key={book.title}/>)}
      <h2>Trending</h2>
      {trending.map(book => <Card book={book} key={book.title}/>)}
      <h2>New</h2>
      {newBooks.map(book => <Card book={book} key={book.title}/>)}
      </div>
  );
}
