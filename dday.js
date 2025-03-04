document.addEventListener("DOMContentLoaded", function() {
    buildCalendar();

    buildResCalendar();
    
    displayStartDay();

    degreeCal();

    document.getElementById("btnPrevCalendar").addEventListener("click", function(event) {
        prevCalendar();
    });
    
    document.getElementById("nextNextCalendar").addEventListener("click", function(event) {
        nextCalendar();
    });

    document.getElementById("btnPrevResCalendar").addEventListener("click", function(event) {
        prevResCalendar();
        
        var turnOns = document.getElementsByClassName("turnOn");
    
        for (var i = 0; i < turnOns.length; i++) {
            (function(index) {
                turnOns[index].addEventListener("click", function(event) {
                    insertChoiceDay(index);
                    dDaycal()
                });
            })(i);
        }
    });
    
    document.getElementById("nextNextResCalendar").addEventListener("click", function(event) {
        nextResCalendar();

        var turnOns = document.getElementsByClassName("turnOn");
    
        for (var i = 0; i < turnOns.length; i++) {
            (function(index) {
                turnOns[index].addEventListener("click", function(event) {
                    insertChoiceDay(index);
                    dDaycal()
                });
            })(i);
        }
    }); 

    var turnOns = document.getElementsByClassName("turnOn");
    
    for (var i = 0; i < turnOns.length; i++) {
        (function(index) {
            turnOns[index].addEventListener("click", function(event) {
                insertChoiceDay(index);
                dDaycal()
            });
        })(i);
    }

    var endDayInput = document.getElementById("endDay");

    endDayInput.addEventListener("keydown", function(event) {

        if (event.keyCode === 13){
            var inputValue = document.getElementById("endDay").value;

            /*
                endDay를 설정합니다. 
                년도는 20+XX년으로 바꿔줍니다
            */
            var endDayYear = "20" + inputValue.substring(0, 2);

            /*
            월에서 한자리수 달 0없앰
            일에서 한자리수 일 0없앰 
            그리고 달은 12보다크면 오류 일은 31보다 크면 오류를 출력
            */

            if(Number(inputValue.substring(2, 4)) < 13 && Number(inputValue.substring(2, 4)) > 0 && Number(inputValue.substring(4, 6)) < 32 && Number(inputValue.substring(4, 6)) > 0) {
                if(inputValue.substring(2, 3) == "0"){
                    var endDayMonth = Number(inputValue.substring(3, 4))-1;
                }
                else {
                    var endDayMonth = Number(inputValue.substring(2, 4))-1;
                }

                if(inputValue.substring(4, 5) == "0"){
                    var endDayDay = inputValue.substring(5, 6);
                }
                else {
                    var endDayDay = inputValue.substring(4, 6);
                }

                var startDayYear = "20" + startDay.substring(0, 2);
                var startDaymonth = Number(startDay.substring(2, 4))-1;
                var startDayDay = startDay.substring(4, 6);

                var targetStartDay = new Date(startDayYear, startDaymonth, startDayDay);
                var targetEndDay = new Date(endDayYear, endDayMonth, endDayDay);
        
                var diff = targetEndDay-targetStartDay;
        
                dDay = Math.ceil(diff / 86400000);

                endDayYear=endDayYear-2000;
                endDayMonth=endDayMonth+1;
                

        
                var outputValue=`${endDayYear}년 ${endDayMonth}월 ${endDayDay}일`
        
                document.getElementById("endDay").value = outputValue;
        
                document.getElementById("calDday").value = dDay;
            }
            else {
                document.getElementById("endDay").value = "날짜를 다시 입력";
        
                document.getElementById("calDday").value = "날짜를 다시 입력";
            }
        }
    });
});



var toDay = new Date(); // @param 전역 변수, 오늘 날짜 / 내 컴퓨터 로컬을 기준으로 toDay에 Date 객체를 넣어줌
var nowDate = new Date();  // @param 전역 변수, 실제 오늘날짜 고정값

