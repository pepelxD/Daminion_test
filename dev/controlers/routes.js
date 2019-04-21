

const controlers = {
    menu: () => import('../components/menu'),
    circle: () => import('../components/circle'),
    combobox: () => import('../components/combobox')
};
export default class {
    constructor() {
        this.routes = {};
        this.controllers = {};
    }
    getHash(hash) {
        return hash.replace('#', '');
    }
    changeRout(rout) {
        controlers[this.routes[rout]]().then(({default: module}) => module());
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