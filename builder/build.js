const js = require('modules_middleware/jsProcessor');
const path = require('path');
const { readFileSync: read, writeFileSync: write, readdirSync: list, mkdirSync } = require('fs');
const sass = require('sass');
const CleanCSS = require('clean-css');
const www = path.resolve(__dirname, '../html');
const __srcdir = path.resolve(__dirname, '../src');
function mkdir(path){
    try{
        mkdirSync(path)
    } catch(e){
        if(!e.stack.startsWith('Error: EEXIST:')) throw e
    }
}

console.log('--- Building JS ---');
list(__srcdir + '/js').forEach(file => {
    if(!/\.js$/.test(file)) return;
    process.stdout.write(`${file}... `);
    write(
        `${www}/js/${file}`,
        js.compile(
            js.minify(
                read(
                    `${__srcdir}/js/${file}`,
                    'utf8'
                )
            )
        ),
        'utf8'
    );
    console.log('OK');
});
console.log('--- Building CSS ---');
mkdir(www + '/css');
list(`${__srcdir}/css`).forEach(scss => {
    if(!/\.scss/.test(scss)) return;
    var target = scss.slice(0, -4) + 'css';
    process.stdout.write(`${target}... `);
    write(
        `${www}/css/${target}`,
        (
            new CleanCSS({
                compatibility: 'ie7'
            }).minify(
                sass.renderSync({
                    file: `${__srcdir}/css/${scss}`
                }).css.toString()
            )
        ).styles
    );
    console.log('OK');
})
