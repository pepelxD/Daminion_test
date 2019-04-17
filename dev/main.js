import html from './index.pug';
import style from './style.css';
import routes from './routes.json';
import Rout from './controlers/routes.js';

const rout = new Rout();
rout.init(routes);