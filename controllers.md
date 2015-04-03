# HTTP Controllers များအကြောင်း

- [မိတ်ဆက်](#introduction)
- [Controllers အခြေခံ](#basic-controllers)
- [Controller Middleware များ](#controller-middleware)
- [သွယ်ဝိုက် Controllers](#implicit-controllers)
- [RESTful Resource Controller များ](#restful-resource-controllers)
- [Dependency Injection & Controllers](#dependency-injection-and-controllers)
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

Resource controllers make it painless to build RESTful controllers around resources. For example, you may wish to create a controller that handles HTTP requests regarding "photos" stored by your application. Using the `make:controller` Artisan command, we can quickly create such a controller:

	php artisan make:controller PhotoController

Next, we register a resourceful route to the controller:

	Route::resource('photo', 'PhotoController');

This single route declaration creates multiple routes to handle a variety of RESTful actions on the photo resource. Likewise, the generated controller will already have methods stubbed for each of these actions, including notes informing you which URIs and verbs they handle.

#### Actions Handled By Resource Controller

Verb      | Path                        | Action       | Route Name
----------|-----------------------------|--------------|---------------------
GET       | /resource                   | index        | resource.index
GET       | /resource/create            | create       | resource.create
POST      | /resource                   | store        | resource.store
GET       | /resource/{resource}        | show         | resource.show
GET       | /resource/{resource}/edit   | edit         | resource.edit
PUT/PATCH | /resource/{resource}        | update       | resource.update
DELETE    | /resource/{resource}        | destroy      | resource.destroy

#### Customizing Resource Routes

Additionally, you may specify only a subset of actions to handle on the route:

	Route::resource('photo', 'PhotoController',
					['only' => ['index', 'show']]);

	Route::resource('photo', 'PhotoController',
					['except' => ['create', 'store', 'update', 'destroy']]);

By default, all resource controller actions have a route name; however, you can override these names by passing a `names` array with your options:

	Route::resource('photo', 'PhotoController',
					['names' => ['create' => 'photo.build']]);

#### Handling Nested Resource Controllers

To "nest" resource controllers, use "dot" notation in your route declaration:

	Route::resource('photos.comments', 'PhotoCommentController');

This route will register a "nested" resource that may be accessed with URLs like the following: `photos/{photos}/comments/{comments}`.

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

#### Adding Additional Routes To Resource Controllers

If it becomes necessary to add additional routes to a resource controller beyond the default resource routes, you should define those routes before your call to `Route::resource`:

	Route::get('photos/popular');

	Route::resource('photos', 'PhotoController');

<a name="dependency-injection-and-controllers"></a>
## Dependency Injection & Controllers

#### Constructor Injection

The Laravel [service container](/docs/5.0/container) is used to resolve all Laravel controllers. As a result, you are able to type-hint any dependencies your controller may need in its constructor:

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

Of course, you may also type-hint any [Laravel contract](/docs/5.0/contracts). If the container can resolve it, you can type-hint it.

#### Method Injection

In addition to constructor injection, you may also type-hint dependencies on your controller's methods. For example, let's type-hint the `Request` instance on one of our methods:

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

If your controller method is also expecting input from a route parameter, simply list your route arguments after your other dependencies:

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

> **Note:** Method injection is fully compatible with [model binding](/docs/5.0/routing#route-model-binding). The container will intelligently determine which arguments are model bound and which arguments should be injected.

<a name="route-caching"></a>
## Route Caching

If your application is exclusively using controller routes, you may take advantage of Laravel's route cache. Using the route cache will drastically decrease the amount of time it take to register all of your application's routes. In some cases, your route registration may even be up to 100x faster! To generate a route cache, just execute the `route:cache` Artisan command:

	php artisan route:cache

That's all there is to it! Your cached routes file will now be used instead of your `app/Http/routes.php` file. Remember, if you add any new routes you will need to generate a fresh route cache. Because of this, you may wish to only run the `route:cache` command during your project's deployment.

To remove the cached routes file without generating a new cache, use the `route:clear` command:

	php artisan route:clear
