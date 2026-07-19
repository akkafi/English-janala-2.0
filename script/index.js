const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((response) => response.json()) //promise of json data
    .then((json) => displayLessons(json.data))
}


const loadLevelWord=(id) =>{
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url)
    fetch(url)
    .then(res => res.json())
    .then((data) => displayLevelWord(data.data))
}
const displayLevelWord = (words) =>{
    // console.log(words);
    const wordContainer = document.getElementById("word_container");
    wordContainer.innerHTML = "";

    // {
    //     "id": 80,
    //     "level": 1,
    //     "word": "Run",
    //     "meaning": "দৌড়ানো",
    //     "pronunciation": "রান"
    // }

words.forEach(word => {
    console.log(word)
    const card = document.createElement("div");
    card.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl text-center py-7 px-5 space-y-5">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold ">Meaning/ Pronunciation</p>
            <div class="text-2xl font-medium font_bangla">${word.meaning} / ${word.pronunciation}</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF30] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
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
            <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;
// 4. append into container
levelContainer.append(btnDiv)
}

}
loadLessons();