var toResDay = new Date(); // @param 전역 변수, 오늘 날짜 / 내 컴퓨터 로컬을 기준으로 toResDay에 Date 객체를 넣어줌
var toResDay = new Date(toResDay.getFullYear(), toResDay.getMonth() + 3, toResDay.getDate()); // 3개월 후
var nowResDate = new Date();  // @param 전역 변수, 실제 오늘날짜 고정값
var nowResDay = new Date(toResDay.getFullYear(), toResDay.getMonth() + 3, toResDay.getDate()); // 3개월 후

var startDay;
var endDay;
var dDay;


/**
* @brief   이전달 버튼 클릭시
*/
function prevCalendar() {
    this.toDay = new Date(toDay.getFullYear(), toDay.getMonth() - 1, toDay.getDate());
    buildCalendar();    // @param 전월 캘린더 출력 요청
}

function prevResCalendar() {
    this.toResDay = new Date(toResDay.getFullYear(), toResDay.getMonth() - 1, toResDay.getDate());
    buildResCalendar();    // @param 전월 캘린더 출력 요청
}

/**
* @brief   다음달 버튼 클릭시
*/
function nextCalendar() {
    this.toDay = new Date(toDay.getFullYear(), toDay.getMonth() + 1, toDay.getDate());
    buildCalendar();    // @param 명월 캘린더 출력 요청
}
function nextResCalendar() {
    this.toResDay = new Date(toResDay.getFullYear(), toResDay.getMonth() + 1, toResDay.getDate());
    buildResCalendar();    // @param 명월 캘린더 출력 요청
}

/**
* @brief   캘린더 오픈
* @details 날짜 값을 받아 캘린더 폼을 생성하고, 날짜값을 채워넣는다.
*/
function buildCalendar() {


    let doResMonth = new Date(toDay.getFullYear(), toDay.getMonth(), 1);
    let lastResDate = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0);

    let tbCalendar = document.querySelector(".scriptCalendar > tbody");

    document.getElementById("calYear").innerText = toDay.getFullYear();                       // @param YYYY월
    document.getElementById("calMonth").innerText = autoLeftPad((toDay.getMonth() + 1), 2);   // @param MM월
    

    // @details 이전 캘린더의 출력결과가 남아있다면, 이전 캘린더를 삭제한다.
    while(tbCalendar.rows.length > 0) {
        tbCalendar.deleteRow(tbCalendar.rows.length - 1);
    }

    // @param 첫번째 개행
    let row = tbCalendar.insertRow();

    // @param 날짜가 표기될 열의 증가값
    let dom = 1;

    // @details 시작일의 요일값( doResMonth.getDay() ) + 해당월의 전체일( lastResDate.getDate())을  더해준 값에서
    //               7로 나눈값을 올림( Math.ceil() )하고 다시 시작일의 요일값( doResMonth.getDay() )을 빼준다.
    let daysLength = (Math.ceil((doResMonth.getDay() + lastResDate.getDate()) / 7) * 7) - doResMonth.getDay();

    // @param 달력 출력
    // @details 시작값은 1일을 직접 지정하고 요일값( doResMonth.getDay() )를 빼서 마이너스( - )로 for문을 시작한다.
    for(let day = 1 - doResMonth.getDay(); daysLength >= day; day++) {

        let column = row.insertCell();

        // @param 평일( 전월일과 익월일의 데이터 제외 )
        if(Math.sign(day) == 1 && lastResDate.getDate() >= day) {

            // @param 평일 날짜 데이터 삽입
            column.innerText = autoLeftPad(day, 2);

            // @param 일요일인 경우
            if(dom % 7 == 1) {
                column.style.color = "#FF4D4D";
            }

            // @param 토요일인 경우
            if(dom % 7 == 0) {
                column.style.color = "#4D4DFF";
                row = tbCalendar.insertRow();   // @param 토요일이 지나면 다시 가로 행을 한줄 추가한다.
            }

        }

        // @param 평일 전월일과 익월일의 데이터 날짜변경
        else {
            let exceptDay = new Date(doResMonth.getFullYear(), doResMonth.getMonth(), day);
            column.innerText = autoLeftPad(exceptDay.getDate(), 2);
            column.style.color = "#A9A9A9";
        }

        // @brief   전월, 명월 음영처리
        // @details 현재년과 선택 년도가 같은경우
        if(toDay.getFullYear() == nowDate.getFullYear()) {

            // @details 현재월과 선택월이 같은경우
            if(toDay.getMonth() == nowDate.getMonth()) {

                // @details 현재일보다 이전인 경우이면서 현재월에 포함되는 일인경우
                if(nowDate.getDate() > day && Math.sign(day) == 1) {
                    column.style.backgroundColor = "#E5E5E5";
                }

                // @details 현재일보다 이후이면서 현재월에 포함되는 일인경우
                else if(nowDate.getDate() < day && lastResDate.getDate() >= day) {
                    column.style.backgroundColor = "#FFFFFF";
                    column.style.cursor = "pointer";
                    column.onclick = function(){ calendarChoiceDay(this); }
                }

                // @details 현재일인 경우
                else if(nowDate.getDate() == day) {
                    column.style.backgroundColor = "#e0882f";
                    column.style.cursor = "pointer";
                    column.onclick = function(){ calendarChoiceDay(this); }
                }

            // @details 현재월보다 이전인경우
            } else if(toDay.getMonth() < nowDate.getMonth()) {
                if(Math.sign(day) == 1 && day <= lastResDate.getDate()) {
                    column.style.backgroundColor = "#E5E5E5";
                }
            }

            // @details 현재월보다 이후인경우
            else {
                if(Math.sign(day) == 1 && day <= lastResDate.getDate()) {
                    column.style.backgroundColor = "#FFFFFF";
                    column.style.cursor = "pointer";
                    column.onclick = function(){ calendarChoiceDay(this); }
                }
            }
        }

        // @details 선택한년도가 현재년도보다 작은경우
        else if(toDay.getFullYear() < nowDate.getFullYear()) {
            if(Math.sign(day) == 1 && day <= lastResDate.getDate()) {
                column.style.backgroundColor = "#E5E5E5";
            }
        }

        // @details 선택한년도가 현재년도보다 큰경우
        else {
            if(Math.sign(day) == 1 && day <= lastResDate.getDate()) {
                column.style.backgroundColor = "#FFFFFF";
                column.style.cursor = "pointer";
                column.onclick = function(){ calendarChoiceDay(this); }
            }
        }
        dom++;
    }
}

