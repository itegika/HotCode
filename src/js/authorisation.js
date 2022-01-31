import firebase, { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import 'firebase/database';
import { getDatabase, ref, set, onValue, get, child } from 'firebase/database';
import { accessHome } from './switchHome-Library';
import './apiItems.js';
import { Notify } from 'notiflix';

const firebaseConfig = {
  apiKey: 'AIzaSyB9BkppnXfaYDAiVi6RvUMDrBOu1m_umL8',
  authDomain: 'hotcode-76a51.firebaseapp.com',
  projectId: 'hotcode-76a51',
  storageBucket: 'hotcode-76a51.appspot.com',
  messagingSenderId: '719459605405',
  appId: '1:719459605405:web:bab6bcd703170bdc726d74',
  measurementId: 'G-8XB3KBGM25',
  databaseURL: 'https://hotcode-76a51-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

// рефсы--------------------------------------
const signUpBtn = document.querySelector('.signUp');
const logOutBtn = document.querySelector('.logout');
const signUpForm = document.querySelector('#signup-form');
const signUpModal = document.querySelector('#modal-signup');
const logInForm = document.querySelector('#login-form');
const logInBtn = document.querySelector('.login');
const logInModal = document.querySelector('#modal-login');

document.addEventListener('DOMContentLoaded', checkUserStatus);

// ------------дефолтные значения
logOutBtn.classList.add('hidden');

// регистрация------------------------
signUpBtn.addEventListener('click', onSignUpBtnClick);

function onSignUpBtnClick() {
  signUpModal.classList.remove('hidden');
}
// закрытие модалок вне сабмита-------------------------
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    signUpModal.classList.add('hidden');
    logInModal.classList.add('hidden');
  }
});
document.addEventListener('click', function (e) {
  const container = document.querySelector('main');
  if (e.target === container) {
    signUpModal.classList.add('hidden');
    logInModal.classList.add('hidden');
  }
});

signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signUpForm.elements.email.value;
  const password = signUpForm.elements.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const userId = userCredential.user.uid;
      const email = userCredential.user.email;
      const name = userCredential.user.displayName;
      Notify.info('Registration successfull. Pls, log in');
      signUpForm.reset();
      signUpModal.classList.add('hidden');
      saveUserData(userId, name, email);
      // сделать закрытие модалки вместо hidden
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        return Notify.failure('E-mail already in use. Try something else');
      }
    });
});

// Логин--------------------------

logInBtn.addEventListener('click', onLogInBtnClick);
function onLogInBtnClick() {
  logInModal.classList.remove('hidden');
}

logInForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = logInForm.elements.email.value;
  const password = logInForm.elements.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user.uid;
      localStorage.setItem('email', password);
      logOutBtn.classList.remove('hidden');
      Notify.success('Welcome to the HotCode Filmoteka!');
      logInBtn.classList.add('hidden');
      signUpBtn.classList.add('hidden');
      logInModal.classList.add('hidden');
      logInForm.reset();
      getUserData(user);
      // заменить на функцию закрытия
    })
    .catch(error => {
      const errorCode = error.code;
      Notify.failure(`${errorCode}`);
    });
});

// логаут----------------------------------
logOutBtn.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut().then(() => {
    localStorage.removeItem('email');
    logOutBtn.classList.add('hidden');
    logInBtn.classList.remove('hidden');
    signUpBtn.classList.remove('hidden');
    accessHome();
    localStorage.clear();
  });
});

// изменение статуса пользователя-----------------
function checkUserStatus() {
  onAuthStateChanged(auth, user => {
    if (user && localStorage.getItem('email')) {
      const uid = user.uid;

      logOutBtn.classList.remove('hidden');
      logInBtn.classList.add('hidden');
      signUpBtn.classList.add('hidden');
      getUserData(uid);
    } else {
      return;
    }
  });
}

function saveUserData(userId, name, email) {
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
  });
}

function getUserData(user) {
  const userId = auth.currentUser.uid;
  return onValue(
    ref(db, '/users/' + userId),
    snapshot => {
      const data = snapshot.val() && snapshot.val().email;
      console.log(data);
    },
    {
      onlyOnce: true,
    },
  );
}
