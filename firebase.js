import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

const firebaseConfig = {

    apiKey: "AIzaSyCoC88IZa1F6TjgGsDAyxGk0QoYkq2PIiQ",

    authDomain: "seungwoo-record.firebaseapp.com",

    projectId: "seungwoo-record",

    storageBucket: "seungwoo-record.firebasestorage.app",

    messagingSenderId: "1079513296391",

    appId: "1:1079513296391:web:208b4c9bbb56d727db44a2"

};

const app = initializeApp(firebaseConfig);

export { app };