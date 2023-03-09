/* DOM */
let responseMessages = document.getElementById("responseMessages");
/* API */
const registerAPI = 'https://web-2-backend-22-23-batuhanayazz.onrender.com/register';

document.getElementById("registerForm").addEventListener('submit', (event) => {
event.preventDefault()
let user = {}
user.username = document.getElementById("signUpUserName").value;
user.email = document.getElementById("signUpEmail").value;
user.password = document.getElementById("signUpPassword").value;
password2 = document.getElementById("signUpPassword2").value;
responseMessages.innerHTML = `<p><img src="https://iili.io/Ho2Me3u.gif" alt=""></p>`;
if(user.password == password2){
   postRegister(registerAPI, "POST", user).then(data =>{
        if(data.message == 'Email Already exist! Please use another mail.'){
            responseMessages.innerHTML = '<p>Email Already exist! Please use another mail.</p>';
            responseMessagesFade();
        }else if(data.message == 'Fill all required fields.'){
            responseMessages.innerHTML = '<p>Please fill all fields correctly.</p>';
            responseMessagesFade();
        }else{
            responseMessages.innerHTML = `<p style="color:#007a4d">${user.username} Successfully created a account please login.</p>`;
            responseMessagesFade();
        }
    });
} else {
    responseMessages.innerHTML = '<p>Password not match.</p>';
    responseMessagesFade()
}
});

function responseMessagesFade(){
    responseMessages.classList.add("fade-in")
    setTimeout(()=>{
        responseMessages.classList.remove("fade-in")
        responseMessages.classList.add("fade-out")
      }, 4000, responseMessages.classList.remove("fade-out")); 
}

async function postRegister(url,method,data) {
    const response = await fetch(url,{
        method: method,
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
        return await response.json();
};