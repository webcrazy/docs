# Configuration

- [Introduction](#introduction)
- [After Installation](#after-installation)
- [Accessing Configuration Values](#accessing-configuration-values)
- [Environment Configuration](#environment-configuration)
- [Configuration Caching](#configuration-caching)
- [Maintenance Mode](#maintenance-mode)
- [Pretty URLs](#pretty-urls)

<a name=“introduction”></a>
## Introduction

Laravel ရဲ့ Configuration ဖိုင်တွေအားလုံး `config` directory ထဲမှာ ရှိပါတယ်။ Option တစ်ခုချင်းစီကို ရှင်းပြထားတဲ့အတွက် Option နဲ့ရင်းနီးအောင်လုပ်ပြီး အသုံးဝင်မယ့် Option တွေကို လေ့လာကြည့်ပါ။

<a name=“after-installation”></a>
## After Installation

### Naming Your Application
Laravel ကို Install လုပ်ပြီးတဲ့အခါမှာ ၊ သင့် Application ကို နာမည်ပေးချင်ပေးနိုင်ပါတယ်။ ပုံမှန်ကတော့ `app` Directory က `App` Namespace နဲ့ [PSR-4 autoloading standard](http://www.php-fig.org/psr/psr-4/) ကိုသုံးပြီး Composer က Autoload လုပ်ပေးထားပါတယ်။ ဒါပေမယ့် namespace ကို သင့် application နဲ့ ကိုက်အောင်လို့ `app:name` Artisan command နဲ့ ပြောင်းလဲသတ်မှတ်ပေးလို့ရပါတယ်။

ဥပမာ သင့် Application နာမည်က “Horsefly” ဆိုရင် Application ရဲ့ Root Directory ကနေ အောက်ကအတိုင်း Run လိုက်ပါ။

	php artisan app:name Horsefly

ဒီလို Application ကို နာမည်ပြောင်းပေးတာက မလုပ်လဲရပါတယ်။ `App` namespace အတိုင်းပဲထားလဲ အဆင်ပြေပါတယ်။

### Other Configuration

Laravel မှာ တစ်ခြားသော Configuration တွေမလိုအပ်ဘဲ Development ကိုစတင်နိုင်ပါတယ်။ ဒါပေမယ့်လဲ `config/app.php` ဖိုင်နဲ့ သူ့ရဲ့ Documentation ကို တစ်ချက်လောက် လိုက်ကြည့်သင့်ပါတယ်။ အဲ့ထဲမှာ `timezone` နဲ့ `locale` အစရှိတဲ့ Option တွေပါဝင်ပါတယ်။

Laravel ကို install လုပ်ပြီးပြီဆိုတာနဲ့ [သင့်ရဲ့ local environment ကို ဖွဲစည်းပေးသင့်ပါတယ်။](/docs/5.0/configuration#environment-configuration)

> **သတိပြုရန်:** `app.debug` ကို Production application မှာ `true` လို့သတ်မှတ်မပေးသင့်ပါဘူး

<a name=“permissions”></a>
### Permissions

Laravel may require one set of permissions to be configured: folders within `storage` require write access by the web server.

<a name=“accessing-configuration-values”></a>
## Accessing Configuration Values

Configuration ရဲ့ Value တွေကို `Config` facade ကိုသုံးပြီးတော့ အောက်ကအတိုင်းရနိုင်ပါတယ်။

	$value = Config::get(‘app.timezone’);

	Config::set(‘app.timezone’, ‘America/Chicago’);

`config` helper function ကိုလည်း သုံးနိုင်ပါတယ်

	$value = config(‘app.timezone’);

<a name=“environment-configuration”></a>
## Environment Configuration

Application run နေတဲ့ Environment ပေါ်မတူတည်ပြီးတော့ မတူညီတဲ့ Configuration values တွေရှိနေရင် တော်တော်လေးအသုံးဝင်ပါတယ်။ ဥပမာ - Product server ပေါ်မှာနဲ့မတူတဲ့ Cache Driver ကိုသုံးချင် သုံးပါလိမ့်မယ်။ Environment ပေါ်မူတည်ပြီး Configuration ကိုသုံးရတာ လွယ်ကူပါတယ်။

ဒီလိုလုပ်တဲ့အခါမှာ ပိုပြီးလွယ်ကူအောင်လို့ ၊ Laravel မှာ Vance Lucas ရေးထားတဲ့  [DotEnv](https://github.com/vlucas/phpdotenv) လို့ခေါ်တဲ့ PHP Library ကိုသုံးထားပါတယ်။ အသစ် Install လုပ်ထားတဲ့ Laravel ရဲ့ Root directory မှာ .env.example ဆိုတဲ့ ဖိုင်ပါဝင်ပါလိမ့်မယ်။ Laravel ကို Composer ကနေ Install လုပ်ထားတာဆိုရင်တော့ ၊ အဲဒီဖိုင်ကို `.env` ဆိုပြီးတော့ နာမည်ပြန်ပြောင်းပေးပါလိမ့်မယ်။ အဲလိုမှမဟုတ်ရင်တော့ သင်ကိုယ်တိုင် ပြောင်းပေးသင့်ပါတယ်။

Request တစ်ခုလာတာနဲ့ ၊ အဲ့ဒီဖိုင်ထဲမှာ ပါဝင်တဲ့ Variable တွေအားလုံးကို `$_ENV` PHP super-global ထဲမှာ ထည့်ပေးထားမှာဖြစ်ပါတယ်။ အဲဒီ variable တွေရဲ့ value ကိုလိုချင်တယ်ဆိုရင်တော့ `env` helper function ကိုအသုံးပြုနိုင်ပါတယ်။ Laravel configuration file တွေကို သင်သေချာကြည့်မယ်ဆိုရင် Option တော်တော်များများကို အဲဒီ helper function ကိုသုံးပြီး ခေါ်ထားတာတွေ့ရပါလိမ့်မယ်။

Production environment အတွက်သာမက သင့် Local server အတွက်မှာပါ environment variable တွေကို ပြောင်းပြီးသုံးနိုင်ပါတယ်။ ဒါပေမယ့် သင့် Application ကို သုံးတဲ့ Developer တိုင်းက သူ့ Server နဲ့သူရှိနေတဲ့အတွက် ၊ `.env` ဖိုင်ကို Application ရဲ့ Source Control ထဲမှာ ထည့်ပေးမထားသင့်ပါဘူး။

သင့်အနေနဲ့ အဖွဲ့လိုက် Develop လုပ်နေတာဆိုရင် `.env.example` ဖိုင်ကို ထည့်ထားပေးလို့ရပါတယ်။ ဒီ example configuration ဖိုင်ထဲမှာ Value တွေကို ဥပမာအနေနဲ့ ထည့်ပေးထားမယ်ဆိုရင် ၊ အခြား Developer တွေအနေနဲ့ အဲဒီ Application ကို Run ဖို့အတွက် ဘယ် environment variable တွေလိုအပ်တယ်ဆိုတာ အလွယ်တကူသိနိုင်ပါတယ်။

#### Accessing The Current Application Environment

`Application` ထဲက `environment` method ကိုသုံးပြီးတော့ လက်ရှိ Application environment နာမည်ကို ထုတ်ယူနိုင်ပါတယ်။

	$environment = $app->environment();

`environment` method ထဲမှာ Argument ထည့်ပေးပြီးတော့ အောက်ကအတိုင်း မိမိပေးထားတဲ့ Value နဲ့ သူ့ဖက်က Value တူမတူ တိုက်စစ်နိုင်ပါတယ်။

	if ($app->environment(‘local’))
	{
		// The environment is local
	}

	if ($app->environment(‘local’, ‘staging’))
	{
		// The environment is either local OR staging…
	}

[Service Container](/docs/5.0/container) ကနေတစ်ဆင့် `Illuminate\Contracts\Foundation\Application` contract ကို Resolve လုပ်ပြီးတော့ Application ရဲ့ instance တစ်ခုကိုရရှိနိုင်ပါတယ်။ [Service Provider](/docs/5.0/providers) ထဲမှာဆိုရင်တော့ ၊ `$this->app` instance variable ကနေတစ်ဆင့် Application instance ကိုရရှိနိုင်ပါတယ်။

Application instance ကို `App` facade ရဲ့ `app` helper function ကနေလဲ ရနိုင်ပါတယ်။

	$environment = app()->environment();

	$environment = App::environment();

<a name=“configuration-caching”></a>
## Configuration Caching

သင့် Application ရဲ့ Speed ကို အနည်းငယ်မြင့်တင်နိုင်ဖို့အတွက် ၊ သင့် Configuration ဖိုင်တွေအားလုံးကို `config:cache` Artisan command ကိုသုံးပြီး ဖိုင်တစ်ခုတည်းအဖြစ်နဲ့ Cache လုပ်ထားနိုင်ပါတယ်။ ဒီလိုဆိုရင် Framework ကနေပြီးတော့ Configuration option တွေအားလုံးကိုအလွယ်တကူ ရယူနိုင်ပါတယ်။

`config:cache` command ကို Development mode မှာ မကြာခန Run ပေးသင့်ပါတယ်။

<a name=“maintenance-mode”></a>
## Maintenance Mode

သင့် Application က Maintenance mode ရောက်နေတဲ့အခါ သီးသန့် View တစ်ခုကို ဖော်ပြပေးပါလိမ့်မယ်။ Maintenance mode စစ်ဆေးတဲ့အချက်က မူလ middleware မှာပါဝင်ပါတယ်။ သင့် Application က Maintenance mode ဖြစ်နေမယ်ဆိုရင် Status code 503 အဖြစ်နဲ့ `HttpException` ဖြစ်သွားပါလိမ့်မယ်။

Maintenance mode သတ်မှတ်ပေးဖို့အတွက် `down` Artisan command ကို Run လိုက်ယုံပါပဲ။

	php artisan down
  
Maintenance mode ပိတ်ဖို့အတွက် `up` command ကိုသုံးပါ။

	php artisan up

### Maintenance Mode Response Template

Maintenance mode response တွေအတွက် မူလ Template က `resources/views/errors/503.blade.php` ဖြစ်ပါတယ်။

### Maintenance Mode & Queues

သင့် Application က Maintenance mode မှာဆိုရင် ၊ [queued jobs](/docs/5.0/queues) တွေက အလုပ်မလုပ်ပါဘူး။ Maintenance mode မဟုတ်မှသာ ပုံမှန်အတိုင်း လုပ်ဆောင်ပါလိမ့်မယ်။

<a name=“pretty-urls”></a>
## Pretty URLs

### Apache

ဒီ Framework မှာ `index.php` မပါဘဲ အလုပ်လုပ်အောင်လို့ `public/.htaccess` ဖိုင်ကိုသုံးပါတယ်။ သင့် Application idk Apache နဲ့ Run တာဆိုရင်တော့ `mod_rewrite` module ကို ဖွင့်ပေးထားဖို့ လိုအပ်ပါတယ်။

Laravel မှာပါပြီးသား `.htaccess` ဖိုင်က သင့် Apache မှာ အလုပ်မလုပ်ဘူးဆိုရင် အောင်ကအတိုင်းထည့်ပြီး Run ကြည့်ပါ

	Options +FollowSymLinks
	RewriteEngine On

	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteRule ^ index.php [L]

### Nginx

Nginx မှာဆိုရင်တော့ အောက်ကအတိုင်း ထည့်ပြီးသုံးနိုင်ပါတယ်။


    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

[Homestead](/docs/5.0/homestead) ကိုသုံးတာဆိုရင်တော့ ၊ Configuration အလိုအလျောက် လုပ်ပေးပါလိမ့်မယ်။