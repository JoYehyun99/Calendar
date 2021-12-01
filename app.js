
const dayTitle= document.querySelector(".dayOfWeek");
const dateTitle = document.querySelector(".bigDate");
const monthNyear = document.getElementById("monthNyear");

const calendarTable = document.querySelector("#content");

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June", "July", "August","September","October", "November" ,"December"];
const lastDays = [31,28,31,30,31,30,31,31,30,31,30,31];

let tableData = [];

const date = new Date();
let current_year = date.getFullYear();
let current_month = date.getMonth();
let current_date = date.getDate();
let current_day = date.getDay();
let check = null;

function setDatePart(date, day){
    dayTitle.innerHTML = days[day];
    dateTitle.innerHTML = date;
}

function setMonthNYear(year, month){
    monthNyear.innerHTML = `${months[month]} ${year}`;
    current_year = year;
    current_month = month;

}

function isLeapYear(year){
    if((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)){ //leap year
        return 29;
    }
    else{
        return 28;
    }
}

function addDate(input){
    let today= new Date();
    if(input != ""){
        if((today.getDate() === parseInt(input) && today.getMonth() === current_month)){
            tableData.push(`<td id="today" class="day">${input}</td>`);
        }
        else{
            tableData.push(`<td class="day">${input}</td>`);
        }
    }
    else{
        tableData.push(`<td>${input}</td>`);
    }
}

function loadCalendar(arr_data){
    for(let i=0;i<arr_data.length;i++){
        if(i==0){
            tableData.push(`<tr>`);
            addDate(arr_data[i]);
            
        }
        else if(i%7==0){
            tableData.push(`</tr>`);
            tableData.push(`<tr>`);
            addDate(arr_data[i]);
        }
        else{
            addDate(arr_data[i]);
        }
    }
    calendarTable.innerHTML = tableData.join("");
    tableData=[];
}

function setCalendar(year, month){

    setMonthNYear(year,month);

    lastDays[1] = isLeapYear(year);

    let firstDay = (new Date(year,month,1)).getDay();
    let arr = [];
    for(let i=0;i<firstDay;i++){
        arr.push("");
    }
    for(let i=1;i<=lastDays[month];i++){
        arr.push(`${i}`);
    }
    let remainDay = 7 - (arr.length%7);
    if(remainDay!=7){
        for(let i=0;i<remainDay;i++){
            arr.push("");
        }
    }
    loadCalendar(arr);

}

//date change

function changeDate(e){ 
    let date = e.target.textContent;
    let index = e.target.cellIndex;
    if(e.target.classList.contains("day")){
        if(check != null){
            check.classList.remove("checkday");
        }
        e.target.classList.add("checkday");
        check = e.target;
        setDatePart(date,index);
    }
    
}
calendarTable.addEventListener("click",changeDate);


//month change

function changeMonth(e){
    let btn = e.target;
    if(btn.id == "up"){
        if((current_month+1) == 12){
            console.log(current_month);
            current_month = 0;
            setCalendar(current_year+1,current_month);
        }
        else{
            setCalendar(current_year,current_month+1);
        }
    }
    else{ //down
        if((current_month-1)== -1){
            current_month = 11;
            setCalendar(current_year-1,current_month);
        }
        else{
            setCalendar(current_year,current_month-1);
        }
    }
}

const changeBtn = document.querySelectorAll(".changeBtn");

changeBtn.forEach((btn) => {
    btn.addEventListener("click",changeMonth);
});


setDatePart(current_date,current_day);
setCalendar(current_year,current_month);