

/**
* @brief   날짜 선택
* @details 사용자가 선택한 날짜에 체크표시를 남긴다.
*/
function calendarChoiceDay(column) {

    // @param 기존 선택일이 존재하는 경우 기존 선택일의 표시형식을 초기화 한다.
    if(document.getElementsByClassName("choiceDay")[0]) {
        
        // @see 금일인 경우
        if(document.getElementById("calMonth").innerText == autoLeftPad((nowResDate.getMonth() + 1), 2) && document.getElementsByClassName("choiceDay")[0].innerText == autoLeftPad(toResDay.getDate(), 2)) {
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
* @param   digit   글자의 자릿수를 지정 ( 2자릿수인 경우 00, 3자릿수인 경우 000 … )
*/
function autoLeftPad(num, digit) {
    if(String(num).length < digit) {
        num = new Array(digit - String(num).length + 1).join("0") + num;
    }
    return num;
}