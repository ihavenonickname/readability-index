const mainTextarea = document.getElementById('main-textarea')
const loadingDiv = document.getElementById('loading-div')
const resultsDiv = document.getElementById('results-div')
const charactersSpan = document.getElementById('characters-span')
const wordsSpan = document.getElementById('words-span')
const sentencesSpan = document.getElementById('sentences-span')
const ariSpan = document.getElementById('ari-span')

let handlerTimeout = null

window.addEventListener('load', function () {
    mainTextarea.addEventListener('input', function () {
        if (handlerTimeout !== null) {
            clearTimeout(handlerTimeout)
        }

        resultsDiv.classList.add('invisible')
        loadingDiv.classList.remove('invisible')

        handlerTimeout = setTimeout(() => {
            const text = mainTextarea.value
            const stats = buildStats(text)
            const ari = automatedReadabilityIndex(stats)

            charactersSpan.textContent = stats.characters
            wordsSpan.textContent = stats.words
            sentencesSpan.textContent = stats.sentences
            ariSpan.textContent = ari

            loadingDiv.classList.add('invisible')
            resultsDiv.classList.remove('invisible')
        }, 2000)
    })
})
