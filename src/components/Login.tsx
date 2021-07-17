import React from 'react';
import img from '../images/decagon.svg';
import classes from '../css/login.module.css';

export default function Login() {
    return (
        <div className={classes.parent}>
            <div className={classes.container}>
                <div className={classes.containerNav}>
                    <div>
                        <a href=""><img src={img} alt=""/></a>
                    </div>
                </div>
            </div>

            <div>
                <div className={classes.containerContent}>
                    <h1>Welcome to Fintrack</h1>
                </div>
                <div className={classes.containerBtn}>
                    <button onClick={() => { location.href = 'http://localhost:3000/login' }} className={classes.btn}>Login</button>
                </div>
            </div>
        </div>
    )
}
