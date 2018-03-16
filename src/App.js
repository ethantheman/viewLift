import React, { Component } from 'react';
import icon from './images/icon.png';
import prev from './images/prev.png';
import next from './images/next.png';
import search from './images/search.png';
import './App.css';
import ImageGallery from 'react-image-gallery';
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: null,
      idx: 0,
      swiping: true
    }
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    axios.get('http://www.snagfilms.com/apis/films.json?limit=10').then(obj => {
      this.setState({films: obj.data.films.film});
      setInterval(() => {
        if ( this.state.swiping ) {
          if ( this.state.films && this.state.idx === this.state.films.length - 1) {
            this.setState({idx: 0});
          } else {
            let i = this.state.idx;
            this.setState({idx: i+1});
          }
        }
      }, 4000);
    });
  }

  next() {
    if ( this.state.films && this.state.idx < this.state.films.length - 1 ) {
      let i = this.state.idx;
      this.setState({idx: i + 1, swiping: false});
    }
  }

  prev() {
    if ( this.state.films && this.state.idx > 0 ) {
      let i = this.state.idx;
      this.setState({idx: i - 1, swiping: false});
    }
  }

  render() {
    /*

    */
    // <h1>{this.state.films[0].title}</h1>
    // let films = [];
    // if ( this.state.films ) {
    //   this.state.films.forEach(film => {
    //     films.push({original: film.images.image[0].src, description: film.title, sizes: "small"});
    //   });
    // }
    return (
      <div className="App">
        <header className="App-header">
          <img src={icon} className="App-logo grid-item" alt="logo" />
          <div className="header-text-1">HOME</div>
          <div className="header-text-2">MOVIES</div>
          <div className="header-text-3">SHOWS</div>
          <div className="filler"></div>
          <img className="search" src={search}></img>
          <div className="login">LOGIN</div>
        </header>
        <div className="gallery-container">
          {
            this.state.films === null ? <p>Loading...</p> : 
            <div className="gallery">
              <div id="gallery-description">{this.state.films[this.state.idx].title}</div>
              <button id="watch">Watch Now</button>
              <div id="buttonContainer">
                <img id="prev" src={prev} onClick={this.prev}/>
                <img id="next" src={next} onClick={this.next}/>
              </div>
              <img className="gallery-photo" src={this.state.films[this.state.idx].images.image[0].src}/>
            </div>
          }
        </div>
        <div className="category"></div>
        <div className="category"></div>
        <div className="category"></div>
        <div className="category"></div>
        <div className="category"></div>
      </div>
    );
  }
}

export default App;
