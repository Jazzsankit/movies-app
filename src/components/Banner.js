import React, { Component } from 'react'
import { movies } from './getMovies'
export default class Banner extends Component {
    render() {
        let movie = movies.results[0];
        // let movie=''
        return (
            <>
                {
                    movie == '' ?
                        <div class="spinner-border text-primary" role="status">
                            <span class="sr-only"></span>
                        </div> :
                        <div className="card banner" >
                            <img className="card-img-top banner-img" src={`https://image.tmdb.org/t/p/original/6EdKBYkB1ssgGjc249ud1L55o8d.jpg`} alt="Turning Red" />
                            <div className="card-body">
                                <h2 className="card-title banner-title">{movie.original_title}</h2>
                                <p className="card-text banner-text">{movie.overview}</p>
                            </div>
                        </div>
                }
            </>
        )
    }
}
