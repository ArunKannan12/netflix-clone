import React, { useEffect, useState } from 'react'
import axios from './axios'
import './row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const Row = ({fetchUrl,title,isLargeRow}) => {
    const baseUrl="https://image.tmdb.org/t/p/original"
    
    const [movies,setMovies]=useState([])
    const getUrl=async()=>{
        axios.get(fetchUrl)
        .then((response)=>{
            console.log(response.data);
            setMovies(response.data.results)
        }).catch((err)=>{})
    }
    useEffect(()=>{
        getUrl()
    },[fetchUrl])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      }

      const [trailerUrl,setTrailerUrl]=useState('')

      const handleClick =(movie)=>{
        if (trailerUrl){
            setTrailerUrl('')
        }else{
            movieTrailer(movie?.name || movie?.title || movie?.original_title || "" )
            .then(url=>{
                const urlParams =new URLSearchParams(new URL(url).search) 
                setTrailerUrl(urlParams.get('v'))
            })
            .catch((error)=>console.log(error))
        }
      }

  return (
    <div className='row'>
        <h1>{title}</h1>
        <div className='row-posters'>
            
            {
                movies.map((movie ,index)=>(
                    
                
                    <img key={index} onClick={()=>handleClick(movie)}  className={`row-poster ${isLargeRow ? "row-posterLarge":''}`} src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path }`} alt={movie.name} />
                
                    
                    ))
            }
        </div>
        {trailerUrl ? <YouTube videoId={trailerUrl}  opts={opts}/> :'' }
    </div>
  )
}

export default Row