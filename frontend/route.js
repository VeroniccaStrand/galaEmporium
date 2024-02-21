// Importera olika sidor och funktioner för navigering
import home from "/pages/home/home.js";
import nomads from "/pages/natureNomads/nomads.js";
import massiveMashup from "/pages/MassiveMashupClub/mmc.js";
import whiskey from "./pages/whiskeyTasting/whiskeyTasting.js";
import comedyClub from "./pages/comedyClub/comedyClub.js";
import loginForm from "./pages/login/loginReg.js";
import createEvent from "./pages/createEvent/createEvent.js";
import dandelion from "./pages/dandelionJazzClub/dandelion.js";
import myPage from "./pages/myPage/myPage.js";

// Funktion för att växla mellan olika sidor baserat på hash-värdet i URL:en
async function route() {
  console.log(location);

  switch (location.hash.replace("#", "")) {
    // Om hash-värdet är "login", rendera inloggningsformuläret
    case "login":
      console.log("login");
      $("main").html(loginForm());
      break;
    // Om hash-värdet är tomt, rendera startsidan (home)
    case "":
      console.log("home");
      $("main").html(await home());
      break;
    // Om hash-värdet är "nomads", rendera sidan för Nature Nomads
    case "nomads":
      console.log("nomads");
      $("main").html(await nomads());
      break;
    // Om hash-värdet är "massiveMashup", rendera sidan för Massive Mashup Club
    case "massiveMashup":
      console.log("massiveMashup");
      $("main").html(await massiveMashup());
      break;
    // Om hash-värdet är "whiskey", rendera sidan för Whiskey Tasting
    case "whiskey":
      console.log("whiskey");
      $("main").html(await whiskey());
      break;
    // Om hash-värdet är "comedyClub", rendera sidan för Comedy Club
    case "comedyClub":
      console.log("comedyClub");
      $("main").html(await comedyClub());
      break;
    // Om hash-värdet är "create", rendera sidan för att skapa event
    case "create":
      console.log("createEvent");
      $("main").html(await createEvent());
      break;
    // Om hash-värdet är "myPage", rendera sidan för användarens sida (myPage)
    case "myPage":
      console.log("myPage");
      $("main").html(await myPage());
      break;
    // Om hash-värdet är "dandelion", rendera sidan för Dandelion Jazz Club
    case "dandelion":
      console.log("dandelion");
      $("main").html(await dandelion());
      break;
    // Om hash-värdet inte matchar något av ovanstående, rendera en 404-sida
    default:
      console.log("404");
  }
}

// Uppdatera sidan när hash-värdet i URL:en ändras
window.onhashchange = route;

// Ladda sidan med rätt innehåll när den laddas för första gången
window.onload = route;
