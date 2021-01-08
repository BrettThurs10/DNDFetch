import React, { useState, useEffect } from "react";
import "./App.css";
import Filters from "./components/Filters";
import Card from "./components/Card";
import Feed from "./components/Feed";
import Map from "./img/ForestPathPublic.jpg";
import Logo from "./components/Logo";
import { Helmet } from "react-helmet";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


const storage = localStorage.getItem("cardLibrary");

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: 'white',
    border: '2px solid #000',
    padding: 10,
  },
}));

function App() {
  const classes = useStyles();
  const [data, setData] = useState("");
  const [conditions, setConditions] = useState(null);
  const [cardLibrary, setCardLibrary] = useState(JSON.parse(storage) ?? []);
  const [refresh, setRefresh] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePanel, setActivePanel] = useState("monsters");
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);


  useEffect(() => {
    document.title = '>>DND-Fetch>'
  }, []);

  const modalBody = (
    <div style={modalStyle} className={`${classes.paper} shadow w-1/3`}>
      <div className="p-10 flex flex-col">
      <h2 id="modal-title" class="text-md font-semibold">DND Fetch is made possible thanks in part to:</h2>

        <a href="https://www.patreon.com/GoAdventureMaps" target='_blank' class="text-blue-500 hover:text-teal-700 cursor-pointer">GoAdventureMaps</a>
        <div class="text-blue-500 hover:text-teal-700 cursor-pointer" >Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <a href="https://reactjs.org/" target='_blank' class="text-blue-500 hover:text-teal-700 cursor-pointer">ReactJS</a>
        <a href="https://tailwindcss.com/" target='_blank' class="text-blue-500 hover:text-teal-700 cursor-pointer">TailwindCSS</a>
        <a href="https://tailwindcss.com/" target='_blank' class="text-blue-500 hover:text-teal-700 cursor-pointer">FontAwesome</a>
        <a href="https://tailwindcss.com/" target='_blank' class="text-blue-500 hover:text-teal-700 cursor-pointer">Material UI</a>


      </div>

    </div>
  );

  function handleSaveCard(cardObj) {
    let array = cardLibrary;
    cardObj.cardType = activePanel;
    array.push(cardObj);
    setCardLibrary(array);
    localStorage.setItem("cardLibrary", JSON.stringify(cardLibrary));
    setRefresh(!refresh);
    console.log(cardLibrary);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  function removeCard(name) {
    let newLibrary = cardLibrary.filter((x) => x.name !== name);
    localStorage.setItem("cardLibrary", JSON.stringify(newLibrary));
    setCardLibrary(newLibrary);
    setRefresh(!refresh);
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
    window.localStorage.clear();
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
                className="text-red-400 hover:text-red-600 pl-1"
                href="https://www.dnd5eapi.co/"
                target="_blank"
              >
                 DND 5e API
              </a>
              <p class="inline text-sm text-white pl-1">•</p>
              <button type="button" class="inline text-sm text-white pl-1" onClick={handleOpen}>Credits</button>
              <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
     {modalBody}
      </Modal>
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
