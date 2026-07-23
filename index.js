console.log("index.js 실행");

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {

    location.href = "add.html";

});

import { app } from "./firebase.js";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    doc
}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const db = getFirestore(app);

const income = document.getElementById("income");
const expense = document.getElementById("expense");
const balance = document.getElementById("balance");
const recordList = document.getElementById("recordList");

loadRecords();

async function loadRecords(){

    recordList.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    const q = query(
        collection(db, "moneyRecords"),
        orderBy("date", "desc")
    );

    const snapshot = await getDocs(q);

    if(snapshot.empty){

        recordList.innerHTML =
        `<li class="empty">아직 등록된 내역이 없습니다.</li>`;

        return;

    }

    snapshot.forEach(item => {

    const data = item.data();

        if(data.type === "income"){

            totalIncome += data.amount;

        }else{

            totalExpense += data.amount;

        }

        const li = document.createElement("li");
        const id = item.id;

        const sign =
        data.type === "income" ? "+" : "-";

        li.innerHTML = `

    <div class="record-info">

        <span class="record-date">
            ${data.date}
        </span>

        <span class="record-category">
            ${data.category}
            ${data.memo ? " · " + data.memo : ""}
        </span>

    </div>


    <div class="record-right">

        <span class="record-money 
        ${data.type === "income" ? "income-money" : "expense-money"}">

            ${sign}${data.amount.toLocaleString()}원

        </span>


        <button class="delete-btn">
            삭제
        </button>

    </div>

`;

        recordList.appendChild(li);

        const deleteBtn =
li.querySelector(".delete-btn");


deleteBtn.addEventListener("click", async()=>{


    if(confirm("삭제할까요?")){


        await deleteDoc(
            doc(db, "moneyRecords", id)
        );


        loadRecords();

    }


});

    });

    income.textContent =
    totalIncome.toLocaleString() + "원";

    expense.textContent =
    totalExpense.toLocaleString() + "원";

    balance.textContent =
    (totalIncome - totalExpense).toLocaleString() + "원";

}