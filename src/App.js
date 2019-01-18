import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const fileDownload = require('js-file-download');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {url: ''};
  }

  makeRequest = () => {
    const instance = axios.create({baseURL: 'http://localhost:4000'})
    instance.post('/download', {
      url: this.state.url
    })
    .then(function (response) {
      // fileDownload(data, 'filename.csv');
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleUrlChange = (event) => {
    this.setState({url: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h4>YoutubeDL</h4>
          <form>
            <div className="input-group border-0 shadow-lg">
              <div className="input-group-prepend">
                <span className="input-group-text">https://</span>
              </div>
              <input type="text" className="form-control form-control-lg"
                placeholder="youtube video url"
                value={this.state.url}
                onChange={this.handleUrlChange}/>
              <div className="input-group-append">
                <span className="input-group-text" onClick={this.makeRequest}>Download</span>
              </div>
            </div>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
