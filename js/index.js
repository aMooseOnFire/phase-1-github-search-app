document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#github-form");
    form.addEventListener("submit", (e) => { 
        e.preventDefault();
        let search = document.getElementById("search").value;
        fetch(`https://api.github.com/search/users?q=${search}`)
        .then((res) => res.json())
        .then((data) => {
            data.items.forEach((user) => {//iterate over each user in the list that matches the name searched
                let ul = document.getElementById("user-list"); //Get element with id user-list
                let li = document.createElement("li");// create li element
                let img = document.createElement("img"); //create img element
                let h5 = document.createElement("h5");// create h5 element
                let h4 = document.createElement("h4");//create h4 element
                let a = document.createElement("a"); //create a element
                let profile = document.createElement("View-profile");
                img.src = user.avatar_url;
                h4.innerText = user.login;
                a.href = user.html_url;
                h5.innerHTML = `${user.login}'s Repos`; //this will show the users repo
                a.appendChild(profile);
                li.appendChild(img)
                li.appendChild(h4)
                li.appendChild(a)
                li.appendChild(h5)
                ul.appendChild(li)
            });
        });
    })
})

function searchUser(e){
    e.preventDefault()
    let newUser={
        search: e.target.search.value
    }

    queryUser(newUser)
}

function queryUser(data){
    fetch(`https://api.github.com/users/${data.search}`,{
        method: 'GET',
        headers: {
            'Accept': 'application / vnd.github.v3 + json'
        },
     
    }).then(response => response.json()).then(data => showUsers(data))

}

function showUsers(user){
    const li=document.createElement('li')
    li.className='card'
    li.innerHTML=`
        <div class="card-header">
        <img id="user_image" src="${user.avatar_url}">
        </div>
        <div class="card-body">
        <h3>Username: ${user.login}</h3>
        <hr>
        <h5>Followers: ${user.followers}</h5>
        <hr>
        <h5>Following: ${user.following}</h5>
        <hr>
        <p>Joined on: ${user.created_at}</p>
        <hr>
        <button class="btn-sm btn btn-success" id="user_repos">Repos</button>
        </div>
    `
    li.querySelector('#user_repos').addEventListener('click', () => {
        const url = user.repos_url
        userRepos(url)
    })

    document.querySelector('#user-list').appendChild(li)

}

function userRepos(url){
    fetch(url).then(response=>response.json()).then(data=>data.forEach(repos=>allRepos(repos)))
}

function allRepos(repos) {
    console.log(repos);
    const li = document.createElement('li')
    li.className = 'card'
    li.innerHTML = `
        <div class="card-body">
        <h5>Name:<a id="repo_name" href="${repos.html_url}">${repos.name}</a> </h5>
        </div>
    `
    document.querySelector('#repos-list').appendChild(li)

}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('#github-form').addEventListener('submit', searchUser)
   
})