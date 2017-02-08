(() => {
    mafiro.Model = Model;

    function Model(element) {
        this.elementReference = element;
        this.nodes = {};

        goThruBinds(this);
        goThruClicks(this);
    }

    Model.prototype.set = function (data) {
        const dataType = typeof data;

        switch (dataType) {
            case 'object':
                data = {
                    vm: data
                };

                goThruModel(data, this);
                goThruIfs(this);
                goThruStyles(this);
                goThruHrefs(this);

                break;
            default:
                console.error('You\'re trying to set an incompatible type of data');
                break;
        }
    };

    function accessObjByPath(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (o && k in o) {
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
            if (o && k in o) {
                if (i !== n - 1) {
                    o = o[k];
                } else {
                    if (value) {
                        o[k] = value;
                    } else {
                        delete o[k];
                    }
                }
            } else {
                if (i !== n - 1) {
                    o[k] = {};
                } else {
                    if (value) {
                        o[k] = value;
                    } else {
                        delete o[k];
                    }
                }
                o = o[k];
            }
        }
        return o;
    }

    function goThruBinds(thisModel) {
        const element = thisModel.elementReference;
        let elementHtml = element.innerHTML;

        elementHtml = elementHtml
            .replace(/{{{1}/g, '<span class="mi-bind">')
            .replace(/}}{1}/g, '</span>');

        element.innerHTML = elementHtml;

        const $binds = mafiro.element.find(element, '.mi-bind');

        mafiro.each($binds, (i, $bind) => {
            const bind = $bind.innerHTML;

            const textNode = document.createTextNode('');

            if (bind.indexOf('.') > -1) {
                createObjByPath(thisModel.nodes, bind, textNode);
            } else {
                thisModel[bind] = '';
                thisModel.nodes[bind] = textNode;
            }

            $bind.parentNode.replaceChild(textNode, $bind);
        });
    }

    function goThruModel(data, thisModel, concat) {
        concat = concat || '';

        const params = Object.keys(data);

        mafiro.each(params, (i, param) => {
            if (typeof data[param] === 'object') {
                goThruModel(data[param], thisModel, concat + param + '.');
            } else {
                const node = accessObjByPath(thisModel.nodes, concat + param);

                if (node) {
                    node.data = data[param];
                }

                createObjByPath(thisModel, concat + param, data[param]);
            }
        });
    }

    function goThruIfs(data) {
        const $element = data.elementReference;

        const $miIfs = mafiro.element.find($element, '[mi-if]');

        mafiro.each($miIfs, (i, $miIf) => {
            let path = $miIf.getAttribute('mi-if');

            if (path.substring(0, 1) === '!') {
                path = path.substring(1);

                const value = accessObjByPath(data, path);

                if (!value) {
                    mafiro.class.add($miIf, 'visible');
                } else {
                    mafiro.class.remove($miIf, 'visible');
                }
            } else {
                const value = accessObjByPath(data, path);

                if (value) {
                    mafiro.class.add($miIf, 'visible');
                } else {
                    mafiro.class.remove($miIf, 'visible');
                }
            }
        });
    }

    function goThruStyles(data) {
        const $element = data.elementReference;

        const Regex = new RegExp('(\\w{1,})(\\.(\\w{1,})){1,}', 'g');

        const $miStyles = mafiro.element.find($element, '[mi-style]');

        mafiro.each($miStyles, (i, $miStyle) => {
            let style = $miStyle.getAttribute('mi-style');

            let styleModified = style;

            const matches = style.match(Regex);

            mafiro.each(matches, (o, match) => {
                let value = accessObjByPath(data, match);
                value = (value) ? '"' + value + '"' : '""';

                styleModified = styleModified
                    .replace(/'[ ]?\+[ ]?/g, '\\')
                    .replace(/[ ]?\+[ ]?'/g, '/')
                    .replace(/'/g, '"')
                    .replace(match, value)
                    .replace(/"\//g, '')
                    .replace(/\\"/g, '');

            });

            style = JSON.parse(styleModified);

            let styleParams = Object.keys(style);

            mafiro.each(styleParams, (i, styleParam) => {
                mafiro.style.set($miStyle, styleParam, style[styleParam]);
            });
        });
    }

    function goThruHrefs(data) {
        const $element = data.elementReference;

        const Regex = new RegExp('(\\w{1,})(\\.(\\w{1,})){1,}', 'g');

        const $miHrefs = mafiro.element.find($element, '[mi-href]');

        mafiro.each($miHrefs, (i, $miHref) => {
            let href = $miHref.getAttribute('mi-href');

            let hrefModified = href;

            const matches = href.match(Regex);

            mafiro.each(matches, (o, match) => {
                let value = accessObjByPath(data, match) || '';

                hrefModified = hrefModified
                    .replace(/'[ ]?\+[ ]?/g, '')
                    .replace(/'/g, '')
                    .replace(match, value);

            });

            $miHref.setAttribute('href', hrefModified);
        });
    }

    function goThruClicks(data) {
        const $element = data.elementReference;

        const Regex = new RegExp('(\\w{1,})(\\.(\\w{1,})){1,}', 'g');

        const $miClicks = mafiro.element.find($element, '[mi-click]');

        mafiro.each($miClicks, (i, $miClick) => {
            let click = $miClick.getAttribute('mi-click');

            let clickModified = click;

            const matches = click.match(Regex);

            mafiro.each(matches, (o, match) => {
                $miClick.addEventListener('click', (e) => {
                    let value = accessObjByPath(data, match) || '';

                    if (value && isFunction(value)) {
                        value(e);
                    } else {
                        console.error(match + ' is not a function or doesn\'t exist');
                    }
                });
            });

            $miClick.setAttribute('click', clickModified);
        });
    }

    function isFunction(functionToCheck) {
        /*Source: http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type*/
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }
})();
