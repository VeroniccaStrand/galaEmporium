// Funktion för att rendera inloggnings- och registreringsformulär
export default function loginForm() {
  return `
  <div id="loginRegWrap"> 
    <div id=loginDiv> 
      <!-- Inloggningsformulär -->
      <form id="loginForm" onsubmit="login(); return false">
        <h1>Login</h1>
        <input type="text" name="email" placeholder="Enter your email">
        <input type="password" id="password" minlength="3" placeholder="Enter password">
        <input type="submit" id="loginButton" value="Login"/>
        <br/>
        <!-- Länk för redan inloggade användare -->
        <a href="#myPage" id="myPageButton">Already logged in? Click here to see your purchases.</a>
      </form>
    </div>

    <div id=registerDiv> 
      <!-- Registreringsformulär -->
      <form id="registerForm" onsubmit="register(); return false">
        <h1>Register an account</h1>
        <input type="text" name="userName" placeholder="Enter your username">
        <input type="text" name="email" placeholder="Enter your email">
        <input type="password" name="choosePassword" placeholder="Choose Password">
        <label for="adminCheck">Are you a Club Admin? </label>
        <input type="text" name="role" placeholder="Enter your role">
        <input type="submit" id="registerButton" value="Click to register"/>
      </form>
    </div>
  </div>
  `;
}

// Funktion för att logga in användare
async function login() {
  console.log("Logged in");

  // Hämta indata från inloggningsformuläret
  const data = {
    email: $('#loginForm [name="email"]').val(),
    password: $('#loginForm [id="password"]').val(),
  };
  console.log(data);
  try {
    // Skicka inloggningsuppgifter till servern
    const result = await fetch("api/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("result", result);
    const responseData = await result.json();
    // Vid lyckad inloggning, omdirigera användaren till startsidan
    if (result.status == 200) {
      $('#loginForm [name="email"]').val('');
      $('#loginForm [id="password"]').val('');

      const userName = responseData.user.userName; 
      alert(`Welcome, ${userName}!`)
      location.href = "";
   
    }
  } catch (error) {}
}

// Funktion för att registrera ny användare
// Funktion för att registrera ny användare
async function register() {
  // Hämta indata från registreringsformuläret
  const data = {
    userName: $('#registerForm [name="userName"]').val(),
    email: $('#registerForm [name="email"]').val(),
    password: $('#registerForm [name="choosePassword"]').val(),
  };

  try {
    // Skicka registreringsuppgifter till servern
    const result = await fetch("api/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data);
    // Försök tolka svaret som JSON
    const responseJson = await result.json();
// Kontrollera om registreringen lyckades (status 200)
if (result.status === 200) {
  const userName = responseJson.user.userName; 
  alert(`You are now registered and can book tickets to our events. Welcome, ${userName}!`);
  location.href = "";
  console.log("Registered");
} else {
  // Visa meddelandet från servern
  alert(responseJson.message);
  console.error('Error during registration:', result.statusText);
}



if (result.status !== 200 && result.status !== 400 && result.status !== 401) {
  // Annars, hantera övriga fel här
  console.error('Error during registration:', result.statusText);
}


  } catch (error) {
    console.error('Error during registration:', error);
  }
}





// Gör login- och register-funktionerna tillgängliga globalt i webbläsaren
window.login = login;
window.register = register;
