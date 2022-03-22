var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTermEl = document.querySelector("#repo-search-term");

// function for getting repo of user put in form
var GetUserRepos = function(user){
    //format the github api url 
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response){
        if(response.ok){
        console.log(response);
        response.json().then(function(data){
            displayRepos(data, user);
            console.log(response);
        });
    }else{
        alert("Error: Github User Not Found");
    }
    });
};

// submits user name from input box to access info of said user
var formSubmitHandler = function(event){
    event.preventDefault();

    //get value from input element
    var username = nameInputEl.value.trim();

    if(username){
        GetUserRepos(username);
        nameInputEl.value = "";
    }else{
        alert("Please enter a GitHub username")
    }
};

// Allow user to see response
var displayRepos = function(repos, searchTerm){
    console.log(repos);
    console.log(searchTerm);

    //clear old content
    repoSearchTermEl.textContent = "";
    repoSearchTermEl.textContent = searchTerm;

    //loop over repos
    for(var i = 0; i < repos.length; i++){
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0){
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else{
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to container
        repoEl.appendChild(statusEl);

        //append container to the dom
        repoContainerEl.appendChild(repoEl)
    }
}

userFormEl.addEventListener("submit",formSubmitHandler);
