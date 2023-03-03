self.addEventListener('message', function (e) {
    var source = e.data.source;

    if (e.data.beautify) {
        self._window = self.window;
        self.window = {};

        self.importScripts('https://cdn.jsdelivr.net/gh/TechlySeries/TS_Deobfuscator/Beautify.js');

        source = self.window.js_beautify(source, {
            unescape_strings: true,
            jslint_happy: true
        });

        self.window = self._window;
    }

    self.importScripts('https://cdn.jsdelivr.net/gh/TechlySeries/TS_Deobfuscator/Highlight.js');

    source = self.hljs.highlight('javascript', source).value;
    source = source.split('\n');
    source = source.join('<br/>');
    source = source;

    self.postMessage(source);
});
