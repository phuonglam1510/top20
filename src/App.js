import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import HouseList from './HouseList'
/*
async componentDidMount(){
  const url="http://crm.thinhgia.com.vn/api/web/search?page=1&size=20"
  const response=await fetch(url);
  const data=await response.json();
  console.log(data);
}*/

class App extends Component {
  render(){
    return (
      <div className="App">
        <HouseList/>
      </div>
    );
  }
  
}

export default App;
