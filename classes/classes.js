class Student {
    _marks = [];
    _status = "Студент";
    constructor(university, course, fullName) {
        this.university = university;
        this.course = course;
        this.fullName = fullName;
    }
    get marks() {
        return (!null) ? this._marks : null;
    }
    set marks(mark) {
        if(mark === "dismiss") return this._marks = null;
        if(mark === "recover") return this._marks = [];
        if (this._marks && (mark > 0 && mark < 6)) {
            this._marks.push(mark);
            return this.marks;
        }
        if (mark < 0 && mark > 6) {
            console.log(`Неверная оценка. Поставьте оценку между 1 и 5`);
        }
    }

    get status() {
        return (this.marks === null) ? this._status = "Исключен" : this._status = "Студент";
    }

    getInfo() {
        let res = `Студент ${this.course} курса, ${this.university}, ${this.fullName} `;
        return res;
    }
    dismiss () {
        return this.marks = "dismiss";
    }
    recover () {
        return this.marks = "recover";
    }


}

class BudgetStudent extends Student {
    _scholarship = null;
    _avarageMarks = 0;
    constructor (university, course, fullName) {
        super(university, course, fullName);
    }
    getAvarageMarks() {
        if (this.marks === null) return this._avarageMarks = null;
        return this._avarageMarks = (this.marks.reduce((a, b) => a+b, 0) / this.marks.length);
    }
    getScholarship(){
        if(this.marks === null) {
            return "Студент исключен, степендия не положена";
        }
        if(this.getAvarageMarks() >= 4.5) return this._scholarship = 1400;
        if(this.getAvarageMarks() >= 4) return this._scholarship = 900;
    }

// ----- как требовалось в задании --------
    // getScholarship(){
//     if(this.marks === null) {
//         return "Студент исключен, степендия не положена";
//     }
//     if(this.getAvarageMarks() >= 4) {
//         setInterval(() => {
//             console.log("Вы получили 1400 грн. стипендии");
//         },3000)
//     }
// }
}

const andrii = new BudgetStudent("Garvard", 1, "Ivanov Andrii");
const serhii = new BudgetStudent("Oxford", 2, "Petrov Serhii");
const pavel = new BudgetStudent("Old University", 4, "Sidorov Pavel");
const students = [andrii, serhii, pavel];

// variables
const section = document.querySelector(".main-section");

// functions
const addHtmlEl = (whatEl, nameParentBlock, whatHtmlIn, index, className, col, id) => {
    const htmlEl = document.createElement(whatEl);
    className && htmlEl.classList.add(className);
    whatHtmlIn && (htmlEl.innerHTML = whatHtmlIn);
    col && htmlEl.setAttribute("colspan", col);
    id && htmlEl.setAttribute("id", id);
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
    input.setAttribute("placeholder", inputName)
    const parent = document.getElementsByClassName(inputParent);
    parent[index].appendChild(input);
    // inputIdIncrement++;
    return parent;
}


const buildHtmlFromObj = () => {
    addHtmlEl("div", "main-section", null, 0, "addStudent");
    addHtmlEl("h2", "addStudent", "Добавить нового студента", 0, null);
// add form;
    addHtmlEl("form", "addStudent", null, 0, "form");
    const inputNames = ["surname", "name", "university", "course"];
    inputNames.map(el => {
        return addInput("form", "input", el, "text", name=el, 0);
    });
    addHtmlEl("button", "form", "Добавить", 0, "formButton");

//    add table:
    addHtmlEl("table", "main-section", null, 0, "table");
    addHtmlEl("caption", "table", "Общий список студентов", 0, null);

    // addth
    addHtmlEl("tr", "table", null, 0, "trHeader");
    const thList = ["Полное имя", "Университет", "Курс", "Статус", "Оценки", "Средняя оценка", "Поставить оценку", "Изменить статус", "Стипендия"]
    for (let i = 0; i < thList.length; i++) {
        if(i === thList.length-2 || i === thList.length-3) {
        addHtmlEl("th", "trHeader", thList[i], 0, "th", "2");
        } else {
            addHtmlEl("th", "trHeader", thList[i], 0, "th");
        }
    }

    students.forEach((el,i) => {

        addHtmlEl("tr", "table", null, 0, "trBody", null, i+1);

        // add td with right classes
        const dataForCells = [el.fullName, el.university, el.course, el.status, el.marks, +el.getAvarageMarks().toFixed(2) || "Оценок пока нет",
            null, null, null, null, el.getScholarship() || "Стипендия не положена"];
        const forClassName = ["fullName", "universe", "course", "status", "marks", "avarageMarks", "forSelect", "forButtonGrade",
            "forButtonDismiss", "forButtonRecover", "forScholarship"];
        dataForCells.forEach((el, index, arr) => {
            addHtmlEl("td", "trBody", el, i, forClassName[index]);
        })

        addHtmlEl("select", "forSelect", null, i, "select");
        [2,3,4,5].forEach((el, index) => {
            addHtmlEl("option", "select", el, i, null)
        });
        addHtmlEl("button", "forButtonGrade", "Поставить", i, "buttonGrade");
        addHtmlEl("button", "forButtonDismiss", "Исключить", i, "buttonDismiss");
        addHtmlEl("button", "forButtonRecover", "Восстановить", i, "buttonRecover");

        // дизактивируем ненужные кнопки
        let buttonGrade = document.querySelectorAll(".buttonGrade");
        let buttonDismiss = document.querySelectorAll(".buttonDismiss");
        let buttonRecover = document.querySelectorAll(".buttonRecover");

        if (el.status === "Исключен") {
            buttonGrade[i].disabled = true;
            buttonDismiss[i].disabled = true;
            buttonRecover[i].disabled = false;
        } else {
            buttonGrade[i].disabled = false;
            buttonDismiss[i].disabled = false;
            buttonRecover[i].disabled = true;
        }
    })
}
buildHtmlFromObj();

    const addGrade = () => {
        const addGradeButtons = document.querySelectorAll(".buttonGrade");
        [...addGradeButtons].forEach((el, i) => {
            el.addEventListener("click", () => {
                const selectValue = +document.querySelectorAll(".select")[i].value;
                students[i].marks = selectValue;
                let mainSection = document.querySelector(".main-section");
                mainSection.innerHTML = "";
                buildHtmlFromObj();
                addGrade();
            })
        })
    }


// Если есть оценки - не получается
//     const dismissStudent = () => {
//         const dismissButton = document.querySelectorAll(".buttonDismiss");
//         [...dismissButton].forEach((el, i) => {
//             el.addEventListener("click", () => {
//                 // students[i].marks = [];
//                 students[i].dismiss();
//                 let table = document.querySelector(".table");
//                 table.innerHTML = "";
//                 buildHtmlFromObj();
//             })
//         })
//     }

    // const recoverStudent = () => {
    //     const buttonRecover = document.querySelectorAll(".buttonRecover");
    //     [...buttonRecover].forEach((el, i) => {
    //         el.addEventListener("click", () => {
    //             students[i].recover();
    //             let table = document.querySelector(".table");
    //             table.innerHTML = "";
    //             buildHtmlFromObj();
    //         })
    //     })
    // }
addGrade();
// dismissStudent();





















