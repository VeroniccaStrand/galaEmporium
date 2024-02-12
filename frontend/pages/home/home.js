export default function home() {
  return `
    <header>
        <h1>Gala Emporium</h1>
    </header>

    <nav>
        <!--Log-in button -->
        <!--TODO: länka till en log in sida/pop-up med login? -->
        <a href="login"><img class="userBtn" src="images/login.png" alt="redigerar in sen" height="50px" width="50px"></a>
    </nav>

    <!--Buttons for individual club pages -->
    <div id="circles">
        <!-- TODO: När vi skapat egna klubbar så bytar vi ut dom här mot deras loggor/text med namn/whatever -->
        <a href="#Nomads"><img src="images/circle.png"
                alt="Veronica klubblogga, redigerar in sen" height="150px" width="150px"></a>
        <a href="#Yacine"><img src="images/circle.png"
                alt="Yacine klubblogga, redigerar in sen" height="150px" width="150px"></a>
        <a href="#Joel"><img src="images/circle.png"
                alt="Joel klubblogga, redigerar in sen" height="150px" width="150px"></a>
        <a href="#Oliver"><img src="images/circle.png"
                alt="Oliver klubblogga, redigerar in sen" height="150px" width="150px"></a>
        <a href="#dandelionjazzclub"><img src="images/djclogo.png"
                alt="Starke klubblogga, redigerar in sen" height="150px" width="150px"></a>
    </div>

    <div id="calendarContainer">

        <div id="calendarHeader">
            <h3>Evenemang</h3>
        </div>

        <div id="calendar">
            <!--TODO: fetcha evenemangen som skapas och displayar dom här -->
        </div>

    </div>
  `;
}
