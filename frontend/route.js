import home from "/pages/home/home.js";
import nomads from "/pages/natureNomads/nomads.js";
import massiveMashup from "/pages/MassiveMashupClub/mmc.js";
import whiskey from "./pages/whiskeyTasting/whiskeyTasting.js";
import loginForm from "./pages/login/loginReg.js";
import createEvent from "./pages/createEvent/createEvent.js";

async function route() {
  console.log(location);

  switch (location.hash.replace("#", "")) {
    case "login":
      console.log("login");
      $("main").html(loginForm());
      break;
    case "":
      console.log("home");
      $("main").html(home());
      break;
    case "nomads":
      console.log("nomads");
      $("main").html(await nomads());
      break;
       case "massiveMashup":
      console.log("massiveMashup");
      $("main").html(await massiveMashup());  
      break;
    case "whiskey":
      console.log("whiskey");
      $("main").html(await whiskey());
      break;
    case "create":
      console.log("createEvent");
      $("main").html(createEvent());
      break;

    default:
      console.log("404");
  }
}

window.onhashchange = route;
window.onload = route;
