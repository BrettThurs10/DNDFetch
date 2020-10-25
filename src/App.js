import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const gcustomKey = process.env.REACT_APP_GOOGLE_CUSTOM_IMAGE_SEARCH_KEY
  useEffect(() => {
    let query = 'ankheg'
    let queryURL = `https://evening-fjord-19580.herokuapp.com/https://forgottenrealms.fandom.com/api.php?action=query&prop=images&titles=${query}&format=json`
    fetch(queryURL)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          let pageID = Object.keys(result.query.pages)[0]
          console.log(pageID)
          let imgURL = `https://evening-fjord-19580.herokuapp.com/https://forgottenrealms.fandom.com/api.php?action=imageserving&wisId=${pageID}&format=json`

          fetch(imgURL)
          .then(res => res.json())
          .then(
            (res) => {
              console.log(res.image.imageserving)
            })


        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  return (
    <div className="App">

    </div>
  );
}

export default App;
