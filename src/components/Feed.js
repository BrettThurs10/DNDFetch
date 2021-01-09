import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { red, purple, orange, blue } from "@material-ui/core/colors";
import { ReactComponent as Skull } from "../img/skull.svg";
import { ReactComponent as Loot } from "../img/treasure.svg";
import { ReactComponent as Spells } from "../img/witch-hat.svg";
import RemoveItemBtn from "../components/RemoveItemBtn";
import Tip from "../components/Tip";
import FeedSortBtns from "../components/FeedSortBtns";

function Feed(props) {
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

  const BlueButton = withStyles((theme) => ({
    root: {
      textAlign: "left",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      boxShadow: "0 0 0 0 black",
      borderRadius: 0,
      color: theme.palette.getContrastText(blue[300]),
      backgroundColor: blue[300],
      "&:hover": {
        backgroundColor: blue[200],
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

  const loadCard = (name) =>{

    props.loadCard(name)
  }

  function clearLibrary() {
    props.clearLibrary();
    setSortBtn(null);
  }

  function returnListItem(name, type) {
    let listItem;
    if (type == "monsters") {
      listItem = (
        <>
        <PurpleButton
          variant="contained"
          color="primary"
          name="Monster Item"
          onClick={() => props.loadCard(name)}
          className="w-full p-4 relative z-0 cursor-pointer"
        >
          <div className="flex flex-row items-center w-5/6 pr-1">
            <Skull className="w-4 h-4 mr-2" fill="black" />
            <p className="modesto-condensed text-2xl uppercase text-black truncate">
              {name}
            </p>
          </div>

        </PurpleButton>
        <RemoveItemBtn removeAction={() => props.removeCard(name)} />
        </>
      );
    } else if (type == "loot") {
      listItem = (
        <>
        <OrangeButton
          variant="contained"
          color="primary"
          onClick={() => props.loadCard(name)}
          className="w-full p-4 relative z-0 cursor-pointer"
        >
          <div className="flex flex-row items-center w-5/6 pr-1">
            <Loot className="w-4 h-4 mr-2 " fill="black" />
            <p className="modesto-condensed text-2xl uppercase text-black truncate">
              {name}
            </p>
          </div>
        </OrangeButton>
         <RemoveItemBtn removeAction={() => props.removeCard(name)} />
         </>
      );
    } else if (type == "spells") {
      listItem = (
        <>
        <BlueButton
          variant="contained"
          color="primary"
          onClick={() => props.loadCard(name)}
          className="w-full p-4 relative z-0 cursor-pointer"
        >
          <div className="flex flex-row items-center w-5/6 pr-1">
            <Spells className="w-4 h-4 mr-2" fill="black" />
            <p className="modesto-condensed text-2xl uppercase text-black truncate ">
              {name}
            </p>
          </div>
        </BlueButton>
         <RemoveItemBtn removeAction={() => props.removeCard(name)} />
         </>
      );
    }

    return (
      <div className="flex flex-row items-center border-b border-gray-500">
        {listItem}
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
      className={`flex flex-col  w-full`}
    >
      <div className="flex flex-row justify-between items-center py-2">
        <p className="pl-2 text-white text-2xl petrona-bold">Card Library</p>
        <Tip
          num="3"
          message="Whenever you click the blue 'Save card' button, it will be placed into the Card Library here. This library uses your browser's cache and saves on every action."
        />
      </div>
      {/* Feed sort btns */}
      <FeedSortBtns
        clearLibrary={() => clearLibrary()}
        sortBtnClass={(val) => sortBtnClass(val)}
        sortLibrary={(val) => sortLibrary(val)}
      />
      {/* Actual feed */}
      <div className="overflow-y-scroll">
        {props.cardLibrary.length !== 0
          ? loadFeed(props.cardLibrary)
          : returnEmpty()}
      </div>
    </div>
  );
}

export default Feed;
