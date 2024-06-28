export function NavBar() {
    return (
        <div className="nav-bar-categories">
            <div className="btn-Notes">
                <img src="assets/img/light-bulb.png" />
                <h3>Notes</h3>
            </div>
            <div className="main-categories">
                <div className="btn-categories">
                    <img src="assets/img/bell.png" />
                    <h3>Eminder</h3>
                </div >
                <div className="btn-categories">
                    <img src="assets/img/pen.png" />
                    <h3>Editing</h3>
                </div>
                <div className="btn-categories">
                    <img src="assets/img/download-file.png" />
                    <h3>Archives</h3>
                </div>
                <div className="btn-categories">
                    <img src="assets/img/trash.svg" />
                    <h3>Trash</h3>
                </div>
            </div>
        </div>

    )
}