document.querySelectorAll('.slideshow').forEach(slideshow => {

  // Set interval of the slideshow
  if (slideshow.dataset.interval == undefined) {
    var intervalTime = 4000;
  } else {
    var intervalTime = parseInt(slideshow.dataset.interval);
  }

  // Set start slide
  if (slideshow.dataset.start == undefined) {
    var startSlide = 1;
  } else {
    var startSlide = parseInt(slideshow.dataset.start);
  }

  // Set pause behaviour
  if (slideshow.dataset.pause == undefined) {
    var pauseOnHover = 'true';
  } else {
    var pauseOnHover = slideshow.dataset.pause;
  }

  slideshow.querySelectorAll('.slides-wrapper .slide')[startSlide].classList.add('active');
  slideshow.querySelectorAll('.indicators button')[startSlide].classList.add('active');

  let timer = setInterval(function() {nextSlide(slideshow)}, intervalTime);

  slideshow.querySelector('.controll.left').addEventListener('click', function(e) {
    e.preventDefault();
    prevSlide(slideshow);
    clearInterval(timer);
    timer = setInterval(function() {nextSlide(slideshow)}, intervalTime);
  });

  slideshow.querySelector('.controll.right').addEventListener('click', function(e) {
    e.preventDefault();
    nextSlide(slideshow);
    clearInterval(timer);
    timer = setInterval(function() {nextSlide(slideshow)}, intervalTime);
  });

  let i = 0;
  slideshow.querySelectorAll('.indicators button').forEach(button => {
    button.dataset.slideTo = i;
    i ++;
    button.addEventListener('click', function(e) {
      e.preventDefault();
      gotoSlide(slideshow, button)
      clearInterval(timer);
      timer = setInterval(function() {nextSlide(slideshow)}, intervalTime);
    });
  });

  // Determine if the slide shuld pause
  if (pauseOnHover == 'true') {
    slideshow.addEventListener('mouseover', function () {
      clearInterval(timer);
    });
    slideshow.addEventListener('mouseleave', function () {
      timer = setInterval(function() {nextSlide(slideshow)}, intervalTime);
    });
    slideshow.addEventListener('touchstart', function () {
      clearInterval(timer);
    });
    slideshow.addEventListener('touchend', function () {
      timer = setInterval(function() {nextSlide(slideshow)}, intervalTime);
    });
  }
});

function prevSlide(slideshow) {
  let activeSlide = slideshow.querySelector('.slides-wrapper .active');
  let activeIndicator = slideshow.querySelector('.indicators .active');
  activeSlide.classList.remove('active');
  activeIndicator.classList.remove('active');
  if (activeSlide.previousElementSibling == null) {
    activeSlide.parentNode.lastElementChild.classList.add('active');
    activeIndicator.parentNode.lastElementChild.classList.add('active');
  } else {
    activeSlide.previousElementSibling.classList.add('active');
    activeIndicator.previousElementSibling.classList.add('active');
  }
}

function nextSlide(slideshow) {
  let activeSlide = slideshow.querySelector('.slides-wrapper .active');
  let activeIndicator = slideshow.querySelector('.indicators .active');
  activeSlide.classList.remove('active');
  activeIndicator.classList.remove('active');
  if (activeSlide.nextElementSibling == null) {
    activeSlide.parentNode.firstElementChild.classList.add('active');
    activeIndicator.parentNode.firstElementChild.classList.add('active');
  } else {
    activeSlide.nextElementSibling.classList.add('active');
    activeIndicator.nextElementSibling.classList.add('active');
  }
}

function gotoSlide(slideshow, button) {
  let gotoNr = button.dataset.slideTo;
  slideshow.querySelector('.slides-wrapper .active').classList.remove('active');
  slideshow.querySelector('.indicators .active').classList.remove('active');
  slideshow.querySelectorAll('.slides-wrapper .slide')[gotoNr].classList.add('active');
  slideshow.querySelectorAll('.indicators button')[gotoNr].classList.add('active');
}
