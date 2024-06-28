const { useState } = React

export const NoteFilter = ({ filterBy, clearFilters }) => {
    const [filter, setFilter] = useState({
      searchText: '',
      type: 'all'
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      const updatedFilter = { ...filter, [name]: value };
      setFilter(updatedFilter);
      filterBy(updatedFilter.searchText, updatedFilter.type);
    };
  
    const handleClearFilters = () => {
      setFilter({
        searchText: '',
        type: 'all'
      });
      clearFilters();
    };
  
    return (
      <div>
        <form className="note-filter">
          <input
            type="text"
            name="searchText"
            value={filter.searchText}
            onChange={handleChange}
            placeholder="        Search by Title"
          />  
    
        </form>
        <div className="filter-icon"><img src="assets/img/search.png"/></div>
        <button className="btn-filter" onClick={handleClearFilters}>Clear Filters</button>
      </div>
    );
  };
