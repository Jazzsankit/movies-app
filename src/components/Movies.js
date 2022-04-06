import React, { Component } from 'react'
// import { movies } from './getMovies';
import axios from 'axios';

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            page: [1],
            currPage: 1,
            movies: [],
            favourites:[]
        }
    }
    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=503ad054a26b4da8254ef21dfc11db08&language=en-US&page=${this.state.currPage}`)
        let data = res.data;
        console.log("data")
        this.setState({
            movies: [...data.results]
        })
        let oldData =JSON.parse(localStorage.getItem('movies') || "[]");
        let temp = oldData.map((movieObj)=>movieObj.id);
        this.setState({
            favourites:[...temp]
        }) 
    }
    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=503ad054a26b4da8254ef21dfc11db08&language=en-US&page=${this.state.currPage}`)
        let data = res.data;
        // console.log("data")
        this.setState({
            movies: [...data.results]
        })
    }
    handleRight = () => {
        this.setState({
            page: [...this.state.page, this.state.page.length + 1],
            currPage: this.state.currPage + 1,
        },this.changeMovies)
        
    }
    handleLeft=()=>{
        if(this.state.currPage!=1){
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMovies)
        }
    }
    handleClick=(value)=>{
        if(this.state.currPage!=value){
            this.setState({
                currPage: value
            },this.changeMovies)

        }
    }
    handleFavourite=(movieObj)=>{
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]");
         if(this.state.favourites.includes(movieObj.id)){
            oldData = oldData.filter((m)=>m.id!=movieObj.id);
         }else{
              oldData.push(movieObj);
         }
         localStorage.setItem("movies",JSON.stringify(oldData));
        //  console.log(oldData);
         this.handleFavouriteState();
    }
    handleFavouriteState=()=>{
        let oldData =JSON.parse(localStorage.getItem('movies') || "[]");
        let temp = oldData.map((movieObj)=>movieObj.id);
        this.setState({
            favourites:[...temp]
        })
    }
    render() {
        // let movie = movies.results;
        // let movie=''
        // console.log("movie")
        return (
            <>
                {
                    this.state.movies.length == '' ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span>
                        </div> :
                        <div className='movies-list'>
                            {
                                this.state.movies.map((movieObj) => (
                                    <div className="card movies-card" onMouseEnter={() => { this.setState({ hover: movieObj.id }) }} onMouseLeave={() => { this.setState({ hover: '' }) }} >
                                        <img className="card-img-top movies-img" src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.original_title} />
                                        <div className="card-body" style={{ display: "flex", justifyContent: "center" }}>
                                            <h2 className="card-title movies-title">{movieObj.original_title}</h2>
                                            {/* <p className="card-text card-text">{movieObj.overview}</p> */}
                                            {this.state.hover == movieObj.id &&
                                                <a className="btn btn-primary add-btn" onClick={()=>this.handleFavourite(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove From":"Add to"}  favourites</a>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                            <div style={{display:'block',justifyContent:'center'}} class="row">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" onClick={this.handleLeft} aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                                <span className="sr-only"></span>
                                            </a>
                                        </li>
                                        {this.state.page.map((pageObj) => (
                                            <li className="page-item"><a className="page-link"  onClick={()=>this.handleClick(pageObj)}>{pageObj}</a></li>

                                        ))}
                                        <li className="page-item" onClick={this.handleRight}>
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                                <span className="sr-only"></span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                }
            </>
        )
    }
}
