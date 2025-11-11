let $sigInBtn = document.querySelector("#sigInBtn");
let $signUpWrapper = document.querySelector("#signUpWrapper");
let $signInWrapper = document.querySelector("#signInWrapper");

$sigInBtn.addEventListener("click", () => {
  $signUpWrapper.classList.add("left-[130%]");
  $signInWrapper.classList.remove("-left-full");
  $signInWrapper.classList.add("left-1/2");
});
