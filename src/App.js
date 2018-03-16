import React, { Component } from 'react';
import icon from './images/icon.png';
import prev from './images/prev.png';
import next from './images/next.png';
import search from './images/search.png';
import git from './images/git.png'
import loading from './images/loading.gif';
import linkedin from './images/linkedin.png';
import './App.css';
const data = require('./data.js');
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      films: null,
      idx: 0,
      swiping: true
    }
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.onePrev = this.onePrev.bind(this);
    this.oneNext = this.oneNext.bind(this);
    this.twoPrev = this.twoPrev.bind(this);
    this.twoNext = this.twoNext.bind(this);
    this.threePrev = this.threePrev.bind(this);
    this.threeNext = this.threeNext.bind(this);
  }

  componentDidMount() {
    axios.get('https://www.snagfilms.com/apis/films.json?limit=10').then(obj => {
      this.setState({
        films: obj.data.films.film,
        categoryOne: obj.data.films.film.slice(0, 7),
        categoryTwo: obj.data.films.film.slice(0, 7),
        categoryThree: obj.data.films.film.slice(0, 7),
        categoryFour: obj.data.films.film.slice(0, 7),
        loading: false
      }, () => {
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

  oneNext() {
    this.setState({
      categoryOne: this.state.films.slice(3, 10)
    })
  }

  onePrev() {
    this.setState({
      categoryOne: this.state.films.slice(0, 7)
    })
  }

  twoNext() {
    this.setState({
      categoryTwo: this.state.films.slice(3, 10)
    })
  }

  twoPrev() {
    this.setState({
      categoryTwo: this.state.films.slice(0, 7)
    })
  }

  threeNext() {
    this.setState({
      categoryThree: this.state.films.slice(3, 10)
    })
  }

  threePrev() {
    this.setState({
      categoryThree: this.state.films.slice(0, 7)
    })
  }

  render() {
    return this.state.loading ? <div className="App"><img className="loading" src={loading} alt="Loading..."/></div> : (
      <div className="App">
        <header className="App-header">
          <img src={icon} className="App-logo grid-item" alt="logo" />
          <div className="header-text-1">HOME</div>
          <div className="header-text-2">MOVIES</div>
          <div className="header-text-3">SHOWS</div>
          <div className="filler"></div>
          <img className="search" src={search} alt="search"></img>
          <div className="login">LOGIN</div>
        </header>
        <div className="gallery-container">
          {
            this.state.films === null ? <p>Loading...</p> : 
            <div className="gallery">
              <div id="gallery-description">{this.state.films[this.state.idx].title}</div>
              <button id="watch">Watch Now</button>
              <div id="buttonContainer">
                <img id="prev" src={prev} onClick={this.prev} alt="prev"/>
                {/*need to add circles in here somehow...*/}
                <img id="next" src={next} onClick={this.next} alt="next"/>
              </div>
              <img className="gallery-photo" src={this.state.films[this.state.idx].images.image[0].src} alt="gallery" onError={() => {alert('Something on the browser is blocking an image. Perhaps adblocker?')}}/>
            </div>
          }
        </div>
        <h3>SAMPLE CATEGORY</h3>
        <div className="category"><img src={prev} id="category-prev" onClick={this.onePrev} alt="prev"/>{this.state.categoryOne ? this.state.categoryOne.map((film, i) => {
          return (<div className="card" key={i} style={{"color": "white"}}><div className="play"><img src="http://cdn1.iconfinder.com/data/icons/flavour/button_play_blue.png" alt="" /> </div><img className="category-photo" src={film.images.image[0].src}/>{film.title}</div>)
        }) : null}<img src={next} id="category-next" onClick={this.oneNext} alt="next"/></div>
        <h3>SAMPLE CATEGORY</h3>
        <div className="category"><img src={prev} id="category-prev" onClick={this.twoPrev}/>{this.state.categoryTwo ? this.state.categoryTwo.map((film, i) => {
          return (<div className="card" key={i} style={{"color": "white"}}><div className="play"><img src="http://cdn1.iconfinder.com/data/icons/flavour/button_play_blue.png" alt="" /> </div><img className="category-photo" src={film.images.image[0].src}/>{film.title}</div>)
        }) : null}<img src={next} id="category-next" onClick={this.twoNext}/></div>
        <h3>SAMPLE CATEGORY</h3>
        <div className="category"><img src={prev} id="category-prev" onClick={this.threePrev} alt="prev"/>{this.state.categoryThree ? this.state.categoryThree.map((film, i) => {
          return (<div className="card" key={i} style={{"color": "white"}}><div className="play"><img src="http://cdn1.iconfinder.com/data/icons/flavour/button_play_blue.png" alt="" /> </div><img className="category-photo" src={film.images.image[0].src}/>{film.title}</div>)
        }) : null}<img src={next} id="category-next" onClick={this.threeNext} alt="next"/></div>
        <footer>
          <div style={{"color":"white"}}>
            <h4>Built by Ethan Lipkind</h4>
          </div>
          <div>
            <a href="https://github.com/ethantheman" style={{"color":"white", "fontFamily": "sans-serif"}}>
              <img style={{"height": "50px", "width": "50px", "position": "relative"}} src={git} alt="github"/>
            </a>
            <a href="https://linkedin.com/in/ethan-lipkind" style={{"color":"white", "fontFamily": "sans-serif"}}>
              <img style={{"height": "50px", "width": "50px", "position": "relative"}} src={linkedin} alt="linkedin"/>
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;