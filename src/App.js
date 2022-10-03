import './styles.css';
import api from './api';
import { useEffect, useState } from "react";

function App() {

  const [news, setNews] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    api.get("topstories.json")
    .then(async (response) => {

      let result = response.data.slice(0, 30);

      let items = [];

      for(let i = 0; i < 30; i++) {
        await api.get(`item/${result[i]}.json`)
        .then((response) => {
          items.push(response.data);
        })
      }

      setNews(items);

      setLoading(false);

    })

  }, []);

  if(isLoading) {
    return (
      <div className="background">
        <div className="header">
            <h1>Hacker News</h1>
        </div>
        <div className="loading-div">Loading...</div>
      </div>
    )
    
  }

  return (
    <div className="background">
      <div className="header">
          <h1>Hacker News</h1>
        </div>
        <div className="news-container">
          {news.map((item, index) => (
            <div className="news" key={item}>
              <div className="title">
                <h1><a href={item.url}>#{parseInt(index) + 1}</a></h1>
              </div>
              <div className="description">
                <h1><a href={item.url}>{item.title}</a></h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

}


export default App;


/*class App extends Component {

  state = {
    news: []
  }

  async componentDidMount() {

    let items = [];

    await api.get('topstories.json')
    .then((response) => {

      let result = response.data.slice(0, 10);

      result.forEach(item => {
  
        api.get(`item/${item}.json`)
        .then((response) => {
          items.push(response.data.title);
        })

      })

    })

    console.log(items);


    /*await api.get('topstories.json')
    .then(async (response) => {

      let result = response.data.slice(0, 30);

      let items = [];
      
      await result.forEach(async item => {
  
        await api.get(`item/${item}.json`)
        .then((response) => {
          items.push(response.data.title);
          console.log(response.data.title);
        })

      })

      console.log("finish")

      this.setState({news: items});

    })

  }

  render() {

    const { news } = this.state;

    return(
      <div className="background">
        <div className="header">
          <h1>Hacker News</h1>
        </div>
        <div className="news-container">
          {news.map(item => (
              <div className="news" key={item}>
                <div className="title">
                  <h1>#01</h1>
                </div>
                <div className="description">
                  <h1>{item.title}</h1>
                </div>
              </div>
          ))}
        </div>
      </div>
    );

  }

}

/*async function updateNews() {

  const response = await api.get('topstories.json');

  let result = response.data.slice(0, 30);

  let news = [];

  result.forEach(async id => {

    const response = await api.get(`item/${id}.json`);

    let result = response.data;

    news.push(result);

  })

  return news;

}

function App() {

  const news = updateNews();

  return (
    <div className="background">
      <div className="header">
        <h1>Hacker News</h1>
      </div>
      <div className="news-container">
        {news.map(item => (
            <div className="news">
              <div className="title">
                <h1>#01</h1>
              </div>
              <div className="description">
                <h1>${item.title}</h1>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
*/

/*function App() {

  const [news, setNews] = useState([]);

  //console.log("1", news)

  useEffect(() => {

    api.get("topstories.json")
    .then((response) => {

      let result = response.data.slice(0, 30);

      let items = [];

      console.log(1)

      result.forEach(item => {
        api.get(`item/${item}.json`)
        .then((response) => {
          items.push("sexo");
        })

        console.log("in")
      })

      console.log(2)

      items = JSON.stringify(items);

      setNews(items);

    })

  }, []);

  console.log("waiting", news)

  console.log(Object.keys(news).map((key) => [Number(key), news[key]]))

  if(news === [] || news == undefined || news.length <= 0) return;

  console.log("done", news)

  return (
    <div className="App">
      <h1>teste: {news}</h1>
    </div>
  );

}


export default App;
*/