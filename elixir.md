# Laravel Elixir

- [Introduction](#introduction)
- [စတင်ြခင်း](#introduction)
- [Installation & Setup](#installation)
- [Installation နွင့္ Setup လုပ္ျခင္း](#installation)
- [Running Elixir](#running-elixir)
- [Elixir အား အသံုးျပုျခင္း](#running-elixir)
- [Working With Stylesheets](#working-with-stylesheets)
- [Stylesheets များနှင့် အလုပ်လုပ်ြခင်း](#working-with-stylesheets)
    - [Less](#less)
    - [Sass](#sass)
    - [Plain CSS](#plain-css)
    - [Source Maps](#css-source-maps)
- [Working With Scripts](#working-with-scripts)
    - [CoffeeScript](#coffeescript)
    - [Browserify](#browserify)
    - [Babel](#babel)
    - [Scripts](#javascript)
- [Versioning / Cache Busting](#versioning-and-cache-busting)
- [Version သတ္မွတ္ျခင္း နွင့္ Cache အျမန္လုပ္ျခင္း](#versioning-and-chache-busting)
- [Calling Existing Gulp Tasks](#calling-existing-gulp-tasks)
- [ရွိျပီးသား Gulp လုပ္ေဆာင္ခ ်က္မ ်ားကို ရယူအသံုးျပုျခင္း](#calling-existig-gulp-tasks)
- [Writing Elixir Extensions](#writing-elixir-extensions)
- [Elixir Extension ေရးသားျခင္း](#writing-elixir-extensions)

<a name="introduction"></a>
## Introduction
## စတင္ျခင္း

Laravel Elixir provides a clean, fluent API for defining basic [Gulp](http://gulpjs.com) tasks for your Laravel application. Elixir supports several common CSS and JavaScript pre-processors, and even testing tools. Using method chaining, Elixir allows you to fluently define your asset pipeline. For example:
Laravel Elixir ဟာသင့္ရဲ့ Laravel Application အတြက္ အေျခခံ [Gulp](http://gulpjs.com) လုပ္ေဆာင္ခ ်က္ေတြသတ္မွတ္ျခင္းအတြက္ ရွင္းလင္းျပီး အသံုးဝင္တဲ့ API ကို အေထာက္အပံ့ ေပးထားပါတယ္။ Elixir ဟာ CSS နဲ့ Javascript pre-processor ေတာ္ေတာ္မ ်ားမ ်ားကို အေထာက္အပံ့ ေပးထားသည့္ အျပင္ testing tool ေတြအထိ အေထာက္အပံ့ေပးထားပါတယ္။ method chaining ကိုအသံုးျပုျပီး asset pipeline ေတြကို လြယ္ကူထိေရာက္စြာ သတ္မွတ္နိုင္ပါတယ္။ ဥပမာ...

```javascript
elixir(function(mix) {
    mix.sass('app.scss')
       .coffee('app.coffee');
});
```

If you've ever been confused about how to get started with Gulp and asset compilation, you will love Laravel Elixir. However, you are not required to use it while developing your application. You are free to use any asset pipeline tool you wish, or even none at all.
Gulp နဲ့ asset compilation ေတြကို စတင္အသံုးျပုဖို့အတြက္ ဘာလုပ္ရမွန္းမသိျဖစ္ဖူးတယ္ဆိုရင္ သင္ဟာ Laravel Elixir ကိုနွစ္သက္မွာပါ။ ဒါေပမယ့္လုိ့ သင့္ရဲ့ application ကို develop လုပ္ေနစဥ္အတြင္းမွာ အသံုးျပုရန္ မလိုအပ္ပါဘူး။ သင္နွစ္သက္ရာ asset pipeline tool ေတြကို လြတ္လြတ္လပ္လပ္ အသံုးျပုနိုင္သလို ဘာမွမသံုးဘူးဆိုလည္းျဖစ္ပါတယ္။

<a name="installation"></a>
## Installation & Setup

### Installing Node

Before triggering Elixir, you must first ensure that Node.js is installed on your machine.
Elixir ကိုစတင္ အသံုးမျပုခင္ သင့္စက္မွာ Node.js installed လုပ္ထားရမွာပါ။

    node -v

By default, Laravel Homestead includes everything you need; however, if you aren't using Vagrant, then you can easily install Node by visiting [their download page](http://nodejs.org/download/).
Laravel Homestead နဲ့ဆိုရင္ေတာ့ သင့္လိုအပ္နိုင္တာေတြအကုန္လုံးပါ၀င္ပါတယ္။ ဒါေပမယ့္လို့ သင္ဟာ Vagrant သံုးေနတာမဟုတ္ဘူးဆိုရင္ေတာ့ ေပးထားတဲ့ [Node download page](http://nodejs.org/download/) ကို သြားေရာက္ျပီး Node ကို အလြယ္တကူ install လုပ္နုိင္ပါတယ္။

### Gulp

Next, you'll want to pull in [Gulp](http://gulpjs.com) as a global NPM package:
ေနာက္တစ္ဆင့္အေနနဲ့ ကိုယ့္စက္ရဲ့ မည္သည့္ေနရာကမဆို run နိုင္တဲ့ global NPM package  တစ္ခုျဖစ္တဲ့ Gulp သြင္းထားဖို့လိုပါမယ္။

    npm install --global gulp

### Laravel Elixir

The only remaining step is to install Elixir! Within a fresh installation of Laravel, you'll find a `package.json` file in the root. Think of this like your `composer.json` file, except it defines Node dependencies instead of PHP. You may install the dependencies it references by running:
ေနာက္ဆံုးက်န္တဲ့ အဆင့္ကေတာ့ အသစ္ download ရယူထားတဲ့ laravel မွာ Elixir ကို install လုပ္ေပးဖို့ျဖစ္ပါတယ္။ laravel ရဲ့ project root folder အတြင္းမွာ  package.json file ကို သင္ရွာေတြ့မွာပါ။ အဲ့ဒီ file ကို composer.json file လိုမ်ိုးလို့ မွတ္သားထားနိုင္ပါတယ္။ composer.json PHP package ေတြအတြက္ အသံုးျပုျပီး package.json က Node dependencies ေတြအတြက္ သံုးတယ္ဆိုတာေတာ့ကြာတာေပါ့။ package.json မွာသတ္မွတ္ထားတဲ့ dependencies ေတြကို ေအာက္ပါ command အသံုးျပုျပီး install လုပ္နိုင္ပါတယ္။

    npm install

If you are developing on a Windows system, you may need to run the `npm install` command with the `--no-bin-links` switch enabled:
သင္ဟာ Windows system ကို အသံုးျပုေနတာဆိုရင္ေတာ့ `npm install`command ကို `--no-bin-links` ဆိုျပီး ေျပာင္းသံုးနိုင္ပါတယ္။

    npm install --no-bin-links

<a name="running-elixir"></a>
## Running Elixir

Elixir is built on top of [Gulp](http://gulpjs.com), so to run your Elixir tasks you only need to run the `gulp` command in your terminal. Adding the `--production` flag to the command will instruct Elixir to minify your CSS and JavaScript files:
Elixir ဟာ [Gulp](http://gulpjs.com) ကို အသံုးျပုျပီး တည္ေဆာက္ထားတာျဖစ္ပါတယ္။ အဲ့ဒါေျကာင့္ Elixir လုပ္ေဆာင္ခ်က္ေတြကို စတင္မယ္ဆိုရင္ terminal ကေန `gulp` command run ရံုနဲ့စတင္နိုင္ပါတယ္။ CSS file ေတြနဲ့ JavaScript file ေတြကို အေသးဆံုးျဖစ္ေအာင္ျပုလုပ္ဖုိ့အတြက္`--production` flag ကို  ထည့္သြင္းျပီး အသံုးျပုနိုင္ပါတယ္။

    // Run all tasks...
    gulp

    // Run all tasks and minify all CSS and JavaScript...
    // Javascript နွင့္ CSS file ေတြကို အေသးဆံုး ခ်ံုရင္း လုပ္ေဆာင္ခ်က္မ်ားကို စတင္ျခင္း
    gulp --production

#### Watching Assets For Changes

Since it is inconvenient to run the `gulp` command on your terminal after every change to your assets, you may use the `gulp watch` command. This command will continue running in your terminal and watch your assets for any changes. When changes occur, new files will automatically be compiled:
သင္အသံုးျပုထားတဲ့ file ေတြ တစ္ခါ အေျပာင္းအလဲလုပ္တုိုင္း terminal ကေန `gulp` command တစ္ခါရိုက္တာက အဆင္ေျပေခ်ာေမြ့မွု့ မရွိတဲ့ အတြက္ `gulp watch` command ကို အသံုးျပုနိုင္ပါတယ္။ ဒီ command ဟာ သင္အသံုးျပုထားတဲ့ file အေျပာင္းအလဲေတြကို terminal ကေန ေစာင့္ျကည့္ေနမွာပါ။အေျပာင္းအလဲ ရွိျပီဆိုတာနဲ့ file အသစ္အျဖစ္ အလိုအေလ်ာက္ compile လုပ္ေပးသြားမွာပါ။

    gulp watch

<a name="working-with-stylesheets"></a>
## Working With Stylesheets

The `gulpfile.js` file in your project's root directory contains all of your Elixir tasks. Elixir tasks can be chained together to define exactly how your assets should be compiled.
သင့္ရဲ့ project root folder မွာရွိေနတဲ့ `gulpfile.js` မွာ Elixir လုပ္ေဆာင္ခ်က္ေတြ အကုန္ ပါ၀င္ပါတယ္။ သင္အသံုးျပုတဲ့ file ေတြကို ဘယ္လုိ compile လုပ္သင့္တယ္ဆိုတာကို သတ္မွတ္ရန္အတြက္ Elixir လုပ္ေဆာင္ခ်က္ေတြကို အတူအကြ ေပါင္းစပ္ထားနိုင္ပါေသးတယ္။

<a name="less"></a>
### Less

To compile [Less](http://lesscss.org/) into CSS, you may use the `less` method. The `less` method assumes that your Less files are stored in `resources/assets/less`. By default, the task will place the compiled CSS for this example in `public/css/app.css`:
 [Less](http://lesscss.org/) ကေန CSS အျဖစ္ compile လုပ္ရန္အတြက္ `less` method ကို သံုးနိုင္ပါတယ္။ `less` method က သင့္ရဲ့ less file ေတြကုိ `resource/assets/less` အထဲမွာ သိမ္းထားတယ္လို့ ယူဆထားပါတယ္။ အခု ဥပမာ အတြက္ compile လုပ္ထားတဲ့ CSS file ကုိ `public/css/app.css` ထဲမွာ သိမ္းထားမွာပါ။

```javascript
elixir(function(mix) {
    mix.less('app.less');
});
```

You may also combine multiple Less files into a single CSS file. Again, the resulting CSS will be placed in `public/css/app.css`:
Less file အမ်ားျကီးကို CSS file တစ္ခုတည္း အေနျဖင့္လည္း ေပါင္းစပ္နိုင္ပါတယ္။ ထပ္ေျပာရရင္ ေပါင္းထားတဲ့ CSS file ကို `public/css/app.css` အျဖစ္ ထားေပးမွာပါ။

```javascript
elixir(function(mix) {
    mix.less([
        'app.less',
        'controllers.less'
    ], 'public/assets/css');
});
```

If you wish to customize the output location of the compiled CSS, you may pass a second argument to the `less` method:
compile လုပ္ထားတဲ့ CSS file တည္ေနရာကို ကိုယ္အဆင္ေျပတဲ့ေနရာမွာထားခ်င္တယ္ဆိုရင္ေတာ့ `less` method ကို ဒုတိယ argument အျဖစ္ ထည့္နိင္ပါတယ္။

```javascript
elixir(function(mix) {
    mix.less('app.less', 'public/stylesheets');
});

// Specifying a specific output filename...
elixir(function(mix) {
    mix.less('app.less', 'public/stylesheets/style.css');
});
```

<a name="sass"></a>
### Sass

The `sass` method allows you to compile [Sass](http://sass-lang.com/) into CSS. Assuming your Sass files are stored at `resources/assets/sass`, you may use the method like so:
`sass` method က [Sass](http://sass-lang.com/) file ေတြကုိ CSS file ေတြအျဖစ္ compile လုပ္ေပးမွာပါ။ Sass file ေတြကိုေတာ့ `resources/assets/sass` folder ထဲမွာ သိမ္းထားမယ္လို့ ယူဆမွာပါ။
အဲ့ဒီ method ကို ဒီလုိမ်ိုး အသံုးျပုနိုင္ပါတယ္။

```javascript
elixir(function(mix) {
    mix.sass('app.scss');
});
```

Again, like the `less` method, you may compile multiple scripts into a single CSS file, and even customize the output directory of the resulting CSS:
`less` method လိုပဲ sass file အမ်ားျကီးကို CSS file တစ္ခုတည္းအျဖစ္ compile လုပ္နိင္ပါေသးတယ္။ ဘယ္ေနရာမွာ compiled လုပ္ထာတဲ့ CSS file ကို သိမ္းမယ္ဆိုတာလည္း သတ္မွတ္နိုင္ပါတယ္။

```javascript
elixir(function(mix) {
    mix.sass([
        'app.scss',
        'controllers.scss'
    ], 'public/assets/css');
});
```

#### Ruby Sass

Under the hood, Elixir uses the LibSass library for compilation. In some instances, it may be advantageous to leverage the Ruby version which, though slower, is more feature rich. Assuming that you have both Ruby and the Sass gem installed (`gem install sass`), you may use the Ruby compiler like so:
Sass fie ေတြကို compile လုပ္ဖုိ့ Elixir က အေနာက္ဘက္ကေန LibSass library ကို အသံုးျပုပါတယ္။အခ်ို့ေနရာေတြမွာ ပိုအသံုး၀င္ဖုိ့အတြက္ Rub version ကို အသံုးျပုနိုင္ပါတယ္။ Ruby version က ပိုေနွးေပမယ့္လို့ feature ပိုစံုပါတယ္။ သင့္စက္မွာ Ruby နဲ့ Sass gem installed (`gem install sass`) လုပ္ထားျပီးသားလို့ ယူဆျပီး Ruby compiler ကို ဒီလုိမ်ိုးအသံုးျပုနိုင္ပါတယ္။

```javascript
elixir(function(mix) {
    mix.rubySass('app.scss');
});
```

<a name="plain-css"></a>
### Plain CSS

If you would just like to combine some plain CSS stylesheets into a single file, you may use the `styles` method. Paths passed to this method are relative to the `resources/assets/css` directory and the resulting CSS will be placed in `public/css/all.css`:
Less ျဖစ္ျဖစ္ Sass ျဖစ္ျဖစ္ အသံုးမျပုထားတဲ့ plain CSS stylesheets ေတြကို 
CSS file တစ္ခုတည္းအျဖစ္ ေပါင္းခ်င္တယ္ဆိုရင္ `style` method ကို အသံုးျပုနိုင္ပါတယ္။ less နဲ့ sass method မွာတုန္းက လိုပဲ style method ကို သံုးမယ္ဆိုရင္ ေပါင္းခ်င္တဲ့ CSS file ေတြကို `resources/assets/css` ထဲမွာ ထည့္ထားမယ္လုို့ယူဆျပီး ေပါင္းလိုက္တဲ့ file ကို `public/css/all.css` အျဖစ္ ထားေပးမွာ ျဖစ္ပါတယ္။
```javascript
elixir(function(mix) {
    mix.styles([
        'normalize.css',
        'main.css'
    ]);
});
```

Of course, you may also output the resulting file to a custom location by passing a second argument to the `styles` method:
`style` method ကို ဒုတိယ argument ထည့္ျပီး ေပါင္းလိုက္တဲ့ file ဟာ ဘယ္ေနရာမွာ ထားရမွာလဲဆိုတာကို သတ္မွတ္နိုင္ပါတယ္။

```javascript
elixir(function(mix) {
    mix.styles([
        'normalize.css',
        'main.css'
    ], 'public/assets/css');
});
```

<a name="css-source-maps"></a>
### Source Maps

Source maps are enabled out of the box. So, for each file that is compiled you will find a companion `*.css.map` file in the same directory. This mapping allows you to trace your compiled stylesheet selectors back to your original Sass or Less while debugging in your browser.
Soure maps feature ကိုလည္းထည့္ေပးထားပါတယ္။ အဲ့ဒီအတြက္ compile လုပ္လိုက္တဲ့ file တစ္ file ခ်င္းစီမွာ `*.css.map` file တစ္ခု ရွိေနမွာပါ။ အဲ့ဒီ file က သင္ browser ကေန debug လုပ္ အမွားအယြင္း ျပန္ရွာေဖြတဲ့ အခါ compile မလုပ္ခင္ less, sass file ေတြလုိမ်ိုး ျပန္ရွာေဖြနိုင္မွာပါ။

If you do not want source maps generated for your CSS, you may disable them using a simple configuration option:
source map file ထုတ္ေပးတာ မလိုခ်င္ဘူးဆိုရင္ေတာ့ အဲ့ဒီ feature ကို configuration တစ္ခုျပင္ျပီး ပိတ္ထားနိုင္ပါတယ္။

```javascript
elixir.config.sourcemaps = false;

elixir(function(mix) {
    mix.sass('app.scss');
});
```

<a name="working-with-scripts"></a>
## Working With Scripts

Elixir also provides several functions to help you work with your JavaScript files, such as compiling ECMAScript 6, compiling CoffeeScript, Browserify, minification, and simply concatenating plain JavaScript files.
Elixir ဟာ သင့္ရဲ့ javascript file ေတြနဲ့ အလုပ္လုပ္ဖုိ့အတြက္ ECMAScript 6 အား compile လုပ္ျခင္း၊ CoffeeScript အား compile လုပ္ျခင္း၊ Browserify အား အသံုးျပုျခင္း၊ file size ခ်ံုျခင္း၊ Javascript file ေတြကို concatenating လုပ္ျခင္း ကဲ့သို့ေသာ လုပ္ေဆာင္ခ်က္ အမ်ားအျပား ကိုလည္း အေထာက္အပံ့ေပးထားပါေသးတယ္။

<a name="coffeescript"></a>
### CoffeeScript

The `coffee` method may be used to compile [CoffeeScript](http://coffeescript.org/) into plain JavaScript. The `coffee` function accepts an array of CoffeeScript files relative to the `resources/assets/coffee` directory and generates a single `app.js` file in the `public/js` directory:
`coffee` method ကို [CoffeeScript](http://coffeescript.org/) file ေတြ ကေန javascript file ေတြ အျဖစ္ compile လုပ္ဖို့အတြက္ သံုးနိုင္ပါတယ္။ `coffee` function က `resources/assets/coffee` folder ထဲက coffee file ေတြကို `public/js` folder ထဲမွာ `app.js` file အျဖစ္ သိမ္းေပးမွာပါ။

```javascript
elixir(function(mix) {
    mix.coffee(['app.coffee', 'controllers.coffee']);
});
```

<a name="browserify"></a>
### Browserify

Elixir also ships with a `browserify` method, which gives you all the benefits of  requiring modules in the browser and using EcmaScript 6.
Elixir မွာ EcmaScript 6 အသံုးျပုမယ္ဆိုရင္ browser မွာ လုိအပ္တဲ့ modules ေတြရဲ့ အက်ိုးေက်းဇူးေတြ အကုန္လုံးကို ေပးနိုင္တဲ့  `browserify` method လည္းပါ၀င္ပါတယ္။

This task assumes that your scripts are stored in `resources/assets/js` and will place the resulting file in `public/js/bundle.js`:
အခု လုပ္ေဆာင္ခ်က္ဟာ သင့္ရဲ့ javascript file ကို `resources/assets/js` ထဲမွာ သိမ္းထားမယ္လို့ ယူဆျပီး result file ကို `public/js/bundle.js` မွာ ထားေပးမွာပါ။

```javascript
elixir(function(mix) {
    mix.browserify('index.js');
});
```

<a name="babel"></a>
### Babel

The `babel` method may be used to compile [EcmaScript 6 and 7](https://babeljs.io/docs/learn-es2015/) into plain JavaScript. This function accepts an array of files relative to the `resources/assets/js` directory, and generates a single `all.js` file in the `public/js` directory:
`babel` method ကို [EcmaScript 6 and 7](https://babeljs.io/docs/learn-es2015/) ကေန သာမန္ JavaScript အျဖစ္ေျပာင္းလဲဖုိ့ အတြက္ အသံုးျပုနိုင္ပါတယ္။ `resources/assets/js` folder ထဲမွ file မ်ားကို `public/js` folder ထဲမွာ `all.js` အျဖစ္ ေျပာင္းလဲေပးနိုင္ပါတယ္။

```javascript
elixir(function(mix) {
    mix.babel([
                'order.js',
                'product.js'
        ]);
});
```

To choose a different output location, simply specify your desired path as the second argument. The signature and functionality of this method are identical to `mix.scripts()`, excluding the Babel compilation.
output location ကို ကိုယ္လုိခ်င္တဲ့ ေနရာ သတ္မွတ္ခ်င္တယ္ဆိုရင္ေတာ့ ဒုတိယ argument သတ္မွတ္ေပးနိုင္ပါတယ္။အဲ့ဒီ method ရဲ့ သေဘာတရားနဲ့ လုပ္ေဆာင္ခ ်က္က `mix.scripts()` နဲ့ယွဥ္မယ္ဆိုရင္ `mix.scripts()` က Babel compilation ကို အသံုးမျပုတာကလြဲလို့ အတိအက ်တူပါတယ္။


<a name="javascript"></a>
### Scripts

If you have multiple JavaScript files that you would like to combine into a single file, you may use the `scripts` method.
JavaScript file အမ ်ားျကီးကို တစ္ခုတည္းအျဖစ္ ေပါင္းခ်င္တယ္ဆိုရင္ `script` method ကို သံုးနို္င္ပါတယ္။

The `scripts` method assumes all paths are relative to the `resources/assets/js` directory, and will place the resulting JavaScript in `public/js/all.js` by default:
`script` method ဟာ javascript file ေတြကို `resources/assets/js` ထဲမွာ သိမ္းထားမယ္လို့ယူဆျပီး အေခ်ာသတ္ ေပါင္းထားတဲ့ file ကို `public/js/all.js` အျဖစ္ထားေပးမွာပါ။


```javascript
elixir(function(mix) {
    mix.scripts([
        'jquery.js',
        'app.js'
    ]);
});
```

If you need to combine multiple sets of scripts into different files, you may make multiple calls to the `scripts` method. The second argument given to the method determines the resulting file name for each concatenation:
ေနာက္ဆံုး အေခ်ာသတ္ file ကို တစ္ခုတည္း လိုခ်င္တာမဟုတ္ပဲ ကိုယ့္လိုအပ္ခ်က္အရ နွစ္ဖိုင္ သံုးဖိုင္ လိုခ်င္တာဆိုရင္ေတာ့ `scripts` method ကို နွစ္ခါသံုးခါ သံုးနိုင္ပါတယ္။ ကိုယ္လိုခ်င္တဲ့ အေခ်ာသတ္ ဖိုင္နာမည္ကို ဒုတိယ argument အေနနဲ့ သတ္မွတ္နိုင္ပါတယ္။

```javascript
elixir(function(mix) {
    mix.scripts(['app.js', 'controllers.js'], 'public/js/app.js')
       .scripts(['forum.js', 'threads.js'], 'public/js/forum.js');
});
```

If you need to combine all of the scripts in a given directory, you may use the `scriptsIn` method. The resulting JavaScript will be placed in `public/js/all.js`:
directory တစ္ခုေပးထားျပီး အဲ့ဒီ directory ထဲက scripts file ေတြအကုန္လံုးကို ေပါင္းခ်င္တယ္ဆိုရင္ေတာ့ `scriptsIn` method ကို သံုးနိုင္ပါတယ္။ အေခ်ာသတ္ ေပါင္းထားတဲ့ file ကို `public/js/all.js` အျဖစ္ ေျပာင္းလဲေပးပါလိမ့္မယ္။

```javascript
elixir(function(mix) {
    mix.scriptsIn('public/js/some/directory');
});
```

<a name="versioning-and-cache-busting"></a>
## Versioning / Cache Busting

Many developers suffix their compiled assets with a timestamp or unique token to force browsers to load the fresh assets instead of serving stale copies of the code. Elixir can handle this for you using the `version` method.
developer အမ်ားစုဟာ သူတို့ရဲ့ compile လုပ္ထားတဲ့ ဖိုင္ေတြကို browser မွ ဖိုင္အေဟာင္းမဟုတ္ပဲ ဖိုင္အသစ္ ကိုသာ load လုပ္တာ ေသခ်ာေစဖို့ လက္ရွိအခ်ိန္ သို့မဟုတ္ တစ္ခုနဲ့တစ္ခု မတူတဲ့ token တစ္ခုခုကို ဖိုင္ေနာက္မွ ဆက္ေပးျခင္းျဖင့္ သံုးျကပါတယ္။  အဲ့ဒီလို အေျခအေနမွာ Elixir ရဲ့ `version` method ကို အသံုးျပုနို္င္ပါတယ္။


The `version` method accepts a file name relative to the `public` directory, and will append a unique hash to the filename, allowing for cache-busting. For example, the generated file name will look something like: `all-16d570a7.css`:
`version` method ဟာ `public` directory ထဲက ဖိုင္ေတြကုိ အသံုးျပုမွာျဖစ္ျပီး အဲ့ဒီ ဖိုင္နာမည္ကို တစ္ခုနဲ့တစ္ခု မတူတဲ့ hash ကိုပါ chache-busting အသံုးျပုနိုင္ရန္အတြက္ ထည့္ေပါင္းေပးမွာျဖစ္ပါတယ္။ ဥပမာ အေနနဲ့ ျဖစ္လာမယ့္ ဖိုင္ဟာ `all-16d570a7.css` လိုမ်ိုးျဖစ္ပါလိမ့္မယ္။

```javascript
elixir(function(mix) {
    mix.version('css/all.css');
});
```

After generating the versioned file, you may use Laravel's global `elixir` PHP helper function within your [views](/docs/{{version}}/views) to load the appropriately hashed asset. The `elixir` function will automatically determine the name of the hashed file:
အဲ့ဒီလို generate ထုတ္လိုက္တဲ့ ဖိုင္ကို laravel project အတြင္းမွာ ဘယ္ေနရာကမဆို သံုနိုင္တဲ့ `elixir` function ကို [views](/docs/{{version}}/views) ထံမွ သံုးနိုင္ပါတယ္။ Elixir မွ မည္သည့္ ဖိုင္သံုးရမည္ဆိုတာ ဆံုးျဖတ္ေပးပါလိမ့္မယ္။

    <link rel="stylesheet" href="{{ elixir('css/all.css') }}">

#### Versioning Multiple Files

You may pass an array to the `version` method to version multiple files:
တစ္ဖိုင္ထက္ပိုတဲ့ ဖိုင္ေတြကို version သတ္မွတ္ခ်င္တယ္ဆိုရင္ေတာ့ `version` method ကို သံုးျပီး array အေနနဲ့ ထည့္ေပးနိုင္ပါတယ္။

```javascript
elixir(function(mix) {
    mix.version(['css/all.css', 'js/app.js']);
});
```

Once the files have been versioned, you may use the `elixir` helper function to generate links to the proper hashed files. Remember, you only need to pass the name of the un-hashed file to the `elixir` helper function. The helper will use the un-hashed name to determine the current hashed version of the file:
ဖိုင္ေတြကို version လုပ္ျပီးျပီဆိုရင္  မွန္ကန္တဲ့ hash လုပ္ထားတဲ့ file ကို link ခ်ိတ္ဖို့အတြက္ `elixir` helper function ကို သံုးနိုင္ပါတယ္။ `elixir` helper function  ကို သံုးမယ္ဆိုရင္ hash လုပ္ထားတဲ့ ဖိုင္နာမည္ကို ထည့္ေပးစရာမလိုပဲ hash မလုပ္ထားတဲ့ filename ပဲ ထည့္ေပးရမွာပါ။ helper function က hash မလုပ္ထားတဲ့  file ကို အသံုးျပုျပီး hash လုပ္ထားတဲ့ ဘယ္ဖိုင္ကို သံုးရမလဲ ဆိုတာ ဆံုးျဖတ္ေပးမွာျဖစ္ပါတယ္။


    <link rel="stylesheet" href="{{ elixir('css/all.css') }}">

    <script src="{{ elixir('js/app.js') }}"></script>

<a name="calling-existing-gulp-tasks"></a>
## Calling Existing Gulp Tasks

If you need to call an existing Gulp task from Elixir, you may use the `task` method. As an example, imagine that you have a Gulp task that simply speaks a bit of text when called:
Elixir ကေနျပီး ရွိျပီးသား Gulp လုပ္ေဆာင္ခ်က္တစ္ခုခု ကို ေခါ္သံုးခ်င္တယ္ဆိုရင္ `task` method ကို သံုးနိုင္ပါတယ္။ ဥပမာ အေနနဲ့ ေခါ္သံုးတဲ့အခါမွာ သာမာန္စာေျကာင္းတစ္ေျကာင္းကို ထုတ္ေပးတဲ့ Gulp လုပ္ေဆာင္ခ်က္တစ္ခုကို သံုးတယ္ဆိုပါစို့။

```javascript
gulp.task('speak', function() {
    var message = 'Tea...Earl Grey...Hot';

    gulp.src('').pipe(shell('say ' + message));
});
```

If you wish to call this task from Elixir, use the `mix.task` method and pass the name of the task as the only argument to the method:
အခု task ကို Elixir ကေနသံုးမယ္ဆိုရင္  `mix.task` method ကို သံုးျပီး  task ရဲ့နာမည္ကို argument အျဖစ္ ထည့္ေပးနိုင္ပါတယ္။

```javascript
elixir(function(mix) {
    mix.task('speak');
});
```

#### Custom Watchers

If you need to register a watcher to run your custom task each time some files are modified, pass a regular expression as the second argument to the `task` method:
modifined လုပ္ေစခ်င္တဲ့ ဖိုင္ေတြကို modifined လုပ္တိုင္းမွာ ကိုယ္ပိုင္ task ကို run ဖို့အတြက္ watcher တစ္ခုကို register လုပ္ခ်င္တယ္ဆိုရင္ regular express ကို argument အျဖစ္ `task` method ထဲကို ထည့္ေပးနိင္ပါတယ္။

```javascript
elixir(function(mix) {
    mix.task('speak', 'app/**/*.php');
});
```

<a name="writing-elixir-extensions"></a>
## Writing Elixir Extensions

If you need more flexibility than Elixir's `task` method can provide, you may create custom Elixir extensions. Elixir extensions allow you to pass arguments to your custom tasks. For example, you could write an extension like so:
Elixir ရဲ့ task method ကေနေပးနိုင္တဲ့ အသံုး၀င္မွုထက္ပိုတဲ့ လုပ္ေဆာင္ခ်က္ကို လိုအပ္တယ္ဆိုရင္ ကိုယ္ပိုင္ Elixir extensions ေတြ ျပုလုပ္ထားနိုင္ပါတယ္။ ဥပမာ အေနနဲ့ ေအာက္ပါအတုိင္း extension တစ္ခုကို ဖန္တီးနိုင္ပါတယ္။

```javascript
// File: elixir-extensions.js

var gulp = require('gulp');
var shell = require('gulp-shell');
var elixir = require('laravel-elixir');

elixir.extend('speak', function(message) {

    gulp.task('speak', function() {
        gulp.src('').pipe(shell('say ' + message));
    });

    return this.queueTask('speak');

 });
```

That's it! You may either place this at the top of your Gulpfile, or instead extract it to a custom tasks file. For example, if you place your extensions in `elixir-extensions.js`, you may require the file from your main `Gulpfile` like so:
ဒါပါပဲ။ Gulp file ရဲ့ အေပါ္ဆံုးမွာ ထားခ်င္လဲ ထားနိုင္သလို ကိုယ္ပိုင္  task ဖိုင္ အျဖစ္လည္း ခြဲထားနိုင္ပါတယ္။ ဥပမာ အေနနဲ့ သင္ရဲ့ extension  ကို `elixir-extensions.js` လုိ့ သတ္မွတ္ထားမယ္ဆိုရင္ မူရင္း Gulp  ဖိုင္ကေန ဒီလို သံုးနိုင္ပါတယ္။

```javascript
// File: Gulpfile.js

var elixir = require('laravel-elixir');

require('./elixir-extensions')

elixir(function(mix) {
    mix.speak('Tea, Earl Grey, Hot');
});
```

#### Custom Watchers

If you would like your custom task to be re-triggered while running `gulp watch`, you may register a watcher:
ကိုယ္ပိုင္ task ကို `gulp watch` run ေနစဥ္အတြင္း trigger လုပ္ခ်င္တယ္ဆိုရင္ watcher တစ္ခုကို အခုလို register လုပ္နိုင္ပါတယ္။

```javascript
this.registerWatcher('speak', 'app/**/*.php');

return this.queueTask('speak');
```