function buildResCalendar() {

    let doResMonth = new Date(toResDay.getFullYear(), toResDay.getMonth(), 1);
    let lastResDate = new Date(toResDay.getFullYear(), toResDay.getMonth() + 1, 0);

    let tbResCalendar = document.querySelector(".scriptResCalendar > tbody");

    document.getElementById("resCalYear").innerText = toResDay.getFullYear();                       // @param YYYY월
    document.getElementById("resCalMonth").innerText = autoLeftPad((toResDay.getMonth() + 1), 2);   // @param MM월
    

    // @details 이전 캘린더의 출력결과가 남아있다면, 이전 캘린더를 삭제한다.
    while(tbResCalendar.rows.length > 0) {
        tbResCalendar.deleteRow(tbResCalendar.rows.length - 1);
    }

    // @param 첫번째 개행
    let row = tbResCalendar.insertRow();

    // @param 날짜가 표기될 열의 증가값
    let dom = 1;

    // @details 시작일의 요일값( doResMonth.getDay() ) + 해당월의 전체일( lastResDate.getDate())을  더해준 값에서
    //               7로 나눈값을 올림( Math.ceil() )하고 다시 시작일의 요일값( doResMonth.getDay() )을 빼준다.
    let daysLength = (Math.ceil((doResMonth.getDay() + lastResDate.getDate()) / 7) * 7) - doResMonth.getDay();

    // @param 달력 출력
    // @details 시작값은 1일을 직접 지정하고 요일값( doResMonth.getDay() )를 빼서 마이너스( - )로 for문을 시작한다.
    for(let day = 1 - doResMonth.getDay(); daysLength >= day; day++) {

        
        let column = row.insertCell();

        column.classList.add("notYetChoiceDay");
        // @param 평일( 전월일과 익월일의 데이터 제외 )
        if(Math.sign(day) == 1 && lastResDate.getDate() >= day) {

            // @param 평일 날짜 데이터 삽입
            column.innerText = autoLeftPad(day, 2);

            // @param 일요일인 경우
            if(dom % 7 == 1) {
                column.style.color = "#FF4D4D";
            }

            // @param 토요일인 경우
            if(dom % 7 == 0) {
                column.style.color = "#4D4DFF";
                row = tbResCalendar.insertRow();   // @param 토요일이 지나면 다시 가로 행을 한줄 추가한다.
            }
        }

        // @param 평일 전월일과 익월일의 데이터 날짜변경
        else {
            let exceptDay = new Date(doResMonth.getFullYear(), doResMonth.getMonth(), day);
            column.innerText = autoLeftPad(exceptDay.getDate(), 2);
            column.style.color = "#A9A9A9";
            column.classList.add("turnOff")
        }

        // @brief   전월, 명월 음영처리
        // @details 현재년과 선택 년도가 같은경우
        if(toResDay.getFullYear() == nowResDate.getFullYear()) {

            // @details 현재월과 선택월이 같은경우
            if(toResDay.getMonth() == nowResDate.getMonth()) {

                // @details 현재일보다 이전인 경우이면서 현재월에 포함되는 일인경우
                if(nowResDate.getDate() > day && Math.sign(day) == 1) {
                    column.style.backgroundColor = "#E5E5E5";
                }

                // @details 현재일보다 이후이면서 현재월에 포함되는 일인경우
                else if(nowResDate.getDate() < day && lastResDate.getDate() >= day) {
                    column.style.backgroundColor = "#FFFFFF";
                    column.style.cursor = "pointer";
                    column.classList.add("turnOn");
                    column.onclick = function(){ resCalendarChoiceDay(this); }
                }

                // @details 현재일인 경우
                else if(nowResDate.getDate() == day) {
                    column.style.backgroundColor = "#e0882f";
                    column.style.cursor = "pointer";
                    column.onclick = function(){ resCalendarChoiceDay(this); }
                }

            // @details 현재월보다 이전인경우
            } else if(toResDay.getMonth() < nowResDate.getMonth()) {
                if(Math.sign(day) == 1 && day <= lastResDate.getDate()) {
                    column.style.backgroundColor = "#E5E5E5";
                }
            }

            // @details 현재월보다 이후인경우
            else {
                if(Math.sign(day) == 1 && day <= lastResDate.getDate()) {
                    column.style.backgroundColor = "#FFFFFF";
                    column.style.cursor = "pointer";
                    column.classList.add("turnOn");
                    column.onclick = function(){ resCalendarChoiceDay(this); }
                }
            }
        }

        // @details 선택한년도가 현재년도보다 작은경우
        else if(toResDay.getFullYear() < nowResDate.getFullYear()) {
            if(Math.sign(day) == 1 && day <= lastResDate.getDate()) {
                column.style.backgroundColor = "#E5E5E5";
            }
        }

        // @details 선택한년도가 현재년도보다 큰경우
        else {
            if(Math.sign(day) == 1 && day <= lastResDate.getDate()) {
                column.style.backgroundColor = "#FFFFFF";
                column.style.cursor = "pointer";
                column.classList.add("turnOn");
                column.onclick = function(){ resCalendarChoiceDay(this); }
            }
        }
        dom++;
    }
}

