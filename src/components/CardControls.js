import React from 'react'
import Button from "@material-ui/core/Button";

function CardControls(props) {
    const data = props.data;

    function goToGoogleImageSearch(name) {
        const url = `https://www.google.com/search?q=${name}&tbm=isch&chips=q:${name},g_1:d%26d:XO36OVmqhVo%3D&hl=en&sa=X&ved=2ahUKEwiyqqyD48XtAhUj8VMKHdW7CIsQ4lYoAXoECAEQGw&biw=1280&bih=607`;
        return url;
      }

    return (
        <div className="flex w-full justify-between mb-2">
        <Button
        target="_blank"
    href={ goToGoogleImageSearch(data.name)}
  variant="contained"
        >
          <p className="text-xs">Find image</p>
        </Button>
        <Button
          onClick={() => props.saveThisCard(data)}
          variant="contained"
          color="primary"
        >
          <p className="text-xs">Save card</p>
        </Button>
      </div>
    )
}


export default CardControls

