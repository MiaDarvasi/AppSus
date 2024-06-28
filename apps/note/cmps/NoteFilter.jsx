const { useState } = React

export const NoteFilter = ({ filterBy, clearFilters }) => {
  const [filter, setFilter] = useState({
    searchText: '',
    type: 'all'
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    const updatedFilter = { ...filter, [name]: value }
    setFilter(updatedFilter)
    filterBy(updatedFilter.searchText, updatedFilter.type)
  }

  const handleClearFilters = () => {
    setFilter({
      searchText: '',
      type: 'all'
    })
    clearFilters()
  }

  return (

    <form className="note-filter">
      <input
        type="text"
        name="searchText"
        value={filter.searchText}
        onChange={handleChange}
        placeholder="Search by Title"
      />
      <button className="btn-filter" onClick={handleClearFilters}>X</button>
    </form>

  )
}
