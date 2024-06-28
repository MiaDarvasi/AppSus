const { Route, Routes, Navigate, } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { MailDetails } from "./apps/mail/pages/MailDetails.jsx"
import { MailList } from "./apps/mail/cmps/MailList.jsx"



export function App() {

    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} >
                    <Route path="/mail/inbox" element={<MailList />} index />
                    <Route path="/mail/details/:mailId" element={<MailDetails />} />
                    <Route path="*" element={<Navigate to="/mail/inbox" replace />}/>
                </Route>
                <Route path="/note" element={<NoteIndex />} />
            </Routes>
        </section>
    </Router>
}
