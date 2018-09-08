
/// ::: Header :::

// Main Header
mainHeader = document.querySelector('#mainHeader');
logo = document.querySelector('#mainHeader #logo');
sBox = document.querySelector('#searchBox');
sInput = document.querySelector('#searchBox input');
sClose = document.querySelector('#searchCloseBtn');

sBox.addEventListener('click', openSearchBox);
sClose.addEventListener('click', closeSearchBox);

minWidthLogoOff = 520;
window.addEventListener('resize', function(){
    if(searchBox.className == 'search-open'){
        if(mainHeader.offsetWidth < minWidthLogoOff){
            offsetLeft = minWidthLogoOff - mainHeader.offsetWidth;
            logo.style.left = "-"+offsetLeft+"px";
        } else {
            logo.style.left = "20px";
        }
    } else {
        logo.style.left = "20px";
    }
    // For SubHeader
    scrollArrowButtons();
});

sInput.addEventListener("focusout", closeSearchBox);

function openSearchBox() {
    sBox.className = 'search-open';

    if(mainHeader.offsetWidth < minWidthLogoOff){
        offsetLeft = minWidthLogoOff - mainHeader.offsetWidth;
        logo.style.left = "-"+offsetLeft+"px";
    }

    sInput.focus();
    sInput.value = sInput.value;

    sBox.removeEventListener('click', openSearchBox);
    setTimeout(() => {
        sClose.addEventListener('click', closeSearchBox);
        sInput.focus();
    }, 100);
}
function closeSearchBox() {
    sBox.className = 'search-close';
    logo.style.left = "20px";
    sClose.removeEventListener('click', closeSearchBox);
    setTimeout(() => {
        sBox.addEventListener('click', openSearchBox);
    }, 100);
}
// Sub Header

subHeader = document.querySelector('#subHeader');
subHeaderMenu = document.querySelector('#subHeader ul');
leftBtn = document.querySelector('#subHeader #leftScrollButton');
rightBtn = document.querySelector('#subHeader #rightScrollButton');


window.addEventListener('load', scrollArrowButtons());

function scrollArrowButtons(){

    leftOffset = parseInt(subHeaderMenu.style.left);

    if(subHeaderMenu.offsetWidth > subHeader.offsetWidth){
        rightBtn.style.display = "block";
        if(leftOffset >= 0){
            leftBtn.style.display = "none";
        }
        if(leftOffset < 0){
            leftBtn.style.display = "block";
        }
        if((subHeader.offsetWidth+Math.abs(leftOffset)) >= subHeaderMenu.offsetWidth){
            rightBtn.style.display = "none";
        }
    } else {
        leftBtn.style.display = "none";
        rightBtn.style.display = "none";
        subHeaderMenu.style.left = "0px";
    }
}

leftBtn.addEventListener('click', function(){
    console.log(subHeaderMenu.offsetLeft);
    if((subHeaderMenu.offsetLeft+150) > 0){
        subHeaderMenu.style.left = 0+"px";
        subHeaderMenu.offsetLeft = 0;
    } else {
        subHeaderMenu.style.left = (subHeaderMenu.offsetLeft+150)+"px";
        subHeaderMenu.offsetLeft = (subHeaderMenu.offsetLeft+150);
    }
    scrollArrowButtons();
});

rightBtn.addEventListener('click', function(){
    subHeaderMenu.style.left = (subHeaderMenu.offsetLeft-150)+"px";
    subHeaderMenu.offsetLeft = (subHeaderMenu.offsetLeft-150);
    scrollArrowButtons();
});

// Scrolling visible function

currentScroll = 0;
document.addEventListener("scroll", function(){
    newScroll = document.body.scrollTop || document.documentElement.scrollTop;
    if(newScroll > currentScroll && newScroll > 80){
        subHeader.style.top = "-60px";
    } else {
        subHeader.style.top = "60px";
    }
    currentScroll = newScroll;
});