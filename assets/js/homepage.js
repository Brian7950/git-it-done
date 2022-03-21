var GetUserRepos = function(){
    console.log("function was called");
    fetch("https://api.github.com/users/octocat/repos");
};


GetUserRepos();