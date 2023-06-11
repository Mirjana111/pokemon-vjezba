// Od profe rješenje
//$.ajax("https://pokeapi.co/api/v2/pokemon-color/yellow", {
//   success: function(data, textStatus, jqXHR ) {
//     getAllDetails(data);
//   },
//   error: function(jqXHR, textStatus, errorThrown) {
//     $('<div></div>').insertAfter($('#pokemon-list')).text('Error: ' + textStatus);
//   }
// }) 
// function getDetails(pokemon) {		
//   return $.ajax(pokemon.url, {
//     success: function(data) {
//       pokemons.push(data);
//     }
//   });
// } 








$(document).ready(function() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon-color/yellow", true);
    function fillList() {
      const data = JSON.parse(xhr.responseText);
      const source = document.getElementById("pokemon-list").innerHTML;
      const template = Handlebars.compile(source);
      const context = { pokemon: [] };
  
      // Fetching additional data for each Pokémon
      const promises = data.pokemon_species.slice(0, 20).map(function(pokemon) {
        return new Promise(function(resolve, reject) {
          $.ajax({
            url: pokemon.url,
            method: "GET",
            success: function(response) {
              pokemon.habitat = response.habitat.name;
              pokemon.growth_rate = response.growth_rate.name;
              context.pokemon.push(pokemon);
              resolve();
            },
            error: function(xhr, status, error) {
              reject(error);
            }
          });
        });
      });
  
      // Rendering the template after all data is fetched
      Promise.all(promises)
        .then(function() {
          const html = template(context);
          document.getElementById('result').innerHTML = html;
          $('[data-toggle="popover"]').popover();
        })
        .catch(function(error) {
          handleAPIError(xhr, xhr.status, error);
        });
    }
  
    xhr.onload = function() {
      fillList();
    };
  
    xhr.send();
  });
  
  $(document).ready(function() {
    // funkcija za pracenje velicine ekrana
    function handleResize() {
      const windowWidth = $(window).width();
      console.log("Širina ekrana: " + windowWidth + "px");
    }
    // pracenje promjene velicine ekrana
    $(window).on("resize", handleResize);
  });
  
  $(document).ready(function() {
    // funkcija za promjenu boje retka dok je mis unutar retka
    function changeRowColor() {
      $(this).addClass("hovered-row");
    }
    // funkcija za vracanje prijasnje boje retka kada mis više nije u retku
    function restoreRowColor() {
      $(this).removeClass("hovered-row");
    }
    // postavljanje eventlistenera ulaska misa na retke tablice
    $("#result").on("mouseenter", "tr", changeRowColor);
    // postavljanje eventlistenera izlaska misa s retka tablice
    $("#result").on("mouseleave", "tr", restoreRowColor);
  });
  
  // Primjer AJAX poziva s funkcijom za obradu pogreške
  $.ajax({
    url: "url-api-poziva",
    method: "GET",
    success: function(response) {
      // Obrada uspješnog odgovora
    },
    error: function(xhr, status, error) {
      // Obrada pogreške
      handleAPIError(xhr, status, error);
    }
  });
  
  // Funkcija za obradu pogreške
  function handleAPIError(xhr, status, error) {
    // Ispisivanje poruke o greški na ekranu
    console.log("Došlo je do greške prilikom poziva API-ja:");
    console.log("Status pogreške: " + status);
    console.log("Poruka o greški: " + error);
  
    // Možete dodati dodatne radnje na temelju vrste greške ili statusa
    // na primjer, prikazivanje specifične poruke korisniku ili ponovni pokušaj poziva
  }
  