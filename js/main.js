// box inf
let boxinf = document.getElementById('inf');
let infBtn = document.getElementById('infBtn');
let bgBlur = document.getElementById('bgBlur');
let changeBg = document.getElementById('changeBgImg');






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





//------------------------------------------------







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
            document.body.style.backgroundImage = "url('../img/background/bg1.jpg')"; // پیش‌فرض گوشی
        } else {
            document.body.style.backgroundImage = "url('../img/background/bg2.jpg')"; // بعد از کلیک
        }
    } else {
        // --- تنظیمات سایز کامپیوتر ---
        if (bgNumber == 1) {
            document.body.style.backgroundImage = "url('../img/background/bgPC2.jpg')"; // پیش‌فرض کامپیوتر
        } else {
            document.body.style.backgroundImage = "url('../img/background/bgPC1.jpg')"; // بعد از کلیک
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
