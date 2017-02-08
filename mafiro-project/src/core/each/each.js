(() => {
    mafiro.each = (array, callback, end) => {
        const isArray = array.constructor === Array;
        const isHTMLCollection = array.constructor === HTMLCollection;
        const isNodeList = array.constructor === NodeList;

        if (isArray || isHTMLCollection || isNodeList) {
            const length = array.length;

            for (let i = 0; i < length; i++) {
                callback(i, array[i]);

                if (end && i === length - 1) {
                    end();
                }
            }
        } else {
            console.error('You can only iterate arrays');
        }
    }
})();
