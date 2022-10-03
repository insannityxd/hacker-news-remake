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