/**
* @brief   날짜 선택
* @details 사용자가 선택한 날짜에 체크표시를 남긴다.
*/
function calendarChoiceDay(column) {

    // @param 기존 선택일이 존재하는 경우 기존 선택일의 표시형식을 초기화 한다.
    if(document.getElementsByClassName("choiceDay")[0]) {
        
        // @see 금일인 경우
        if(document.getElementById("calMonth").innerText == autoLeftPad((nowDate.getMonth() + 1), 2) && document.getElementsByClassName("choiceDay")[0].innerText == autoLeftPad(toDay.getDate(), 2)) {
            document.getElementsByClassName("choiceDay")[0].style.backgroundColor = "#FFFFE6";  
        }
        
        // @see 금일이 아닌 경우
        else {
            document.getElementsByClassName("choiceDay")[0].style.backgroundColor = "#FFFFFF";
        }
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");
    }

    // @param 선택일 체크 표시
    column.style.backgroundColor = "#FF9999";

    // @param 선택일 클래스명 변경
    column.classList.add("choiceDay");
}

function resCalendarChoiceDay(column) {

    // @param 기존 선택일이 존재하는 경우 기존 선택일의 표시형식을 초기화 한다.
    if(document.getElementsByClassName("choiceDay")[0]) {
        
        // @see 금일인 경우
        if(document.getElementById("resCalMonth").innerText == autoLeftPad((nowResDate.getMonth() + 1), 2) && document.getElementsByClassName("choiceDay")[0].innerText == autoLeftPad(toResDay.getDate(), 2)) {
            document.getElementsByClassName("choiceDay")[0].style.backgroundColor = "#FFFFE6";  
        }
        
        // @see 금일이 아닌 경우
        else {
            document.getElementsByClassName("choiceDay")[0].style.backgroundColor = "#FFFFFF";
        }
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");
    }

    // @param 선택일 체크 표시
    column.style.backgroundColor = "#FF9999";

    // @param 선택일 클래스명 변경
    column.classList.add("choiceDay");

}

