(() => {
    mafiro.class = {
        add: addClass,
        remove: removeClass,
        has: hasClass,
        toggle: toggleClass
    };

    function addClass(element, className) {
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ' ' + className;
        }
    }

    function removeClass(element, className) {
        if (element) {
            if (element.classList) {
                element.classList.remove(className);
            } else {
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        }
    }

    function hasClass(element, className) {
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    }

    function toggleClass(element, className) {
        if (mafiro.class.has(element, className)) {
            mafiro.class.remove(element, className);
        } else {
            mafiro.class.add(element, className);
        }
    }
})();
