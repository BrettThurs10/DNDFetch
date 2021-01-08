import React from "react";
import { ReactComponent as Loot } from "../img/treasure.svg";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

function LootPanel(props) {
  return (
    <>
      <div className="flex flex-row items-center w-full">
        <Loot fill="black" className="h-6 w-6 mr-2" />
        <p className="title text-3xl text-left modesto-condensed uppercase">
          Loot
        </p>
      </div>
      <FormControl className="flex w-full">
        <InputLabel id="loot-label" htmlFor="loot-categories">
          <p style={{ transform: "translate(14px, 10px)" }}>Loot categories</p>
        </InputLabel>
        <Select
          variant="filled"
          className="flex w-full"
          inputProps={{
            name: "loot categories",
            id: "loot-categories",
          }}
          value={props.loot}
        >
          {props.lootCats}
        </Select>
      </FormControl>
    </>
  );
}

export default LootPanel;
