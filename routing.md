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

`Illuminate\Http\Request` instance ကနေပြီးတော့ current route parameters တွေကို access လုပ်နိုင်ပါတယ်။ Request လုပ်လိုက်တဲ့

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

Named routes allow you to conveniently generate URLs or redirects for a specific route. You may specify a name for a route with the `as` array key:

	Route::get('user/profile', ['as' => 'profile', function()
	{
		//
	}]);

You may also specify route names for controller actions:

	Route::get('user/profile', [
        'as' => 'profile', 'uses' => 'UserController@showProfile'
	]);

Now, you may use the route's name when generating URLs or redirects:

	$url = route('profile');

	$redirect = redirect()->route('profile');

The `currentRouteName` method returns the name of the route handling the current request:

	$name = Route::currentRouteName();

<a name="route-groups"></a>
## လမ်းကြောင်း အုပ်စုများ

Sometimes you may need to apply filters to a group of routes. Instead of specifying the filter on each route, you may use a route group:

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

You may use the `namespace` parameter within your `group` array to specify the namespace for all controllers within the group:

	Route::group(['namespace' => 'Admin'], function()
	{
		//
	});

> **Note:** By default, the `RouteServiceProvider` includes your `routes.php` file within a namespace group, allowing you to register controller routes without specifying the full namespace.

<a name="sub-domain-routing"></a>
### Sub-Domain များ အသုံးပြု ၍ လမ်းကြောင်းပေးခြင်း

Laravel routes also handle wildcard sub-domains, and will pass your wildcard parameters from the domain:

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

A group of routes may be prefixed by using the `prefix` option in the attributes array of a group:

	Route::group(['prefix' => 'admin'], function()
	{

		Route::get('user', function()
		{
			//
		});

	});

<a name="route-model-binding"></a>
## လမ်းကြောင်း နှင့် Model ချိတ်တွယ်ခြင်း

Laravel model binding provides a convenient way to inject class instances into your routes. For example, instead of injecting a user's ID, you can inject the entire User class instance that matches the given ID.

First, use the router's `model` method to specify the class for a given parameter. You should define your model bindings in the `RouteServiceProvider::boot` method:

#### Binding A Parameter To A Model 

	public function boot(Router $router)
	{
		parent::boot($router);

		$router->model('user', 'App\User');
	}

Next, define a route that contains a `{user}` parameter:

	Route::get('profile/{user}', function(App\User $user)
	{
		//
	});

Since we have bound the `{user}` parameter to the `App\User` model, a `User` instance will be injected into the route. So, for example, a request to `profile/1` will inject the `User` instance which has an ID of 1.

> **Note:** If a matching model instance is not found in the database, a 404 error will be thrown.

If you wish to specify your own "not found" behavior, pass a Closure as the third argument to the `model` method:

	Route::model('user', 'User', function()
	{
		throw new NotFoundHttpException;
	});

If you wish to use your own resolution logic, you should use the `Router::bind` method. The Closure you pass to the `bind` method will receive the value of the URI segment, and should return an instance of the class you want to be injected into the route:

	Route::bind('user', function($value)
	{
		return User::where('name', $value)->first();
	});

<a name="throwing-404-errors"></a>
## 404 error များ ထုတ်လွှတ်ခြင်း

There are two ways to manually trigger a 404 error from a route. First, you may use the `abort` helper:

	abort(404);

The `abort` helper simply throws a `Symfony\Component\HttpFoundation\Exception\HttpException` with the specified status code.

Secondly, you may manually throw an instance of `Symfony\Component\HttpKernel\Exception\NotFoundHttpException`.

More information on handling 404 exceptions and using custom responses for these errors may be found in the [errors](/docs/5.0/errors#http-exceptions) section of the documentation.
