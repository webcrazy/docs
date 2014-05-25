# Configuration

- [Introduction](#introduction)
- [Environment Configuration](#environment-configuration)
- [Provider Configuration](#provider-configuration)
- [Protecting Sensitive Configuration](#protecting-sensitive-configuration)
- [Maintenance Mode](#maintenance-mode)

<a name="introduction"></a>
## Introduction

Laravel framework မွာရွိတဲ့ configuration ဖိုင္အားလံုးကို 'app/config' လမ္းေၾကာင္းေအာက္မွာသိမ္းထားပါတယ္။ ဖိုင္အားလံုးမွာပါတဲ့ option တစ္ခုခ်င္းစီအတြက္ documentation မွာ ေရးထားပီးသားပါ။ အသံုးျပဳႏိုင္တဲ့ options ေတြကို documentation နဲ႔တြဲပီးေလ့လာ ႏိုင္ပါတယ္။

Application run ေနတဲ့အခ်ိန္ေတြမွာ configuration values ေတြကို အသံုးျပဳဖို႔လိုအပ္လာရင္ 'Config' class ကိုအသံုးျပဳၿပီး ဆြဲယူႏိုင္ပါတယ္။

#### Configuration Value ေတြကို အသံုးျပဳျခင္း

	Config::get('app.timezone');

ဆြဲယူအသံုးျပဳလိုက္တဲ့ configuration option မရွိတဲ့အေျခအေနအတြက္ default value ကို return ျပန္ေအာင္ သတ္မွတ္ေပးထားႏိုင္ပါတယ္။

	$timezone = Config::get('app.timezone', 'UTC');

#### Configuration value သတ္မွတ္ျခင္း

Configuration ဖိုင္ေတြထဲမွာရွိတဲ့ value ေတြကို "dot” ကိုအသံုးျပဳၿပီး (eg. filename.value) access လုပ္ႏိုင္ပါတယ္။ Application run-time ကာလမွာ configuration ေတြသတ္မွတ္ဖို႔အတြက္လည္း အသံုးျပဳႏိုင္ပါတယ္။

	Config::set('database.default', 'sqlite');

Applicastion run-time ကာလမွာ သတ္မွတ္ထားတဲ့ configuration values ေတြဟာ app ရဲ့ လက္ရွိ request အေပၚမွာပဲသက္ေရာက္မႈရွိပါတယ္။ ေနာက္ပိုင္းထပ္ျဖစ္လာမဲ့ requests ေတြအထိ ယူေဆာင္သြားမွာမဟုတ္ပါဘူး

<a name="environment-configuration"></a>
## Environment Configuration

Application run ေနတဲ့ environment အေပၚအေျခခံပီး configuration ဖိုင္ေတြ သတ္မွတ္ထားျခင္းဟာ အေထာက္အကူ အမ်ားႀကီးျဖစ္ေစပါတယ္။ ဥပမာ - ကုိယ့္ရဲ့ local machine ေပၚမွာ မတူညီတဲ့ cache driver ေတြအသံုးျပဳခ်င္တယ္ဆိုရင္ ဒီ environment based configuration ကိုအသံုးျပဳရံုနဲ႔ လြယ္ကူ ၿပီးေျမာက္ေစႏိုင္ပါတယ္။ 

'config' ဖိုဒါထဲမွာ ကိုယ့္ရဲ့ environment နဲ႔လိုက္ဖက္မဲ့ ဖိုင္ဒါတစ္ခုကိုေဆာက္လိုက္ပါ။ ဥပမာ - 'local'။ ၿပီးရင္ အဲ့ဒီ environment အတြက္ override လုပ္သြားမဲ့ config ေတြ၊ ထပ္မံသတ္မွတ္ခ်င္တဲ့ options ေတြကို configuration ဖိုင္ေတြျပဳလုပ္ပီးသတ္မွတ္ႏိုင္ပါပီ။ ဥပမာ - local environment အတြက္ cache driver ကို override လုပ္ခ်င္တယ္ဆိုရင္၊ 'app/config/local' ဖိုဒါထဲမွာ 'cache.php' ဖိုင္ေဆာက္ပီး ေအာက္မွာေပးထားတဲ့ code ေတြနဲ႔ ျပဳလုပ္လိုက္ပါ။ 

	<?php

	return array(

		'driver' => 'file',

	);

> **သတိျပဳရန္** 'testing' ဆိုတဲ့ အမည္နဲ႔ environment name ကို မသတ္မွတ္ပါနဲ႔။ အဲ့ဒီအမည္မွာ unit testing အတြက္ သီးသန္႔သတ္မွတ္ထားတဲ့ အမည္ျဖစ္ပါတယ္။

ကိုယ့္အေနနဲ႔ override လုပ္ခ်င္တဲ့ option ေတြကိုသာသတ္မွတ္ေပးရန္ လိုအပ္ပီး base configuration ဖိုင္မွာပါတဲ့ option အားလံုးကို ျပန္လည္သတ္မွတ္ေပးဖို႔ မလိုအပ္ပါ။ Base configuration files ေတြကို environment configuration files ေတြက "cascade” လုပ္သြားပါလိမ့္မယ္။

ၿပီးရင္ေတာ့ ဘယ္ environment မွာ run ေနတယ္ဆိုတာ framework ကေန သိႏိုင္ဖို႔အတြက္ သတ္မွတ္ထားေပးရမွာပါ။ Default environment ကေတာ့ 'production' ျဖစ္ပါတယ္။ အျခား environment ေတြအတြက္ setup ျပဳလုပ္ရမဲ့ ေနရာက root directory ေအာက္မွာရွိတဲ့ 'bootstrap/start.php' ဖိုင္ထဲမွာျပဳလုပ္ေပးရပါမယ္။ အဲ့ဒီဖိုင္ထဲမွာရွိတဲ့ '$app->detectEnvironment' ဆိုတဲ့  method ထဲကို သတ္မွတ္ထားတဲ့ environment ေတြပါတဲ့ array တစ္ခု passing လုပ္ထားပါတယ္။ အဲ့ဒီ array ကိုအသံုးျပဳၿပီး လက္ရွိ environment ကို ဆံုးျဖတ္တာျဖစ္ပါတယ္။ လိုအပ္လာလို႔ရွိရင္ အဲ့ဒီ array ထဲကို ေနာက္ထပ္ environment ေတြ ထပ္ထည့္ႏိုင္ပါတယ္။

    <?php

    $env = $app->detectEnvironment(array(

        'local' => array('your-machine-name'),

    ));

အေပၚမွာျပထားတဲ့ ဥပမာမွာ 'local' က environment အမည္ျဖစ္ၿပီး 'your-machine-name' က server ရဲ့ hostname ျဖစ္ပါတယ္။ Linux နဲ႔ Mac ကြန္ပ်ဴတာေတြမွာဆိုရင္ 'hostname' ဆိုတဲ့ terminal command ကိုအသံုးျပဳၿပီး hostname ကိုသတ္မွတ္ေပးႏိုင္ပါတယ္။

If you need more flexible environment detection, you may pass a `Closure` to the `detectEnvironment` method, allowing you to implement environment detection however you wish:

	$env = $app->detectEnvironment(function()
	{
		return $_SERVER['MY_LARAVEL_ENV'];
	});

#### Accessing The Current Application Environment

You may access the current application environment via the `environment` method:

	$environment = App::environment();

You may also pass arguments to the `environment` method to check if the environment matches a given value:

	if (App::environment('local'))
	{
		// The environment is local
	}

	if (App::environment('local', 'staging'))
	{
		// The environment is either local OR staging...
	}

<a name="provider-configuration"></a>
### Provider Configuration

When using environment configuration, you may want to "append" environment [service providers](/docs/ioc#service-providers) to your primary `app` configuration file. However, if you try this, you will notice the environment `app` providers are overriding the providers in your primary `app` configuration file. To force the providers to be appended, use the `append_config` helper method in your environment `app` configuration file:

	'providers' => append_config(array(
		'LocalOnlyServiceProvider',
	))

<a name="protecting-sensitive-configuration"></a>
## Protecting Sensitive Configuration

For "real" applications, it is advisable to keep all of your sensitive configuration out of your configuration files. Things such as database passwords, Stripe API keys, and encryption keys should be kept out of your configuration files whenever possible. So, where should we place them? Thankfully, Laravel provides a very simple solution to protecting these types of configuration items using "dot" files.

First, [configure your application](/docs/configuration#environment-configuration) to recognize your machine as being in the `local` environment. Next, create a `.env.local.php` file within the root of your project, which is usually the same directory that contains your `composer.json` file. The `.env.local.php` should return an array of key-value pairs, much like a typical Laravel configuration file:

	<?php

	return array(

		'TEST_STRIPE_KEY' => 'super-secret-sauce',

	);

All of the key-value pairs returned by this file will automatically be available via the `$_ENV` and `$_SERVER` PHP "superglobals". You may now reference these globals from within your configuration files:

	'key' => $_ENV['TEST_STRIPE_KEY']

Be sure to add the `.env.local.php` file to your `.gitignore` file. This will allow other developers on your team to create their own local environment configuration, as well as hide your sensitive configuration items from source control.

Now, on your production server, create a `.env.php` file in your project root that contains the corresponding values for your production environment. Like the `.env.local.php` file, the production `.env.php` file should never be included in source control.

> **Note:** You may create a file for each environment supported by your application. For example, the `development` environment will load the `.env.development.php` file if it exists.

<a name="maintenance-mode"></a>
## Maintenance Mode

When your application is in maintenance mode, a custom view will be displayed for all routes into your application. This makes it easy to "disable" your application while it is updating or when you are performing maintenance. A call to the `App::down` method is already present in your `app/start/global.php` file. The response from this method will be sent to users when your application is in maintenance mode.

To enable maintenance mode, simply execute the `down` Artisan command:

	php artisan down

To disable maintenance mode, use the `up` command:

	php artisan up

To show a custom view when your application is in maintenance mode, you may add something like the following to your application's `app/start/global.php` file:

	App::down(function()
	{
		return Response::view('maintenance', array(), 503);
	});

If the Closure passed to the `down` method returns `NULL`, maintenance mode will be ignored for that request.

### Maintenance Mode & Queues

While your application is in maintenance mode, no [queue jobs](/docs/queues) will be handled. The jobs will continue to be handled as normal once the application is out of maintenance mode.
