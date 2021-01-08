import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import BuyMeCoffee from "../components/BuyMeCoffee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import * as utils from "../assets/utils.js";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `50%`,
    left: `50%`,
    transform: utils.isMobileSize
      ? `translate(-50%, -50%)`
      : `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: "white",
    border: "2px solid #000",
    padding: 10,
  },
}));


library.add(faGithub, faTwitter);
const twitterIcon = <FontAwesomeIcon icon={faTwitter} />;
const gitHub = <FontAwesomeIcon icon={faGithub} />;

function Footer(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const modalBody = (
        <div
          style={modalStyle}
          className={`${classes.paper} shadow w-full md:w-1/3`}
        >
          <div className="p-10 flex flex-col">
            <h2 id="modal-title" class="text-md font-semibold">
              DND Fetch is made possible thanks in part to:
            </h2>

            <a
              href="https://www.dnd5eapi.co/"
              target="_blank"
              class="text-blue-500 hover:text-teal-700 cursor-pointer"
            >
              DND 5e API
            </a>
            <a
              href="https://dnd.wizards.com/articles/features/systems-reference-document-srd"
              target="_blank"
              class="text-blue-500 hover:text-teal-700 cursor-pointer"
            >
              DND Systems Refrence Document
            </a>

            <a
              href="https://www.patreon.com/GoAdventureMaps"
              target="_blank"
              class="text-blue-500 hover:text-teal-700 cursor-pointer"
            >
              GoAdventureMaps
            </a>
            <div class="text-blue-500 hover:text-teal-700 cursor-pointer">
              Icons made by{" "}
              <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
                Freepik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
            <a
              href="https://reactjs.org/"
              target="_blank"
              class="text-blue-500 hover:text-teal-700 cursor-pointer"
            >
              ReactJS
            </a>
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              class="text-blue-500 hover:text-teal-700 cursor-pointer"
            >
              TailwindCSS
            </a>
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              class="text-blue-500 hover:text-teal-700 cursor-pointer"
            >
              FontAwesome
            </a>
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              class="text-blue-500 hover:text-teal-700 cursor-pointer"
            >
              Material UI
            </a>
          </div>
        </div>
      );

    return (
<div class="bg-gray-900 w-full px-4 py-2 mb-3 justify-start md:justify-between flex-col md:flex-row flex items-center">
        <div class="flex flex-row w-auto justify-center items-center text-xs bg-gray-900 rounded py-2">
          <a
            class="text-thin text-gray-300 hover:text-gray-400 font-normal mr-1"
            href="https://brettthurston.com"
          >
            Made by Brett Thurston
          </a>
          <a
            href="https://twitter.com/BrettThurs10"
            class="text-thin text-gray-300 hover:text-gray-400 cursor-pointer px-1 text-sm"
          >
            {twitterIcon}
          </a>
          <a
            href="https://github.com/BrettThurs10/DNDFetch"
            class="text-thin text-gray-300 hover:text-gray-400 cursor-pointer px-1 text-sm"
          >
            {gitHub}
          </a>
        </div>

        <div className="text-white text-xs text-center">
          Powered by
          <a
            className="text-red-400 hover:text-red-600 pl-1"
            href="https://www.dnd5eapi.co/"
            target="_blank"
          >
            DND 5e API
          </a>
          <p class="inline text-white pl-1">•</p>
          <button
            type="button"
            class="inline text-white pl-1"
            onClick={handleOpen}
          >
            Credits
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {modalBody}
          </Modal>
        </div>
<BuyMeCoffee />
      </div>
    )
}



export default Footer

