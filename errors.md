# Errors & Logging

- [Configuration](#configuration)
- [Error ေတြကို ထိန္းခ်ဳပ္ျခင္း](#handling-errors)
- [HTTP Exceptions](#http-exceptions)
- [404 Errors မ်ားကို ထိန္းခ်ဳပ္ျခင္း](#handling-404-errors)
- [Logging](#logging)

<a name="configuration"></a>
## Configuration

Application ရဲ႕ Logging Handler ကို `app/start/global.php` [start file](lifecycle#start-files) ထဲမွာ Registered လုပ္ထားပါတယ္။ နဂိုအတိုင္းကေတာ့ File တစ္ဖိုင္ထဲကိုပဲ အသံုးျပဳခိုင္းထားပါတယ္။ သို႔ေသာ္လည္း သင့္စိတ္ႀကိဳက္ ျပင္ဆင္ႏိုင္ပါတယ္။ Laravel က နာမည္ႀကီး  Loggin Library တစ္ခုျဖစ္တဲ့ [Monolog](https://github.com/Seldaek/monolog.md) ကိုသံုးထားတဲ့အတြက္  Monolog မွာပါဝင္တဲ့ အမ်ိဳးအမ်ိဳးေသာ handler မ်ားကိုအသံုးျပဳႏိုင္ပါတယ္။

ဥပမာ - Log File တစ္ခုတည္းမထားဘဲ ေန႔စဥ္အလိုက္ Log file ေတြခြဲထားခ်င္တယ္ဆိုရင္ ၊ start file မွာေအာက္ကအတိုင္း ေျပာင္းေရးလိုက္လို႔ရပါတယ္

	$logFile = 'laravel.log';

	Log::useDailyFiles(storage_path().'/logs/'.$logFile);

### Error အေသးစိတ္

အရင္အတိုင္းဆို ၊ Error ရဲ႕အေသးစိတ္ကို ေဖာ္ျပပါလိမ့္မယ္။ ဆိုလိုတာက Application မွာ Error တစ္ခုတက္ေနမယ္ဆိုရင္ ၊ အဲဒီ Error ရဲ႕အေသးစိတ္နဲ႔ ၊ အဲဒီ Error နဲ႔ပတ္သက္ေနတဲ့ ဖိုင္ေတြနဲ႔ အေသးစိတ္အခ်က္အလက္ေတြကို ေဖာ္ျပေပးပါလိမ့္မယ္။ ဒီ Error အေသးစိတ္ျပတဲ့ Feature ကို ပိတ္ခ်င္တယ္ဆိုရင္ေတာ့ `app/config/app.php` ထဲမွာ `debug` option ကို `false` လို႔ လုပ္ေပးလိုက္ရံုပါပဲ။

> **မွတ္ခ်က္:** Application တကယ္ Run ၿပီဆိုရင္ေတာ့ ဒီ Feature ကို ပိတ္ထားဖို႔အတြက္ အႀကံျပဳခ်င္ပါတယ္။

<a name="handling-errors"></a>
## Error ေတြကို ထိန္းခ်ဳပ္ျခင္း

Default အေနနဲ႔က `app/start/global.php` ထဲမွာ Exception ေတြတိုင္းအတြက္ Error Handler တစ္ခုပါရွိပါတယ္။

	App::error(function(Exception $exception)
	{
		Log::error($exception);
	});

ဒါကေတာ့ အရမ္းရိုးရွင္းတဲ့ Error Handler တစ္ခုပဲျဖစ္ပါတယ္။ တကယ္လို႔ လိုအပ္မယ္ဆိုရင္ေတာ့ ရႈပ္ေထြးတဲ့ Handler ေတြကို သတ္မွတ္ေပးႏိုင္ပါတယ္။ Exception ေတြရဲ႕နာမည္ေပၚမူတည္ၿပီး Handler ေတြကိုေခၚပါတယ္။ ဥပမာေပးရမယ္ဆိုရင္ ၊ `RunetimeException` အတြက္ပဲ handle လုပ္တဲ့ handler ကို ေအာက္ကအတိုင္း ေရးရပါမယ္။

	App::error(function(RuntimeException $exception)
	{
		// Handle the exception...
	});

Exception Handler တစ္ခုက Response တစ္ခု Return ျပန္မယ္ဆိုရင္ အဲဒီ Response ကိုပဲ Browser မွာေဖာ္ျပမွာျဖစ္ၿပီး ၊ တစ္ျခားေသာ Error Handler ေတြကိုေခၚမွာမဟုတ္ပါဘူး

	App::error(function(InvalidUserException $exception)
	{
		Log::error($exception);

		return 'Sorry! Something is wrong with this account!';
	});

PHP fatal error ျဖစ္တဲ့အခ်ိန္ကို ေစာင့္ဖမ္းခ်င္ရင္ေတာ့ `App::fatal` method ကိုသံုးရပါမယ္

	App::fatal(function($exception)
	{
		//
	});

Handler ေတြအမ်ားႀကီးရွိတယ္ဆိုရင္ေတာ့ General ၾကတဲ့ Handler ေတြမွ အေသးစိတ္က်တဲ့ handler ေတြအထိအစဥ္လိုက္ သတ္မွတ္ေပးသင့္ပါတယ္။ ဥပမာ - `Exception` ေတြအားလံုးကို handler လုပ္တဲ့ handler ေတြကိုအရင္ဆံုး သတ္မွတ္ပါ၊ ၿပီးမွ `Illuminate\Encryption\DecryptException` လိုမ်ိဳး အေသးစိတ္ exception ကိုေတာ့ ေနာက္မွသတ္မွတ္ေပးပါ။

### Error Handlers ေတြကို ဘယ္မွာေရးရမလဲ

Error Handler ေတြကို သတ္မွတ္ေပးရမယ့္ ေနရာဆိုၿပီးမသတ္မွတ္ထားပါဘူး။ ဒါနဲ႔ပတ္သက္ၿပီးလို႔ကေတာ့ Laravel က လြတ္လပ္ခြင့္ေပးထားပါတယ္။ နည္းလမ္းတစ္ခုကေတာ့ `start/global.php` ထဲမွာ ထည့္ေရးႏိုင္ပါတယ္။ အဲဒီေနရာက Application စစ Run ခ်င္း Code ေတြထည့္ေရးသင့္တဲ့ အေကာင္းဆံုးေနရာပါဘဲ။ အဲဒီဖိုင္ထဲမွာ တစ္ျခားေရးထားတာေတြ မ်ားေနတယ္ဆိုရင္ေတာ့ `app/errors.php` ဆိုၿပီး ဖိုင္ေဆာက္လိုက္ၿပီးေတာ့ `start/global.php` ထဲမွာ `require` လုပ္ၿပီးေရးလို႔ရပါတယ္။ တတိယနည္းလမ္းကေတာ့ Handler ေတြအားလံုးကို ထိန္းခ်ဳပ္ေပးမယ့္ [service provider](ioc#service-providers.md) တစ္ခု ဖန္းတီးလိုက္ပါ။ ေနာက္ထပ္တစ္ေခါက္ထပ္ေျပာခ်င္ပါတယ္ ၊ အေျဖမွန္ဆိုၿပီးရယ္လို႔ မရွိပါဘူး။ သင္နဲ႔အကိုက္ညီဆံုးပံုစံအသံုးျပဳပါ။

<a name="http-exceptions"></a>
## HTTP Exceptions

အခ်ိဳ႕ Exception ေတြက Server ကေနၿပီးေတာ့ HTTP error code ေတြေဖာ္ျပေပးပါတယ္။ ဥပမာ - "page not found" error (404), "unauthorized error" (401) သို႔မဟုတ္ 500 error လိုမ်ိဳးျဖစ္ပါတယ္။ ဒီလို Response အတြက္ေတြဆို ေအာက္ကအတိုင္းသံုးပါ။

	App::abort(404);

ကိုယ္ပိုင္ message နဲ႔ response လုပ္ေပးခ်င္လဲရပါတယ္။

	App::abort(403, 'Unauthorized action.');

အဲဒီ method ကို Application တစ္ခုလံုးရဲ႕ request ေတြအားလံုးမွာ အသံုးျပဳမွာပါ။

<a name="handling-404-errors"></a>
## 404 Errors မ်ားကို ထိန္းခ်ဳပ္ျခင္း

"404 Not Found" error ေတြအားလံုးကို ထိန္းခ်ဳပ္ေပးမယ့္ handler ကိုလဲ ကိုယ့္စိတ္ႀကိဳက္ပံုစံနဲ႔ အလြယ္တကူသတ္မွတ္ေပးႏိုင္ပါတယ္။

	App::missing(function($exception)
	{
		return Response::view('errors.missing', array(), 404);
	});

<a name="logging"></a>
## Logging

အရမ္းလန္းတဲ့ [Monolog](http://github.com/seldaek/monolog) library ကို သံုးရပိုလြယ္ေအာင္လို႔ Laravel logging အေထာက္အပံ့ေတြက ကူညီေပးပါတယ္။ Default အေနနဲ႔ Log File တစ္ခုတည္းကိုပဲ သံုးေအာင္လို႔ သတ္မွတ္ေပးထားပါတယ္။ အဲဒီဖိုင္က `app/storage/logs/laravel.log` ျဖစ္ပါတယ္။ Log file ထဲကို ေအာက္ကအတိုင္း Log ေတြရိုက္ထည့္ႏုိင္ပါတယ္

	Log::info('This is some useful information.');

	Log::warning('Something could be going wrong.');

	Log::error('Something is really going wrong.');

Logger အေနနဲ႔  [RFC 5424](http://tools.ietf.org/html/rfc5424) ကသတ္မွတ္ေပးထားတဲ့အတိုင္း **debug**, **info**, **notice**, **warning**, **error**, **critical**, and **alert** ဆိုၿပီး level ၇ ခုရွိပါတယ္။


Array ပံုစံနဲ႔လည္း ထည့္ေပးလိုက္လို႔ရပါတယ္

	Log::info('Log message', array('context' => 'Other helpful information'));

Monolog မွာ တစ္ျခား handler ေတြ အမ်ားႀကီးပါဝင္ပါတယ္။ လိုအပ္ရင္ Laravel သံုးထားတဲံ Monolog instance ကိုသံုးႏိုင္ပါတယ္။

	$monolog = Log::getMonolog();

Log ဖိုင္ထဲကို ထည့္သမွ် message ေတြအားလံုးကို ေစာင့္ဖမ္းဖို႔အတြက္လဲ event ေရးထားလို႔ရပါတယ္။

#### Registering A Log Listener

	Log::listen(function($level, $message, $context)
	{
		//
	});
