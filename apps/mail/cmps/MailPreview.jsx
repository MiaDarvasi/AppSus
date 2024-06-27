


export function MailPreview({ mail }) {

    const { from, body, subject, createdAt } = mail
    const fromUser = from.split('@')[0]
    const dateObj = new Date(createdAt)
    const day = dateObj.getDate()
    const month = dateObj.getMonth() +1
    const year = dateObj.getFullYear() % 100
    const formatDate = `${day}/${month}/${year}`

    return <article className='mail-prev'>
        <section>
            <p className="mail-prev-from">{fromUser}</p>
        </section>
        <section className="mail-prev-content">
            <p className="mail-prev-subject">{subject}</p>
            <p className="mail-prev-body">{body}</p>
        </section>
        <p className="mail-prev-date">{formatDate}</p>
    </article>

}