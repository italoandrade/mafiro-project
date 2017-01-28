(() => {
    mafiro.style =  {
        get: getStyle,
        set: setStyle,
        propWithPx: ['width', 'height', 'left', 'top', 'border-radius', 'border-spacing']
    };

    function getStyle(el, styleProp) {
        /*
        Retirado dessa resposta no StackOverFlow
        http://stackoverflow.com/a/16112771
        */

        if (styleProp) {
            var value, defaultView = (el.ownerDocument || document).defaultView, finalValue;
            // W3C standard way:
            if (defaultView && defaultView.getComputedStyle) {
                // sanitize property name to css notation
                // (hyphen separated words eg. font-Size)
                styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
                finalValue = defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
            } else if (el.currentStyle) { // IE
                // sanitize property name to camelCase
                styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
                    return letter.toUpperCase();
                });
                value = el.currentStyle[styleProp];
                // convert other units to pixels on IE
                if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                    finalValue = (function (value) {
                        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
                        el.runtimeStyle.left = el.currentStyle.left;
                        el.style.left = value || 0;
                        value = el.style.pixelLeft + "px";
                        el.style.left = oldLeft;
                        el.runtimeStyle.left = oldRsLeft;
                        return value;
                    })(value);
                } else {
                    finalValue = value;
                }
            }

            finalValue = finalValue.replace('px', '');
            finalValue = isNaN(finalValue) ? finalValue : parseInt(finalValue);

            return finalValue;
        }
    }

    function setStyle(el, styleProp, value) {
        const propWithPx = mafiro.style.propWithPx;

        const hasPx = propWithPx.indexOf(styleProp) > -1;

        el.style[styleProp] = value + (hasPx ? 'px' : '');
    }
})();
