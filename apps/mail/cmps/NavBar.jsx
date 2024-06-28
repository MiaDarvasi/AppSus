import { ComposeMail } from "../pages/ComposeMail.jsx"
import { mailService } from "../services/mail.service.js"


const { useState, useEffect } = React


export function NavBar({ mails, setMails }) {

    const [compose, setCompose] = useState(null)
    const [filterType, setFilterType] = useState('inbox')

    useEffect(() => {
        mailService.getFilteredMails(filterType)
            .then(mails => {
                setMails(mails)
            })
            .catch(error => {
                console.error('Error fetching filtered mails:', error)
            })
    }, [filterType])

    function onShowCompose() {
        setCompose(true)
    }

    function onCloseCompose() {
        setCompose(false)
    }

    function onChangeFilterType(filterType) {
        setFilterType(filterType)
    }

    return (
        <div className="nav-bar">
            <button className="btn-compose"
                onClick={() => onShowCompose()}>
                <img src="/assets/img/compose.svg" />Compose</button>
            <section className="nav-btns">
                <button
                    value="inbox"
                    className={`inbox ${(filterType === 'inbox') ? 'active' : ''}`}
                    onClick={() => onChangeFilterType('inbox')}>
                    <img src="/assets/img/inbox.svg" />Inbox
                </button>
                <button
                    value="starred"
                    className={`inbox ${(filterType === 'starred') ? 'active' : ''}`}
                    onClick={() => onChangeFilterType('starred')}>
                    <img src="/assets/img/star.svg" />Starred
                </button>
                <button
                    value="sent"
                    className={`inbox ${(filterType === 'sent') ? 'active' : ''}`}
                    onClick={() => onChangeFilterType('sent')}>
                    <img src="/assets/img/send.svg" />Sent
                </button>
                <button
                    value="archive"
                    className={`inbox ${(filterType === 'inbox') ? 'active' : ''}`}
                    onClick={() => onChangeFilterType('archive')}>
                    <img src="/assets/img/archive.svg" />Archive
                </button>
            </section>
            {compose && <ComposeMail closeCompose={onCloseCompose} compose={compose} mails={mails} setMails={setMails} />}
        </div>
    )
}
