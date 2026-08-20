/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if(loader){
            loader.style.opacity = "0";
        }

        setTimeout(() => {

            if(loader){
                loader.style.display = "none";
            }

        }, 800);

    }, 1200);

});


/* =========================
   PIN SYSTEM
========================= */

const unlockBtn =
    document.getElementById("unlockBtn");

const pinInput =
    document.getElementById("pinInput");

const pinError =
    document.getElementById("pinError");

const pinScreen =
    document.getElementById("pinScreen");

const website =
    document.getElementById("website");


function unlockWebsite(){

    const enteredPin =
        pinInput.value.trim();

    if(enteredPin === "2105"){

        pinScreen.style.opacity = "0";

        pinScreen.style.transition = ".6s";

        setTimeout(() => {

            pinScreen.style.display = "none";

            website.style.display = "block";

            window.scrollTo({
                top:0,
                behavior:"instant"
            });

        },600);

    }else{

        pinError.innerText =
            "Wrong PIN 💔 Try again.";

        pinInput.value = "";

        pinInput.focus();

        pinInput.style.borderColor =
            "#777";

        setTimeout(() => {

            pinInput.style.borderColor =
                "#333";

            pinError.innerText = "";

        },2000);

    }

}


unlockBtn.addEventListener(
    "click",
    unlockWebsite
);


/* =========================
   OPEN BOOK
========================= */

const openBookBtn =
    document.getElementById("openBookBtn");


openBookBtn.addEventListener("click", () => {

    const music =
        document.getElementById("bgMusic");

    if(music){

        music.volume = 0.7;

        music.play().catch(() => {
            console.log(
                "Music requires user interaction."
            );
        });

    }


    document
        .getElementById("scrapbook")
        .scrollIntoView({
            behavior:"smooth"
        });

});


/* =========================
   LETTER OPEN
========================= */

const openLetter =
    document.getElementById("openLetter");

const letterPaper =
    document.getElementById("letterPaper");


openLetter.addEventListener("click", () => {

    if(letterPaper.style.display === "block"){

        letterPaper.style.display = "none";

    }else{

        letterPaper.style.display = "block";

        setTimeout(() => {

            letterPaper.scrollIntoView({
                behavior:"smooth",
                block:"center"
            });

        },100);

    }

});


/* =========================
   QUIZ
========================= */

const checkQuiz =
    document.getElementById("checkQuiz");


function normalizeDate(value){

    return value
        .toLowerCase()
        .trim()
        .replace(/\//g,"-")
        .replace(/\./g,"-")
        .replace(/\s+/g," ");

}


checkQuiz.addEventListener("click", () => {

    const answer1 =
        document
            .getElementById("answer1")
            .value
            .toLowerCase()
            .trim();

    const answer2 =
        document
            .getElementById("answer2")
            .value
            .toLowerCase()
            .trim();


    const result =
        document.getElementById("quizResult");


    /*
       ACCEPTED ANSWERS:

       Question 1:
       21-05-2026
       21/05/2026
       21.05.2026
       21 mei 2026
       21 may 2026

       Question 2:
       Choco
    */


    const dateAnswer =
        normalizeDate(answer1);


    const validDates = [

        "21-05-2026",
        "21 mei 2026",
        "21 may 2026"

    ];


    const validBearNames = [

        "choco",
        "choco bear",
        "choco 🧸"

    ];


    const correctDate =
        validDates.includes(dateAnswer);


    const correctBear =
        validBearNames.includes(answer2);


    if(correctDate && correctBear){

        result.style.color = "#ffffff";

        result.innerText =
            "Correct! You really remember us. 🖤✨";


        const specialMemory =
            document.getElementById(
                "specialMemory"
            );


        setTimeout(() => {

            specialMemory.scrollIntoView({
                behavior:"smooth"
            });

        },700);


    }else if(correctDate && !correctBear){

        result.style.color = "#aaaaaa";

        result.innerText =
            "First answer is correct! But... remember our little bear 🧸";


    }else if(!correctDate && correctBear){

        result.style.color = "#aaaaaa";

        result.innerText =
            "You remembered Choco! But don't forget our special date 🖤";


    }else{

        result.style.color = "#888888";

        result.innerText =
            "Almost... try remembering our little moments again 🥹";

    }

});


/* =========================
   REVEAL SPECIAL MEMORY
========================= */

const revealBtn =
    document.getElementById("revealBtn");


revealBtn.addEventListener("click", () => {

    const specialPhoto =
        document.getElementById(
            "specialPhoto"
        );


    specialPhoto.classList.add("show");


    revealBtn.innerText =
        "Memory Revealed 🤍";


    revealBtn.disabled = true;


    revealBtn.style.opacity =
        "0.7";


    setTimeout(() => {

        specialPhoto.scrollIntoView({
            behavior:"smooth",
            block:"center"
        });

    },300);

});


/* =========================
   RELATIONSHIP COUNTER
========================= */

function updateCounter(){

    /*
       Relationship started:
       21 May 2026
    */

    const startDate =
        new Date(
            "2026-05-21T00:00:00"
        );


    const now =
        new Date();


    const difference =
        now.getTime() -
        startDate.getTime();


    if(difference < 0){

        document.getElementById(
            "days"
        ).innerText = "0";

        document.getElementById(
            "hours"
        ).innerText = "0";

        document.getElementById(
            "minutes"
        ).innerText = "0";

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            difference /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            difference /
            (1000 * 60)
        );


    document.getElementById(
        "days"
    ).innerText = days;


    document.getElementById(
        "hours"
    ).innerText = hours;


    document.getElementById(
        "minutes"
    ).innerText = minutes;

}


updateCounter();

setInterval(
    updateCounter,
    1000
);


/* =========================
   SECRET MESSAGE
========================= */

const stars =
    document.querySelectorAll(
        ".secret-star"
    );


let clickedStars = 0;


const starProgress =
    document.getElementById(
        "starProgress"
    );


stars.forEach((star, index) => {

    star.addEventListener("click", () => {

        if(
            !star.classList.contains(
                "found"
            )
        ){

            star.classList.add(
                "found"
            );


            clickedStars++;


            star.style.transform =
                "scale(1.4) rotate(10deg)";


            star.style.opacity =
                "1";


            starProgress.innerText =
                `Find all the stars (${clickedStars}/5)`;

        }


        if(clickedStars === 5){

            const secretMessage =
                document.getElementById(
                    "secretMessage"
                );


            secretMessage.style.display =
                "block";


            setTimeout(() => {

                secretMessage.scrollIntoView({
                    behavior:"smooth",
                    block:"center"
                });

            },500);

        }

    });

});


/* =========================
   REPLAY MEMORIES
========================= */

const replayBtn =
    document.getElementById(
        "replayBtn"
    );


replayBtn.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });


        const music =
            document.getElementById(
                "bgMusic"
            );


        if(music){

            music.play().catch(() => {});

        }

    }
);


/* =========================
   ENTER KEY PIN
========================= */

pinInput.addEventListener(
    "keypress",
    (event) => {

        if(event.key === "Enter"){

            unlockWebsite();

        }

    }
);


/* =========================
   ENTER KEY QUIZ
========================= */

document
    .getElementById("answer2")
    .addEventListener(
        "keypress",
        (event) => {

            if(event.key === "Enter"){

                checkQuiz.click();

            }

        }
    );


/* =========================
   AUTO FOCUS PIN
========================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            if(pinInput){

                pinInput.focus();

            }

        },1300);

    }
);
