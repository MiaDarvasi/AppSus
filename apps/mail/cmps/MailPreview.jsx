export function MailPreview({ mail, onRemove }) {

    const { from, body, subject, sentAt } = mail
    const fromUser = from.split('@')[0]
    const dateObj = new Date(sentAt)
    const day = dateObj.getDate()
    const month = dateObj.getMonth() +1
    const year = dateObj.getFullYear() % 100
    const formatDate = `${day}/${month}/${year}`

    return <article className='mail-prev'>
        <section>
            <span
                className='star'
            >
                <i className="fa-solid fa-star"></i>
            </span>
            <p>{fromUser}</p>
        </section>
        <section>
            <p>{subject}</p>
            <p className="mail-body">{body}</p>
        </section>
        <p className="mail-date">{formatDate}</p>
    </article>

}