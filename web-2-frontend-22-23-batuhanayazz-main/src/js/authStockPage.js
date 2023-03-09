let user = JSON.parse(sessionStorage.getItem('user'));

if(user){
    document.getElementById('loginIcon').className = 'bx bx-log-out icon';
    document.getElementById('loginText').innerText = 'Logout';
    document.getElementById("cardCollection").style.display = "block";

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
        setTimeout(()=>{
            sessionStorage.removeItem('user');
            window.location.href = "./index.html";
          }, 3000); 
        });
}

function responseMessagesFade(){
    catalogMessage.classList.add("fade-in")
    setTimeout(()=>{
        catalogMessage.classList.remove("fade-in")
        catalogMessage.classList.add("fade-out")
      }, 2000, catalogMessage.classList.remove("fade-out")); 
}

