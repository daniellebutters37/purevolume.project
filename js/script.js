
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
    if(document.querySelector('#storyThumbsLine') != null){
        storyScrollButtons();
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

// ::: Sub Header :::

subHeader = document.querySelector('#subHeader');
subHeaderMenu = document.querySelector('#subHeader ul');
leftBtn = document.querySelector('#subHeader #leftScrollButton');
rightBtn = document.querySelector('#subHeader #rightScrollButton');


window.addEventListener('load', function(){
    scrollArrowButtons();
    if(document.querySelector('#storyThumbsLine') != null){
        storyScrollButtons();
    }
});

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

// Main Content
if(document.querySelector('#storyThumbsLine') != null){
    storyThumbs = document.querySelector('#articleThumbs');
    storyThumbsRow = document.querySelector('#storyThumbsLine > div');
    offSet = storyThumbsRow.style.marginLeft;
    storyThumbsLeftBtn = document.querySelector('#storyThumbsLine #leftStoryScrollButton');
    storyThumbsRightBtn = document.querySelector('#storyThumbsLine #rightStoryScrollButton');
    
    storyThumbsLeftBtn.addEventListener('click', function(){

        if((offSet+subHeader.offsetWidth) > 0){
            storyThumbsRow.style.marginLeft = 0+"px";
        } else {
            storyThumbsRow.style.marginLeft = (offSet+subHeader.offsetWidth)+"px";
        }
        storyScrollButtons();
    });

    storyThumbsRightBtn.addEventListener('click', function(){
        offSet = (storyThumbsRow.offsetLeft-subHeader.offsetWidth);
        
        if((subHeader.offsetWidth+Math.abs(offSet)) >= storyThumbsRow.offsetWidth){
            storyThumbsRow.style.marginLeft = -(storyThumbsRow.offsetWidth-subHeader.offsetWidth)+"px";
        } else {
            storyThumbsRow.style.marginLeft = offSet+"px";
        }
        storyScrollButtons();
    });
}


function storyScrollButtons(){
    
    offSet = parseInt(storyThumbsRow.style.marginLeft);
    if(storyThumbsRow.offsetWidth > subHeader.offsetWidth){
        console.log(offSet);
        storyThumbsRightBtn.style.display = "block";
        if(offSet >= 0){
            storyThumbsLeftBtn.style.display = "none";
        }
        if(offSet < 0){
            storyThumbsLeftBtn.style.display = "block";
        }
        if((subHeader.offsetWidth+Math.abs(offSet)) >= storyThumbsRow.offsetWidth){
            storyThumbsRightBtn.style.display = "none";
            storyThumbsRow.style.marginLeft = -(storyThumbsRow.offsetWidth-subHeader.offsetWidth)+"px";
        }
    } else {
        storyThumbsLeftBtn.style.display = "none";
        storyThumbsRightBtn.style.display = "none";
        storyThumbsRow.style.left = "0px";
    }
}

if(document.querySelector('#videoBox') != null){

    videoBox = document.querySelector('#videoBox');
    playBtn = document.querySelector('#videoBox .play-icon');
    closeBtn = document.querySelector('#videoBox .playerClose');
    video = document.querySelector('#videoBox .video video');
    videoPlayer = document.querySelector('#videoBox .video');
    playPause = document.querySelector('#videoBox #playPause');
    volumeButton = document.querySelector('#videoBox .volumeButton');
    videoSeeker = document.querySelector('#videoBox #videoSeeker');
    volumeSeekerValue = 100;
    volumeSeeker = document.querySelector('#videoBox .volumeControl .slider');
    videoFullScreen = document.querySelector('#videoBox #videoFullScreen');

    videoSeekerUpdater = setInterval(() => {
        videoSeeker.value = (video.currentTime*100/video.duration);
    }, 200);

    playBtn.addEventListener('click', function(){
        videoBox.className = "open-lightBox";
        video.currentTime = 0;
        video.muted = false;
        document.body.style.overflowY = "hidden";
    });

    closeBtn.addEventListener('click', function(){
        if( window.innerHeight == screen.height) {
            fullscreenToggle();
        } else {
            videoBox.className = "";
            video.muted = true;
            video.play;
            document.body.style.overflowY = "scroll";
        }
    });
    
    playPause.addEventListener("click", function(){
        if(!video.paused){
            video.pause();
            playPause.querySelector('i').className = "fa fa-play";
        } else {
            video.play();
            playPause.querySelector('i').className = "fa fa-pause";
        }
        videoSeeker.value = (video.currentTime*100/video.duration);
    });

    volumeButton.addEventListener("click", function(){
        if(video.muted){
            video.muted = false;
            volumeButton.querySelector('i').className = "fas fa-volume-up";
            volumeSeeker.value = volumeSeekerValue;
        } else {
            volumeSeekerValue = volumeSeeker.value;
            volumeSeeker.value = 0;
            video.muted = true;
            volumeButton.querySelector('i').className = "fas fa-volume-off";
        }
    });

    volumeSeeker.addEventListener("mousemove", function(){
        console.log(volumeSeeker.value);
        if(volumeSeeker.value == 1){
            video.muted = true;
            volumeButton.querySelector('i').className = "fas fa-volume-off";
        } else {
            video.volume = (volumeSeeker.value/100);
            video.muted = false;
            volumeButton.querySelector('i').className = "fas fa-volume-up";
        }
    });

    videoSeeker.addEventListener("mousedown", function(){
        clearInterval(videoSeekerUpdater);
        setTimeout(() => {
            video.currentTime = (videoSeeker.value*video.duration)/100;
            videoSeeker.value = (video.currentTime*100/video.duration);
        }, 100);
    });
    videoSeeker.addEventListener("mouseup", function(){
        video.currentTime = (videoSeeker.value*video.duration)/100;
        videoSeeker.value = (video.currentTime*100/video.duration);
        videoSeekerUpdater = setInterval(() => {
            videoSeeker.value = (video.currentTime*100/video.duration);
        }, 200);
    });

    video.addEventListener("timeupdate", function(){
        if(video.currentTime > (video.duration-.5)){
            if( window.innerHeight == screen.height) {
                fullscreenToggle();
            }
            videoBox.className = "";
            video.muted = true;
            video.play;
            document.body.style.overflowY = "scroll";
        }
    });

    videoFullScreen.addEventListener("click", function(){ fullscreenToggle(); });
    
    function fullscreenToggle(){
        if( window.innerHeight == screen.height) {
            videoPlayer.setAttribute('style', '');
            closeFullscreen();
            videoFullScreen.querySelector('i').className = "fas fa-expand";
        } else {
            videoPlayer.style.width = '100%';
            videoPlayer.style.maxWidth = '100%';
            videoPlayer.style.height = '100%';
            openFullscreen(videoPlayer);
            videoFullScreen.querySelector('i').className = "fas fa-compress";
        }
    }

    function openFullscreen(elem) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
    }
    
    function closeFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
    }
}
