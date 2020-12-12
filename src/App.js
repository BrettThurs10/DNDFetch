import React, { useState, useEffect } from "react";
import "./App.css";
import Filters from "./components/Filters"
import Card from "./components/Card"
import Feed from "./components/Feed"
import { setRef } from "@material-ui/core";
import Map from "./img/ForestPathPublic.jpg";


function App() {

  const [data, setData] = useState('');
  const [conditions, setConditions] = useState(null);
  const [cardLibrary, setCardLibrary] = useState([]);
  const [refresh, setRefresh] = useState(true)

  useEffect(()=>{
  getConditions()
  }, [])

  function handleSaveCard(cardObj){
    let array = cardLibrary;
    array.push(cardObj);
    setCardLibrary(array)
    setRefresh(!refresh)
    console.log(cardLibrary)
  }


  async function getCondition(condition){
if (condition !== null){
  let url = `https://www.dnd5eapi.co/api/conditions/${condition.toLowerCase()}`;
  await fetch(url)
    .then((res) => res.json())
    .then(
      async (result) => {
        // setIsLoaded(true);
        let desc = result.desc.join(' ').replace(/- /g, '')
        let name = result.name;
        let conditionsObject = {
          name,
          desc
        };
        return conditionsObject
      }
    )
}

  }

  function removeCard(name){
    let newLibrary = cardLibrary.filter(x=>
      x.name !== name
    )
    setCardLibrary(newLibrary)
    setRefresh(!refresh)
  }

  async function getConditions(){
    let url = `https://www.dnd5eapi.co/api/conditions`;
    await fetch(url)
      .then((res) => res.json())
      .then(
        async (result) => {
          // setIsLoaded(true);
          if (result){
            let res = result.results
      if (res !== undefined){
        console.log(res)
        console.log('conditions results')
        let conditionsArr = []
        res.forEach(async function(x){
          await conditionsArr.push(x.name)
        })

        setConditions(conditionsArr)
        // console.log(getCondition(conditions[0]))
      }
          }

        }
      )
  }

  function loadCard(name){
    console.log(name)
    cardLibrary.forEach(function(obj){
      if (obj.name == name){
        setData(obj)
        setRefresh(!refresh)
        console.log(obj)
        return false
      }
    })
  }


  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-row w-full">
      <div className="flex w-1/4 bg-blue-200 flex-row">
]        <Filters setData={(val)=>setData(val)}  />

        </div>
        <div
        style={{

  background:`linear-gradient(0deg, rgba(255, 0, 255, 0.3), rgba(255, 0, 150, 0.3)), url(${Map})`,
          backgroundSize: 'cover',
        }}
        className="w-1/2 bg-red-200 overflow-y-scroll">
          <Card
          refresh={!refresh}
          cardLibrary={cardLibrary}
          saveThisCard={(cardObj)=>handleSaveCard(cardObj)}
          conditions={conditions}
          data={data}
          setData={(val)=>setData(val)} />
        </div>
        <div className="flex w-1/4 bg-green-200 flex-row">
        <Feed
        removeCard={(name)=>removeCard(name)}
        refresh={!refresh} cardLibrary={cardLibrary} loadCard={(name)=>loadCard(name)} data={data}/>
        </div>
      </div>
    </div>
  );
}

export default App;
