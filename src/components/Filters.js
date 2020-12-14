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

const spider = <FontAwesomeIcon icon={faSpider} />;
const coins = <FontAwesomeIcon icon={faCoins} />;
const magic = <FontAwesomeIcon icon={faMagic} />;
const eye = <FontAwesomeIcon icon={faEye} />;
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
    const [cardLibrary, setCardLibrary] = useState(props.cardLibrary)
    const [queryType, setQueryType] = useState('monsters')
    const [quantity, setQuantity] = useState(getVal('quantity'))

    function range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    async function getDetail(res){
      let randomNum = Math.floor(Math.random() * Object.keys(res).length + 1);

      let randomChoice = res[randomNum].index

      let randomURL = `https://www.dnd5eapi.co/api/${queryType}/${randomChoice}`

      await fetch(randomURL)
                .then((res) => res.json())
                .then((res) => {
                 setData(res)
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
                 props.setData(res)
                 setIsLoaded(true);
                 props.isLoaded(true)
                });
    }

    async function getQuery(){
      const challenge = range(getVal('challengeMin'), getVal('challengeMax'));
      let url = `https://www.dnd5eapi.co/api/${queryType}/?challenge_rating=${challenge}`;
      console.log(url)
        await fetch(url)
          .then((res) => res.json())
          .then(
            async (result) => {
              let res = result.results
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
        getQuery()
    }, [])


    return(
        <div className="flex w-full">
            <div className="flex w-full flex-col">
              <ul className="flex border-b">
                <li className="-mb-px mr-1">
                  <a
                    className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                    href="#"
                  >
                    {spider}
                  </a>
                </li>
                <li className="mr-1 ">
                  <a
                    className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold rounded-t"
                    href="#"
                  >
                    {coins}
                    {/* <p>Monster</p> */}
                  </a>
                </li>
                <li className="mr-1">
                  <a
                    className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold rounded-t"
                    href="#"
                  >
                    {magic}
                  </a>
                </li>
                <li className="mr-1">
                  <a
                    className="bg-white inline-block py-2 px-4 text-gray-400 font-semibold rounded-t"
                    href="#"
                  >
                    {eye}
                  </a>
                </li>
              </ul>
              <div className="bg-white w-full h-full flex rounded rounded-tl-none border-l border-r border-b p-10 flex-col justify-start items-start relative">
                <p className="title text-3xl text-left modesto-condensed uppercase">Monsters</p>
                <div className="my-3">
                <form
                    className="flex justify-start flex-col"
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="challengeMin"
                      label="Challenge min"
                      variant="filled"
                      defaultValue="0"
                    />
                    <div className="px-2" />
                     <TextField
                      id="challengeMax"
                      label="Challenge max"
                      variant="filled"
                      defaultValue="30"
                    />
                  </form>


                </div>
                <button
                onClick={()=>getQuery()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-0 right-0 m-8 flex flex-row items-center">
 <p className="mr-3"> Find it</p> {chevronRight}
</button>
              </div>
            </div>
          </div>
    )
}

export default Filters