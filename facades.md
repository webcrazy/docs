# Facades

- [မိတ္ဆက္](#introduction)
- [ရွင္းလင္းခ်က္](#explanation)
- [လက္ေတြ့အသံုးခ်ျခင္း](#practical-usage)
- [ကိုယ္ပိုင္ Facades တည္ေဆာက္ျခင္း](#creating-facades)
- [Facades ေတြကို Mock ျပဳလုပ္ေပးျခင္း](#mocking-facades)
- [Facade Class ကိုကား](#facade-class-reference)

<a name="introduction"></a>
## မိတ္ဆက္

Facades (ဖေဆာ့စ္ ဟုအသံထြက္ပါ) က Application ရဲ႕ [IoC container](ioc.md) ထဲမွာရွိတဲ့ Class ေတြကို static ပံုစံမ်ိဳးသံုးႏိုင္ေအာင္ လုပ္ေပးပါတယ္။ Laravel မွာလဲ Facades ေတြအမ်ားႀကီးပါဝင္ၿပီးေတာ့ အဲဒီ Facade ေတြကိုလည္း သံုးဖူးပါလိမ့္မယ္။ သင္သံုးဖူးေပမယ့္လည္း သံုးဖူးမွန္းမသိျဖစ္ေနတက္ပါတယ္။ Laravel "facades" ေတြက Static Proxy ေတြအေနနဲ႔ ကူညီေပးပါတယ္။ ၄င္းက သာမာန္ Static method ေတြမဟုတ္ဘဲ ၊ ဖတ္/မွတ္လို႔ေကာင္းၿပီး ပိုၿပီးတိုေတာင္းတဲ့ Syntax ပံုစံေတြျဖစ္ေစတဲ့အျပင္ Test လုပ္လို႔အဆင္ေျပၿပီး ေျပာင္းလြယ္ျပင္လြယ္ျဖစ္ေစပါတယ္။

အခါအားေလ်ာက္စြာ သင့္ Application နဲ႔ Package ေတြ အတြက္ သင့္ကိုယ္ပိုင္ Facades ေတြတည္ေဆာက္ႏိုင္ပါတယ္။ ဒါ့ေၾကာင့္ ဒီ Class ေတြရဲ႕ အသံုးျပဳပံုေတြ နဲ႔ အယူအစေတြကို ေမႊေႏွာက္ၾကည့္ၾကရေအာင္။

> **မွတ္ခ်က္:** Facades ကိုမေလ့လာခင္ ၊ Laravel ရဲ႕ [IoC container](ioc.md) နဲ႔ေသခ်ာရင္းႏွီးေနဖို႔ အႀကံျပဳခ်င္ပါတယ္။

<a name="explanation"></a>
## ရွင္းလင္းခ်က္

Facade ဆိုတာ Class တစ္ခုျဖစ္ၿပီး Container ထဲက Object ကို ေခၚအသံုးျပဳခြင့္ေပးပါတယ္။ ဒီလိုေခၚသံုးႏိုင္တာ `Facade` class ေၾကာင့္ျဖစ္ပါတယ္။ Laravel ရဲ႕ Facade ေတြ နဲ႔ သင္ကိုယ္ပိုင္ေဆာက္ထားတဲ့ Facade ေတြအားလံုးဟာ `Facade` class ကို Extend ျပဳလုပ္ရပါတယ္။

သင့္ကိုယ္ပိုင္ Facade class ေဆာက္ေတာ့မယ္ဆိုရင္ `getFacadeAccessor` ဆိုတဲ့ method ကိုပဲ implement လုပ္ဖို႔လိုပါမယ္။ `getFacadeAccessor` က Container ထဲကေန ဘယ္ဟာကိုသံုးရမယ္လို႔ ဆံုးျဖတ္ေပးပါတယ္။ သင့္ကိုယ္ပိုင္ Facade ကေန Resolved လုပ္ၿပီးသား object ထဲကိုေရႊ႕ေျပာင္းဖို႔အတြက္ အေျခခံ `Facade` class မွာေတာ့ `__callStatic()` ဆိုတဲ့ magic-method ကိုသံုးထားပါတယ္။

ဒါ့ေၾကာင့္ သင့္အေနနဲ႔ `Cache::get` လိုမ်ိဳး Facade တစ္ခုကို ေခၚမယ္ဆိုရင္ Laravel က Cache manager class ကို IoC container ထဲကေနဆြဲထုတ္ၿပီး သူထဲက `get` method ကိုေခၚေပးပါတယ္။ နည္းပညာအေခၚအေဝၚအရဆိုရင္ေတာ Laravel Facades ေတြဆိုတာ Ioc container ေတြကို service locator တစ္ခုအေနနဲ႔အသံုးျပဳႏိုင္တဲ့ ေရး/ဖတ္/မွတ္ရလြယ္ကူေသာ syntax ျဖစ္ပါတယ္။

<a name="practical-usage"></a>
## လက္ေတြ႕အသံုးခ်ျခင္း

ေအာက္ကအတိုင္းဆိုရင္ ၊ Laravel cache system ကို ေခၚတာပါ။ သာမာန္အေပၚယံအတိုင္း ၾကည့္လိုက္မယ္ဆိုရင္ေတာ့ `Cache` class ထဲက `get` ဆိုတဲ့ static method တစ္ခုကို ေခၚလိုက္တယ္လို႔ထင္ရပါတယ္။

	$value = Cache::get('key');

ဒါေပမယ့္ `Illuminate\Support\Facades\Cache` class  ကိုၾကည့္လိုက္မယ္ဆိုရင္ `get` ဆိုတဲ့ static method လံုးဝမရွိပါဘူး

	class Cache extends Facade {

		/**
		 * Get the registered name of the component.
		 *
		 * @return string
		 */
		protected static function getFacadeAccessor() { return 'cache'; }

	}

Cache class က `Facade` class ကို extend လုပ္ထားၿပီး `getFacadeAccessor()` ဆိုတာပဲရွိပါတယ္။ အဲဒီ Method ရဲ႕တာဝန္က IoC နာမည္ကို return လုပ္ေပးယံုပါပဲ။

User က `Cache` facade ထဲက ဘယ္ static method ကိုမဆို သံုးလိုက္မယ္ဆိုတာနဲ႔ ၊ Laravel က IoC container ထဲကေန `cache` ကိုေခၚၿပီး ၊ ကိုယ္လိုခ်င္တဲ့ method (အခုအတိုင္းဆို `get`) ကို run ေပးပါတယ္။

ဒါ့ေၾကာင့္ ၊ ကၽြန္ေတာ္တို႔သံုးထားတဲ့ `Cache::get` ရဲ႕ ေနာက္ကြယ္မွာက ေအာက္ကအတိုင္းရွိေနပါမယ္။

	$value = $app->make('cache')->get('key');

<a name="creating-facades"></a>
## ကိုယ္ပိုင္ Facades တည္ေဆာက္ျခင္း

Creating a facade for your own application or package is simple. You only need 3 things:
ကိုယ့္ application (ဒါမွမဟုတ္) package အတြက္ ကိုယ္ပိုင္ facade ေဆာက္ရတာလြယ္ကူပါတယ္။ အဆင့္ ၃ ဆင့္ပဲလိုပါတယ္ :

- An IoC binding
- facade class တစ္ခု
- facade ကိုယ္ ေခၚမယ့္ Alia သတ္မွတ္ေပးရန္

ဥပမာတစ္ခုေလာက္ ၾကည့္ၾကပါမယ္။ ကၽြန္ေတာ္တို႔မွာ `PaymentGateway\Payment` ဆိုတဲ့ class တစ္ခုရွိမယ္ဆိုၾကပါစို႔

	namespace PaymentGateway;

	class Payment {

		public function process()
		{
			//
		}

	}

ဒီ class က `app/models` directory ထဲမွာျဖစ္ျဖစ္ (ဒါမွမဟုတ္) တစ္ျခား Composer က auto-load ျပဳလုပ္ႏုိင္တဲ့ မည္သည့္ေနရာတြင္မဆို တည္ရွိႏိုင္ပါတယ္။

IoC container ထဲအဲဒီ class ကို ထည့္ေပးဖို႔အတြက္ bind လုပ္ဖို႔လုိပါမယ္။

	App::bind('payment', function()
	{
		return new \PaymentGateway\Payment;
	});

ဒီ bind လုပ္ထားတာကို Register လုပ္ဖို႔အတြက္ အေကာင္းဆံုးနည္းကေတာ့ `PaymentServiceProvider` ဆိုၿပီး [service provider](ioc#service-providers.md) တစ္ခုေဆာက္ၿပီးေတာ့ အေပၚက bind လုပ္ထားတာကို `register` ဆိုတဲ့ method ထဲ ထည့္ေပးလိုက္တာပါ။ အခုေဆာက္ထားတဲ့ Service Provider ကို Laravel က load လုပ္ဖို႔ဆိုရင္ေတာ့ `app/config/app.php` ထဲမွာ သတ္မွတ္ေပးဖို႔လိုပါမယ္။

Next, we can create our own facade class:
ေနာက္တစ္ဆင့္မွာေတာ့ ကိုယ္ပိုင္ facade class ေဆာက္ႏိုင္ပါၿပီ -

	use Illuminate\Support\Facades\Facade;

	class Payment extends Facade {

		protected static function getFacadeAccessor() { return 'payment'; }

	}

ေနာက္ဆံုးအေနနဲ႔ ကၽြန္ေတာ္တို႔ရဲ႕ Facade ကို Alia (Shortcut) အေနနဲ႔ေခၚသံုးခ်င္တယ္ဆိုရင္ေတာ့ `app/config/app.php` ထဲက `aliases` array ထဲမွာ သတ္မွတ္ေပးရပါမယ္။ အခုဆိုရင္ေတာ့ `Payment` class ရဲ႕ `process` method ကို ေအာက္ကအတိုင္း လြယ္လြယ္ကူကူပဲ ေခၚႏိုင္ပါၿပီ-

	Payment::process();

### Aliases ေတြကို Auto-Load လုပ္တဲ့အခါ သတိထားစရာမ်ား

[PHP က type hint မသက္မွတ္ေပးထားတဲ့ class ေတြကို autload လုပ္ေပးမွာမဟုတ္တဲ့အတြက္](https://bugs.php.net/bug.php?id=39003)  `Aliases` array ထဲမွာ ရွိတဲ့ Class ေတြကို တစ္ခ်ိဳ႕ေသာ instance ေတြမွာ သံုးလို႔မရပါဘူး။ `\ServiceWrapper\ApiTimeoutException` ကို `ApiTimeoutException` လို႔ Alia လုပ္ထားလိုက္မယ္ဆိုရင္ `\ServiceWrapper` namespace ရဲ႕အျပင္ဖက္မွာ `catch(ApiTimeoutException $e)` လို႔ေခၚမယ္ဆိုရင္ thrown လုပ္လိုက္ေပမယ့္ ဘယ္ေတာ့မွ catch လုပ္လို႔မရပါဘူး။ ဒီလိုျပႆနာမ်ိဳးကိုပဲ Model ေတြမွာလဲ ႀကံဳေတြ႕ႏိုင္ပါတယ္။ တစ္ခုတည္းေသာ ေျဖရွင္းနည္းကေတာ့ Alias ေတြမသတ္မွတ္ဘဲ file ရဲ႕အေပၚဆံုးမွာ `use` ဆိုၿပီးသတ္မွတ္ၿပီးသံုးတာပါပဲ။


<a name="mocking-facades"></a>
## Facades ေတြကို Mock ျပဳလုပ္ေပးျခင္း
Facade ေတြ အဓိကရွိေနရျခင္းရဲ႕အေၾကာင္းရင္းကေတာ့ Test လြယ္လြယ္ကူကူလုပ္ႏုိင္ဖို႔ပဲျဖစ္ပါတယ္။ Mock လုပ္တဲ့အပိုင္းကိုေတာ့ [mocking facades](testing#mocking-facades.md) မွာ ျပည့္ျပည့္စံုစံု ေဖာ္ျပေပးထားပါတယ္။

<a name="facade-class-reference"></a>
## Facade Class ကိုကား

ေအာက္ကဇယားမွာေတာ့ ရွိသမွ် Facade ေတြနဲ႔ သူရဲ႕ေနာက္ကြယ္က class ေတြကို ေဖာ္ျပေပးထားပါတယ္။ API Documentation ထဲကို သက္ဆိုင္ရာ ေနရာလိုက္လဲ ခ်ိတ္ေပးထားပါတယ္။ [IoC binding](ioc.md) key ရွိတဲ့ Facade ေတြကိုလဲ သူ႕ key ေတြေရးေပးထားပါတယ္။

Facade  |  Class  |  IoC Binding
------------- | ------------- | -------------
App  |  [Illuminate\Foundation\Application](http://laravel.com/api/4.1/Illuminate/Foundation/Application.html)  | `app`
Artisan  |  [Illuminate\Console\Application](http://laravel.com/api/4.1/Illuminate/Console/Application.html)  |  `artisan`
Auth  |  [Illuminate\Auth\AuthManager](http://laravel.com/api/4.1/Illuminate/Auth/AuthManager.html)  |  `auth`
Auth (Instance)  |  [Illuminate\Auth\Guard](http://laravel.com/api/4.1/Illuminate/Auth/Guard.html)  |
Blade  |  [Illuminate\View\Compilers\BladeCompiler](http://laravel.com/api/4.1/Illuminate/View/Compilers/BladeCompiler.html)  |  `blade.compiler`
Cache  |  [Illuminate\Cache\Repository](http://laravel.com/api/4.1/Illuminate/Cache/Repository.html)  |  `cache`
Config  |  [Illuminate\Config\Repository](http://laravel.com/api/4.1/Illuminate/Config/Repository.html)  |  `config`
Cookie  |  [Illuminate\Cookie\CookieJar](http://laravel.com/api/4.1/Illuminate/Cookie/CookieJar.html)  |  `cookie`
Crypt  |  [Illuminate\Encryption\Encrypter](http://laravel.com/api/4.1/Illuminate/Encryption/Encrypter.html)  |  `encrypter`
DB  |  [Illuminate\Database\DatabaseManager](http://laravel.com/api/4.1/Illuminate/Database/DatabaseManager.html)  |  `db`
DB (Instance)  |  [Illuminate\Database\Connection](http://laravel.com/api/4.1/Illuminate/Database/Connection.html)  |
Event  |  [Illuminate\Events\Dispatcher](http://laravel.com/api/4.1/Illuminate/Events/Dispatcher.html)  |  `events`
File  |  [Illuminate\Filesystem\Filesystem](http://laravel.com/api/4.1/Illuminate/Filesystem/Filesystem.html)  |  `files`
Form  |  [Illuminate\Html\FormBuilder](http://laravel.com/api/4.1/Illuminate/Html/FormBuilder.html)  |  `form`
Hash  |  [Illuminate\Hashing\HasherInterface](http://laravel.com/api/4.1/Illuminate/Hashing/HasherInterface.html)  |  `hash`
HTML  |  [Illuminate\Html\HtmlBuilder](http://laravel.com/api/4.1/Illuminate/Html/HtmlBuilder.html)  |  `html`
Input  |  [Illuminate\Http\Request](http://laravel.com/api/4.1/Illuminate/Http/Request.html)  |  `request`
Lang  |  [Illuminate\Translation\Translator](http://laravel.com/api/4.1/Illuminate/Translation/Translator.html)  |  `translator`
Log  |  [Illuminate\Log\Writer](http://laravel.com/api/4.1/Illuminate/Log/Writer.html)  |  `log`
Mail  |  [Illuminate\Mail\Mailer](http://laravel.com/api/4.1/Illuminate/Mail/Mailer.html)  |  `mailer`
Paginator  |  [Illuminate\Pagination\Factory](http://laravel.com/api/4.1/Illuminate/Pagination/Factory.html)  |  `paginator`
Paginator (Instance)  |  [Illuminate\Pagination\Paginator](http://laravel.com/api/4.1/Illuminate/Pagination/Paginator.html)  |
Password  |  [Illuminate\Auth\Reminders\PasswordBroker](http://laravel.com/api/4.1/Illuminate/Auth/Reminders/PasswordBroker.html)  |  `auth.reminder`
Queue  |  [Illuminate\Queue\QueueManager](http://laravel.com/api/4.1/Illuminate/Queue/QueueManager.html)  |  `queue`
Queue (Instance) |  [Illuminate\Queue\QueueInterface](http://laravel.com/api/4.1/Illuminate/Queue/QueueInterface.html)  |
Queue (Base Class) |  [Illuminate\Queue\Queue](http://laravel.com/api/4.1/Illuminate/Queue/Queue.html)  |
Redirect  |  [Illuminate\Routing\Redirector](http://laravel.com/api/4.1/Illuminate/Routing/Redirector.html)  |  `redirect`
Redis  |  [Illuminate\Redis\Database](http://laravel.com/api/4.1/Illuminate/Redis/Database.html)  |  `redis`
Request  |  [Illuminate\Http\Request](http://laravel.com/api/4.1/Illuminate/Http/Request.html)  |  `request`
Response  |  [Illuminate\Support\Facades\Response](http://laravel.com/api/4.1/Illuminate/Support/Facades/Response.html)  |
Route  |  [Illuminate\Routing\Router](http://laravel.com/api/4.1/Illuminate/Routing/Router.html)  |  `router`
Schema  |  [Illuminate\Database\Schema\Blueprint](http://laravel.com/api/4.1/Illuminate/Database/Schema/Blueprint.html)  |
Session  |  [Illuminate\Session\SessionManager](http://laravel.com/api/4.1/Illuminate/Session/SessionManager.html)  |  `session`
Session (Instance)  |  [Illuminate\Session\Store](http://laravel.com/api/4.1/Illuminate/Session/Store.html)  |
SSH  |  [Illuminate\Remote\RemoteManager](http://laravel.com/api/4.1/Illuminate/Remote/RemoteManager.html)  |  `remote`
SSH (Instance)  |  [Illuminate\Remote\Connection](http://laravel.com/api/4.1/Illuminate/Remote/Connection.html)  |
URL  |  [Illuminate\Routing\UrlGenerator](http://laravel.com/api/4.1/Illuminate/Routing/UrlGenerator.html)  |  `url`
Validator  |  [Illuminate\Validation\Factory](http://laravel.com/api/4.1/Illuminate/Validation/Factory.html)  |  `validator`
Validator (Instance)  |  [Illuminate\Validation\Validator](http://laravel.com/api/4.1/Illuminate/Validation/Validator.html)
View  |  [Illuminate\View\Factory](http://laravel.com/api/4.1/Illuminate/View/Factory.html)  |  `view`
View (Instance)  |  [Illuminate\View\View](http://laravel.com/api/4.1/Illuminate/View/View.html)  |