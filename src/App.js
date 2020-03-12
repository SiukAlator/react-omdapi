import React, { Component } from 'react';
import './App.css';
import assets from './assets/film-solid.svg';
import MovieFound from './components/MovieFound.js';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import favoriteIMG from './assets/star-solid.svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { rows: [<div>Welcome!</div>] }
    // this.performSearch('Avengers');


  }

  reviewFavorites() {
    let arrayFavorite = localStorage.getItem('favorites');
    let index = -1;
    if (arrayFavorite != null && arrayFavorite != "") {
      arrayFavorite = JSON.parse(arrayFavorite);
      for (let i in arrayFavorite) {
        $('#' + arrayFavorite[i] + '_img').attr("src", favoriteIMG);
      }
    }
  }

  performSearch(stringSearch) {
    let urlApi = 'http://www.omdbapi.com/?&page=3&apikey=bd8f017b&s=' + stringSearch;
    $.ajax({
      url: urlApi,
      success: (searchResult) => {
        let movieRows = [];
        console.log('OK!');
        const results = searchResult.Search;
        console.log(results);
        for (let i in results) {
          let movie = <MovieFound movie={results[i]} />;
          movieRows.push(movie);
        }
        this.setState({ rows: movieRows });
        this.reviewFavorites();
      },
      error: (xhr, status, error) => {
        console.log('ERROR:', xhr, status, error);
      }
    });
  }


  searchChangeHandle(e) {
    console.log(e.target.value);
    const obj = this;
    const value = e.target.value;
    obj.performSearch(value);
  }
  render() {

    return (

      <div id="tf-intro" class="text-center">
        <div className="App">
          <center>
            <table id="tableSearch">
              <tbody>
                <tr>
                  <td>
                    <img src={assets} className="App-logo" alt="logo" />
                  </td>
                  <td width="8px"></td>
                  <td>
                    <h1>Movies Search</h1>
                  </td>
                </tr>
              </tbody>

            </table>
            <br />
            <input placeholder="Enter movie name" id="input-search" onChange={this.searchChangeHandle.bind(this)}></input>
          </center>
          <br />
          {this.state.rows}
        </div>
      </div>

    );
  }



}

export default App;
