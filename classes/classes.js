const statuses = [
    {id: "student", uiLabel: "Студент"},
    {id: "dismissed", uiLabel: "Исключен"},

]

class Student {
    _studentRow = null;
    _marks = [];
    _avarageMarks = 0;
    _status = statuses.find((status) => {
        return status.id === "student";
    })
    constructor(university, course, fullName) {
        this.university = university;
        this.course = course;
        this.fullName = fullName;
    }
    get studentRow () {
        return this._studentRow;
    }
    set studentRow (htmlEl) {
        this._studentRow = htmlEl;
    }
    get marks() {
        return (!null) ? this._marks : null;
    }
    set marks(mark) {
        if (this._marks && (mark > 0 && mark < 6) && this._status.id === "student") {
            this._marks.push(mark);
            return this.marks;
        }
        if (mark < 0 && mark > 6) {
            console.log(`Неверная оценка. Поставьте оценку между 1 и 5`);
        }
    }
    get status() {
        return this._status;
    }
    set status(value) {
        let isPosibleId = false;
        this._status = statuses.find((status) => {
            if (value === status.id) {
                isPosibleId = true;
                return status.id;
            }
        })
        if (!isPosibleId) throw new Error("status with this id didn\`t exist");
        return this._status;
    }

    setAvarageMarks() {
        if (this.marks === null) return this._avarageMarks = null;
        if (this.marks.length === 0) {
            return this._avarageMarks = 0;
        }
        return this._avarageMarks = (this.marks.reduce((a, b) => +a+ +b, 0) / this.marks.length).toFixed(2);
    }
    addAvarageMarks() {
        const avarageMarks = this._studentRow.querySelector(".avarageMarks");
        avarageMarks.innerHTML = this._avarageMarks;
    }
    getInfo() {
        return  `Студент ${this.course} курса, ${this.university}, ${this.fullName} `;
    }
    dismiss () {
        this.status = "dismissed";
    }
    recover () {
        this.status = "student";
    }
    addMark () {
        this.marks = this._studentRow.querySelector(".select").value;
        this._studentRow.querySelector(".marks").innerHTML = this.marks;
    }
    disableButton(add, dismiss, recover, status) {
        if (status === "dismissed") {
            add.disabled = true;
            dismiss.disabled = true;
            recover.disabled = false;
        }
        if(status === "student") {
            add.disabled = false;
            dismiss.disabled = false;
            recover.disabled = true;
        }
    }
    handleActions () {
        const addGradeButton = this._studentRow.querySelector(".buttonGrade");
        const buttonDismiss = this._studentRow.querySelector(".buttonDismiss");
        const buttonRecover = this._studentRow.querySelector(".buttonRecover");

        addGradeButton.addEventListener("click", () => {
            this.addMark();
            this.setAvarageMarks();
            this.addAvarageMarks();
            this.disableButton(addGradeButton, buttonDismiss, buttonRecover, this.status.id);
        })
        buttonDismiss.addEventListener("click", () => {
            this.dismiss()
            this.disableButton(addGradeButton, buttonDismiss, buttonRecover, this.status.id);

        })
        buttonRecover.addEventListener("click", () => {
            this.recover();
            this.disableButton(addGradeButton, buttonDismiss, buttonRecover, this.status.id);

        })
        this.disableButton(addGradeButton, buttonDismiss, buttonRecover, this.status.id);
    }
}

class BudgetStudent extends Student {
    _scholarship = null;
    constructor (university, course, fullName) {
        super(university, course, fullName);
    }
    getAvarageMarks() {
        return +this._avarageMarks;
    }
    get scholarship () {
        return this._scholarship;
    }
    set scholarship (value) {
        return this._scholarship = value;
    }
    handleActions(){
        super.handleActions();
        const addGradeButton = this._studentRow.querySelector(".buttonGrade");
        const scholarship = this._studentRow.querySelector(".forScholarship");

        addGradeButton.addEventListener("click", () => {
            this.scholarship = null;
            if(this.getAvarageMarks() >= 4 && this.getAvarageMarks() <= 4.5) {
                this.scholarship = 900;
            }
            if(this.getAvarageMarks() > 4.5 && this.getAvarageMarks() <= 5) {
                this.scholarship = 1200;
            }
            (this.scholarship) ? (scholarship.innerHTML = `${this.scholarship} грн`)
                : scholarship.innerHTML = "Стипендия не положена";
        })
    }

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
    return htmlEl;
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

const addFrameOfForm = () => {
    addHtmlEl("div", "main-section", null, 0, "addStudent");
    addHtmlEl("h2", "addStudent", "Добавить нового студента", 0, null);
// add form;
    addHtmlEl("form", "addStudent", null, 0, "form");
    const inputNames = ["surname", "name", "university", "course"];
    inputNames.map(el => {
        return addInput("form", "input", el, "text", name=el, 0);
    });
    addHtmlEl("button", "form", "Добавить", 0, "formButton");
}

const addFrameOfTable = () => {
    addHtmlEl("table", "main-section", null, 0, "table");
    addHtmlEl("caption", "table", "Общий список студентов", 0, null);

    addHtmlEl("tr", "table", null, 0, "trHeader");
    const thList = ["Полное имя", "Университет", "Курс", "Статус", "Оценки", "Средняя оценка", "Поставить оценку", "Изменить статус", "Стипендия"]
    for (let i = 0; i < thList.length; i++) {
        if(i === thList.length-2 || i === thList.length-3) {
            addHtmlEl("th", "trHeader", thList[i], 0, "th", "2");
        } else {
            addHtmlEl("th", "trHeader", thList[i], 0, "th");
        }
    }
}

const addRow = (students) => {
    students.forEach((student,i) => {

        student.studentRow = addHtmlEl("tr", "table", null, 0, "trBody", null, i+1);

        // add td with right classes
        const dataForCells = [student.fullName, student.university, student.course, student.status.uiLabel, student.marks, null,
            null, null, null, null, null || "Стипендия не положена"];
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
        student.handleActions ();
    })
}

const buildHtmlFromObj = () => {
    addFrameOfForm();
    addFrameOfTable();
    addRow(students);
}
buildHtmlFromObj();

const formButton = document.querySelector(".formButton");
const surnameInput = document.getElementsByName("surname")[0];
const nameInput = document.getElementsByName("name")[0];
const universityInput = document.getElementsByName("university")[0];
const courseInput = document.getElementsByName("course")[0];


formButton.addEventListener("click", (e) => {
    e.preventDefault();
    const inputs = [surnameInput, nameInput, universityInput, courseInput];
    for (let i = 0, ln = inputs.length; i < ln; i++) {
        if(!inputs[i].value) {
            alert(`заполните поле ${inputs[i].name}`)
            break;
        }
    }
    students.push(new BudgetStudent(universityInput.value, courseInput.value, `${surnameInput.value} ${nameInput.value}`));

    // переделать, чтобы не перерисовывать все
    section.innerHTML = "";
    buildHtmlFromObj();

})

























