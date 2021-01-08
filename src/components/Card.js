import React, { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import MonsterCardBody from "../components/MonsterCardBody";
import LootCardBody from "../components/LootCardBody";
import SpellsCardBody from "../components/SpellsCardBody";
import CardControls from "../components/CardControls";
library.add(faChevronRight, faSave);

function Card(props) {
  const [data, setData] = useState(props.data);
  const [refresh, setRefresh] = useState(props.refresh);
  const [activePanel, setActivePanel] = useState(props.activePanel);

  useEffect(() => {
    setData(props.data);
    setRefresh(props.refresh);
    setActivePanel(props.activePanel);
  });

  function saveThisCard(cardObj) {
    let arr = [];
    props.cardLibrary.forEach((element) => {
      arr.push(element.name);
    });
    if (arr.indexOf(cardObj.name) == -1) {
      props.saveThisCard(cardObj);
    } else {
      alert("You already have this card.");
    }
  }

  const myName = data.name;




  function returnCardBody(cardType) {
    if (cardType == "monsters") {
      return <MonsterCardBody data={data} myName={myName} />
    } else if (cardType == "loot") {
      return <LootCardBody data={data} myName={myName} />;
    } else if (cardType == "spells") {
      return <SpellsCardBody data={data} myName={myName} />;
    }
  }


  return (
    <div
      id="card"
      className="flex w-full p-6 md:px-12 lg:px-24 items-center justify-center relative flex-col"
    >
    <CardControls data={data} saveThisCard={(val)=>saveThisCard(val)} />
      <div
        onClick={() => console.log(data.name)}
        className={`shadow-xl flex flex-col w-full bg-red-600 p-5 mx-10 my-2 rounded ${
          data ? "h-auto" : "h-screen"
        }`}
      >
        {/* {renderLoader()} */}
        {data ? returnCardBody(data.cardType) : null}
      </div>
    </div>
  );
}

export default Card;
