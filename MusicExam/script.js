document.addEventListener('DOMContentLoaded', async function() {

    // VARIABLES
    const url = "https://gist.githubusercontent.com/Ivanov-Andrii/1d6e3b5d004ef2fd1dcfc7b101e2e35b/raw/3399cb5bfa009f00f8833539988afe3753216fb7/survey.json"
    const exam = document.querySelector(".exam");
    const alertWindow = document.querySelector(".alert");
    const btn = document.querySelector(".message-btn");
    let inputIdIncrement = 1;
    let inputNameIncrement = 1;


    // FUNCTIONS

    const showsAlertWindow = (text) => {
        const messageText = document.querySelector(".message-text");
        messageText.innerHTML = text;
        alertWindow.style.display = "flex";
    }

    const addHtmlEl = (whatEl, nameParentBlock, whatHtmlIn, index, className) => {
        const htmlEl = document.createElement(whatEl);
        // if (className !== null) htmlEl.classList.add(className);
        className && htmlEl.classList.add(className);
        // if (whatHtmlIn !== null) htmlEl.innerHTML = whatHtmlIn;
        whatHtmlIn && (htmlEl.innerHTML = whatHtmlIn);
        const parent = document.getElementsByClassName(nameParentBlock);
        if (parent.length === 1) parent[0].appendChild(htmlEl);
        if (parent.length > 1) parent[index].appendChild(htmlEl);
        // parent[index].appendChild(htmlEl);
        return parent;
    }

    const addInput = (inputParent, inputClass, inputId, inputType, inputName, index) => {
        const input = document.createElement("input");
        input.classList.add(inputClass);
        input.setAttribute("id", inputId);
        input.setAttribute("type", inputType);
        input.setAttribute("name", inputName);
        const parent = document.getElementsByClassName(inputParent);
        parent[index].appendChild(input);
        inputIdIncrement++;
        return parent;
    }

    const addIsChecked = (questions) => {
        questions.forEach((el, i) => {
            questions[i].numbersAll = el.answers.reduce((a, b) => a + b.number, 0);
            el.answers.forEach(el => {
                el.isChecked = false;
            })
        })
    }

    const calculateAnswersNum = (questions) => {
        const [...input] = document.getElementsByTagName("input");
        input.forEach((el, index) => {
            let indexAns = (+el.id.slice(5)-1)%3;
            let indexQ = +el.name.slice(5) - 1;
            if(el.checked) {
                questions[indexQ].answers[indexAns].isChecked = true;
                questions[indexQ].answers[indexAns].number += 1;
                questions[indexQ].numbersAll++;
            }
        })
    }

    const isHasMistake = (questions) => {
        let mistake = false;   
        for (let i = 0, ln = questions.length; i < ln; i++) {
            // let hasCheck = false;
            // questions[i].answers.forEach(el => {
            //     if(el.isChecked) hasCheck = true;
            // })
            // questions[i].answers.find(el => el.isChecked) && (hasCheck = true);
            if (!questions[i].answers.find(el => el.isChecked)) {
                showsAlertWindow("Please answer all questions!\nTRY AGAIN");
                // alert("Please answer all questions!\nTRY AGAIN");
                mistake = true;
                break;
            }
        }
        // if(mistake) location.reload()
        return mistake;
    }


    const calculatePersent = (questions) => {
        // определяем процент от общего и результат дописываем в DOM
        // При таком определении процента код не масштабируемый!!! - переделать
        const [...span] = document.querySelectorAll("span");
        span.forEach((el, i) => {
            let answerGroup = Math.floor(i/3);
            let answerItem = i%3;
            let numberItem = questions[answerGroup].answers[answerItem].number;
            // let answerGroup = i/answers.length
            let numberAll = questions[answerGroup].numbersAll;
            let percentItem = (numberItem*100/numberAll).toFixed(2);
            
            el.innerHTML += `    ${percentItem}%`;
            if(questions[answerGroup].answers[answerItem].isChecked) {
                el.classList.add("choice");
                el.innerHTML += ` — this is your choice`;
            }
        })
    }

    const checkAttemps = (amount) => {
        if (localStorage.getItem("attemp") == amount) {
            showsAlertWindow("You can take exam only once");
        } else {
            localStorage.setItem("attemp", amount)
        }
    }

    const buildHtmlFromJson = async () => {
        const getData = await axios(url);
        const {questions} = getData.data;

        questions.forEach(async (el, i) => {
            addHtmlEl("div", "exam",null, i, "examBlock");
            addHtmlEl("div", "examBlock", el.question, i, "question");
            addHtmlEl("div", "examBlock", null, i, "answers");
            const answersArray = el.answers;

            answersArray.forEach((item, index) => {
                addHtmlEl("label", "answers", null, i, `label${inputNameIncrement}`);
                addInput(`label${inputNameIncrement}`, "input", `input${inputIdIncrement}`, "radio", `input${inputNameIncrement}`, index);
                addHtmlEl("span", `label${inputNameIncrement}`, item.answer, index, "span");
            })
            inputNameIncrement++;

        })
        addHtmlEl("button", "exam", "Submit", null, "button");
    }
    
    // MAIN CODE
    await buildHtmlFromJson()
    checkAttemps(1);

    // LISTENERS
    const button = document.querySelector('.button');

    button.addEventListener("click", async () => {
        const getData = await axios(url);
        const {questions} = getData.data;
        addIsChecked(questions);
        calculateAnswersNum(questions);
        !isHasMistake(questions) && calculatePersent(questions);
    })

        btn.addEventListener("click", () => {
            alertWindow.style.display = "none";
        })
});