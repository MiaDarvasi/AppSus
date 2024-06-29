import { MailPreview } from '../cmps/MailPreview.jsx'
import { getMailsForDisplay, mailService } from '../services/mail.service.js'

const { Link, useOutletContext } = ReactRouterDOM
const { useState } = React

export function MailList() {
    const { mails, setMails, filterBy, onRemove, compose, setCompose } = useOutletContext()
    const [hoveredItemId, setHoveredItemId] = useState(null)
    const [sortBy, setSortBy] = useState('latest')
    const [filterType, setFilterType] = useState('all')

    function onToggleStarred(mailId) {
        mailService.toggleStarred(mailId)
        const updatedMails = mails.map(mail => {
            if (mail.id === mailId) {
                return { ...mail, isStarred: !mail.isStarred }
            }
            return mail
        })
        setMails(updatedMails)
    }

    function onSetArchive(mailId, event) {
        event.stopPropagation()
        mailService.setUnArchive(mailId)
        const updatedMails = mails.map(mail => {
            if (mail.id === mailId) {
                return { ...mail, isArchive: true }
            }
            return mail
        })
        setMails(updatedMails)
    }

    function onSetUnArchive(mailId, event) {
        event.stopPropagation()
        mailService.setUnArchive(mailId)
        const updatedMails = mails.map(mail => {
            if (mail.id === mailId) {
                return { ...mail, isArchive: false }
            }
            return mail
        })
        setMails(updatedMails)
    }


    function onSetUnread(mailId, event) {
        event.stopPropagation()
        mailService.setUnread(mailId)
        const updatedMails = mails.map(mail => {
            if (mail.id === mailId) {
                return { ...mail, isRead: false }
            }
            return mail
        })
        setMails(updatedMails)
    }

    function handleChangeSortBy(event) {
        setSortBy(event.target.value)
    }

    function handleChangeFilterType(event) {
        setFilterType(event.target.value)
    }

    function getFilteredMails() {

        let sortedMails = [...mails]
        if (sortBy === 'latest') {
            sortedMails.sort((a, b) => b.createdAt - a.createdAt)
        } else {
            sortedMails.sort((a, b) => a.createdAt - b.createdAt)
        }

        if (filterType === 'all') {
            sortedMails = sortedMails
        } else if (filterType === 'starred') {
            sortedMails = sortedMails.filter(mail => mail.isStarred)
        } else if (filterType === 'unread') {
            sortedMails = sortedMails.filter(mail => !mail.isRead)
        } else if (filterType === 'read') {
            sortedMails = sortedMails.filter(mail => mail.isRead)
        }

        return sortedMails
    }

    function displayDraft(mail) {
        if (mail.isDraft) setCompose(true)
    }

    const filteredMails = getFilteredMails()

    if (!filteredMails) return <div className="mail-loader"></div>

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
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
            </section>
            <ul className="mail-list clean-list">
                {getMailsForDisplay(filteredMails, filterBy).map(mail =>
                    <li key={mail.id}
                        className={(mail.isRead) ? 'is-read' : ''}
                        onClick={() => displayDraft(mail)}
                        onMouseEnter={() => setHoveredItemId(mail.id)}
                        onMouseLeave={() => setHoveredItemId(null)}>
                        <span className='star'
                            onClick={() => onToggleStarred(mail.id)}>
                            {(mail.isStarred) ?
                                <i className="fa-solid fa-star"></i> :
                                <i className="fa-regular fa-star"></i>}
                        </span>
                        <Link to={`/mail/details/${mail.id}`}>
                            <MailPreview mail={mail} onRemove={onRemove} />
                        </Link>
                        {hoveredItemId === mail.id && (
                            <section className="btns-mail-prev">
                                <button onClick={(event) => { event.stopPropagation(); onRemove(mail.id, event); }} title="Trash"><img src="./assets/img/trash.svg" /></button>
                                {mail.isArchive && (<button onClick={(event) => { event.stopPropagation(); onSetUnArchive(mail.id, event); }} title="Move To Inbox"><img src="./assets/img/move_to_inbox.svg" /></button>)}
                                {!mail.isArchive && (<button onClick={(event) => { event.stopPropagation(); onSetArchive(mail.id, event); }} title="Archive"><img src="./assets/img/archive.svg" /></button>)}
                                {!mail.isArchive && (<button onClick={(event) => { event.stopPropagation(); onSetUnread(mail.id, event); }} title="Set Unread"><img src="./assets/img/unread.svg" /></button>)}
                            </section>)}
                    </li>
                )}
            </ul>
        </section>
    )
}

