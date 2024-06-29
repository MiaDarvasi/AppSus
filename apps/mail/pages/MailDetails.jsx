const { useParams, Link, useOutletContext } = ReactRouterDOM
const { useEffect, useState } = React

import { mailService } from "../services/mail.service.js"


export function MailDetails() {

    const { mails, setMails, onRemove, setMailDetails } = useOutletContext()

    const [mail, setMail] = useState({})
    const { mailId } = useParams()

    setMailDetails(true)

    useEffect(() => {
        mailService.get(mailId)
            .then(mail => {
                setMail(mail)
                onSetRead(mail.id)
            })
    }, [mailId])

    function onSetRead(mailId) {
        mailService.setRead(mailId)
        const updatedMails = mails.map(mail => {
            if (mail.id === mailId) {
                return { ...mail, isRead: true }
            }
            return mail
        })
        setMails(updatedMails)
        setMailDetails(false)
    }

    function onSetArchive(mailId) {
        mailService.setArchive(mailId)
        const updatedMails = mails.map(mail => {
            if (mail.id === mailId) {
                return { ...mail, isArchive: true }
            }
            return mail
        })
        setMails(updatedMails)
        setMailDetails(false)
    }

    if (!mail) return <div>Loading...</div>

    const { subject, from, body } = mail

    const fromUser = (from) && from.split('@')[0]

    return <div className="mail-details">
        <section className="mail-details-btns">
            <Link to="/mail/inbox">
                <button onClick={() => onSetRead(mailId)} title="Back">
                    <img src="./assets/img/arrow_back.svg" /></button>
            </Link>
            <section className="mail-details-btns-edit">
                <Link to="/mail/inbox">
                    <button onClick={() => onSetArchive(mailId)} title="Archive">
                        <img src="./assets/img/archive.svg" /></button>
                </Link>
                <Link to="/mail/inbox">
                    <button onClick={() => onRemove(mailId)} title="Trash">
                        <img src="./assets/img/trash.svg" /></button>
                </Link>
            </section>

        </section>
        <h1>{subject}</h1>
        <h2>{fromUser}<span>{from}</span></h2>
        <p>{body}</p>
    </div>
}