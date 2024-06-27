import { ComposeMail } from "../pages/ComposeMail.jsx"

const { Link } = ReactRouterDOM
const { useState } = React


export function NavBar() {

    const [compose, setCompose] = useState(null)

    function onShowCompose() {
        setCompose(true)
    }

    function onCloseCompose() {
        setCompose(false)
    }

    return (
        <div className="nav-bar">
            <button className="btn-compose"
                onClick={() => onShowCompose()}>
                <img src="/assets/img/compose.svg" />Compose</button>
            <section className="nav-btns">
                <button><img src="/assets/img/inbox.svg" />Inbox</button>
                <button><img src="/assets/img/star.svg" />Starred</button>
                <button><img src="/assets/img/send.svg" />Sent</button>
                <button><img src="/assets/img/archive.svg" />Archive</button>
            </section>
            {compose && <ComposeMail closeCompose={onCloseCompose} compose={compose}/>}
        </div>
    )
}