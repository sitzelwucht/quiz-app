
const q = document.querySelector('#question')
const optionsArray = document.querySelectorAll('.options')
const responseArray = document.querySelectorAll('.responses')
const topicSelector = document.querySelector('#topics')
const nextBtn  = document.querySelector('#next')
const submitBtn = document.querySelector('#send')
const scoreDiv = document.querySelector('#score')

let correctAnswer;
let score = 0
let round = 0
let mode;
let difficulty;

const baseUrl = 'https://opentdb.com/api.php?amount=10&category='
const general = '9&type=multiple'
const movies = '11&type=multiple'
const science = '17&type=multiple'
const animals = '27&type=multiple'
const geography = '22&type=multiple'
const computers = '18&type=multiple'
const videogames = '15&type=multiple'
const television = '14&type=multiple'


topicSelector.addEventListener('click', () => {

    scoreDiv.classList.remove('highlighted', 'hidden')
    submitBtn.classList.remove('inactive')
    score = 0
    clearResponse()
    getData()
})

document.querySelector('#send').addEventListener('click', () => {
    checkResponse()

})
document.querySelector('#next').addEventListener('click', () => {
    toggleButtons()
    clearResponse()
    getData()
})


function getQuestions() {

    if (round === 0) {
       mode = topicSelector.value
    }

    if (mode === 'general') {
        return `${baseUrl}${general}`
    }
    else if (mode === 'movies') {
        return `${baseUrl}${movies}`
    }
    else if (mode === 'science') {
        return `${baseUrl}${science}`
    }
    else if (mode === 'animals') {
        return `${baseUrl}${animals}`
    }
    else if (mode === 'geography') {
        return `${baseUrl}${geography}`
    }
    else if (mode === 'computers') {
        return `${baseUrl}${computers}`
    }
    else if (mode === 'videogames') {
        return `${baseUrl}${videogames}`
    }
    else if (mode === 'television') {
        return `${baseUrl}${television}`
    }
 
}


async function getData() {
    document.querySelector('#question-div').classList.remove('hidden')
    q.classList.add('fade')
    Array.prototype.filter.call(optionsArray, (item) => {
        item.classList.add('fade')
    })

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

        setTimeout(() => {
            q.innerHTML = dataObj.question
            q.classList.remove('fade')
        }, 800);
        

        let optionsData = [ dataObj.options[0], dataObj.options[1], dataObj.options[2], dataObj.options[3] ]
        difficulty = dataObj.difficulty
        let shuffledOptions = shuffleArray(optionsData)

        setTimeout(() => {
            for (let i = 0; i < shuffledOptions.length; i++) {
                optionsArray[i].innerHTML = shuffledOptions[i]
                responseArray[i].value = shuffledOptions[i]
                optionsArray[i].classList.remove('fade')
                document.querySelector('#right-bottom').classList.remove('hidden')
            }
        }, 1600);
  
        
        correctAnswer = dataObj.options[0]
        document.querySelector('#q-number').innerHTML = `Question ${round+1}`
        scoreDiv.innerHTML =  `Score: ${score} / 10`

    }
    catch (err) {
        console.log(`Error: ${err}`)
    }
}


function checkResponse() {
    count = 0
   for (let i = 0; i < responseArray.length; i++) {
       if (!responseArray[i].checked) {
           count++
           if (count === 4) {
               alert('please select an answer')
               return
           }
       }
   }
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
    toggleButtons()

    if (round === 10) {
        gameEnd()
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

function toggleButtons() {
    document.querySelector('#next').classList.toggle('inactive')
    document.querySelector('#send').classList.toggle('inactive')
}


function gameEnd() {
    nextBtn.classList.add('inactive')
    submitBtn.classList.add('inactive')
    scoreDiv.classList.add('highlighted')
    round = 0
}