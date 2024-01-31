import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import moment from 'moment';

function NewsApp() {

  const [newsData, setNewsData] = useState([]);
  let [queryData, setQueryData] = useState("");
  let [isLoading, setIsLoading] = useState(false);


  useEffect(() => {

    function getTrendingNews() {

      const options = {
        method: 'GET',
        url: 'https://news-api14.p.rapidapi.com/top-headlines',
        params: {
          country: 'us',
          language: 'en',
          pageSize: '10',
          category: 'sports'
        },
        headers: {
          'X-RapidAPI-Key': '9dc60c220cmsh7024712508b2c9fp17b530jsna95de016bbc5',
          'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'
        }
      };

      axios.request(options)
        .then((response) => {
          console.log(response.data)
          setNewsData(response.data.articles)
        })
        .catch((error) => {
          console.log(error);
        })
    }

    getTrendingNews();
  }, [])

  let getNews = (e) => {
    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://news-api14.p.rapidapi.com/search',
      params: {
        q: queryData,
        country: 'us',
        language: 'en',
        pageSize: '10',
        publisher: 'cnn.com,bbc.com'
      },
      headers: {
        'X-RapidAPI-Key': '9dc60c220cmsh7024712508b2c9fp17b530jsna95de016bbc5',
        'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'
      }
    };

    setIsLoading(true);
    axios.request(options)
      .then(response => {
        setIsLoading(false);
        console.log("objects:", response);
        setNewsData(response.data.articles);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });

      e.target.reset();
  }

  return (
    <div className='mainContainer'>
      <header>
        <h2>News App</h2>
      </header>
      <br />
      <form className='newsForm' onSubmit={getNews}>
        <input
          className='topicInput'
          type="text"
          placeholder='Search news here....'
          required
          onChange={(e) => {
            setQueryData(e.target.value)
          }}
        />
        <input className='newsBtn' type="submit" value="Get News" />
      </form>

      <div className='loading'>
        <p>{(isLoading ? 'Loading....' : '')}</p>
      </div>

      <div className='postContainer'>
        {newsData.map(eachNews => (
          <div className='post' key={eachNews?.title}>
            <div>
              <a className='titleUrl' href={eachNews?.url}> {eachNews?.title}</a>
              <p>{moment(eachNews?.published_date).format('MMMM Do YYYY, h:mm:ss a')}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsApp;
