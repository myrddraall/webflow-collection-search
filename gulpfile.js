const gulp = require('gulp');
const concat = require('gulp-concat');
const wrap = require('gulp-wrap');
const path = require('path');

const PROJECT = 'webflow-collection-search';
gulp.task('build-prod-es5', () => {

    return gulp.src([
        `runtime-es5.*.js`,
        `polyfills-es5.*.js`,
        `styles-es5.*.js`,
        `polyfill-webcomp-es5.*.js`,
        `polyfill-webcomp.*.js`,
        `scripts.*.js`,
        `main-es5.*.js`

    ], {
        cwd: `./dist/${PROJECT}/`
    })
        .pipe(wrap('\n//<%= path.basename(file.path) %>\n<%= contents %>\n', { path }))
        .pipe(concat(`${PROJECT}-es5.bundle.js`))
        .pipe(gulp.dest(`./dist/${PROJECT}/`));

});

gulp.task('build-prod-es2015', () => {

    return gulp.src([
        `runtime-es2015.*.js`,
        `polyfills-es2015.*.js`,
        `styles-es2015.*.js`,
        // `polyfill-webcomp-es5.*.js`,
        // `polyfill-webcomp.*.js`,
        `scripts.*.js`,
        `main-es2015.*.js`,
    ], {
        cwd: `./dist/${PROJECT}/`
    })
        .pipe(wrap('\n//<%= path.basename(file.path) %>\n<%= contents %>\n', { path }))
        .pipe(concat(`${PROJECT}-es2015.bundle.js`, { newLine: ' ////' }))
        .pipe(gulp.dest(`./dist/${PROJECT}/`));

});

gulp.task('build-prod', gulp.parallel('build-prod-es5', 'build-prod-es2015'));

/*

 <script src="runtime-es2015.417a68601162b7d0d556.js" type="module"></script>
<script src="runtime-es5.417a68601162b7d0d556.js" nomodule defer></script>
<script src="polyfills-es5.ee78b1e5f492a9387003.js" nomodule defer></script>
<script src="polyfills-es2015.58725a5910daef768ca8.js" type="module"></script>
<script src="styles-es2015.a5d5b9b946e630638d9d.js" type="module"></script>
<script src="styles-es5.a5d5b9b946e630638d9d.js" nomodule defer></script>
<script src="polyfill-webcomp-es5.063f09af4fbb2b19071f.js" defer></script>
<script src="polyfill-webcomp.5465ed45a139d64f8e6d.js" defer></script>
<script src="scripts.9ddf727ecc94cd123172.js" defer></script>
<script src="main-es2015.0926b42026dbd9a49631.js" type="module"></script>
<script src="main-es5.0926b42026dbd9a49631.js" nomodule defer></script>


  */