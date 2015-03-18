# HTTP Routing

- [Routing အခြေခံ](#basic-routing)
- [CSRF ကာကွယ်မှု](#csrf-protection)
- [Method Spoofing](#method-spoofing)
- [Route Parameters](#route-parameters)
- [Named Routes](#named-routes)
- [Route Groups](#route-groups)
- [Route Model Binding](#route-model-binding)
- [404 error များ ထုတ်လွှတ်ခြင်း](#throwing-404-errors)

<a name="basic-routing"></a>
## Routing အခြေခံ

သင့် application ရဲ့ routes တော်တော်များများကို `app/Http/routes.php` မှာသတ်မှတ်ရပါလိမ့်မယ်၊ အဲ့ဒီဖိုင်ကို `App\Providers\routes.php` class က load လုပ်ပါလိမ့်မယ်။ Laravel ရဲ့ အခြေခံ အကျဆုံး routes တွေကို URI တစ်ခုနဲ့ `Closure` တစ်ခုရှိရုံနဲ့ တည်ဆောက်လို့ရပါမယ်။

#### အခြေခံ GET Route

	Route::get('/', function()
	{
		return 'Hello World';
	});

#### အခြားအခြေခံ routes များ

	Route::post('foo/bar', function()
	{
		return 'Hello World';
	});

	Route::put('foo/bar', function()
	{
		//
	});

	Route::delete('foo/bar', function()
	{
		//
	});

#### တစ်ခုထက်ပိုသော method များအတွက် route တစ်ခု register လုပ်ခြင်း

	Route::match(['get', 'post'], '/', function()
	{
		return 'Hello World';
	});

#### Routes တစ်ခုအားမည်သည့် HTTP method ဖြင့်မဆိုလက်ခံနိုင်ရန်အတွက် Registering လုပ်ခြင်း

	Route::any('foo', function()
	{
		return 'Hello World';
	});

URL ကနေပြီးတော့ route ကိုသင့်အနေနဲ့ခဏခဏ generate ထုတ်ဖို့လိုပါလိမ့်မယ်၊ အဲ့လိုအချိန်မှာဆိုလို့ရှိရင် သင့်အနေနဲ့ `url` helper ကိုအသုံးပြုနိုင်ပါတယ်။

	$url = url('foo');

<a name="csrf-protection"></a>
## CSRF ကာကွယ်မှု

Laravel ကသင့်အပလီကေးရှင်းကို [cross-site request forgeries](http://en.wikipedia.org/wiki/Cross-site_request_forgery) ကနေကာကွယ်ဖို့လွယ်ကူစွာပြုလုပ်ပေးထားပါတယ်။  Cross-site request forgeries ဆိုတာက authenticated ပြုလုပ်ပြီးသား user လိုအယောင်ဆောင်ပြီး တရားမဝင် command များလုပ်ဆောင်နိုင်တဲ့ အန္တရာယ်ပေးတတ်တဲ့တိုက်ခိုက်မှူပြုလုပ်နိုင်တဲ့ attacking တစ်ခုဖြစ်ပါတယ်။

Laravel က CRF "token" တွေကို application က manage လုပ်တဲ့ active user တိုင်းအတွက် auto generate ထုတ်ပေးပါတယ်။ အဲ့ဒီ့ token က authenticated ဖြစ်တဲ့ user က application ဆီလုပ်တဲ့ request ဟုတ်မဟုတ်ကို verify လုပ်လိုက်ပါတယ်။

#### Form တစ်ခုအတွင်းမှာ CSRF Token ထည့်သွင်းခြင်း

    <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">

ဒါပေါ့  Blade [templating engine](/docs/5.0/templates) သုံးရင်လည်းရတာပေါ့

	<input type="hidden" name="_token" value="{{ csrf_token() }}">

သင့်အနေနဲ့ CSRF token ကို POST, PUT, နဲ့ DELETE requests တွေမှာ  CSRF token ကို manually verify လုပ်စရာမလိုပါဘူး။ `VerifyCsrfToken`[HTTP middleware](/docs/5.0/middleware)  က request input ထဲက token နဲ့ session ထဲမှာ store လုပ်ထားတဲ့ token နဲ့ကိုက်ညီမှူရှိမရှိကို verify လုပ်ပေးပါလိမ့်မယ်။

ဒါ့အပြင် CSRF Token ကို "POST" parameter မှာကြည့်မယ်ဆိုလို့ရှိရင် , middleware က `X-XSRF-TOKEN` request header ကိုပါ check တာကိုတွေ့ရပါ့မယ်၊ အဲ့ဒါကများသောအားဖြင့် JavaScript framework တွေမှာအသုံးများတာတွေ့ရပါလိမ့်မယ်။

<a name="method-spoofing"></a>
## Method လှည့်စားမှုများ

HTML Form တွေက `PUT` ဒါမှမဟုတ် `DELETE` action တွေကို support မလုပ်ပါဘူး။ ဒါကြောင့် `PUT` တို့ `DELETE` rouets တွေကို define လုပ်တဲ့အချိန်မှာ routes တွေက HTML form တွေကိုခေါ်ပြီးအလုပ်လုပ်ပါတယ်၊ ဒါကြောင့် hidden `_method` field တွေကို form မှာထည့်ပေးရပါ့မယ်။

`_method` field value နဲ့ပို့လိုက်တာတွေကို HTTP request method အဖြစ်အသုံးပြုသွားတာဖြစ်ပါတယ်။ဉပမာအားဖြင့်

	<form action="/foo/bar" method="POST">
		<input type="hidden" name="_method" value="PUT">
    	<input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
    </form>

<a name="route-parameters"></a>
## Route Parameters များ

သင့်အနေနဲ့ သင့် route အတွင်းမှာရှိတဲ့ URI request တွေရဲ့ segments တွေကို capture လုပ်နိုင်ပါတယ်

#### အခြေခံ Route Parameter များ

	Route::get('user/{id}', function($id)
	{
		return 'User '.$id;
	});

#### မလုပ်မနေရ မဟုတ်သော Route Parameters များ

	Route::get('user/{name?}', function($name = null)
	{
		return $name;
	});

#### မလုပ်မနေရ မဟုတ်သော parameters များနှင့် Default Value 

	Route::get('user/{name?}', function($name = 'John')
	{
		return $name;
	});

#### Regular Expression များဖြင့် လမ်းကြောင်းထိန်းကွပ်ကိန်းများအား ကန့်သတ်ခြင်း

	Route::get('user/{name}', function($name)
	{
		//
	})
	->where('name', '[A-Za-z]+');

	Route::get('user/{id}', function($id)
	{
		//
	})
	->where('id', '[0-9]+');

#### Where အကန့်အသတ်များအား Array အဖြစ်ဖြင့် ပေးပို့ခြင်း

	Route::get('user/{id}/{name}', function($id, $name)
	{
		//
	})
	->where(['id' => '[0-9]+', 'name' => '[a-z]+'])

#### Global Patterns သတ်မှတ်ခြင်း

သင့်အနေနဲ့ route parameter တစ်ခုကို ပေးထားတဲ့ regular expression ကိုအမြဲတမ်း constrained ဖြစ်စေချင်တယ်ဆိုရင် သင့်အနေနဲ့ `pattern` method ကိုအသုံးပြုသင့်ပါတယ်။ သင့်အနေနဲ့ ဒီ pattern ကို define လုပ်တဲ့အချိန်မှာ `RouteServiceProvider` မတိုင်ခင်မှာ သတ်မှတ် create လုပ်သင့်ပါတယ်။

	$router->pattern('id', '[0-9]+');

သင့် pattern ကိုသတ်မှတ်ပြီးသွားပြီဆိုလို့ရှိရင် အဲ့ဒီ့ pattern က အဲ့ဒီ့ parameter ကိုသုံးထားတဲ့ route အားလုံးကို apply ဖြစ်ပါတယ်

	Route::get('user/{id}', function($id)
	{
		// Only called if {id} is numeric.
	});

#### Route Parameter Value တစ်ခုကို ရယူခြင်း

သင့်အနေနဲ့ route parameter value တစ်ခုကို route တစ်ခုရဲ့အပြင်ဘက်ကနေခေါ်ချင်ရင် `input` method ကိုသုံးပါ

	if ($route->input('id') == 1)
	{
		//
	}

You may also access the current route parameters via the `Illuminate\Http\Request` instance. The request instance for the current request may be accessed via the `Request` facade, or by type-hinting the `Illuminate\Http\Request` where dependencies are injected:

`Illuminate\Http\Request` instance ကနေပြီးတော့ current route parameters တွေကို access လုပ်နိုင်ပါတယ်။ လက်ရှိ Request ရဲ့ Instance ကို `Request` facade ကနေရနိုင်သလို `Illuminate\Http\Request` ကို Type-hinting ပေးခြင်းဖြင့်လည်း ရနိုင်ပါတယ။

	use Illuminate\Http\Request;

	Route::get('user/{id}', function(Request $request, $id)
	{
		if ($request->route('id'))
		{
			//
		}
	});

<a name="named-routes"></a>
## အမည်ရှိ လမ်းကြောင်းများ

အမည်ပေးထားတဲ့ Route တွေကို URL တွေကို ထုတ်တဲ့အခါမှာပဲဖြစ်ဖြစ် Route တစ်ခုကနေ နောက်တစ်ခုကို ညွှန်းတဲ့အခါမှာ လွယ်လွယ်ကူကူသုံးနိုင်ပါတယ်။ Route ကိုနာမည်သတ်မှတ်ပေးဖို့အတွက် `as` array key ကို အောက်ကအတိုင်းသုံးပေးရပါမယ။

	Route::get('user/profile', ['as' => 'profile', function()
	{
		//
	}]);

Controller action တွေအတွက်လဲ Route နာမည်တွေသတ်မှတ်ပေးလို့ရပါတယ်

	Route::get('user/profile', [
        'as' => 'profile', 'uses' => 'UserController@showProfile'
	]);

URL တွေ (သို့မဟုတ်) Redirect လုပ်တဲ့အခါ Route ရဲ့ နာမည်ကိုသုံးလို့ရပါတယ်

	$url = route('profile');

	$redirect = redirect()->route('profile');

`currentRouteName` method ကိုအောက်ကအတိုင်း သုံးပြီးတော့ လက်ရှိ Request ရဲ့ Route နာမည်ကိုထုတ်ယူလို့ရပါတယ်။

	$name = Route::currentRouteName();

<a name="route-groups"></a>
## လမ်းကြောင်း အုပ်စုများ

တစ်ခါတစ်ရံမှာ Routes အုပ်စုတစ်ခုလုံးကို Filter လုပ်ချင်တဲ့အခါမျိုးလဲ ရှိတက်ပါတယ်။ Route တစ်ခုချင်းစီကို Filter တွေလိုက်သတ်မှတ်မည့်အစား Route Group ကိုသုံးလို့ရပါတယ်။

	Route::group(['before' => 'auth'], function()
	{
		Route::get('/', function()
		{
			// Has Auth Filter
		});

		Route::get('user/profile', function()
		{
			// Has Auth Filter
		});
	});

`group` array ထဲမှာ `namespace` parameter ကိုသုံးပြီး Controller တွေအကုန်လုံးအတွက် Namespace သတ်မှတ်ပေးနိုင်ပါတယ်။

	Route::group(['namespace' => 'Admin'], function()
	{
		//
	});

> **မှတ်ချက်** ပုံမှန်အားဖြင့်တော့ `RouteServiceProvider` က namespace group ထဲမှာ `routes.php` ဖိုင်ကို ထည့်ပေးထားလို့ Controller routes တွေကို Register လုပ်တဲ့အခါ namespace အပြည့်အစုံကို ဖော်ပြပေးဖို့မလိုပါဘူး။

<a name="sub-domain-routing"></a>
### Sub-Domain များ အသုံးပြု ၍ လမ်းကြောင်းပေးခြင်း
Latavel routes တွေက wildcard sub-domains တွေကိုလဲ လုပ်ဆောင်ပေးနိုင်ပြီးတော့ domain ကနေပြီး wildcard parameter တွေကို ရယူပေးပါတယ်။

#### Sub-domain လမ်းကြောင်းများ မှတ်ပုံတင်ခြင်း

	Route::group(['domain' => '{account}.myapp.com'], function()
	{

		Route::get('user/{id}', function($account, $id)
		{
			//
		});

	});

<a name="route-prefixing"></a>
### လမ်းကြောင်းရှေ့ ဆွယ်ပေးခြင်း

Routes group တစ်ခုကို `prefix` option နဲ့အောက်ကအတိုင်း prefix ခံလို့ရပါတယ်။

	Route::group(['prefix' => 'admin'], function()
	{

		Route::get('user', function()
		{
			//
		});

	});

<a name="route-model-binding"></a>
## လမ်းကြောင်း နှင့် Model ချိတ်တွယ်ခြင်း

Routes တွေထဲကို Class instance တွေ ထိုးထည့်ဖို့အတွက် Laravel model binding ကလွယ်လွယ်ကူကူဖြစ်အောင် လုပ်ပေးပါတယ်။ ဥပမာ user ID ကို ထိုးထည့်မည့်အစား အဲ့ဒီ့ User id နဲ့ကိုက်ညီတဲ့ User class တစ်ခုလုံးကို ထည့်ပေးလိုက်လို့ရပါတယ်။

ပထမဦးဆုံး router ရဲ့ `model` method ကို ပေးထားတဲ့ Parameter အတွက် Class ကို သတ်မှတ်ဖို့အတွက်သုံးနိုင်ပါတယ်။ model binding တွေကို `RouteServiceProvider::boot` method နဲ့ သတ်မှတ်ပေးပါ။

#### Binding A Parameter To A Model 

	public function boot(Router $router)
	{
		parent::boot($router);

		$router->model('user', 'App\User');
	}

နောက်တစ်ဆင့်အနေနဲ့ `{user}` parameter ပါတဲ့ Route ကို အောက်ကအတိုင်းသတ်မှတ်ပါ။

	Route::get('profile/{user}', function(App\User $user)
	{
		//
	});

`{user}` parameter ကို `App\User` model ထဲမှာ တွဲပေးလိုက်တဲ့အတွက် ၊ `User` instance အနေနဲ့ Route ထဲကို ထိုးထည့်ပေးပါလိမ့်မယ်။ ဒီတော့ ၊ ဥပမာ  ID 1 ရှိတဲ့ `profile/1` Request က `User` ရဲ့ Instance ထဲကို ထိုးထည့်ပါမယ်။

> **မှတ်ချက်** ကိုက်ညီထားတဲ့ Model instance ကို ရှာလို့မတွေဘူးဆိုရင် 404 error ပြပါလိမ့်မယ်။

သီးသန့် `not found` ပုံစံလုပ်ပေးချင်ရင်တော့ `model` method ထဲကို Third argument အနေနဲ့ Closure ပုံစံမျိုးဖော်ပြပေးရပါမယ်။

	Route::model('user', 'User', function()
	{
		throw new NotFoundHttpException;
	});

ကိုယ်ပိုင် Resolution logic သုံးချင်တဲ့အခါ `Router::bind` method ကိုသုံးသင့်ပါတယ်။ `bind` method ကို ထည့်ပေးလိုက်တဲ့ Closure အနေနဲ့ URI segment ရဲ့ Value ကို လက်ခံရရှိပါလိမ့်မယ်။ ပြီးတော့ class ရဲ့ instance တစ်ခုကို return ပြန်သင့်ပါတယ်။

	Route::bind('user', function($value)
	{
		return User::where('name', $value)->first();
	});

<a name="throwing-404-errors"></a>
## 404 error များ ထုတ်လွှတ်ခြင်း

Route ကနေ 404 error ကို manually ဖမ်းဖို့အတွက် နည်းလမ်း ၂ခု ရှိပါတယ်။ ပထမတစ်ခုကတော့ `abort` helper ကိုသုံးပါ။

	abort(404);

`abort` helper က သတ်ဆိုင်ရာ status code နဲ့အတူ `Symfony\Component\HttpFoundation\Exception\HttpException` ကို throw လုပ်ပါတယ်။

ဒုတိယနည်းလမ်းကတော့ ၊ `Symfony\Component\HttpKernel\Exception\NotFoundHttpException` `Symfony\Component\HttpKernel\Exception\NotFoundHttpException`ကို manually throw လုပ်ဖို့ပဲ ဖြစ်ပါတယ်။

404 exception တွေကိုထိန်းချုပ်ဖို့အတွက် ပြည့်ပြည့်စုံစုံသိဖို့ [errors](/docs/5.0/errors#http-exceptions) ဆိုတဲ့ အပိုင်းမှာ လေ့လာနိုင်ပါတယ်။