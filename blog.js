var allPosts = [];
var allusersData = [];
function carregarDados() {
    fetch("https://jmrfrosa.github.io/edit-jsts-dec2023.github.io/data/posts.json")
        .then(function (response) { return response.json(); })
        .then(function (postsData) {
        fetch("https://jmrfrosa.github.io/edit-jsts-dec2023.github.io/data/users.json")
            .then(function (response) { return response.json(); })
            .then(function (usersData) {
            displayPostsDetails(postsData, usersData);
            allusersData = usersData;
        })
            .catch(function (error) { return console.error("Erro ao carregar users.json:", error); });
    })
        .catch(function (error) { return console.error("Erro ao carregar posts.json:", error); });
}
function findUserNameById(userId, usersData) {
    var user = usersData.find(function (user) { return user.id === userId; });
    return user ? user.name : "Usuário não encontrado";
}
function findUserProfilePicById(userId, usersData) {
    var user = usersData.find(function (user) { return user.id === userId; });
    return user ? user.picture : "default.jpg";
}
function displayPostsDetails(postsData, usersData) {
    allPosts = postsData;
    var postList = document.getElementById("postList");
    postsData.reverse();
    postsData.forEach(function (post) {
        var formattedDate = new Date(post.createdAt).toLocaleString("pt", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
        var postElement = document.createElement("li");
        postElement.classList.add("post");
        postElement.innerHTML = "\n        <h3>".concat(post.title, "</h3>\n        <p><strong>Data de cria\u00E7\u00E3o:</strong> ").concat(formattedDate, "</p>\n        <p>").concat(post.body, "</p>\n        <p><strong>Likes:</strong> ").concat(post.likes.length, "</p>\n        <p><strong>N\u00FAmero de coment\u00E1rios:</strong> ").concat(post.comments.length, "</p>\n        <p><strong>Coment\u00E1rios:</strong></p>\n        <ul style=\"list-style: none; padding-left: 0;\">\n          ").concat(post.comments
            .map(function (comment) { return "\n                <li style=\"display: flex; align-items: center; margin-bottom: 10px;\">\n                  <img src=\"".concat(findUserProfilePicById(comment.userId, usersData), "\" alt=\"Foto de perfil\" style=\"width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;\">\n                  <span>").concat(findUserNameById(comment.userId, usersData), ": ").concat(comment.body, "</span>\n                </li>"); })
            .join(""), "\n        </ul>\n        <hr>\n      ");
        postList === null || postList === void 0 ? void 0 : postList.insertBefore(postElement, postList.firstChild);
    });
}
function criarBarraPesquisa() {
    var postCount = document.createElement("div");
    postCount.setAttribute("id", "postCount");
}
function searchPosts() {
    var input = document.getElementById("searchInput");
    var searchText = input.value.trim().toLowerCase();
    fetch("https://jmrfrosa.github.io/edit-jsts-dec2023.github.io/data/posts.json")
        .then(function (response) { return response.json(); })
        .then(function (postsData) {
        var filteredPosts = allPosts.filter(function (post) {
            return post.title.toLowerCase().includes(searchText);
        });
        var sortedPosts = filteredPosts.sort(function (a, b) {
            return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        });
        var postCount = document.getElementById("postCount");
        if (postCount) {
            postCount.innerHTML = "".concat(sortedPosts.length, " posts encontrados");
        }
        var postList = document.getElementById("postList");
        if (postList) {
            postList.innerHTML = "";
            sortedPosts.forEach(function (post) {
                var formattedDate = new Date(post.createdAt).toLocaleString("pt", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });
                var postElement = document.createElement("li");
                postElement.innerHTML = "\n              <h2>".concat(post.title, "</h2>\n              <p><strong>Data de cria\u00E7\u00E3o:</strong> ").concat(formattedDate, "</p>\n              <p>").concat(post.body, "</p>\n              <p><strong>Likes:</strong> ").concat(post.likes.length, "</p>\n              <p><strong>N\u00FAmero de coment\u00E1rios:</strong> ").concat(post.comments.length, "</p>\n              <p><strong>Coment\u00E1rios:</strong></p>\n              <ul style=\"list-style: none; padding-left: 0;\">\n                ").concat(post.comments
                    .map(function (comment) { return "\n                      <li style=\"display: flex; align-items: center; margin-bottom: 10px;\">\n                        <img src=\"".concat(findUserProfilePicById(comment.userId, allusersData), "\" alt=\"Foto de perfil\" style=\"width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;\">\n                        <span>").concat(findUserNameById(comment.userId, allusersData), ": ").concat(comment.body, "</span>\n                      </li>"); })
                    .join(""), "\n              </ul>\n              <hr>\n            ");
                postList.appendChild(postElement);
            });
            if (sortedPosts.length === 0) {
                var noResultsElement = document.createElement("li");
                noResultsElement.textContent = "Nenhum resultado encontrado.";
                postList.appendChild(noResultsElement);
            }
        }
    })
        .catch(function (error) { return console.error("Erro ao carregar posts.json:", error); });
}
function criarPost() {
    var postTitle = document.getElementById("postTitle")
        .value;
    var postContent = document.getElementById("postContent").value;
    var newPost = {
        title: postTitle,
        body: postContent,
        userId: 101,
        createdAt: new Date().toISOString(),
        likes: [],
        comments: [],
    };
    displayNewPost(newPost);
}
function displayNewPost(post) {
    allPosts.unshift(post);
    var postList = document.getElementById("postList");
    var formattedDate = new Date(post.createdAt).toLocaleString("pt", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    var postElement = document.createElement("li");
    postElement.classList.add("post");
    postElement.innerHTML = "\n        <h3>".concat(post.title, "</h3>\n        <p><strong>Data de cria\u00E7\u00E3o:</strong> ").concat(formattedDate, "</p>\n        <p>").concat(post.body, "</p>\n        <p><strong>Likes:</strong> ").concat(post.likes.length, "</p>\n        <p><strong>N\u00FAmero de coment\u00E1rios:</strong> ").concat(post.comments.length, "</p>\n        <hr>\n      ");
    postList === null || postList === void 0 ? void 0 : postList.prepend(postElement);
}
document.addEventListener("DOMContentLoaded", function () {
    carregarDados();
    criarBarraPesquisa();
});
