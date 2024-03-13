const scroll = new LocomotiveScroll({
    el: document.querySelector('.main-section'),
    smooth: true
});
const Locoscroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    smartphone: {
          smooth: true
      }
    //reloadOnContextChange: true
  });
  function duplicateMarqueeContent() {
    const marquee = document.getElementById('infiniteMarquee');
    const content = marquee.innerHTML;
    marquee.innerHTML += content; // Duplicate content
}

// Call the function to initially duplicate content
duplicateMarqueeContent();

// Set interval to continuously duplicate content
setInterval(duplicateMarqueeContent, 1000); 