import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../utils/searchFilterSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.taskFilter.searchQuery);

  return (
    <div
      className="custom-input-group d-flex align-items-center"
      style={{ minWidth: '100px' }}
    >
      <span className="input-group-text bg-white border-end-0">
        <i className="bi bi-search text-muted"></i>
      </span>
      <input
        type="text"
        className="form-control border-start-0"
        placeholder="Search"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
    </div>
  );
};

export default SearchBar;
