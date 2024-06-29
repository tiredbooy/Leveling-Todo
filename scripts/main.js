"use strict";

const $ = document;
const inputBoxes = $.querySelectorAll(".task-input");
const addTaskBtns = $.querySelectorAll(".add-task");
const profilePicture = $.querySelector('.profile');
const menuWrapper = $.querySelector('.wrapper');
const themeSwitcher = $.querySelector('#theme-switcher');
const currentThemeImage = $.querySelector('#theme-img');
const bodyTag = $.querySelector('body');
const languageBtn = $.querySelector('.language-btn');
const languageBtnIcon = $.querySelector('.language-btn i');
const languageSelector = $.querySelector('.languages');
const navBar = $.querySelector('.nav-bar');
const signOutBtn = $.querySelector('.logOut')

// use button to create Task
addTaskBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const inputBoxValue = inputBoxes[index].value;

    if (inputBoxValue.trim() !== "") {
      createNewTask(inputBoxValue, index);
      inputBoxes[index].value = "";
    }
  });
});

// End of use button to create Task

// use Enter to create Task


inputBoxes.forEach((inputBox, index) => {
  inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const trimmedValue = inputBox.value.trim();
      if(trimmedValue){
        if(!IsDuplicateTask(trimmedValue,index)){
          createNewTask(trimmedValue, index);
          inputBox.value = ""; 
        }else if(bodyTag.classList.contains('eng')){
          alert('You have this task in this day already')
        }else if(bodyTag.classList.contains('per')){
          alert('شما این وضیفه را در این روز دارید')
        }
      }
    }
    
  });

});
// end of use Enter to create Task

// create Task section

  let taskArray = [];

  let isTask = false;
  let dupText;

  function IsDuplicateTask (taskText,index){
  let getTaskArray = JSON.parse(localStorage.getItem('taskArray')) || [];
  return getTaskArray.some(task => task.index === index && task.taskText === taskText);
}



  

  function createNewTask(taskText, index,isComplete = false) {
    
    if (taskText.trim() !== "") {
      let container = document.querySelectorAll(".card-body")[index];
  
      let taskCheckbox = document.createElement("input");
      taskCheckbox.setAttribute("type", "checkbox");
      taskCheckbox.id = "check-box";
      taskCheckbox.classList.add('dynamic-checkbox');
  
      let newTask = document.createElement("li");
      newTask.innerHTML = taskText;
  
      let removeIcon = document.createElement('i');
      removeIcon.className = 'fa-solid fa-xmark';
      removeIcon.addEventListener('click', () => {
        container.removeChild(taskItem);
        let id = taskObj.id;
        taskArray = taskArray.filter(task => task.id !== id);
        localStorage.setItem('taskArray', JSON.stringify(taskArray));
      });
  
      let taskItem = document.createElement("div");
      taskItem.classList.add("task");
      taskItem.append(removeIcon, newTask, taskCheckbox);
  
      container.append(taskItem);
  
  
  
      // Set the checkbox and task completion status
      taskCheckbox.checked = isComplete;
      if (isComplete) {
        taskItem.classList.add('completed');
      }
  
      taskCheckbox.addEventListener("change", () => {
        isComplete = taskCheckbox.checked;
        updateTaskStatus(taskText, isComplete, index);
      });
  
      let id = Math.floor(Math.random() * 100);
  
      let taskObj = {
          id: id,
          taskText: taskText.trim(),
          isComplete: isComplete,
          index: index,
      }
        
      if(isTask != true){
        taskArray.push(taskObj);
      }
      
      
      localStorage.setItem("taskArray", JSON.stringify(taskArray));
    }
  }
  


function updateTaskStatus(taskText, isComplete,index) {
  taskArray.forEach((task) => {
    if (task.taskText.toLowerCase() === taskText.toLowerCase()) {
      task.isComplete = isComplete;
      handelUserLevel(isComplete)
      const container = $.querySelectorAll(".card-body")[task.index];
      const taskItem = Array.from(container.querySelectorAll('.task')).find(
        item => item.querySelector('li').innerHTML === taskText
      );
      if(taskItem){
        if(isComplete){
          taskItem.classList.add('completed')
        }else{
          taskItem.classList.remove('completed')
        }
      }
    }
  });
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
}


