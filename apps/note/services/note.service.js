import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

const NOTES_KEY = 'notes';

export const noteService = {
  query,
  get,
  post,
  put,
  remove,
  initializeNotes
};

async function query() {
  return storageService.query(NOTES_KEY);
}

async function get(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

async function post(newNote) {
  return storageService.post(NOTES_KEY, newNote);
}

async function put(updatedNote) {
  return storageService.put(NOTES_KEY, updatedNote);
}

async function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId);
}

export async function initializeNotes() {
  const notes = [
    {
      id: 'n101',
      createdAt: 1112222,
      type: 'NoteTxt',
      isPinned: true,
      style: {
        backgroundColor: '#00d'
      },
      info: {
        txt: 'Fullstack Me Baby!'
      }
    },
    {
      id: 'n102',
      createdAt: 1112223,
      type: 'NoteImg',
      isPinned: false,
      info: {
        url: 'https://cdn.pixabay.com/photo/2017/09/03/00/44/png-2709031_640.png',
        title: 'Bobi and Me'
      },
      style: {
        backgroundColor: '#00d'
      }
    },
    {
      id: 'n103',
      createdAt: 1112224,
      type: 'NoteTodos',
      isPinned: false,
      info: {
        title: 'Get my stuff together',
        todos: [
          { txt: 'Driving license', doneAt: null },
          { txt: 'Coding power', doneAt: 187111111 }
        ]
      }
    },
    {
      id: 'n104',
      createdAt: 1112224,
      type: 'NoteTodos',
      isPinned: false,
      info: {
        title: 'get baba',
        todos: [
          { txt: 'Driving license', doneAt: null },
          { txt: 'Coding power', doneAt: 187111111 }
        ]
      }
    },
    {
      id: 'n10',
      createdAt: 1112222,
      type: 'NoteTxt',
      isPinned: true,
      style: {
        backgroundColor: '#00d'
      },
      info: {
        txt: 'shlomi plis!'
      }
    },
  ];

  // localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  return notes;
}

