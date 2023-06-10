let btn = document.querySelector("body");
let api_key = "b6adf82c797800cb01ae16288a92347d";

// let toggleMenu = document.querySelector(".toggle");
// toggleMenu.addEventListener("click", () => {
//   console.log("clicked");
//   let ul = document.querySelector(".bottomHeader");
//   ul.classList.toggle("show");
//   toggleMenu.classList.toggle("fa-xmark");
//   ul.classList.add("bg");
// });
// let tv = document.getElementById("tv");
// let url;
let i = 1;
let condition;
let searchurl= `https://api.themoviedb.org/3/search/movie?&api_key=b6adf82c797800cb01ae16288a92347d&page=${i}&query=`;
apiurl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${i}`;


  fetchData(apiurl);
  let more = document.querySelector("#showMore");
  more.addEventListener("click", () => showMore(condition));

  condition="api";

  function showMore(x) {
    if (x=="api"){
        i++;
        apiurl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${i}`;
        fetchData(apiurl);
    }
    if (x=="search"){
        i++;
        // let searchTerm = search.value;
        searchurl= `https://api.themoviedb.org/3/search/movie?&api_key=b6adf82c797800cb01ae16288a92347d&page=${i}&query=`;
        fetchData(searchurl+searchTerm);
    }
    
    console.log(i)
  }

function fetchData(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then((movies) => {
      let container = document.querySelector(".container");
      console.log(movies.results[i].poster_path)
      console.log(movies);
      let myLen = movies.results.length;
      showMovies();

      function showMovies() {
        if (i==1){
            container.innerHTML =" ";
          }
        for (var j = 0; j < myLen; j++) {
          let movie = movies.results[j];
          let number=movie.vote_average;
          let roundno=numb = number.toFixed(1);
          container.innerHTML += `<div class="box">
      <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="img" />
  <div class="moviesDetails">
    <div class="leftDetails">
      <h5>${movie.original_title}</h5>
      <p>${movie.release_date}</p>
    </div>
    <div class="${getClassByRate(movie.vote_average)}">${roundno}</div>
  </div>
</div>`;
        }
      }
    })
    .catch((error) => {
      error.message; // 'An error has occurred: 404'
      console.log(error);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
      return 'green';
    } else if (vote >= 5) {
      return 'orange'
    } else {
      return 'red';
    }
  }
  let searchTerm;
form.addEventListener("submit", (e) => {
    i=1;
    e.preventDefault();
    searchTerm = search.value;
    if (searchTerm) {
        
        condition="search";
        i=1;
        searchurl= `https://api.themoviedb.org/3/search/movie?&api_key=b6adf82c797800cb01ae16288a92347d&page=${i}&query=`;
        fetchData(searchurl+searchTerm);
      search.value = "";
    }
    if (!searchTerm){
        condition="api"
        i=1;
        apiurl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${i}`;
        fetchData(apiurl);
    }
  });

//   function clearContents(){
//     $('.box').html('');  // or $('.content-board').html('');
//  }
