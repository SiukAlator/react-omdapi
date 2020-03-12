import React from 'react';
import $ from 'jquery';
import MyModal from './modalDetail.js';
import { ModalManager } from 'react-dynamic-modal';
import notFound from '../assets/photo-video-solid.svg';
import notFavorite from '../assets/star-regular.svg';
import favoriteIMG from '../assets/star-solid.svg';

class MovieFound extends React.Component {


    viewDetail() {
        let urlApi = 'http://www.omdbapi.com/?plot=full&apikey=bd8f017b&i=' + this.props.movie.imdbID;
        $.ajax({
            url: urlApi,
            success: (searchResult) => {

                const title = searchResult.Title;
                const ano = searchResult.Year;
                const genre = searchResult.Genre;
                const director = searchResult.Director;
                const plot = searchResult.Plot;
                const ratings = searchResult.Ratings.length > 0 ? searchResult.Ratings[0].Values : null;
                const poster = searchResult.Poster;
                const imdbID = searchResult.imdbID;
                ModalManager.open(<MyModal title={title} ano={ano}
                    genre={genre} director={director}
                    plot={plot} ratings={ratings} poster={poster}
                    imdbID={imdbID} onRequestClose={() => true} />);
            },
            error: (xhr, status, error) => {
                console.log('ERROR:', xhr, status, error);
            }
        });
    }

    favorite() {

        let arrayFavorite = localStorage.getItem('favorites');
        let index = -1;
        if (arrayFavorite !== null && arrayFavorite !== "") {
            arrayFavorite = JSON.parse(arrayFavorite);
            index = arrayFavorite.map(function (e) { return e.imdbID; }).indexOf(this.props.movie.imdbID);
        }
        /**Si se encuentra en favoritos */
        if (index !== -1) {

            $('#' + this.props.movie.imdbID + '_img').attr("src", notFavorite);
            arrayFavorite.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(arrayFavorite));
            if (this.props.fromFavorite === "true")
            {
                console.log('ECHO!');
                $('#'+this.props.movie.imdbID + '_box').css('display','none');
            }
        }
        else {
            if (arrayFavorite === null || arrayFavorite === "")
                arrayFavorite = [];
            arrayFavorite.push({ imdbID: this.props.movie.imdbID, Poster: this.props.movie.Poster, Year: this.props.movie.Year, Title: this.props.movie.Title });
            localStorage.setItem('favorites', JSON.stringify(arrayFavorite));
            $('#' + this.props.movie.imdbID + '_img').attr("src", favoriteIMG);

        }
    }


    render() {

        let srcImg = this.props.movie.Poster;
        let classImg = "poster_list";
        if (this.props.movie.Poster === 'N/A') {
            srcImg = notFound;
            classImg = "poster_list_na";
        }
        let idImg = this.props.movie.imdbID + '_img';
        let idBox = this.props.movie.imdbID + '_box';
        return <div class="col-sm-6 col-md-4" id={idBox}>
            <div class="thumbnail">

                <img id={idImg} src={notFavorite} class="notFavorite" onClick={this.favorite.bind(this)} alt=""></img>
                <img src={srcImg} alt="poster" class={classImg} />
                <div class="caption">
                    <h3>{this.props.movie.Title}</h3>
                    <p>Year: {this.props.movie.Year}</p>
                    <p>
                        <button class="btn btn-primary" onClick={this.viewDetail.bind(this)}>Ver</button>
                    </p>
                </div>
            </div>
        </div>;
    }
}

export default MovieFound;