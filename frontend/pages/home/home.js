export default function home() {
    return `
      <header>
  
      </header>
  
     <main>
  
      <h1 id="title">Gala Emporium</h1>
      <!--Buttons for individual club pages -->
      <div id="circles">
          <!-- TODO: När vi skapat egna klubbar så bytar vi ut dom här mot deras loggor/text med namn/whatever -->
          <a href="#nomads"><img src="images/circle.png"
                  alt="Veronica klubblogga, redigerar in sen" height="150px" width="150px"></a>
          <a href="#Yacine"><img src="images/circle.png"
                  alt="Yacine klubblogga, redigerar in sen" height="150px" width="150px"></a>
          <a href="#Joel"><img src="images/circle.png"
                  alt="Joel klubblogga, redigerar in sen" height="150px" width="150px"></a>
          <a href="#Oliver"><img src="images/otc.png"
                  alt="Oliver klubblogga, redigerar in sen" height="150px" width="150px"></a>
          <a href="#dandelionjazzclub"><img src="images/djclogo.png"
                  alt="Starke klubblogga, redigerar in sen" height="150px" width="150px"></a>
      </div>
  
  
      </main>
  
          <div id="calendar">
              <!--TODO: fetcha evenemangen som skapas och displayar dom här -->
          </div>
  
    `;
  }
  
