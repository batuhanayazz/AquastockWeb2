/* API */
const loginAPI = 'https://web-2-backend-22-23-batuhanayazz.onrender.com/login';

document.getElementById("loginForm").addEventListener('submit', (event) => {
    event.preventDefault()
    let user = {}
    user.email = document.getElementById("loginEmail").value;
    user.password = document.getElementById("loginPassword").value;
    responseMessages.innerHTML = `<p><img src="https://iili.io/Ho2Me3u.gif" alt=""></p>`;
    postLogin(loginAPI, "POST", user).then(result => {
        if (result.status == 'Bad Request') {
           responseMessages.innerHTML = `<p>${result.message}</p>`;
            responseMessagesFade()
            console.log(result)
        } else {
            sessionStorage.setItem('user', JSON.stringify(result.data))
            console.log(result.data)
            responseMessages.innerHTML = `<p style="color:#007a4d">Welcome ${result.data.username}. We are sending you to the fish catalogs... </p>`;
            responseMessagesFade()
            setTimeout(()=>{
                window.location.reload();
              },4000); 
        }
    });
});

function responseMessagesFade(){
    responseMessages.classList.add("fade-in")
    setTimeout(()=>{
        responseMessages.classList.remove("fade-in")
        responseMessages.classList.add("fade-out")
      }, 4000, responseMessages.classList.remove("fade-out")); 
}

async function postLogin(url, method, data) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
};
