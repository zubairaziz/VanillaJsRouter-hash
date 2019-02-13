class Layout {
    constructor(...pages) {
        this.pages = pages;
    }

    load() {
        return Promise.all(this.pages.map((page) => page.load()));
    }

    show(el) {
        for (let page of this.pages) {
            const div = document.createElement('div');
            page.show(div);
            el.appendChild(div);
        }
    }
}
