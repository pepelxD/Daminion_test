import View from '../../controlers/view.js'
import html from './index.pug';
import style from './style.css';

export default function() {
    new View(html()).render();
    document.body.style.height = '';
} 