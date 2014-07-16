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

Laravelတွင် တခြား functions တွေ အသစ်ထည့်တဲ့အခါမှာ Packages တွေခွဲပြီးအသစ်ထပ်ထည့်တဲ့နည်းက သမရိုးကျ နည်းလမ်းကောင်းတခုဖြစ်ပါတယ်။ လူအများစုဆောင်းပြီး project တွေကို ဖန်တီးရာတဲ့အခါမှာ အရမ်းအသုံးတည့်တဲ့နည်းလမ်းဖြစ်ပါတယ်။ ဥပမာ [Carbon](https://github.com/briannesbitt/Carbon), or  [Behat](https://github.com/Behat/Behat).

သေချာတာပေါ့ဗျာ ၊ Packages တွေကို အသုံးပြုရာမှာ ပုံစံမျိုးစုံရှိပါတယ်။ တချိုဟာတွေက Laravel တစ်ခုတည်းမဟုတ်ပဲ အခြားခြားသော Framework တွေမှာပါ အလုပ်လုပ်တဲ့ stand-alone packages တွေဖြစ်တယ်။ အပေါ်က CarBon နဲ့ Behat လို packages တွေကတော့ Stand-alon တွေဖြစ်ပါတယ် ။ အဲဒီလိုဖန်တီးထားတဲ့ packages တွေကို Laravel မှာသုံးမယ်ဆိုရင်တော့ ထုံးစံတိုင်း "composer.json" ဖိုင်မှာ သွားထည့်ပေးလိုက်တာနဲ့ သုံးပြုနိုင်မှာပါ။

တခြားတချက်ကတော့ တခြား packages တွေက Laravel အတွက်ပဲလို့ အသေသတ်မှတ်ပီး ထုတ်လုပ်ထားတဲ့ packages တွေလဲ ရှိပါတယ် ။ ဥပမာ အရင် laravel version တွေမှာ တုန်းက "bundles" လို packages တွေမျိုးပါ။ အဲဒီ packages တွေမှာ  routes, controllers, views, configuration, နဲ့ migrations ဖွဲ့စည်းထားပြီး laravel ရဲ့  လုပ်ဆောင်နိုင်မူတွေကို တိုးချဲ့ အသုံးပြုနိုင်ပါတယ်။ Stan-alone packages တစ်ခု ဖန်တီးဖို့ဆိုတာ အရမ်းခက်တဲ့ ကိစ္စတော့မဟုတ်ပါဘူး ၊ အခုအောက်မှာ ထပ်ဖော်ပြမယ့် နည်းလမ်းတွေအတိုင်း ဖန်တီးကြည့်နိုင်ပါတယ်။

Laravel အတွက် Packages တွေကို  [Packagist](http://packagist.org)မှာတင်ပြီး ဖြန့်ချီနိုင်ပြီး [Composer](http://getcomposer.org) လို အရမ်းမိုက်တဲ့ Package destributuin tool တွေသုံးပြု ပြီး ဖန်တီးရမှာပါ။

<a name="creating-a-package"></a>
## Creating A Package

Laravel မှာသုံးပြုဖို့အတွက် packages တစ်ခုတည်ဆောက်ဖို့အတွက်ကတော့ 'workbench' Artisan command ကို အသုံးပြုပြီးလွယ်လွယ်ကူကူကိုဖန်တီးနိုင်ပါတယ်။ အဲလိုလုပ်ဖို့အတွက် ပထမဆုံး 'app/config/workbench.php' မှာ name နဲ့ email လေးအရင်သွားဖြည့်ပေးရပါတယ်။ အဲဒီ name နဲ့ email ကို အသစ်ဆောက်မယ့် packages တွေ က 'composer.json' မှာ ပြန်အသုံးပြုဖို့အတွက်ဖြစ်ပါတယ်။ကဲ့ ဒီလောက်ပြင်ဆင်ပြီးရင် package တစ်ခု တည်ဆောက်ဖို့ အဆင်သင့်ဖြစ်နေပါပြီ။အောက်က ကွန်မန်းကို Terminal(cmd) မှာ ထည့် run လိုက်ပါ။

#### Issuing The Workbench Artisan Command

	php artisan workbench vendor/package --resources

အပေါ်က command ထဲမှာ vendor ဆိုတာက package တစ်ခုကို authors တွေခွဲရေးတဲ့အခါမှာ package name ကို ခွဲခွဲခြားခြားသိနိုင်အောင်ပေးထားတဲ့နာမည်ဖြစ်ပါတယ်။ Vendor ဆိုတာက အဲဒီ package ကို ဖန်တီးတဲ့လူဖြစ်ပြီး package ဆိုတာကတော့ ကိုယ်လုပ်တဲ့ package name ဖြစ်ပါတယ်။ ဥပမာ ကျွန်တော် Taylar Otwell က "Zapper" ဆိုတဲ့ package တစ်ခုတည်ဆောက်လိုက်ရင် Package name က 'Zapper' ဖြစ်ပြး Vendor name က Taylar ဖြစ်ပါတယ်။ပုံမှန်အားဖြင့်တော့ workbench က framework package တခုတည်ဆောက်ပါတယ်။ "--resources" command က workbench ကို `migrations`, `views`, `config`, စသဖြင့်လိုအပ်တဲ့ ဖိုင်တွေကို ဖန်တီးပေးဖို ့ပြောပါတယ်။

အပေါ်က 'Workbench' ကို run ပြီးပြီဆိုရင်တော့ ၊ ကိုယ်ပေးထားတဲ့ နာမည်အတိုင်းပဲ 'workbench' ဆိုတဲ့ဖိုဒါထဲမှာ vendor name နဲ့ ဖိုဒါတွေရောက်လာပြီး အထဲမှာ package နာမည်နဲ့ လိုအပ်တဲ့ဖိုင်တွေအကုန် အလိုလျောက်ရှိနေပါလိမ့်မယ်။ ပြီးရင်တော့ တည်ဆောက်လိုက်တဲ့ package ကို laravel ကနေ သုံးပြုနိုင်ရန်အတွက် 'ServiceProvider' ကြော်ငြာပေးရပါတယ်။ Service Provider ကို 'app/config/app.php' မှာ သွားထည့်ပေးရပါတယ်။အဲဒီမှာ သွားထည့်ပေးလိုက်ရင် workbench ထဲက package တွေကို laravel ကနေ အသုံးပြုနိုင်ပါပြီ။ Service Provider က '[Package]ServiceProvider' ကိုအသုံးပြုပါတယ်။ဥပမာအရဆိုရင် 'app/config/app.php' က Provider မှာ 'Taylor\Zapper\ZapperServiceProvider' ဆိုပြီး array ထဲမှာ သွားထည့်ပေးရမှာပါ။

အခုလို Provider မှာ သွားထည့်ပေးပြီးရင်တော့ packages ကို လိုအပ်သလိုမျိုး စတင် အသုံးပြုနိုပ်ပါပြီ။ ပထမဆုံး package structure နဲ ့ development workflow ကို အရင်လေ့လာသင့်ပါတယ်။

> **Note:** Service Provider cannot be found ဆိုပြီး error ပြနေရင် `php artisan dump-autoload` ကို root directory မှာ terminal(cmd) မှ တစ်ဆင့် run ပြီး ပြန်စမ်းကြည့်ပါ။

<a name="package-structure"></a>
## Package Structure

'workbench' command ကို အသုံးပြုပြီးတဲ့အခါမှာ အဲဒီ command က ကိုယ်ဖန်တီးလိုက်တဲ့ packages ကို laravel နှင့် တွဲဖက်အသုံးပြုနိုင်အောင် အကုန်အလိုလျောက်ပြုလုပ်ပေးပါတယ်။

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

အပေါ်က file structure ကိုအရင်လေ့လာကြည့်ရအောင်။ 'src/Vendor/Package' က တော့ 'ServiceProvider' ပါဝင်တဲ့အတွက် package's classes တွေရဲ့  အဓိကနေရာလို့ပြောရမှာပါ။ `config`, `lang`, `migrations`, နဲ့ `views' တွေကတော့ packages အတွက် လိုအပ်တဲ့ resources တွေပါဝင်မယ့်ဖိုင်တွေဖြစ်ပါတယ်။
Packages တစ်ခုမှာလဲ Laravel မှာရှိတဲ့ resources တွေ အတိုင်း တည်ရှိနေမှာပါ။

<a name="service-providers"></a>
## Service Providers

Service providers ဖိုင်တွေကတော့ packages တွေရဲ့ အသက်ဖိုင်လို့ပြောရမှာပါ။ပုံမှန်အားဖြင့် Service Provider မှာ 'boot' နဲ့ 'register' ဆိုတဲ့ methodsနှစ်ခုပါဝင်ပါတယ်။
ဒီ methods နှစ်ခုမှာပဲ အကုန်လုံးပြုလုပ်နိုင်ပါတယ်။ ဥပမာ routes ဖိုင်ချိတ်ဖို့ ၊IoC Container တွေ register bindings လုပ်ဖို့ ၊ events တွေထည့်ဖို့ ၊ အကုန်လုံးနည်းပါးကို ဒီ method နှစ်ခုတစ်ဆင့် အလုပ်လုပ်သွားမှာပါ။

"register" method က Service Provider ကို register ပြုလုပ်ပြီးတာနဲ့ အလုပ်လုပ်မယ့် method ဖြစ်ပါတယ်။ 'boot' method ကတော့ request အသက်မဝင်ခင်အချိန်ထိပဲ အလုပ်လုပ်မှာဖြစ်ပါတယ်။ ဒါဆိုရင်တော့ service provider ထဲက actions တွေ registe လုပ်ပြီးတဲ့အချိန် (သို ့) တခြား provider တစ်ခုရဲ့  service ကို ကျော်လွန်(override)အသုံးပြုလိုပါက 'boot' method ကို အသုံးပြုသင့်ပါတယ်။

'workbench' command နှင့် package တစ်ခုတည်ဆောက်လိုက်တာနဲ့ 'boot' method မှာ အောက်ဖော်ပြပါအတိုင်း action တစ်ခု ပါဝင်နေပါတယ်။

	$this->package('vendor/package');

ဒီ method က laravel ကို packages ထဲက views,config, other resource တွေကို အသုံးပြုနိုင်အောင်လုပ်ပေးပါတယ်။ ပုံမှန်အားဖြင့်တော့ အဲဒီ ကုတ်ကို ပြုပြင်ဖို့မလိုအပ်ပါဘူး။

ပုံမှန်အားဖြင့် package တစ်ခုတည်ဆောက်ပြီးတဲ့အခါ အဲဒီ packages ရဲ့  resource တွေက 'vendor/package' အောက်မှာရှိပါတယ်။ဘယ်လိုဖြစ်ဖြစ်  package method ကို argument နောက်တစ်ခု ထပ်ထည့်ပြီး package resource နေရာတွေကို လိုအပ်သလို အောက်ကပုံစံအတိုင်း ပြောင်းလဲနိုင်ပါသေးတယ်။

	// Passing custom namespace to package method
	$this->package('vendor/package', 'custom-namespace');

	// Package resources now accessed via custom-namespace
	$view = View::make('custom-namespace::foo');

Service provider classes တွေအတွက် app directory ထဲမှာ နေရာအတည်တစ်ကျ သတ်မှတ်ထားတာမျိုးလဲမရှိပါဘူး။ 'app' ထဲမှ  'Providers' namespace ပေးပြီး ထားချင်တဲ့နေရာမှာ ထားနိုင်ပါတယ်။ ဒဲဒီ class ဖိုင်တွေကို Composer's [auto-loading facilities](http://getcomposer.org/doc/01-basic-usage.md#autoloading) က သိမှတ်ပြုနေသ၍ အဲဒီ class ဖိုင်ထဲက class တွေကို app က ယူသုံးနိုင်မှာပါ။

'Package ထဲက resources ( ဥပမာ Configuration ၊ Views ) နေရာတွေကို ပြောင်းလိုက်ပြီဆိုရင် ပြောင်းလိုက်တဲ့နေရာကို 'package' methord မှာ တတိယမြောက် argument တစ်ခုအဖြစ် အောက်ပါအတိုင်းထည့်သင့်ပေးသင့်ပါတယ်။

	$this->package('vendor/package', null, '/path/to/resources');

<a name="deferred-providers"></a>
## Deferred Providers

အကယ်၍များ ကိုယ်တည်ဆောက်နေတဲ့ Service Provider က configuration၊ views လိုမျိုး resources တွေ အသုံးပြုဖို ့မလိုအပ်ဘူးဆိုရင် "deferred" service provide အဖြစ်တည်ဆောက်သင့်ပါတယ်။ Deferred service provide က Application ရဲ့ IoC container က လိုအပ်တဲ့အချိန်ရောက်မှသင့် အလုပ်ထ လုပ်မယ့် provider မျိုးဖြစ်ပါတယ်။ Applicaion ရဲ့  request cycle က မလိုအပ်သ၍ ဘယ်တော့မှ အလုပ်လုပ်မှာမဟုတ်ပါဘူး။

defer service provider အဖြစ်သတ်မှတ်ပေးဖို့အတွက် အောက်ကပုံစံအတိုင်း Service Provider files ထဲမှာ defer = true ဆိုပြီး အောက်ကပုံစံအတိုင်းသွားထည့်ပေးရမှာပါ။

	protected $defer = true;

ပြီးရင်တော့ `Illuminate\Support\ServiceProvider` ရဲ့  provider method ကိုလဲ ပြောင်းလဲပြီး  IoC container ကို သွားတဲ့ bindingတွေ အားလုံးကို return ပြန်သင့်ပါတယ်။ဥပမာ 'package.service' နဲ့ 'package.another-service' နှစ်ခုကို IoC container ထဲ binding လုပ်လိုလျှင် အောက်က ပုံစံအတိုင်း provide method မှာ သတ်မှတ်ရမှာပါ။

	public function provides()
	{
		return array('package.service', 'package.another-service');
	}

<a name="package-conventions"></a>
## Package Conventions

Package ထဲက config နဲ့ views ဖိုင်တွေကို အသုံးချတဲ့အခါမှာ double-colon "::" ကို အသုံးပြုပြီးရေးပါတယ်။

#### Loading A View From A Package

	return View::make('package::view.name');

#### Retrieving A Package Configuration Item

	return Config::get('package::group.option');

> **Note:** တကယ်လို ့ Package ထဲမှာ migrations ဖိုင်ပါခဲ့ရင်တော့ migrationဖိုင်နာမည်တွကို package ရဲ့  နာမည် နဲ့ prefixပေးဖို ့လိုအပ်ပါလိမ့်မယ်။ ဒီလိုအသုံးပြုမှ တခြားသော package တွေနဲ့ conflict ဖြစ်မှာ မပူရတော့ပါဘူး။

<a name="development-workflow"></a>
## Development Workflow

Package တစ်ခုတည်ဆောက်အချိန်မှာ Application တခုခုကို ဖန်တီးရင်း တည်ဆောက်ရတာကပိုကောင်းပါတယ်။ အဲဒီအတွက် view နဲ့ တခြား template ပိုင်းတွေ နဲ့ အခြားအရာတွေကို လက်တွေ ့ကျကျ တွေ ့မှာနိုင်မှာပါ။ ပထမဆုံး Laravel ဆိုဒ်ကနေ Laravel ဖိုင်အသစ်တခုဒေါင်းပြီး install ပြုလုပ်လိုက်ပါ။ ပြီးရင်တော့ 'workbench' command ကို သုံးပြူပြီး Package တစ်ခုအတွက် လိုအပ်တဲ့ ပုံစံတွေ ရယူပါ။

'workbench' command ပြီးရင်တော့ 'workbench'/[vendor]/[package]' ထဲဝင်ပြီး 'git init' နဲ့ 'git push' ပြုလုပ်ပါ။ အဲဒီလိုပြုလုပ်ထားတဲ့အတွက် 'composer update' ကြောင့် ဖြစ်လာမယ့် ပြသနာတွေကို ရှင်းပြီးသားဖြစ်နေပါလိမ့်မယ်။

'workbench' ဖိုဒါထဲမှာ package ထည့်လိုက်တာနဲ့  Composer က အဲဖိုင်တွေအတွက် ဘာမှ ရေးပေးစရာမလိုပဲ ဘယ်လိုသိသွားလဲလို့ သိချင်မှာပေါ့။ တကယ်တော့ 'workbench'ဆိုတဲ့ ဖိုဒါကြီးရှိနေ ကတည်းကိုက Laravel စွမ်းအားတွေနဲ့ အလိုအလျောက် သိနေပြီး အဲဒီ package အတွက် composer fileကို ရှာပြီး သုံးပြုသွားမှာပါတယ်။

တကယ်လို့ package ထဲမှာ autoload files တွေ သုံးပြုလိုရင်တော့ လိုအပ်တာရေးပြီး  package folder  ထဲမှာ 'php artisan dump-autoload' command အသုံးပြုပြီး သတ်မှတ်နိုင်ပါတယ်။ workbench ထဲမှာ ထည့်ထားတဲ့ autoload တွေက root project တွေသာမက တခြားသော workbenches တွေမှာပါအသုံးပြုသွားနိုင်ပါတယ်။

#### Running The Artisan Autoload Command

	php artisan dump-autoload

<a name="package-routing"></a>

## Package Routing

laravel အရင်versionတုန်းကတော့ Pakcage ထဲက သတ်မှတ်ထားတဲ့ URIS တွေအလုပ်လုပ်ဖို့အတွက် 'handles' ဆိုတဲ့စာသားလေးသုံးပြုခဲ့ပါတယ်။ Laravel 4 မှာတော့ Pakcage ထဲက route တွေက uri အားလုံးကိုအုလပ်ုလပ်သွားမှာပါ။ Package ထဲမှာ route file ထည့်ဖို့အတွက် Service Provider fileထဲက 'boot'မှာ method အောက်ကပုံစံအတိုင်း သွားကြော်ငြာပေးရပါတယ်။

#### Service Provider ထဲမှာ Route File သတ်မှတ်ပေးခြင်း။

	public function boot()
	{
		$this->package('vendor/package');

		include __DIR__.'/../../routes.php';
	}

> **Note:** တကယ်လို့ controller အသုံးပြုချင်ရင်တော့ 'composer.json' ဖိုင်ထဲက auto-load section ထဲမှာ namespace သွားထည့်ပေးရပါတယ်။

<a name="package-configuration"></a>
## Package Configuration

#### Accessing Package Configuration Files

Packages တွေမှာ ၎င်းတို ့အတွက် Configuration file တွေ သုံးပြုဖို့လိုအပ်ကောင်း လိုအပ်ပါလိမ့်မယ်။ အဲဒီဖိုင်တွေတည်ဆောက်ဖို့ကလဲ ပုံမှန်လုပ်နေကြနည်းလမ်းများအတိုင်းပဲ အလွယ်တကူလုပ်နိုင်ပါတယ်။ Config file တည်ဆောက်တဲ့အခါမှာ 'Service Provider' ထဲက '$this->package' method ကိုအသုံးပြုမယ်ဆိုရင်တော့ အောက်ကပုံစံအတိုင်း Config တွေကို "double-colon" ကိုအသုံးပြုပြီး ယူသုံးနိုင်ပါတယ်။

	Config::get('package::file.option');

#### Accessing Single File Package Configuration
တကယ်လို့ Config ဖိုင်က 'config.php' လိုမျိုးတစ်ဖိုင်တည်းဆိုရင်တော့ အောက်ကပုံစံအတိုင်း တိုက်ရိုက်အသုံးပြုနိုင်ပါတယ်။

	Config::get('package::option');

#### Registering A Resource Namespace Manually
တခါတရံမှာတော့ သင့်အနေနဲ့ views နဲ့ တခြား Lang ၊ Config ဖိုင်အတွက်ရေးထားတဲ့ "$this->package" method အတိုင်း အသုံးမပြုချင်တဲ့ အခါတွေရှိမှာပါ။ အဲဒီလို သတ်မှတ်ပေးဖို့အတွက် 'addNamespace' method ကို သုံးသုံးပြီး 'View'၊'Lang'နှင့်'Config' တို့အတွက်ကို အောက်ကပုံစံအတိုင်းအသုံးပြုရမှာပါ။ 

	View::addNamespace('package', __DIR__.'/path/to/views');

Namespace ကြော်ငြာပြီးရင်တော့ အောက်ကပုံစံအတိုင်း View ဖိုင်တွေကို "double colon" လေးနဲ့ သုံးနိုင်ပါတယ်။

	return View::make('package::view.name');


The method signature for `addNamespace` is identical on the `View`, `Lang`, and `Config` classes.

### Cascading Configuration Files
ကိုယ်တည်ဆောက်လိုက်တဲ့ Package ကို တခြား developers တွေ သွင်ပြီးရင်တော့ သူတို့အနေနဲ့ သူတို့လိုအပ်ချက်အရ ပြောင်းလဲ Configuration options တွေကို သုံးပြူချင်မှာပါ။ သူတို့ အဲဒီ Package ထဲက config value တွေကို ပြောင်းလိုက်ရင်တော့ Composer update ပြုလုပ်လဲ အဲဒီ value တွေပဲ overwrite ဖြစ်သွားမှာပါ။အဲဒီအတွက် 'config:publish' ဆိုတဲ့ aritsan command ကို အောက်ကပုံစံအတိုင်းအသုံးပြုနိုင်ပါတယ်။

	php artisan config:publish vendor/package

အပေါ်က command ကို အသုံးပြုပြီးတဲ့အခါမှာ package ထဲက config ဖိုင်တွေက 'app/config/packages/vendor/package' ထဲကို ကူးပြီးသားဖြစ်နေပါလိမ့်မယ်။

> **Note:** Developers က enviornment ခွဲပြီး configuration တွေ သတ်မှတ်ထားရင်တော့ config ဖိုင်တွေကို `app/config/packages/vendor/package/environment` အတိုင်းသွားထားပြီးသုံးပြုရမှာပါ။

<a name="package-views"></a>
## Package Views

တကယ်လို့ကိုယ်က Package တစ်ခုတည်ဆောက်ပြီးဆိုရင် အဲဒီ Package အတွက် views တွေ ခွဲရေးချင်မှာပါ။အဲဒီအတွက် view ဖိုင်ကို src အောက်က views ဖိုင်ထဲမှာထည့်ထားပေမယ့် အပြင်က main မှာ အလုပ်လုပ်ဖို့အတွက် 'view:publish' ဆိုတဲ့ Artisan Command လေးသုံးပြီးတော့ 'app/views' ကို ပြောင်းနိုင်ပါတယ်။

	php artisan view:publish vendor/package

အပေါ်က command ကို run လိုက်ရင်တော့ package ထဲက views ဖိုင်တွေက 'app/views/packages' ထဲကို package နာမည်နဲ့ ဖိုင်တွေ ရောက်နေမှာပါ။packages နာမည်နဲ့ folder မရှိရင်လဲ သူ ့အလိုလို folder တည်ဆောက်သွားပါလိမ့်မယ်။ Package အတွက် Views ဖိုင် တွေကို publish လုပ်ပြီးရင်တော့ Packages အတွက် အဲဒီ viewsဖိုင်တွေက ဦးစားပေးအနေနဲ့ အလုပ်လုပ်သွားပါလိမ့်မယ်။

<a name="package-migrations"></a>
## Package Migrations

#### Creating Migrations For Workbench Packages
Packages တွေအတွက် Migration ကို Artisan command သုံးပြုပြီးအလွယ်တကူတည်ဆောက်နိုင်ပါတယ်။Package အတွက် migration တည်ဆောက်ဖို့အတွက် migrate လုပ်ချင်တဲ့ workbench ထဲဝင်ပြီး အောက်က ပုံစံအတိုင်း "--bench" ဆိုတဲ့ ဦးတည်ချက်လေးပေးပြီး တည်ဆောက်နိုင်ပါတယ်။

	php artisan migrate:make create_users_table --bench="vendor/package"

#### Running Migrations For Workbench Packages

	php artisan migrate --bench="vendor/package"

#### Running Migrations For An Installed Package

တကယ်လို့ ကိုယ်တည်ဆောက်လိုက်တဲ့ Package က ပြီးပြည့်စုံပြီး တခြားနေရာပြန်သွင်းတဲ့အခါတွင် database migrate လုပ်ဖို့အတွက် "--package"ဆိုတဲ့ ဦးတည်ချက် လေးသုံးပြီး အောက်ကပုံစံအတွက် Migrate လုပ်နိုင်ပါတယ်။

	php artisan migrate --package="vendor/package"

<a name="package-assets"></a>
## Package Assets

#### Moving Package Assets To Public
'packages' တွေမှာ 'Javascript, Css, images လို assets တွေပါကောင်းပါနိုင်ပါတယ်။ အဲဒီ assets တွေကို app မှ တဆင့်တန်းဆွဲခေါ်သုံးဖို့မဖြစ်နိုင်ပါဘူး  ။ အဲဒီအတွက် 'package' ထဲက assets တွေကို public အောက်ကို ပြောင်းထည့်ပေးဖို့လိုအပ်ပါတယ်။ အဲဒီအတွက် `asset:publish`  ကွန်မန်း ကို  အောက်ကအတိုင်း အသုံးပြုပြီး ပြောင်းထည့်ပေးနိုင်ပါတယ်။

	php artisan asset:publish

	php artisan asset:publish vendor/package

တကယ်လို တည်ဆောက်ထားတဲ့ 'package' က 'workbench' အောက်မှာပဲရှိသေးရင်တော့ ' --bench ' ကိုအောက်ပါအတိုင်းထပ်ထည့်ပြီးရေးပေးရပါတယ်။

	php artisan asset:publish --bench="vendor/package"

ဒီကွန်မန်းက package ထဲမှ assets တွေကို 'public/packages' ထဲကို သက်ဆိုင်ရင် package နဲ့ vendor နာမည်တွေအလိုက်ဖိုဒါတွေ အလိုလျောက်ဆောက်ပြီး သိမ်းဆည်းပေးသွားမှာပါ။ ဥပမာ 'workbench' အောက်မှာ 'usersape/kusod' ဆိုပြီး packages ဆောက်ထားရင် 'public/packages/userscape/kudos' ဆိုပြီး ရောက်သွားမှာပါ။ ဒီလိုလုပ်ခြင်းအားဖြင့် asset တွေနဲ့ပက်သက်ပြီး  လုံခြုံရေးဆိုင်ရာ အားသာချက်များ ရရှိနိုင်ပါတယ်။

<a name="publishing-packages"></a>
## Publishing Packages

ကိုယ်တည်ဆောက်ထားတဲ့'Package' က အသုံးပြုဖို ့အားလုံးပြင်ဆင်ပြီးသွားရင်တော့ [Packagist](http://packagist.org) ကို တခြားသူတွေပါသုံးပြုနိုင်အောင် တင်ထားပေးသင့်ပါတယ်။ တကယ်လို့ ကိုယ် တည်ဆောက်လိုက်တဲ့ 'package' က laravel အတွက်ပဲ သီးသန့်တည်ဆောက်ထားရင်တော့ 'composer.json' မှာ 'laravel' ဆိုပြီး tag ထည့်ပေးဖို့လိုအပ်ပါတယ်။

ထိုနည်းတူစွာဖြင့် Packagist တွင်တင်တဲ့အခါမှာ releases version တွေပါ tag အနေနဲ့တခါတည်း ထည့်ပေးသင့်ပါတယ် ။ Developers တွေက ကိုယ့်ရဲ့  packages ကို သုံးတဲ့အခါမှာ  'composer.json' မှာလိုအပ်တဲ့ version ကို ထည့်ပြီးသုံးပြုနိုင်သွားမှာပါ။တကယ်လို့ Stable Version မဟုတ်သေးရင်တော့ 'branch-alias' ဆိုတဲ့ composer keyword လေးသုံးပြီးသုံးပြုနိုင်ပါတယ်။

Package တစ်ခုတည်ဆောက်လိုက်ပြီးပြီဆိုရင်တော့ 'workbench' ကို အသုံးပြုပြီး web application တွေမှာ လိုအပ်သလို သုံးပြုပြီး ဆက်လုပ်သွားသင့်ပါတယ်။ အဲဒီနည်းကတော့ 'package' တစ်ခုကို published လုပ်လိုက်ပြီးသော်လည်း အဲဒီ package ကို ဆက်လက်ပြီး ကောင်းအောင်လုပ်ပေးနိုင်မှာပါ။

တစ်ချို ့သောအဖွဲ ့စည်းတွေကတော့ သူတို့ရဲ့  Packages တွေကို ၎င်းတို ့ရဲ့  Developers သုံးပြုဖို့အတွက် ကိုယ်ပိုင် repository တွေဆောက်ပြီး ထားလေ့ရှိပါတယ်။ သင်လဲ အဲဒီလိုလုပ်ဖို့ အတွက် စိတ်ကူးရှိရင်တော့ Composer Team က သတ်မှတ်ပေးထားတဲ့ [Satis](http://github.com/composer/satis) project ကို လေ့လာသင့်ပါတယ်။
