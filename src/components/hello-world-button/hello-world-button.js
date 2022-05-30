import './hello-world-button.scss';

export default class HelloWorldButton {
    buttonClass = 'hello-world-button'; // <-- class property not supported by major browsers
    render() {
        const body = document.querySelector('body')
        const button = document.createElement('button');

        button.innerHTML = 'Hello World!';
        button.classList.add(this.buttonClass);
        button.addEventListener('click', () => {
            const p = document.createElement('p');
            p.innerHTML = ('Hello World');
            p.classList.add('hello-world-text');
            body.appendChild(p);
            console.log('Hello World!');

        })
        body.appendChild(button)

        let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
    }

}

