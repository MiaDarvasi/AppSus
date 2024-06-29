const { useEffect, useState } = React


const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Outlet } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { NavBar } from '../cmps/NavBar.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'



export function MailIndex() {
    const [filterBy, setFilterBy] = useState({ txt: '' })
    const [filterType, setFilterType] = useState('inbox')

    const [mails, setMails] = useState([])
    const [compose, setCompose] = useState(null)
    const [hideMenu, setHideMenu] = useState(false)
    const [mailDetails, setMailDetails] = useState(false)


    useEffect(() => {
        loadMails()
    }, [])


    function loadMails() {
        mailService.query()
            .then(mails => setMails(mails))
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveMail(mailId, event) {
        event.stopPropagation()
        mailService.remove(mailId)
            .then(() => {
                setMails(mails =>
                    mails.filter(mail => mail.id !== mailId)
                )
            })
            .catch(err => {
                console.log('Problems removing mail:', err)
            })
    }


    if (!mails || !mails.length) return <div className="mail-loader"></div>
    return (
        <section className={`mail-main-container ${mailDetails? 'mail-details-display' : ''}`}>
            <MailHeader mails={mails} setMails={setMails} filterBy={filterBy} setFilterBy={setFilterBy} setHideMenu={setHideMenu} />
            <NavBar mails={mails} setMails={setMails} compose={compose} setCompose={setCompose} filterType={filterType} setFilterType={setFilterType} hideMenu={hideMenu}/>
            <Outlet context={{ mails, filterBy, setMails, onRemove: onRemoveMail, compose, setCompose, setMailDetails }} />
        </section>
    )
}

