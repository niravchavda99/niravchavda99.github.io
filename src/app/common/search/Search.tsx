import './Search.scss';
import {ChangeEventHandler} from "react";

type SearchProps = {
  handleChange: ChangeEventHandler<HTMLInputElement>
}

const Search = ({handleChange}: SearchProps) => {
  return (
      <div className={'search-container'}>
        <input type="text" className={'input'} placeholder={'Search...'} onChange={handleChange}/>
      </div>
  );
};

export default Search;