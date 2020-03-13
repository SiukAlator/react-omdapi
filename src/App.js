import React, { Component } from 'react';
import './App.css';
import assets from './assets/film-solid.svg';
import MovieFound from './components/MovieFound.js';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import favoriteIMG from './assets/star-solid.svg';
import apiKey from './components/config.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    // this.performSearch('Avengers');
    this.setState({ rows: [<div>Welcome!</div>] });

  }

  reviewFavorites() {
    let arrayFavorite = localStorage.getItem('favorites');
    if (arrayFavorite !== null && arrayFavorite !== "") {
      arrayFavorite = JSON.parse(arrayFavorite);
      for (let i in arrayFavorite) {
        $('#' + arrayFavorite[i].imdbID + '_img').attr("src", favoriteIMG);
      }
    }
  }

  performSearch(stringSearch) {
    let urlApi = 'http://www.omdbapi.com/?&page=3&apikey='+apiKey.key+'&s=' + stringSearch;
    $.ajax({
      url: urlApi,
      success: (searchResult) => {
        let movieRows = [];
        const results = searchResult.Search;
        /**En caso de que encuentre un resultado */
        if (searchResult.Response === "True")
        {
          for (let i in results) {
            let movie = <MovieFound movie={results[i]} fromFavorite="false"/>;
            movieRows.push(movie);
          }
          this.setState({ rows: movieRows }, ()=>{
            this.reviewFavorites();
          });
        }
        else if (stringSearch === "")
        {
          this.setState({ rows: [<div>...waiting for search</div>] });
        }
        else
        {
          this.setState({ rows: [<div>Result not found :C</div>] });
        }
        
      },
      error: (xhr, status, error) => {
        console.log('ERROR:', xhr, status, error);
      }
    });
  }


  searchChangeHandle(e) {
    const obj = this;
    const value = e.target.value;
    obj.performSearch(value);
  }

  listFavorites(){

    let listRows = [];
    let arrayFavorite = localStorage.getItem('favorites');
    this.setState({ rows: listRows });
    if (arrayFavorite !== null && arrayFavorite !== "") {
      arrayFavorite = JSON.parse(arrayFavorite);
      for (let i in arrayFavorite) {
        let movie = <MovieFound movie={arrayFavorite[i]} fromFavorite="true" />;
        listRows.push(movie);
      }
    }

    this.setState({ rows: listRows }, ()=>{
      this.reviewFavorites();
    });
    
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
                    <img src={assets} className="App-logo" alt="" />
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
            <button class="btn btn-default" onClick={this.listFavorites.bind(this)} > <img class="favoriteIcon" src={favoriteIMG} alt=""></img> Favorites</button> 
          </center>
          <br />
          {this.state.rows}
        </div>
      </div>

    );
  }



}

export default App;
