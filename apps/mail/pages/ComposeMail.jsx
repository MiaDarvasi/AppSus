const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function ComposeMail({ closeCompose, compose, mails, setMails, setFilterType }) {

    const [mailToAdd, setMailToAdd] = useState(mailService.getEmptyMail())
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (mailId) loadMail()
    }, [compose])

    function loadMail() {
        mailService.get(mailId)
            .then(setMailToAdd)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setMailToAdd(mail => ({ ...mail, [field]: value }))
    }

    function onSaveMail(ev) {
        ev.preventDefault()
        if (!mailToAdd.from ||
            !mailToAdd.to ||
            !mailToAdd.subject ||
            !mailToAdd.body) return

        mailService.save(mailToAdd)
            .then(() => {
                closeCompose()
                    mailService.query()
                    .then(updatedMails => {
                        setMails(updatedMails)
                        setFilterType('inbox')
                        navigate("/mail/inbox")
                    })
                    .catch(err => console.log('Error fetching updated mails:', err))
            })
            .catch(err => console.log('Error saving mail:', err))
    }

    function onBack() {
        if (mailToAdd.from && mailToAdd.to ||
            mailToAdd.subject || mailToAdd.body) {
            mailService.setDraft(mailToAdd)
        }
        closeCompose()
    }


    const { from, to, subject, body } = mailToAdd

    return compose && <div className="compose-mail">
        <section className="compose-mail-top">
            <button onClick={onBack} title="back"><img src="./assets/img/arrow_back.svg" /></button>
            <h1>Compose</h1>
            <button className="btn-img-center" onClick={onSaveMail} title="send"><img src="./assets/img/send.svg" /></button>
        </section>
        <form onSubmit={onSaveMail}>

            <label htmlFor="from">From</label>
            <input onChange={handleChange} value={from}
                type="text" name="from" id="from" />

            <label htmlFor="to">To</label>
            <input onChange={handleChange} value={to}
                type="text" name="to" id="to" />

            <label htmlFor="subject">Subject</label>
            <input onChange={handleChange} value={subject}
                type="text" name="subject" id="subject" />

            <textarea
                onChange={handleChange}
                value={body}
                type="text"
                name='body'
                id="body"
                rows='20'
            ></textarea>

        </form>
    </div>
}