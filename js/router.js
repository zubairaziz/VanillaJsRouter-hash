const router = new Router(
    {
        home: new Layout(new Page("home.html")),
        about: new Layout(new Page("about.html")),
        "#default": new Page("home.html"),
    },
    document.querySelector("main")
);
