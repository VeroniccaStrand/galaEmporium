export default function home() {
        return `
      <header>
  
      </header>
  
     <div id="mainHome">
  
        <h1 id="title">Gala Emporium</h1>
                <!--Buttons for individual club pages -->
                <div id="circles">
                        <!-- TODO: När vi skapat egna klubbar så bytar vi ut dom här mot deras loggor/text med namn/whatever -->
                        <a href="#nomads"><img src="images/circle.png"
                                alt="Veronica klubblogga, redigerar in sen" height="150px" width="150px"></a>
                        <a href="#comedyClub"><img src="images/circle.png"
                                alt="Yacine klubblogga, redigerar in sen" height="150px" width="150px"></a>
                        <a href="#whiskey"><img src="images/circle.png"
                                alt="Joel klubblogga, redigerar in sen" height="150px" width="150px"></a>
                        <a href="#massiveMashup"><img src="images/otc.png"
                                alt="Oliver klubblogga, redigerar in sen" height="150px" width="150px"></a>
                        <a href="#dandelion"><img src="images/djclogo.png"
                                alt="Starke klubblogga, redigerar in sen" height="150px" width="150px"></a>
                </div>
        
                <div id="calendar">
                <!--TODO: fetcha evenemangen som skapas och displayar dom här -->
                </div>

        </div>
  
    `;
}

