import './heading.scss';

export class Heading {
    render(pageName) {
        const h1 = document.createElement('h1');
        const body = document.querySelector('body');
        h1.innerHTML = 'Webpack is awesome. This is the ' + pageName + ' page.';
        h1.classList.add('heading')
        body.appendChild(h1);
    }
}