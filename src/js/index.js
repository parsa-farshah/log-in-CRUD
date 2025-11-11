let $sigInBtn = document.querySelector("#sigInBtn");
let $signUpBtn = document.querySelector("#signUpBtn");
let $signUpWrapper = document.querySelector("#signUpWrapper");
let $signInWrapper = document.querySelector("#signInWrapper");

$sigInBtn.addEventListener("click", () => {
  $signUpWrapper.classList.add("left-[130%]");
  $signInWrapper.classList.remove("-left-full");
  $signInWrapper.classList.add("left-1/2");
});

$signUpBtn.addEventListener("click", () => {
  $signUpWrapper.classList.remove("left-[130%]");
  $signUpWrapper.classList.add("left-1/2");
  $signInWrapper.classList.remove("left-1/2");
  $signInWrapper.classList.add("-left-full");
});
