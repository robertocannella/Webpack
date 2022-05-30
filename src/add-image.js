import Kiwi from './engin-akyurt-jPVcZsxRGJo-unsplash.jpg';
import AltText from './altText.txt'


export default function addImage() {
    const img = document.createElement('img');
    img.alt = AltText;
    img.width = '300';
    img.src = Kiwi;
    const body = document.querySelector('body')
    body.appendChild(img);
}