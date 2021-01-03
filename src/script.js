
const q = document.querySelector('#question')
const optionsArray = document.querySelectorAll('.options')
const responseArray = document.querySelectorAll('.responses')
const submitBtn = document.querySelector('#send')
const scoreDiv = document.querySelector('#score')

let correctAnswer;
let score = 0
let round = 0
let mode;
let questionType;
let dataObj = {}
let optionsData = []


document.querySelector('#ok-btn').addEventListener('click', () => {
    if (document.querySelector('#topics').value == '' || document.querySelector('#type').value == '') {
        alert('Please select topic and question type')
        return
    }
    scoreDiv.innerHTML = ''
    score = 0
    scoreDiv.classList.remove('highlighted', 'hidden')
    submitBtn.classList.remove('inactive')
  
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


function getUrl() {
    const baseUrl = `https://opentdb.com/api.php?amount=10`
    const cat = '&category='
    let id = ''
    const type = '&type='
    let qType = ''

    if (round === 0) {
       mode = document.querySelector('#topics').value
       questionType = document.querySelector('#type').value
    }
    
    // determine question type
    if (questionType === 'boolean')
        qType = 'boolean'
    else if (questionType === 'multiple')
        qType = 'multiple'
    else
        qType = ''

    // determine topic
    if (mode === 'random') id = ''
    else if (mode === 'general')
        id = '9'
    else if (mode === 'movies')
        id = '11' 
    else if (mode === 'science') 
        id = '17'
    else if (mode === 'animals') 
        id = '27'
    else if (mode === 'geography') 
        id = '22'
    else if (mode === 'computers') 
        id = '18'
    else if (mode === 'videogames') 
        id = '15'
    else if (mode === 'television') 
        id = '14'
    else if (mode === 'music') 
        id = '12'
    else if (mode === 'history') 
        id = '23'
    
    return `${baseUrl}${cat}${id}${type}${qType}`
}

async function getData() {
    document.querySelector('#question-div').classList.remove('hidden')
    q.classList.add('fade')
    Array.prototype.filter.call(optionsArray, (item) => {
        item.classList.add('fade')
    })

    const response = await fetch(getUrl())
    
    try {
        const data = await response.json()

        // check if question is multiple choice
        if (data.results[round].incorrect_answers.length > 1) {
            dataObj = {
                question: data.results[round].question,
                options:  [
                    data.results[round].correct_answer,
                    data.results[round].incorrect_answers[0],
                    data.results[round].incorrect_answers[1],
                    data.results[round].incorrect_answers[2],
                ],
                difficulty: data.results[round].difficulty
            }
            optionsData = [ dataObj.options[0], dataObj.options[1], dataObj.options[2], dataObj.options[3] ]
        }
        else {
            dataObj = {
                question: data.results[round].question,
                options:  [
                    data.results[round].correct_answer,
                    data.results[round].incorrect_answers[0]
                ],
                difficulty: data.results[round].difficulty
            }
            optionsData = [ dataObj.options[0], dataObj.options[1] ]
        }

        setTimeout(() => {
            q.innerHTML = dataObj.question
            q.classList.remove('fade')
        }, 800);
        
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

    scoreDiv.innerHTML =  `Score: ${score} / 10`
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
    setTimeout(() => {
        document.querySelector('#next').classList.toggle('inactive')
        document.querySelector('#send').classList.toggle('inactive')
    }, 700);

}


function gameEnd() {
    document.querySelector('#next').classList.add('inactive')
    submitBtn.classList.add('inactive')
    scoreDiv.classList.add('highlighted')
    round = 0
}