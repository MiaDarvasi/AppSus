const { useEffect, useState } = React


const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Outlet } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailDetails } from '../pages/MailDetails.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailNavBar } from '../cmps/MailNavBar.jsx'
import { ComposeMail } from './ComposeMail.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'



export function MailIndex() {
    const [filterBy, setFilterBy] = useState({ txt: '' })
    const [mails, setMails] = useState([])

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

    function onRemoveMail(mailId) {
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


    if (!mails || !mails.length) return <div>Loading...</div>
    return (
        <section className="mail-main-container">
            <MailHeader mails={mails} setMails={setMails} filterBy={filterBy} setFilterBy={setFilterBy} />
            <MailNavBar mails={mails} setMails={setMails} />
            <Outlet context={{ mails, filterBy, setMails, onRemove: onRemoveMail }} />
            {/* <ComposeMail /> */}
        </section>
    )
}

