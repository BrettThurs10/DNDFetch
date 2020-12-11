import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";
import {io} from '../assets/imgOverride';
import archmage from '../img/archmage.jpg';

library.add(faShoePrints, faChevronRight);
const speed = <FontAwesomeIcon icon={faShoePrints} />;
const chevronRight = <FontAwesomeIcon icon={faChevronRight} />;

function flipCard(flip){

    if (flip == undefined){
        var elem = document.getElementById("card");
        elem.className += " flipped";
    } else {
        var elem = document.getElementById("card");
        elem.classList.remove("flipped");
    }


}

function Card(props) {
    const [error, setError] =useState('')
    const [data, setData] = useState(props.data);
    const [profileImg, setProfileImg] = useState('');
    const [isLoaded, setIsLoaded] = useState(false)



useEffect(()=>{
    setData(props.data)
    setProfileImg(props.profileImg)

})

  return (
    <div className="flex w-full p-10 items-center justify-center flip">
      <div
      id="card"
        style={{ height: "500px", width: "400px" }}
        className="bg-white w-full rounded -md border-gray-200 border shadow-lg p-2 flip-content"
      >
        <div className="flip-front flex w-full h-full flex-col p-6 pt-10 left-0 top-0">
          <div
            style={{
                width: '200px',
                backgroundImage: `url(${profileImg})`,
              borderRadius: "100%",
              marginTop:'-50px',
              boxShadow: 'inset 0px 0px 30px rgba(0,0,0,0.9)',

            }}
            className="self-center h-56 bg-cover bg-no-repeat bg-top border shadow-xl"
          />
          <div className="flex flex-row justify-between m-2 items-start">
            <div className="w-full">
              <div className="w-full justify-between flex flex-row">
                <p className="flex flex-1 font-bold">{data.name}</p>
        <p className="mx-1 text-xs">{`${data.xp} xp`}</p>
              </div>

              <div className="flex flex-row justify-between w-full">
                <p className="text-xs capitalize">{`${data.size} ${data.type}`}</p>
        <p className="text-xs capitalize">{data.alignment}</p>
              </div>
            </div>
          </div>
          <div
            className="flex flex-row items-start justify-between left-0 absolute top-0 w-full p-2"
            style={{ backfaceVisibility: "hidden" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="54"
              fill="gray"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-3.436-.012-6.928 1.225-9 3v11.536c0 4.602 3.204 5.803 9 9.464 5.796-3.661 9-4.863 9-9.464v-11.536c-2.072-1.775-5.564-3.012-9-3z" />{" "}
              <text
                className="text-xs"
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
              >
                {data.armor_class}
              </text>{" "}
            </svg>

            {/* <p>Challenge 2</p> */}
            <div className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="54"
                height="54"
                viewBox="0 0 24 24"
                fill="crimson"
              >
                <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
                <text
                  className="text-xs"
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="white"
                >
                  {data.hit_points}
                </text>
              </svg>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-row justify-between">
              <div className="w-full mx-1 justify-center border rounded p-2 bg-orange-100">
                <p className="text-xs text-center">STR</p>
        <p className="text-sm text-center">{data.strength}</p>
              </div>
              <div className="w-full mx-1 justify-center border rounded p-2 bg-orange-100 shadow-sm">
                <p className="text-xs text-center">DEX</p>
                <p className="text-sm text-center">{data.dexterity}</p>
              </div>
              <div className="w-full mx-1 justify-center border rounded p-2 bg-orange-100 shadow-sm">
                <p className="text-xs text-center">CON</p>
        <p className="text-sm text-center">{data.constitution}</p>
              </div>
              <div className="w-full mx-1 justify-center border rounded p-2 bg-orange-100 shadow-sm">
                <p className="text-xs text-center">INT</p>
                <p className="text-sm text-center">{data.intelligence}</p>
              </div>
              <div className="w-full mx-1 justify-center border rounded p-2 bg-orange-100 shadow-sm">
                <p className="text-xs text-center">WIS</p>
                <p className="text-sm text-center">{data.wisdom}</p>
              </div>
              <div className="w-full mx-1 justify-center border rounded p-2 bg-orange-100 shadow-sm">
                <p className="text-xs text-center">CHA</p>
                <p className="text-sm text-center">{data.charisma}</p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs">Walk: 30 ft., Burrow: 10 ft.</p>
            </div>
            <div className="flex flex-row w-full items-center justify-between absolute bottom-0 left-0 p-5">
              <div className="flex flex-1 items-center">
                <div className="border rounded-md w-10 h-10 justify-center items-center flex shadow-sm">
                  <p>24</p>
                </div>
        <p className="text-xs text-left pl-3">{data.hit_dice}</p>
              </div>
              <button
              onClick={()=>flipCard()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                <span className="pr-3">Actions</span>
                {chevronRight}
              </button>
            </div>
          </div>
        </div>
        <div className="flip-back flip-back flex w-full h-full flex-col left-0 top-0">
          <p>hey</p>
          <div className="absolute bottom-0 left-0 justify-end flex p-5 w-full">
          <button
              onClick={()=>flipCard(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                <span className="pr-3">Profile</span>
                {chevronRight}
              </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Card;
