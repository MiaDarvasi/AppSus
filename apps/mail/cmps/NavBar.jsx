import { ComposeMail } from "../pages/ComposeMail.jsx"

const { useState, useEffect } = React


export function NavBar({ mails, setMails }) {

    const [compose, setCompose] = useState(null)
    const [filterType, setFilterType] = useState('all')

    // useEffect(() => {
    //     setMails(mails)
    // }, [filterType])

    function onShowCompose() {
        setCompose(true)
    }

    function onCloseCompose() {
        setCompose(false)
    }

    function onChangeFilterType(filterType) {
        setFilterType(filterType)
        getFilteredMails()

    }

    function getFilteredMails() {

        let sortedMails = [...mails]

        if (filterType === 'all') {
            sortedMails = sortedMails.filter(mail => !mail.isArchive)
        } else if (filterType === 'starred') {
            sortedMails = sortedMails.filter(mail => mail.isStarred)
        } else if (filterType === 'sent') {
            sortedMails = sortedMails.filter(mail => mail.from === 'Momo@appsus.com')
        } else if (filterType === 'archive') {
            sortedMails = sortedMails.filter(mail => mail.isArchive)
        }

        setMails(sortedMails)
    }


    return (
        <div className="nav-bar">
            <button className="btn-compose"
                onClick={() => onShowCompose()}>
                <img src="/assets/img/compose.svg" />Compose</button>
            <section className="nav-btns">
                <button value="inbox" onClick={() => onChangeFilterType('all')}><img src="/assets/img/inbox.svg" />Inbox</button>
                <button value="starred" onClick={() => onChangeFilterType('starred')}><img src="/assets/img/star.svg" />Starred</button>
                <button value="sent" onClick={() => onChangeFilterType('sent')}><img src="/assets/img/send.svg" />Sent</button>
                <button value="archive" onClick={() => onChangeFilterType('archive')}><img src="/assets/img/archive.svg" />Archive</button>
            </section>
            {compose && <ComposeMail closeCompose={onCloseCompose} compose={compose} mails={mails} setMails={setMails} />}
        </div>
    )
}