/**
* @brief   숫자 두자릿수( 00 ) 변경
* @details 자릿수가 한자리인 ( 1, 2, 3등 )의 값을 10, 11, 12등과 같은 두자리수 형식으로 맞추기위해 0을 붙인다.
* @param   num     앞에 0을 붙일 숫자 값
* @param   digit   글자의 자릿수를 지정 ( 2자릿수인 경우 00, 3자릿수인 경우 
    000 … )
*/
function autoLeftPad(num, digit) {
    if(String(num).length < digit) {
        num = new Array(digit - String(num).length + 1).join("0") + num;
    }
    return num;
}

/*
오늘 날짜를 업데이트하여 디데이 계산기에 출력
*/
function displayStartDay() {
    var nowDay = new Date();
    var year = nowDay.getFullYear().toString().slice(-2);
    var month = (nowDay.getMonth() + 1).toString().padStart(2, '0');
    var day = nowDay.getDate().toString().padStart(2, '0');
    var formattedDate = `${year}년 ${month}월 ${day}일`;
    document.getElementById("startDay").value = formattedDate;
    startDay=`${year}${month}${day}`;
}

/*
예약달력에서 선택한 날짜를 디데이 계산기에 출력
근데 day를 인덱스로 받기때문에 해당 월에서 좀 문제가 있으니고쳐야됨
*/
function insertChoiceDay(k) {
    /*
        오늘 일을 받아서 인덱스에 더해서 해결 
    */
    var todayDate=new Date();
    var todayDay=todayDate.getDate(); //오늘 날짜(일) 저장
    var todaymonth=todayDate.getMonth()+1; //오늘 날짜(달) 저장
    var todayYear=todayDate.getFullYear(); //오늘 날짜(년) 저장

    if(toResDay.getFullYear()==todayDate.getFullYear() && (toResDay.getMonth() + 1) == (todayDate.getMonth()+1)) {
        var year = toResDay.getFullYear().toString().slice(-2);
        var month = autoLeftPad((toResDay.getMonth() + 1), 2);
        var day =k+1 + todayDay;

        var settingDate = `${year}년 ${month}월 ${day}일`;
        document.getElementById("endDay").value = settingDate;
        endDay=`${year}${month}${day}`;
    }
    else{
        var year = toResDay.getFullYear().toString().slice(-2);
        var month = autoLeftPad((toResDay.getMonth() + 1), 2);
        var day =k+1;

        var settingDate = `${year}년 ${month}월 ${day}일`;
        document.getElementById("endDay").value = settingDate;
        endDay=`${year}${month}${day}`;
    }
}

