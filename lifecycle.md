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

After all of the service providers have been registered, your `app/start` files will be loaded. Lastly, your `app/routes.php` file will be loaded. Once your `routes.php` file has been loaded, the Request object is sent to the application so that it may be dispatched to a route.

So, let's summarize:

1. Request enters `public/index.php` file.
2. `bootstrap/start.php` file creates Application and detects environment.
3. Internal `framework/start.php` file configures settings and loads service providers.
4. Application `app/start` files are loaded.
5. Application `app/routes.php` file is loaded.
6. Request object sent to Application, which returns Response object.
7. Response object sent back to client.

Now that you have a good idea of how a request to a Laravel application is handled, let's take a closer look at "start" files!

<a name="start-files"></a>
## Start Files

Your application's start files are stored at `app/start`. By default, three are included with your application: `global.php`, `local.php`, and `artisan.php`. For more information about `artisan.php`, refer to the documentation on the [Artisan command line](/docs/commands#registering-commands).

The `global.php` start file contains a few basic items by default, such as the registration of the [Logger](/docs/errors) and the inclusion of your `app/filters.php` file. However, you are free to add anything to this file that you wish. It will be automatically included on _every_ request to your application, regardless of environment. The `local.php` file, on the other hand, is only called when the application is executing in the `local` environment. For more information on environments, check out the [configuration](/docs/configuration) documentation.

Of course, if you have other environments in addition to `local`, you may create start files for those environments as well. They will be automatically included when your application is running in that environment. So, for example, if you have a `development` environment configured in your `bootstrap/start.php` file, you may create a `app/start/development.php` file, which will be included when any requests enter the application in that environment.

### What To Place In Start Files

Start files serve as a simple place to place any "bootstrapping" code. For example, you could register a View composer, configure your logging preferences, set some PHP settings, etc. It's totally up to you. Of course, throwing all of your bootstrapping code into your start files can get messy. For large applications, or if you feel your start files are getting messy, consider moving some bootstrapping code into [service providers](/docs/ioc#service-providers).

<a name="application-events"></a>
## Application Events

#### Registering Application Events

You may also do pre and post request processing by registering `before`, `after`, `finish`, and `shutdown` application events:

	App::before(function($request)
	{
		//
	});

	App::after(function($request, $response)
	{
		//
	});

Listeners to these events will be run `before` and `after` each request to your application. These events can be helpful for global filtering or global modification of responses. You may register them in one of your `start` files or in a [service provider](/docs/ioc#service-providers).

You may also register a listener on the `matched` event, which is fired when an incoming request has been matched to a route but that route has not yet been executed:

	Route::matched(function($route, $request)
	{
		//
	});

The `finish` event is called after the response from your application has been sent back to the client. This is a good place to do any last minute processing your application requires. The `shutdown` event is called immediately after all of the `finish` event handlers finish processing, and is the last opportunity to do any work before the script terminates. Most likely, you will not have a need to use either of these events.