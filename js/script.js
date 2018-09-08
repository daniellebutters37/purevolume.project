
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

currentScroll = 0;

document.addEventListener("scroll", function(){
    header = document.querySelector('#subHeader');
    newScroll = document.body.scrollTop || document.documentElement.scrollTop;
    if(newScroll > currentScroll && newScroll > 200){
        header.style.top = "-60px";
    } else {
        header.style.top = "60px";
    }
    currentScroll = newScroll;
});