# HTTP Controllers များအကြောင်း

- [မိတ်ဆက်](#introduction)
- [Controllers အခြေခံ](#basic-controllers)
- [Controller Middleware များ](#controller-middleware)
- [သွယ်ဝိုက် Controllers](#implicit-controllers)
- [RESTful Resource Controller များ](#restful-resource-controllers)
- [Dependency Injection နှင့် Controller များ](#dependency-injection-and-controllers)
- [Route Caching](#route-caching)

<a name="introduction"></a>
## မိတ်ဆက်

သင့်အနေနဲ့ Request handling logic တွေအကုန်လုံးကို `routes.php` ထဲမှာအကုန် define လုပ်မယ့်အစား Controller classes တွေထဲမှာ organize လုပ်ချင်မှာပေါ့။  ဆက်စပ်နေတဲ့ HTTP request Handling logic တွေကို Controller တွေက Group လုပ်ထားနိုင်ပါတယ်။ Controllers တွေက `app/Http/Controllers` directory ထဲမှာရှိပါတယ်။

<a name="basic-controllers"></a>
## Controllers အခြေခံ

အခြေခံအားဖြင့် Controller Class တစ်ခုရဲ့ ပုံစံက အောက်ပါအတိုင်းရေးသားပါတယ်:

	<?php namespace App\Http\Controllers;

	use App\Http\Controllers\Controller;

	class UserController extends Controller {

		/**
		 * Show the profile for the given user.
		 *
		 * @param  int  $id
		 * @return Response
		 */
		public function showProfile($id)
		{
			return view('user.profile', ['user' => User::findOrFail($id)]);
		}

	}

ကျွန်တော်တို့ အဲ့ဒီ့ controller action ကိုအောက်ဖော်ပြပါအတိုင်း route လုပ်နိုင်ပါတယ်

	Route::get('user/{id}', 'UserController@showProfile');

> **မှတ်ချက်**  Controllers တွေအကုန်လုံး Base controller class ကို extend လုပ်သင့်ပါတယ်

#### Controllers နှင့် Namespaces

ကျွန်တော်တို့ Full Controller namespace တစ်ခုလုံးဖော်ပြဖို့မလိုဘူးဆိုတာသိထားဖို့အလွန်အရေးကြီးပါတယ်၊  `App\Http\Controllers` namespace "root" ၏ class name ၏အပိုင်းမှာသာလိုတာပါ။ default အနေနဲ့ `RouteServiceProvider` ကနေ root controller namespace ပါတဲ့ route group ထဲကမှ `routes.php` file ကို load လုပ်ပါလိမ့်မယ်။

သင့် Controller တွေကို nest ဒါမှမဟုတ် organize လုပ်ဖို့ PHP namespaces ထဲကမှ `App\Http\AdminController` directory ရွေးချယ်ခဲ့တယ်ဆိုရင်သတ်မှတ်ထားတဲ့ class name နဲ့သတ်ဆိုင်တဲ့ `App\Http\Controllers` root namespace ကိုဘဲရိုးရှင်းစွာသုံးလိုက်ပါ။ ဒါကြောင့် သင့် controller class က `App\Http\Controllers\Photos\AdminControllers`  ဆိုရင် သင့်ရဲ့ route ကိုအောက်ဖော်ပြပါအတိုင်း register လုပ်သင့်ပါတယ်

	Route::get('foo', 'Photos\AdminController@method');

#### Controller Route အမည်ပေးခြင်း

သင့်အနေနဲ့ Closure routes တွေလိုဘဲ controller routes တွေကိုသတ်မှတ်ချင်တယ်ဆိုရင်

	Route::get('foo', ['uses' => 'FooController@method', 'as' => 'name']);

#### URLs မှ Controller Action တွေဆီသို့

URL ကနေပြီးတော့ Controller action တွေကို generate လုပ်ချင်တယ်ဆိုရင်တော့ `action` helper method ကိုအသုံးပြုလိုက်ပါ

	$url = action('App\Http\Controllers\FooController@method');

သင့်ရဲ့ controller ကို namespace မှ Class name relative ကိုဘဲသုံးပြီးတော့   URL ကနေ controller action ကို generate လုပ်ချင်တယ်ဆိုရင်:

	URL::setRootControllerNamespace('App\Http\Controllers');

	$url = action('FooController@method');

သင့်အနေနဲ့ Controller action name ကို access လုပ်ချင်တယ်ဆိုရင်တော့ `currentRouteAction` method ကို အသုံးပြုနိုင်ပါတယ်:

	$action = Route::currentRouteAction();

<a name="controller-middleware"></a>
## Controller Middleware များ

Controller routes တွေမှာ [Middleware](/docs/5.0/middleware) တွေကိုအောက်ဖော်ပြပါအတိုင်းသတ်မှတ်နိုင်ပါတယ်

	Route::get('profile', [
		'middleware' => 'auth',
		'uses' => 'UserController@showProfile'
	]);

နောက်တစ်နည်းအနေနဲ့ Controller constructor တွေမှာလည်းအောက်ဖော်ပြပါတိုင်းသတ်မှတ်နိုင်ပါတယ်

	class UserController extends Controller {

		/**
		 * Instantiate a new UserController instance.
		 */
		public function __construct()
		{
			$this->middleware('auth');

			$this->middleware('log', ['only' => ['fooAction', 'barAction']]);

			$this->middleware('subscribed', ['except' => ['fooAction', 'barAction']]);
		}

	}

<a name="implicit-controllers"></a>
## သွယ်ဝိုက် Controller များ

Laravel မှာ Controller တစ်ခုကနေပြီးတော့ action တွေအားလုံးကို  Route တစ်ခုထဲကနေပြီးတော့ define လုပ်နိုင်ပါတယ်။ ပထမဆုံး route ကို `Route::controller` method သုံးပြီးတော့ define လုပ်လိုက်ပါ:

	Route::controller('users', 'UserController');

`controller` method က argument နှစ်ခုလက်ခံပါတယ်။  ပထမတစ်ခုက Controller Handle လုပ်တဲ့ base URI ဖြစ်ပါတယ်၊ ဒုတိယကတော့ controller class name ဖြစ်ပါတယ်။ သင့် Controller ကို methods တွေပေါင်းထည့်ပါ၊ HTTP 	verb နှင့်အတူ prefixed လုပ်ခဲ့ပါ

	class UserController extends BaseController {

		public function getIndex()
		{
			//
		}

		public function postProfile()
		{
			//
		}

		public function anyLogin()
		{
			//
		}

	}

`index` methods တွေက Controller က Handle လုပ်တဲ့ root URI တွေကို respond လုပ်ပါလိမ့်မယ်၊ ဘယ်သူကလုပ်မှာလဲဆိုရင် `users` တွေကလုပ်မှာဘဲဖြစ်ပါတယ်။

သင့် controller action တွေမှာ စကားလုံးနှစ်ခုပါတယ်ဆိုရင် သင့် action name ကို accept လုပ်ချင်တယ်ဆိုရင် URI ကနေပြီးတော့ "dash" syntax နဲ့ခေါ်ပေးရပါ့မယ်: ဉပမာအနေနဲ့ အောက်ဖော်ပြပါ `UserController` က `user/admin-profile` URI ကို respond လုပ်ပါလိမ့်မယ်

	public function getAdminProfile() {}

<a name="restful-resource-controllers"></a>
## RESTful Resource Controller များ

Resource controllers တွေက RESTful controllers တွေဖန်တီးဖို့အလွယ်ကူဆုံးဖြစ်အောင်လုပ်ဆောင်ပေးပါတယ်။ ဉပမာအနေနဲ့ သင့် application မှာ "photos"  stored လုပ်ထားတဲ့ controller တစ်ခု create လုပ်ချင်တယ်ဆိုရင် `make:controller` Artisan command သုံးပြီးတော့ အဲ့ဒီ့ controller ကို ဖန်တီးနိုင်ပါတယ်:

	php artisan make:controller PhotoController

နောက် resourceful route ကို register လုပ်လိုက်ပါ:

	Route::resource('photo', 'PhotoController');

ဒီ Single Route ကြေညာထားမှူက multiple routes ဖြေရှင်းရန်အတွက်ဖန်တီးထားပြီးတော့ Restful action photo resource  တွေကို handle လုပ်သွားပါတယ်။ ဘယ်လိုမျိုးလည်းဆိုရင် generate လုပ်လိုက်တဲ့ controller က action တစ်ခုချင်းဆီအတွက်stubb လုပ်ထားတဲ့ methods တွေရှိပြီးသားပါ၊ နောက်ဘယ် URI တွေနဲ့ verbs တွေက ဘာတွေကို handle လုပ်မလဲဆိုတာရောပေါ့။

#### Resource Controller မှ Actions တွေဖြေရှင်းပုံ

Verb      | Path                        | Action       | Route Name
----------|-----------------------------|--------------|---------------------
GET       | /resource                   | index        | resource.index
GET       | /resource/create            | create       | resource.create
POST      | /resource                   | store        | resource.store
GET       | /resource/{resource}        | show         | resource.show
GET       | /resource/{resource}/edit   | edit         | resource.edit
PUT/PATCH | /resource/{resource}        | update       | resource.update
DELETE    | /resource/{resource}        | destroy      | resource.destroy

#### Resource Routes တွေကို Customize လုပ်ခြင်း

နောက်ထက်အနေနဲ့ actions တွေရဲ့ subset တွေကို route မှာသတ်မှတ်နိုင်ပါတယ်:

	Route::resource('photo', 'PhotoController',
					['only' => ['index', 'show']]);

	Route::resource('photo', 'PhotoController',
					['except' => ['create', 'store', 'update', 'destroy']]);

default အနေနဲ့ကတော့ resource controllers actions တွေက route name တစ်ခုရှိပါ့မယ် သို့ပေမယ့်လည်း အဲ့ဒီ့အမည်တွေကို `names` array pass ပြီးတော့ သင့်ကိုယ်ပိုင် options တွေနဲ့ override လုပ်နိုင်ပါတယ်:

	Route::resource('photo', 'PhotoController',
					['names' => ['create' => 'photo.build']]);

#### Nested Resource Controller များကို Handle လုပ်ခြင်း

resource controller တွေကို "nest" လုပ်ရန်အတွက် "dot" အမှတ်အသားကို route ကြေငြာတဲ့အချိန်မှာအသုံးပြုနိုင်ပါတယ်:

	Route::resource('photos.comments', 'PhotoCommentController');

အထက်ဖော်ပြပါ route က "nested" resource အဖြစ် register လုပ်ပါလိမ့်မယ်... အဲ့ဒါကို `photos/{photos}/comments/{comments}` ဆိုပြီးတော့ URL ကနေ access လုပ်ရပါလိမ့်မယ်။

	class PhotoCommentController extends Controller {

		/**
		 * Show the specified photo comment.
		 *
		 * @param  int  $photoId
		 * @param  int  $commentId
		 * @return Response
		 */
		public function show($photoId, $commentId)
		{
			//
		}

	}

#### Resource Controller တွေမှာ Routes တွေထက်ထည့်ခြင်း

Default resource controller တွေမှာ နောက်ထက် route တွေထက်ထည့်ချင်တယ်ဆိုရင် `Route::resource` မခေါ်ခင်မှာ သင်ထက်ထည့်ချင်တဲ့ routes တွေကို ကြေငြာသင့်ပါတယ်:

	Route::get('photos/popular');

	Route::resource('photos', 'PhotoController');

<a name="dependency-injection-and-controllers"></a>
## Dependency Injection နှင့် Controller များ

#### Constructor Injection

Laravel [service container](/docs/5.0/container) တွေက Laravel controllers တွေကို resolve လုပ်ဖို့ရာအတွက်အသုံးပြုရပါတယ်။ Result တစ်ခုအနေနဲ့ မည်သည့် dependencie မဆို type-hint လုပ်နိုင်ပြီးတော့ သင့် controller ကလည်းအဲ့ဒီ့ constructor တွေကိုလိုအပ်ပါလိမ့်မယ် :

	<?php namespace App\Http\Controllers;

	use Illuminate\Routing\Controller;
	use App\Repositories\UserRepository;

	class UserController extends Controller {

		/**
		 * The user repository instance.
		 */
		protected $users;

		/**
		 * Create a new controller instance.
		 *
		 * @param  UserRepository  $users
		 * @return void
		 */
		public function __construct(UserRepository $users)
		{
			$this->users = $users;
		}

	}

ဒါပေါ့ သင့်အနေနဲ့ မည်သည့် [laravel contract](/docs/5.0/contracts) ကိုမဆို type-hint လုပ်နိုင်ပါတယ်။ container ကအဲ့ဒါကို resolve လုပ်နိုင်တယ်ဆိုရင်သင် type-hint နိုင်ပါပြီ။

#### Method Injection

constructor injection တွေကိုထက်ပေါင်းရလျှင် သင့် controller ၏ methods တွေကိုလည်းဘဲ သင် type-hint dependencies လုပ်ချင်ပါလိမ့်မယ်။ ဉပမာအနေနဲ့ ကျွန်တော်တို့ method တစ်ခုပေါ်မှာ `Request` instacne တစ်ခု type-hint လုပ်လိုက်ကြရအောင်

	<?php namespace App\Http\Controllers;

	use Illuminate\Http\Request;
	use Illuminate\Routing\Controller;

	class UserController extends Controller {

		/**
		 * Store a new user.
		 *
		 * @param  Request  $request
		 * @return Response
		 */
		public function store(Request $request)
		{
			$name = $request->input('name');

			//
		}

	}

သင့် controller method က route parameter က input ကို expect ဖြစ်ပြီးတော့ သင့် တစ်ခြား dependencies တွေပြီးတဲ့အခါ route arguments တွေကို ရိုးရိုးဘဲ list လုပ်လိုက်ပါ:

	<?php namespace App\Http\Controllers;

	use Illuminate\Http\Request;
	use Illuminate\Routing\Controller;

	class UserController extends Controller {

		/**
		 * Store a new user.
		 *
		 * @param  Request  $request
		 * @param  int  $id
		 * @return Response
		 */
		public function update(Request $request, $id)
		{
			//
		}

	}

> **သတိပြုရန်:**  Method injection က [model binding](/docs/5.0/routing#route-model-binding) နဲ့လုံးဝအဆင်ပြေပါတယ်။ container ကဘယ် arguments တွေက model bound ဖြစ်ပြီးတော့ ဘယ် arguments တွေကို inject လုပ်သင့်တယ်ဆိုတာကို intelligently ဆုံးဖြတ်ပါလိမ့်မယ်။

<a name="route-caching"></a>
## Route Caching

သင့် application က controller routes တွေပါဝင်တယ်ဆိုရင် သင့်အနေနဲ့ Laravel ရဲ့ route cache ရဲ့အသုံးဝင်ပုံကိုတွေ့ရပါလိမ့်မယ်။ Route cache ကိုအသုံးပြုလို့ရှိရင် သင့် application ရဲ့ routes တွေကို register လုပ်ဖို့စောင့်စရာမလိုတာကြောင့် အရင်ကထက်ပိုမြန်ပါလိမ့်မယ်။တစ်ချို့ case တွေမှာသင့် Route registration တွေကအဆ ၁၀၀ လောက်ထိမြန်သွားပါလိမ့်မယ်။ Route cache တစ်ခုကို generate လုပ်ဖို့ရာအတွက် `route:cache` Artisan command ကိုသုံးရပါ့မယ်:

	php artisan route:cache

သင့် routes cached တွေကို `app/Http/routes.php` file တွေအစားအသုံးပြုပါလိမ့်မယ်။ မှတ်ထားရမှာက သင် route အသစ်ထက်ထည့်တိုင်း `route:cache` command ကို ပြန် run ပေးရပါမယ့်။ ဘာလို့အဲ့လိုဖြစ်နေတာလည်းဆိုရင် သင့်အနေနဲ့ `route:cache` command ကို သင့် project deployment မှာမှ  run ချင်မလားလို့ပါ။

Cache အသစ်တစ်ထပ် generate မလုပ်ဘဲနဲ့ Cached လုပ်ထားတဲ့ routes တွေကိုဖျက်ဖို့ရာအတွက် `route:clear` command ကိုသုံးနိုင်ပါတယ်:

	php artisan route:clear
