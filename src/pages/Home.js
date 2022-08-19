import {useState,useEffect} from 'react'

function Home() {
  const [movie,setMovie]=useState([]);
  const [inp,setInp]=useState("");
  const [titles,setTitle]=useState([]);
  var arr=[]
  const getMovies=()=>{
    const url=`https://www.omdbapi.com/?apikey=ead0329f&s=${inp}`;

    fetch(url)
    .then((response) => response.json())
    .then((data) => setMovie(data.Search));
    var arr=[]
    if(movie!=null){
    movie.map(item=>{arr.push(item.Title);})
    console.log(arr);
    setTitle(arr);
    }
    
  }
  
  const handleChange=(event)=>{
    setInp(event.target.value);
    getMovies();
 
  }


  return (
  <div className="searchBox">
    <h1>Search for your fav movie!</h1>
    <fieldset className="field-container">
      <form method="get" action={`/${inp}`}>
      <input type="text" placeholder="Start typing....." className="field" value={inp}  onChange={handleChange} />

      </form>
    </fieldset>
    <div className='results'>
      {titles.length!=0 &&     
        <>
          {titles.map(title => (
            <a href={title}>{title}</a>
          ))}
        </>
      }
    </div>
    <h2 id='foo'>Your mini-movie library :)</h2>
  </div>
  );
}

export default Home;
