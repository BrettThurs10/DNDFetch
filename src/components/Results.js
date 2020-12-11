import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faImages, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faTimes, faImages);
const times = <FontAwesomeIcon icon={faTimes} />;
const images = <FontAwesomeIcon className="hover:text-gray-200 cursor-pointer text-2xl" color="white" icon={faImages} />;

function Results(props) {
  const [error, setError] = useState("");
  const [data, setData] = useState(props.data);
  const [profileImg, setProfileImg] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setData(props.data);
  });

  const myName = data.name

  function wrapWords(str, tmpl) {
    return str.replace(/\w+/g, tmpl || "<span>$&</span>");
  }

  function goToGoogleImageSearch(name){
    const url = `https://www.google.com/search?q=${name}&tbm=isch&chips=q:${name},g_1:d%26d:XO36OVmqhVo%3D&hl=en&sa=X&ved=2ahUKEwiyqqyD48XtAhUj8VMKHdW7CIsQ4lYoAXoECAEQGw&biw=1280&bih=607`;
    return url
  }


  function cleanEntries(obj){
      return Object.entries(obj).join(' ').replace(/,/g, " ").replace(/\./g, ",")
  }

  function returnSpeed(speedObj){
      let speedString
      speedObj !== undefined ?
      speedString = cleanEntries(speedObj)
      :
      speedString = ""
      return speedString
  }

  const stats = ['str', 'dex', 'con', 'int', 'wis', 'cha']

  function returnStat(val){
      let stat
    switch(val) {
        case 'str':
          stat = "strength"
          break;
          case 'dex':
            stat = "dexterity"
            break;
            case 'con':
                stat = "constitution"
                break;
                case 'int':
                    stat = "intelligence"
                    break;
                    case 'wis':
                        stat = "wisdom"
                        break;
                        case 'cha':
                            stat = "charisma"
                            break;
        default:
          stat = ''
      }
      return(
        <div className="flex flex-col justify-center">
        <p className="font-bold text-center uppercase modesto-regular">{val}</p>
<p className="text-center font-bold">{data[stat]}</p>
    </div>
      )
  }

  function returnFacts(type, property){
    let string = ''
    if (property == undefined || property == '' || property.length == 0){
      return null
  } else if (typeof property == "string"){
        string = property
    } else if (Array.isArray(property)){
        if (typeof property[0] == 'object'){
          property.forEach(function(item){
              string += item.name + ', '
          })
        } else {
          string = property.join(', ')
        }
    } else if (typeof property == 'object'){
        string = cleanEntries(property).replace('_', ' ')
    }

    console.log()

    let block = <div className="flex px-4 items-start">
    <p className="petrona-bold text-bold pr-2 font-bold text-sm inline">{type}</p>
    <p className="text-sm font-thin inline">{string}</p>
   </div>
    return (
      block
    )
}

  function returnProficencies(property){
      let newArray = []
      if (property == undefined || property == '' || property.length == 0){
        return null
    } else {
      property.forEach(function(item){
        newArray.push(item.proficiency.name)
    })
    }
      let block = <div className="flex px-4 items-start">
      <p className="petrona-bold text-bold font-bold text-sm inline">Proficiencies: <p className="text-sm font-thin inline pl-2">{newArray.join(', ')}</p></p>

     </div>
      return (
        block
      )
  }

  function returnActions(property){
    let string = ''
    let newArr = []
    if (property == undefined || property == '' || property.length == 0){
      return null
  } else if (typeof property == "string"){
        string = property
    } else if (Array.isArray(property)){
        if (typeof property[0] == 'object'){

          property.forEach(function(item, index){
            let block = <div key={index} className="flex px-4 items-start pb-2 inline">

          <p className="text-sm font-thin inline"><p className="petrona-bold font-semibold inline italic pr-2 inline">{item.name}.</p> {item.desc}</p>
           </div>
                      newArr.push(block)
          })
        } else {
          string = property.join(', ')
        }
    } else if (typeof property == 'object'){
        string = cleanEntries(property).replace('_', ' ')
    }
    return (
      newArr
    )
}


  return (
    <div id="card" className="flex w-full p-10 items-center justify-center">
      <div
        onClick={() => console.log(data.name)}
        className="shadow-xl flex w-full bg-red-600 p-5 m-10 rounded"
      >
        <div className="flex w-full justify-center items-center relative  flex-col">
          <p className="text-center modesto-condensed uppercase text-4xl font-bold self-center bg-orange-200 w-full rounded-br-none rounded-bl-none rounded-lg py-2">
            {myName}
          </p>

          <p className="text-white text-center py-1">
            {data.size} {data.subtype !== null && `(${data.subtype})`} {data.type}, {data.alignment}
          </p>

          <div className=" bg-orange-200 w-full rounded-tr-none rounded-tl-none rounded-lg py-2">
            <div className="flex flex-row">
              <div className="flex flex-1 px-4">
                <p className="font-bold pr-2">AC:</p> {data.armor_class}
              </div>
              <div className="flex flex-1">
                <p className="font-bold pr-2">HP:</p>
                <p>{`${data.hit_points} (${data.hit_dice})`}</p>
              </div>
            </div>
            <div className="px-4 flex flex-row">
                <p className="font-bold pr-2 text-sm pr-2">Speed:</p>

                <p className="text-sm"> {returnSpeed(data.speed)}</p>
            </div>
            <div className="flex w-full px-4 py-2 justify-between">
                {stats.map(x=>returnStat(x))}
            </div>
            <div className="bg-orange-200 border-t-2 border-red-500 py-2">
                {returnFacts("Languages: ",
                data.languages)}
                {returnFacts("Condition immunities: ",
                data.condition_immunities)}
                {returnFacts("Damage immunities: ",
                data.damage_immunities)}

                 {returnFacts("Damage resistances: ",
                data.damage_resistances)}
                {returnFacts("Damage vulnerablities: ",
                data.damage_vulnerabilities)}
                {returnProficencies(data.proficiencies)}
                {returnFacts("Senses: ",
                data.senses)}

            </div>
            <div className="bg-orange-200 border-t-2 border-red-500 py-2">
                <p className="px-4 text-md font-bold modesto-regular uppercase">Actions</p>
                {returnActions(data.actions)}
            </div>
          </div>
        <div className="flex w-full flex-row justify-between items-center">
  <p className="text-left text-white font-bold modesto-condensed text-3xl">Challenge {Math.round(data.challenge_rating)} {`(${data.xp} XP)`}</p>
 <a target="_blank" title={`Google image search for ${myName}`} href={goToGoogleImageSearch(myName)}>{images}</a>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
