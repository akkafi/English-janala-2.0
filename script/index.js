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
            <div class="bg-white rounded-xl shadow-2xl text-center py-7 px-5 space-y-5">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "দুঃখিত! কোনো Vocabulary পাওয়া যায়নি।"}</h2>
            <p class="font-semibold ">Meaning/ Pronunciation</p>
            <div class="text-2xl font-medium font_bangla">${word.meaning ? word.meaning : "দুঃখিত! কোনো Meaning পাওয়া যায়নি"}  / ${word.pronunciation ? word.pronunciation : "দুঃখিত! কোনো Meaning পাওয়া যায়নি"}</div>
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