/*
종료일에 YYMMDD를 입력하면 디데이가 계산되도록하는 함수
function insertEndDay(event) {
    if (event.keyCode === 13) { // 엔터 키의 keyCode는 13입니다.
        var inputValue = document.getElementById("endDay").value;

        var endDayYear = "20" + inputValue.substring(0, 2);
        var endDayMonth = Number(inputValue.substring(2, 4))-1;
        var endDayDay = inputValue.substring(4, 6);

        var startDayYear = "20" + startDay.substring(0, 2);
        var startDaymonth = Number(startDay.substring(2, 4))-1;
        var startDayDay = startDay.substring(4, 6);

        var targetStartDay = new Date(startDayYear, startDaymonth, startDayDay);
        var targetEndDay = new Date(endDayYear, endDayMonth, endDayDay);

        var diff = targetEndDay-targetStartDay;

        dDay = Math.ceil(diff / 86400000) + 1;

        var outputValue=`${endDayYear}년 ${endDayMonth}월 ${endDayDay}일`

        document.getElementById("endDay").value = dDay;

        document.getElementById("calDday").value = dDay;
    }
}
*/


/*
시작일과 종료일의 날짜를 반환받아 디데이를 계산해줍니다.
*/
function dDaycal() {
    var startDayYear = "20" + startDay.substring(0, 2);
    var startDaymonth = Number(startDay.substring(2, 4))-1;
    var startDayDay = startDay.substring(4, 6);

    var endDayYear = "20" + endDay.substring(0, 2);
    var endDayMonth = Number(endDay.substring(2, 4))-1;
    var endDayDay = endDay.substring(4, 6);

    var targetStartDay = new Date(startDayYear, startDaymonth, startDayDay);
    var targetEndDay = new Date(endDayYear, endDayMonth, endDayDay);

    var diff = targetEndDay-targetStartDay;

    dDay = Math.ceil(diff / 86400000);

    document.getElementById("calDday").value = dDay;

}

/*
단위의 옵션이 바뀌거나 클릭될때마다 계산을 다시 합니다.
*/
function degreeCal() {
    var mediNumElement = document.getElementById("mediNum1");
    var mediNumElement = document.getElementById("mediNum2");
    var mediNumElement = document.getElementById("mediNum3");
    var mediNumElement = document.getElementById("mediNum4");
    var mediNumElement = document.getElementById("mediNum5");
    var mediNumElement = document.getElementById("mediNum6");
    var mediNumElement = document.getElementById("mediNum7");

    function updateMediCount() {
        var selectedNumber1 = 0.06666666667;
        var selectedNumber2 = 0.1;
        var selectedNumber3 = 0.125;
        var selectedNumber4 = 0.1428571429;
        var selectedNumber5 = 0.1666666666;
        var selectedNumber6 = 0.2;
        var selectedNumber7 = 0.25;


        var mediCount1 = dDay * selectedNumber1;
        var mediCount2 = dDay * selectedNumber2;
        var mediCount3 = dDay * selectedNumber3;
        var mediCount4 = dDay * selectedNumber4;
        var mediCount5 = dDay * selectedNumber5;
        var mediCount6 = dDay * selectedNumber6;
        var mediCount7 = dDay * selectedNumber7;

        mediCount1 = mediCount1.toFixed(8);
        mediCount2 = mediCount2.toFixed(8);
        mediCount3 = mediCount3.toFixed(8);
        mediCount4 = mediCount4.toFixed(8);
        mediCount5 = mediCount5.toFixed(8);
        mediCount6 = mediCount6.toFixed(8);
        mediCount7 = mediCount7.toFixed(8);

        document.getElementById("mediNum1").value = mediCount1;
        document.getElementById("mediNum2").value = mediCount2;
        document.getElementById("mediNum3").value = mediCount3;
        document.getElementById("mediNum4").value = mediCount4;
        document.getElementById("mediNum5").value = mediCount5;
        document.getElementById("mediNum6").value = mediCount6;
        document.getElementById("mediNum7").value = mediCount7;

    }

    setInterval(updateMediCount, 100);
}

