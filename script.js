// Smooth scrolling for links
document.addEventListener("DOMContentLoaded", function () {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(scrollLink => {
        scrollLink.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector("#navbar-container").offsetHeight;
                const fromTop = window.pageYOffset || document.documentElement.scrollTop;
                const toTop = targetElement.getBoundingClientRect().top + fromTop - navbarHeight;
                scrollToSmoothly(toTop, 1000); // 1000 milliseconds = 1 second
            }
        });
    });
});

// Custom smooth scroll function
function scrollToSmoothly(to, duration) {
    const element = document.scrollingElement || document.documentElement,
          start = element.scrollTop,
          change = to - start,
          startDate = +new Date(),
          easeInOutQuad = function (t, b, c, d) {
              t /= d / 2;
              if (t < 1) return c / 2 * t * t + b;
              t--;
              return -c / 2 * (t * (t - 2) - 1) + b;
          };
    
    const animateScroll = function () {
        const currentDate = +new Date();
        const currentTime = currentDate - startDate;
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
        if (currentTime < duration) {
            requestAnimationFrame(animateScroll);
        } else {
            element.scrollTop = to;
        }
    };
    
    animateScroll();
}
$(document).ready(function() {

	// required elements
	var imgPopup = $('.img-popup');
	var imgCont  = $('.container__img-holder');
	var popupImage = $('.img-popup img');
	var closeBtn = $('.close-btn');
  
	// handle events
	imgCont.on('click', function() {
	  var img_src = $(this).children('img').attr('src');
	  imgPopup.children('img').attr('src', img_src);
	  imgPopup.addClass('opened');
	});
  
	$(imgPopup, closeBtn).on('click', function() {
	  imgPopup.removeClass('opened');
	  imgPopup.children('img').attr('src', '');
	});
  
	popupImage.on('click', function(e) {
	  e.stopPropagation();
	});
	
  });