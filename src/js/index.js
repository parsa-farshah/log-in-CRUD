let $sigInBtnPage = document.querySelector("#sigInPage");
let $signUpBtnPage = document.querySelector("#signUpPage");
let $signUpWrapper = document.querySelector("#signUpWrapper");
let $signInWrapper = document.querySelector("#signInWrapper");
let $signUpBtn = document.querySelector("#signUp");
let $errorUserName = document.querySelector("#errorUserName");
let $errorInputEmpty = document.querySelector("#errorInputEmpty");
let $errorEmail = document.querySelector("#errorEmail");
let $errorPassword = document.querySelector("#errorPassword");
let $errorExist = document.querySelector("#errorExist");
let $alertSignUp = document.querySelector("#alertSignUp");
let $myAccount = document.querySelector("#myAccount");
let $myUserName = document.querySelector("#myUserName");
let $myEmail = document.querySelector("#myEmail");
let $myPassword = document.querySelector("#myPassword");

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

$signUpWrapperInp[0].addEventListener("input", () => {
  $errorUserName.classList.add("hidden");
});
$signUpWrapperInp[1].addEventListener("input", () => {
  $errorInputEmpty.classList.add("hidden");
});
$signUpWrapperInp[2].addEventListener("input", () => {
  $errorPassword.classList.add("hidden");
});

////////////////////////////////////////////////// sign up click
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

      if (tasks == undefined) {
        /////////////////////////////////////////// error input empty
        if (
          $signUpWrapperInp[0].value == "" ||
          $signUpWrapperInp[1].value == "" ||
          $signUpWrapperInp[2].value == ""
        ) {
          $errorInputEmpty.classList.remove("hidden");
          console.log("input empty");

          return;
        } else {
          $errorInputEmpty.classList.add("hidden");
        }
        /////////////////////////////////////////// error username
        if ($signUpWrapperInp[0].value.search(/^[a-z0-9_-]{3,15}$/) == -1) {
          $errorUserName.classList.remove("hidden");
          console.log("userName");

          return;
        } else {
          $errorUserName.classList.add("hidden");
        }
        /////////////////////////////////////////// error email
        if (
          $signUpWrapperInp[1].value.search(
            /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
          ) == -1
        ) {
          $errorEmail.classList.remove("hidden");
          console.log("email");
          return;
        } else {
          $errorEmail.classList.add("hidden");
        }
        /////////////////////////////////////////// error password
        if (
          $signUpWrapperInp[2].value.search(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
          ) == -1
        ) {
          $errorPassword.classList.remove("hidden");
          console.log("password");

          return;
        } else {
          $errorPassword.classList.add("hidden");
        }

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
            // alert add Account created successfully.
            $alertSignUp.classList.remove("-left-full");
            $alertSignUp.classList.add("-left-0");
            setTimeout(() => {
              $alertSignUp.classList.remove("-left-0");
              $alertSignUp.classList.add("-left-full");
            }, 2000);
            /////////////////////////// add data to panell
            const url = new URL(
              "https://6912e51452a60f10c8232605.mockapi.io/users"
            );
            url.searchParams.append("username", $signUpWrapperInp[0].value);
            url.searchParams.append("email", $signUpWrapperInp[1].value);
            url.searchParams.append("password", $signUpWrapperInp[2].value);

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
              .then((data) => {
                $signUpWrapper.classList.add("hidden");
                $myUserName.value = data[0].username;
                $myEmail.value = data[0].email;
                $myPassword.value = data[0].password;
                $myAccount.classList.remove("hidden");
              })
              .catch((error) => {
                // handle error
              });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        $errorExist.classList.remove("hidden");
      }
    })
    .catch((error) => {
      // handle error
    });
});
