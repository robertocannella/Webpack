import './heading.scss';

export class Heading {
    render() {
        const h1 = document.createElement('h1');
        const body = document.querySelector('body');
        h1.innerHTML = 'Webpack is awesome.';
        h1.classList.add('heading')
        body.appendChild(h1);
    }
}