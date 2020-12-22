
const q = document.querySelector('#question')
const optionsArray = document.querySelectorAll('.options')
const btn = document.querySelector('#startBtn')



const urlGeneral = 'https://opentdb.com/api.php?amount=10&category=9&type=multiple'
const urlMovies = 'https://opentdb.com/api.php?amount=10&category=11&type=multiple'
const urlScience = 'https://opentdb.com/api.php?amount=10&category=17&type=multiple'

btn.addEventListener('click', () => {
    getData()
})



function getQuestions() {
    if (document.querySelector('#topics').value === 'general') 
        return urlGeneral
    
    else if (document.querySelector('#topics').value === 'movies') 
        return urlMovies
    
    else if (document.querySelector('#topics').value === 'science') 
    return urlScience
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
        for (let i = 0; i < optionsData.length; i++) {
            optionsArray[i].innerHTML = optionsData[i]
        }

    }
    catch (err) {
        console.log(`Error: ${err}`)
    }
}


function shuffleArray(arr) {
    arr = arr.sort(() => Math.random() - 0.5)
}