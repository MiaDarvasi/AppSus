const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { TextboxRating } from "../cmps/TextboxRating.jsx"

export function ComposeMail({ closeCompose, compose, mails, setMails }) {

    const [mailToAdd, setMailToAdd] = useState(mailService.getEmptyMail())
    const { mailId } = useParams()

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

        mailService.setIsNotDraft(mailToAdd.id).then(() => {
            mailService.save(mailToAdd)
                .then(() => {
                    closeCompose()
                    console.log(mailToAdd)
                    mailService.query()
                        .then(updatedMails => setMails(updatedMails))
                        .catch(err => console.log('Error fetching updated mails:', err))
                })

        })
            .catch(err => console.log('Error saving mail:', err))
    }

    function onBack() {
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

            <TextboxRating handleChange={handleChange} txt={body} />

        </form>
    </div>
}