import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import "./HouseList.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useParams
} from "react-router-dom";

class HouseList extends Component {
  // constructor(pros) {
  //   super(pros);

  //   this.state = {
  //     posts: []
  //   };
  // }

  // componentDidMount() {
  //   axios
  //     .post("http://crm.thinhgia.com.vn/api/web/search?page=1&size=20")
  //     .then(Response => {
  //       this.setState({
  //         posts: Response.data.data.data
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
  getUrl = post => "";
  render() {
    const gridContainer = {
      display: "grid",
      height: "200px",
      alignContent: "center",
      gridTemplateColumns: "auto auto auto auto",
      gridGap: "5px",
      //backgroundColor: "#2196F3",
      padding: "10px"
    };

    const { posts } = this.props;

    return (
      <Switch>
        <div style={gridContainer}>
          {posts.length
            ? posts.map(post => {
                let url = "";

                if (post.image && post.image.public && post.image.public[0]) {
                  url =
                    "http://crm.thinhgia.com.vn/" + post.image.public[0].main;
                }

                return (
                  <div className="card" key={post.id}>
                    <img src={url} />
                    <h1>{post.title};</h1>
                    <p className="price">
                      Giá: {post.into_money / 1000000000} tỉ;
                    </p>
                    <p>
                      Đ/c: {post.house_number}, {post.house_address}, DT:{" "}
                      {post.area}m2
                    </p>
                    <p>
                      <Link
                        key={post.id}
                        to={{
                          pathname: `/house/${post.id}`
                        }}
                      >
                        Chi tiết
                      </Link>
                    </p>
                  </div>
                );
              })
            : null}
        </div>
      </Switch>
    );
  }
}
export default function HouseListLoadExample() {
  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

function ImageView({ posts }) {
  console.log("ssss");
  let { id } = useParams();
  let post = posts.find(function(element) {
    return element.id == id;
  });

  if (!post) return <div>House not found</div>;

  return (
    <div className="card">
      {/* <img src={"http://crm.thinhgia.com.vn/" + post.image.public[0].main} /> */}
      <h1>{post.title};</h1>
      <p className="price">Giá: {post.into_money / 1000000000} tỉ;</p>
      <p>Số nhà: {post.house_number}</p>
      <p>
        Đường: {post.house_address}, Phường: {post.district}, TP:{" "}
        {post.province}
      </p>
      <p>Diện tích: {post.area}m2</p>
      <text>{post.description}</text>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>CONG TY BDS ABC</h2>
      <Link to="/top20">Xem top 20 nha sale</Link>
      <ul>
        <li>
          <Link to="/img/2">Tomato</Link>
        </li>
        <li>
          <Link to="/img/4">Crimson</Link>
        </li>
      </ul>
    </div>
  );
}
function ModalSwitch() {
  let location = useLocation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .post("http://crm.thinhgia.com.vn/api/web/search?page=1&size=200")
      .then(Response => {
        setLoading(false);
        setPosts(Response.data.data.data);
      })
      .catch(error => {
        setLoading(false);
        alert(error.message);
      });
  }, []);

  return (
    <div>
      <div>header</div>
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route
          path="/top20"
          children={
            loading ? (
              <div style={{ padding: 50, backgroundColor: "gray" }}>
                loading....
              </div>
            ) : (
              <HouseList posts={posts} />
            )
          }
        />
        <Route path="/house/:id" children={<ImageView posts={posts} />} />
      </Switch>
      <div>footer</div>
    </div>
  );
}
