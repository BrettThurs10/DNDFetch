import React from "react";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

function Logo(){
return(
<div className="flex flex-row items-center">
<DoubleArrowIcon className="text-white" style={{fontSize: 15}}/>
<p className="text-white text-4xl modesto-condensed uppercase">DND</p>
<p className="text-white text-3xl pb-1">-</p>
<p className="text-white text-4xl modesto-condensed uppercase">Fetch</p>
<ArrowRightIcon className="text-white" style={{fontSize: 32, marginLeft:-10}}/>
</div>
)
}

export default Logo
