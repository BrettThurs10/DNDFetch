import React, { useState } from "react";
import { ReactComponent as Skull } from "../img/skull.svg";
import TextField from "@material-ui/core/TextField";


function MonsterPanel(props) {
  const [minError, setMinError] = useState(false);
  const [maxError, setMaxError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function getVal(id) {
    let val = document.getElementById(id)?.value;
    if (id == "") {
      val = "0";
    }
    return parseInt(val);
  }

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

  return (
    <>
      <div className="flex flex-row items-center">
        <Skull fill="black" className="h-6 w-6 mr-2" />
        <p className="title text-3xl text-left modesto-condensed uppercase">
          Monsters
        </p>
      </div>
      <p>Challenge</p>
      <div className="my-3 w-full flex flex-row items-start">
        <form
          className="flex justify-start flex-col w-1/2 md:w-full pr-1"
          noValidate
          autoComplete="off"
        >
          <TextField
            helperText={
              minError && "Number cannot exceed or be the challenge max number."
            }
            error={minError}
            id="challengeMin"
            placeholder="0"
            label="Min"
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
            label="Max"
            variant="filled"
            defaultValue="30"
            onChange={(e) => validateChallenges("max", e.target.value)}
          />
        </form>
      </div>
    </>
  );
}

export default MonsterPanel;
