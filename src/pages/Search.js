import React from 'react';
import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
function Card(props){
    return (
        <div className='child'>
            <div className='img-box'>
            <img src={props.img} />
            </div>
            <div className='txt'>
            <h4>{props.title}</h4>
            <h5>Year: {props.year}</h5>
            </div>
        </div>
    )
}
function Search() {
    const [result, setResult]=useState([])
    const queryParams = new URLSearchParams(window.location.search);
    let {search}=useParams();
    console.log(search);
    const url=`https://www.omdbapi.com/?apikey=ead0329f&s=${search}`
    useEffect(() => {
    fetch(url)
        .then((response) => response.json())
        .then((data) =>data.Search!= undefined ? setResult(data.Search) : []);
        
    }, []);

    return (
        <>
        <h1 id="tit">Related Movies</h1>
        <p id='ps'>Search Again? <a href='/'>Click here</a></p>
        <div className='child-container'>
           
            {
                result.map((item)=>{
                    return(
                        <Card img={item.Poster!="N/A" ? item.Poster : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.myhappyenglish.com%2Fx9walos9f%2Fuploads%2F2013%2F05%2Fplaceholder1.png&f=1&nofb=1"} title={item.Title} year={item.Year} />
                    )
                })   
            }
        </div>
        <h2 id='foo'>Your mini-movie library :)</h2>
        </>

    );
}

export default Search;