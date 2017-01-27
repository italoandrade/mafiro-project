(() => {
    mafiro.element = (selector) => {
        const selectorIdentifier = selector.substr(0, 1);
        selector = selector.substring(1);

        let element;

        switch (selectorIdentifier) {
            case '.':
                element = document.getElementsByClassName(selector);
                break;
            case '<':
                let div = document.createElement('div');
                div.innerHTML = '<' + selector;
                element = div.childNodes[0];
        }

        if (selectorIdentifier === '.') {
            element = document.getElementsByClassName(selector);
        }

        return element;
    }
})();
