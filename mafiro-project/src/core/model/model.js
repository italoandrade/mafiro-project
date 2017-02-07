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

            if (bind.indexOf('.') > -1) {
                createObjByPath(this, bind, '');
                createObjByPath(this.nodes, bind, textNode);
            } else {
                this[bind] = '';
                this.nodes[bind] = textNode;
            }

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

                goThru(data, this);

                break;
            default:
                console.error('You\'re trying to set an incompatible type of data');
                break;
        }
    };

    function goThru(data, thisModel, concat) {
        concat = concat || '';

        const params = Object.keys(data);

        mafiro.each(params, (i, param) => {
            if (typeof data[param] === 'object') {
                goThru(data[param], thisModel, concat + param + '.');
            } else {
                const node = accessObjByPath(thisModel.nodes, concat + param);

                console.log(node);

                node.data = data[param];

                createObjByPath(thisModel, concat + param, data[param]);
            }
        });
    }

    function accessObjByPath(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    }

    function createObjByPath(o, s, value) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                if (i !== n - 1) {
                    o = o[k];
                } else {
                    o[k] = value;
                }
            } else {
                if (i !== n - 1) {
                    o[k] = {};
                } else {
                    o[k] = value;
                }
                o = o[k];
            }
        }
        return o;
    }
})();
