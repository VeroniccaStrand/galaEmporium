export default function loginForm() {
  return `
  <div> 
    <form id="loginForm" onsubmit="login(); return false">
      <h1>Login</h1>
      <input type="text" name="email" placeholder="Enter your Email">
      <input type="password" id="password" minlength="3" placeholder="Enter password">
      <input type="submit" id="loginButton" value="Login"/>
    </form>
  </div>

    <div id=registerDiv> 

  <form id="registerForm" onsubmit="register(); return false">
    <h1>Register an account</h1>
    <input type="text" name="userName" placeholder="Enter your username">
    <input type="text" name="email" placeholder="Enter your email">
    <input type="password" id="password" minlength="3" placeholder="Enter a password">
    <label for="adminCheck">Admin? </label>
    <input type="text" name="role" placeholder="admin?">
    <input type="submit" id="registerButton" value="Click to register"/>
  </form>

</div>
  `;
}


async function login() {
  console.log("Logged in");

  const data = {
    email: $('#loginForm [name="email"]').val(),
    password: $('#loginForm [id="password"]').val(),
  };
  console.log(data);
  try {
    const result = await fetch("api/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("result", result);
    if (result.status == 200) {
      location.href = "";
    }
  } catch (error) {}
}


async function register() {
  console.log("Registered");

  const data = {
    userName: $('#registerForm [name="userName"]').val(),
    email: $('#registerForm [name="email"]').val(),
    password: $('#registerForm [id="password"]').val()
  }
  console.log(data);
  try {
    const result = await fetch("api/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status == 200) {
      location.href = "";
    }
  } catch (error) { }
}

window.login = login;
window.register = register;
