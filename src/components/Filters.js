import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpider,
  faCoins,
  faMagic,
  faEye,
  faChevronRight,
  faShoePrints
} from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import * as utils from '../assets/utils.js';
import archmage from '../img/archmage.jpg';


library.add(faSpider, faCoins, faMagic, faEye, faShoePrints);

const spider = <FontAwesomeIcon className="text-gray-900" icon={faSpider} />;
const coins = <FontAwesomeIcon className="text-gray-900" icon={faCoins} />;
const magic = <FontAwesomeIcon className="opacity-50 text-gray-900" icon={faMagic} />;
const eye = <FontAwesomeIcon className="opacity-50 text-gray-900" icon={faEye} />;
const speed = <FontAwesomeIcon icon={faShoePrints} />
const chevronRight = <FontAwesomeIcon icon={faChevronRight} />

function getVal(id){
  const val = document.getElementById(id)
  return val ? parseInt(val.value) : null
}

function Filters(props){
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(false)
    const [panel, setPanel] = useState('monsters')
    const [lootCats, setLootCats] = useState([])
    const [loot, setLoot] = useState('Adventuring Gear')
    const [minError, setMinError] = useState(false)
    const [maxError, setMaxError] = useState(false)

    function range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }



    async function getDetail(res){

      let randomNum = Math.floor(Math.random() * Object.keys(res).length + 1);
      if (panel == 'loot'){
        randomNum = Math.floor(Math.random() * res.equipment.length);
      }

      let randomChoice;

      let randomURL;
      if (panel == 'monsters'){
        randomChoice = res[randomNum].index;
        randomURL = `https://www.dnd5eapi.co/api/monsters/${randomChoice}`;
      } else if (panel == 'loot'){
        if (res.hasOwnProperty('equipment')){
          randomChoice = res.equipment[randomNum].url
        }
        console.log(`randomChoice is ${randomChoice}`)
        randomURL = `https://www.dnd5eapi.co${randomChoice}`
        console.log(randomURL)
      }
      console.log(`randomURL is ${randomURL}`)
      await fetch(randomURL)
                .then((res) => res.json())
                .then((res) => {
                  console.log(res)
                 setData(res)
                if (panel == 'monsters'){
                  let subtype = res.subtype;
                let type = res.type;
                if (subtype = 'any race'){

                    let randomNum = Math.floor(Math.random() * [utils.race].length + 1);

                    subtype = utils.race[randomNum]


                }
                if (res.type == 'humanoid' && res.subtype == null){
                    let randomNum = Math.floor(Math.random() * [utils.race].length + 1);

                    subtype = utils.race[randomNum]
                }
                }
                // console.log(res)
                 props.setData(res)
                 setIsLoaded(true);
                 props.isLoaded(true)
                });
    }

    async function getQuery(){
      // console.log(panel)
      await props.setActivePanel(panel)
let url;
if (panel == 'monsters'){
  const challenge = range(getVal('challengeMin'), getVal('challengeMax'));
  url = `https://www.dnd5eapi.co/api/monsters/?challenge_rating=${challenge}`;
} else if (panel == 'loot'){
  console.log (`loot is set to ${loot}`)
  let formattedLoot = loot.replace(/\s+/g, '-').toLowerCase().replace("'", "")
  url = `https://www.dnd5eapi.co/api/equipment-categories/${formattedLoot}`;
  console.log(url)
}
      console.log(url)
        await fetch(url)
          .then((res) => res.json())
          .then(
            async (result) => {
              let res = result.results
              console.log(result)
              if (panel == 'loot'){
                res = result
              }
              // console.log(res)
              if (res){
                getDetail(res)
              } else {
                console.log(`error`)
                console.log(result)
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





    useEffect(()=>{
        getQuery();
        makeLootItems();
    }, [])

    function validateChallenges(type, number){
      if (type=='min' && parseInt(number) > getVal('challengeMax')){
        setMinError(true)
        setDisabled(true)
      } else {
        setMinError(false)
        setDisabled(false)
      }

      if (type == 'max' && parseInt(number) < getVal('challengeMin')){
        setMaxError(true)
        setDisabled(true)
      } else {
        setMaxError(false)
        setDisabled(false)
      }
    }

    function monsterPanel(){
      return(
        <>
      <p className="title text-3xl text-left modesto-condensed uppercase">Monsters</p>
                <div className="my-3 w-full">
                <form
                    className="flex justify-start flex-col"
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                    helperText={minError && 'Number cannot exceed the challenge max number.'}
                      error={minError}
                      id="challengeMin"
                      label="Challenge min"
                      variant="outlined"
                      defaultValue="0"
                      onChange={(e)=>validateChallenges('min', e.target.value)}
                    />
                    <div className="p-2" />
                     <TextField
                      helperText={maxError && 'Number cannot be below the challenge min number.'}
                     error={maxError}
                      id="challengeMax"
                      label="Challenge max"
                      variant="outlined"
                      defaultValue="30"
                      onChange={(e)=>validateChallenges('max', e.target.value)}

                    />
                  </form>


                </div>

      </>
      )
    }

    async function makeLootItems(){

      let url = `https://www.dnd5eapi.co/api/equipment-categories/`
      let lootArr = []

      await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        let lootRes = res.results
        lootRes.forEach((element, index) => {
          console.log(element)
        lootArr.push(
        <MenuItem
        key={index+1}
        onClick={()=>setLoot(element.name)}
        value={element.name}>
          {element.name}
        </MenuItem>)
        });
        setLootCats(lootArr)
        console.log(lootArr[0])
      })

    }

    function lootPanel(){
      return(
        <>
      <p className="title text-3xl text-left modesto-condensed uppercase">Loot</p>

                <FormControl variant="outlined" className="flex w-full" >
        <InputLabel id="loot-label"></InputLabel>
        <Select
        className="flex w-full"
          labelId="loot"
          id="loot"
          value={loot}
        >
          {lootCats}
        </Select>
      </FormControl>




      </>
      )
    }


    function spellsPanel(){
      return(
        <>
      <p className="title text-3xl text-left modesto-condensed uppercase">Spells</p>
                <div className="my-3">
                <p>Coming soon.</p>


                </div>

      </>
      )
    }


    function conditionsPanel(){
      return(
        <>
      <p className="title text-3xl text-left modesto-condensed uppercase">Conditions</p>
                <div className="my-3">
                <p>Coming soon.</p>


                </div>

      </>
      )
    }

    function determinePanel(){
      if (panel == 'monsters'){
        return monsterPanel()
      } else if (panel == 'loot') {
        return lootPanel()
      } else if (panel == 'spells'){
        return spellsPanel()
      } else if (panel == 'conditions'){
        return conditionsPanel()
      }
    }

    function handlePanelChange(val){
      console.log(val)
     if (val == 'monsters' || val == 'loot'){
       setDisabled(false)
     } else {
       setDisabled(true)
     }
      setPanel(val)
    }

    function determinePanelBG(){
      if(panel == 'monsters'){
        return 'bg-purple-400'
      } else if (panel == 'loot'){
        return 'bg-orange-400'
      } else if ( panel == 'spells'){
        return 'bg-blue-400'
      } else if (panel == 'conditions'){
        return 'bg-gray-400'
      }
    }


    return(
        <div className="flex w-full">
            <div className="flex w-full flex-col">
              <ul className="flex border-b">
                <li className={`${panel== 'monsters' && '-mb-px'} mr-1`}>
                  <a
                    className="bg-purple-400 inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                    href="#"
                    onClick={()=>handlePanelChange('monsters')}
                  >
                    {spider}
                  </a>
                </li>
                <li className={`${panel== 'loot' && '-mb-px'} mr-1`}>
                  <a
                    className="bg-orange-400 inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold rounded-t"
                    href="#"
                    onClick={()=>handlePanelChange('loot')}
                  >
                    {coins}
                    {/* <p>Monster</p> */}
                  </a>
                </li>
                <li className={`${panel== 'spells' && '-mb-px'} mr-1`}>
                  <a
                    className="bg-blue-400 inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold rounded-t"
                    href="#"
                    onClick={()=>handlePanelChange('spells')}

                  >
                    {magic}
                  </a>
                </li>
                <li className={`${panel== 'conditions' && '-mb-px'} mr-1`}>
                  <a
                    className="bg-gray-400 inline-block py-2 px-4 text-blue-500 font-semibold rounded-t"
                    href="#"
                    onClick={()=>handlePanelChange('conditions')}

                  >
                    {eye}
                  </a>
                </li>
              </ul>
              <div className={`${determinePanelBG()} w-full h-full flex rounded rounded-tl-none border-l border-r border-b p-10 flex-col justify-start items-start relative`}>
                {determinePanel()}
                <button
                disabled={disabled}
                onClick={()=>getQuery()}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-0 right-0 m-8 flex flex-row items-center ${disabled && 'opacity-25'}`}>
 <p className="mr-3"> Fetch it</p> {chevronRight}
</button>
              </div>
            </div>
          </div>
    )
}

export default Filters