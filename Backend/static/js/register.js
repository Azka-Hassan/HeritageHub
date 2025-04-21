let account;

// Show Card
const card = document.querySelectorAll("section");
function showCard(form) {
  card.forEach((element) => {
    if (element.className === form) {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  });
}

// Show Error
function showError(box, display, error) {
  box.parentElement.classList.add("invalid");
  display.innerHTML = error;
  display.parentElement.style.display = "block";
}

function hideError(box, display) {
  box.parentElement.classList.remove("invalid");
  display.innerHTML = "";
  display.parentElement.style.display = "none";
}

// Sign Up ---------------------------------------------------------------->
const regUsername = document.getElementById("username");
const regEmail = document.getElementById("email");
const regPassword = document.getElementById("reg_password");
const regPasswordConfirm = document.getElementById("conreg_password");
const regCheck = document.getElementById("reg_check");
const regButton = document.getElementById("signup_submit");

// Check Username
const usernameErrorDisplay = document.getElementById("username_error");
const usernameRegEx = /^[A-Za-z0-9_.]{0,25}$/;
let rUchk, rUchka, rUchks = true;

regUsername.addEventListener("input", () => {
  if (!regUsername.value.match(usernameRegEx)) {
    showError(
      regUsername,
      usernameErrorDisplay,
      "Username can only use letters, number, underscores and periods."
    );
    rUchka = false;
  } else {
    hideError(regUsername, usernameErrorDisplay);
    rUchka = true;
  }
});

async function checkSameUsername() {
  // Replace with your database call
  const exists = await checkUsernameInDatabase(regUsername.value);
  rUchks = !exists;
}

async function checkUsername() {
  await checkSameUsername();
  if (regUsername.value === "") {
    showError(regUsername, usernameErrorDisplay, "Username can't be empty.");
    rUchk = false;
  } else if (!rUchks && rUchka) {
    showError(
      regUsername,
      usernameErrorDisplay,
      "This username has already been taken."
    );
    rUchk = false;
  } else if (!rUchka) {
    rUchk = false;
  } else {
    hideError(regUsername, usernameErrorDisplay);
    rUchk = true;
  }
}

// Check Email
const emailErrorDisplay = document.getElementById("email_error");
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let rEchk, rEchks = true;

async function checkSameEmail() {
  // Replace with your database call
  const exists = await checkEmailInDatabase(regEmail.value);
  rEchks = !exists;
}

async function checkEmail() {
  await checkSameEmail();
  if (regEmail.value === "") {
    showError(regEmail, emailErrorDisplay, "Email can't be empty.");
    rEchk = false;
  } else if (!regEmail.value.match(emailRegEx)) {
    showError(regEmail, emailErrorDisplay, "Invalid email.");
    rEchk = false;
  } else if (!rEchks) {
    showError(
      regEmail,
      emailErrorDisplay,
      "This email has already been taken."
    );
    rEchk = false;
  } else {
    hideError(regEmail, emailErrorDisplay);
    rEchk = true;
  }
}

// Check Password
const passwordErrorDisplay = document.getElementById("reg_password_error");
let rPchk = true;

function checkPassword() {
  if (regPassword.value === "") {
    showError(regPassword, passwordErrorDisplay, "Password can't be empty.");
    rPchk = false;
  } else {
    hideError(regPassword, passwordErrorDisplay);
    rPchk = true;
  }
}

// Check Password Confirm
const regPasswordConfirmErrorDisplay = document.getElementById(
  "conreg_password_error"
);
let rPCchka, rPCchk = true;

regPasswordConfirm.addEventListener("change", () => {
  if (regPasswordConfirm.value !== regPassword.value) {
    showError(
      regPasswordConfirm,
      regPasswordConfirmErrorDisplay,
      "Passwords do not match."
    );
    rPCchka = false;
  } else {
    hideError(regPasswordConfirm, regPasswordConfirmErrorDisplay);
    rPCchka = true;
  }
});

function checkPasswordConfirm() {
  if (regPasswordConfirm.value === "") {
    showError(
      regPasswordConfirm,
      regPasswordConfirmErrorDisplay,
      "Passwords can't be empty."
    );
    rPCchk = false;
  } else if (!rPCchka) {
    rPCchk = false;
  } else {
    hideError(regPasswordConfirm, regPasswordConfirmErrorDisplay);
    rPCchk = true;
  }
}

// Checkbox
regCheck.addEventListener("click", () => {
  regButton.disabled = !regCheck.checked;
});

// Save Data
async function saveData() {
  if (rUchk && rEchk && rPchk && rPCchk) {
    let newAccount = {
      username: regUsername.value,
      email: regEmail.value,
      password: regPassword.value,
    };
    // Replace with your database call to save the new account
    await saveAccountToDatabase(newAccount);
    clearSignup();
    showCard("login-form");
  } else {
    regPassword.value = "";
    regPasswordConfirm.value = "";
  }
}

// Sign Up Click
regButton.addEventListener("click", async () => {
  await checkUsername();
  await checkEmail();
  await checkPassword();
  await checkPasswordConfirm();
  await saveData();
});

// Create Click
const toLoginButton = document.getElementById("to_login");
toLoginButton.addEventListener("click", () => {
  showCard("login-form");
  clearSignup();
});

// Clear Signup Page
function clearSignup() {
  regUsername.value = "";
  hideError(regUsername, usernameErrorDisplay);
  regEmail.value = "";
  hideError(regEmail, emailErrorDisplay);
  regPassword.value = "";
  hideError(regPassword, passwordErrorDisplay);
  regPasswordConfirm.value = "";
  hideError(regPasswordConfirm, regPasswordConfirmErrorDisplay);
  regCheck.checked = false;
}

// Login ------------------------------------------------------------------>
const logUsernameOrEmail = document.getElementById("username_email");
const logPassword = document.getElementById("password");
const logCheck = document.getElementById("remember_check");
const logButton = document.getElementById("login_submit");

// Check Username or Email
const logUsernameOrEmailErrorDisplay = document.getElementById(
  "username_email_error"
);
async function getAccount() {
  if (logUsernameOrEmail.value === "") {
    showError(
      logUsernameOrEmail,
      logUsernameOrEmailErrorDisplay,
      "Please enter your username or email."
    );
  } else if (logUsernameOrEmail.value.match(usernameRegEx)) {
    account = await getAccountFromDatabase("username", logUsernameOrEmail.value);
    hideError(logUsernameOrEmail, logUsernameOrEmailErrorDisplay);
  } else if (logUsernameOrEmail.value.match(emailRegEx)) {
    account = await getAccountFromDatabase("email", logUsernameOrEmail.value);
    hideError(logUsernameOrEmail, logUsernameOrEmailErrorDisplay);
  } else {
    showError(
      logUsernameOrEmail,
      logUsernameOrEmailErrorDisplay,
      "Invalid username or email."
    );
  }
}

// Check Password
const logPasswordErrorDisplay = document.getElementById("password_error");
async function checkLoginPassword() {
  if (account === undefined) {
    showError(
      logUsernameOrEmail,
      logUsernameOrEmailErrorDisplay,
      "Invalid username or email."
    );
  } else if (account["password"] === logPassword.value) {
    logUsernameOrEmail.value = "";
    logPassword.value = "";
    logCheckbox();
    toWelcome();
    hideError(logPassword, logPasswordErrorDisplay);
  } else {
    showError(logPassword, logPasswordErrorDisplay, "Invalid Password.");
    logPassword.value = "";
  }
}

// Checkbox
function logCheckbox() {
  if (logCheck.checked === true) {
    // Save the username in a session or cookie instead of localStorage
    saveRememberedUser (account["username"]);
  }
}

// Login Click
logButton.addEventListener("click", async () => {
  await getAccount();
  await checkLoginPassword();
});

// Login Click
const toSignUpButton = document.getElementById("to_signup");
toSignUpButton.addEventListener("click", () => {
  showCard("signup-form");
  clearLogin();
});

// Clear Login Page
function clearLogin() {
  logUsernameOrEmail.value = "";
  hideError(logUsernameOrEmail, logUsernameOrEmailErrorDisplay);
  logPassword.value = "";
  hideError(logPassword, logPasswordErrorDisplay);
  logCheck.checked = false;
}

// Welcome ---------------------------------------------------------------->
function toWelcome() {
  const nameOutput = document.getElementById("name_output");
  nameOutput.innerHTML = account["username"];
  showCard("welcome-form");
}

// Change Password Click
const changePasswordButton = document.getElementById("change_password_btn");
changePasswordButton.addEventListener("click", () =>
  showCard("change-password-form")
);

// Delete Account Click
const deleteAccountButton = document.getElementById("delete_account_btn");
deleteAccountButton.addEventListener("click", () =>
  showCard("delete-account-form")
);

// Logout
const logoutButton = document.getElementById("logout_btn");
logoutButton.addEventListener("click", () => {
  showCard("login-form");
  clearLogin();
});

// Change Password -------------------------------------------------------->
// Check Current Password
const currentPassword = document.getElementById("current_password");
const currentPasswordErrorDisplay = document.getElementById(
  "current_password_error"
);
let cCPchk;

function checkCurrentPassword() {
  if (currentPassword.value === "") {
    showError(
      currentPassword,
      currentPasswordErrorDisplay,
      "Password can't be empty."
    );
    cCPchk = false;
  } else if (currentPassword.value !== account.password) {
    showError(currentPassword, currentPasswordErrorDisplay, "Wrong password.");
    currentPassword.value = "";
    cCPchk = false;
  } else {
    hideError(currentPassword, currentPasswordErrorDisplay);
    cCPchk = true;
  }
}

// Check New Password
const changePassword = document.getElementById("change_password");
const changePasswordErrorDisplay = document.getElementById(
  "change_password_error"
);
let cPchk;

function checkPassword() {
  if (changePassword.value === "") {
    showError(
      changePassword,
      changePasswordErrorDisplay,
      "Password can't be empty."
    );
    cPchk = false;
  } else {
    hideError(changePassword, changePasswordErrorDisplay);
    cPchk = true;
  }
}

// Check Password Confirm
const changePasswordConfirm = document.getElementById("conchange_password");
const changePasswordConfirmErrorDisplay = document.getElementById(
  "conchange_password_error"
);
let cPCchk, cPCchka;

changePasswordConfirm.addEventListener("change", checkPasswordConfirmOnchange);

function checkPasswordConfirmOnchange() {
  if (changePasswordConfirm.value !== changePassword.value) {
    showError(
      changePasswordConfirm,
      changePasswordConfirmErrorDisplay,
      "Passwords do not match."
    );
    cPCchka = false;
  } else {
    hideError(changePasswordConfirm, changePasswordConfirmErrorDisplay);
    cPCchka = true;
  }
}

function checkPasswordConfirm() {
  checkPasswordConfirmOnchange();
  if (changePasswordConfirm.value === "") {
    showError(
      changePasswordConfirm,
      changePasswordConfirmErrorDisplay,
      "Passwords can't be empty."
    );
    cPCchk = false;
  } else if (!cPCchka) {
    cPCchk = false;
  } else {
    hideError(changePasswordConfirm, changePasswordConfirmErrorDisplay);
    cPCchk = true;
  }
}

// Cancel Click
const changeCancelButton = document.getElementById("change_cancel");
changeCancelButton.addEventListener("click", () => {
  showCard("welcome-form");
  clearChangePassword();
});

// Save Data
async function saveChange() {
  if (cCPchk && cPchk && cPCchk && cPCchka) {
    account.password = changePassword.value;
    // Replace with your database call to update the account
    await updateAccountInDatabase(account);
    clearChangePassword();
    toSuccessLink("Change Password Success");
  } else {
    currentPassword.value = "";
    changePassword.value = "";
    changePasswordConfirm.value = "";
  }
}

// Submit Click
const changeSubmitButton = document.getElementById("change_submit");
changeSubmitButton.addEventListener("click", async () => {
  await checkCurrentPassword();
  await checkPassword();
  await checkPasswordConfirm();
  await saveChange();
});

// Clear Change Password Page
function clearChangePassword() {
  currentPassword.value = "";
  hideError(currentPassword, currentPasswordErrorDisplay);
  changePassword.value = "";
  hideError(changePassword, changePasswordErrorDisplay);
  changePasswordConfirm.value = "";
  hideError(changePasswordConfirm, changePasswordConfirmErrorDisplay);
}

// Delete Account --------------------------------------------------------->
// Confirm Click
const deleteConfirmButton = document.getElementById("delete_confirm");
deleteConfirmButton.addEventListener("click", async () => {
  await toSuccessLink("Delete Account Success");
  // Replace with your database call to delete the account
  await deleteAccountFromDatabase(account);
});

// Cancel Click
const deleteAccountCancelButton = document.getElementById("delete_cancel");
deleteAccountCancelButton.addEventListener("click", () =>
  showCard("welcome-form")
);

// Success Card ----------------------------------------------------------->
const successText = document.getElementById("success_text");

function toSuccessLink(text) {
  successText.innerHTML = text;
  showCard("success-form");
}

// Continue Click
const successButton = document.getElementById("success_continue");
successButton.addEventListener("click", () => showCard("login-form"));

// Change Theme
const changeTheme = document.getElementById("change_theme");

changeTheme.addEventListener("click", () => {
  if (document.body.className === "dark-mode") {
    setLightMode();
  } else {
    setDarkMode();
  }
});

function setDarkMode() {
  document.body.classList.add("dark-mode");
  changeTheme.innerHTML = '<i class="ri-moon-fill"></i>';
  saveTheme("darkMode");
}

function setLightMode() {
  document.body.classList.remove("dark-mode");
  changeTheme.innerHTML = '<i class="ri-sun-fill"></i>';
  saveTheme("lightMode");
}

// Save Theme
function saveTheme(theme) {
  // Implement your theme saving logic here (e.g., save to database)
}

// Get Theme
const theme = await getThemeFromDatabase(); // Replace with your database call

if (theme === "darkMode") {
  setDarkMode();
} else if (theme === "lightMode") {
  setLightMode();
} else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  setDarkMode();
}

// Detect Theme
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (event.matches) {
      setDarkMode();
    } else {
      setLightMode();
    }
  });
  fetch('/register', {
    method: 'POST',
    body: new FormData(document.querySelector('form')),
})
.then(response => response.json())
.then(data => console.log(data));
