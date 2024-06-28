const { useState } = React

export function MailHeader({ mails, setMails }) {
    const [filterValue, setFilterValue] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setFilterValue(value);
        filterMails(value);
    };

    const filterMails = (value) => {
        const filteredMails = mails.filter(mail => {
            return (
                mail.subject.toLowerCase().includes(value.toLowerCase()) ||
                mail.from.toLowerCase().includes(value.toLowerCase())
            );
        });
        setMails(filteredMails);
    };

    return (
        <div className="mail-header">
            <section className="mail-header-logo">
                <img src="/assets/img/GmailLogo.png" alt="Gmail Logo" />
                <h1>Gmail</h1>
            </section>
            <section className="mail-header-search">
                <label htmlFor="search">
                    <img src="/assets/img/search.svg" alt="Search Icon" />
                </label>
                <input
                    onChange={handleChange}
                    value={filterValue}
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search"
                />
            </section>
        </div>
    );
}


