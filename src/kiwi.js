import { Heading } from "./components/heading/heading";
import { KiwiImage } from "./components/kiwi-image/kiwi-image";
import _ from 'lodash';

const kiwiImage = new KiwiImage();
const heading = new Heading();

heading.render(_.upperCase('kiwi'));
kiwiImage.render();


