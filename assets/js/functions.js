$(function(){
    mentoringBubbleClick();  
    setInterval(function(){ articleTada();}, 3000)
    designBGStuff();
    
});

// DESIGN BG STUFF - change background-color
function designBGStuff() {
    // identify hover: design-img-link 
    $('.design-img-link').hover(function(){
        // find a color > apply color to background
       $(this).parent().parent().css('background-color', $(this).data('color'));
    }, function(){ 
        // off > revert the color 
        $(this).parent().parent().css('background-color', $(this).parent().parent().data('orig-color'));
    });
      
    
}



// ARTICLE TADA - makes images wobbble by adding class with animation 
function articleTada(){
    var randNum = Math.floor(Math.random() * $('.article-thumb').length) +1 
    
    $('.article-thumb').eq(randNum).addClass('is-emph')
    .siblings().removeClass('is-emph');
}


// MENTORING BUBBLE CLICK - making the bubbles move by changing position 

function mentoringBubbleClick() {
    $('.face').on('click', function(){
        var $this = $(this),
            faceTop = $this.position().top,
            vertMath = -1 * (faceTop - 230),
            faceLeft = $this.position().left,
            horzMath = 0 - faceLeft;
        
        if($(window).width() > 640) {
            // move the whole contanier up 115px + count
            $this.parent().css('top', + vertMath + 'px')     
        } else { // * * MOBILE STUFF * * 
            if($this.hasClass('back-btn')){
                mentoringNarrowStart();
            } else {
                $this.parent().css('left', + horzMath + 'px')
            }
        }
        
        // make bubble appear when backbutton is clicked 
        if(!$this.hasClass('back-btn')){
            $this.addClass('has-bubble-open')
                .siblings().removeClass('has-bubble-open');
        }       
    }); // end face click
    
} // end mentoringBubbleClick()




// WINDOW SCROLL FUNCTION

$(window).scroll(function(){
   youtubeVidScroll(); 
    startMentoring();
    startArticles();
    
});

// YOUTUBE FUNCTION 

function youtubeVidScroll() {

    var wScroll = $(window).scrollTop();
    $('.video-strip').css('background-position','center -'+ wScroll +'px');
}


// ATRTICLES SCROLL FUNCTION 
function startArticles(){
    var wScroll = $(window).scrollTop();
    if($('section.articles').offset().top - $(window).height()/2 < wScroll) {
        $('.article-thumb').each(function(i){
            setTimeout(function(){
            $('.article-thumb').eq(i).addClass('is-visible');
            }, 200 * i);
        });
        
    }
    
}

// MENTORING FACE POP UP-FUNCTION 

function startMentoring(){
    var wScroll = $(window).scrollTop();
    
    if($('section.mentoring').offset().top - $(window).height()/2 < wScroll) {
        if($(window).width() > 640) {
            // make faces launch up on desktop view
            $('.faces').addClass('launched');

            if(!$('.face').hasClass('has-bubble-open') && !$(this).hasClass('back-btn')) {
                
                //make bubble appear on third face after 400ms
                setTimeout(function(){
                    $('.face:nth-child(3)').addClass('has-bubble-open');            
                }, 400);   
            }
        } else { // MOBILE VIEW 
            mentoringNarrowStart();
        }
    }
    
}

// optimize for narrow view if resizing browser
function mentoringNarrowStart(){
    $('.faces').css({
        'top': '230px',
        'left': '0px'
    });
    $('.face').first().addClass('has-bubble-open').siblings().removeClass('has-bubble-open');
}

// optimize for wide view if resizing browser
function mentoringWideStart(){
    $('.faces').css({
        'top': '0px',
        'left': '0px'
    });
    $('.face:nth-child(3)').addClass('has-bubble-open').siblings().removeClass('has-bubble-open');
}


// function for optimizing if resizing browser
$(window).resize(function(){
    if($(window).width() > 640) {
        mentoringWideStart();   
    } else {
        mentoringNarrowStart();
    }   
});













