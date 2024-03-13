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
