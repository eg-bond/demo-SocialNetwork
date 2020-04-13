import React from 'react'
import preloader from "../../Assets/loader.gif";
import s from './Preloader.module.css'

let Preloader = (props) => {
    return (
        <div >
            <img className={s.img} src={preloader}/>
        </div>
    )
}

export default Preloader;

