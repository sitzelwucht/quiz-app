
const q = document.querySelector('#question')
const optionsArray = document.querySelectorAll('.options')
const responseArray = document.querySelectorAll('.responses')
const btn = document.querySelector('#startBtn')
const topicSelector = document.querySelector('#topics')

let correctAnswer;
let score = 0

const baseUrl = 'https://opentdb.com/api.php?amount=10&category='
const urlGeneral = '9&type=multiple'
const urlMovies = '11&type=multiple'
const urlScience = '17&type=multiple'
const urlAnimals = '27&type=multiple'
const urlGeography= '22&type=multiple'
const urlComputers= '18&type=multiple'



btn.addEventListener('click', () => {
    getData()
})


function getQuestions() {
    if (topicSelector.value === 'general') 
        return `${baseUrl}${urlGeneral}`
    
    else if (topicSelector.value === 'movies') 
        return `${baseUrl}${urlMovies}`
    
    else if (topicSelector.value === 'science') 
        return `${baseUrl}${urlScience}`
            
    else if (topicSelector.value === 'animals') 
    return `${baseUrl}${urlAnimals}`
        
    else if (topicSelector.value === 'geography') 
        return `${baseUrl}${urlGeography}`
            
    else if (topicSelector.value === 'computers') 
    return `${baseUrl}${urlComputers}`
}


async function getData() {
    document.querySelector('#question-div').classList.remove('hidden')
    const response = await fetch(getQuestions())

    try {
        const data = await response.json()
       
        let dataObj = {
            question: data.results[0].question,
            options:  [
                data.results[0].correct_answer,
                data.results[0].incorrect_answers[0],
                data.results[0].incorrect_answers[1],
                data.results[0].incorrect_answers[2],
            ],
            difficulty: data.results[0].difficulty
        }

        q.innerHTML = dataObj.question

        let optionsData = [ dataObj.options[0], dataObj.options[1], dataObj.options[2], dataObj.options[3] ]
        let shuffledOptions = shuffleArray(optionsData)
        for (let i = 0; i < shuffledOptions.length; i++) {
            optionsArray[i].innerHTML = shuffledOptions[i]
            responseArray[i].value = shuffledOptions[i]
        }
        
        correctAnswer = dataObj.options[0]

    }
    catch (err) {
        console.log(`Error: ${err}`)
    }
}


document.querySelector('#send').addEventListener('click', () => {
    checkResponse()

})


function checkResponse() {


for (let i = 0; i < responseArray.length; i++) {
    if (responseArray[i].value === correctAnswer && responseArray[i].checked) {
        optionsArray[i].classList.add('correct')
        score++
    }
    else if  (responseArray[i].value !== correctAnswer && responseArray[i].checked) {
        optionsArray[i].classList.add('incorrect')
    }
}


}

function shuffleArray(arr) {
    arr = arr.sort(() => Math.random() - 0.5)
    return arr
}