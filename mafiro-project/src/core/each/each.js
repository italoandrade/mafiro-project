(() => {
    mafiro.each = (array, callback) => {
        const isArray = array.constructor === Array;
        const isHTMLCollection = array.constructor === HTMLCollection;
        const isNodeList = array.constructor === NodeList;

        if (isArray || isHTMLCollection || isNodeList) {
            const length = array.length;

            for (let i = 0; i < length; i++) {
                callback(i, array[i]);
            }
        } else {
            console.error('You can only iterate arrays');
        }
    }
})();
