# Controllers

- [Basic Controllers](#basic-controllers)
- [Controller Filters](#controller-filters)
- [RESTful Controllers](#restful-controllers)
- [Resource Controllers](#resource-controllers)
- [Handling Missing Methods](#handling-missing-methods)

<a name="basic-controllers"></a>
## Basic Controllers

Application ရဲ့  Route ပိုင္းဆိုင္ရာအားလံုးကုိ 'routes.php' တဖုိင္တည္းမွာ အားလံုး သတ္မွတ္ထားသလို ၊ အဲဒီ route ေတြရဲ့  Action အားလံုးကုိ Controller က Class ေတြနဲ့ ထိန္းခ်ဳပ္ႏိုင္မွာပါ။ Controllers က routes မွာသတ္မွတ္တဲ့ Action ေတြကုိ ထိန္းခ်ဳပ္ေပးယံု သာမက Framework တခုအတြက္ အားသာခ်က္တခုျဖစ္တဲ့ Automatic dependency injection(/docs/ioc) ေတြပါအသံုးျပဳႏိုင္မွာပါ။

Instead of defining all of your route-level logic in a single `routes.php` file, you may wish to organize this behavior using Controller classes. Controllers can group related route logic into a class, as well as take advantage of more advanced framework features such as automatic [dependency injection](/docs/ioc).

Controllers ဖုိင္ေတြကုိ ပံုမွန္အားျဖင့္ 'app/controllers ေအာက္မွာ သိမ္းဆည္းထားပါတယ္။ အဲဒီ Controller ဖိုင္ေတြကုိ  'Composer.json' မွာ 'Classmap' စနစ္ျဖင့္အသံုးျပဳထားပါတယ္။ဘယ္လိုပဲျဖစ္ျဖစ္ Controllers ေတြက Application ရဲ့ ဘယ္ေနရာမွာ မဆို အလုပ္လုပ္ႏုိင္ပါတယ္။ Route မွာ Controllers ကုိ သိမ္းဆန္းထားတဲ့ေနရာအတြက္ သတ္မွတ္ခ်က္ေတြက မရွိပါ။ဘာလုိ့လဲဆိုေတာ့ Composer က Classmap autoload သံုးျပဳထားတဲ့ controller class ကုိ အလုိလုိ သိမွတ္ျပဳျပီးသားျဖစ္ေနလုိ့ပါ။Controllers ဖိုင္ေတြကို ႏွစ္သက္ရာ ေနရာမွာ သိမ္းဆည္းျပီး အလုပ္လုပ္ႏုိင္ပါတယ္။

အေျခခံအားျဖင့္ Controller Class တခုရဲ့ ပံုစံက ေအာက္ပါအတုိင္းေရးသားပါတယ္:

Controllers are typically stored in the `app/controllers` directory, and this directory is registered in the `classmap` option of your `composer.json` file by default. However, controllers can technically live in any directory or any sub-directory. Route declarations are not dependent on the location of the controller class file on disk. So, as long as Composer knows how to autoload the controller class, it may be placed anywhere you wish.

Here is an example of a basic controller class:

	class UserController extends BaseController {

		/**
		 * Show the profile for the given user.
		 */
		public function showProfile($id)
		{
			$user = User::find($id);

			return View::make('user.profile', array('user' => $user));
		}

	}


Controllers ေတြအားလံုးက 'BaseController' Class ကုိ ထပ္ကြန့္ အသံုးျပဳရမွာပါ။ 'BaseController' ကုိလဲ 'app/controllers' မွာ သိမ္းဆည္းထားျပီး ျပန္လည္အသံုးျပဳႏုိင္တဲ့ ဖုိင္အေနနဲ့သိမ္းဆည္းထားပါတယ္။'BaseContoller' ဆိုတာက Laravel framework ရဲ့  'Controller' Class ကုိ ထပ္ကြန့္ အသံုးျပဳထားပါတယ္။အခုဆိုရင္ေတာ့ Route ဖုိင္မွ တဆင့္ အသံုးျပဳလိုတဲ့ Controller action ကုိ ေအာက္ပါအတုိင္းသတ္မွတ္ႏုိင္ပါျပီ။

	Route::get('user/{id}', 'UserController@showProfile');


PHP ရဲ့  magic function namespaces ကုိ အသံုးျပဳျပီး Controller ကုိ သတ္မွတ္မယ္ဆုိရင္ေတာ့ ေအာက္ကပံုစံအတုိင္း Route ေပးတဲ့အခ်ိန္မွာ သတ္မွတ္ႏုိင္ပါတယ္:

	Route::get('foo', 'Namespace\FooController@method');

> **Note::** အခုခ်ိန္မွာ ကြ်န္ေတာ္တုိ့က PHP classes ေတြ ကုိ autoload အသံုးျပဳႏုိင္ရန္အတြက္ [Composer](http://getcomposer.org) ကုိ အသံုးျပဳထားပါတယ္။ ဒါေၾကာင့္ Controller file ကို System ရဲ့ ဘယ္ေနရာမွာပဲထားထား ၊ Composer က အဲဒီ ဖုိင္ကုိ သိေနသ၍ အသံုးျပဳႏုိင္မွာပါ။ Controllers ဖုိင္ရဲ့ တည္ေနရာကုိ အတည္တက် အေသ သတ္မွတ္ထားသလိုမ်ိဳးမရွိပါဘူး။Routing to controllers is entirely de-coupled from the file system.


Controller ကုိ သတ္မွတ္ထားတဲ့ Route ကုိ ေအာက္ကပံုစံအတုိင္း သတ္မွတ္ႏုိင္ပါတယ္:

	Route::get('foo', array('uses' => 'FooController@method','as' => 'name'));

Controller Action ပါတဲ့ URL ( Link ) တခု ဖန္တီးဖို့အတြက္ 'URL::action' ဆုိျပီးသံုးျပဳႏုိင္သလို 'action' helper function ကုိလဲ ေအာက္ပါအတုိင္းသံုးျပဳႏုိင္ပါတယ္။

	$url = URL::action('FooController@method');

	$url = action('FooController@method');

Controller action တစ္ခုရဲ့ နာမည္ကုိ သိရန္အတြက္ 'currentRouteAction' method ကုိ ေအာက္က ပံုစံအတုိင္း အသံုးျပဳႏုိင္ပါတယ္။

	$action = Route::currentRouteAction();

<a name="controller-filters"></a>
## Controller Filters

[Filters](/docs/routing#route-filters) က Controller ပါတဲ့ route တခုသတ္မွတ္ကတည္းက ေအာက္ပါပံုစံအတုိင္း သတ္မွတ္ခဲ့ပါတယ္။

	Route::get('profile', array('before' => 'auth',
				'uses' => 'UserController@showProfile'));

ေနာက္တစ္နည္းက Controller ဖုိင္ထဲေရာက္မွ ေအာက္ကပံုစံအတုိင္းလဲ အသံုးျပဳႏုိင္ပါတယ္။

	class UserController extends BaseController {

		/**
		 * Instantiate a new UserController instance.
		 */
		public function __construct()
		{
			$this->beforeFilter('auth', array('except' => 'getLogin'));

			$this->beforeFilter('csrf', array('on' => 'post'));

			$this->afterFilter('log', array('only' =>
								array('fooAction', 'barAction')));
		}

	}


You may also specify controller filters inline using a Closure:

	class UserController extends BaseController {

		/**
		 * Instantiate a new UserController instance.
		 */
		public function __construct()
		{
			$this->beforeFilter(function()
			{
				//
			});
		}

	}

Controller တစ္ခုအတြက္ Filter ကုိ သီးျခားအသံုးျပဳခ်င္ရင္ေတာ့ '@' ဆိုတဲ့ syntax ကုိ အသံုးျပဳျပီး ေအာက္ပါအတုိင္း သတ္မွတ္ေပးရပါတယ္။r:

	class UserController extends BaseController {

		/**
		 * Instantiate a new UserController instance.
		 */
		public function __construct()
		{
			$this->beforeFilter('@filterRequests');
		}

		/**
		 * Filter the incoming requests.
		 */
		public function filterRequests($route, $request)
		{
			//
		}

	}

<a name="restful-controllers"></a>

## RESTful Controllers

Laravel တြင္ Controller ေတြရဲ့  Action အားလံုးအတြက္ REST ျဖင့္ Route ကေန အလြယ္တကူ သတ္မွတ္ႏုိင္ပါတယ္။ ပထမဆံုး method အတြက္ Route  ကုိ 'Route::controller' ျဖင့္ သတ္မွတ္ပါ။

	Route::controller('users', 'UserController');

'controller' method တြင္ arguments ႏွစ္ခု လက္ခံပါတယ္။ ပထမတခုက Base URL controller handles( ဥပမာ. create, index ) ျဖစ္ျပီး ၊ ဒုတိယတခုကေတာ့ Controller ရဲ့ နာမည္ျဖစ္ပါတယ္။ ေနာက္တစ္ခုက Controller တြင္ Method(getindex/postprofile)ေတြကုိ HTTP verb အလိုက္ ထည့္ေပးရပါမယ္။

	class UserController extends BaseController {

		public function getIndex()
		{
			//
		}

		public function postProfile()
		{
			//
		}

	}

'index' method က route မွာေပးထားတဲ့ index ကုိ အလုပ္လုပ္ပါတယ္။ ကြ်န္ေတာ္တုိ့ အေပၚမွာဆို route name ကုိ users ဆိုျပီးေပးခဲ့ပါတယ္။ အဲဒါဆိုရင္ users လုိ့ေခၚရင္ Controller ထဲက index က အလုပ္လုပ္သြားမွာပါ။

Controller action မွာ စကားစုအမ်ားၾကီးပါလာသံုးခဲ့ရင္ "dash" syntax သံုးနည္းနဲ့ Mathod ကုိ သတ္မွတ္ေပးရပါတယ္။ ဥပမာ "OurController" ထဲက method တစ္ခု ကုိ getAdminProfile လုိ့ေပးထားရင္ url ကုိ "users/admin-profile" လုိ့ေခၚလုိ့ရသြားမွာပါ။

	public function getAdminProfile() {}

<a name="resource-controllers"></a>
## Resource Controllers

Resource controllers က sources ေတြ အသံုးျပဳျပီး Restful controller ေတြ ဖန္တီးတဲ့အခါ အလြယ္တကူအသံုးျပဳႏုိင္ေအာင္လုပ္ေဆာင္ေပးပါတယ္။ ဥပမာ ဓါတ္ပံု စီမံတဲ့ controller တစ္တခု ျပဳလုပ္မယ္ဆုိပါစို ့။ Terminal(CMD) ကေန တစ္ဆင့္ Artisan command ျဖင့္ "controller:make" ကုိအသံုးျပဳျပီးေတာ့ "Route::resource" ဆိုျပီး route သတ္မွတ္ေပးလုိက္ရင္ resoure controller တစ္ခု အလြယ္တကူရရွိမွာျဖစ္ပါတယ္။

Controller တစ္ခုကုိ Terminal(cmd) ကေန ဖန္တီးဖုိ့အတြက္ ေအာက္က ကြန္မန္းျဖင့္ စမ္းၾကည့္ပါ။

	php artisan controller:make PhotoController

ျပီးရင္ေတာ့ အေပၚမွာ လုပ္ထားတဲ့ Controller ကုိ အသံုးျပဳႏုိင္ရန္အတြက္ေအာက္ကအတုိင္း Route မွာ သတ္မွတ္ေပးပါ။

	Route::resource('photo', 'PhotoController');


အခုဆိုရင္ သာမန္ Route ေလးတစ္ေၾကာင္းနဲ့ Photo အတြက္ RESTful action တစ္ခုရရွိသြားပါျပီ။အခုလုိမ်ဳိးသတ္မွတ္ရံုျဖင့္ ေအာက္ကအတုိင္း Action ေတြ အကုန္အသံုးျပဳႏုိင္သြားပါျပီ။

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

တခါတေလက်ေတာ့ အေပၚကအတုိင္း Controller မွာ Action ေတြ အသံုးမလိုတဲ့အခါမ်ိဳးေတြရွိလာရင္ ေအာက္ကအတုိင္း --only ဆိုျပီး သံုးျပဳလိုတဲ့ Action ကုိပဲ ေရြးခ်ယ္သတ္မွတ္ႏုိင္ပါတယ္။

	php artisan controller:make PhotoController --only=index,show

	php artisan controller:make PhotoController --except=index


ျပီးေတာ့ Route မွ တဆင့္လဲ လိုအပ္တဲ့ Action ေတြ ကုိ only ကုိ အသံုးျပဳျပီး သတ္မွတ္ေပးသြားႏုိင္ပါတယ္။

	Route::resource('photo', 'PhotoController',
					array('only' => array('index', 'show')));

	Route::resource('photo', 'PhotoController',
					array('except' => array('create', 'store', 'update', 'destroy')));

ပံုမွန္အားျဖင့္ Resource controller action ေတြမွာ route name ေတြက အလိုေလ်ာက္သတ္မွတ္ေပးထားျပီးသားပါ။တကယ္လို ့ အဲဒီ route name ကုိ ကိုယ့္ဘာသာ ေအာက္က ပံုစံအတုိင္း သတ္မွတ္ေပးလုိ့ရႏုိင္ပါေသးတယ္။

	Route::resource('photo', 'PhotoController',
					array('names' => array('create' => 'photo.build')));

#### Adding Additional Routes To Resource Controllers

တကယ္လုိ့ resource controller မွာ ပံုမွန္ routes ေတြနဲ့ မလံုေလာက္လုိ့ အသစ္ထပ္ထည့္လုိ့ရႏုိင္ပါေသးတယ္။ အဲဒီ route name ကိုေတာ့ "Route::resource" ကုိ မေရးခင္မွာေအာက္က ပံုစံအတုိင္း ေရးေပးရပါမယ္။

	Route::get('photos/popular');
	Route::resource('photos', 'PhotoController');

<a name="handling-missing-methods"></a>
## Handling Missing Methods

"catch-all method" ဆိုတာက Controller ေပးထားျပီး Mehod မရွိတဲ့အခါမွာ အလုပ္လုပ္မယ့္ အေျခအေနျဖစ္ပါတယ္။ Method နာမည္ကိုေတာ့ "MissingMethod" ဆိုျပီးေအာက္ကပံုစံအတုိင္း အသံုးျပဳရမွာပါ။

#### Defining A Catch-All Method

	public function missingMethod($parameters = array())
	{
		//
	}
