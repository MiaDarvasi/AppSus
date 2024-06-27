import { MailPreview } from '../cmps/MailPreview.jsx'
import { MailDetails } from '../pages/MailDetails.jsx'

const { Link, useOutletContext } = ReactRouterDOM
const { useState } = React


export function MailList() {
    const { mails, onRemove } = useOutletContext()
    const [hoveredItemId, setHoveredItemId] = useState(null)

    return (
        <section className="mail-list-container">
            <section className="mail-list-nav">
                <select>
                    <option>Latest First</option>
                    <option>Earliest First</option>
                </select>
                <select>
                    <option>All</option>
                    <option>Starred</option>
                </select>

            </section>
            <ul className="mail-list clean-list">
                {mails.map(mail =>
                    <li key={mail.id}
                        onMouseEnter={() => setHoveredItemId(mail.id)}
                        onMouseLeave={() => setHoveredItemId(null)}>
                        <Link to={`/mail/${mail.id}`}>
                            <MailPreview mail={mail} onRemove={onRemove} />
                        </Link>
                        {hoveredItemId === mail.id && (
                            <section className="btns-mail-prev">
                                <button onClick={() => onRemove(mail.id)}>x</button>
                            </section>)}
                    </li>
                )}
            </ul>
        </section>
    )

}
