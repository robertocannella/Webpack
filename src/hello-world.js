import HelloWorldButton from './components/hello-world-button/hello-world-button';
import { Heading } from './components/heading/heading';
import _ from 'lodash';

const heading = new Heading();
const helloWorldButton = new HelloWorldButton();



heading.render(_.upperFirst('hello world'));
helloWorldButton.render();

if (process.env.NODE_ENV === 'production')
    console.log("Production Mode")
if (process.env.NODE_ENV === 'development')
    console.log("Development Mode")