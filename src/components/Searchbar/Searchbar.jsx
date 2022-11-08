import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import { Searchbar } from './Searchbar.styled';
import toast from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = evt => {
    setImageName(evt.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (imageName.trim() === '') {
      return toast.error('Please, enter your search request.');
    }

    onSubmit(imageName);
    setImageName('');
  };

  return (
    <Searchbar>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <FcSearch style={{ marginRight: 5 }} />
          <span>Search</span>
        </button>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          value={imageName}
          onChange={handleNameChange}
          placeholder="Search images and photos"
        />
      </form>
    </Searchbar>
  );
};

export default SearchBar;
