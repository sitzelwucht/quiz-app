
const q = document.querySelector('#question')
const optionsArray = document.querySelectorAll('.options')
const responseArray = document.querySelectorAll('.responses')
const btn = document.querySelector('#startBtn')
const topicSelector = document.querySelector('#topics')

let correctAnswer;
let score = 0
let round = 0
let mode;

const baseUrl = 'https://opentdb.com/api.php?amount=10&category='
const urlGeneral = '9&type=multiple'
const urlMovies = '11&type=multiple'
const urlScience = '17&type=multiple'
const urlAnimals = '27&type=multiple'
const urlGeography = '22&type=multiple'
const urlComputers = '18&type=multiple'
const urlVideogames = '15&type=multiple'
const urlTelevision = '14&type=multiple'


topicSelector.addEventListener('click', () => {
    clearResponse()
    getData()
})

document.querySelector('#send').addEventListener('click', () => {
    checkResponse()

})
document.querySelector('#next').addEventListener('click', () => {
    document.querySelector('#next').classList.add('inactive')
    document.querySelector('#send').classList.remove('inactive')
    clearResponse()
    getData()
})

function getQuestions() {

    if (round === 0) {
        if (topicSelector.value === 'general') {
            mode = 'general'
        }
        else if (topicSelector.value === 'movies') {
            mode = 'movies'
        }
        else if (topicSelector.value === 'science')  {
            mode = 'science'
        }         
        else if (topicSelector.value === 'animals') {
            mode = 'animals'
        }  
        else if (topicSelector.value === 'geography') {
            mode = 'geography' 
        }    
        else if (topicSelector.value === 'computers') {
            mode = 'computers'
        }
        else if (topicSelector.value === 'videogames') {
            mode = 'videogames'
        }
        else if (topicSelector.value === 'television') {
            mode = 'television'
        }
    }

        if (mode === 'general') {
            return `${baseUrl}${urlGeneral}`
        }
        else if (mode === 'movies') {
            return `${baseUrl}${urlMovies}`
        }
        else if (mode === 'science') {
            return `${baseUrl}${urlScience}`
        }
        else if (mode === 'animals') {
            return `${baseUrl}${urlAnimals}`
            }
        else if (mode === 'geography') {
            return `${baseUrl}${urlGeography}`
        }
        else if (mode === 'computers') {
            return `${baseUrl}${urlComputers}`
        }
        else if (mode === 'videogames') {
            return `${baseUrl}${urlVideogames}`
        }
        else if (mode === 'television') {
            return `${baseUrl}${urlTelevision}`
        }


}


async function getData() {
    document.querySelector('#question-div').classList.remove('hidden')

    const  response = await fetch(getQuestions())
  
    try {
        const data = await response.json()
       
        let dataObj = {
            question: data.results[round].question,
            options:  [
                data.results[round].correct_answer,
                data.results[round].incorrect_answers[0],
                data.results[round].incorrect_answers[1],
                data.results[round].incorrect_answers[2],
            ],
            difficulty: data.results[round].difficulty
        }

        q.innerHTML = dataObj.question

        let optionsData = [ dataObj.options[0], dataObj.options[1], dataObj.options[2], dataObj.options[3] ]
        let shuffledOptions = shuffleArray(optionsData)
        for (let i = 0; i < shuffledOptions.length; i++) {
            optionsArray[i].innerHTML = shuffledOptions[i]
            responseArray[i].value = shuffledOptions[i]
        }
        
        correctAnswer = dataObj.options[0]
        document.querySelector('#q-number').innerHTML = `Question ${round+1}`
        document.querySelector('#score').innerHTML =  `Score: ${score} / 10`


    }
    catch (err) {
        console.log(`Error: ${err}`)
    }
}




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
    round++
    document.querySelector('#next').classList.remove('inactive')
    document.querySelector('#send').classList.add('inactive')
    if(round === 10) {
        document.querySelector('#next').classList.add('inactive')
        document.querySelector('#send').classList.add('inactive')
        document.querySelector('#score').classList.add('highlighted')
    }

}

function clearResponse() {
    responseArray.forEach(item => {
        item.checked = false
    })

    optionsArray.forEach(item => {
        item.classList.remove('correct', 'incorrect')
    })

}

function shuffleArray(arr) {
    arr = arr.sort(() => Math.random() - 0.5)
    return arr
}