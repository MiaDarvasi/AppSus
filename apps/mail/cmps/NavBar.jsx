import { ComposeMail } from "../pages/ComposeMail.jsx"
import { mailService } from "../services/mail.service.js"


const { useState, useEffect } = React


export function NavBar({ mails, setMails, compose, setCompose, filterType, setFilterType, hideMenu }) {

    // const [filterType, setFilterType] = useState('inbox')

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
            <button className={`btn-compose ${hideMenu? '' : 'show'}`}
                onClick={() => onShowCompose()}>
                <img src="./assets/img/compose.svg" /></button>
            <section className="nav-btns">
                <button
                    value="inbox"
                    className={`${(filterType === 'inbox') ? 'selected' : ''} ${hideMenu? '' : 'show'}`}
                    onClick={() => onChangeFilterType('inbox')}>
                    <img src="./assets/img/inbox.svg" />
                </button>
                <button
                    value="starred"
                    className={`${(filterType === 'starred') ? 'selected' : ''} ${hideMenu? '' : 'show'}`}
                    onClick={() => onChangeFilterType('starred')}>
                    <img src="./assets/img/star.svg" />
                </button>
                <button
                    value="sent"
                    className={`${(filterType === 'sent') ? 'selected' : ''} ${hideMenu? '' : 'show'}`}
                    onClick={() => onChangeFilterType('sent')}>
                    <img src="./assets/img/send.svg" />
                </button>
                <button
                    value="draft"
                    className={`${(filterType === 'draft') ? 'selected' : ''} ${hideMenu? '' : 'show'}`}
                    onClick={() => onChangeFilterType('draft')}>
                    <img src="./assets/img/drafts.svg" />
                </button>
                <button
                    value="archive"
                    className={`${(filterType === 'archive') ? 'selected' : ''} ${hideMenu? '' : 'show'}`}
                    onClick={() => onChangeFilterType('archive')}>
                    <img src="./assets/img/archive.svg" />
                </button>
            </section>
            {compose && <ComposeMail closeCompose={onCloseCompose} compose={compose} mails={mails} setMails={setMails} setFilterType={setFilterType}/>}
        </div>
    )
}
