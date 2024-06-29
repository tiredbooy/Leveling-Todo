document.addEventListener("DOMContentLoaded", () => {
  const showPassIcon = document.querySelector(".eye");
  const emailInput = document.getElementById('email')
  const signUpBtn = document.querySelector(".signUp-btn");
  const passwordInput = document.querySelector(".password-input");
  const userNameInput = document.getElementById('username');
  const welcomeContainer = document.querySelector(".welcome-container");
  const welcomeContainerText = document.querySelector('.text');
  const welcomeBtn = document.querySelector('.welcome-btn');
  
    function saveItemToLocalStorage(email,username){
        
        let obj = {
            email : email,
            username : username,
        }
        localStorage.setItem('userData',JSON.stringify(obj));
        // console.log(obj)
    }

  showPassIcon.addEventListener("click", () => {
    if (showPassIcon.classList.contains("fa-eye")) {
      showPassIcon.classList.remove("fa-eye");
      showPassIcon.classList.add("fa-eye-slash");
      passwordInput.type = 'text';
    } else {
      showPassIcon.classList.remove("fa-eye-slash");
      showPassIcon.classList.add("fa-eye");
      passwordInput.type = 'password';
    }
  });

  signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(passwordInput.value !== "" && userNameInput.value !== ""){
        welcomeContainer.style.display = 'block';
        welcomeContainerText.textContent = `Welcome ${userNameInput.value}`;
        saveItemToLocalStorage(emailInput.value,userNameInput.value)

        passwordInput.value = "";
        userNameInput.value = "";
        emailInput.value = "";
    }else{
        alert('Please fill in all the fields');
    }
  });

  welcomeBtn.addEventListener('click',() => {
    welcomeContainer.style.display = 'none';
    window.location.href = '../../index.html';
})
});

