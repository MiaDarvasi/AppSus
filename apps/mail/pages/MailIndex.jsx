const { useEffect, useState } = React


const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Outlet } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { NavBar } from '../cmps/NavBar.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'





export function MailIndex() {

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
            <MailHeader />
            <NavBar />
            <Outlet context={{ mails, onRemove: onRemoveMail }} />
            {/* <ComposeMail /> */}
        </section>
    )
}

