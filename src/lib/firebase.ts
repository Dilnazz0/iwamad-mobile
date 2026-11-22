import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDxW1is2Vh_DXaDb3JSG8gXl8vStc6RhDU',
  authDomain: 'iwamad-chat-b40cf.firebaseapp.com',
  databaseURL: 'https://iwamad-chat-b40cf-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'iwamad-chat-b40cf',
  storageBucket: 'iwamad-chat-b40cf.firebasestorage.app',
  messagingSenderId: '36811759209',
  appId: '1:36811759209:web:9109c668de2281f68f4cf8',
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);