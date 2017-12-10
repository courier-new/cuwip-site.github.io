/**
 * maps.js
 *
 * Controls rendering and interaction with maps around agenda and faq
 *
 * @author    Kelli Rockwell <kellirockwell@mail.com>
 * @since     File available since December 10th, 2017
 * @version   1.0.0
 */

const pomMap = "../img/pom-map-2000.jpg",
      hmcMap = "../img/hmc-map-2000.jpg",
      cppMap = "../img/cpp-map-2000.jpg";


const addMap = ({
    'event': event,
    'campus': campus
}) => {
    let mapbg;
    switch(campus) {
        case "Pomona":
            mapbg = pomMap;
            break;
        case "Harvey Mudd":
            mapbg = hmcMap;
            break;
        default:
            mapbg = cppMap;
    }
    return `<div class='map'></div>`;
};
