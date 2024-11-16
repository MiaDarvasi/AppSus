import { NavBar } from './NavBar.jsx'

const { useState } = React
export function HeaderNote() {
    const [isNavOpen, setNavOpen] = useState(false)

    const toggleNav = () => {
        setNavOpen(!isNavOpen)
    }

    return (
        <div>
            <div className="header-note">
                <div className="header-note-img" onClick={toggleNav}>
                    <img src="assets/img/menu.png" />
                </div>
                <div className="header-logo">
                    <img src="assets/img/GKeepLogo.png" />
                    <span>Keep</span>
                </div>
            </div>
            <div className={`nav-bar-wrapper ${isNavOpen ? 'closed' : 'open'}`}>
                {!isNavOpen && <NavBar />}
            </div>
        </div>
    )
}