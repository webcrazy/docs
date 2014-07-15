# Localization

- [မိတ္ဆက္](#introduction)
- [Language Files](#language-files)
- [အေျခခံအသံုးျပဳျခင္း](#basic-usage)
- [အမ်ားကိန္းျပဳျခင္း](#pluralization)
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
## အေျခခံအသံုးျပဳနည္း

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
## အမ်ားကိန္းျပဳလုပ္ျခင္း

အမ်ားကိန္းျပဳလုပ္ျခင္းကိစၥ ဟာ နည္းနည္းေတာ့ ရႈပ္ေထြးပါတယ္။ မတူညီတဲ့ languages ေတြအတြက္ မတူညီတဲ့ အမ်ားကိန္းျပဳလုပ္နည္းေတြ ရွိပါတယ္။ Laravel မွာေတာ့ အမ်ားကိန္းျပဳလုပ္ဖို႔အတြက္ "pipe" character ကို အနည္းကိန္းအတြက္ ျပဳလုပ္ထားတဲ့ စကားစုနဲ႔ အမ်ားကိန္းအတြက္သတ္မွတ္မဲ့ စကားစုၾကားမွာ ခံျပီးအသံုးျပဳႏိုင္ပါတယ္။ အမ်ားကိန္းျပဳလုပ္တာကိုနားလည္ဖို႔အတြက္ ေအာက္ပါ ဥပမာကိုၾကည့္ပါ။ 

	'apples' => 'There is one apple|There are many apples',

စကားစုေတြကို ယူသံုးဖို႔အတြက္ေတာ့ `Lang::choice` mehtod ကိုအသံုးျပဳႏိုင္ပါတယ္။

	echo Lang::choice('messages.apples', 10);

Local အတြက္သတ္မွတ္ထားတဲ့ စကားလံုးကိုလဲ သတ္မွတ္ေပးလိုက္ႏိုင္ပါတယ္။ ဥပမာ - Russian (ru) language ကိုအသံုးျပဳခ်င္တယ္ဆိုရင္ -

	echo Lang::choice('товар|товара|товаров', $count, array(), 'ru');

Laravel translator ဟာ Symfony Translation component ကိုအသံုးျပဳထားတဲ့အတြက္ေၾကာင့္ သင့္အေနနဲ႔ ပိုၿပီး ရွင္းလင္းတိက်တဲ့ အမ်ားကိန္းျပဳနည္း သတ္မွတ္ခ်က္ကို ျပဳလုပ္ႏိုင္ပါတယ္။ 

	'apples' => '{0} There are none|[1,19] There are some|[20,Inf] There are many',


<a name="validation"></a>
## Validation

Localization အတြက္ အသံုးျပဳႏိုင္တဲ့ validation errors နဲ႔ messages ေတြကိုေတာ့ အသံုးျပဳနည္း လမ္းညႊန္ရဲ့<a href="/docs/validation#localization">Validation</a> မွာ ၾကည့္ႏိုင္ပါတယ္။

<a name="overriding-package-language-files"></a>
## Overriding Package Language Files

Laravel နဲ႔အတူ တြဲစပ္အသံုးျပဳႏိုင္တဲ့ packages ေတြမွာ သူတို႔ရဲ့ ကုိယ္ပိုင္ ဘာသာစကားဖိုင္ေတြတစ္ပါတည္းပါလာပါတယ္။ အဲ့ဒီဖိုင္ေတြကို change ဖို႔ packages ေတြရဲ့ မူရင္းဖိုင္ေတြကို သြားျပင္ေနမဲ့အစား `app/lang/packages/{locale}/{package}` လမ္းေၾကာင္းေအာက္ကေနတစ္ဆင့္ override ျပဳလုပ္ႏိုင္ပါတယ္။ ဥပမာ `skyrim/hearthfire` လို႔ အမည္တြင္တဲ့ package အတြက္ `messages.php` ဖိုင္ထဲမွာရွိတဲ့ English Language ကို override လုပ္ခ်င္တယ္ဆိုရင္ `app/lang/packages/en/hearthfire/messages.php` ဖိုင္ကေနတစ္ဆင့္ ျပဳလုပ္ႏိုင္ပါတယ္။ Override လုပ္ဖို႔လိုအပ္တဲ့ စကားစုေတြကိုပဲ အဲ့ဒီဖိုင္ထဲမွာသတ္မွတ္ထားဖို႔လိုအပ္ပါတယ္။ က်န္တဲ့စကားစုအားလံုးကိုေတာ့ package ရဲ့ language ဖိုင္ထဲက ေနပဲ အလုပ္လုပ္သြားမွာျဖစ္ပါတယ္။ 
