import React, { useState, useEffect } from "react";
import "./App.css";
import Filters from "./components/Filters";
import Card from "./components/Card";
import Feed from "./components/Feed";
import Footer from "./components/Footer";
import Map from "./img/ForestPathPublic.jpg";
import Logo from "./components/Logo";
import { Helmet } from "react-helmet";
import * as utils from "./assets/utils.js";

const storage = localStorage.getItem("cardLibrary");

function App() {
  const [data, setData] = useState("");
  const [conditions, setConditions] = useState(null);
  const [cardLibrary, setCardLibrary] = useState(JSON.parse(storage) ?? []);
  const [refresh, setRefresh] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePanel, setActivePanel] = useState("monsters");

  useEffect(() => {
    document.title = ">>DND-Fetch>";
  }, []);

  function handleSaveCard(cardObj) {
    let array = cardLibrary;
    cardObj.cardType = activePanel;
    array.push(cardObj);
    setCardLibrary(array);
    localStorage.setItem("cardLibrary", JSON.stringify(cardLibrary));
    setRefresh(!refresh);
  }

  function removeCard(name) {
    let newLibrary = cardLibrary.filter((x) => x.name !== name);
    localStorage.setItem("cardLibrary", JSON.stringify(newLibrary));
    setCardLibrary(newLibrary);
    setRefresh(!refresh);
  }

  function loadCard(name) {
    cardLibrary.forEach(function (obj) {
      if (obj.name == name) {
        setData(obj);
        setRefresh(!refresh);
        setIsLoaded(true);
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
    window.localStorage.clear();
  }

  return (
    <div class="w-full h-screen flex-col flex">
      <div
        style={{
          background: `linear-gradient(0deg, rgba(255, 0, 255, 0.3), rgba(255, 0, 150, 0.3)), url(${Map})`,
          backgroundSize: "contain",
          backgroundRepeat: utils.isMobileSize ? true : false,
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
            className="flex w-full md:w-1/4 flex-col"
          >
            <div className="flex flex-col items-center  p-4 pb-6 justify-center md:justify-center">
              <div class="transform scale-150 md:scale-120 justify-center items-center">
                <Logo />
              </div>

              <p className="text-white text-sm text-center">
                A DND card generator for all your adventures.
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
      <Footer />
    </div>
  );
}

export default App;
