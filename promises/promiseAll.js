const urlPosts = "https://jsonplaceholder.typicode.com/posts";
const urlUsers = "https://jsonplaceholder.typicode.com/users";
let userNames = [];
let posts = [];
let userPosts = [];

const getUserNames = axios.get(urlUsers)
    .then(res => {
        res.data.forEach((el,i) => {
            userNames[i] = {id: el.id, name: el.name }
        })
        return userNames;
    })

const getPosts = axios.get(urlPosts)
    .then(res => {
        res.data.forEach((el, i) => {
            posts[i] = {id: el.id, text: el.body}
        })
        return posts;
    })

Promise.all([getUserNames, getPosts])
.then(values => {
    [userNames, posts] = values;
    (userNames.length < posts.length) ? posts.splice(userNames.length) : userNames.splice(posts.slice);
    
    for(let i = 0, ln = userNames.length; i < ln; i++) {
        userPosts.push(Object.assign(userNames[i], posts[i]))
    }
    return userPosts;
}).then(data => {
    console.log(data);
})



// Я мог бы сделать импорт axios без html-файла??