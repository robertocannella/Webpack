import './hello-world-button.css';

export default class HelloWorldButton {
    render() {
        const body = document.querySelector('body')
        const button = document.createElement('button');

        button.innerHTML = 'Hello World!';
        button.classList.add('hello-world-button');
        button.addEventListener('click', () => {
            const p = document.createElement('p');
            p.innerHTML = ('Hello World');
            p.classList.add('hello-world-text');
            body.appendChild(p);
            console.log('Hello World!');

        })
        body.appendChild(button)
    }

}

