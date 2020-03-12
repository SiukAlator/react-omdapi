import React, { Component } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import notFound from '../assets/photo-video-solid.svg';
import notFavorite from '../assets/star-regular.svg';
import favoriteIMG from '../assets/star-solid.svg';
import $ from 'jquery';


class MyModal extends Component {
    favorite() {
        let arrayFavorite = localStorage.getItem('favorites');
        let index = -1;
        if (arrayFavorite !== null && arrayFavorite !== "") {
            arrayFavorite = JSON.parse(arrayFavorite);
            index = arrayFavorite.map(function (e) { return e.imdbID; }).indexOf(this.imdbID);
        }
        /**Si se encuentra en favoritos */
        if (index !== -1) {

            $('#' + this.imdbID + '_img2').attr("src", notFavorite);
            $('#' + this.imdbID + '_img').attr("src", notFavorite);
            arrayFavorite.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(arrayFavorite));
        }
        else {
            if (arrayFavorite === null || arrayFavorite === "")
                arrayFavorite = [];
            arrayFavorite.push({ imdbID: this.imdbID, Poster: this.Poster, Year: this.Year, Title: this.Title });
            localStorage.setItem('favorites', JSON.stringify(arrayFavorite));
            $('#' + this.imdbID + '_img2').attr("src", favoriteIMG);
            $('#' + this.imdbID + '_img').attr("src", favoriteIMG);

        }
    }



    render() {

        const { title, ano, genre, director, plot, ratings, poster, imdbID, onRequestClose } = this.props;
        let srcImg = poster;
        let classImg = "imageModal";
        if (poster === 'N/A') {
            srcImg = notFound;
            classImg = "imageModalNA";
        }
        this.imdbID = imdbID;
        let srcFavorite = notFavorite
        let arrayFavorite = localStorage.getItem('favorites');
        if (arrayFavorite !== null && arrayFavorite !== "") {
            arrayFavorite = JSON.parse(arrayFavorite);
            if (arrayFavorite.map(function (e) { return e.imdbID; }).indexOf(this.imdbID) !== -1)
                srcFavorite = favoriteIMG;
        }
        let idImg = imdbID + '_img2';
        return (
            <Modal
                onRequestClose={onRequestClose}
                effect={Effect.Sign3D}>
                <div class="modalDetail">
                    <img onClick={this.favorite.bind(this)} id={idImg} src={srcFavorite} class="notFavorite" alt=""/>
                    <img class={classImg} src={srcImg} alt=""/>
                    <h4>{title}</h4>
                    <h5><b>Year:</b> {ano}</h5>
                    <h5><b>Genre:</b> {genre}</h5>
                    <h5><b>Director:</b> {director}</h5>
                    <h5><b>Plot:</b> {plot}</h5>
                    <button class="btn btn-primary closeModal"  onClick={ModalManager.close}>Cerrar</button>
                </div>
            </Modal>
        );
    }
}

export default MyModal;