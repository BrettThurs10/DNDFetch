import React from 'react'
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';

function Tip(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const open = Boolean(anchorEl);
      const id = open ? `simple-popover${props.num}` : undefined;

    return (
        <div className={`px-3 ${props.className}`}>

          <HelpIcon aria-describedby={id} onClick={handleClick} className={`cursor-pointer ${props.btnColor ? props.btnColor : 'text-white'}`} />


        <Popover
  id={id}
  open={open}
  anchorEl={anchorEl}
  onClose={handleClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'center',
  }}
>
<p className="p-6 text-center w-56">{props.message}</p>
</Popover>
        </div>
    )
}

Tip.propTypes = {
message: PropTypes.string
}

export default Tip

