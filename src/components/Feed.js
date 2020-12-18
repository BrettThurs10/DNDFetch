import React, { useState, useEffect } from "react";

import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { red, purple, orange } from "@material-ui/core/colors";
import { ListItem } from "@material-ui/core";
import { ReactComponent as Skull } from "../img/skull.svg";
import { ReactComponent as Loot } from "../img/treasure.svg";
import { ReactComponent as Spells } from "../img/witch-hat.svg";
import { ReactComponent as Conditions } from "../img/brain.svg";
import Tip from "../components/Tip";

function Feed(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(props.cardLibrary);
  const [refresh, setRefresh] = useState(props.refresh);
  const [sortBtn, setSortBtn] = useState("asc");

  useEffect(() => {
    sortLibrary(sortBtn);
  });

  function ascSort(data) {
    return data.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  function dscSort(data) {
    return data.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
  }

  function typeSort(data) {
    return data.sort((a, b) =>
      a.cardType > b.cardType
        ? 1
        : a.cardType === b.cardType
        ? a.name > b.name
          ? 1
          : -1
        : -1
    );
  }

  function sortLibrary(sortType) {
    setSortBtn(sortType);
    if (props.cardLibrary !== null) {
      if (sortType == "asc") {
        console.log(ascSort(props.cardLibrary));
        setData(ascSort(props.cardLibrary));
        setRefresh(!props.refresh);
      } else if (sortType == "dsc") {
        console.log(dscSort(props.cardLibrary));
        setData(dscSort(props.cardLibrary));
        setRefresh(!props.refresh);
      } else if (sortType == "type") {
        console.log(typeSort(props.cardLibrary));
        setData(typeSort(props.cardLibrary));
        setRefresh(!props.refresh);
      }
    }
  }

  const PurpleButton = withStyles((theme) => ({
    root: {
      textAlign: "left",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      boxShadow: "0 0 0 0 black",
      borderRadius: 0,
      color: theme.palette.getContrastText(purple[300]),
      backgroundColor: purple[300],
      "&:hover": {
        backgroundColor: purple[200],
      },
    },
  }))(Button);

  const OrangeButton = withStyles((theme) => ({
    root: {
      textAlign: "left",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      boxShadow: "0 0 0 0 black",
      borderRadius: 0,
      color: theme.palette.getContrastText(orange[300]),
      backgroundColor: orange[300],
      "&:hover": {
        backgroundColor: orange[200],
      },
    },
  }))(Button);

  const RedButton = withStyles((theme) => ({
    root: {
      borderRadius: 0,
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: red[500],
      "&:hover": {
        backgroundColor: red[700],
      },
    },
  }))(Button);

  function loadFeed(data) {
    let arr = [];
    let feed;
    data.forEach((obj) => {
      arr.push(obj.name);
    });
    feed = arr.map((x, y) => returnListItem(x, data[y].cardType));
    return feed;
  }

  function removeCardFromLibrary(name) {
    props.removeCard(name);
  }

  function returnEmpty() {
    return (
      <div className="flex h-full w-full justify-center py-8 ">
        <div className="border-2 border-gray-500 rounded self-center px-10 opacity-75 justify-center items-center">
          <p className="text-center font-thing font-sm font-bold text-gray-500">
            No cards saved
          </p>
        </div>
      </div>
    );
  }

  function clearLibrary() {
    props.clearLibrary();
    setSortBtn(null);
  }

  function returnListItem(name, type) {
    let listItem;
    if (type == "monsters") {
      listItem = (
        <PurpleButton
          variant="contained"
          color="primary"
          onClick={() => props.loadCard(name)}
          className="w-full p-4 relative z-0 cursor-pointer"
        >
          <div className="flex flex-row items-center">
            <Skull className="w-4 h-4 mr-2" fill="black" />
            <p className="modesto-condensed text-2xl uppercase text-black">
              {name}
            </p>
          </div>
        </PurpleButton>
      );
    } else if (type == "loot") {
      listItem = (
        <OrangeButton
          variant="contained"
          color="primary"
          onClick={() => props.loadCard(name)}
          className="w-full p-4 relative z-0 cursor-pointer"
        >
          <div className="flex flex-row items-center">
            <Loot className="w-4 h-4 mr-2" fill="black" />
            <p className="modesto-condensed text-2xl uppercase text-black">
              {name}
            </p>
          </div>
        </OrangeButton>
      );
    }

    return (
      <div className="flex flex-row justify-between items-center border-b border-gray-500">
        {listItem}
        <RedButton
          onClick={() => removeCardFromLibrary(name)}
          className="text-white hover:text-gray-300 cursor-pointer relative z-10 px-5 h-full items-center flex h-full"
        >
          <CloseIcon />
        </RedButton>
      </div>
    );
  }

  function sortBtnClass(type) {
    return `justify-center flex flex-1 bg-gray-400 hover:bg-teal-400 rounded m-2 ${
      sortBtn == type && "bg-teal-400"
    }`;
  }

  return (
    <div
      style={{
        borderLeft: "solid 3px rgba(0,0,0,0.8)",
        background: "rgba(0,0,0,0.4)",
      }}
      className={`flex flex-col  w-full overflow-y-scroll`}
    >
    <div className="flex flex-row justify-between items-center py-2">
    <p className="pl-2 text-white text-2xl petrona-bold">Card Library</p>
      <Tip
      num="3"
      message="Whenever you click the blue 'Save card' button, it will be placed into the Card Library here. This library uses your browser's cache and saves on every action." />
      </div>
      <div className="flex flex-row justify-between w-full">
        <button
          className={sortBtnClass("asc")}
          onClick={() => sortLibrary("asc")}
        >
          Asc
        </button>
        <button
          className={sortBtnClass("dsc")}
          onClick={() => sortLibrary("dsc")}
        >
          Dsc
        </button>
        <button
          className={sortBtnClass("type")}
          onClick={() => sortLibrary("type")}
        >
          Type
        </button>
        <button
          className={sortBtnClass("clear")}
          onClick={() => clearLibrary()}
        >
          Clear
        </button>
      </div>
      {props.cardLibrary.length !== 0
        ? loadFeed(props.cardLibrary)
        : returnEmpty()}
    </div>
  );
}

export default Feed;
