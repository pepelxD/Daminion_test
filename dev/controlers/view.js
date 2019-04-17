const renderBlock = document.querySelector('[data-id="render-block"]');
export default class {
    constructor(html, callback) {
        this.html = html;
        this.renderBlock = renderBlock;
    }
    render() {
        const template = document.createElement('template');
        template.innerHTML = this.html;
        this.renderBlock.innerHTML = '';
        this.renderBlock.appendChild(template.content);
    }
}