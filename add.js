console.log("add.js 실행");

import { app } from "./firebase.js";

import {
    getFirestore,
    collection,
    addDoc
}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const db = getFirestore(app);

const date = document.getElementById("date");
const category = document.getElementById("category");
const cancelBtn = document.getElementById("cancelBtn");

const typeRadios =
document.querySelectorAll(
    "input[name='type']"
);

const expenseCategories = [
    "🍚 식비",
    "☕ 카페",
    "🚇 교통",
    "🛒 쇼핑",
    "🎮 취미",
    "🏠 생활",
    "💊 의료",
    "📦 기타"
];

const incomeCategories = [
    "🎁 용돈",
    "💼 월급",    
    "💵 기타"
];

date.value =
new Date().toISOString().split("T")[0];

function loadCategories(type){

    category.innerHTML = "";

    const list =
    type === "expense"
    ? expenseCategories
    : incomeCategories;

    list.forEach(item=>{

        const option =
        document.createElement("option");

        option.value = item;
        option.textContent = item;

        category.appendChild(option);

    });

}

loadCategories("expense");

typeRadios.forEach(radio=>{

    radio.addEventListener("change",()=>{

        loadCategories(radio.value);

    });

});

cancelBtn.addEventListener("click",()=>{

    location.href="index.html";

});

document
.getElementById("recordForm")
.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const type =
    document.querySelector(
        "input[name='type']:checked"
    ).value;

    const amount =
    Number(
        document.getElementById("amount").value
    );

    const memo =
    document.getElementById("memo").value;

    try{

        await addDoc(

            collection(
                db,
                "moneyRecords"
            ),

            {

                date:date.value,

                type,

                category:category.value,

                amount,

                memo

            }

        );

        alert("저장되었습니다.");

        location.href="index.html";

    }

    catch(error){

        console.error(error);

        alert("저장 실패");

    }

});