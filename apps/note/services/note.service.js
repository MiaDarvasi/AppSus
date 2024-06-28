import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

const NOTES_KEY = 'notes';

function getDefaultFilter(filterBy = { title: '', type: 'all' }) {
  return {
    title: filterBy.title || '',
    type: filterBy.type || 'all',
  };
}

export const noteService = {
  query,
  get,
  post,
  put,
  remove,
  initializeNotes,
  getDefaultFilter,
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
        backgroundColor: ''
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
        backgroundColor: ''
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
          { txt: 'Coding power', doneAt: 187111111 },
          { txt: 'To make a cake', doneAt: 187111111 }

        ]
      }
    },

    {
      id: 'n105',
      createdAt: 1112222,
      type: 'NoteVideo',
      isPinned: true,
      style: {
        backgroundColor: ''
      },
      info: {
        videoUrl: 'https://res.cloudinary.com/demo/image/upload/kitten_fighting.mp4',
        autoplay: true,
        loop: true
      },
    },
    {
      id: 'n106',
      createdAt: 1112225,
      type: 'NoteAudio',
      isPinned: false,
      info: {
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
      style: {
        backgroundColor: ''
      }
    },
    {
      id: 'n107',
      createdAt: 1112226,
      type: 'NoteCanvas',
      isPinned: false,
      info: {
        title: 'Canvas Note',
        canvasData: null
      },
      style: {
        backgroundColor: ''
      }
    }, {
      id: 'n108',
      createdAt: 1112226,
      type: 'NoteMap',
      isPinned: false,
      info: {
        title: 'Sample Map',
        location: 'New York, NY'
      },
      style: {
        backgroundColor: ''
      }
    }

  ];

  // localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  return notes;
}

