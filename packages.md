# Package Development

- [Introduction](#introduction)
- [Creating A Package](#creating-a-package)
- [Package Structure](#package-structure)
- [Service Providers](#service-providers)
- [Deferred Providers](#deferred-providers)
- [Package Conventions](#package-conventions)
- [Development Workflow](#development-workflow)
- [Package Routing](#package-routing)
- [Package Configuration](#package-configuration)
- [Package Views](#package-views)
- [Package Migrations](#package-migrations)
- [Package Assets](#package-assets)
- [Publishing Packages](#publishing-packages)

<a name="introduction"></a>
## Introduction

Laravelတြင္ တျခား functions ေတြ အသစ္ထည့္တဲ့အခါမွာ Packages ေတြခြဲျပီးအသစ္ထပ္ထည့္တဲ့နည္းက သမရုိးက် နည္းလမ္းေကာင္းတခုျဖစ္ပါတယ္။ လူအမ်ားစုေဆာင္းျပီး project ေတြကုိ ဖန္တီးရာတဲ့အခါမွာ အရမ္းအသံုးတည့္တဲ့နည္းလမ္းျဖစ္ပါတယ္။ ဥပမာ [Carbon](https://github.com/briannesbitt/Carbon), or  [Behat](https://github.com/Behat/Behat).

ေသခ်ာတာေပါ့ဗ်ာ ၊ Packages ေတြကုိ အသံုးျပဳရာမွာ ပံုစံမ်ိဳးစံုရွိပါတယ္။ တခ်ိဳဟာေတြက Laravel တစ္ခုတည္းမဟုတ္ပဲ အျခားျခားေသာ Framework ေတြမွာပါ အလုပ္လုပ္တဲ့ stand-alone packages ေတြျဖစ္တယ္။ အေပၚက CarBon နဲ့ Behat လုိ packages ေတြကေတာ့ Stand-alon ေတြျဖစ္ပါတယ္ ။ အဲဒီလိုဖန္တီးထားတဲ့ packages ေတြကုိ Laravel မွာသံုးမယ္ဆုိရင္ေတာ့ ထံုးစံတုိင္း "composer.json" ဖုိင္မွာ သြားထည့့္ေပးလုိက္တာနဲ့ သံုးျပဳႏုိင္မွာပါ။

တျခားတခ်က္ကေတာ့ တျခား packages ေတြက Laravel အတြက္ပဲလို့ အေသသတ္မွတ္ပီး ထုတ္လုပ္ထားတဲ့ packages ေတြလဲ ရွိပါတယ္ ။ ဥပမာ အရင္ laravel version ေတြမွာ တုန္းက "bundles" လို packages ေတြမ်ိဳးပါ။ အဲဒီ packages ေတြမွာ  routes, controllers, views, configuration, နဲ့ migrations ဖြဲ့စည္းထားျပီး laravel ရဲ့  လုပ္ေဆာင္ႏုိင္မူေတြကုိ တိုးခ်ဲ့ အသံုးျပဳႏုိင္ပါတယ္။ Stan-alone packages တစ္ခု ဖန္တီးဖို့ဆိုတာ အရမ္းခက္တဲ့ ကိစၥေတာ့မဟုတ္ပါဘူး ၊ အခုေအာက္မွာ ထပ္ေဖာ္ျပမယ့္ နည္းလမ္းေတြအတုိင္း ဖန္တီးၾကည့္ႏုိင္ပါတယ္။

Laravel အတြက္ Packages ေတြကုိ  [Packagist](http://packagist.org)မွာတင္ျပီး ျဖန့္ခ်ီႏုိင္ျပီး [Composer](http://getcomposer.org) လို အရမ္းမိုက္တဲ့ Package destributuin tool ေတြသံုးျပဳ ျပီး ဖန္တီးရမွာပါ။

<a name="creating-a-package"></a>
## Creating A Package

Laravel မွာသံုးျပဳဖုိ့အတြက္ packages တစ္ခုတည္ေဆာက္ဖုိ့အတြက္ကေတာ့ 'workbench' Artisan command ကုိ အသံုးျပဳျပီးလြယ္လြယ္ကူကူကုိဖန္တီးႏုိင္ပါတယ္။ အဲလိုလုပ္ဖုိ့အတြက္ ပထမဆံုး 'app/config/workbench.php' မွာ name နဲ့ email ေလးအရင္သြားျဖည့္ေပးရပါတယ္။ အဲဒီ name နဲ့ email ကုိ အသစ္ေဆာက္မယ့္ packages ေတြ က 'composer.json' မွာ ျပန္အသံုးျပဳဖုိ့အတြက္ျဖစ္ပါတယ္။ကဲ့ ဒီေလာက္ျပင္ဆင္ျပီးရင္ package တစ္ခု တည္ေဆာက္ဖုိ့ အဆင္သင့္ျဖစ္ေနပါျပီ။ေအာက္က ကြန္မန္းကုိ Terminal(cmd) မွာ ထည့္ run လုိက္ပါ။

#### Issuing The Workbench Artisan Command

	php artisan workbench vendor/package --resources

အေပၚက command ထဲမွာ vendor ဆိုတာက package တစ္ခုကုိ authors ေတြခြဲေရးတဲ့အခါမွာ package name ကုိ ခြဲခြဲျခားျခားသိႏုိင္ေအာင္ေပးထားတဲ့နာမည္ျဖစ္ပါတယ္။ Vendor ဆုိတာက အဲဒီ package ကုိ ဖန္တီးတဲ့လူျဖစ္ျပီး package ဆိုတာကေတာ့ ကုိယ္လုပ္တဲ့ package name ျဖစ္ပါတယ္။ ဥပမာ ကြ်န္ေတာ္ Taylar Otwell က "Zapper" ဆိုတဲ့ package တစ္ခုတည္ေဆာက္လုိက္ရင္ Package name က 'Zapper' ျဖစ္ျပး Vendor name က Taylar ျဖစ္ပါတယ္။ပံုမွန္အားျဖင့္ေတာ့ workbench က framework package တခုတည္ေဆာက္ပါတယ္။ "--resources" command က workbench ကုိ `migrations`, `views`, `config`, စသျဖင့္လိုအပ္တဲ့ ဖုိင္ေတြကုိ ဖန္တီးေပးဖို ့ေျပာပါတယ္။

အေပၚက 'Workbench' ကုိ run ျပီးျပီဆိုရင္ေတာ့ ၊ ကိုယ္ေပးထားတဲ့ နာမည္အတုိင္းပဲ 'workbench' ဆိုတဲ့ဖိုဒါထဲမွာ vendor name နဲ့ ဖိုဒါေတြေရာက္လာျပီး အထဲမွာ package နာမည္နဲ့ လိုအပ္တဲ့ဖုိင္ေတြအကုန္ အလုိေလ်ာက္ရွိေနပါလိမ့္မယ္။ ျပီးရင္ေတာ့ တည္ေဆာက္လုိက္တဲ့ package ကုိ laravel ကေန သံုးျပဳႏုိင္ရန္အတြက္ 'ServiceProvider' ေၾကာ္ျငာေပးရပါတယ္။ Service Provider ကုိ 'app/config/app.php' မွာ သြားထည့္ေပးရပါတယ္။အဲဒီမွာ သြားထည့္ေပးလုိက္ရင္ workbench ထဲက package ေတြကုိ laravel ကေန အသံုးျပဳႏုိင္ပါျပီ။ Service Provider က '[Package]ServiceProvider' ကိုအသံုးျပဳပါတယ္။ဥပမာအရဆုိရင္ 'app/config/app.php' က Provider မွာ 'Taylor\Zapper\ZapperServiceProvider' ဆိုျပီး array ထဲမွာ သြားထည့္ေပးရမွာပါ။

အခုလို Provider မွာ သြားထည့္ေပးျပီးရင္ေတာ့ packages ကုိ လုိအပ္သလိုမ်ိဳး စတင္ အသံုးျပဳႏုိပ္ပါျပီ။ ပထမဆံုး package structure နဲ ့ development workflow ကို အရင္ေလ့လာသင့္ပါတယ္။

> **Note:** Service Provider cannot be found ဆိုျပီး error ျပေနရင္ `php artisan dump-autoload` ကုိ root directory မွာ terminal(cmd) မွ တစ္ဆင့္ run ျပီး ျပန္စမ္းၾကည့္ပါ။

<a name="package-structure"></a>
## Package Structure

'workbench' command ကုိ အသံုးျပဳျပီးတဲ့အခါမွာ အဲဒီ command က ကိုယ္ဖန္တီးလိုက္တဲ့ packages ကုိ laravel ႏွင့္ တြဲဖက္အသံုးျပဳႏုိင္ေအာင္ အကုန္အလိုေလ်ာက္ျပဳလုပ္ေပးပါတယ္။

#### Basic Package Directory Structure

	/src
		/Vendor
			/Package
				PackageServiceProvider.php
		/config
		/lang
		/migrations
		/views
	/tests
	/public

အေပၚက file structure ကုိအရင္ေလ့လာၾကည့္ရေအာင္။ 'src/Vendor/Package' က ေတာ့ 'ServiceProvider' ပါဝင္တဲ့အတြက္ package's classes ေတြရဲ့  အဓိကေနရာလုိ့ေျပာရမွာပါ။ `config`, `lang`, `migrations`, နဲ့ `views' ေတြကေတာ့ packages အတြက္ လိုအပ္တဲ့ resources ေတြပါဝင္မယ့္ဖုိင္ေတြျဖစ္ပါတယ္။
Packages တစ္ခုမွာလဲ Laravel မွာရွိတဲ့ resources ေတြ အတုိင္း တည္ရွိေနမွာပါ။

<a name="service-providers"></a>
## Service Providers

Service providers ဖိုင္ေတြကေတာ့ packages ေတြရဲ့ အသက္ဖုိင္လုိ့ေျပာရမွာပါ။ပံုမွန္အားျဖင့္ Service Provider မွာ 'boot' နဲ့ 'register' ဆိုတဲ့ methodsႏွစ္ခုပါဝင္ပါတယ္။
ဒီ methods ႏွစ္ခုမွာပဲ အကုန္လံုးျပဳလုပ္ႏုိင္ပါတယ္။ ဥပမာ routes ဖိုင္ခ်ိတ္ဖုိ့ ၊IoC Container ေတြ register bindings လုပ္ဖုိ့ ၊ events ေတြထည့္ဖုိ့ ၊ အကုန္လံုးနည္းပါးကုိ ဒီ method ႏွစ္ခုတစ္ဆင့္ အလုပ္လုပ္သြားမွာပါ။

"register" method က Service Provider ကုိ register ျပဳလုပ္ျပီးတာနဲ့ အလုပ္လုပ္မယ့္ method ျဖစ္ပါတယ္။ 'boot' method ကေတာ့ request အသက္မဝင္ခင္အခ်ိန္ထိပဲ အလုပ္လုပ္မွာျဖစ္ပါတယ္။ ဒါဆိုရင္ေတာ့ service provider ထဲက actions ေတြ registe လုပ္ျပီးတဲ့အခ်ိန္ (သို ့) တျခား provider တစ္ခုရဲ့  service ကုိ ေက်ာ္လြန္(override)အသံုးျပဳလိုပါက 'boot' method ကုိ အသံုးျပဳသင့္ပါတယ္။

'workbench' command ႏွင့္ package တစ္ခုတည္ေဆာက္လုိက္တာနဲ့ 'boot' method မွာ ေအာက္ေဖာ္ျပပါအတုိင္း action တစ္ခု ပါဝင္ေနပါတယ္။

	$this->package('vendor/package');

ဒီ method က laravel ကုိ packages ထဲက views,config, other resource ေတြကုိ အသံုးျပဳႏုိင္ေအာင္လုပ္ေပးပါတယ္။ ပံုမွန္အားျဖင့္ေတာ့ အဲဒီ ကုတ္ကုိ ျပဳျပင္ဖုိ့မလိုအပ္ပါဘူး။

ပံုမွန္အားျဖင့္ package တစ္ခုတည္ေဆာက္ျပီးတဲ့အခါ အဲဒီ packages ရဲ့  resource ေတြက 'vendor/package' ေအာက္မွာရွိပါတယ္။ဘယ္လုိျဖစ္ျဖစ္  package method ကုိ argument ေနာက္တစ္ခု ထပ္ထည့္ျပီး package resource ေနရာေတြကုိ လုိအပ္သလို ေအာက္ကပံုစံအတုိင္း ေျပာင္းလဲႏုိင္ပါေသးတယ္။

	// Passing custom namespace to package method
	$this->package('vendor/package', 'custom-namespace');

	// Package resources now accessed via custom-namespace
	$view = View::make('custom-namespace::foo');

Service provider classes ေတြအတြက္ app directory ထဲမွာ ေနရာအတည္တစ္က် သတ္မွတ္ထားတာမ်ိဳးလဲမရွိပါဘူး။ 'app' ထဲမွ  'Providers' namespace ေပးျပီး ထားခ်င္တဲ့ေနရာမွာ ထားႏုိင္ပါတယ္။ ဒဲဒီ class ဖိုင္ေတြကုိ Composer's [auto-loading facilities](http://getcomposer.org/doc/01-basic-usage.md#autoloading) က သိမွတ္ျပဳေနသ၍ အဲဒီ class ဖုိင္ထဲက class ေတြကုိ app က ယူသံုးႏုိင္မွာပါ။

'Package ထဲက resources ( ဥပမာ Configuration ၊ Views ) ေနရာေတြကုိ ေျပာင္းလုိက္ျပီဆိုရင္ ေျပာင္းလိုက္တဲ့ေနရာကုိ 'package' methord မွာ တတိယေျမာက္ argument တစ္ခုအျဖစ္ ေအာက္ပါအတုိင္းထည့္သင့္ေပးသင့္ပါတယ္။

	$this->package('vendor/package', null, '/path/to/resources');

<a name="deferred-providers"></a>
## Deferred Providers

အကယ္၍မ်ား ကုိယ္တည္ေဆာက္ေနတဲ့ Service Provider က configuration၊ views လိုမ်ိဳး resources ေတြ အသံုးျပဳဖုိ ့မလိုအပ္ဘူးဆိုရင္ "deferred" service provide အျဖစ္တည္ေဆာက္သင့္ပါတယ္။ Deferred service provide က Application ရဲ့ IoC container က လိုအပ္တဲ့အခ်ိန္ေရာက္မွသင့္ အလုပ္ထ လုပ္မယ့္ provider မ်ိဳးျဖစ္ပါတယ္။ Applicaion ရဲ့  request cycle က မလိုအပ္သ၍ ဘယ္ေတာ့မွ အလုပ္လုပ္မွာမဟုတ္ပါဘူး။

defer service provider အျဖစ္သတ္မွတ္ေပးဖုိ့အတြက္ ေအာက္ကပံုစံအတုိင္း Service Provider files ထဲမွာ defer = true ဆိုျပီး ေအာက္ကပံုစံအတုိင္းသြားထည့္ေပးရမွာပါ။

	protected $defer = true;

ျပီးရင္ေတာ့ `Illuminate\Support\ServiceProvider` ရဲ့  provider method ကုိလဲ ေျပာင္းလဲျပီး  IoC container ကုိ သြားတဲ့ bindingေတြ အားလံုးကုိ return ျပန္သင့္ပါတယ္။ဥပမာ 'package.service' နဲ့ 'package.another-service' ႏွစ္ခုကုိ IoC container ထဲ binding လုပ္လိုလွ်င္ ေအာက္က ပံုစံအတုိင္း provide method မွာ သတ္မွတ္ရမွာပါ။

	public function provides()
	{
		return array('package.service', 'package.another-service');
	}

<a name="package-conventions"></a>
## Package Conventions

Package ထဲက config နဲ့ views ဖိုင္ေတြကုိ အသံုးခ်တဲ့အခါမွာ double-colon "::" ကုိ အသံုးျပဳျပီးေရးပါတယ္။

#### Loading A View From A Package

	return View::make('package::view.name');

#### Retrieving A Package Configuration Item

	return Config::get('package::group.option');

> **Note:** တကယ္လုိ ့ Package ထဲမွာ migrations ဖိုင္ပါခဲ့ရင္ေတာ့ migrationဖုိင္နာမည္တြကုိ package ရဲ့  နာမည္ နဲ့ prefixေပးဖုိ ့လိုအပ္ပါလိမ့္မယ္။ ဒီလိုအသံုးျပဳမွ တျခားေသာ package ေတြနဲ့ conflict ျဖစ္မွာ မပူရေတာ့ပါဘူး။

<a name="development-workflow"></a>
## Development Workflow

Package တစ္ခုတည္ေဆာက္အခ်ိန္မွာ Application တခုခုကုိ ဖန္တီးရင္း တည္ေဆာက္ရတာကပုိေကာင္းပါတယ္။ အဲဒီအတြက္ view နဲ့ တျခား template ပုိင္းေတြ နဲ့ အျခားအရာေတြကုိ လက္ေတြ ့က်က် ေတြ ့မွာႏုိင္မွာပါ။ ပထမဆံုး Laravel ဆုိဒ္ကေန Laravel ဖုိင္အသစ္တခုေဒါင္းျပီး install ျပဳလုပ္လုိက္ပါ။ ျပီးရင္ေတာ့ 'workbench' command ကုိ သံုးျပဴျပီး Package တစ္ခုအတြက္ လိုအပ္တဲ့ ပံုစံေတြ ရယူပါ။

'workbench' command ျပီးရင္ေတာ့ 'workbench'/[vendor]/[package]' ထဲဝင္ျပီး 'git init' နဲ့ 'git push' ျပဳလုပ္ပါ။ အဲဒီလိုျပဳလုပ္ထားတဲ့အတြက္ 'composer update' ေၾကာင့္ ျဖစ္လာမယ့္ ျပသနာေတြကုိ ရွင္းျပီးသားျဖစ္ေနပါလိမ့္မယ္။

'workbench' ဖိုဒါထဲမွာ package ထည့္လိုက္တာနဲ့  Composer က အဲဖုိင္ေတြအတြက္ ဘာမွ ေရးေပးစရာမလိုပဲ ဘယ္လိုသိသြားလဲလုိ့ သိခ်င္မွာေပါ့။ တကယ္ေတာ့ 'workbench'ဆိုတဲ့ ဖုိဒါၾကီးရွိေန ကတည္းကုိက Laravel စြမ္းအားေတြနဲ့ အလိုအေလ်ာက္ သိေနျပီး အဲဒီ package အတြက္ composer fileကုိ ရွာျပီး သံုးျပဳသြားမွာပါတယ္။

တကယ္လုိ့ package ထဲမွာ autoload files ေတြ သံုးျပဳလိုရင္ေတာ့ လိုအပ္တာေရးျပီး  package folder  ထဲမွာ 'php artisan dump-autoload' command အသံုးျပဳျပီး သတ္မွတ္ႏိုင္ပါတယ္။ workbench ထဲမွာ ထည့္ထားတဲ့ autoload ေတြက root project ေတြသာမက တျခားေသာ workbenches ေတြမွာပါအသံုးျပဳသြားႏုိင္ပါတယ္။

#### Running The Artisan Autoload Command

	php artisan dump-autoload

<a name="package-routing"></a>

## Package Routing

laravel အရင္versionတုန္းကေတာ့ Pakcage ထဲက သတ္မွတ္ထားတဲ့ URIS ေတြအလုပ္လုပ္ဖုိ့အတြက္ 'handles' ဆိုတဲ့စာသားေလးသံုးျပဳခဲ့ပါတယ္။ Laravel 4 မွာေတာ့ Pakcage ထဲက route ေတြက uri အားလံုးကုိအုလပ္ုလပ္သြားမွာပါ။ Package ထဲမွာ route file ထည့္ဖုိ့အတြက္ Service Provider fileထဲက 'boot'မွာ method ေအာက္ကပံုစံအတိုင္း သြားေၾကာ္ျငာေပးရပါတယ္။

#### Service Provider ထဲမွာ Route File သတ္မွတ္ေပးျခင္း။

	public function boot()
	{
		$this->package('vendor/package');

		include __DIR__.'/../../routes.php';
	}

> **Note:** တကယ္လုိ့ controller အသံုးျပဳခ်င္ရင္ေတာ့ 'composer.json' ဖုိင္ထဲက auto-load section ထဲမွာ namespace သြားထည့္ေပးရပါတယ္။

<a name="package-configuration"></a>
## Package Configuration

#### Accessing Package Configuration Files

Packages ေတြမွာ ၎တို ့အတြက္ Configuration file ေတြ သံုးျပဳဖုိ့လုိအပ္ေကာင္း လိုအပ္ပါလိမ့္မယ္။ အဲဒီဖုိင္ေတြတည္ေဆာက္ဖုိ့ကလဲ ပံုမွန္လုပ္ေနၾကနည္းလမ္းမ်ားအတိုင္းပဲ အလြယ္တကူလုပ္ႏုိင္ပါတယ္။ Config file တည္ေဆာက္တဲ့အခါမွာ 'Service Provider' ထဲက '$this->package' method ကုိအသံုးျပဳမယ္ဆိုရင္ေတာ့ ေအာက္ကပံုစံအတုိင္း Config ေတြကုိ "double-colon" ကုိအသံုးျပဳျပီး ယူသံုးႏိုင္ပါတယ္။

	Config::get('package::file.option');

#### Accessing Single File Package Configuration
တကယ္လုိ့ Config ဖုိင္က 'config.php' လိုမ်ိဳးတစ္ဖုိင္တည္းဆိုရင္ေတာ့ ေအာက္ကပံုစံအတုိင္း တုိက္ရိုက္အသံုးျပဳႏုိင္ပါတယ္။

	Config::get('package::option');

#### Registering A Resource Namespace Manually
တခါတရံမွာေတာ့ သင့္အေနနဲ့ views နဲ့ တျခား Lang ၊ Config ဖိုင္အတြက္ေရးထားတဲ့ "$this->package" method အတုိင္း အသံုးမျပဳခ်င္တဲ့ အခါေတြရွိမွာပါ။ အဲဒီလို သတ္မွတ္ေပးဖုိ့အတြက္ 'addNamespace' method ကုိ သံုးသံုးျပီး 'View'၊'Lang'ႏွင့္'Config' တုိ့အတြက္ကုိ ေအာက္ကပံုစံအတုိင္းအသံုးျပဳရမွာပါ။ 

	View::addNamespace('package', __DIR__.'/path/to/views');

Namespace ေၾကာ္ျငာျပီးရင္ေတာ့ ေအာက္ကပံုစံအတုိင္း View ဖိုင္ေတြကုိ "double colon" ေလးနဲ့ သံုးႏုိင္ပါတယ္။

	return View::make('package::view.name');


The method signature for `addNamespace` is identical on the `View`, `Lang`, and `Config` classes.

### Cascading Configuration Files
ကိုယ္တည္ေဆာက္လုိက္တဲ့ Package ကုိ တျခား developers ေတြ သြင္ျပီးရင္ေတာ့ သူတုိ့အေနနဲ့ သူတုိ့လိုအပ္ခ်က္အရ ေျပာင္းလဲ Configuration options ေတြကုိ သံုးျပဴခ်င္မွာပါ။ သူတုိ့ အဲဒီ Package ထဲက config value ေတြကုိ ေျပာင္းလိုက္ရင္ေတာ့ Composer update ျပဳလုပ္လဲ အဲဒီ value ေတြပဲ overwrite ျဖစ္သြားမွာပါ။အဲဒီအတြက္ 'config:publish' ဆိုတဲ့ aritsan command ကုိ ေအာက္ကပံုစံအတိုင္းအသံုးျပဳႏုိင္ပါတယ္။

	php artisan config:publish vendor/package

အေပၚက command ကုိ အသံုးျပဳျပီးတ့ဲအခါမွာ package ထဲက config ဖုိင္ေတြက 'app/config/packages/vendor/package' ထဲကုိ ကူးျပီးသားျဖစ္ေနပါလိမ့္မယ္။

> **Note:** Developers က enviornment ခြဲျပီး configuration ေတြ သတ္မွတ္ထားရင္ေတာ့ config ဖိုင္ေတြကုိ `app/config/packages/vendor/package/environment` အတုိင္းသြားထားျပီးသံုးျပဳရမွာပါ။

<a name="package-views"></a>
## Package Views

တကယ္လုိ့ကုိယ္က Package တစ္ခုတည္ေဆာက္ျပီးဆိုရင္ အဲဒီ Package အတြက္ views ေတြ ခြဲေရးခ်င္မွာပါ။အဲဒီအတြက္ view ဖုိင္ကုိ src ေအာက္က views ဖုိင္ထဲမွာထည့္ထားေပမယ့္ အျပင္က main မွာ အလုပ္လုပ္ဖုိ့အတြက္ 'view:publish' ဆိုတဲ့ Artisan Command ေလးသံုးျပီးေတာ့ 'app/views' ကုိ ေျပာင္းႏုိင္ပါတယ္။

	php artisan view:publish vendor/package

အေပၚက command ကုိ run လုိက္ရင္ေတာ့ package ထဲက views ဖိုင္ေတြက 'app/views/packages' ထဲကုိ package နာမည္နဲ့ ဖုိင္ေတြ ေရာက္ေနမွာပါ။packages နာမည္နဲ့ folder မရွိရင္လဲ သူ ့အလိုလို folder တည္ေဆာက္သြားပါလိမ့္မယ္။ Package အတြက္ Views ဖိုင္ ေတြကုိ publish လုပ္ျပီးရင္ေတာ့ Packages အတြက္ အဲဒီ viewsဖုိင္ေတြက ဦးစားေပးအေနနဲ့ အလုပ္လုပ္သြားပါလိမ့္မယ္။

<a name="package-migrations"></a>
## Package Migrations

#### Creating Migrations For Workbench Packages
Packages ေတြအတြက္ Migration ကုိ Artisan command သံုးျပဳျပီးအလြယ္တကူတည္ေဆာက္ႏုိင္ပါတယ္။Package အတြက္ migration တည္ေဆာက္ဖုိ့အတြက္ migrate လုပ္ခ်င္တဲ့ workbench ထဲဝင္ျပီး ေအာက္က ပံုစံအတုိင္း "--bench" ဆိုတဲ့ ဦးတည္ခ်က္ေလးေပးျပီး တည္ေဆာက္ႏုိင္ပါတယ္။

	php artisan migrate:make create_users_table --bench="vendor/package"

#### Running Migrations For Workbench Packages

	php artisan migrate --bench="vendor/package"

#### Running Migrations For An Installed Package

တကယ္လုိ့ ကုိယ္တည္ေဆာက္လုိက္တဲ့ Package က ျပီးျပည့္စံုျပီး တျခားေနရာျပန္သြင္းတဲ့အခါတြင္ database migrate လုပ္ဖို့အတြက္ "--package"ဆိုတဲ့ ဦးတည္ခ်က္ ေလးသံုးျပီး ေအာက္ကပံုစံအတြက္ Migrate လုပ္ႏုိင္ပါတယ္။

	php artisan migrate --package="vendor/package"

<a name="package-assets"></a>
## Package Assets

#### Moving Package Assets To Public
'packages' ေတြမွာ 'Javascript, Css, images လုိ assets ေတြပါေကာင္းပါႏုိင္ပါတယ္။ အဲဒီ assets ေတြကုိ app မွ တဆင့္တန္းဆြဲေခၚသံုးဖုိ့မျဖစ္ႏုိင္ပါဘူး  ။ အဲဒီအတြက္ 'package' ထဲက assets ေတြကုိ public ေအာက္ကုိ ေျပာင္းထည့္ေပးဖုိ့လိုအပ္ပါတယ္။ အဲဒီအတြက္ `asset:publish`  ကြန္မန္း ကုိ  ေအာက္ကအတုိင္း အသံုးျပဳျပီး ေျပာင္းထည့္ေပးႏုိင္ပါတယ္။

	php artisan asset:publish

	php artisan asset:publish vendor/package

တကယ္လုိ တည္ေဆာက္ထားတဲ့ 'package' က 'workbench' ေအာက္မွာပဲရွိေသးရင္ေတာ့ ' --bench ' ကုိေအာက္ပါအတုိင္းထပ္ထည့္ျပီးေရးေပးရပါတယ္။

	php artisan asset:publish --bench="vendor/package"

ဒီကြန္မန္းက package ထဲမွ assets ေတြကုိ 'public/packages' ထဲကုိ သက္ဆိုင္ရင္ package နဲ့ vendor နာမည္ေတြအလုိက္ဖိုဒါေတြ အလိုေလ်ာက္ေဆာက္ျပီး သိမ္းဆည္းေပးသြားမွာပါ။ ဥပမာ 'workbench' ေအာက္မွာ 'usersape/kusod' ဆိုျပီး packages ေဆာက္ထားရင္ 'public/packages/userscape/kudos' ဆိုျပီး ေရာက္သြားမွာပါ။ ဒီလိုလုပ္ျခင္းအားျဖင့္ asset ေတြနဲ့ပက္သက္ျပီး  လံုျခံဳေရးဆုိင္ရာ အားသာခ်က္မ်ား ရရွိႏုိင္ပါတယ္။

<a name="publishing-packages"></a>
## Publishing Packages

ကုိယ္တည္ေဆာက္ထားတဲ့'Package' က အသံုးျပဳဖို ့အားလံုးျပင္ဆင္ျပီးသြားရင္ေတာ့ [Packagist](http://packagist.org) ကုိ တျခားသူေတြပါသံုးျပဳႏုိင္ေအာင္ တင္ထားေပးသင့္ပါတယ္။ တကယ္လုိ့ ကုိယ္ တည္ေဆာက္လုိက္တဲ့ 'package' က laravel အတြက္ပဲ သီးသန့္တည္ေဆာက္ထားရင္ေတာ့ 'composer.json' မွာ 'laravel' ဆိုျပီး tag ထည့္ေပးဖုိ့လိုအပ္ပါတယ္။

ထိုနည္းတူစြာျဖင့္ Packagist တြင္တင္တဲ့အခါမွာ releases version ေတြပါ tag အေနနဲ့တခါတည္း ထည့္ေပးသင့္ပါတယ္ ။ Developers ေတြက ကုိယ့္ရဲ့  packages ကုိ သံုးတဲ့အခါမွာ  'composer.json' မွာလိုအပ္တဲ့ version ကုိ ထည့္ျပီးသံုးျပဳႏုိင္သြားမွာပါ။တကယ္လုိ့ Stable Version မဟုတ္ေသးရင္ေတာ့ 'branch-alias' ဆိုတဲ့ composer keyword ေလးသံုးျပီးသံုးျပဳႏိုင္ပါတယ္။

Package တစ္ခုတည္ေဆာက္လိုက္ျပီးျပီဆိုရင္ေတာ့ 'workbench' ကုိ အသံုးျပဳျပီး web application ေတြမွာ လိုအပ္သလို သံုးျပဳျပီး ဆက္လုပ္သြားသင့္ပါတယ္။ အဲဒီနည္းကေတာ့ 'package' တစ္ခုကုိ published လုပ္လိုက္ျပီးေသာ္လည္း အဲဒီ package ကုိ ဆက္လက္ျပီး ေကာင္းေအာင္လုပ္ေပးႏိုင္မွာပါ။

တစ္ခ်ိဳ ့ေသာအဖြဲ ့စည္းေတြကေတာ့ သူတုိ့ရဲ့  Packages ေတြကုိ ၎တို ့ရဲ့  Developers သံုးျပဳဖုိ့အတြက္ ကုိယ္ပုိင္ repository ေတြေဆာက္ျပီး ထားေလ့ရွိပါတယ္။ သင္လဲ အဲဒီလိုလုပ္ဖုိ့ အတြက္ စိတ္ကူးရွိရင္ေတာ့ Composer Team က သတ္မွတ္ေပးထားတဲ့ [Satis](http://github.com/composer/satis) project ကုိ ေလ့လာသင့္ပါတယ္။
