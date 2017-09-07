$(window).scroll(function(){
   youtubeVidScroll(); 
    
});

function youtubeVidScroll() {

    var wScroll = $(window).scrollTop();
    console.log('hei');
    $('.video-strip').css('background-position','center -'+ wScroll +'px');
}

