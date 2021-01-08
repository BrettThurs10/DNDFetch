import React from 'react';

function FeedSortBtns(props) {
    return(
        <div className="flex flex-row justify-between w-full">
        <button
          className={props.sortBtnClass("asc")}
          onClick={() => props.sortLibrary("asc")}
        >
          Asc
        </button>
        <button
          className={props.sortBtnClass("dsc")}
          onClick={() => props.sortLibrary("dsc")}
        >
          Dsc
        </button>
        <button
          className={props.sortBtnClass("type")}
          onClick={() => props.sortLibrary("type")}
        >
          Type
        </button>
        <button
          className={props.sortBtnClass("clear")}
          onClick={() => props.clearLibrary()}
        >
          Clear
        </button>
      </div>
    )
}

export default FeedSortBtns