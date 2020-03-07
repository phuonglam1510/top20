import React, { Component } from 'react';
import axios from 'axios'

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
      gridGap: "10px",
      //backgroundColor: "#2196F3",
      padding: "10px"
    }
  
    const {posts}=this.state
    return (
      <div>
        List of top 20 Houses for Sale
      <div style={gridContainer}>
        {
          posts.length ?
        posts.map(post=><div key={post.id}>Số nhà: {post.house_number}; Đường: {post.house_address}; Diện tích: {post.area}m2</div>):
          null
        }
      </div>
      </div>
     
    )
  }
}
export default HouseList