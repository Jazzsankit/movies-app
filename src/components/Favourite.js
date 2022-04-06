import React, { Component } from 'react'
import { movies } from './getMovies';
// import { favourites } from './Movies';
import Movies from './Movies';

export default class Favourite extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currGenres: 'All Genres',
            movies: [],
            currText: "",
            currPage: "1",
            pages: [],
            limit: '5'
        }
    }
    componentDidMount() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let data = JSON.parse(localStorage.getItem("movies") || "[]");
        let temp = [];
        data.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]])
            }
        })
        temp.unshift('All Genres');
        this.setState({
            movies: [...data],
            genres: [...temp]
        })

        // console.log(pgSize)
    }
    handleCurrGenre = (obj) => {
        this.setState({
            currGenres: obj
        })
    }
    handlePoplarityDesc = () => {
        // console.log("click desc")
        let temp = this.state.movies;
        temp.sort(function (a, b) {
            return a.popularity - b.popularity < 0
        })
        this.setState({
            movies: [...temp]
        })
    }
    handlePoplarityAsec = () => {
        let temp = this.state.movies;
        temp.sort(function (a, b) {
            return a.popularity - b.popularity > 0
        })
        this.setState({
            movies: [...temp]
        })
    }
    handleRatingDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (a, b) {
            return a.vote_average - b.vote_average < 0
        })
        this.setState({
            movies: [...temp]
        })
    }
    handleRatingAsec = () => {
        let temp = this.state.movies;
        temp.sort(function (a, b) {
            return a.vote_average - b.vote_average > 0
        })
        this.setState({
            movies: [...temp]
        })
    }
    handlePageClick = (val) => {
        this.setState({
            currPage: val
        })
    }
    handleDelete = (title) => {
        let temp = [...this.state.movies];
        temp = temp.filter((movieObj) => movieObj.id != title)
        console.log(temp)
        this.setState({
            movies: [...temp]
        })
        localStorage.setItem("movies", JSON.stringify(temp))
    }
    render() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let filterarr = [];

        if (this.state.currText == '') {
            filterarr = this.state.movies;
        } else {
            filterarr = this.state.movies.filter((movieObj) => {
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText);
            })
        }
        if (this.state.currGenres != 'All Genres') {
            filterarr = this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currGenres)
        }
        let pgSize = Math.ceil(this.state.movies.length / this.state.limit);
        let temp1 = [];
        for (let i = 0; i < pgSize; i++) {
            temp1.push(i + 1);
        }
        this.state.pages = temp1;
        let si = (this.state.currPage - 1) * this.state.limit;
        let ei = (this.state.currPage) * this.state.limit;
        filterarr = filterarr.slice(si, ei);

        // console.log(this.state.pages)
        return (
            <div>
                <div >
                    <div class="row">
                        <div class="col-3 favourites-genres">
                            <ul class="list-group">
                                {
                                    this.state.genres.map((obj) => (
                                        this.state.currGenres == obj ?
                                            <li class="list-group-item" style={{ background: '#3f51b5', color: 'white' }}>{obj}</li> :
                                            <li class="list-group-item" style={{ background: 'white', color: '#3f51b5' }} onClick={() => this.handleCurrGenre(obj)}>{obj}</li>

                                    ))

                                }
                            </ul>
                        </div>
                        <div class="col-9 favourite-container" >
                            <div className='row'>
                                <input type='text' className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(e) => { this.setState({ currText: e.target.value }) }} />
                                <input type='number' className='input-group-text col' placeholder='Row Count' value={this.state.limit} onChange={(e) => { this.setState({ limit: e.target.value }) }} />
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.handlePoplarityDesc} />Popularity<i class="fa-solid fa-sort-down" onClick={this.handlePoplarityAsec} /></th>
                                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.handleRatingDesc}></i>Rating<i class="fa-solid fa-sort-down" onClick={this.handleRatingAsec}></i></th>
                                        <th scope='col'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterarr.map((movieObj) => (
                                            <tr>
                                                <th scope="row">
                                                    <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.original_title} style={{ width: '5rem' }} />
                                                    {movieObj.original_title}
                                                </th>
                                                <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                <td>{movieObj.popularity}</td>
                                                <td>
                                                    {movieObj.vote_average}
                                                </td>
                                                <td>

                                                    <button class="btn btn-danger" onClick={() => this.handleDelete(movieObj.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

                                <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'center' }} class="row">
                                    <ul class="pagination">
                                        {
                                            this.state.pages.map((val) => (
                                                <li class="page-item" onClick={() => this.handlePageClick(val)}><a class="page-link">{val}</a></li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
