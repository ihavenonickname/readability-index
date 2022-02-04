function buildStats(text) {
    const stats = { characters: 0, words: 0, sentences: 0 }

    let insideWord = false
    let periodsFound = 0

    for (const c of text) {
        if (/\w/.test(c)) {
            if (periodsFound === 1) {
                stats.sentences += 1
            }

            periodsFound = 0

            stats.characters += 1

            if (!insideWord) {
                insideWord = true
                stats.words += 1
            }
        } else {
            if (c === '.') {
                periodsFound += 1
            }

            if (insideWord) {
                insideWord = false
            }
        }
    }

    stats.sentences += 1

    return stats
}

// https://en.wikipedia.org/wiki/Automated_readability_index
function automatedReadabilityIndex(stats) {
    const chars_per_word = stats.characters / stats.words
    const words_per_sentence = stats.words / stats.sentences
    const ari = 4.71 * chars_per_word + 0.5 * words_per_sentence - 21.43

    if (ari < 1) {
        return 1
    }

    if (ari > 22) {
        return 22
    }

    return Math.ceil(ari)
}
