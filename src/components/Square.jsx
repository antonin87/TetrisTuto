import React from 'react';

const Square = (props) => {
  const style = {
    left: (props.col - 1) * 25 + 'px',
    top: (props.row - 1) * 25 + 'px'
  }
  return(
    <div className={'square'} style={style}></div>
  );
}
export default Square;
