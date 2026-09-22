let currentWords = [...words];

const container = document.getElementById("wordContainer");


// ========================================
// KELİMELERİ GÖSTER
// ========================================

function displayWords(list) {

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML = `
            <div class="no-result">
                <h2>Kelime bulunamadı.</h2>
                <p>Farklı bir kelime veya kategori deneyin.</p>
            </div>
        `;

        return;
    }


    list.forEach(word => {

        const card = document.createElement("div");

        card.className = "word-card";


        // Güvenli metin
        const english = escapeText(word.english);
        const turkish = escapeText(word.turkish);
        const russian = escapeText(word.russian);

        const exampleEnglish = escapeText(word.exampleEnglish);
        const exampleTurkish = escapeText(word.exampleTurkish);
        const exampleRussian = escapeText(word.exampleRussian);


        card.innerHTML = `

            <!-- SEVİYE -->

            <div class="card-top">

                <span class="level">
                    ${word.level}
                </span>

                <span class="category">
                    ${word.category}
                </span>

            </div>


            <!-- TÜRKÇE -->

            <div class="word-section turkish-section">

                <div class="language-title">
                    🇹🇷 TÜRKÇE
                </div>

                <div class="main-word turkish-word">
                    ${word.turkish}
                </div>

                <button
                    class="speak-btn turkish-btn"
                    onclick="speakTurkish('${turkish}')"
                >
                    🔊 Türkçe Dinle
                </button>

            </div>


            <!-- İNGİLİZCE -->

            <div class="word-section english-section">

                <div class="language-title">
                    🇬🇧 ENGLISH
                </div>

                <div class="main-word english-word">
                    ${word.english}
                </div>

                <div class="pronunciation">
                    ${word.englishPronunciation}
                </div>

                <button
                    class="speak-btn english-btn"
                    onclick="speakEnglish('${english}')"
                >
                    🔊 English Dinle
                </button>

            </div>


            <!-- RUSÇA -->

            <div class="word-section russian-section">

                <div class="language-title">
                    🇷🇺 РУССКИЙ
                </div>

                <div class="main-word russian-word">
                    ${word.russian}
                </div>

                <div class="pronunciation">
                    ${word.russianPronunciation}
                </div>

                <button
                    class="speak-btn russian-btn"
                    onclick="speakRussian('${russian}')"
                >
                    🔊 Русский Dinle
                </button>

            </div>


            <!-- ÖRNEK CÜMLELER -->

            <div class="examples">

                <h3>📚 Örnek Cümleler</h3>


                <!-- İNGİLİZCE ÖRNEK -->

                <div class="example example-english">

                    <div class="example-language">
                        🇬🇧 English
                    </div>

                    <p>
                        ${word.exampleEnglish}
                    </p>

                    <button
                        class="example-btn english-example-btn"
                        onclick="speakEnglish('${exampleEnglish}')"
                    >
                        🔊 Cümleyi Dinle
                    </button>

                </div>


                <!-- TÜRKÇE ÖRNEK -->

                <div class="example example-turkish">

                    <div class="example-language">
                        🇹🇷 Türkçe
                    </div>

                    <p>
                        ${word.exampleTurkish}
                    </p>

                    <button
                        class="example-btn turkish-example-btn"
                        onclick="speakTurkish('${exampleTurkish}')"
                    >
                        🔊 Cümleyi Dinle
                    </button>

                </div>


                <!-- RUSÇA ÖRNEK -->

                <div class="example example-russian">

                    <div class="example-language">
                        🇷🇺 Русский
                    </div>

                    <p>
                        ${word.exampleRussian}
                    </p>

                    <button
                        class="example-btn russian-example-btn"
                        onclick="speakRussian('${exampleRussian}')"
                    >
                        🔊 Cümleyi Dinle
                    </button>

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}



// ========================================
// İNGİLİZCE SES
// ========================================

function speakEnglish(text) {

    stopSpeaking();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    speech.rate = 0.8;

    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}



// ========================================
// TÜRKÇE SES
// ========================================

function speakTurkish(text) {

    stopSpeaking();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "tr-TR";

    speech.rate = 0.8;

    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}



// ========================================
// RUSÇA SES
// ========================================

function speakRussian(text) {

    stopSpeaking();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "ru-RU";

    speech.rate = 0.8;

    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}



// ========================================
// ÖNCEKİ SESİ DURDUR
// ========================================

function stopSpeaking() {

    window.speechSynthesis.cancel();

}



// ========================================
// GÜVENLİ METİN
// ========================================

function escapeText(text) {

    return String(text)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"');

}



// ========================================
// KATEGORİ FİLTRESİ
// ========================================

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



// ========================================
// SEVİYE FİLTRESİ
// ========================================

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



// ========================================
// ARAMA
// ========================================

function searchWords() {

    const search =
        document
            .getElementById("search")
            .value
            .toLowerCase()
            .trim();


    const result = words.filter(word =>

        word.turkish
            .toLowerCase()
            .includes(search)

        ||

        word.english
            .toLowerCase()
            .includes(search)

        ||

        word.russian
            .toLowerCase()
            .includes(search)

    );


    displayWords(result);

}



// ========================================
// SAYFA AÇILINCA
// ========================================

displayWords(words);
