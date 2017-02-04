(() => {
    mafiro.element = (selector) => {
        const selectorIdentifier = selector.substr(0, 1);
        const newSelector = selector.substring(1);

        let element;

        switch (selectorIdentifier) {
            // case '.':
            //     element = document.getElementsByClassName(newSelector);
            //     break;
            case '<':
                let div = document.createElement('div');
                div.innerHTML = '<' + newSelector;
                element = div.childNodes[0];
                break;
            default:
                element = document.querySelectorAll(selector);
        }

        return element;
    };

    mafiro.element.empty = (element) => {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };

    mafiro.element.childs = (element) => {
        return element.children;
    };

    mafiro.element.remove = (element) => {
        element.parentNode.removeChild(element);
    };

    mafiro.element.append = (parent, child) => {
        parent.appendChild(child);
    };

    mafiro.element.prepend = (parent, child) => {
        parent.insertBefore(child, parent.firstChild);
    };

    mafiro.element.position = (element) => {
        /* http://javascript.info/tutorial/coordinates */

        if (element.getBoundingClientRect) {
            return getOffsetRect(element)
        } else { // old browser
            return getOffsetSum(element)
        }
    };

    function getOffsetSum(elem) {
        /* http://javascript.info/tutorial/coordinates */

        var top=0, left=0;

        while(elem) {
            top = top + parseInt(elem.offsetTop);
            left = left + parseInt(elem.offsetLeft);
            elem = elem.offsetParent
        }

        return {top: top, left: left}
    }

    function getOffsetRect(elem) {
        /* http://javascript.info/tutorial/coordinates */

        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docElem = document.documentElement;

        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;

        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) }
    }

})();
