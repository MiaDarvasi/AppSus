const { useParams, Link } = ReactRouterDOM
const { useEffect, useState } = React

import { mailService } from "../services/mail.service.js"


export function MailDetails() {

    const [mail, setMail] = useState({})
    const { mailId } = useParams()

    useEffect(() => {
        mailService.get(mailId)
            .then(mail => setMail(mail))
    }, [mailId])

    if (!mail) return <div>Loading...</div>

    const { subject, from, body } = mail

    const fromUser = (from) && from.split('@')[0]

    return <div className="mail-details">
        <button ><Link to="/mail/inbox">Back</Link></button>
        <h1>{subject}</h1>
        <h2>{fromUser}<span>{from}</span></h2>
        <p>{body}</p>
    </div>
}