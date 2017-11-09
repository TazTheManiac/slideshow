var slideList    = document.querySelectorAll("#slideshow > .img-wrapper > .item");
var nrOfImages   = slideList.length;
var intervalTime = document.querySelector("#slideshow").dataset.timer;
var timer        = setInterval(next, intervalTime);
var current      = document.querySelector("#slideshow").dataset.start - 1;

slideList[current].classList.add("active");

function next() {
  document.querySelector("#slideshow > .img-wrapper > .active").classList.remove("active");
  if (current < nrOfImages - 1) {
    current = current + 1;
  } else {
    current = 0;
  }
  slideList[current].classList.add("active");
}

function prev() {
  document.querySelector("#slideshow > .img-wrapper > .active").classList.remove("active");
  if (current > 0) {
    current = current - 1;
  } else {
    current = nrOfImages - 1;
  }
  slideList[current].classList.add("active");
}

document.querySelector("#slideshow > [data-role='left']").addEventListener("click", prev);
document.querySelector("#slideshow > [data-role='right']").addEventListener("click", next);

document.querySelector('#slideshow').addEventListener("mouseenter", function() {
  clearInterval(timer);
});

document.querySelector('#slideshow').addEventListener("mouseleave", function() {
  timer = setInterval(next, intervalTime);
});
