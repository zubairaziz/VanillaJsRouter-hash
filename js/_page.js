class Page {
    constructor(url) {
        this.url = 'pages/' + url;
    }

    async load() {
        try {
            const response = await fetch(this.url);
            if (response.ok) {
                const contentType = response.headers.get('Content-Type') || '';
                if (contentType.includes('text/html')) {
                    return response
                        .text()
                        .then((res) => {
                            return (this.html = res);
                        })
                        .catch((error) => {
                            return Promise.reject(
                                new ResponseError('HTML error: ' + error.message)
                            );
                        });
                }
                return Promise.reject(new ResponseError('Invalid content type: ' + contentType));
            }
            if (response.status == 404) {
                return Promise.reject(new NotFoundError('Page not found: ' + url));
            }
            return Promise.reject(new HttpError('HTTP error: ' + response.status));
        } catch (error2) {
            return Promise.reject(new NetworkError(error2.message));
        }
    }

    show(el) {
        el.innerHTML = this.html;
    }
}
