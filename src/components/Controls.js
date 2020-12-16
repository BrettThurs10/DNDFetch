import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";

library.add(faShoePrints, faChevronRight);
const speed = <FontAwesomeIcon icon={faShoePrints} />;
const chevronRight = <FontAwesomeIcon icon={faChevronRight} />;

function Controls(props) {
    const [error, setError] =useState('')
    const [data, setData] = useState(props.data);
    const [profileImg, setProfileImg] = useState('');
    const [isLoaded, setIsLoaded] = useState(false)


  return (
    <div className="flex w-full p-10 items-center justify-center">

    </div>
  );
}

export default Controls;
