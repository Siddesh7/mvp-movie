import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function NewCard(props) {
  const [watchProvider, setWatchProvider] = useState("");
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${props.imdbID}/watch/providers?api_key=d8482599fceec91ff49e468938c0bb29`
    )
      .then((response) => response.json())
      .then((data) => setWatchProvider(data.results.US.link));
  }, []);
  console.log(watchProvider);
  return (
    <div class="main-container">
      <div class="poster-container">
        <a href={watchProvider} target="_blank" rel="noreferrer">
          <img src={props.img} alt="banner" class="poster" />
        </a>
      </div>
      <div class="ticket-container">
        <div class="ticket__content">
          <h4 class="ticket__movie-title">{props.title}</h4>
          <p class="ticket__year">{props.year}</p>
          <a href={watchProvider} target="_blank" rel="noreferrer">
            <button class="ticket__buy-btn">Check out</button>
          </a>
        </div>
      </div>
    </div>
  );
}
function Search() {
  const [result, setResult] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  let { search } = useParams();

  const url = `https://www.omdbapi.com/?apikey=ead0329f&s=${search}`;
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => (data.Search != undefined ? setResult(data.Search) : []));
  }, []);

  return (
    <>
      <h1 id="tit">Related Movies</h1>
      <p id="ps">
        Search Again? <a href="/">Click here</a>
      </p>
      <div className="hero-container">
        {result.map((item) => {
          return (
            <NewCard
              img={
                item.Poster != "N/A"
                  ? item.Poster
                  : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.myhappyenglish.com%2Fx9walos9f%2Fuploads%2F2013%2F05%2Fplaceholder1.png&f=1&nofb=1"
              }
              title={item.Title}
              year={item.Year}
              imdbID={item.imdbID}
            />
          );
        })}
      </div>
    </>
  );
}

export default Search;