function loadTasks() {
  const loadedTask = localStorage.getItem("taskArray");

  if (loadedTask) {
    const loadedTaskArray = JSON.parse(loadedTask);
    loadedTaskArray.forEach((task) => {
      createNewTask(task.taskText,task.index,task.isComplete)
    });
    taskArray = loadedTaskArray;
  }
}

loadTasks();
//end of load task from localStorage





//  wrapper menu dev
profilePicture.addEventListener('click',(e) => {
    e.preventDefault()
    menuWrapper.classList.toggle('active')
})

const mainPage = $.querySelector('main')  
mainPage.addEventListener('click',(e) => {
  if(menuWrapper.classList.contains('active')){
    menuWrapper.classList.remove('active')
  }
})

// end of wrapper menu dev


$.addEventListener('DOMContentLoaded',() => {
  if(bodyTag.classList.contains('light-theme')){
    currentThemeImage.src = "./assets/icon-moon.svg"
  }else{
    currentThemeImage.src = "./assets/icon-sun.svg"
  }
})

// them Switch
function switchTheme() {
  themeSwitcher.addEventListener('click',() => {

      if(currentThemeImage.getAttribute("src") === "./assets/icon-moon.svg"){
        currentThemeImage.setAttribute("src", "./assets/icon-sun.svg");
        bodyTag.classList.remove('light-theme');
        bodyTag.classList.add('dark-theme');
        localStorage.setItem('chakraUi', 'Dark');
      }else{
        currentThemeImage.setAttribute("src", "./assets/icon-moon.svg");
        bodyTag.classList.remove('dark-theme');
        bodyTag.classList.add('light-theme');
        localStorage.setItem('chakraUi', 'Light');
      }
  })
}

switchTheme();
// end of them Switch


// load theme
function loadTheme(){
  let currentThemeUi = localStorage.getItem('chakraUi');
  if(currentThemeUi == 'Dark'){
    bodyTag.classList.remove('light-theme');
    bodyTag.classList.add('dark-theme');
  }else{
    bodyTag.classList.remove('dark-theme');
    bodyTag.classList.add('light-theme');
  }
}

loadTheme();
//end of load theme


// handel Language
function language(){ 
  // adding click event on profile-icon in header
  languageBtn.addEventListener('click',() => {
    languageSelector.classList.toggle('active')
    if(languageBtnIcon.className == 'fa-solid fa-chevron-down'){
      languageBtnIcon.classList.remove('fa-solid','fa-chevron-down');
      languageBtnIcon.classList.add('fa-solid','fa-chevron-up');
    }else{
      languageBtnIcon.classList.remove('fa-solid','fa-chevron-up');
      languageBtnIcon.classList.add('fa-solid','fa-chevron-down');
    }
  })

  languageSelector.addEventListener('click',(e) => {
    if(e.target.classList == 'per-lang'){
      bodyTag.classList.replace('eng','per')
      localStorage.setItem('language', 'Persian');
      updateLang('Persian')
    }else{
      bodyTag.classList.replace('per','eng')
      localStorage.setItem('language', 'English');
      updateLang('English')
    }
  })

}

language()


function loadLanguage(){
  const loadedLanguage = localStorage.getItem('language');

  if(loadedLanguage == 'Persian'){
    bodyTag.classList.replace('eng','per')
    updateLang('Persian')
    

  }else if(loadedLanguage == 'English'){
    bodyTag.classList.replace('per','eng')
    updateLang('English')
  }
}

loadLanguage()


