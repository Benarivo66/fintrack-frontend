import React from 'react';


export default function formatDate(str: string) {

let obj = {
  "01":'Jan',
  "02":'Feb',
  "03":'Mar',
  "04":'Apr',
  "05":'May',
  "06":'Jun',
  "07":'Jul',
  "08":'Aug',
  "09":'Sep',
  "10":'Oct', 
  "11":'Nov',
  "12":'Dec',
}
 let date = new Date(str);
let year = date.getFullYear();
let month = date.getMonth()+1;
let dt = date.getDate();
    let day = "";
    let secondMonth = "";

    let time = str.split('T')[1].split(':')
    let formattedTime = ""
  if (Number(time[0]) < 12) formattedTime = `${time[0]}:${time[1]}am`;
  else if(Number(time[0]) === 12) formattedTime = `12:${time[1]}pm`
else {formattedTime = `${Number(time[0])-12}:${time[1]}pm`};

if (dt < 10) {
  day = '0' + dt;
}

if (month < 10) {
  secondMonth = '0' + month;
}
    secondMonth = obj[secondMonth];

return `${dt} ${secondMonth}, ${year} by ${formattedTime}`;
}
