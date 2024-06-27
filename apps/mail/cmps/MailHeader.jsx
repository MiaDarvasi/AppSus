export function MailHeader() {


    return (
        <div className="mail-header" >
            <section className="mail-header-logo">
                <img src="/assets/img/GmailLogo.png" />
                <h1>Gmail</h1>
            </section>
            <section className="mail-header-search">
                <label htmlFor="from"><img src="/assets/img/search.svg" /></label>
                {/* <input onChange={handleChange} value={from}
                type="text" name="from" id="from" /> */}
                <input
                    type="text" name="from" id="from" />
            </section>
        </div>
    )
}