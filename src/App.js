import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import Filters from "./components/Filters"
import Controls from "./components/Controls"
import Results from "./components/Results"
import Feed from "./components/Feed"

function App() {

  const [data, setData] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [conditions, setConditions] = useState(null)

  useEffect(()=>{
  getConditions()
  }, [])

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


  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-row">
        <div className="flex-1 bg-red-200 overflow-y-scroll">
          <Results
          conditions={conditions}
          data={data} setData={(val)=>setData(val)} />
        </div>
        <div className="flex w-1/2 bg-blue-200 flex-row">
        <Feed data={data}/>
        <Filters setData={(val)=>setData(val)}  />

        </div>
      </div>
    </div>
  );
}

export default App;
