export default class {
    constructor() {
        this.routes = {};
    }
    getHash(hash) {
        return hash.replace('#', '');
    }
    changeRout(rout) {
        const comp = this.routes[rout] || 'error';
        import(`../components/${comp}`)
        .then(({default: comp}) => {comp()})
        .catch(err => console.log(err));
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