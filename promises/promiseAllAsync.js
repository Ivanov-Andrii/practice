


const urlPosts = "https://jsonplaceholder.typicode.com/posts";
const urlUsers = "https://jsonplaceholder.typicode.com/users";
let userNames = [];
let posts = [];
let userPosts = [];

// const getUserNames = axios.get(urlUsers)
//     .then(res => {
//         res.data.forEach((el,i) => {
//             userNames[i] = {id: el.id, name: el.name }
//         })
//         return userNames;
//     })

const getUserNames = async (urlUsers) => {
    const res = await axios.get(urlUsers);
    res.data.forEach((el,i) => {
        userNames[i] = {id: el.id, name: el.name }
    })
    return userNames;
}

// console.log(getUserNames(urlUsers));

// const getPosts = axios.get(urlPosts)
//     .then(res => {
//         res.data.forEach((el, i) => {
//             posts[i] = {id: el.id, text: el.body}
//         })
//         return posts;
//     })

const getPosts = async (urlPosts) => {
    try {
        const res = await axios.get(urlPosts);
        res.data.forEach((el, i) => {
            posts[i] = {id: el.id, text: el.body}
        })
        return posts;
    }
    catch (e) {
        console.log(e)
    }

}

// getPosts(urlPosts)
// console.log(getPosts(urlPosts));

const getNewObj = async () => {
    const allArrays = await Promise.all([getUserNames(urlUsers), getPosts(urlPosts)])
        // .then(values => {
        //     [userNames, posts] = values;
        //     (userNames.length < posts.length) ? posts.splice(userNames.length) : userNames.splice(posts.slice);
        //
        //     for(let i = 0, ln = userNames.length; i < ln; i++) {
        //         userPosts.push(Object.assign(userNames[i], posts[i]))
        //     }
        //     return userPosts;
        // }).then(data => {
        console.log(allArrays);
    // })
}

getNewObj()

// Я мог бы сделать импорт axios без html-файла??