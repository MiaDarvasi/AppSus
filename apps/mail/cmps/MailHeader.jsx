const { useState } = React

export function MailHeader({ mails, setMails, filterBy, setFilterBy, setHideMenu }) {
    
    const handleChange = (e) => {
        const { value } = e.target;
        setFilterBy(prev => ({ ...prev, txt: value }))
    }

    const toggleHideMenu = () => {
        setHideMenu(prevHideMenu => !prevHideMenu);
    }

    return (
        <div className="mail-header">
            <section className="mail-header-start">
            <button onClick={toggleHideMenu}><img src="./assets/img/menu_mail.png"/></button>
            <section className="mail-header-logo">
                <img src="./assets/img/GmailLogo.png" alt="Gmail Logo" />
                <h1>Gmail</h1>
            </section>
            </section>
            <section className="mail-header-content">
            <section className="mail-header-search">
                <label htmlFor="search">
                    <img src="./assets/img/search.svg" alt="Search Icon" />
                </label>
                <input
                    onChange={handleChange}
                    value={filterBy.txt}
                    type="text"
                    name="txt"
                    id="search"
                    placeholder="Search"
                />
            </section>
            <div className="mail-header-user">M</div>
            </section>
        </div>
    );
}


