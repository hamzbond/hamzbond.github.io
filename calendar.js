function showWatch() {
    
    var date = new Date();
    
    var Hours = date.getHours();
    var Minutes = date.getMinutes();
    var Seconds = date.getSeconds();
    
    var Year = date.getFullYear();
    var Month = date.getMonth();
    var todayDate = date.getDate();
    var Day = date.getDay();
    
    var showTime = document.getElementById("Time");
    var showCalender = document.getElementById("Calender");
    
    var $Minutes = String(Minutes);
    while($Minutes.length <= 1) {
        $Minutes = 0 + $Minutes;
    }
    
    if(Hours > 12) {
        Hours -= 12;
        showTime.innerHTML = 
        Hours + ": " + $Minutes + " pm" + " (" + Seconds + " detik)";
    }else if(Hours == 12) {
        showTime.innerHTML = 
        Hours + ": " + $Minutes + " noon" + " (" + Seconds + " detik)";
    }else {
        showTime.innerHTML = 
        Hours + ": " + $Minutes + " am" + " (" + Seconds + " detik)";
    }
    
    switch(Day) {
        case 0 : showDay = "Sunday";
        break;
        case 1 : showDay = "Monday";
        break;
        case 2 : showDay = "Tuesday";
        break;
        case 3 : showDay = "Wednesday";
        break;
        case 4 : showDay = "Thursday";
        break;
        case 5 : showDay = "Friday";
        break;
        case 6 : showDay = "Saturday";
        break;
    }
    
    showCalender.innerHTML = todayDate + "/ " + (Month+1) + "/ " + Year + " ( " + showDay + " )";
    
}

setInterval(showWatch, 1000);