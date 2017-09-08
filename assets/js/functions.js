$(function(){
    smoothScroll(300);
    mentoringBubbleClick();  
    setInterval(function(){ articleTada();}, 3000)
    designBGStuff();
    mobileNav();
    
});


// smoothScroll function is applied from the document ready function
function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}

// Cache selectors
var topMenu = $("#site-nav"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   // Set/remove active class
   menuItems
     .parent().removeClass("active")
     .end().filter("[href='#"+id+"']").parent().addClass("active");
});






// TOGGL MOBILE NAV 
function mobileNav() {
  $('.mobile-nav-toggle').on('click', function(){
    var status = $(this).hasClass('is-open');
    if(status){ $('.mobile-nav-toggle, .mobile-nav').removeClass('is-open'); }
    else { $('.mobile-nav-toggle, .mobile-nav').addClass('is-open'); }
  });
}


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













