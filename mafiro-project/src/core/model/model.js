(() => {
    mafiro.Model = Model;

    function Model(element) {
        this.elementReference = element;
        this.nodes = {};

        let elementHtml = element.innerHTML;

        elementHtml = elementHtml
            .replace(/{{/g, '<span class="mi-bind">')
            .replace(/}}/g, '</span>');

        element.innerHTML = elementHtml;

        const $binds = mafiro.element.find(element, '.mi-bind');

        mafiro.each($binds, (i, $bind) => {
            const bind = $bind.innerHTML;

            const textNode = document.createTextNode('');

            this[bind] = '';
            this.nodes[bind] = textNode;

            $bind.parentNode.replaceChild(textNode, $bind);
        });
    }

    Model.prototype.set = function (data, value) {
        const dataType = typeof data;

        switch (dataType) {
            case 'string':

                this[data] = value;

                this.nodes[data].data = value;

                break;
            case 'object':

                const params = Object.keys(data);

                mafiro.each(params, (i, param) => {
                    this.nodes[param].data = data[param];

                    this[param] = data[param];
                });

                break;
            default:
                console.error('You\'re trying to set an incompatible type of data');
                break;
        }
    };

})();