function updateLang(currentLang) {

  const cardHeaderTitle = $.querySelectorAll('.card-header-title');
  const cardHeaderDay = $.querySelectorAll('.card-header-time');

  const wrapperProfile = $.querySelector('.profile-btn');
  const wrapperCurrentLevel = $.querySelector('.currentLevel');
  const wrapperSetting = $.querySelector('.setting');
  const wrapperLogOut = $.querySelector('.logOut');

  const languageLang = $.querySelector('.language-btn span');
  const persianLanguage = $.querySelector('.per-lang');
  const englishLanguage = $.querySelector('.eng-lang');

  if(currentLang === 'English'){
    bodyTag.style.fontFamily = '"Poppins", sans-serif'
    bodyTag.style.fontSize = '1em'

    const englishDays = ['Sunday', 'Monday', 'Tuesday', 'Wensday', 'Thursday', 'Friday','Saturday'];
    cardHeaderTitle.forEach((title) => {
      title.innerHTML = 'Task';
  });

  cardHeaderDay.forEach((day, index) => {
      day.innerHTML = englishDays[index];
  });

  inputBoxes.forEach(input => {
    input.placeholder = 'New Task...'
  })

    wrapperProfile.innerHTML = 'Profile'
    wrapperCurrentLevel.innerHTML = 'currentLevel';
    wrapperSetting.innerHTML = 'Setting';
    wrapperLogOut.innerHTML = 'Log Out'

    languageLang.innerHTML = 'Language';
    persianLanguage.innerHTML = 'per';
    englishLanguage.innerHTML = 'eng';

  }
  // change the content language to persian if its was persian
  else if(currentLang === 'Persian'){
    bodyTag.style.fontFamily = '"Markazi Text", serif';
    bodyTag.style.fontSize = '1.2em'

    const persianDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌ شنبه', 'چهارشنبه', 'پنج‌ شنبه', 'جمعه'];

    cardHeaderTitle.forEach((title) => {
        title.innerHTML = 'تسک';
    });

    cardHeaderDay.forEach((day, index) => {
        day.innerHTML = persianDays[index];
    });

    inputBoxes.forEach(input => {
      input.placeholder = 'تسک جدید ...'
    })

    wrapperProfile.innerHTML = 'پروفایل'
    wrapperCurrentLevel.innerHTML = 'سطح کاربری';
    wrapperSetting.innerHTML = 'تنضیمات';
    wrapperLogOut.innerHTML = 'خروج'

    languageLang.innerHTML = 'زبان';
    persianLanguage.innerHTML = 'پارسی';
    englishLanguage.innerHTML = 'انگلیسی';

  }
}
//end of handel Language



// HANDEL THE USER LEVEL AND RANK

// E  D  C  B  A  S

let playerXp = 0;
let playerLevel = 1;
let playerRank = 'No Rank';

function handelUserLevel(isComplete) {
  if (isComplete == true) {
    playerXp += 1000;
    playerLevel = Math.floor(playerXp / 1000);

    if (playerLevel >= 1000) {
      playerRank = 'S Rank';
    }
    else if (playerLevel >= 700) {
      playerRank = 'A Rank';
    }
    else if (playerLevel >= 400) {
      playerRank = 'B Rank';
    }
    else if (playerLevel >= 150) {
      playerRank = 'C Rank';
    }
    else if (playerLevel >= 50) {
      playerRank = 'D Rank';
    }
    else if (playerLevel >= 10) {
      playerRank = 'E Rank';
    }else if(playerLevel >= 1){
      playerRank = 'No Rank';
    }

    
    
  }else{
    playerXp -= 1000;
  }
  let levelStat = {
    playerXp: playerXp,
    playerLevel: playerLevel,
    playerRank: playerRank
  }
  localStorage.setItem('levelStat', JSON.stringify(levelStat));

}

function loadUserLevel() {
  let getPlayerLevelStat = JSON.parse(localStorage.getItem('levelStat'));


  if(getPlayerLevelStat){
    playerXp = getPlayerLevelStat.playerXp;
    playerLevel = getPlayerLevelStat.playerLevel;
    playerRank = getPlayerLevelStat.playerRank;
  }

  let navRank = $.querySelector('.level-tier');
  let wrapperLevel = $.querySelector('.currentLevel');

  navRank.innerHTML = playerRank;
  wrapperLevel.innerHTML = `Level ${playerLevel}`;


}

loadUserLevel()



//  userData
function loadUserData(){
    let loadedUserData = JSON.parse(localStorage.getItem('userInfo'));
    const profileImg = document.querySelector('#profile-img');

    if (loadedUserData) {
        profileImg.src = loadedUserData.img;
        // console.log(loadedUserData.img)
    }
}

loadUserData()


//  signOut Handeler
signOutBtn.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.removeItem('userData');
  window.location.href = './login-page/login.html';

});