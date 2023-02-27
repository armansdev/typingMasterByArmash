const quoteApiUrl = "https://api.quotable.io/random?minLength=120&maxLength=200";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById('quote-input');

let quote = "";
let mistakes = 0;
let time = 60;
let timer = "";

const renderNewQuote = async () => {
    //Fetch content from URL
    const responce = await fetch(quoteApiUrl);
    //Store responce
    const data = await responce.json();
    console.log(data);
    //Access content from JSON
    quote = data.content;
    console.log(quote);
    let arr = quote.split("").map((value)=>{
        return "<span class='quote-chars'>"  + value +"</span>"
    });    

    quoteSection.innerHTML = arr.join("");
    console.log(arr);
}

userInput.addEventListener("input",()=>{
    let quoteChars = document.querySelectorAll(".quote-chars")

    //Creating an Array name quoteChars from recieved span tags object
    quoteChars = Array.from(quoteChars);
    //User inputs of each character in Textbox
    let userInputChars = userInput.value.split("");

    quoteChars.forEach((char,index)=>{
        if(char.innerHTML == userInputChars[index]){
            char.classList.add("success");
        } 
        else if(userInputChars[index] == null){
            if(char.classList.contains("fail")){
                char.classList.remove("fail")
            }else{
                char.classList.remove("success")
            }
        }
        else{
            if(!char.classList.contains("fail")){
                mistakes = mistakes + 1;
                char.classList.add("fail")
            }
            document.getElementById("mistakesID").innerHTML = mistakes;
            }
    });
});

function updateTimer(){
    if(time == 0){
        displayResult();
    }
    else{
        document.getElementById("timerID").innerHTML = --time + "s";
    }
}
const timeReduce = ()=>{
    time = 60;
    timer = setInterval(updateTimer,1000);
}
const displayResult = () =>{
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;

    let timeTaken = 1;
    if(time !=0){
        timeTaken = (60-time)/100;
    }    
    document.getElementById('speedID').innerText = (userInput.value.length/5/timeTaken).toFixed(2) + "wpm";

    document.getElementById('accuracyID').innerText = Math.round(((userInput.value.length - mistakes)/ userInput.value.length)*100) + "%";
}
const startTest = () =>{
    timer= "";
    mistakes = 0;
    userInput.disabled= false;
    timeReduce();
    document.getElementById("start-test").style.display="none";
    document.getElementById("stop-test").style.display = "block";
}
window.onload = () =>{
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
}
