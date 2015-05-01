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
        // все файлы любых сущностей
    })
    .on('block', function(files) {
        // все файлы блоков
    })
    .on({ block: 'select' }, function(files) {
        // все файлы блока select
    })
    .on({ tech: 'examples' }, function(files) {
        // все файлы с технологией examples
        Valkyrie([files.path], { scheme: 'flat' })
            .on({ tech: 'blocks' }, function(files) {
                Valkyrie([files.path])
                    .on('*', function(files) {
                        console.log(files); // все файлы кастомных блоков для примеров
                    })
            });
    })
    .on('end', function(files) {
        console.log('end');
    });
```
