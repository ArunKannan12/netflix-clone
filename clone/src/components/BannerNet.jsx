import axios from 'axios'
import React, { useEffect, useState } from 'react'
import requests from './request'
import './banner.css'
const API_KEY="d03799692be1c26faf0ade18a4205f9f"

const BannerNet = () => {
    const [movie,setMovie]=useState([]);
    useEffect(()=>{
      async function fetchData() {
        const request = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length -1)
          ]
        );
        return request;
      }
      fetchData();
    }, []);
    console.log(movie);
    function truncate(str,n) {
        return str?.length > n ? str.substr(0,n-1) + "..." :str;
    }
  return (
    <header className='banner' style={{backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
    backgroundSize:'cover',
    // backgroundPosition:"center",
    backgroundRepeat:'no-repeat'}}>
        <div className="banner-contents">
            <h1 className='banner-title'>{movie?.title || movie?.name || movie?.original_name} </h1>
            <div className="banner-buttons">
                <button className="banner-button">Play</button>
                <button className="banner-button">My List</button>
            </div>
            <h1 className='banner-description'>
                {truncate(movie?.overview,200)}
            </h1>
        </div>
        <div className="banner-fadebottom"></div>
    </header>
  )
}

export default BannerNet