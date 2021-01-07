import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import * as utils from "../assets/utils.js";
import { ReactComponent as Skull } from "../img/skull.svg";
import { ReactComponent as Loot } from "../img/treasure.svg";
import { ReactComponent as Spells } from "../img/witch-hat.svg";
import { red, purple, orange, blue, green } from "@material-ui/core/colors";
import Tip from "../components/Tip";

library.add(faChevronRight);

const chevronRight = <FontAwesomeIcon icon={faChevronRight} />;

const spellSchools = [
  "Any",
  "Abjuration",
  "Conjuration",
  "Divination",
  "Enchantment",
  "Evocation",
  "Illusion",
  "Necromancy",
  "Transmutation",
];

const spellLevels = ["Any", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function getVal(id) {
  let val = document.getElementById(id)?.value;
  if (id == "") {
    val = "0";
  }
  return parseInt(val);
}

function Filters(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [panel, setPanel] = useState("monsters");
  const [lootCats, setLootCats] = useState([]);
  const [spellSchoolCats, setSpellSchoolCats] = useState([]);
  const [spellSchoolChoice, setSpellSchoolChoice] = useState("Any");
  const [spellLevelCat, setSpellLevelCats] = useState("Any");
  const [spellLevelChoice, setSpellLevelChoice] = useState("Any");
  const [loot, setLoot] = useState("Adventuring Gear");
  const [minError, setMinError] = useState(false);
  const [maxError, setMaxError] = useState(false);
  // Set to false so when getQuery first runs it will show the search panel in mobile - desktop doesn't utilize show/hide for search panel
  const [controlsVisible, setControls] = useState(true);

  function range(start, end) {
    if (start == undefined || isNaN(start)) {
      start = 0;
    }
    if (end == undefined || isNaN(end)) {
      end = 30;
    }
    console.log(`start ${start} end ${end}`);
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

  async function getDetail(res, cardType) {
    let randomNum = Math.floor(Math.random() * Object.keys(res).length);
    if (panel == "loot") {
      randomNum = Math.floor(Math.random() * res.equipment.length);
    }

    let randomChoice;

    let randomURL;
    if (panel == "monsters") {
      randomChoice = res[randomNum]?.index ?? undefined;
      if (randomChoice == undefined){
        getQuery(panel, true)
      }
      randomURL = `https://www.dnd5eapi.co/api/monsters/${randomChoice}`;
    } else if (panel == "spells") {
      randomChoice = res[randomNum].url;
      randomURL = `https://www.dnd5eapi.co${randomChoice}`;
    } else if (panel == "loot") {
      if (res.hasOwnProperty("equipment")) {
        randomChoice = res.equipment[randomNum].url;
      }
      randomURL = `https://www.dnd5eapi.co${randomChoice}`;
    }
    await fetch(randomURL)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (cardType !== undefined) {
          res.cardType = cardType;
        }
        setData(res);
        if (panel == "monsters") {
          let subtype = res.subtype;
          let type = res.type;
          if ((subtype = "any race")) {
            let randomNum = Math.floor(Math.random() * [utils.race].length + 1);

            subtype = utils.race[randomNum];
          }
          if (res.type == "humanoid" && res.subtype == null) {
            let randomNum = Math.floor(Math.random() * [utils.race].length + 1);

            subtype = utils.race[randomNum];
          }
        }
        // console.log(res)
        props.setData(res);
        setIsLoaded(true);
        props.isLoaded(true);
      });
  }

  async function getQuery(cardType, onLoad) {
    // if (onLoad == true){
    //   setControls(false)
    // }
    await props.setActivePanel(panel);
    let url;
    if (panel == "monsters") {
      const challenge = range(
        getVal("challengeMin") ?? 0,
        getVal("challengeMax") ?? 30
      );
      url = `https://www.dnd5eapi.co/api/monsters/?challenge_rating=${challenge}`;
    } else if (panel == "loot") {
      console.log(`loot is set to ${loot}`);
      let formattedLoot = loot
        .replace(/\s+/g, "-")
        .toLowerCase()
        .replace("'", "");
      url = `https://www.dnd5eapi.co/api/equipment-categories/${formattedLoot}`;
    } else if (panel == "spells") {
      let level = spellLevelChoice !== "Any" ? spellLevelChoice : null;
      let school = spellSchoolChoice !== "Any" ? spellSchoolChoice : null;
      url = `https://www.dnd5eapi.co/api/spells/?`;
      if (school !== null) {
        url = url + "school=" + school + "&";
      }
      if (level !== null) {
        url = url + "level=" + level;
      }
      console.log(url);
    }
    await fetch(url)
      .then((res) => res.json())
      .then(
        async (result) => {
          let res = result.results;
          if (panel == "loot") {
            res = result;
          }

          if (res) {
            console.log(res);
            getDetail(res, cardType);
          } else {
            alert("Sorry, I could not find anything related to this search.");
            console.log(`error`);
            console.log(result);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  useEffect(() => {
    getQuery(panel);
    makeLootItems();
    makeSchools();
    makeSpellLevels();
  }, []);

  function validateChallenges(type, number) {
    let minValue = getVal("challengeMin");
    let maxValue = getVal("challengeMax");
    if (isNaN(minValue)) {
      minValue = 0;
    }
    if (isNaN(maxValue)) {
      maxValue = 30;
    }

    if (type == "min" && parseInt(number) >= maxValue) {
      setMinError(true);
      setDisabled(true);
    } else {
      setMinError(false);
      setDisabled(false);
    }

    if (type == "max" && parseInt(number) <= minValue) {
      setMaxError(true);
      setDisabled(true);
    } else {
      setMaxError(false);
      setDisabled(false);
    }
  }

  function monsterPanel() {
    return (
      <>
        <div className="flex flex-row items-center">
          <Skull fill="black" className="h-6 w-6 mr-2" />
          <p className="title text-3xl text-left modesto-condensed uppercase">
            Monsters
          </p>
        </div>
        <div className="my-3 w-full flex flex-row items-start">
          <form
            className="flex justify-start flex-col w-1/2 md:w-full pr-1"
            noValidate
            autoComplete="off"
          >
            <TextField

              helperText={
                minError &&
                "Number cannot exceed or be the challenge max number."
              }
              error={minError}
              id="challengeMin"
              placeholder="0"
              label="Challenge min"
              variant="filled"
              defaultValue="0"
              onChange={(e) => validateChallenges("min", e.target.value)}
            />
          </form>
          <form
            className="flex justify-start flex-col w-1/2 md:w-full pl-1"
            noValidate
            autoComplete="off"
          >
            <TextField
              helperText={
                maxError && "Number cannot be below the challenge min number."
              }
              error={maxError}
              placeholder="30"
              id="challengeMax"
              label="Challenge max"
              variant="filled"
              defaultValue="30"
              onChange={(e) => validateChallenges("max", e.target.value)}
            />
          </form>
        </div>
      </>
    );
  }

  async function makeLootItems() {
    let url = `https://www.dnd5eapi.co/api/equipment-categories/`;
    let lootArr = [];

    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        let lootRes = res.results;
        lootRes.forEach((element, index) => {
          lootArr.push(
            <MenuItem
              key={index + 1}
              onClick={() => setLoot(element.name)}
              value={element.name}
            >
              {element.name}
            </MenuItem>
          );
        });
        setLootCats(lootArr);
        console.log(lootArr[0]);
      });
  }

  function makeSchools() {
    let spellSchoolArr = [];
    spellSchools.forEach((element, index) => {
      spellSchoolArr.push(
        <MenuItem
          key={index + 1}
          onClick={() => setSpellSchoolChoice(element)}
          value={element}
        >
          {element}
        </MenuItem>
      );
    });
    setSpellSchoolCats(spellSchoolArr);
  }

  function makeSpellLevels() {
    let spellLevelArr = [];
    spellLevels.forEach((element, index) => {
      spellLevelArr.push(
        <MenuItem
          key={index + 1}
          onClick={() => setSpellLevelChoice(element)}
          value={element}
        >
          {element}
        </MenuItem>
      );
    });
    setSpellLevelCats(spellLevelArr);
  }

  function lootPanel() {
    return (
      <>
        <div className="flex flex-row items-center w-full">
          <Loot fill="black" className="h-6 w-6 mr-2" />
          <p className="title text-3xl text-left modesto-condensed uppercase">
            Loot
          </p>
        </div>
        <FormControl className="flex w-full">
          <InputLabel id="loot-label" htmlFor="loot-categories"><p style={{transform: 'translate(14px, 10px)'}}>Loot categories</p></InputLabel>
          <Select
                        variant="filled"
            className="flex w-full"
            inputProps={{
              name: 'loot categories',
              id: 'loot-categories',
            }}
            value={loot}
          >
            {lootCats}
          </Select>
        </FormControl>
      </>
    );
  }

  function spellsPanel() {
    return (
      <>
        <div className="flex flex-row items-center w-full">
          <Spells fill="black" className="h-6 w-6 mr-2" />
          <p className="title text-3xl text-left modesto-condensed uppercase">
            Spells
          </p>
        </div>
        <div class="flex flex-col w-full">
        <FormControl className="flex w-1/2 md:w-full pr-1">
        <InputLabel id="spell-label" htmlFor="school-categories"><p style={{transform: 'translate(14px, 10px)'}}>Schools</p></InputLabel>
          <Select
            variant="filled"
            className="flex w-full"
            labelId="spells"
            id="spells"
            inputProps={{
              name: 'school categories',
              id: 'school-categories',
            }}
            value={spellSchoolChoice}
          >
            {spellSchoolCats}
          </Select>
        </FormControl>
        <FormControl className="flex w-1/2 md:w-full pl-1">
        <InputLabel id="spell-level" htmlFor="spell-level"><p style={{transform: 'translate(14px, 10px)'}}>Spell level</p></InputLabel>
          <Select
            variant="filled"
            className="flex w-full"
            labelId="spells"
            id="spells"
            inputProps={{
              name: 'spell level',
              id: 'spell-level',
            }}
            value={spellLevelChoice}
          >
            {spellLevelCat}
          </Select>
        </FormControl>
        </div>



      </>
    );
  }

  function determinePanel() {
    if (panel == "monsters") {
      return monsterPanel();
    } else if (panel == "loot") {
      return lootPanel();
    } else if (panel == "spells") {
      return spellsPanel();
    }
  }

  function handlePanelChange(val) {
    if (panel == val) {
      setControls(!controlsVisible);
    } else {
      setControls(true);
    }

    if (val == "monsters" || val == "loot" || val == "spells") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setPanel(val);
  }

  function isMobileSize() {
    if (window.screen.width <= 768) {
      return true;
    } else {
      return false;
    }
  }

  function determinePanelBG() {
    if (panel == "monsters") {
      return { background: purple[300] };
    } else if (panel == "loot") {
      return { background: orange[300] };
    } else if (panel == "spells") {
      return { background: blue[300] };
    }
  }

  return (
    <div className="flex w-full h-full md:h-screen">
      <div className="flex w-full flex-col">
        <ul className="flex border-b justify-center md:justify-start">
          <li className={`${panel == "monsters" && "-mb-px"} mr-1`}>
            <a
              className={`monster-button
                     inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold -mb-px
                    `}
              href="#"
              onClick={() => handlePanelChange("monsters")}
            >
              <Skull className="w-6 h-6" />
            </a>
          </li>
          <li className={`${panel == "loot" && "-mb-px"} mr-1`}>
            <a
              className={` loot-button
                   inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold border-l border-t border-r rounded-t ${
                     panel == "loot" && "border-b-0"
                   }
                    `}
              href="#"
              onClick={() => handlePanelChange("loot")}
            >
              <Loot className="w-6 h-6 text-gray-600" />
              {/* <p>Monster</p> */}
            </a>
          </li>
          <li className={`${panel == "spells" && "-mb-px"} mr-1`}>
            <a
              className={` inline-block py-2 px-4 text-blue-500 spells-button
                    border-l border-t border-r hover:text-blue-800 font-semibold rounded-t ${
                      panel == "spells" && "border-b-0"
                    }`}
              href="#"
              onClick={() => handlePanelChange("spells")}
            >
              <Spells className="h-6 w-6" />
            </a>
          </li>
        </ul>
        <div
          style={determinePanelBG()}
          className={`${
            controlsVisible ? "flex " : "hidden "
          } md:flex h-full w-full rounded rounded-tl-none border-l border-r border-b p-10 flex-col justify-start items-start relative -mt-2`}
        >
          <div class="flex-1 w-full">
            <Tip
              num="1"
              btnColor="text-black"
              className="absolute right-0 top-0 mt-2"
              message={`Search for monster, loot, spell and condition cards here. Just ${
                isMobileSize() ? "tap" : "click"
              } each category icon listed above. Click 'Fetch it' to find a random card from the category you fetched from.`}
            />

            {determinePanel()}
            <button
              disabled={disabled}
              onClick={() => getQuery(panel, true)}
              className={`bg-gray-900 hover:bg-gray-800 text-gray-300 font-bold py-2 px-4 rounded my-3 flex  flex-row items-center w-full sm:w-1/3${
                disabled && "opacity-25"
              } self-end`}
            >
              <p className="mr-3 text-center sm:text-left w-full">Fetch it</p> {chevronRight}
            </button>
          </div>
          <div class="flex w-100 bottom-0 mb-8" style={{flex: .3}}>
            <p class="text-sm text-gray-800">
              Made by <a href="https://brettthurston.com">Brett Thurston</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
