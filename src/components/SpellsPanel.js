import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { ReactComponent as Spells } from "../img/witch-hat.svg";

function SpellsPanel(props) {
  return (
    <>
      <div className="flex flex-row items-center w-full">
        <Spells fill="black" className="h-6 w-6 mr-2" />
        <p className="title text-3xl text-left modesto-condensed uppercase">
          Spells
        </p>
      </div>
      <div class="flex flex-row md:flex-col w-full">
        <FormControl className="flex w-1/2 md:w-full mr-1">
          <InputLabel id="spell-label" htmlFor="school-categories">
            <p style={{ transform: "translate(14px, 10px)" }}>Schools</p>
          </InputLabel>
          <Select
            variant="filled"
            className="flex w-full"
            labelId="spells"
            id="spells"
            inputProps={{
              name: "school categories",
              id: "school-categories",
            }}
            value={props.spellSchoolChoice}
          >
            {props.spellSchoolCats}
          </Select>
        </FormControl>
        <div class="px-1"></div>
        <FormControl className="flex w-1/2 md:w-full ml-1">
          <InputLabel id="spell-level" htmlFor="spell-level">
            <p style={{ transform: "translate(14px, 10px)" }}>Spell level</p>
          </InputLabel>
          <Select
            variant="filled"
            className="flex w-full"
            labelId="spells"
            id="spells"
            inputProps={{
              name: "spell level",
              id: "spell-level",
            }}
            value={props.spellLevelChoice}
          >
            {props.spellLevelCat}
          </Select>
        </FormControl>
      </div>
    </>
  );
}

export default SpellsPanel;
