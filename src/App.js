import React, { useState, useEffect } from "react";
import "./App.css";
import Filters from "./components/Filters";
import Card from "./components/Card";
import Feed from "./components/Feed";
import Map from "./img/ForestPathPublic.jpg";
import Logo from "./components/Logo";
import { Helmet } from "react-helmet";

const storage = localStorage.getItem("cardLibrary");

function App() {
  const [data, setData] = useState("");
  const [conditions, setConditions] = useState(null);
  const [cardLibrary, setCardLibrary] = useState(JSON.parse(storage) ?? []);
  const [refresh, setRefresh] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePanel, setActivePanel] = useState("monsters");

  useEffect(() => {
    document.title = '>>DND-Fetch>'
    getConditions();
  }, []);

  function handleSaveCard(cardObj) {
    let array = cardLibrary;
    cardObj.cardType = activePanel;
    array.push(cardObj);
    setCardLibrary(array);
    localStorage.setItem("cardLibrary", JSON.stringify(cardLibrary));
    setRefresh(!refresh);
    console.log(cardLibrary);
  }

  async function getCondition(condition) {
    if (condition !== null) {
      let url = `https://www.dnd5eapi.co/api/conditions/${condition.toLowerCase()}`;
      await fetch(url)
        .then((res) => res.json())
        .then(async (result) => {
          // setIsLoaded(true);
          let desc = result.desc.join(" ").replace(/- /g, "");
          let name = result.name;
          let conditionsObject = {
            name,
            desc,
          };
          return conditionsObject;
        });
    }
  }

  function removeCard(name) {
    let newLibrary = cardLibrary.filter((x) => x.name !== name);
    localStorage.setItem("cardLibrary", JSON.stringify(cardLibrary));
    setCardLibrary(newLibrary);
    setRefresh(!refresh);
  }

  async function getConditions() {
    let url = `https://www.dnd5eapi.co/api/conditions`;
    await fetch(url)
      .then((res) => res.json())
      .then(async (result) => {
        // setIsLoaded(true);
        if (result) {
          let res = result.results;
          if (res !== undefined) {
            console.log(res);
            console.log("conditions results");
            let conditionsArr = [];
            res.forEach(async function (x) {
              await conditionsArr.push(x.name);
            });

            setConditions(conditionsArr);
            // console.log(getCondition(conditions[0]))
          }
        }
      });
  }

  function loadCard(name) {
    console.log(name);
    cardLibrary.forEach(function (obj) {
      if (obj.name == name) {
        setData(obj);
        setRefresh(!refresh);
        setIsLoaded(true);
        console.log(obj);
        return false;
      }
    });
  }

  function handlePanelChange(val) {
    setActivePanel(val);
    setRefresh(!refresh);
  }

  function handleClearLibrary() {
    setCardLibrary([]);
    localStorage.setItem("cardLibrary", null);
  }

  function isMobileSize() {
    if (window.screen.width <= 768) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div
      style={{
        background: `linear-gradient(0deg, rgba(255, 0, 255, 0.3), rgba(255, 0, 150, 0.3)), url(${Map})`,
        backgroundSize: "contain",
        backgroundRepeat: isMobileSize() ? true : false,
      }}
      className="flex bg-contain md:h-screen md:overflow-hidden application"
    >
      <Helmet htmlAttributes>
        <meta charSet="utf-8" />
        <title> >>DND-Fetch> </title>
        <link rel="canonical" href="http://dndfetch.netlify.com" />
        <meta
          name="description"
          content="A DND loot/mob generator to help your DM randomize campaign night."
        />
      </Helmet>
      <div className="flex flex-col md:flex-row w-full">
        <div
          style={{
            borderRight: "solid 3px rgba(0,0,0,0.8)",
            background: "rgba(0,0,0,0.4)",
          }}
          className="flex w-full md:w-1/4 flex-col h-scren"
        >
          <div className="flex flex-col items-center md:items-start px-4 md:pl-2 pb-6 justify-center md:justify-start">
            <Logo />
            <p className="text-white text-sm text-center md:text-left">
              A DND card generator for all your adventures. Powered by
              <a
                className="text-red-400 hover:text-red-600"
                href="https://www.dnd5eapi.co/"
                target="_blank"
              >
                DND 5e API
              </a>
            </p>
          </div>
          <Filters
            refresh={refresh}
            setRefresh={() => setRefresh(!refresh)}
            setActivePanel={(val) => handlePanelChange(val)}
            isLoaded={(value) => setIsLoaded(value)}
            setData={(val) => setData(val)}
          />
        </div>
        <div className="w-full md:w-1/2 md:overflow-y-scroll">
          <Card
            activePanel={activePanel}
            isLoaded={isLoaded}
            refresh={!refresh}
            cardLibrary={cardLibrary}
            saveThisCard={(cardObj) => handleSaveCard(cardObj)}
            conditions={conditions}
            data={data}
            setData={(val) => setData(val)}
          />
        </div>
        <div className="flex w-full md:w-1/4 flex-row">
          <Feed
            clearLibrary={() => handleClearLibrary()}
            removeCard={(name) => removeCard(name)}
            refresh={!refresh}
            cardLibrary={cardLibrary}
            loadCard={(name) => loadCard(name)}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
