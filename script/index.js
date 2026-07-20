const createElements = (arr) => {
    const htmlElements = arr.map(elem => `<span class="btn">${elem}</span>`);
    return (htmlElements.join(" "))
};

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((response) => response.json()) //promise of json data
    .then((json) => displayLessons(json.data))
};


const removeActive = () => {
    const lessonButton = document.querySelectorAll(".lesson-btn")
    console.log(lessonButton);
    lessonButton.forEach((btn) => btn.classList.remove("active"));
};


const loadLevelWord=(id) =>{
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url)
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        removeActive(); // remove all active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active"); // add active class
        displayLevelWord(data.data)
    })
};

const loadWordDetail = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url)
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
}

// {
//     "word": "Jubilant",
//     "meaning": "আনন্দিত",
//     "pronunciation": "জুবিলান্ট",
//     "level": 6,
//     "sentence": "The team was jubilant after winning the match.",
//     "points": 4,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "joyful",
//         "elated",
//         "ecstatic"
//     ],
//     "id": 10
// }

const displayWordDetails = (word) => {
    console.log(word)
    const detailsBox = document.getElementById("details_container");
    detailsBox.innerHTML = `
            <div class="">
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
        </div>
        <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
        </div>
        <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
        </div>
        <div class="">
            <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
            <div class="">${createElements(word.synonyms)}</div>
        </div>
    `;

    document.getElementById("word_modal").showModal();
}


const displayLevelWord = (words) =>{
    // console.log(words);
    const wordContainer = document.getElementById("word_container");
    wordContainer.innerHTML = "";

    if(words.length == 0){
        // alert("No word detected");
        wordContainer.innerHTML = `
                <div class="text-center col-span-full space-y-6 py-10 font_bangla">
                <img class="mx-auto" src="./assets/alert-error.png"  alt="">
            <p class="text-xl font-medium text-gray-500">
                এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <p class="text-5xl font-bold text-gray-600">
                নেক্সট Lesson এ যান
            </p>
        </div>
        `;
        return;
    }

words.forEach(word => {
    const card = document.createElement("div");
    card.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl text-center py-7 px-5 space-y-5 h-full">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "দুঃখিত! কোনো Vocabulary পাওয়া যায়নি।"}</h2>
            <p class="font-semibold ">Meaning/ Pronunciation</p>
            <div class="text-2xl font-medium font_bangla">${word.meaning ? word.meaning : "দুঃখিত! কোনো Meaning পাওয়া যায়নি"}  / ${word.pronunciation ? word.pronunciation : "দুঃখিত! কোনো Meaning পাওয়া যায়নি"}</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF30] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF30] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>
    `;

    wordContainer.append(card);
    });
};


const displayLessons = (lessons) => {
    // console.log(lessons)

    // 1. get the container & empty container
    const levelContainer = document.getElementById("level_container");
    levelContainer.innerHTML = "";
    // 2. get into every lesson
    for(let lesson of lessons){
    console.log(lesson)
    // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}"
            onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;
// 4. append into container
levelContainer.append(btnDiv)

}

};

loadLessons();


