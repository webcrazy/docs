# Localization

- [မိတ္ဆက္](#introduction)
- [Language Files](#language-files)
- [အေျခခံအသံုးျပဳျခင္း](#basic-usage)
- [Pluralization](#pluralization)
- [Validation Localization](#validation)
- [Overriding Package Language Files](#overriding-package-language-files)

<a name="introduction"></a>
## မိတ္ဆက္

Laravel မွာပါတဲ့ `Lang` class ဟာ languages ဖိုင္ေတြထဲမွာသတ္မွတ္ထားတဲ့ စကားစုေတြကို လြယ္ကူ အဆင္ေျပေသာ နည္းလမ္းေတြနဲ႔ လက္ခံေဆာင္ရြက္ေပးႏိုင္ပါတယ္။ သင့္ application အတြက္ ဘာသာစကားမ်ိဳးစံုကို လြယ္ကူစြာ အသံုးျပဳႏိုင္ေအာင္အေထာက္အပံ့ေပးထားပါတယ္။ 

<a name="language-files"></a>
## Language Files

`app/lang` လမ္းေၾကာင္းေအာက္မွာ ဘာသာစကား စကားစုေတြကို သိမ္းဆည္းပါတယ္။ အဲ့ဒီလမ္းေၾကာင္းေအာက္မွာေတာ့ သတ္မွတ္ခ်င္တဲ့ ဘာသာစကားတစ္ခုခ်င္းစီအတြက္ ဖိုဒါတစ္ခုခ်င္းစီ ေဆာက္ၿပီးအသံုးျပဳရမွာပါ။

	/app
		/lang
			/en
				messages.php
			/mm
				messages.php

#### Example Language File

ဘာသာစကားသတ္မွတ္ထားတဲ့ ဖိုင္ဆီကေန keyed strings ေတြပါတဲ့ array return ျပန္လာပါတယ္။ ဥပမာ -

	<?php

	return array(
		'welcome' => 'Welcome to our application'
	);

#### Changing The Default Language At Runtime

Application ရဲ့ ပံုမွန္ ဘာသာစကားကိုေတာ့ `app/config/app.php` configuration ဖိုင္ထဲမွာ သတ္မွတ္ထားပါတယ္။ ဘာသာစကားမ်ား တစ္ခုနဲ႔တစ္ခု ေျပာင္းလဲ အသံုးျပဳခ်င္ရင္ေတာ့ `App::setLocale` method ကိုအသံုးျပဳႏိုင္ပါတယ္။ 

	App::setLocale('mm');

#### Setting The Fallback Language

"fallback language" အတြက္လည္း ျပင္ဆင္ထားႏိုင္ပါတယ္။ "fallback language" ဆိုတာကေတာ့ လက္ရွိ သတ္မွတ္ထားတဲ့ ဘာသာစကား (language) ဖိုင္မွာ လိုအပ္ေနတဲ့ စကားစု (language line) မပါလာတဲ့ အေျခအေနမ်ိဳးမွာ အသံုးျပဳဖို႔အတြက္ျဖစ္ပါတယ္။ ပံုမွန္သတ္မွတ္ေနက်အတိုင္းပဲ "fallback language" ကို `app/config/app.php` configuration ဖိုင္ထဲမွာသတ္မွတ္ႏိုင္ပါတယ္။ 

	'fallback_locale' => 'en',

<a name="basic-usage"></a>
## Basic Usage

#### ဘာသာစကားသတ္မွတ္ထားေသာ ဖိုင္မွ စကားစုမ်ား ရယူျခင္း

	echo Lang::get('messages.welcome');

`get`method ထဲကို passed လုပ္ထားတဲ့ string ႏွစ္ခုထဲမွ ပထမတစ္ခုကေတာ့ ဘာသာစကား (language) သတ္မွတ္ထားတဲ့ ဖိုင္ရဲ့ အမည္ျဖစ္ျပီး၊ ဒုတိယ တစ္ခုကေတာ့ array ထဲမွာသတ္မွတ္ထား စကားစုေတြရဲ့ key ျဖစ္ပါတယ္။ 

> **သတိျပဳရန္**: အကယ္၍ `get` နဲ႔ ယူထားတဲ့ key အတြက္ စကားစုဟာ ရွိမေနဘူးဆိုရင္ေတာ့ key တစ္ခုပဲ return ျပန္လာပါလိမ့္မယ္။

`trans` ဆိုတဲ့ helper function ကိုလည္း အသံုးျပဳႏိုင္ပါတယ္။ အဲ့ဒီ function ကေတာ့ `Lang::get` ဆိုတဲ့ method ကိုပဲ နာမည္ေျပာင္းၿပီးထပ္လုပ္ထားတာပါ။ 

	echo trans('messages.welcome');

#### စကားစုမ်ား အစားထိုး ျပဳလုပ္ျခင္း

စကားစုေတြမွာ အစားထိုးဖို႔ စကားလံုးေတြအတြက္ place-holders လဲသတ္မွတ္ႏိုင္ပါေသးတယ္။

	'welcome' => 'Welcome, :name',

ၿပီးရင္ေတာ့ `Lang::get` method ရဲ့ ဒုတိယ argument မွာ အစားထိုးခ်င္တဲ့ စကားလံုးကို passing ေပးလိုက္ပါ။ 

	echo Lang::get('messages.welcome', array('name' => 'Dayle'));

#### Determine If A Language File Contains A Line

	if (Lang::has('messages.welcome'))
	{
		//
	}

<a name="pluralization"></a>
## Pluralization

Pluralization is a complex problem, as different languages have a variety of complex rules for pluralization. You may easily manage this in your language files. By using a "pipe" character, you may separate the singular and plural forms of a string:

	'apples' => 'There is one apple|There are many apples',

You may then use the `Lang::choice` method to retrieve the line:

	echo Lang::choice('messages.apples', 10);

You may also supply a locale argument to specify the language. For example, if you want to use the Russian (ru) language:

	echo Lang::choice('товар|товара|товаров', $count, array(), 'ru');

Since the Laravel translator is powered by the Symfony Translation component, you may also create more explicit pluralization rules easily:

	'apples' => '{0} There are none|[1,19] There are some|[20,Inf] There are many',


<a name="validation"></a>
## Validation

For localization for validation errors and messages, take a look at the <a href="/docs/validation#localization">documentation on Validation</a>.

<a name="overriding-package-language-files"></a>
## Overriding Package Language Files

Many packages ship with their own language lines. Instead of hacking the package's core files to tweak these lines, you may override them by placing files in the `app/lang/packages/{locale}/{package}` directory. So, for example, if you need to override the English language lines in `messages.php` for a package named `skyrim/hearthfire`, you would place a language file at: `app/lang/packages/en/hearthfire/messages.php`. In this file you would define only the language lines you wish to override. Any language lines you don't override will still be loaded from the package's language files.
