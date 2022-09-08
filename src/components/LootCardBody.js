import React from 'react'
import { MarkdownDescription } from './MarkdownDescription';

function LootCardBody(props) {
    const data = props.data

    function renderContents(data) {
        console.log(data[0].item.name);
        const contentsArr = [];
        data.map((x, y) => {
          contentsArr.push(
            <p>
              {data[y].item.name} ({data[y].quantity}){" "}
            </p>
          );
        });
        return contentsArr;
      }

      function renderDesc(desc) {
        return <MarkdownDescription desc={desc}/>;
      }

      function renderProperties(data) {
        const propertiesArr = [];
        data.map((x, y) => {
          propertiesArr.push(<p className="inline pr-1">{x.name},</p>);
        });
        return propertiesArr;
      }

    return(
        <div className="flex w-full justify-center items-center relative  flex-col">
        <p className="text-center modesto-condensed uppercase text-4xl font-bold self-center bg-orange-200 w-full rounded-br-none rounded-bl-none rounded-lg py-2">
          {props.myName}
        </p>

        <p className="text-white text-center py-1">
          {data.armor_category && `${data.armor_category} `}
          {data.damage && `${data.damage.damage_type.name} `}

          {data.equipment_category && data.equipment_category.name}
          {data.tool_category && `, ${data.tool_category}`}
          {data.gear_category && `, ${data?.gear_category.name}`}
          {data.quantity && `, ${data.quantity} count`}
          {data.weapon_range && `, ${data.weapon_range}`}
        </p>

        <div className=" bg-orange-200 w-full rounded-tr-none rounded-tl-none rounded-lg">
          <div className="bg-orange-200 border-t-2 border-red-500 p-4">
            {data.damage && <p>Damage dice: {data.damage.damage_dice}</p>}
            {data.two_handed_damage && (
              <p>
                Two handed damage dice: {data.two_handed_damage.damage_dice}
              </p>
            )}
            {data.range && (
              <p>
                Range: Normal {data.range.normal}
                {data.range.long && `, Long: ${data.range.long}`}
              </p>
            )}
            {data.properties && (
              <p>Properties: {renderProperties(data.properties)}</p>
            )}
            {data.armor_class && (
              <div>
                <p>
                  AC: {data.armor_class.base}{" "}
                  {data.armor_class.dex_bonus && `+ Dexterity modifier`}{" "}
                  {data.armor_class.max_bonus &&
                    ` + ${data.armor_class.dex_bonus}`}
                </p>
                {data.stealth_disadvantage && <p>Stealth disadvantage</p>}
                {data.str_minimum !== undefined ? (
                  <p>{`Minimum strength: ${data.str_minimum}`}</p>
                ) : null}
              </div>
            )}
            {data.desc
              ? renderDesc(data.desc)
              : `Hey look, it's a ${data.name}!`}

            {data.contents && renderContents(data.contents)}
            {data.speed && (
              <p>
                Speed: {data.speed.quantity} {data.speed.unit}
              </p>
            )}
            {data.capacity && <p>Capacity: {data.capacity}</p>}
          </div>
        </div>
        <div className="flex w-full flex-row justify-between items-center">
          <p className="text-left text-white font-bold modesto-condensed text-3xl">
            {" "}
            {data.cost && `Cost: ${data.cost.quantity} ${data.cost.unit}`}{" "}
          </p>
          <p className="text-left text-white font-bold modesto-condensed text-3xl">
            {" "}
            {data.weight && `Weight: ${data.weight}`}
          </p>
        </div>
      </div>
    )
}

export default LootCardBody