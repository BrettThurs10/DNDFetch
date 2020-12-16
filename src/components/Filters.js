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
import {ReactComponent as Skull} from "../img/skull.svg";
import {ReactComponent as Loot} from "../img/treasure.svg";
import {ReactComponent as Spells} from "../img/witch-hat.svg";
import {ReactComponent as Conditions} from "../img/brain.svg";
import { red, purple, orange, blue, green } from "@material-ui/core/colors";


library.add(faSpider, faCoins, faMagic, faEye, faShoePrints);

const spider = <FontAwesomeIcon className="text-gray-900" icon={faSpider} />;
const coins = <FontAwesomeIcon className="text-gray-900" icon={faCoins} />;
const magic = <FontAwesomeIcon className="opacity-50 text-gray-900" icon={faMagic} />;
const eye = <FontAwesomeIcon className="opacity-50 text-gray-900" icon={faEye} />;
const speed = <FontAwesomeIcon icon={faShoePrints} />
const chevronRight = <FontAwesomeIcon icon={faChevronRight} />

function getVal(id){

  let val = document.getElementById(id)?.value
  if (id == '' ){
    val = '0'
  }
  return parseInt(val)
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
    const [challengeMin, setChallengeMin] = useState('')
    // Set to false so when getQuery first runs it will show the search panel in mobile - desktop doesn't utilize show/hide for search panel
    const [controlsVisible, setControls] = useState(false)

    function range(start, end) {
      if (start == undefined || isNaN(start)){
        start = 0
      }
      if (end == undefined || isNaN(end)){
        end = 30
      }
      console.log(`start ${start} end ${end}`)
       return Array(end - start + 1).fill().map((_, idx) => start + idx)
     }



    async function getDetail(res, cardType){

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
                  if (cardType !== undefined){
                    res.cardType = cardType
                  }
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

    async function getQuery(cardType){
      // console.log(panel)
      setControls(false)
      await props.setActivePanel(panel)
let url;
if (panel == 'monsters'){
  const challenge = range(getVal('challengeMin') ?? 0, getVal('challengeMax') ?? 30);
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
                getDetail(res, cardType)
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
        getQuery('monsters');
        makeLootItems();
    }, [])

    function validateChallenges(type, number){

      let minValue = getVal('challengeMin')
      let maxValue = getVal('challengeMax')
      if (isNaN(minValue)){
        minValue = 0
      }
      if (isNaN(maxValue)){
        maxValue = 30
      }

      if (type=='min' && parseInt(number) >= maxValue){
        setMinError(true)
        setDisabled(true)
      } else {
        setMinError(false)
        setDisabled(false)
      }

      if (type == 'max' && parseInt(number) <= minValue){
        setMaxError(true)
        setDisabled(true)
      } else {
        setMaxError(false)
        setDisabled(false)
      }


    }

    function handleChallenge(type, string){
      validateChallenges(type, string)
      if (type == 'min'){
        setChallengeMin(string)
      }
    }


    function monsterPanel(){
      return(
        <>
     <div className="flex flex-row items-center">
       <Skull fill="black" className="h-6 w-6 mr-2" />
     <p className="title text-3xl text-left modesto-condensed uppercase">Monsters</p>
       </div>
                <div className="my-3 w-full flex flex-row items-center">
                <form
                    className="flex justify-start flex-col md:py-2 w-1/2 md:w-full"
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                    helperText={minError && 'Number cannot exceed or be the challenge max number.'}
                      error={minError}
                      id="challengeMin"
                      placeholder="0"
                      label="Challenge min"
                      variant="outlined"
                      defaultValue="0"
                      onChange={(e)=>validateChallenges('min', e.target.value)}
                    /></form>
          <form
                    className="flex justify-start flex-col w-1/2 md:w-full"
                    noValidate
                    autoComplete="off"
                  >
                     <TextField
                      helperText={maxError && 'Number cannot be below the challenge min number.'}
                     error={maxError}
                     placeholder="30"
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
   <div className="flex flex-row items-center">
       <Loot fill="black" className="h-6 w-6 mr-2" />
     <p className="title text-3xl text-left modesto-condensed uppercase">Loot</p>
       </div>
                <FormControl className="flex w-full" >
        <InputLabel id="loot-label"></InputLabel>
        <Select
        variant="outlined"
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
   <div className="flex flex-row items-center">
       <Spells fill="black" className="h-6 w-6 mr-2" />
     <p className="title text-3xl text-left modesto-condensed uppercase">Spells</p>
       </div>                <div className="my-3">
                <p>Coming soon.</p>


                </div>

      </>
      )
    }


    function conditionsPanel(){
      return(
        <>
   <div className="flex flex-row items-center">
       <Conditions fill="black" className="h-6 w-6 mr-2" />
     <p className="title text-3xl text-left modesto-condensed uppercase">Conditions</p>
       </div>                <div className="my-3">
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
      console.log(panel)
      if (panel == val){
        setControls(!controlsVisible)
      } else {
        setControls(true)
      }

     if (val == 'monsters' || val == 'loot'){
       setDisabled(false)
     } else {
       setDisabled(true)
     }
      setPanel(val)
    }

    function determinePanelBG(){
      if(panel == 'monsters'){
        return {background: purple[300]}
      } else if (panel == 'loot'){
        return {background: orange[300]}
      } else if ( panel == 'spells'){
        return {background: blue[300]}
      } else if (panel == 'conditions'){
        return {background: green[300]}
      }
    }


    return(
        <div

        className="flex w-full h-full md:h-screen">

            <div className="flex w-full flex-col">
              <ul className="flex border-b justify-center md:justify-start">
                <li className={`${panel== 'monsters' && '-mb-px'} mr-1`}>
                  <a

                    className={`monster-button
                     inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold -mb-px
                    `}
                    href="#"
                    onClick={()=>handlePanelChange('monsters')}
                  >
                    <Skull className="w-6 h-6" />
                  </a>
                </li>
                <li className={`${panel== 'loot' && '-mb-px'} mr-1`}>
                  <a
                    className={` loot-button
                   inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold border-l border-t border-r rounded-t ${panel == 'loot' && 'border-b-0'}
                    `}
                    href="#"
                    onClick={()=>handlePanelChange('loot')}
                  >
                    <Loot className="w-6 h-6 text-gray-600" />
                    {/* <p>Monster</p> */}
                  </a>
                </li>
                <li className={`${panel== 'spells' && '-mb-px'} mr-1`}>
                  <a
                    className={` inline-block py-2 px-4 text-blue-500 spells-button
                    border-l border-t border-r hover:text-blue-800 font-semibold rounded-t ${panel == 'spells' && 'border-b-0'}`}
                    href="#"
                    onClick={()=>handlePanelChange('spells')}

                  >
                    <Spells className="h-6 w-6" />
                  </a>
                </li>
                <li className={`${panel== 'conditions' && '-mb-px'} mr-1`}>
                  <a
                    className={`inline-block py-2 px-4 text-blue-500 conditions-button font-semibold rounded-t border-l border-t border-r ${panel == 'conditions' && 'border-b-0'}`}
                    href="#"
                    onClick={()=>handlePanelChange('conditions')}

                  >
                    <Conditions className="h-6 w-6" />
                  </a>
                </li>
              </ul>
              <div
              style={determinePanelBG()}
              className={`${controlsVisible == false && 'hidden '} md:flex w-full h-full flex rounded rounded-tl-none border-l border-r border-b p-10 flex-col justify-start items-start relative -mt-2`}>
                {determinePanel()}
                <button
                disabled={disabled}
                onClick={()=>getQuery(panel)}
                className={`bg-gray-300 hover:bg-gray-200 text-green-800 font-bold py-2 px-4 rounded md:absolute bottom-0 right-0 my-3 md:m-8 flex flex-row items-center ${disabled && 'opacity-25'}`}>
 <p className="mr-3"> Fetch it</p> {chevronRight}
</button>
              </div>
            </div>
          </div>
    )
}

export default Filters