let $sigInBtnPage = document.querySelector("#sigInPage");
let $signUpBtnPage = document.querySelector("#signUpPage");
let $signUpWrapper = document.querySelector("#signUpWrapper");
let $signInWrapper = document.querySelector("#signInWrapper");
let $signUpBtn = document.querySelector("#signUp");
let $signUpWrapperInp = document.querySelectorAll(
  "#signUpWrapper>div>div>input"
);

///////////////////////////////////////////////////////// go to sign in page
$sigInBtnPage.addEventListener("click", () => {
  $signUpWrapper.classList.add("left-[130%]");
  $signInWrapper.classList.remove("-left-full");
  $signInWrapper.classList.add("left-1/2");
});

///////////////////////////////////////////////////////// go to sign up page
$signUpBtnPage.addEventListener("click", () => {
  $signUpWrapper.classList.remove("left-[130%]");
  $signUpWrapper.classList.add("left-1/2");
  $signInWrapper.classList.remove("left-1/2");
  $signInWrapper.classList.add("-left-full");
});

$signUpBtn.addEventListener("click", () => {
  // check if email repititive

  const url = new URL("https://6912e51452a60f10c8232605.mockapi.io/users");
  url.searchParams.append("email", $signUpWrapperInp[1].value); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false

  fetch(url, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    })
    .then((tasks) => {
      // mockapi returns only incomplete tasks
      console.log(tasks);
      if (tasks == undefined) {
        // add

        const newTask = {
          username: $signUpWrapperInp[0].value,
          email: $signUpWrapperInp[1].value,
          password: $signUpWrapperInp[2].value,
        };

        fetch("https://6912e51452a60f10c8232605.mockapi.io/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          // Send your data in the request body as JSON
          body: JSON.stringify(newTask),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            // handle error
          })
          .then((task) => {
            alert("user add");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("user exist");
      }
    })
    .catch((error) => {
      // handle error
    });
});
