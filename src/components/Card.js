import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import Save from "@material-ui/icons/Save";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faImages,
  faChevronRight,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { withStyles } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";

library.add(faChevronRight, faImages, faSave);
const images = <FontAwesomeIcon className="text-lg" icon={faImages} />;

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
    console.log(cardObj);
  }

  const myName = data.name;

  function goToGoogleImageSearch(name) {
    const url = `https://www.google.com/search?q=${name}&tbm=isch&chips=q:${name},g_1:d%26d:XO36OVmqhVo%3D&hl=en&sa=X&ved=2ahUKEwiyqqyD48XtAhUj8VMKHdW7CIsQ4lYoAXoECAEQGw&biw=1280&bih=607`;
    return url;
  }

  function cleanEntries(obj) {
    return Object.entries(obj).join(" ").replace(/,/g, " ").replace(/\./g, ",");
  }

  function returnSpeed(speedObj) {
    let speedString;
    speedObj !== undefined
      ? (speedString = cleanEntries(speedObj))
      : (speedString = "");
    return speedString;
  }

  const stats = ["str", "dex", "con", "int", "wis", "cha"];

  function returnStat(val) {
    let stat;
    switch (val) {
      case "str":
        stat = "strength";
        break;
      case "dex":
        stat = "dexterity";
        break;
      case "con":
        stat = "constitution";
        break;
      case "int":
        stat = "intelligence";
        break;
      case "wis":
        stat = "wisdom";
        break;
      case "cha":
        stat = "charisma";
        break;
      default:
        stat = "";
    }
    return (
      <div key={val} className="flex flex-col justify-center">
        <p className="font-bold text-center uppercase modesto-regular">{val}</p>
        <p className="text-center font-bold">{data[stat]}</p>
      </div>
    );
  }

  function returnFacts(type, property) {
    let string = "";
    if (property == undefined || property == "" || property.length == 0) {
      return null;
    } else if (typeof property == "string") {
      string = property;
    } else if (Array.isArray(property)) {
      if (typeof property[0] == "object") {
        property.forEach(function (item) {
          string += item.name + ", ";
        });
      } else {
        string = property.join(", ");
      }
    } else if (typeof property == "object") {
      string = cleanEntries(property).replace("_", " ");
    }

    console.log();

    let block = (
      <div className="flex px-4 items-start">
        <p className="petrona-bold text-bold pr-2 font-bold text-sm inline">
          {type}
        </p>
        <p className="text-sm font-thin inline">{string}</p>
      </div>
    );
    return block;
  }

  function returnProficencies(property) {
    let newArray = [];
    if (property == undefined || property == "" || property.length == 0) {
      return null;
    } else {
      property.forEach(function (item) {
        newArray.push(item.proficiency.name);
      });
    }
    let block = (
      <div className="flex px-4 items-start">
        <p className="petrona-bold text-bold font-bold text-sm inline">
          Proficiencies:{" "}
          <p className="text-sm font-thin inline pl-2">{newArray.join(", ")}</p>
        </p>
      </div>
    );
    return block;
  }

  function returnActions(property) {
    let string = "";
    let newArr = [];
    if (property == undefined || property == "" || property.length == 0) {
      return null;
    } else if (typeof property == "string") {
      string = property;
    } else if (Array.isArray(property)) {
      if (typeof property[0] == "object") {
        property.forEach(function (item, index) {
          let block = (
            <div key={index} className="flex px-4 items-start pb-2 inline">
              <p className="text-sm font-thin inline">
                <p className="petrona-bold font-semibold inline italic pr-2 inline">
                  {item.name}.
                </p>{" "}
                {item.desc}
              </p>
            </div>
          );
          newArr.push(block);
        });
      } else {
        string = property.join(", ");
      }
    } else if (typeof property == "object") {
      string = cleanEntries(property).replace("_", " ");
    }
    return newArr;
  }

  function monsterCardBody() {
    return (
      <div className="flex w-full justify-center items-center relative  flex-col">
        <p className="text-center modesto-condensed uppercase text-4xl font-bold self-center bg-orange-200 w-full rounded-br-none rounded-bl-none rounded-lg py-2">
          {myName}
        </p>

        <p className="text-white text-center py-1">
          {data.size} {data.subtype !== null && `(${data.subtype})`} {data.type}
          , {data.alignment}
        </p>

        <div className=" bg-orange-200 w-full rounded-tr-none rounded-tl-none rounded-lg py-2">
          <div className="flex flex-row">
            <div className="flex flex-1 px-4">
              <p className="font-bold pr-2">AC:</p> {data.armor_class}
            </div>
            <div className="flex flex-1">
              <p className="font-bold pr-2">HP:</p>
              <p>{`${data.hit_points} (${data.hit_dice})`}</p>
            </div>
          </div>
          <div className="px-4 flex flex-row">
            <p className="font-bold pr-2 text-sm pr-2">Speed:</p>

            <p className="text-sm"> {returnSpeed(data.speed)}</p>
          </div>
          <div className="flex w-full px-4 py-2 justify-between">
            {stats.map((x) => returnStat(x))}
          </div>
          <div className="bg-orange-200 border-t-2 border-red-500 py-2">
            {returnFacts("Languages: ", data.languages)}
            {returnFacts("Condition immunities: ", data.condition_immunities)}
            {returnFacts("Damage immunities: ", data.damage_immunities)}

            {returnFacts("Damage resistances: ", data.damage_resistances)}
            {returnFacts(
              "Damage vulnerablities: ",
              data.damage_vulnerabilities
            )}
            {returnProficencies(data.proficiencies)}
            {returnFacts("Senses: ", data.senses)}
          </div>
          <div className="bg-orange-200 border-t-2 border-red-500 py-2">
            <p className="px-4 text-md font-bold modesto-regular uppercase">
              Actions
            </p>
            {returnActions(data.actions)}
          </div>
        </div>
        <div className="flex w-full flex-row justify-between items-center">
          <p className="text-left text-white font-bold modesto-condensed text-3xl">
            Challenge {Math.round(data.challenge_rating)} {`(${data.xp} XP)`}
          </p>
        </div>
      </div>
    );
  }

  function renderContents(data) {
    console.log(data[0].item.name);
    const contentsArr = [];
    data.map((x, y) => {
      contentsArr.push(
        <p>
          {data[y].item.name} ({data[y].quantity}){" "}
        </p>
      );
    });
    return contentsArr;
  }

  function renderDesc(data) {
    const descArr = [];
    data.map((x, y) => {
      descArr.push(<p>{x}</p>);
    });
    return descArr;
  }

  function renderProperties(data) {
    const propertiesArr = [];
    data.map((x, y) => {
      propertiesArr.push(<p className="inline pr-1">{x.name},</p>);
    });
    return propertiesArr;
  }

  function lootCardBody() {
    return (
      <div className="flex w-full justify-center items-center relative  flex-col">
        <p className="text-center modesto-condensed uppercase text-4xl font-bold self-center bg-orange-200 w-full rounded-br-none rounded-bl-none rounded-lg py-2">
          {myName}
        </p>

        <p className="text-white text-center py-1">
          {data.armor_category && `${data.armor_category} `}
          {data.damage && `${data.damage.damage_type.name} `}

          {data.equipment_category && data.equipment_category.name}
          {data.tool_category && `, ${data.tool_category}`}
          {data.gear_category && `, ${data?.gear_category.name}`}
          {data.quantity && `, ${data.quantity} count`}
          {data.weapon_range && `, ${data.weapon_range}`}
        </p>

        <div className=" bg-orange-200 w-full rounded-tr-none rounded-tl-none rounded-lg">
          <div className="bg-orange-200 border-t-2 border-red-500 p-4">
            {data.damage && <p>Damage dice: {data.damage.damage_dice}</p>}
            {data.two_handed_damage && (
              <p>
                Two handed damage dice: {data.two_handed_damage.damage_dice}
              </p>
            )}
            {data.range && (
              <p>
                Range: Normal {data.range.normal}
                {data.range.long && `, Long: ${data.range.long}`}
              </p>
            )}
            {data.properties && (
              <p>Properties: {renderProperties(data.properties)}</p>
            )}
            {data.armor_class && (
              <div>
                <p>
                  AC: {data.armor_class.base}{" "}
                  {data.armor_class.dex_bonus && `+ Dexterity modifier`}{" "}
                  {data.armor_class.max_bonus &&
                    ` + ${data.armor_class.dex_bonus}`}
                </p>
                {data.stealth_disadvantage && <p>Stealth disadvantage</p>}
                {data.str_minimum !== undefined ? (
                  <p>{`Minimum strength: ${data.str_minimum}`}</p>
                ) : null}
              </div>
            )}
            {data.desc
              ? renderDesc(data.desc)
              : `Hey look, it's a ${data.name}!`}

            {data.contents && renderContents(data.contents)}
            {data.speed && (
              <p>
                Speed: {data.speed.quantity} {data.speed.unit}
              </p>
            )}
            {data.capacity && <p>Capacity: {data.capacity}</p>}
          </div>
        </div>
        <div className="flex w-full flex-row justify-between items-center">
          <p className="text-left text-white font-bold modesto-condensed text-3xl">
            {" "}
            {data.cost && `Cost: ${data.cost.quantity} ${data.cost.unit}`}{" "}
          </p>
          <p className="text-left text-white font-bold modesto-condensed text-3xl">
            {" "}
            {data.weight && `Weight: ${data.weight}`}
          </p>
        </div>
      </div>
    );
  }

  function returnCardBody() {
    console.log("return card ody");
    console.log(activePanel);
    if (activePanel == "monsters") {
      return monsterCardBody();
    } else if (activePanel == "loot") {
      console.log("active panel is loot");
      return lootCardBody();
    }
  }

  function returnCardControls() {
    return (
      <div className="flex w-full justify-between mb-2">
        <Button
        target="_blank"
    href={ goToGoogleImageSearch(data.name)}
  variant="contained"
        >
          <p className="text-xs">Find image</p>
        </Button>
        <Button
          onClick={() => saveThisCard(data)}
          variant="contained"
          color="primary"
        >
          <p className="text-xs">Save card</p>
        </Button>
      </div>
    );
  }

  return (
    <div
      id="card"
      className="flex w-full py-2 px-6 md:px-24 items-center justify-center relative flex-col"
    >
      {returnCardControls()}
      <div
        onClick={() => console.log(data.name)}
        className={`shadow-xl flex flex-col w-full bg-red-600 p-5 mx-10 my-2 rounded ${
          data ? "h-auto" : "h-screen"
        }`}
      >
        {/* {renderLoader()} */}
        {data ? returnCardBody() : null}
      </div>
    </div>
  );
}

export default Card;
