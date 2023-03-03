self.addEventListener('message', function (e) {
    var source = e.data.source;

    if (e.data.beautify) {
        self._window = self.window;
        self.window = {};

        self.importScripts('https://raw.githack.com/softwebtuts/softwebtuts.com/master/beautify.min.js');

        source = self.window.js_beautify(source, {
            unescape_strings: true,
            jslint_happy: true
        });

        self.window = self._window;
    }

    self.importScripts('https://raw.githack.com/softwebtuts/softwebtuts.com/master/highlight.pack.js');

    source = self.hljs.highlight('javascript', source).value;
    source = source.split('\n');
    source = source.join('<br/>');
    source = source;

    self.postMessage(source);
});
