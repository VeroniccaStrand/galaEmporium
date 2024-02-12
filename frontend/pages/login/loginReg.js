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

window.login = login;
