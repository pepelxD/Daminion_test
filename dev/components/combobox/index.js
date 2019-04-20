import View from '../../controlers/view.js'
import html from './index.pug';
import style from './style.css';
import prices  from './price.json';

class Combobox {
    constructor(node) {
        this.DOMElement = node;
        this.totallBlock = this.DOMElement.querySelector('.price_value');
        this.selectedLicenseBlock = this.DOMElement.querySelector('.selected_value')
    }
    showTotal() {
        const licenseType = Array.from(this.DOMElement.elements['licenseplan'])
        .filter((item) => item.checked)[0];
        const licenseCount = this.DOMElement.licensecount.options[this.DOMElement.licensecount.selectedIndex];
        const totall = licenseType.dataset.price * licenseCount.value
        this.totallBlock.textContent = totall;
        this.selectedLicenseBlock.textContent = licenseType.value;
    }
    init() {
        this.DOMElement.onchange = (event) => {
            event.preventDefault();
            this.showTotal();
        }
        this.DOMElement.onsubmit = (event) => {
            event.preventDefault();
            // реализуем логику отправки формы, например:
            // запустим анимацию отправки формы и начнем ее отправлять
            /* fetch('url', {method: 'POST', body: new FormData(this.DOMElement)})
            .then(response => {
                // выключаем анимацию, показываем пользователю ответ сервера
            }); */

            
        }
        this.showTotal();
    }
}

// Здесь имитируем обращение к базе через промис. Когда данные получены рисуем разметку и запускаем скрипт.
export default function() {
    import('./price.json')
    .then(({result}) => {
        console.log(result)
        new View(html({prices: prices})).render();
    })
    .then( () => {
        new Combobox(document.querySelector('#combobox')).init();
        document.body.style.height = 'auto';
    });
    
}