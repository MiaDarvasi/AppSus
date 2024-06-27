const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { TextboxRating } from "../cmps/TextboxRating.jsx"


export function ComposeMail() {

    const [mailToAdd, setMailToAdd] = useState(mailService.getEmptyMail())
    const { mailId } = useParams()
    const [compose, setCompose] = useState(true)

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
        mailService.save(mailToAdd)
            .then(() => setCompose(null))
            .catch(err => console.log('err:', err))
    }

    function onBack() {
        setCompose(null)
    }


    const { from, to, subject, body } = mailToAdd

    return compose && <div className="compose-mail">
        <section className="compose-mail-top">
            <button onClick={onBack}><i className="fa-solid fa-arrow-left"></i></button>
            <h1>Compose</h1>
            <button className="btn-img-center" onClick={onSaveMail}><img src="/assets/img/send.svg" /></button>
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