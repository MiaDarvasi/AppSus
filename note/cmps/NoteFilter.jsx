const { useState } = React

export const NoteFilter = ({ filterBy, clearFilters }) => {
    const [filter, setFilter] = useState({
        searchText: '',
        type: 'all' 
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setFilter({ ...filter, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        filterBy(filter)
    }

    const handleClearFilters = () => {
        setFilter({
            searchText: '',
            type: 'all'
        })
        clearFilters()
    }

    return (
        <div>
            <form onChange={handleSubmit} className="note-filter">
                <input
                    type="text"
                    name="searchText"
                    value={filter.searchText}
                    onChange={handleChange}
                    placeholder="Search by Title or Text"
                />
                {/* <button type="submit">Filter</button> */}
            </form>
            <button className="btn-filter" onClick={handleClearFilters}>X</button>
        </div>
    )
}