const { useState } = React

export const BookFilter = ({ filterBy }) => {
    const [filter, setFilter] = useState({
        title: '',
        
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setFilter({ ...filter, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        filterBy(filter)
    }

    return (
        <form onChange={handleSubmit} className="book-filter">
            <input
                type="text"
                name="title"
                value={filter.title}
                onChange={handleChange}
                placeholder="Search by Title"
            />
            <button type="submit">Filter</button>
        </form>
    )
}