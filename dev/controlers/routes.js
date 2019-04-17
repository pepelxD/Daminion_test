import menu from '../components/menu';
import error from '../components/error';
import combobox from '../components/combobox';
import circle from '../components/circle';

const views = {
    'menu' : menu,
    'combobox': combobox,
    'circle': circle
};
export default class {
    constructor() {
        this.routes = {};
    }
    getHash(hash) {
        return hash.replace('#', '');
    }
    changeRout(rout) {
        try {
            views[this.routes[rout]].render();
        } catch (err) {
            console.error(err)
            error.render();
        }
    }
    init(routes) {
        for(var key in routes) {
            this.routes[routes[key]] = key;
        }
        window.onhashchange = (event) => {
            event.preventDefault();
            this.changeRout(this.getHash(location.hash));
        }
        this.changeRout(this.getHash(location.hash));
    }
}