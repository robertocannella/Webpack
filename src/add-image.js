import Kiwi from './engin-akyurt-jPVcZsxRGJo-unsplash.jpg';

export default function addImage() {
    const img = document.createElement('img');
    img.alt = 'kiwi';
    img.width = '300';
    img.src = Kiwi;
    const body = document.querySelector('body')
    body.appendChild(img);
}