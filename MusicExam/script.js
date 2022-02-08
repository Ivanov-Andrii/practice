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
        className && htmlEl.classList.add(className);
        whatHtmlIn && (htmlEl.innerHTML = whatHtmlIn);
        const parent = document.getElementsByClassName(nameParentBlock);
        parent[index].appendChild(htmlEl);
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
            if (!questions[i].answers.find(el => el.isChecked)) {
                showsAlertWindow("Please answer all questions!\nTRY AGAIN");
                mistake = true;
                break;
            }
        }
        return mistake;
    }


    const calculatePersent = (questions) => {
        // определяем процент от общего и результат дописываем в DOM
        // При таком определении процента код не масштабируемый!!! - переделать
        const [...examBlocks] = document.getElementsByClassName("examBlock");
        examBlocks.forEach((el, i) => {
            console.log(el)
            let numberAll = questions[i].numbersAll;
            questions[i].answers.forEach((answer, index) => {
                let numberItem = answer.number;
                let percentItem = (numberItem*100/numberAll).toFixed(2);
                const answersElements = el.querySelectorAll("span");
                answersElements[index].innerHTML += ` ${percentItem}%`;
                if(answer.isChecked) {
                    answersElements[index].classList.add("choice");
                    answersElements[index].innerHTML += ` — this is your choice`;
                }
            })
        })
        localStorage.setItem("attemp", 1);
    }

    const isExamPassed = () => {
        if (localStorage.getItem("attemp")) {
            showsAlertWindow("You can take exam only once");
            return true;
        }
        return false;
    }
    const buildHtmlFromJson = async () => {
        if(isExamPassed()) {
            return;
        }
        const getData = await axios(url);
        const {questions} = getData.data;

        questions.forEach(async (el, i) => {
            // почему в следующей строчке не срабатывает i?
            addHtmlEl("div", "exam",null, 0, "examBlock");
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
        addHtmlEl("button", "exam", "Submit", 0, "button");
    }

    // MAIN CODE
    await buildHtmlFromJson()


    // LISTENERS
    const button = document.querySelector('.button');

    button && button.addEventListener("click", async () => {
        if (isExamPassed()) {
            return;
        }
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
