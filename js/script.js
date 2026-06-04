let showPass = document.getElementById('showPass');
var passwordInput = document.getElementById('Ipass');
var loginButton = document.getElementById('btn');
var usernameInput = document.getElementById('Itext');
let Erorrs = document.getElementById('Erorrs');
let infBtn = document.getElementById('infBtn');
let boxinf = document.getElementById('inf');
let textBtnInf = document.getElementById('textBtnInf');
let changeBg = document.getElementById('changeBgImg');
let bgBlur = document.getElementById('bgBlur');
let eyeOpenSVG = document.getElementById('svg-eye-show');
let eyeClosedSVG = document.getElementById('svg-eye-close');
let loadingGIF = document.getElementById('loadingGIF');
let svgSettings = document.getElementById('svg-settings');



// ۱. همگام‌سازی وضعیت اولیه
if (passwordInput.type === "password") {
    // وقتی رمز مخفیه، آیکون چشم بسته رو نشون بده
    showPass.innerHTML = eyeClosedSVG.outerHTML; 
} else {
    // وقتی رمز معلومه، آیکون چشم باز رو نشون بده
    showPass.innerHTML = eyeOpenSVG.outerHTML;
}


showPass.addEventListener("click", (e) => {
    e.preventDefault();

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        showPass.innerHTML = eyeOpenSVG.outerHTML; 
    } else {

        passwordInput.type = "password";
        showPass.innerHTML = eyeClosedSVG.outerHTML; 
    }
});








document.addEventListener("keydown", (event)=>{

    if(event.key === 'ArrowDown')
    {
        passwordInput.focus();
    }

});

document.addEventListener("keydown", (event)=>{

    if(event.key === "ArrowUp")
    {
        usernameInput.focus();
    }

});

document.addEventListener("keydown", (event)=>{

    if(event.key === "Delete")
    {
        usernameInput.value = "";
        passwordInput.value = "";
    }

});

document.addEventListener("keydown", (event)=>{

    if(event.key === "Enter")
    {
        loginButton.focus();
    }

});





// box inf

infBtn.addEventListener("click", ()=>{

    if(boxinf.style.opacity === "1")
    {
        boxinf.style.opacity = "0";
        boxinf.style.visibility = "hidden";
        
        
        
    }else{
        boxinf.style.opacity = "1";
        boxinf.style.visibility = "visible";
        boxinf.style.transform = "translateX(0%)";
        infBtn.style.visibility = "hidden";
        bgBlur.style.transform = "translateX(0%)";
        
    }

});


bgBlur.addEventListener("click", () =>{
    boxinf.style.transform = "translateX(-100%)";
    boxinf.style.visibility = "hidden";
    boxinf.style.opacity = "0";
    bgBlur.style.transform = "translateX(100%)";
    bgBlur.style.transform = "0";
    infBtn.style.visibility = "visible";
    
});




//----------------------------------------------








//----------------------------------------------
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});
//------------------------------------






// تنظیمات اتصال به سوپابیس
var SUPABASE_URL = 'https://oapwyxpogshpjqaplwhv.supabase.co';
var SUPABASE_KEY = 'sb_publishable_4SHK3DtrXBZwL1UwKKT_Jg_ukn4TSeV';

// راه‌اندازی کلاینت سوپابیس
var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// انتخاب دکمه لاگین فرم


// رویداد کلیک دکمه ورود
loginButton.addEventListener('click', function () {
    var usernameInput = document.getElementById('Itext').value;
    var passwordInput = document.getElementById('Ipass').value;
    var errorSpan = document.getElementById('Erorrs');

    // پاک کردن خطاهای قبلی در هر بار کلیک
    errorSpan.innerText = '';


    // بررسی خالی نبودن اینپوت‌ها
    if (usernameInput === '' || passwordInput === '') {
        errorSpan.innerText = 'Incorrect username or password';
        loadingGIF.style.display = "none";
        return;
        
    }


    // بررسی اطلاعات در جدول سوپابیس
    supabase
        .from('users')
        .select('*')
        .eq('username', usernameInput)
        .eq('password', passwordInput)
        .then(function (response) {
            // بررسی خطای احتمالی شبکه یا سرور
            if (response.error) {
                errorSpan.innerText = 'Server connection error, try again.';
                console.error(response.error);
                return;
            }


            // اگر ردیفی با این مشخصات پیدا شد
            if (response.data.length > 0) {
                loadingGIF.style.display = "flex";
                loginButton.value = '';
                errorSpan.innerText = 'Login successful!';
                window.location.href = 'html/main.html';
                
            } else {    
                // اگر مشخصات همخوانی نداشت
                errorSpan.innerText = 'Username or password is incorrect.';

            }
        });
});