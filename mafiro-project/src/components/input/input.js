(() => {
    mafiro.components.add({
        name: 'input',
        load: loadInput,
        onWindowLoad: onWindowLoad
    });

    var inputAutofillInterval;
    var loadFormInput = loadFormInput;

    function loadInput() {
        return {
            on: (element) => {
                const $this = element;

                const $input = mafiro.element.find($this, 'input, textarea')[0];
                const $textarea = mafiro.element.find($this, 'textarea')[0];
                const $label = mafiro.element.find($this, 'label')[0];

                if ($textarea) {
                    mafiro.class.add($textarea.parentNode, 'textarea');

                    mafiro.element.on($textarea, 'keyup keydown focus', function(e) {
                        mafiro.style.set($textarea, 'height', 22);

                        const newValue = $textarea.scrollHeight
                            + parseFloat(mafiro.style.get($textarea, 'borderTopWidth')) + parseFloat(mafiro.style.get($textarea, 'borderBottomWidth'));

                        mafiro.style.set($textarea, 'height', newValue);
                    });

                    $textarea.addEventListener('blur', function(e) {
                        const value = mafiro.element.value($textarea).trim();

                        if (!value) {


                            $textarea.removeAttribute("style");
                            $textarea.value = '';
                        }
                    });
                }

                $input.addEventListener('focus', () => {
                    mafiro.class.add($input.parentNode, 'focused');
                    mafiro.class.add($input.parentNode, 'dirty');
                });

                $input.addEventListener('blur', () => {
                    var $thisParent = $input.parentNode;

                    if ($input.value) {
                        console.log('Aqui deveria ser o validador.');
                        // tfy.validate.input($input);
                    } else {
                        mafiro.class.remove($thisParent, 'dirty');
                    }

                    mafiro.class.remove($thisParent, 'focused');
                });

                $input.addEventListener('keyup', (e) => {
                    if (e.keyCode != 9 && e.keyCode != 16) {
                        console.log('Aqui deveria ser o validador.');
                        // tfy.validate.input($(this));
                    }
                });

                $label.addEventListener('click', () => {
                    $label.previousElementSibling.focus();
                    // $(this).prev('input, textarea').focus();
                });
            }
        };
    }

    function onWindowLoad() {
        const $inputs = mafiro.element('.mi-input');

        mafiro.each($inputs, (i, $input) => {
            mafiro.components.load('input').on($input);
        });
    }
})();




(function () {
    var inputAutofillInterval;
    var loadFormInput = loadFormInput;

    /**/

    function formInput() {
        var $inputElement = $('.input-container:not(.input-loaded)');

        if ($inputElement.length) {
            loadFormInput($inputElement);
        }
    }

    function loadFormInput($inputElement) {
        $inputElement.addClass('input-loaded');

        $inputElement.each(function () {
            var $this = $(this);

            var $input = $this.find('input, textarea');
            var $textarea = $this.find('textarea');
            $textarea.parent().addClass('textarea');
            var $label = $this.find('label');

            $textarea.on({
                'keyup keydown focus': function(e) {
                    $(this).height(22);
                    $(this).height(this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth")));
                },
                'blur': function () {
                    var $this = $(this);

                    if (!$this.val().trim()) {
                        $this.removeAttr('style');
                        $this.val('');
                    }

                    /*var $this = $(this);

                     $this.val($this.val().trim());

                     $(this).height(22);
                     $(this).height(-20 + this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth")));

                     if ($this.val() == '') {
                     $this.css('height', '');
                     }*/
                }
            });

            var autofillInputs = [];
            var blurOnce;

            $input.each(function () {
                var $this = $(this);

                if ($this.attr('autocomplete') != 'on') {
                    $this.attr('autocomplete', 'off');
                } else {
                    autofillInputs.push($this);
                }

                if ($this.val()) {
                    $this.parent().addClass('dirty');
                }
            });

            if (autofillInputs.length) {
                setTimeout(function () {
                    inputAutofillInterval = setInterval(function () {
                        tfy.each(autofillInputs, function (i, $input) {
                            try {
                                if ($input.is(':-webkit-autofill')) {
                                    blurOnce = !blurOnce ? $input.blur() : blurOnce;
                                    $input.parent().addClass('dirty');
                                    if ($input.attr('type') != 'password') {
                                        tfy.validate.input($input);
                                    }
                                }
                            } catch (err) {
                            }
                        });
                    }, 250);
                }, 500);
            } else {
                clearInterval(inputAutofillInterval);
            }

            $input.on({
                'focus': function () {
                    var $this = $(this);

                    $this.parent().addClass('focused dirty');
                },
                'blur': function () {
                    var $this = $(this);
                    var $thisParent = $this.parent();

                    if ($this.val()) {
                        tfy.validate.input($this);
                    } else {
                        $thisParent.removeClass('dirty');
                    }

                    $thisParent.removeClass('focused');
                },
                'keyup': function (e) {
                    if (e.keyCode != 9 && e.keyCode != 16) {
                        tfy.validate.input($(this));
                    }
                }
            });

            $label.on('click', function () {
                $(this).prev('input, textarea').focus();
            });
        });
    }
})();
