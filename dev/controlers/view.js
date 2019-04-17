const renderBlock = document.querySelector('[data-id="render-block"]');
export default class {
    constructor(html, callback) {
        this.html = html;
        this.renderBlock = renderBlock;
        this.callback = callback;
    }
    render() {
        const template = document.createElement('template');
        template.innerHTML = this.html;
        this.renderBlock.innerHTML = '';
        this.renderBlock.appendChild(template.content);
        if (typeof this.callback === 'function') {
            this.callback();
        }
    }
}