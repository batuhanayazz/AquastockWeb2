/* DOM */
const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

/* === Navigation Dark mode function === */
toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})
modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
        sessionStorage.setItem('Mode','dark')
    }else{
        modeText.innerText = "Dark mode";
        sessionStorage.removeItem('Mode')
    }
});
if(sessionStorage.getItem('Mode') == 'dark'){
    body.classList.toggle("dark");
}


