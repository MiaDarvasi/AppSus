import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const MAIL_KEY = 'mails'
const loggedUser = {
    email: 'Momo@appsus.com',
    fullname: 'Momo Apsus'
}

var gFilterBy = {}
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail
}

function query() {
    return storageService.query(MAIL_KEY)
    // .then(mails => {
    //     if (gFilterBy.title) {
    //         const regex = new RegExp(gFilterBy.title, 'i')
    //         mails = mails.filter(mail => regex.test(mail.title))
    //     }
    //     if (gFilterBy.price) {
    //         mails = mails.filter(mail => mail.listPrice.amount >= gFilterBy.price)
    //     }

    //     return mails
    // })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '', body = '', to = '', from = '') {
    return {
        id: '',
        createdAt: Date.now(),
        subject,
        body,
        isRead: true,
        sentAt: Date.now(),
        removedAt: null,
        from,
        to,
    }
}


function _createMails() {
    let mails = _loadFromStorage(MAIL_KEY)

    if (!mails || !mails.length) {
        mails = []

        for (let i = 0; i < 20; i++) {
            const fromIsUser = Math.random() > 0.7
            const toIsUser = !fromIsUser
            const mail = {
                id: utilService.makeId(),
                createdAt: Date.now(),
                subject: _makeSubject(),
                body: utilService.makeLorem(10),
                isRead: false,
                sentAt: Date.now(),
                removedAt: null,
                from: fromIsUser ? 'Momo@appsus.com' : `${_makeName()}@appsus.com`,
                to: toIsUser ? 'Momo@appsus.com' : `${_makeName()}@appsus.com`
            }
            mails.push(mail)
        }
        _saveToStorage(MAIL_KEY, mails)

    }
}

function _makeSubject() {
    const words = ['Sky', 'Above', 'Port', 'Was', 'the Color', 'Tuned', 'to', 'Dead Channel', 'All', 'Happened', 'Less', 'I', 'Had', 'Story', 'Bit', 'People', 'Generally', 'Happens', 'Cases', 'Time', 'It', 'Was', 'Different', 'It', 'Was', 'Pleasure', 'To', 'Burn']
    const word1 = words[Math.floor(Math.random() * words.length)] + ' '
    const word2 = words[Math.floor(Math.random() * words.length)]

    return word1 + word2
}


function _makeName() {
    var names = ['Bobo', 'Mimi', 'Lala', 'Bebe', 'Riri', 'Tutu', 'Coco', 'Popo', 'Zuzu', 'Sasa']
    var name = names[Math.floor(Math.random() * names.length)]
    return name
}

function _saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function _loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}