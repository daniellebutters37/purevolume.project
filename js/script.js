sBox = document.querySelector('#searchBox');
sClose = document.querySelector('#searchCloseBtn');

sBox.addEventListener('click', openSearchBox);
sClose.addEventListener('click', closeSearchBox);

function openSearchBox() {
    sBox.className = 'search-open';
    sBox.removeEventListener('click', openSearchBox);
    setTimeout(() => {
        sClose.addEventListener('click', closeSearchBox);
    }, 100);
}
function closeSearchBox() {
    sBox.className = 'search-close';
    sClose.removeEventListener('click', closeSearchBox);
    setTimeout(() => {
        sBox.addEventListener('click', openSearchBox);
    }, 100);
}

currentScroll = 0;
document.addEventListener("scroll", function(){
    header = document.querySelector('#subHeader');
    newScroll = document.body.scrollTop || document.documentElement.scrollTop;
    if(newScroll > currentScroll && newScroll > 200){
        header.style.top = "-65px";
    } else {
        header.style.top = "65px";
    }
    currentScroll = newScroll;
});