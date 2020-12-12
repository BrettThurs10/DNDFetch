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


function Filters(props){
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [profileImg, setProfileImg] = useState(null)
    const [queryType, setQueryType] = useState('monsters')
    const [monsterType, setMonsterType] = useState("");
    const [monsterSize, setMonsterSize] = useState('');
    const [monsterAlignment, setMonsterAlignment] = useState('');

    async function setImgFromFetch(thing, imageSet, pageID){
        console.log(imageSet)
        console.log(thing)
        let filePath;

       if (imageSet !== undefined){
           console.log('img set')
           console.log(imageSet)
        Object.values(imageSet).some(async x=>{
            let item = Object.values(x)[1];
            let imageInfoURL;
          if (item !== undefined){
            if (item.search('5e') !== -1){
                console.log(item)
                filePath = item
                imageInfoURL = `https://evening-fjord-19580.herokuapp.com/https://forgottenrealms.fandom.com/api.php?action=query&titles=${filePath}&prop=imageinfo&iilimit=50&iiend=2007-12-31T23:59:59Z&iiprop=url&format=json
                `;
            } else if (item.search('4e') !== -1){
               console.log(item)
               filePath = item
               imageInfoURL = `https://evening-fjord-19580.herokuapp.com/https://forgottenrealms.fandom.com/api.php?action=query&titles=${filePath}&prop=imageinfo&iilimit=50&iiend=2007-12-31T23:59:59Z&iiprop=url&format=json
               `;

            } else if (item.search('3e') !== -1)
            console.log(item)
            filePath = item
            imageInfoURL = `https://evening-fjord-19580.herokuapp.com/https://forgottenrealms.fandom.com/api.php?action=query&titles=${filePath}&prop=imageinfo&iilimit=50&iiend=2007-12-31T23:59:59Z&iiprop=url&format=json
            `;
          } else {
            filePath = item
          }


          console.log(imageInfoURL)
          await fetch(imageInfoURL)
          .then((res) => res.json())
          .then(
            async (result) => {
                console.log('shabo')
                let id = Object.keys(result.query.pages)[0]
                console.log(result)
                let img;

                if (result.query.pages[id].imageinfo[0]){
                    img = result.query.pages[id].imageinfo[0].url;
                    img = img.substring(0, img.indexOf("/revision"));
                    console.log(img)
                    props.setProfileImg(img)
                } else {
                    img = null
                    console.log(img)
                }


            }
          )
          })
       }

    }

    async function getQuery(){
        let url = `https://www.dnd5eapi.co/api/${queryType}`;
        await fetch(url)
          .then((res) => res.json())
          .then(
            async (result) => {
              setIsLoaded(true);

              let res = result.results

              let randomNum = Math.floor(Math.random() * Object.keys(res).length + 1);

              let randomChoice = res[randomNum].index

              let randomUrl = `https://www.dnd5eapi.co/api/${queryType}/${randomChoice}`

              await fetch(randomUrl)
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
                 console.log(res)
                });
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
                <p className="title text-3xl text-left">Monsters</p>
                <div className="my-3">
                <div className="flxex flex-row w-3/4 mb-5">
                  <form
                    className="flex justify-start"
                    noValidate
                    autoComplete="off"
                  >
                    <TextField

                      id="outlined-basic"
                      label="Challenge min"
                      variant="outlined"
                    />
                    <div className="px-2" />
                     <TextField
                      id="outlined-basic"
                      label="Challenge max"
                      variant="outlined"
                    />
                  </form>

                </div>
<div className="flex flex-row w-full mb-5 justify-start">
                <FormControl variant="outlined" className="flex w-1/2 text-left">
                  <InputLabel
                  id="demo-simple-select-outlined-label">
                    Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={monsterType}
                    onChange={(event) => setMonsterType(event.target.value)}
                    label="Type"
                  >
                   {utils.monsterArray.map(x=>(
                     <MenuItem
                     key={x}
                     className="text-left" value={x}>{x}</MenuItem>
                   ))}
                  </Select>
                </FormControl>
                <div className="px-2" />
                <FormControl variant="outlined" className="flex w-1/2  text-left">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Size
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={monsterSize}
                    onChange={(event) => setMonsterSize(event.target.value)}
                    label="Type"
                  >
                   {utils.monsterSizeArray.map(x=>(
                     <MenuItem
                     key={x}
                     className="text-left" value={x}>{x}</MenuItem>
                   ))}
                  </Select>
                </FormControl>
                </div>
                <div className="w-full flex justify-start flex-row">
                <FormControl variant="outlined" className="flex w-1/2 self-start  text-left">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Alignment
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={monsterAlignment}
                    onChange={(event) => setMonsterAlignment(event.target.value)}
                    label="Type"
                  >
                   {utils.monsterAlignmentArray.map(x=>(
                     <MenuItem
                     key={x}
                     className="text-left" value={x}>{x}</MenuItem>
                   ))}
                  </Select>
                </FormControl>
                </div>
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