# Configuration လုပ္ျခင္း

- [မိတ္ဆက္](#introduction)
- [Environment ျပင္ဆင္ျခင္း](#environment-configuration)
- [Provider ျပင္ဆင္ျခင္း](#provider-configuration)
- [အမွားခံ၊ အသိခံ၍ မရေသာ အခ်က္အလက္မ်ားအား ကာကြယ္ျခင္း](#protecting-sensitive-configuration)
- [Application အားျပဳျပင္ထိန္းသိမ္းမႈ အေျခအေန](#maintenance-mode)

<a name="introduction"></a>
## မိတ္ဆက္

Laravel framework မွာရွိတဲ့ configuration ဖိုင္အားလံုးကို `app/config` လမ္းေၾကာင္းေအာက္မွာသိမ္းထားပါတယ္။ ဖိုင္အားလံုးမွာပါတဲ့ option တစ္ခုခ်င္းစီအတြက္ documentation မွာ ေရးထားပီးသားပါ။ အသံုးျပဳႏိုင္တဲ့ options ေတြကို documentation နဲ႔တြဲျပီး ေလ့လာ ႏိုင္ပါတယ္။

Application run ေနတဲ့အခ်ိန္ေတြမွာ configuration values ေတြကို အသံုးျပဳဖို႔လိုအပ္လာရင္ `Config` class ကိုအသံုးျပဳၿပီး ဆြဲယူႏိုင္ပါတယ္။

#### Configuration Value မ်ားကို အသံုးျပဳျခင္း

	Config::get('app.timezone');

ဆြဲယူအသံုးျပဳလိုက္တဲ့ configuration option မရွိတဲ့အေျခအေနအတြက္ default value ကို return ျပန္ေအာင္ သတ္မွတ္ေပးထားႏိုင္ပါတယ္။

	$timezone = Config::get('app.timezone', 'UTC');

#### Configuration value သတ္မွတ္ျခင္း

Configuration ဖိုင္ေတြထဲမွာရွိတဲ့ value ေတြကို "dot” ကိုအသံုးျပဳၿပီး (eg. filename.value) access လုပ္ႏိုင္ပါတယ္။ Application run-time ကာလမွာ configuration ေတြသတ္မွတ္ဖို႔အတြက္လည္း အသံုးျပဳႏိုင္ပါတယ္။

	Config::set('database.default', 'sqlite');

Applicastion run-time ကာလမွာ သတ္မွတ္ထားတဲ့ configuration values ေတြဟာ app ရဲ့ လက္ရွိ request အေပၚမွာပဲသက္ေရာက္မႈရွိပါတယ္။ ေနာက္ပိုင္းထပ္ျဖစ္လာမဲ့ requests ေတြအထိ ယူေဆာင္သြားမွာမဟုတ္ပါဘူး

<a name="environment-configuration"></a>
## Environment ျပင္ဆင္ျခင္း

Application run ေနတဲ့ environment အေပၚအေျခခံပီး configuration ဖိုင္ေတြ သတ္မွတ္ထားျခင္းဟာ အေထာက္အကူ အမ်ားႀကီးျဖစ္ေစပါတယ္။ ဥပမာ - ကုိယ့္ရဲ့ local machine ေပၚမွာ မတူညီတဲ့ cache driver ေတြအသံုးျပဳခ်င္တယ္ဆိုရင္ ဒီ environment based configuration ကိုအသံုးျပဳရံုနဲ႔ လြယ္ကူ ၿပီးေျမာက္ေစႏိုင္ပါတယ္။ 

`config` ဖိုဒါထဲမွာ ကိုယ့္ရဲ့ environmen  လိုက္ဖက္မဲ့ directory တစ္ခုကို ေဆာက္လိုက္ပါ။ ဥပမာ - `local`။ ၿပီးရင္ အဲ့ဒီ environment အတြက္ override လုပ္သြားမဲ့ config ေတြ၊ ထပ္မံသတ္မွတ္ခ်င္တဲ့ options ေတြကို configuration ဖိုင္ေတြျပဳလုပ္ပီးသတ္မွတ္ႏိုင္ပါၿပီ။ ဥပမာ - local environment အတြက္ cache driver ကို override လုပ္ခ်င္တယ္ဆိုရင္၊ `app/config/local` ဖိုဒါထဲမွာ `cache.php` ဖိုင္ေဆာက္ပီး ေအာက္မွာေပးထားတဲ့ code ေတြနဲ႔ ျပဳလုပ္လိုက္ပါ။ 

	<?php

	return array(

		'driver' => 'file',

	);

> **သတိျပဳရန္:** `testing` ဆိုတဲ့ အမည္နဲ႔ environment name ကို မသတ္မွတ္ပါနဲ႔။ အဲ့ဒီအမည္ဟာ unit testing အတြက္ သီးသန္႔သတ္မွတ္ထားတဲ့ အမည္ျဖစ္ပါတယ္။

ကိုယ့္အေနနဲ႔ override လုပ္ခ်င္တဲ့ option ေတြကိုသာသတ္မွတ္ေပးရန္ လိုအပ္ပီး base configuration ဖိုင္မွာပါတဲ့ option အားလံုးကို ျပန္လည္သတ္မွတ္ေပးဖို႔ မလိုအပ္ပါ။ Base configuration files ေတြကို environment configuration files ေတြက "cascade” လုပ္သြားပါလိမ့္မယ္။

ၿပီးရင္ေတာ့ ဘယ္ environment မွာ run ေနတယ္ဆိုတာ framework ကေန သိႏိုင္ဖို႔အတြက္ သတ္မွတ္ထားေပးရမွာပါ။ Default environment ကေတာ့ `production` ျဖစ္ပါတယ္။ အျခား environment ေတြအတြက္ setup ျပဳလုပ္ရမဲ့ ေနရာက root directory ေအာက္မွာရွိတဲ့ `bootstrap/start.php` ဖိုင္ထဲမွာျပဳလုပ္ေပးရပါမယ္။ အဲ့ဒီဖိုင္ထဲမွာရွိတဲ့ `$app->detectEnvironment` ဆိုတဲ့  method ထဲကို သတ္မွတ္ထားတဲ့ environment ေတြပါတဲ့ array တစ္ခု passing လုပ္ထားပါတယ္။ အဲ့ဒီ array ကိုအသံုးျပဳၿပီး လက္ရွိ environment ကို ဆံုးျဖတ္တာျဖစ္ပါတယ္။ လိုအပ္လာလို႔ရွိရင္ အဲ့ဒီ array ထဲကို ေနာက္ထပ္ environment ေတြ ထပ္ထည့္ႏိုင္ပါတယ္။

    <?php

    $env = $app->detectEnvironment(array(

        'local' => array('your-machine-name'),

    ));

အေပၚမွာျပထားတဲ့ ဥပမာမွာ `local` က environment အမည္ျဖစ္ၿပီး `your-machine-name` က server ရဲ့ hostname ျဖစ္ပါတယ္။ Linux နဲ႔ Mac ကြန္ပ်ဴတာေတြမွာဆိုရင္ `hostname` ဆိုတဲ့ terminal command ကိုအသံုးျပဳၿပီး hostname ကိုသတ္မွတ္ေပးႏိုင္ပါတယ္။

အကယ္၍ ပိုၿပီးထိေရာက္တဲ့ environment သိရွိမႈကို လိုအပ္တယ္ဆိုရင္ေတာ့ `detectEnvironment` method ထဲကို ကိုယ္လိုအပ္သလိုအသံုးျပဳႏိုင္တဲ့ environment သိရွိမႈေတြကိုျပဳလုပ္ေပးႏိုင္မဲ့ `Closure` တစ္ခုကို passing ေပးဖို႔လိုအပ္ပါတယ္။

	$env = $app->detectEnvironment(function()
	{
		return $_SERVER['MY_LARAVEL_ENV'];
	});

#### Application ရဲ့ လက္ရွိ Environment ကိုအသံုးျပဳျခင္း။

Application ရဲ့ လက္ရွိအသံုးျပဳေနတဲ့ environment ကို `environment` method ကိုအသံုးျပဳၿပီး ရယူႏိုင္ပါတယ္။

	$environment = App::environment();

ကိုယ္အသံုးျပဳခ်င္တဲ့ environment ဟုတ္/မဟုတ္ ကိုလည္း `environment` method ထဲကို arguments ေတြ passing ေပးၿပီး စစ္ၾကည့္ႏိုင္ပါတယ္။

	if (App::environment('local'))
	{
		// Local environment ျဖစ္တယ္
	}

	if (App::environment('local', 'staging'))
	{
		//Local သို႔မဟုတ္ staging environment ျဖစ္တယ္
	}

<a name="provider-configuration"></a>
### Provider ျပင္ဆင္ျခင္း

Environment configuration ကို အသံုးျပဳၿပီဆိုလို႔ရွိရင္၊ ကိုယ့္ရဲ့ ပင္မ `app` configuration ဖိုင္ထဲမွာ environment [service providers](/docs/ioc#service-providers) ကိုထည့္ေပါင္းထည့္ဖို႔ လုိအပ္လာတဲ့ အေျခအေနေတြ ရွိလာႏိုင္ပါတယ္။ အကယ္၍ ကိုယ္က ထပ္ေပါင္းထည့္ထားတယ္ဆိုလို႔ရွိရင္, the environment `app` providers are overriding the providers in your primary `app` configuration file ဆိုၿပီး သတိေပးပါလိမ့္မယ္။ အဲ့လိုအေျခအေနမ်ိဳးမွာ providers ကို မရမကထပ္ေပါင္းထည့္ေစဖို႔အတြက္ `'append_config` ဆိုတဲ့ helper method ကို ကိုယ့္ရဲ့ environment `app` configuration ဖိုင္ထဲမွာ အသံုးျပဳႏိုင္ပါတယ္။

	'providers' => append_config(array(
		'LocalOnlyServiceProvider',
	))

<a name="protecting-sensitive-configuration"></a>
## အမွားခံ၊ အသိခံ၍ မရေသာ အခ်က္အလက္မ်ားအား ကာကြယ္ျခင္း

အမွန္တကယ္အသံုးျပဳမဲ့ application ေတြအတြက္၊ ကိုယ့္ရဲ့ အမွားမခံ၊ အသိခံလို႔မရတဲ့ configuration ေတြကို configuration ဖိုင္ထဲမွာ မသိမ္းပဲနဲ႔ အျခားတစ္ေနရာမွာထားတာက ပိုၿပီးသင့္ေတာ္ပါတယ္။ ဘယ္လိုအမ်ိဳးအစားေတြလဲဆိုေတာ့ database passwords, Stripe API keys, and encryption keys စတာေတြကို ျဖစ္ႏိုင္လို႔ရွိရင္ configuration ဖိုင္ထဲမွာမသိမ္းသင့္ပါဘူး။ ဒါဆိုဘယ္ေနရာမွာသိမ္းမလဲ? အဲ့ဒီအတြက္ Laravel ကေျဖရွင္းေပးၿပီးသားျဖစ္ပါတယ္။ အဲ့ဒီလို configuration အမ်ိဳးအစားေတြအတြက္ "dot" files ေတြကိုအသံုးျပဳၿပီး ကာကြယ္ထားႏိုင္ပါတယ္။

ပထမဆံုးအေနနဲ႔ ကိုယ့္ရဲ့စက္ဟာ local မွာ run ေနတာပါဆိုတာကို application ကသိေအာင္ [configure](/docs/configuration#environment-configuration) လုပ္ေပးရပါမယ္။ ၿပီးရင္ `.env.local.php` ဆိုတဲ့ ဖိုင္အသစ္ကို `composer.json` ဖိုင္ရွိတဲ့ ဖိုဒါေအာက္မွာ ေဆာက္ေပးလိုက္ပါ။ အဲ့ဒီ `.env.local.php` ဖိုင္ဟာ အျခား laravel configuration ဖိုင္ေတြလိုပဲ key-value pairs ျဖစ္တဲ့ array တစ္ခု return ျပန္ရပါမယ္။ 

	<?php

	return array(

		'TEST_STRIPE_KEY' => 'super-secret-sauce',

	);

အဲ့ဒီ ဖိုင္ထဲကေန return ျပန္လာတဲ့ key-value pairs ေတြဟာ PHP "superglobals" ေတြျဖစ္တဲ့ `$_ENV` နဲ႔ `$_SERVER` ေတြဆီကို auto ေရာက္သြားပါလိမ့္မယ္။ အဲ့ဒီ "superglobals" ေတြကေနတစ္ဆင့္ ကိုယ့္ရဲ့ configuration ဖိုင္ထဲမွာ ျပန္လည္အသံုးျပဳႏိုင္ၿပီျဖစ္ပါတယ္။ 

	'key' => $_ENV['TEST_STRIPE_KEY']

ေသခ်ာေအာင္လုပ္ဖို႔လိုအပ္တာတစ္ခုက အဲ့ဒီ `.env.local.php` ဖိုင္ကို `.gitignore` လုပ္ထားေပးရပါမယ္။ အဲ့ဒီေတာ့မွ ကိုယ့္ရဲ့ team မွာရွိတဲ့က်န္တဲ့ developers ေတြဟာ သူတို႔ရဲ့ ကိုယ္ပိုင္ local configuration ေတြကိုျပဳလုပ္ႏုိင္မည့္အျပင္ ကိုယ့္ရဲ့ sensitive configuration ေတြကိုလဲ source control မွာမပါေအာင္ ကာကြယ္ၿပီးသားျဖစ္မွာပါ။

Production environment အတြက္လည္း လိုအပ္တဲ့ configuration ေတြပါတဲ့ `.env.php` ဖိုင္ကို project root ဖိုဒါထဲမွာ ေဆာက္လိုက္ပါ။ `.env.local.php` ဖိုင္လိုပဲ production environment မွာ အသံုးျပဳမဲ့`.env.php` ဖိုင္ဟာ source control ထဲမွာ မပါသင့္ပါဘူး။

> **သတိျပဳရန္:** Application ကေန support လုပ္တဲ့ environment တစ္ခုခ်င္းစီအတြက္ `.env` ဖိုင္ေတြ တည္ေဆာက္လာႏိုင္ပါတယ္။ ဥပမာ - `development` environment အတြက္ဆိုရင္ `.env.development.php` ဖိုင္က ရွိေနလို႔ရွိရင္ load လုပ္သြားပါလိမ့္မယ္။ 

<a name="maintenance-mode"></a>
## Application အားျပဳျပင္ထိန္းသိမ္းမႈအေျခအေန

Application ဟာ ျပဳျပင္ထိန္းသိမ္းမႈ ျပဳလုပ္တဲ့ အေျခအေနမွာ ရွိေနမယ္ဆိုရင္ application မွာရွိတဲ့ route အားလံုးအတြက္ ႀကိဳတင္ျပဳလုပ္ထားႏိုင္တဲ့ စိတ္ႀကိဳက္ ျမင္ကြင္း(view) ကိုျပေပးပါလိမ့္မယ္။ ျပဳျပင္ထိန္းသိမ္းမႈျပဳလုပ္ေနရင္ပဲျဖစ္ျဖစ္၊ update လုပ္ေနရင္ပဲျဖစ္ျဖစ္ application ကို လြယ္လြယ္ကူကူပဲ disable လုပ္ထားႏိုင္ပါတယ္။ `app/start/global.php` ဖိုင္ထဲမွာရွိၿပီးသားျဖစ္တဲ့ `App::down` ဆိုတဲ့ method ကိုေခၚသံုးလိုက္ရံုပဲ။ အဲ့ဒီ method ကေနျပန္လာတဲ့ response ကို users ေတြဆီကိုပို႔ေပးပါလိမ့္မယ္။

ျပဳျပင္ထိန္းသိမ္းမႈျပဳလုပ္ေနပါတယ္ဆိုတဲ့ အေျခအေနကိုထားခ်င္တယ္ဆိုရင္ `down` ဆိုတဲ့ Artisan command ကို အသံုးျပဳႏိုင္ပါတယ္။

	php artisan down

ထိန္းသိမ္းမႈျပဳလုပ္ၿပီးသြားလို႔ application ကိုျပန္ၿပီး အသက္သြင္းခ်င္ရင္ `up` ဆိုတဲ့ Artisan command ကို အသံုးျပဳႏိုင္ပါတယ္။

	php artisan up

ထိန္းသိမ္းမႈျပဳလုပ္ေနတဲ့အေျခအေနအတြက္ စိတ္ႀကိဳက္ ျမင္ကြင္း (view) သတ္မွတ္ခ်င္တယ္ဆိုရင္ေတာ့ ေအာက္မွာျပထားသလိုပဲ `app/start/global.php` ဖိုင္ထဲမွာ ႏွစ္သက္သလို သြားေရာက္ျပင္ဆင္ႏိုင္ပါတယ္။

	App::down(function()
	{
		return Response::view('maintenance', array(), 503);
	});

အကယ္၍ `down` method ထဲကို Closure တစ္ခု passing ေပးလိုက္ရင္ေတာ့ `NULL` ပဲ return ျပန္လာၿပီး အဲ့ဒီ request မွာပါတဲ့ maintenance mode ကို ignore လုပ္သြားပါလိမ့္မယ္။

### Maintenance Mode & Queues

Application ဟာ maintenance mode မွာ ရွိေနစဥ္အတြင္း [queue jobs](/docs/queues) ေတြကို ကိုင္တြယ္ေျဖရွင္းမွာမဟုတ္ပါဘူး။ Application ဟာ ပံုမွန္အေျခအေန ကိုျပန္ေရာက္ပီဆိုေတာ့မွ ျပန္လည္ကိုင္တြယ္ေျဖရွင္းေပးမွာျဖစ္ပါတယ္။
