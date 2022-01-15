//  {
//     "id": 1,
//     "name": "Leanne Graham",
//     "address": {
//       "city": "Gwenborough",
//     },
//     "phone": "1-770-736-8031 x56442",
//     "company": {
//       "name": "Romaguera-Crona",
//     }
//   },
const url = "https://jsonplaceholder.typicode.com/users";
let name = document.querySelector("#name");
let city = document.querySelector("#city");
let phone = document.querySelector("#phone");
let company = document.querySelector("#company");
let sendUser = document.querySelector("#sendUser");
let getUser = document.querySelector("#getUser");

console.log(name);
let cards = document.querySelector(".cards");

getUser.addEventListener("click", () => {
    axios(url).then(res => console.log(res))
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // отрезаю все, что больше 9 индекса
        data.splice(10);
        return data;
    })
    .then(data => {
        cards.innerHTML = '';
        data.forEach(el => {
            const user = {
                name: el.name,
                city: el.address.city,
                phone: el.phone,
                company: el.company.name,
            }
            // добавляем карточку
            const card = document.createElement("div");
            card.classList.add("card");
            cards.append(card);
            // заголовок
            const h2 = document.createElement("h2");
            h2.classList.add("name");
            h2.innerHTML = user.name;
            card.append(h2);
            // город
            const city = document.createElement("p");
            city.classList.add("city");
            city.innerHTML = user.city;
            card.append(city);
            // телефон
            const phone = document.createElement("p");
            phone.classList.add("phone");
            phone.innerHTML = user.phone;
            card.append(phone);
            // компанию
            const company = document.createElement("p");
            company.classList.add("company");
            company.innerHTML = user.company;
            card.append(company);


        });
    })

    
})

sendUser.addEventListener("click", (e) => {
    const data = {name: name, city, phone, company};
    for (let key in data) {
        console.log(data[key].value);
        if (data[key].value == "") {
            // alert(`Введите данные в поле data[key]`) // - почему не работает?
            alert("Заполните все поля!")
            
        }
    }
    // console.dir(data);

    const user = {
        "id": 1,
        "name": data[name].value,
        "username": "no data",
        "email": "no data",
        "address": {
            "street": "no data",
            "suite": "no data",
            "city": data[city].value,
            "zipcode": "no data",
            "geo": {
                "lat": "no data",
                "lng": "no data"
            }
        },
        "phone": data[phone].value,
        "website": "no data",
        "company": {
        "name": data[company].value,
        "catchPhrase": "no data",
        "bs": "no data"
        }
    }
    // console.log(user);
})