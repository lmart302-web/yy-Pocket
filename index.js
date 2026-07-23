console.log("index.js 실행");


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



let currentDate = new Date();



const currentMonth =
document.getElementById("currentMonth");


const prevMonth =
document.getElementById("prevMonth");


const nextMonth =
document.getElementById("nextMonth");



const addBtn =
document.getElementById("addBtn");


addBtn.addEventListener("click",()=>{

    location.href="add.html";

});



const income =
document.getElementById("income");


const expense =
document.getElementById("expense");


const balance =
document.getElementById("balance");


const recordList =
document.getElementById("recordList");





function updateMonth(){


    const year =
    currentDate.getFullYear();


    const month =
    currentDate.getMonth()+1;


    currentMonth.textContent =
    `${year}년 ${month}월`;

}



prevMonth.addEventListener("click",()=>{


    currentDate.setMonth(
        currentDate.getMonth()-1
    );


    updateMonth();

    loadRecords();


});




nextMonth.addEventListener("click",()=>{


    currentDate.setMonth(
        currentDate.getMonth()+1
    );


    updateMonth();

    loadRecords();


});





updateMonth();

loadRecords();





async function loadRecords(){


    recordList.innerHTML="";


    let totalIncome = 0;

    let totalExpense = 0;



    const q = query(

        collection(db,"moneyRecords"),

        orderBy("date","desc")

    );



    const snapshot =
    await getDocs(q);



    let count = 0;



    snapshot.forEach(item=>{


        const data =
        item.data();



        const recordDate =
        new Date(data.date);



        if(

            recordDate.getFullYear()
            !== currentDate.getFullYear()

            ||

            recordDate.getMonth()
            !== currentDate.getMonth()

        ){

            return;

        }



        count++;



        if(data.type==="income"){

            totalIncome += data.amount;

        }else{

            totalExpense += data.amount;

        }




        const li =
        document.createElement("li");


        const id =
        item.id;



        const sign =
        data.type==="income"
        ? "+"
        : "-";



        li.innerHTML = `


        <div class="record-info">


            <span class="record-date">

                ${data.date}

            </span>



            <span class="record-category">

                ${data.category}

                ${data.memo 
                ? " · "+data.memo 
                : ""}

            </span>


        </div>



        <div class="record-right">


            <span class="record-money 
            ${data.type==="income"
            ?"income-money"
            :"expense-money"}">


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



        deleteBtn.addEventListener("click",async()=>{


            if(confirm("삭제할까요?")){


                await deleteDoc(

                    doc(
                        db,
                        "moneyRecords",
                        id
                    )

                );


                loadRecords();


            }


        });



    });




    if(count===0){


        recordList.innerHTML =

        `<li class="empty">
            해당 월의 내역이 없습니다.
        </li>`;


    }





    income.textContent =
    totalIncome.toLocaleString()+"원";



    expense.textContent =
    totalExpense.toLocaleString()+"원";



    balance.textContent =
    (
        totalIncome-totalExpense

    ).toLocaleString()+"원";



}