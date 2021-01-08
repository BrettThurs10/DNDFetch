import React from 'react'

function SpellsCardBody(props) {
    const data = props.data;


    function renderDesc(data) {
        const descArr = [];
        data.map((x, y) => {
          descArr.push(<p>{x}</p>);
        });
        return descArr;
      }

    const returnDescriptionText = (descriptor, text) =>{
        return (
          <div>
          <p className="font-bold pr-2 inline text-sm">{descriptor}</p>
          <p className="pr-2 inline text-sm">{text}</p>
          </div>
        )
      }
    return(
<div className="flex w-full justify-center items-center relative  flex-col">
        <p className="text-center modesto-condensed uppercase text-4xl font-bold self-center bg-orange-200 w-full rounded-br-none rounded-bl-none rounded-lg py-2">
          {props.myName}
        </p>

        <p className="text-white text-center py-1">
          {data.school?.name}{data.duration && `, ${data.duration}`}
        </p>

        <div className=" bg-orange-200 w-full rounded-tr-none rounded-tl-none rounded-lg py-2">
          <div className="flex flex-col px-4">
          {data.range && returnDescriptionText('Range:', data.range) }
          {data.material && returnDescriptionText('Material:', data.material)}
          {data.area_of_effect &&
              returnDescriptionText('Area of effect:',
              `${data.area_of_effect?.type}${data.area_of_effect?.size && `, ${data.area_of_effect?.size}`}`)
            }

          </div>

          <div className="flex w-full px-4 py-1 justify-between">
            {/* {stats.map((x) => returnStat(x))} */}
          </div>
          <div className="bg-orange-200 border-t-2 border-red-500 p-4">
          {renderDesc(data.desc)}
          </div>
        </div>
        <div className="flex w-full flex-row justify-between items-center">
          <p className="text-left text-white font-bold modesto-condensed text-3xl">
            Spell level {data.level}
          </p>
        </div>
      </div>
    )
}

export default SpellsCardBody