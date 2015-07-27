# Install ပြုလုပ်ခြင်း

- [Installation](#installation)
- [Configuration](#configuration)
    - [Basic Configuration](#basic-configuration)
    - [Environment Configuration](#environment-configuration)
    - [Configuration Caching](#configuration-caching)
    - [Accessing Configuration Values](#accessing-configuration-values)
    - [Naming Your Application](#naming-your-application)
- [Maintenance Mode](#maintenance-mode)

<a name="installation"></a>
## Install ပြုလုပ်ခြင်း

### Requirements လိုအပ်ချက်များ

Laravel framework system လိုအပ်ချက်တစ်ချို့ရှိပါတယ်။ ဒါပေါ့ အဲ့ဒီ့လိုအပ်ချက်တွေအကုန်လုံးကို [Laravel Homestead](/docs/{{version}}/homestead) virtual machine မှာရနိုင်ပါတယ် 

<div class="content-list" markdown="1">
- PHP >= 5.5.9
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
</div>

<a name="install-laravel"></a>
### Laravel ကို install လုပ်ခြင်း

Laravel က dependencies တွေကိုအသုံးပြုဖို့ရာအတွက် [Composer](http://getcomposer.org) ကိုအသုံးပြုပါတယ် ဒါကြောင့် Laravel ကိုအသုံးမပြုခင် သင့်စက်မှာ Composer ကိုအရင်ဆုံး install လုပ်ထားဖို့လိုပါလိမ့်မယ်။

#### Laravel Installer မှတစ်ဆင့်

ပထမဉီးစွာ Composer အသုံးပြုပြီးတော့ Laravel installer ကို download လုပ်လိုက်ပါ။

    composer global require "laravel/installer=~1.1"

`~/.composer/vendor/bin` directory ကို PATCH directory ထဲမှာထည့်ထားရပါ့မယ် ဒါမှ `laravel` ဆိုပြီးခေါ်နိုင်ဖို့ရာအတွက် system ကသိမှာဖြစ်ပါတယ်။

Install လုပ်ပြီးသွားပြီဆိုရင် `laravel new` command ကိုသုံးပြီးတော့ သင်ကြိုက်တဲ့ directory မှာ Laravel ကို install လုပ်လို့ရပါပြီ။ ဥပမာအားဖြင့် `laravel new blog` က `blog` လို့အမည်ပေးထားတဲ့ folder ထဲမှာ Laravel ရဲ့ dependencies တွေကို install လုပ်ထားမှာဖြစ်ပါတယ်။ ဒီနည်းနဲ့ install လုပ်ခြင်းက Composer နဲ့နည်းထက်ပိုမြန်ပါတယ်။

    laravel new blog

#### Composer Create-Project မှတစ်ဆင့်

You may also install Laravel by issuing the Composer `create-project` command in your terminal:
သင့်အနေနဲ့ Laravel ကို terminal ကနေ`create-proect` command run ပြီးတော့ install လုပ်နိုင်ပါတယ်။

    composer create-project laravel/laravel --prefer-dist

<a name="configuration"></a>
## Configuration

<a name="basic-configuration"></a>
### အခြေခံ Configuration

Laravel framework ရဲ့ configuration files တွေအကုန်လုံးက `config` ဆိုတဲ့ directory မှာပါ၊  option တစ်ခုခြင်းဆီအတွက် document လုပ်ထားပါတယ်၊ ဒါကြောင့် အဲ့ files တွေကိုကြည့်ပြီးတော့ options တွေနဲ့ရင်းနှီးနိုင်ပါတယ်။

#### Directory Permissions

Laravel ကို install လုပ်ပြီးတဲ့အခါ permission တစ်ချို့ကို configure လုပ်ဖို့လိုပါတယ်။ `storage` နဲ့ `bootstrap/cache` directory တွေက server က writable ဖြစ်ဖို့လိုပါတယ်။ သင်က [Homestead](/docs/{{ version }}/homestead) virtual machine သုံးတယ်ဆိုရင်ဒီ permission တွေကတစ်ခါတည်း set လုပ်ပြီးသားပါ။

#### Application Key

Laravel install လုပ်ပြီးရင်နောက်တစ်ခုလုပ်သင့်တာကတော့ application key ပါဘဲ။ သင်က Laravel ကို Composer ဒါမှမဟုတ် Laravel installer ကနေတစ်ဆင့် install လုပ်ထားတယ်ဆိုရင်တော့ ဒီ key တွေက `key:generate` command ကိုသုံးပြီးတစ်ခါတည်း set လုပ်ပြီးပါပြီ။ ပုံမှန်အားဖြင့် အဲ့ဒီ့ string က ၃၂ နှစ်လုံးရှိတဲ့စကားလုံးတွေပါ။ key ကို `.env` environment file မှာလည်း set လုပ်နိုင်ပါတယ်။ `.env.example` ကို `.env` လို့အမည်မပြောင်းရသေးရင် သင့်အနေနဲ့အခုဘဲပြောင်းသင့်ပါတယ်။ **တကယ်လို့ application key က set လုပ်မထားဘူးဆိုရင် sessions နဲ့ အခြား encrypted data တွေကလုံခြုံမှာရှိမှာမဟုတ်ပါဘူး**

#### Additional Configuration

Laravel ကအခြား configuration တွေမလိုပါဘူး။ သင့် developly လုပ်ချင်ရင်လုပ်နိုင်ပါပြီ။ သို့ရာတွင်လည်း သင့်အနေနဲ့ `config/app.php` file နဲ့ သူ့ documencation ကို review လုပ်ချင်ပါလိမ့်မယ်။ အဲဒီ့မှာ `timezone` နဲ့ `locale` options တွေများစွာပါဝင်ပါတယ်၊ သင့် application လိုအပ်ချက်အရအဲ့ဒါတွေကပြောင်းလဲရနိုင်ပါတယ်။

သင့်အနေနဲ့အခြား Laravel ရဲ့ components တွေကို configure လုပ်ချင်ပါလိမ့်မယ်။ ဉပမာအားဖြင့်

- [Cache](/docs/{{version}}/cache#configuration)
- [Database](/docs/{{version}}/database#configuration)
- [Session](/docs/{{version}}/session#configuration)

သင့်အနေနဲ့ Laravel install လုပ်ပြီးသွားပြီဆိုရင် [local environment](/docs/{{version}}/installation#environment-configuration) ကို configure လုပ်သင့်ပါတယ်။

<a name="pretty-urls"></a>
#### လှလှပပ URL များ

**Apache မှာဆိုရင်**

Framework က `public/.htaccess`file နဲ့ URLs တွေကို `index.php` မပါဘဲခေါ်နိုင်အောင်လုပ်နိုင်ပါတယ်။ သင် Apache သုံးပြီး Laravel application ကို serve လုပ်ရင် `mod_rewrite` module ကို enable လုပ်ဖို့မမေ့ပါနဲ့။

တကယ်လို့ `.htaccess` file ကသင့် Apache installation နဲ့အလုပ်မလုပ်ဘူးဆိုရင် အောက်ဖော်ပြပါတစ်ခုကိုစမ်းပါ

    Options +FollowSymLinks
    RewriteEngine On

    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]

**Nginx မှာဆိုရင်**

Nignx မှာဆိုရင် အောက်ဖော်ပြပါ directive က "pretty" URLs လုပ်ပါလိမ့်မယ်

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

ဒါပေါ့ သင်က [Homestead](/docs/{{version}}/homestead) သုံးတယ်ဆိုရင်တော့ pretty URLs တွေက automatically configure လုပ်ပြီးသားပါ။

<a name="environment-configuration"></a>
### Environment Configuration

မတူညီတဲ့ configuration values တွေက မတူညီတဲ့ environment application တွေ run နေတဲ့အခါ အဲ့ဒါတွေကတော်တော်အသုံးဝင်ပါလိမ့်မယ်။ ဉပမာ သင့်အနေနဲ့ cache driver ကို သင့်စက်မှာတစ်ခုသုံးပေမယ့် production မှာတစ်ခုသုံးချင်ရင်သုံးချင်မှာပေါ့။ အဲ့လိုလုပ်ချင်ရင် environment based configuration ကလွယ်ကူစေပါလိမ့်မယ်။

To make this a cinch, Laravel utilizes the [DotEnv](https://github.com/vlucas/phpdotenv) PHP library by Vance Lucas. In a fresh Laravel installation, the root directory of your application will contain a `.env.example` file. If you install Laravel via Composer, this file will automatically be renamed to `.env`. Otherwise, you should rename the file manually.


All of the variables listed in this file will be loaded into the `$_ENV` PHP super-global when your application receives a request. You may use the `env` helper to retrieve values from these variables. In fact, if you review the Laravel configuration files, you will notice several of the options already using this helper!

Feel free to modify your environment variables as needed for your own local server, as well as your production environment. However, your `.env` file should not be committed to your application's source control, since each developer / server using your application could require a different environment configuration.

If you are developing with a team, you may wish to continue including a `.env.example` file with your application. By putting place-holder values in the example configuration file, other developers on your team can clearly see which environment variables are needed to run your application.

#### Accessing The Current Application Environment

The current application environment is determined via the `APP_ENV` variable from your `.env` file. You may access this value via the `environment` method on the `App` [facade](/docs/{{version}}/facades):

    $environment = App::environment();

You may also pass arguments to the `environment` method to check if the environment matches a given value. You may even pass multiple values if necessary:

    if (App::environment('local')) {
        // The environment is local
    }

    if (App::environment('local', 'staging')) {
        // The environment is either local OR staging...
    }

An application instance may also be accessed via the `app` helper method:

    $environment = app()->environment();

<a name="configuration-caching"></a>
### Configuration Caching

To give your application a speed boost, you should cache all of your configuration files into a single file using the `config:cache` Artisan command. This will combine all of the configuration options for your application into a single file which can be loaded quickly by the framework.

You should typically run the `php artisan config:cache` command as part of your production deployment routine. The command should not be run during local development as configuration options will frequently need to be changed during the course of your application's development.

<a name="accessing-configuration-values"></a>
### Accessing Configuration Values

You may easily access your configuration values using the global `config` helper function. The configuration values may be accessed using "dot" syntax, which includes the name of the file and option you wish to access. A default value may also be specified and will be returned if the configuration option does not exist:

    $value = config('app.timezone');

To set configuration values at runtime, pass an array to the `config` helper:

    config(['app.timezone' => 'America/Chicago']);

<a name="naming-your-application"></a>
### Naming Your Application

After installing Laravel, you may wish to "name" your application. By default, the `app` directory is namespaced under `App`, and autoloaded by Composer using the [PSR-4 autoloading standard](http://www.php-fig.org/psr/psr-4/). However, you may change the namespace to match the name of your application, which you can easily do via the `app:name` Artisan command.

For example, if your application is named "Horsefly", you could run the following command from the root of your installation:

    php artisan app:name Horsefly

Renaming your application is entirely optional, and you are free to keep the `App` namespace if you wish.

<a name="maintenance-mode"></a>
## Maintenance Mode

When your application is in maintenance mode, a custom view will be displayed for all requests into your application. This makes it easy to "disable" your application while it is updating or when you are performing maintenance. A maintenance mode check is included in the default middleware stack for your application. If the application is in maintenance mode, an `HttpException` will be thrown with a status code of 503.

To enable maintenance mode, simply execute the `down` Artisan command:

    php artisan down

To disable maintenance mode, use the `up` command:

    php artisan up

### Maintenance Mode Response Template

The default template for maintenance mode responses is located in `resources/views/errors/503.blade.php`.

### Maintenance Mode နဲ့ Queues

While your application is in maintenance mode, no [queued jobs](/docs/{{version}}/queues) will be handled. The jobs will continue to be handled as normal once the application is out of maintenance mode.
