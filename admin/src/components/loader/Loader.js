import React from 'react';
import loaderFile from "../../assets/gif/loader.gif"

const backdrop = {
    position : 'fixed',
    width : '100%',
    height : '100%',
    background: 'rgb(0 0 0 / 70%)',
    zIndex : 111111,

}
const loader = {
    position : 'absolute',
    top : '50%',
    left : '50%',
    transform: 'translate(-50%, -50%)',
}

export default function Loader () {

  return (
    <>
    <div style={backdrop}>
       <div style={loader}>
       <img src={loaderFile} alt="my-gif" width={400}/>
        </div>
    </div>
    </>
  )
};