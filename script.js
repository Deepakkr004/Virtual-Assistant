let btn=document.querySelector("#btn")
let content=document.querySelector("#content")

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1 
    text_speak.volume = 1
    text_speak.lang = "en-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishme(){
    let day = new Date()
    let hours = day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning")
    }
    else if(hours>=12 && hours<16){
        speak("Good Afternoon")
    }else{
        speak("Good Evening")
    }
}

window.addEventListener('load',()=>{
    wishme()
    speak("How can I help you?")
})

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})

function takeCommand(message){
    btn.style.display = "flex"
       voice.style.display = "none"
    if(message.includes("hello" || "hi" || "hii" || "hey")){
        speak("Hello,How can I help you?")
    }
    else if(message.includes("what is your name")){
        speak("my name is Sidhi, I am a virtual assistant")
    }
    else if(message.includes("who are you?" || "hu r u")){
        speak("I am a virtual assistant, Created by Mr. Deepak Kumar")
    }
    else if(message.includes("how are you?")){
        speak("I am good, thanks for asking me, how are you?")
    }
    else if(message.includes("open youtube")){
        speak("Opening Youtube.....")
        window.open("https://www.youtube.com/","_blank")
    }
    else if(message.includes("open google")){
        speak("Opening google.....")
        window.open("https://www.google.com/","_blank")
    }
    else if(message.includes("open instagram")){
        speak("Opening Instagram.....")
        window.open("https://www.instagram.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("Opening facebook.....")
        window.open("https://www.facebook.com/","_blank")
    }
    else if(message.includes("open calculator")){
        speak("Opening calculator.....")
        window.open("calculator://")
    }
    else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
    else if(message.includes("date")){
        let date = new Date().toLocaleString(undefined,{day:"numeric",minute:"short"})
        speak(date)
    }
    else{
        let finalText = "This is what i found on internet regarding" + message.replace("Sidhi","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("Sidhi","")}`,"_blank")
    }
}