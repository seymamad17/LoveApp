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



// ۱. همگام‌سازی وضعیت اولیه
if (passwordInput.type === "password") {
    // وقتی رمز مخفیه، آیکون چشم بسته رو نشون بده
    showPass.innerHTML = eyeClosedSVG.outerHTML; 
} else {
    // وقتی رمز معلومه، آیکون چشم باز رو نشون بده
    showPass.innerHTML = eyeOpenSVG.outerHTML;
}

// ۲. رویداد کلیک روی دکمه
showPass.addEventListener("click", (e) => {
    e.preventDefault(); 

    if (passwordInput.type === "password") {
        // می‌خواهیم رمز رو نشون بدیم، پس نوعش میشه متن و چشم باز میشه
        passwordInput.type = "text";
        showPass.innerHTML = eyeOpenSVG.outerHTML; 
    } else {
        // می‌خواهیم رمز رو مخفی کنیم، پس نوعش میشه پسورد و چشم بسته میشه
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



// متغیر تم (حالت ۱: پیش‌فرض / حالت ۲: تغییر یافته)
let bgNumber = 1;

// ۱. وقتی صفحه لود میشه تنظیمات رو از حافظه می‌خونیم
window.addEventListener("load", () => {
    bgNumber = localStorage.getItem("backgroundTheme") || 1;
    applyBackground();
});

// ۲. این بخش جدید و کلیدیه: وقتی کاربر صفحه رو بزرگ یا کوچیک می‌کنه به صورت زنده آپدیت میشه
window.addEventListener("resize", () => {
    applyBackground();
});

// ۳. تابع اصلی برای تنظیم عکس بر اساس سایز و ذخیره کاربر
function applyBackground() {
    const width = window.innerWidth;

    if (width <= 721) {
        // --- تنظیمات سایز گوشی ---
        if (bgNumber == 1) {
            document.body.style.backgroundImage = "url('bg1.jpg')"; // پیش‌فرض گوشی
        } else {
            document.body.style.backgroundImage = "url('bg2.jpg')"; // بعد از کلیک
        }
    } else {
        // --- تنظیمات سایز کامپیوتر ---
        if (bgNumber == 1) {
            document.body.style.backgroundImage = "url('bgPC2.jpg')"; // پیش‌فرض کامپیوتر
        } else {
            document.body.style.backgroundImage = "url('bgPC1.jpg')"; // بعد از کلیک
        }
    }
}

// ۴. کلیک روی دکمه برای تغییر و سیو کردن
changeBg.addEventListener("click", () => {
    // سوئیچ کردن بین حالت ۱ و ۲
    bgNumber = bgNumber == 1 ? 2 : 1;

    // ذخیره کردن انتخاب کاربر برای دفعات بعد
    localStorage.setItem("backgroundTheme", bgNumber);

    // اعمال تغییرات همون لحظه
    applyBackground();
});




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
                errorSpan.innerText = 'Login successful!';
                 window.location.href = 'tarikh.html';
                 
            } else {
                // اگر مشخصات همخوانی نداشت
                errorSpan.innerText = 'Username or password is incorrect.';
                
            }
        });
});
