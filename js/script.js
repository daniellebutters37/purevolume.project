
/// ::: Header :::

// Main Header
var mainHeader = document.querySelector('#mainHeader');
var logo = document.querySelector('#mainHeader #logo');
var sBox = document.querySelector('#searchBox');
var sInput = document.querySelector('#searchBox input');
var sClose = document.querySelector('#searchCloseBtn');

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

var subHeader = document.querySelector('#subHeader');
var subHeaderMenu = document.querySelector('#subHeader ul');
var leftBtn = document.querySelector('#subHeader #leftScrollButton');
var rightBtn = document.querySelector('#subHeader #rightScrollButton');


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
    var storyThumbs = document.querySelector('#articleThumbs');
    var storyThumbsRow = document.querySelector('#storyThumbsLine > div');
    var offSet = storyThumbsRow.style.marginLeft;
    var storyThumbsLeftBtn = document.querySelector('#storyThumbsLine #leftStoryScrollButton');
    var storyThumbsRightBtn = document.querySelector('#storyThumbsLine #rightStoryScrollButton');
    
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

    var videoBox = document.querySelector('#videoBox');
    var playBtn = document.querySelector('#videoBox .overlyIcon');
    var closeBtn = document.querySelector('#videoBox .playerClose');
    var video = document.querySelector('#videoBox .video video');
    var videoPlayer = document.querySelector('#videoBox .video');
    var playPause = document.querySelector('#videoBox #playPause');
    var volumeButton = document.querySelector('#videoBox .volumeButton');
    var videoSeeker = document.querySelector('#videoBox #videoSeeker');
    var volumeSeekerValue = 100;
    var volumeSeeker = document.querySelector('#videoBox .volumeControl .slider');
    var videoFullScreen = document.querySelector('#videoBox #videoFullScreen');
    var videoFullScreenCheck = false;

    document.addEventListener("keyup", function(event){
        if(document.querySelector(".open-lightBox") != null){
            if(event.keyCode == 32){ playPauseToggle(); } 
            else if(event.keyCode == 27){ closeVideo(); }
            else if(event.keyCode == 77){ muteToggle(); }
            else if(event.keyCode == 13){ fullscreenToggle(); }
            else if(event.keyCode == 39){ seekLeft(); }
            else if(event.keyCode == 37){ seekRight(); }
            else if(event.keyCode == 38 || event.keyCode == 107){ volumeUp(); }
            else if(event.keyCode == 40 || event.keyCode == 109){ volumeDown(); }
        }
    });

    videoSeekerUpdater = setInterval(() => {
        videoSeeker.value = (video.currentTime*100/video.duration);
    }, 200);

    playBtn.addEventListener('click', function(){ openVideo() });

    function openVideo(){
        videoBox.className = "open-lightBox";
        video.currentTime = 0;
        video.muted = false;
        document.body.style.overflowY = "hidden";
    }

    closeBtn.addEventListener('click', function(){ closeVideo() });

    function closeVideo(){
        if( window.innerHeight == screen.height) {
            fullscreenToggle();
        } else {
            videoBox.className = "";
            video.muted = true;
            video.play;
            document.body.style.overflowY = "scroll";
        }
    }
    
    playPause.addEventListener("click", function(){ playPauseToggle() });
    
    function playPauseToggle(){
        if(!video.paused){
            video.pause();
            playPause.querySelector('i').className = "fa fa-play";
        } else {
            video.play();
            playPause.querySelector('i').className = "fa fa-pause";
        }
        videoSeeker.value = (video.currentTime*100/video.duration);
    }

    volumeButton.addEventListener("click", function(){ muteToggle() });
    
    function muteToggle(){
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
    }

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
    
    videoSeeker.addEventListener("touchstart", function(){
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

    videoSeeker.addEventListener("touchend", function(){
        video.currentTime = (videoSeeker.value*video.duration)/100;
        videoSeeker.value = (video.currentTime*100/video.duration);
        videoSeekerUpdater = setInterval(() => {
            videoSeeker.value = (video.currentTime*100/video.duration);
        }, 200);
    });

    video.addEventListener("timeupdate", function(){ videoEnd() });

    function videoEnd(){
        if(video.currentTime > (video.duration-.5)){
            if( window.innerHeight == screen.height) {
                fullscreenToggle();
            }
            videoBox.className = "";
            video.muted = true;
            video.play;
            document.body.style.overflowY = "scroll";
        }
    }

    videoFullScreen.addEventListener("click", function(){ fullscreenToggle(); });
    
    function fullscreenToggle(){
        if(videoFullScreenCheck) {
            videoPlayer.setAttribute('style', '');
            closeFullscreen();
            videoFullScreen.querySelector('i').className = "fas fa-expand";
            videoFullScreenCheck = false;
        } else {
            videoPlayer.style.width = '100%';
            videoPlayer.style.maxWidth = '100%';
            videoPlayer.style.height = '100%';
            openFullscreen(videoPlayer);
            videoFullScreenCheck = true;
            videoFullScreen.querySelector('i').className = "fas fa-compress";
        }
    }

    document.addEventListener('webkitfullscreenchange', function(e) { checkFullScreen(); }, false);
    document.addEventListener('mozfullscreenchange', function(e) { checkFullScreen(); }, false);
    document.addEventListener('fullscreenchange', function(e) { checkFullScreen(); }, false);

    function checkFullScreen(){
        if (!window.screenTop && !window.screenY && videoFullScreenCheck) {
            videoPlayer.setAttribute('style', '');
            closeFullscreen();
            videoFullScreen.querySelector('i').className = "fas fa-expand";
            videoFullScreenCheck = false;
        }
    }

    function openFullscreen(elem) {
        video.style.width = "100%";
        video.style.height = "auto";
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
        video.setAttribute('style', '');
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
    function volumeUp(){
        if(video.volume < 1){
            video.volume += 0.1;
        }
        if(video.volume >= 0.2){
            video.muted = false;
            volumeButton.querySelector('i').className = "fas fa-volume-up";
        }
        volumeSeeker.value = video.volume*100;
    }
    function volumeDown(){
        if(video.volume > 0){
            video.volume -= 0.1;
        }
        if(video.volume < 0.2){
            volumeButton.querySelector('i').className = "fas fa-volume-off";
        }
        volumeSeeker.value = video.volume*100;
    }
    function seekLeft(){
        if(video.currentTime < video.duration){
            video.currentTime += 10;
        }
    }
    function seekRight(){
        if(video.currentTime > 0){
            video.currentTime -= 10;
        }
    }
}

// Animated Logo
if(document.querySelectorAll('.animatedLogo').length > 0){
    var animatedLogos = document.querySelectorAll('.animatedLogo');
    var animatingLogoInterval = setInterval(() => {
        for(i = 0; animatedLogos.length > i; i++){
            volumeBars = animatedLogos[i].querySelectorAll('div');
            for(y = 0; volumeBars.length > y; y++){
                volumeBars[y].style.height = getRandomNum(5,40)+"px";
            }
        }
    }, 100);
} else {
    console.log(0);
}
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}