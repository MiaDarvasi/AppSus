import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const MAIL_KEY = 'mails'
const loggedUser = {
    email: 'Momo@appsus.com',
    fullname: 'Momo Apsus'
}

_createMails()
export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    toggleStarred,
    setArchive,
    setUnread,
    setRead,
    getFilteredMails,
}

function query() {
    return storageService.query(MAIL_KEY)
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

export function getFilteredMails(filterType = 'inbox') {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            let filteredMails

            if (filterType === 'inbox') {
                filteredMails = mails.filter(mail => !mail.isArchive)
            } else if (filterType === 'starred') {
                filteredMails = mails.filter(mail => mail.isStarred)
            } else if (filterType === 'sent') {
                filteredMails = mails.filter(mail => mail.from === 'Momo@appsus.com')
            } else if (filterType === 'archive') {
                filteredMails = mails.filter(mail => mail.isArchive)
            } else {
                filteredMails = mails
            }

            return filteredMails
        })
        .catch(error => {
            console.error('Error querying mails:', error);
            throw error
        })
}

export const getMailsForDisplay = (mails, { txt }) => {
    const filteredMails = mails.filter(mail => {
        return (
            mail.subject.toLowerCase().includes(txt.toLowerCase()) ||
            mail.from.toLowerCase().includes(txt.toLowerCase())
        );
    });
    return filteredMails
};


function getEmptyMail(subject = '', body = '', to = '', from = '') {
    return {
        id: '',
        createdAt: (Date.now()),
        subject,
        body,
        isRead: true,
        sentAt: Date.now(),
        removedAt: null,
        from,
        to,
        isStarred: false,
        isArchive: false,
    }
}

function getDefaultFilter(filterBy = { from: '' }) {
    return { from: filterBy.from }
}

function toggleStarred(mailId) {
    storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            mail.isStarred = !mail.isStarred
            return storageService.put(MAIL_KEY, mail)
        });

}

function setArchive(mailId) {
    storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            mail.isArchive = true
            return storageService.put(MAIL_KEY, mail);
        });
}

function setUnread(mailId) {
    storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            mail.isRead = false
            return storageService.put(MAIL_KEY, mail);
        });
}

function setRead(mailId) {
    storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            mail.isRead = true
            return storageService.put(MAIL_KEY, mail);
        });
}


function _createMails() {
    let mails = _loadFromStorage(MAIL_KEY)

    if (!mails || !mails.length) {
        mails = []

        for (let i = 0; i < 40; i++) {
            const fromIsUser = Math.random() > 0.7
            const toIsUser = !fromIsUser
            const mail = {
                id: utilService.makeId(),
                createdAt: _getRandomDate(),
                subject: _makeSubject(),
                body: utilService.makeLorem(50),
                sentAt: Date.now(),
                removedAt: null,
                from: fromIsUser ? 'Momo@appsus.com' : `${_makeName()}@appsus.com`,
                to: toIsUser ? 'Momo@appsus.com' : `${_makeName()}@appsus.com`,
                isStarred: Math.random() > 0.7,
                isRead: Math.random() < 0.7,
                isArchive: false,
            }
            mails.push(mail)
        }
        _saveToStorage(MAIL_KEY, mails)

    }
}

function _getRandomDate() {
    const minDate = Date.now() - 604800000 * 2
    const maxDate = Date.now()
    return utilService.getRandomIntInclusive(minDate, maxDate)
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