# bem-valkyrie

A [bem-walk](https://github.com/bem/bem-walk) wrapper.

```js
var levels = [
    '../../libs/bem-components/common.blocks',
    '../../libs/bem-components/desktop.blocks',
    '../../libs/bem-components/design/common.blocks',
    '../../libs/bem-components/design/desktop.blocks'
];

var Valkyrie = require('./valkyrie'),
    valka = Valkyrie(levels);

valka
    .on('*', function(files) {
        // all the files of all the entities
    })
    .on('block', function(files) {
        // all blocks files
    })
    .on({ block: 'select' }, function(files) {
        // all files of `select` block
    })
    .on({ tech: 'examples' }, function(files) {
        // all files with `examples` tech
        Valkyrie([files.path], { scheme: 'flat' })
            .on({ tech: 'blocks' }, function(files) {
                Valkyrie([files.path])
                    .on('*', function(files) {
                        console.log(files); // all files of custom blocks of an example
                    })
            });
    })
    .on('end', function(files) {
        console.log('end');
    });
```
