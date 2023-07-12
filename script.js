//# solucion en https://www.codewithrandom.com/2022/08/22/github-profile-search-github-profile-search-using-html-css-javascript/?expand_article=1

//% para crear los elementos del dom https://www.youtube.com/watch?v=2Xm9P_tXtK8

const APIURL = "https://api.github.com/users/";
const search = document.getElementById("search");
const main = document.getElementById("main");

// async function getUser(username) {
//         try {
//                 const { data } = await axios(`${APIURL}${username}`);
//                 createUserCard(data);
//         } catch (err) {
//                 if (err.response.status == 404) {
//                         createErrorCard("No profile with this username");
//                 }
//         }
// }

// const  createUserCard=(user) => {
//         const userID = user.name || user.login;
//         console.log(userID);
// }

// const createErrorCard=(msg)=> {
//     const cardHTML = `
//         <div class="card">
//         <h1>${msg}</h1>
//         </div>
//         `;
//     main.innerHTML = cardHTML;
// }

// form.addEventListener("submit", (e) => {
//         e.preventDefault();
//         const user = search.value;
//         if (user) {
//             getUser(user);
//             search.value = "";
//         }
// });

async function getAllRequest(user) {
        await axios
                .get(`${APIURL}${user}`)
                .then((response) => {
                        //! Object.values(response) devuelve un array con los valores correspondientes a las propiedades enumerables de un objeto
                        // console.log(Object.values(response)[0]);
                        createCard(Object.values(response)[0]);
                })
                .catch((error) => console.log(error));
}

const createCard = (data) => {
        const main=document.getElementById('main');
        const userID = `${data.name} || ${data.login}`;
        const userBio = data.bio ? data.bio : "";
        const div=document.createElement('div');
        div.setAttribute('class','card');
        const divInside=document.createElement('div');
        const img=document.createElement('img');
        img.setAttribute('src',data.avatar_url),
        img.setAttribute('class','avatar')
        divInside.appendChild(img);
        div.appendChild(divInside);
        const divInsideTwo=document.createElement('div');
        divInsideTwo.setAttribute('class','user-info');
        const h2=document.createElement('h2');
        h2.textContent=userID;
        const p=document.createElement('p');
        p.textContent=userBio;
        const ul=document.createElement('ul');
        const liFollowers=document.createElement('li');
        liFollowers.textContent=`${data.followers} Followers`;
        const liFollowing=document.createElement('li');
        liFollowing.textContent=`${data.following} Following`;
        const liRepos=document.createElement('li');
        liRepos.textContent=`${data.public_repos} Repos`;
        ul.appendChild(liFollowers);
        ul.appendChild(liFollowing);
        ul.appendChild(liRepos)
        divInsideTwo.appendChild(h2);
        divInsideTwo.appendChild(p);
        divInsideTwo.appendChild(ul);
        div.appendChild(divInsideTwo);
        main.appendChild(div);
};

document.addEventListener("DOMContentLoaded", () => {
        search.addEventListener("keypress", (e) => {
                if (e.code === "Enter") {
                        e.preventDefault();
                        getAllRequest(search.value);
                        search.value = "";
                }
        });
});
