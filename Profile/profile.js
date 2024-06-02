const $ = document;
const profileImgUploader = $.querySelector('#file-upload');
const profileImg = $.querySelector('.profile-img');
const userNameInput = $.querySelector('#user-name');
const submitBtn = $.querySelector('#save-change');
const bodyTag = $.querySelector('body')


profileImgUploader.addEventListener('change', () => {
    let uploaderValueSrc = profileImgUploader.value;

    if(uploaderValueSrc){
        profileImg.style.display = 'block';
        $.querySelector('.custom-file-upload').style.visibility = 'hidden';
        profileImg.src = URL.createObjectURL(profileImgUploader.files[0]);
        x = uploaderValueSrc;
    }
    addToLocalStorage();
});

userNameInput.addEventListener('change',() => {
    y = userNameInput.value;
    addToLocalStorage();
});

function addToLocalStorage(){
    submitBtn.addEventListener('click',() => {
        let userInfoObj = {
            name : y,
            img : x,
        }
        localStorage.setItem('userInfo',JSON.stringify(userInfoObj));
    });
};


function loadItemsFromLocal () {
    let loadTheme = localStorage.getItem('chakraUi');
    let loadLang = localStorage.getItem('language');
    let loadLevelStat = localStorage.getItem('levelStat');
    let loadTask = localStorage.getItem('taskArray');

    if(loadTheme == 'Dark'){
        bodyTag.classList.remove('light');
        bodyTag.classList.add('dark');
    }else{
        bodyTag.classList.remove('dark');
        bodyTag.classList.add('light');
    }

    if(loadLang == 'English'){
        bodyTag.classList.remove('per');
        bodyTag.classList.add('eng');
    }else{
        bodyTag.classList.remove('eng');
        bodyTag.classList.add('per');
    }

    function handelLang(x){
        if(bodyTag.classList.contains('eng')){
            bodyTag.style.fontFamily = '"Poppins", sans-serif'
            bodyTag.style.fontSize = '1em'
            return;
        }else{
            bodyTag.style.fontFamily = '"Markazi Text", serif';
            bodyTag.style.fontSize = '1.2em'

            userNameInput.placeholder = 'نام  کاربری ...';
            submitBtn.innerHTML = 'ذخیره';
            $.querySelector('.custom-file-upload').innerHTML = 'انتخاب تصویر';
            $.querySelector('.completed-task').innerHTML = `شما ${x} تسک کامل کردید`

        }
    }

    handelLang()

    if(loadLevelStat){
        let levelStat = JSON.parse(loadLevelStat);
        $.querySelector('.level').innerHTML = `Level ${levelStat.playerLevel}`;
        $.querySelector('.xp').innerHTML = `${levelStat.playerXp} Xp`;
    };

    if(loadTask){
        let taskArray = JSON.parse(loadTask);
        let trueCount = taskArray.filter(e => e.isComplete === true).length;
        $.querySelector('.completed-task').innerHTML = `You Completed ${trueCount} Task`;
        handelLang(trueCount)
    }
}

loadItemsFromLocal();