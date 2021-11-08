const morningOffTime = "06:00";
const eveningOffTime = "22:00";


const determineScheduledHours = () => {
    let currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
    return Date.parse(`1/1/2021 ${morningOffTime}`) < Date.parse(`1/1/2021 ${currentTime}`) && 
        Date.parse(`1/1/2021 ${eveningOffTime}`) > Date.parse(`1/1/2021 ${currentTime}`) ? 
        true : false;
}

module.exports = { determineScheduledHours }