import { MailPreview } from '../cmps/MailPreview.jsx'
import { mailService } from '../services/mail.service.js'

const { Link, useOutletContext } = ReactRouterDOM
const { useState } = React

export function MailList() {
    const { mails, onRemove } = useOutletContext()
    const [hoveredItemId, setHoveredItemId] = useState(null)
    const [sortBy, setSortBy] = useState('latest')
    const [filterType, setFilterType] = useState('all')

    function onToggleStarred(mailId) {
        mailService.toggleStarred(mailId)
    }

    function handleChangeSortBy(event) {
        setSortBy(event.target.value)
    }

    function handleChangeFilterType(event) {
        setFilterType(event.target.value)
    }

    function getFilteredMails() {

        let sortedMails = [...mails];
        if (sortBy === 'latest') {
            sortedMails.sort((a, b) => b.createdAt - a.createdAt)
        } else {
            sortedMails.sort((a, b) => a.createdAt - b.createdAt)
        }

        if (filterType === 'starred') {
            sortedMails = sortedMails.filter(mail => mail.isStarred)
        }

        return sortedMails
    }

    const filteredMails = getFilteredMails()

    return (
        <section className="mail-list-container">
            <section className="mail-list-nav">
                <select value={sortBy} onChange={handleChangeSortBy}>
                    <option value="latest">Latest First</option>
                    <option value="earliest">Earliest First</option>
                </select>
                <select value={filterType} onChange={handleChangeFilterType}>
                    <option value="all">All</option>
                    <option value="starred">Starred</option>
                </select>
            </section>
            <ul className="mail-list clean-list">
                {filteredMails.map(mail =>
                    <li key={mail.id}
                        onMouseEnter={() => setHoveredItemId(mail.id)}
                        onMouseLeave={() => setHoveredItemId(null)}>
                        <span className='star'
                            onClick={() => onToggleStarred(mail.id)}>
                            {(mail.isStarred) ?
                                <i className="fa-solid fa-star"></i> :
                                <i className="fa-regular fa-star"></i>}
                        </span>
                        <Link to={`/mail/${mail.id}`}>
                            <MailPreview mail={mail} onRemove={onRemove} />
                        </Link>
                        {hoveredItemId === mail.id && (
                            <section className="btns-mail-prev">
                                <button onClick={() => onRemove(mail.id)}><img src="/assets/img/trash.svg" /></button>
                                <button ><img src="/assets/img/archive.svg" /></button>
                            </section>)}
                    </li>
                )}
            </ul>
        </section>
    )
}

