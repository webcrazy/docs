# Request Lifecycle

- [Overview](#overview)
- [Request Lifecycle](#request-lifecycle)
- [Start Files](#start-files)
- [Application Events](#application-events)

<a name="overview"></a>
## Overview

သင္ tools တစ္ခုကို တကယ္လက္ေတြ႕သံုးၿပီဆိုရင္ အဲ႕ဒီ tool က ဘယ္လိုအလုပ္လုပ္တယ္ဆိုတာကိုသိရင္ သင္ပိုၿပီး ယံုၾကည္မွူရွိလာပါလိမ္႕မယ္။ development tools ေတြရဲ႕ function ေတြဘယ္လိုအလုပ္လုပ္လဲသင္သိလာတဲ႕အခါမွာ သင္အဲဒါေတြကိုအသံုးျပဳတဲ႕အခါပိုၿပီးေတာ႕ အဆင္ေျပ ယံုၾကည္လာပါလိမ္႕မယ္။ ဒီ document ရဲ႕ အဓိကရည္ရြယ္ခ်က္က  Laravel Framework ဘယ္လိုအလုပ္လုပ္လဲဆိုတာကို ေကာင္းမြန္တဲ႕ hight-level overview တစ္ခုေပးဖို႕ပါ။ Framework အေၾကာင္း overview ေကာင္းေကာင္းသိသြားတဲ႕အခ်ိန္မွာ "magical" လုိ႕ထင္တာေတြနည္းသြားၿပီးေတာ႕ သင္ application တည္ေဆာက္ရာမွာပိုၿပီးေတာ႕ confident ရွိလာပါလိမ္႕မယ္။ Request Lifecycle  ရဲ႕ hight level overview ရဲ႕ျဖည္႕စြတ္ခ်က္မွာေတာ႕ "start" files နဲ႕ application events ကိုပါ cover လုပ္ထားပါတယ္။

တကယ္လို႕သင္႕အေနနဲ႕ terms အားလံုးကိုနားမလည္ဘူးဆိုရင္စိတ္ထဲမထားပါနဲ႕ ။ အေျခခံအားျဖင္႕ ဘယ္လိုလုပ္ေနလဲဆိုတာကို ႀကိဳးစားၾကည္႕ၿပီး documencation ရဲ႕တစ္ျခား အပိုင္းေတြကို ဖတ္ၿပီး သင္႕ပိုၿပီးသိလာပါလိမ္႕မယ္။

<a name="request-lifecycle"></a>
## Request Lifecycle

သင္႔ application ရဲ႕ Request အားလံုးကို `public/index.php` ဆီကို redirect လုပ္ပါတယ္။  Apache ကိုအသံုးျပဳတဲ႔အခါမွာ `.htaccess` files က request အားလံုးကို `index.php` စီ redirect လုပ္ေပးပါတယ္။ အဲ႔ဒီ႔ကေနစၿပီးေတာ႔ Laravel က request ေတြကိုလက္ခံတာ  response ေတြကို client ဆီျပန္ေပးတာေတြကို handles လုပ္ေပးသြားတာပါ၊ Laravel ရဲ႕  bootstrap general idea က အသံုးဝင္ပါလိမ္႔မယ္ ၊ ဒါေၾကာင္႔ကြ်န္ေတာ္တို႔အခု ေအာက္မွာရွင္းျပပါ႔မယ္။

Laravel ရဲ႕ bootstrap process ေလ႔လာတဲ႔ေနရာမွာ **Service Providers**  ကအဓိကျဖစ္ပါတယ္။ Services Providers ေတြရဲ႕  Lists ေတြကို  `app/config/app.php` ကိုဖြင္႔ၿပီး `providers` arrays မွာရွာေတြ႔ႏိုင္ပါတယ္။ ဒီ providers ေတြက Laravel ကို bootstrap လုပ္ဖို႔ အဓိက ျဖစ္ပါတယ္။ သင္႔ `index.php` file ကို request တစ္ခုလုပ္လိုက္တာနဲ႔ `bootstrap/start.php` က load လုပ္ပါမယ္။ အဲ႔ဒီ႔ file က Laravel `Application` object ေတြကို create လုပ္ပါ႔မယ္၊ ေနာက္ [Ioc container](/docs/ioc) ကိုလည္း serve လုပ္ပါတယ္။

`Application` ရဲ႕ object ေတြကို create လုပ္ၿပီးၿပီဆိုရင္ေတာ႔ project ရဲ႕ paths အခ်ိဳ႕ကိုစတင္ၿပီး တပ္ဆင္ပါ႔မယ္၊ ေနာက္ [environment detection](/docs/configuration#environment-configuration) ေတြကိုဆက္လက္လုပ္ေဆာင္ပါတယ္။ ဒါၿပီးရင္ေတာ႔ Laravel bootstrap script ေတြကို call လုပ္ပါ႔မယ္။ Laravel source ရဲ႕တြင္းပိုင္း File ေတြထိ live ျဖစ္သြားၿပီဆိုရင္ သင္႕ရဲ႕ configuration ေပၚမူတည္ၿပီး setting ေတြကို တပ္ဆင္ပါလိမ္႔မယ္။ timezoneတို႔၊ error reporting နဲ႔ အျခား လိုအပ္တဲ႔ setting ေတြေပါ႔။ ဒါေပမယ္႕ သင့္ Application လိုအပ္တဲ့ Service Provider မ်ားအားလုံးကို register လုပ္ထားဖို႔ကလည္း အျခား configuration ေတြအားလုံးလိုပဲ အေရးႀကီးပါတယ္။

Simple service providers only have one method: `register`. This `register` method is called when the service provider is registered with the application object via the application's own `register` method. Within this method, service providers register things with the [IoC container](/docs/ioc). Essentially, each service provider binds one or more [closures](http://us3.php.net/manual/en/functions.anonymous.php) into the container, which allows you to access those bound services within your application. So, for example, the `QueueServiceProvider` registers closures that resolve the various [Queue](/docs/queues) related classes. Of course, service providers may be used for any bootstrapping task, not just registering things with the IoC container. A service provider may register event listeners, view composers, Artisan commands, and more.

Service Providers ေတြအကုန္လံုး register လုပ္ၿပီးရင္ သင္႕ရဲ႕ `app/start` file loadလုပ္ပါလိမ္႔မယ္။ ေနာက္ဆံုးအေနနဲ႔သင္႔ရဲ႕ `app/routes.php` ကို load လုပ္ပါ႔မယ္။ ေနာက္တစ္ခါသင္႕ application ရဲ႕ `route.php` load လုပ္ၿပီးရင္ request objects ေတြသင္႔ application ဆီကိုပို႔ပါမယ္၊ ဒါက route ေတြကိုေစလႊတ္ျခင္းျဖစ္ပါလိမ္႔မယ္။

ကဲဒါဆိုရင္အတိုခ်ဳပ္လိုက္ၾကရေအာင္:

1.  Request ေတြက `public/index.php` file ဆီကို ဝင္ေရာက္လာတယ္
2.  `bootstrap/start.php` file က  Application ကို create လုပ္ၿပီးေတာ႔ environment ကို detect လုပ္တယ္
3. အတြင္းပိုင္း `framework/start.php` file က setting ေတြကို configure လုပ္တယ္ေနာက္ေတာ႔ service providers ေတြကို load လုပ္တယ္
4. Application ရဲ႕ `app/start` file ေတြ load လုပ္တယ္
5. Application ရဲ႕ `app/route` file load လုပ္တယ္
6. Request objects ေတြကို application ဆီကို ပို႔တယ္၊ အဲဒီ႔ကေန object ေတြ Response ျပန္လာတယ္
7. ျပန္လာတဲ႔ Response ေတြကို client ဆီကိုျပန္ပို႔တယ္

အခု Laravel က application ရဲ႕ Request  ေတြကိုဘယ္လိုေျဖရွင္းသြားတယ္ဆိုတာသိၿပီးသြားၿပီ `start`  file အေၾကာင္းကို နည္းနည္းအေသးစိတ္ဆက္ေလ႔လာလိုက္ၾကေအာင္။

<a name="start-files"></a>
## Start Files

သင္႔ Application ရဲ႕ Start Files ေတြက `app/start` ထဲမွာပါ။ Default အရဆိုရင္ သင္႔ application ရဲ႕ `global.php`,`local.php` နဲ႔ `artisan.php` တို႔ပါဝင္ပါတယ္။ artisan အေၾကာင္းအေသးစိတ္သိလိုတယ္ဆိုရင္ေတာ႔ [Artisan command line](/docs/command#registering-commands) ကိုဖတ္ဖို႔ညႊန္းပရေစ။

Default အရ`global.php` မွာ basic items ေတြပါဝင္ပါတယ္၊ registration ေတြရဲ႕ [logger](/docs/errors) တို႔... ေနာက္  `app/filters.php` တို႔လည္းပါဝင္ပါေသးတယ္။ ဒါေပမယ္႔လည္း ဒီ `global.php` မွာ သင္ႀကိဳက္တဲ႔ File ေတြထက္ထည္႔လို႔ရပါတယ္။ တကယ္လို႔ထက္ထည္႔လိုက္ရင္ အဲ႔ဒီ႔ File က  သင္႔ application ရဲ႕ request တိုင္းမွာ auto ပါဝင္ေနမွာပါ။ `local.php` file ကေတာ႔ `local` environment မွာမွ call လုပ္မွာပါ၊
Environment configuration အေၾကာင္းအေသးစိတ္သိလိုတယ္ဆိုရင္ေတာ႔  [configuration](/docs/configuration) ကိုဖတ္ဖို႔ ညႊန္းပရေစ။

ဟုတ္တာေပါ႕ သင္႕မွာ `local` environment တစ္ခုအျပင္အျခား environment တစ္ခုရွိတယ္ဆိုရင္ အဲ႕ဒီ႕ environment အတြက္ start file တစ္ခု create လုပ္ရမွာေပါ႕။ ေနာက္အဲ႕ဒီ႕ start မွာပါတာေတြက သင္အဲ႕ဒီ႕ environment မွာအလုပ္လုပ္တဲ႕အခါမွာ အလိုလိုပါလာမွပါ။ ဒါေၾကာင့္ ..... ဥပမာ- သင္႕မွာ `developemt` environment တစ္ခုရွၿပီးေတာ႕ `bootstrap/start.php` မွာ configre လုပ္ၿပီးၿပီဆိုရင္ သင္အေနနဲ႕ `app/start/development.php` file တစ္ခု create လုပ္ထားတယ္ဆိုရင္ သင္႕ application က အဲ႕ဒီ႕ environment မွာ run ရင္ `app/start/development.php` ကအလိုလိုပါဝင္ေနမွာပါ။

### What To Place In Start Files

Start files ကရိုးရိုးေနရာပါဘဲ...."bootstrapping" code ေတြထည္႕ရတဲ႕ေနရာေပါ႕ ။ ဥပမာ၊  View composerတို႕၊ logging preferences ေတြကို configure လုပ္တာတို႕ PHP Setting ေတြေျပာင္းတာ..နဲ႕အျခားလိုအပ္တာေတြကို သင္႕ register လုပ္ခ်င္ရင္လဲလုပ္ႏိုင္ပါတယ္။ ဘာေတြကို register လုပ္ခ်င္လဲဆိုတာကေတာ႕ သင္႕အေပၚမွာဘဲမူတည္ပါတယ္။ ဟုတ္တာေပါ႕ "bootstrapping code" ေတြအကုန္လံုးကိုသင္႕ရဲ႕ start file ထဲကိုထည္႕လိုက္ရင္  သင္႕ရဲ႕ start file ေတြရွုပ္ပြကုန္မွာေပါ႕။Application နည္းနည္းႀကီးလာၿပီဆိုရင္ ဒါမွမဟုတ္ သင္႕ရဲ႕ start files နည္းနည္းရွုပ္လာၿပီလို႕ခံစားရၿပီဆိုရင္... bootstrapping code ေတြကို [service providers](/docs/ioc#service-providers) ေတြဆီေရႊ႕လိုက္ပါ။

<a name="application-events"></a>
## Application Events

#### Registering Application Events

သင့္အေနနဲ႕ pre request ၊ post request ေတြစနစ္တစ္က်သြားဖို႕အတြက္ before, after, finish, and shutdown application events ေတြကိုသံုးရပါ႕မယ္

	App::before(function($request)
	{
		//
	});

	App::after(function($request, $response)
	{
		//
	});

အဲ႕ဒီ႕ event ေတြေပၚမူတည္ၿပီးေတာ႕ `before` နဲ႕  `after` request ေတြကို တစ္လွည္႕ဆီသင္႕ application က run မွာပါ။ ဒီ events ေတြက global filtering နဲ႕ global modification ေတြရဲ႕ responses ေတြအတြက္အလြန္အသံုးဝင္ပါလိမ္႕မယ္။ သင္႕အေနနဲ႕ အဲ႕ဒါေတြကို `start` files ဒါမွမဟုတ္ [service provider](/docs/ioc#service-providers) မွာ register လုပ္ထားႏိုင္ပါတယ္။

`matched` event ေပၚက listener တစ္ခုကိုလည္း register လုပ္ႏိုင္ပါတယ္၊ request အဝင္တစ္ခုနဲ႕ route တစ္ခုနဲ႕  matched ျဖစ္သြားၿပီဆိုရင္ အဲဒါက fired လုပ္လိုက္တယ္ ဒါေပမယ္႔ အဲ႕ဒီ႕ route က excute ျဖစ္မသြားပါဘူး။

	Route::matched(function($route, $request)
	{
		//
	});

သင္ application က client ဆီကို sent လုပ္ၿပီးသြားၿပီဆိုရင္  ေနာက္ဆံုး `finish` event ကို call လုပ္ပါတယ္။ သင္ application ရဲ႕ေနာက္ဆံုးမိနစ္လိုအပ္ခ်က္ေတြကိုလုပ္ဖို႕ဒါကေနရာေကာင္းတစ္ခုပါ။ `finish` event handlers က အားလံုးၿပီးသြားၿပီဆိုရင္ `shutdown` event ကိုခ်က္ခ်င္းေခၚလိုက္ပါတယ္၊ ဒါကေနာက္ဆံုး script အလုပ္မလုပ္ခင္  လုပ္စရာရွိတာလုပ္ထားဖို႕ ေနာက္ဆံုးအခြင္႕အေရးပါ။