import React, { Component } from 'react';
import axios from 'axios'
import './HouseList.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
class HouseList extends Component{
  constructor(pros){
    super(pros)

    this.state={
      posts:[]
    }
  }
  componentDidMount(){
    axios.post('http://crm.thinhgia.com.vn/api/web/search?page=1&size=20')
    .then(Response=>{
      console.log(Response)
      this.setState({posts: Response.data.data.data})
    })
    .catch(error=>{
      console.log(error)
    })
  }
  render(){
    const gridContainer= {
      display: "grid",
      height: "400px",
      alignContent: "center",
      gridTemplateColumns: "auto auto auto",
      gridGap: "5px",
      //backgroundColor: "#2196F3",
      padding: "10px"
    }
  
    const {posts}=this.state
    return (
      <div>
        List of top 20 Houses for Sale
      <div style={gridContainer} >
        {
          posts.length ?
        posts.map(post=>
          <div className="card" key={post.id}>
            <img src={'http://crm.thinhgia.com.vn/'+post.image.public[0].main}/>
            <h1>{post.title};</h1>
            <p className="price">{post.into_money/1000000};</p>
            <p>{post.house_number}, {post.house_address}, DT: {post.area}m2</p>
            <p><button>Chi tiết</button></p>
          </div>):
          null
        }
      </div>
      </div>
    )
  }
}
export default HouseList