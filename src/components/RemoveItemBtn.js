import React from 'react';
import CloseIcon from "@material-ui/icons/Close";


function RemoveItemBtn(props){
    return(
        <button
        onClick={() => props.removeAction()}
        className="bg-red-600 hover:bg-red-700 text-white cursor-pointer h-6 w-6 rounded-full self-center absolute right-0 mr-4"
      >
                  <CloseIcon fontSize="small" />


      </button>
    )
}

export default RemoveItemBtn