(() => {
    var b64EncodeUnicode = b64EncodeUnicode;
    var b64DecodeUnicode = b64DecodeUnicode;
    var createCookie = createCookie;
    var readCookie = readCookie;

    mafiro.session = {
        set: (name, value) => {
            if (name == 'set' || name == 'get' || name == 'delete') {
                name = name + '*';
            }

            mafiro.session[name] = value;

            const days = 360;

            let session = readCookie('YFT');

            if (session) {
                session = b64DecodeUnicode(session);
                session = JSON.parse(session);
            } else {
                session = {};
            }

            session[name] = value;
            session = JSON.stringify(session);
            session = b64EncodeUnicode(session);
            createCookie('YFT', session, days);

            return true;
        },
        get: (name) => {
            if (name == 'set' || name == 'get' || name == 'delete') {
                name = name + '*';
            }

            if (mafiro.session[name]) {
                return mafiro.session[name];
            } else {
                let session = readCookie('YFT');

                if (session) {
                    session = b64DecodeUnicode(session);
                    session = JSON.parse(session);
                    session = session[name];
                }

                return session;
            }
        },
        delete: function (name) {
            if (name == 'set' || name == 'get' || name == 'remove') {
                name = name + '*';
            }

            const days = 360;

            let session = readCookie('YFT');

            if (session) {
                session = b64DecodeUnicode(session);
                session = JSON.parse(session);
            } else {
                session = {};
            }

            if (session[name])
                delete session[name];
            session = JSON.stringify(session);
            session = b64EncodeUnicode(session);
            createCookie('YFT', session, days);

            if (mafiro.session[name])
                delete mafiro.session[name];
        }
    };

    function createCookie(name, value, days) {
        let expires;
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0, len = ca.length; i < len; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }

    function b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
})();
