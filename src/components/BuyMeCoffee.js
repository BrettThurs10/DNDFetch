import React from 'react';
import { ReactComponent as BMC } from "../img/bmc.svg";


function BuyMeCoffee(props) {
    return(
        <div class=" flex flex-col w-full justify-center bottom-0 items-center" style={{flex: .3}}>
        <a href='https://www.buymeacoffee.com/brettthurston' target='_blank'>
          <div class="flex flex-row bg-green-400 hover:bg-green-500 cursor-pointer px-3 py-2 rounded justify-center items-center mt-2 md:mt-0">
          <BMC className="h-4 w-4 mr-2" />
            <p class='text-sm'>Buy me a coffee</p>
            </div>
        </a>
      </div>
    )
}

export default BuyMeCoffee