let user = sessionStorage.getItem('user');
let catalogMessage = document.getElementById('catalogMessage');
if (user) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById('loginIcon').className = 'bx bx-log-out icon';
    document.getElementById('loginText').innerText = 'Logout';
    document.getElementById('accountContainer').style.display = "none";
    document.getElementById("cardCollection").style.display = "block";
    document.getElementById("searchTerm").style.display = "flex";
    document.getElementById("tags").style.display = "flex";

    document.getElementById("bottom-content").insertAdjacentHTML("afterbegin",
        `
    <li class="" id="user">
    <a class="active">
        <i class='bx bx-user icon'></i>
        <span class="text nav-text">${user.username}</span>
    </a>
    </li>
    `
    );
    document.getElementById("logout").addEventListener('click', (event) => {
        event.preventDefault()
        catalogMessage.innerHTML = `<p style="background-color: #007a4d">${user.username} Successfully Logout. Sending Login page...</p>`;
        responseMessagesFade()
        setTimeout(() => {
            sessionStorage.removeItem('user');
            window.location.reload();
        }, 3000);
    });
} else {
    document.getElementById("stockHTML").addEventListener('click', (event) => {
        event.preventDefault();
        catalogMessage.innerHTML = `<p style="background-color: red">You need login first</p>`;
        responseMessagesFade()
    });
}

function responseMessagesFade() {
    catalogMessage.classList.add("fade-in")
    setTimeout(() => {
        catalogMessage.classList.remove("fade-in")
        catalogMessage.classList.add("fade-out")
    }, 2000, catalogMessage.classList.remove("fade-out"));
}