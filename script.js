let currentWords = [...words];

const container = document.getElementById("wordContainer");

function displayWords(list) {

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML = `
            <p>Kelime bulunamadı.</p>
        `;

        return;
    }

    list.forEach(word => {

        const card = document.createElement("div");

        card.className = "word-card";

        card.innerHTML = `

            <span class="level">
                ${word.level}
            </span>

            <h2>
                ${word.turkish}
            </h2>

            <div class="english">
                ${word.english}
            </div>

            <div class="pronunciation">
                🔊 ${word.englishPronunciation}
            </div>

            <div class="language">
                🇷🇺 ${word.russian}
            </div>

            <div class="pronunciation">
                ${word.russianPronunciation}
            </div>

            <div class="example">

                <strong>English:</strong>
                ${word.exampleEnglish}

                <br><br>

                <strong>Türkçe:</strong>
                ${word.exampleTurkish}

                <br><br>

                <strong>Русский:</strong>
                ${word.exampleRussian}

            </div>

            <button
                class="speak-btn"
                onclick="speak('${word.english}')"
            >
                🔊 Dinle
            </button>

        `;

        container.appendChild(card);

    });
}


function filterCategory(category) {

    if (category === "all") {

        currentWords = [...words];

    } else {

        currentWords = words.filter(
            word => word.category === category
        );

    }

    displayWords(currentWords);
}


function filterLevel() {

    const level =
        document.getElementById("level").value;

    if (level === "all") {

        currentWords = [...words];

    } else {

        currentWords = words.filter(
            word => word.level === level
        );

    }

    displayWords(currentWords);
}


function searchWords() {

    const search =
        document.getElementById("search")
        .value
        .toLowerCase();

    const result = words.filter(word =>

        word.turkish.toLowerCase().includes(search) ||

        word.english.toLowerCase().includes(search) ||

        word.russian.toLowerCase().includes(search)

    );

    displayWords(result);
}


function speak(text) {

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    speech.rate = 0.8;

    speechSynthesis.speak(speech);
}


displayWords(words);