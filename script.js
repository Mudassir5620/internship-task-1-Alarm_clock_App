
// array to store all the alarms
var alarmList=[];

// div in which append all the added alarms
const list=document.getElementById("alarmList");

// to append option value inside the drop down of set alarm 
const selectTag = document.querySelectorAll("select");

// appending values inside the select tag 
// for hours
for(let i=12 ;i > 0;i--){
    i = i < 10? `0${i}`: i;
    let option = `<option value=${i}>${i}</option>`;
    selectTag[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
// for minutes
for(let i=59 ;i >= 0;i--){
    i = i < 10? `0${i}`: i;
    let option = `<option value=${i}>${i}</option>`;
    selectTag[1].firstElementChild.insertAdjacentHTML("afterend",option);
    selectTag[2].firstElementChild.insertAdjacentHTML("afterend",option);
}



// function to display current time in clock
function currentTime(){
    // current time and date
    var time =  new Date();

    // getting hour, minute, second from current time
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    // for am or pm
    var session = "";

    // getting value of am or pm from hours
    if(hours >= 12){
        session ="PM";
    }else{
        session ="AM";
    }

    // converting hours into 12hour format
    if(hours > 12){
        hours -=12;
    }

    // converting single digit values into double digit
    // hours
    if(hours < 10 ){
        hours = `0${hours}`;
    }
    // minutes
    if(minutes < 10 ){
        minutes = `0${minutes}`;
    }
    // seconds
    if(seconds < 10 ){
        seconds = `0${seconds}`;
    }

    // checking whether there is a alarm set for current time in alarm list
    let timeCurrent=`${hours}:${minutes}:${seconds} ${session}`;
    alarmList.map((alarm) => {
        // if there is an alarm then show alert message
        if(alarm.time === timeCurrent){
            window.alert("alarm ring");
        }
    })


    // rendering time inside current time panel
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("session").innerHTML = session;
}

// calling the above function continuously on interval of 1 second
setInterval(currentTime, 1000);


// adding alarm to the display of alarm clock
function addAlarmToDisplay(alarm){
    // creating html element 'li'
	var div=document.createElement('div');
    // inner data of div element
    // with alarm time and a delete button
	div.innerHTML=`
                    <div>
                        <img src="Images/favicon.png" alt="clock" width="20px" height="20px" />
                        ${alarm.time}
                    </div>  

                    <div>
                        <button id="${alarm.id}" class="delete">Delete</button>
                    </div>
	`;

    // the the alarm inside the div
	list.append(div);
	return;

}


// render the Dom to appned new element to the screen 
function renderDom(){
    list.innerHTML='';
    // mapping over each alarm to add it to the screen
    alarmList.map((alarm) => addAlarmToDisplay(alarm));
}


function addAlarm(){
    // hour input from drop down menu
    const hour=document.getElementById("hoursInput").value;
    // minute
    const minute=document.getElementById("minutesInput").value;
    // seconds
    const second=document.getElementById("secondsInput").value;
    // am or pm
    const amPM=document.getElementById("sessionInput").value;

    // whether user entered correct value or not

    // if entered data is incorrect then show error message 
    if(hour === "Hour" || minute === "Minute" || second === "Second"){
        window.alert("Enter Correct values HH:MM:SS !!");
        return;
    }
    // if entered correct value show alert message of new alarm added.
    window.alert(`Alarm set for ${hour} : ${minute} : ${second} ${amPM}`);
    // store alarm time
    let alarmTime = {
        time:`${hour}:${minute}:${second} ${amPM}`,
        id:Date.now().toString()
    };
    // append alarm time in alarm list
    alarmList.push(alarmTime);

    // reset the values to initial
    document.getElementById("hoursInput").value='Hour';
    document.getElementById("minutesInput").value='Minute';
    document.getElementById("secondsInput").value='Second';
    document.getElementById("sessionInput").value='AM';
    return;
}


// remove a alarm from list
function removeAlarm(alarmId){
    // filter the alarm which don't match the id
    const newAlarmList = alarmList.filter((alarm) => alarm.id != alarmId);
    alarmList = newAlarmList;
    return;
}



// button to add a new alarm into the list
document.addEventListener("click",(event)=>{
    event.preventDefault();
    const target=event.target;
    // if click on set alarm button
    if(target.className === "setAlarmBtn"){
        addAlarm();
    }
    // if click on delete button
    else if(target.className === "delete"){
        removeAlarm(target.id);
    }

    // render the dom
    renderDom();
});
