(() => {
    const config = {
        class: 'login',
        title: 'Iniciar sessão',
        states: ['login'],
        onLoad: onLoad,
        templateUrl: '/app/views/login/login.html'
    };

    var autocomplete = autocomplete;

    mafiro.view.add('login', config);

    /**/

    function onLoad() {
        const $header = mafiro.element('.mi-header')[0];

        mafiro.class.add($header, 'transparent');

        const $loginBlog = mafiro.element('.login-block')[0];

        let ts;
        $loginBlog.addEventListener('touchstart', function (e){
            ts = e.touches[0].clientY;
        });
        $loginBlog.addEventListener('touchmove', function (e){
            const $header = mafiro.element('.mi-header')[0];

            let te = e.changedTouches[0].clientY;

            let translate = ts - te;

            translate = translate < -70 ? -70 : translate;
            translate = translate > 70 ? 70 : translate;

            if (ts > te + 5) {

                mafiro.style.set($header, 'transform', 'translateY(-' + translate + 'px)');
            } else if (ts < te - 5) {
                const isAlreadyOnTop = mafiro.style.get($header, 'transform') != 'matrix(1, 0, 0, 1, 0, 0)';

                if (isAlreadyOnTop) {
                    mafiro.style.set($header, 'transform', 'translateY(' + (-70 - translate) + 'px)');
                }
            }
        });

        autocomplete();

        console.log('- - View "login" loaded.');
    }

    function autocomplete() {
        const autofillInputs = [];
        let blurOnce;

        const $inputs = mafiro.element('input');

        mafiro.each($inputs, (i, $input) => {
            if ($input.getAttribute('autocomplete') !== 'on') {
                $input.setAttribute('autocomplete', 'off');
            } else {
                autofillInputs.push($input);
            }

            if ($input.value) {
                mafiro.class.add($input.parentNode, 'dirty');
            }
        });

        setTimeout(function () {
            mafiro.each(autofillInputs, function (i, $input) {
                try {
                    if (mafiro.element.is($input, ':-webkit-autofill')) {
                        blurOnce = !blurOnce ? $input.blur() : blurOnce;
                        mafiro.class.add($input.parentNode, 'dirty');
                        if ($input.getAttribute('type') !== 'password') {
                            // tfy.validate.input($input); // deveria ter validação aqui
                        }
                    }
                } catch (err) {
                }
            });
        }, 500);
    }
})();
