(() => {
    function Mi(element) {
        this.element = element;
        this.valor = 0;
    }

    Mi.prototype.set = function (name, value) {

        this[name] = {
            reference: document.createTextNode("This is a paragraph.")
        };

        const $element = this.element;

        const oldHtml = $element.innerHTML;

        const newHtml = oldHtml.replace('{{' + name + '}}', value);

        $element.innerHTML = newHtml;

        this[name] = value;

    };


    window.load = function () {
        const $body = mafiro.element(this.element);

        const view = new Mi($body);

        mafiro.request({
            type: 'GET',
            url: '/teste',
            success: function (data) {
                view.set(data);
            }
        });
    };
})();
