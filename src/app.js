import component from "./js/component";
import image from "./img/rocket.svg";
import "./style.scss";

document.body.appendChild(component());

const img = document.createElement("img");
img.src = image;
document.body.appendChild(img);
