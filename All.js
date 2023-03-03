self.addEventListener("message", function (e) {
    var source = e.data.source,
        packer = e.data.packer;
    if ("evalencode" === packer) {
        (self._eval = self.eval),
            (self.eval = function (a) {
                source = a;
            });
        try {
            self._eval(source);
        } catch (err) {
            console.log(err);
        }
        self.eval = self._eval;
    } else if ("_numberencode" === packer)
        try {
            var patt = /_\d{4}\((_\d{4})\);\}/,
                _numbersource = source;
            patt.test(_numbersource) &&
                ((_numbersource = (_numbersource = (_numbersource = _numbersource.replace(/var\s/g, "this.")).replace(/function\s(_\d{4})\(/, "this.$1=function(")).replace(patt, "self.sourceNumberEncodeZz=$1;};")),
                (_numbersource = "(function(){" + _numbersource + "})();"),
                eval(_numbersource),
                (source = self.sourceNumberEncodeZz));
        } catch (err) {
            console.log(err);
        }
    else if ("arrayencode" === packer)
        try {
            var pattarr = /[\s\n]*var\s+([\w\d_$]+)\s*=\s*\[.*?\];/,
                _var = source.match(pattarr);
            if (_var && 2 === _var.length) {
                var _name = _var[1],
                    _code = source.replace(pattarr, ""),
                    quote = function (a, b) {
                        return a.replace(new RegExp("[*+?^${}()|[\\]\\\\" + b + "]", "g"), "\\$&");
                    },
                    pattkey = new RegExp(_name.replace(/\$/g, "\\$") + "\\[(\\d+)\\]", "g");
                (_var = _var[0].replace(/[\s\S]*?\[/, "[")),
                    (_var = eval(_var)),
                    _code.replace(pattkey, function (c, b) {
                        var d = _var[b],
                            a = -1 !== d.indexOf('"') ? "'" : '"';
                        return (_code = _code.replace(c, a + quote(_var[b], a) + a));
                    }),
                    (source = _code = _code.replace(/(\[("|')([\w\d_$]+)("|')\])/gi, ".$3 "));
            }
        } catch (err) {
            console.log(err);
        }
    else if ("jsfuck" === packer)
        try {
            (self._window = self.window),
                (self.window = {}),
                self.importScripts("https://cdn.jsdelivr.net/gh/TechlySeries/TS_Deobfuscator/Jsfuck.js"),
                (self.JSFuck = self.window.JSFuck),
                (self.window = self._window),
                self.importScripts("https://cdn.jsdelivr.net/gh/TechlySeries/TS_Deobfuscator/Jsfuck_Decode.js"),
                (source = JSFuckDecode.decode(source));
        } catch (err) {
            console.log(err);
        }
    else if ("aaencode" === packer)
        try {
            self.importScripts("https://cdn.jsdelivr.net/gh/TechlySeries/TS_Deobfuscator/AAdecode.js"), (source = AADecode.decode(source));
        } catch (err) {
            console.log(err);
        }
    else if ("jjencode" === packer)
        try {
            self.importScripts("https://cdn.jsdelivr.net/gh/TechlySeries/TS_Deobfuscator/JJdecode.js"), (source = JJdecode.decode(source));
        } catch (err) {
            console.log(err);
        }
    else if ("urlencode" === packer)
        try {
            self.importScripts("https://cdn.jsdelivr.net/gh/TechlySeries/TS_Deobfuscator/URLencode.js"), Urlencoded.detect(source) && (source = Urlencoded.unpack(source));
        } catch (err) {
            console.log(err);
        }
    else if ("p_a_c_k_e_r" === packer)
        try {
            self.importScripts("https://cdn.jsdelivr.net/gh/TechlySeries/TS_Deobfuscator/P_a_c_k_e_r.js"), P_A_C_K_E_R.detect(source) && (source = P_A_C_K_E_R.unpack(source));
        } catch (err) {
            console.log(err);
        }
    else if ("javascriptobfuscator" === packer)
        try {
            self.importScripts("https://cdn.jsdelivr.net/gh/TechlySeries/TS_Deobfuscator/Js_Obfuscator.js"), JavascriptObfuscator.detect(source) && (source = JavascriptObfuscator.unpack(source));
        } catch (err) {
            console.log(err);
        }
    else if ("myobfuscate" === packer)
        try {
            self.importScripts("https://cdn.jsdelivr.net/gh/TechlySeries/TS_Deobfuscator/My_Obfuscate.js"), MyObfuscate.detect(source) && (source = MyObfuscate.unpack(source));
        } catch (err) {
            console.log(err);
        }
    self.postMessage(source);
});
