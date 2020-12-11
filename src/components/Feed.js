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


function Feed(props){
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(props.data);
    const [error, setError] = useState(null);
    const [profileImg, setProfileImg] = useState(null)
    const [queryType, setQueryType] = useState('monsters')
    const [monsterType, setMonsterType] = useState("");
    const [monsterSize, setMonsterSize] = useState('');
    const [monsterAlignment, setMonsterAlignment] = useState('');

    return(
        <div className="flex w-1/2 bg-orange-100 h-full overflow-y-scroll">
           </div>
    )
}

export default Feed