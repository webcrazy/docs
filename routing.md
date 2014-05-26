# Routing

- [လမ္းေျကာင္းေပးျခင္း အေျခခံ](#basic-routing)
- [လမ္းေျကာင္းထိန္းကြပ္ ကိန္းမ်ား](#route-parameters)
- [Route Filterမ်ား](#route-filters)
- [အမည္ရွိ လမ္းေျကာင္းမ်ား](#named-routes)
- [လမ္းေျကာင္းအုပ္စုမ်ား](#route-groups)
- [Sub-Domain မ်ား အသုံးျပု ၍ လမ္းေျကာင္းေပးျခင္း](#sub-domain-routing)
- [လမ္းေျကာင္းေရွ့ ဆြယ္ေပးျခင္း](#route-prefixing)
- [လမ္းေျကာင္း နွင့္ Model ခ်ိတ္တြယ္ျခင္း](#route-model-binding)
- [404 error မ်ား ထုတ္လြွတ္ျခင္း](#throwing-404-errors)
- [Controller မ်ားအား လမ္းေျကာင္းေပးျခင္း](#routing-to-controllers)

<a name="basic-routing"></a>

###လမ္းေျကာင္းေပးျခင္း(Routing) အေျခခံ

သင့္ application ၏ လမ္းေျကာင္း အမ်ားစု ကုိ `app/routes.php` ဖုိင္ တြင္ သတ္မွတ္ရပါမည္။ `Laravel` တြင္ အရုိးရွင္းဆုံး လမ္းေျကာင္းတစ္ခုသည္ `URI` တစ္ခု နွင့္ `closure` ျပန္ေခါ္ခ်ိတ္ method (callback method) တစ္ခု ပါ ၀င္ ပါသည္။
#### အေျခခံ GET လမ္းေျကာင္း

	Route::get('/', function()
	{
		return 'Hello World';
	});

#### အေျခခံ POST လမ္းေျကာင္း

	Route::post('foo/bar', function()
	{
		return 'Hello World';
	});

#### လမ္းေျကာင္းတစ္ခုအား HTTP ျကိယာ အမ်ား ျဖင့္ မွတ္ပုံတင္ျခင္း

	Route::match(array('GET', 'POST'), '/', function()
	{
		return 'Hello World';
	});

#### လမ္းေျကာင္းတစ္ခုအား မည္သည့္ HTTP ျကိယာျဖင့္ ျဖစ္ေစ သက္ဆုိင္ေစရန္ မွတ္ပုံတင္ျခင္း

	Route::any('foo', function()
	{
		return 'Hello World';
	});

#### လမ္းေျကာင္းတစ္ခုအား HTTPS ျဖင့္ မျဖစ္မေန အသုံးျပ ုေစခ်င္း

	Route::get('foo', array('https', function()
	{
		return 'Must be over HTTPS';
	}));

မျကာခဏ သင့္ လမ္းေျကာင္းမ်ားအတြက္ `URL` မ်ား ထုတ္ရန္ လိုအပ္ပါလိမ့္မည္။ ထုိ့အတြက္ `URL::to` method ျဖင့္ အသုံးျပုနုိင္ပါသည္။

	$url = URL::to('foo');

<a name="route-parameters"></a>
## လမ္းေျကာင္းထိန္းကြပ္ ကိန္းရွင္မ်ား

	Route::get('user/{id}', function($id)
	{
		return 'User '.$id;
	});

#### မထည့္လည္းရေသာ လမ္းေျကာင္းထိန္းကြပ္ကိန္းရွင္မ်ား

	Route::get('user/{name?}', function($name = null)
	{
		return $name;
	});

#### ေပးထားေသာ မူလတန္ဖိုးမ်ားျဖင့္ လမ္းေျကာင္းထိန္းကြပ္ကိန္းရွင္မ်ား

	Route::get('user/{name?}', function($name = 'John')
	{
		return $name;
	});

#### Regular Expression မ်ားျဖင့္ လမ္းေျကာင္းထိန္းကြပ္ကိန္းမ်ားအား ကန့္သတ္ျခင္း

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

#### Where အကန့္အသတ္မ်ားအား Array အျဖစ္ျဖင့္ ေပးပို့ျခင္း

အကယ္၍ လုိ အပ္ပါက ကန့္သတ္ခ်က္မ်ားအား `Array` အျဖစ္တြဲ၍လည္း သုံးနုိင္ပါသည္။

	Route::get('user/{id}/{name}', function($id, $name)
	{
		//
	})
	->where(array('id' => '[0-9]+', 'name' => '[a-z]+'))

#### Global Pattern မ်ား သတ္မွတ္ျခင္း

အကယ္၍ လမ္းေျကာင္းထိန္းကြပ္တစ္မ်ိ  ုးအား ေပးထားေသာ regular expression တစ္ခုျဖင့္ ကန့္သတ္လုိပါက `pattern` method ကုိ အသုံးျပ ုနုိင္ပါသည္။

	Route::pattern('id', '[0-9]+');

	Route::get('user/{id}', function($id)
	{
		// Only called if {id} is numeric.
	});

#### လမ္းေျကာင္းထိန္းကြပ္ကိန္းတစ္ခု၏ တန္ဖုိး ကုိ အသုံးျပ ုျခင္း

အကယ္၍ လမ္းေျကာင္းထိန္းကြပ္ ကိန္းတစ္ခု ၏ တန္ဖုိးအား လမ္းေျကာင္း၏ အျပင္ဘက္တြင္ အသုံးျပု လုိပါက `Route::input` method ကုိ အသုံးျပု နုိင္ပါသည္။

	Route::filter('foo', function()
	{
		if (Route::input('id') == 1)
		{
			//
		}
	});

<a name="route-filters"></a>
## Route filter မ်ား

route filter မ်ား သည္  ေပးထားေသာ လမ္းေျကာင္းတစ္ခုကုိ အသုံးျပ ုနုိင္စြမ္း ကန့္သတ္ရာ၌ လြယ္ကူသက္သာေအာင္ ဖန္တီးေပးထားေသာ နည္းလမ္းတစ္မ်ိ  ုးျဖစ္ပါသည္။ ၎တုိ့ သည္ သင့္ site တြင္  အသိအမွတ္ျပု  စစ္ေဆးခ်က္မ်ား (Authentications) လို အပ္ပါက အသုံး၀င္နုိင္ပါသည္။ Laravel framework အတြင္း၌ပင္ `auth filter`, `auth.basic filter`, `guest filter`, `csrffilter` အစရွိသျဖင့္ မ်ားစြာေသာ route filter မ်ား ပါ၀င္ပါသည္။၎တုိ့ အားလုံး သည္ `app/filters.php` ဖုိင္တြင္ တည္ရွိပါသည္။

#### Route filter တစ္ခု သတ္မွတ္ျခင္း

	Route::filter('old', function()
	{
		if (Input::get('age') < 200)
		{
			return Redirect::to('home');
		}
	});

အကယ္၍ ေပးထားေသာ Web Server ၏ တုန့္ျပန္ခ်က္ သည္ route filter တစ္ခုဆီမွ ျပန္လာျခင္းျဖစ္ပါက ထုိ တုန့္ျပန္ခ်က္အား မူလေတာင္းဆုိခ်က္၏ တုန့္ျပန္ခ်က္အျဖစ္ စဥ္းစားမည္ျဖစ္ျပီး လမ္းေျကာင္းကုိ execute လုပ္မည္ မဟုတ္ပါ။ထုိ့ျပင္ သတ္မွတ္ထားျပီးေသာ ေနာက္ဆြယ္ route filters(after filters)ကုိ လည္း ပ်က္ျပယ္ေစမည္ ျဖစ္ပါသည္။

#### လမး္ေျကာင္းတစ္ခုေပါ္သုိ့ Route filter တစ္ခု ခ်ိတ္ဆက္ျခင္း

	Route::get('user', array('before' => 'old', function()
	{
		return 'You are over 200 years old!';
	}));

####  Controller Action တစ္ခု သုိ့ Route filter တစ္ခု ခ်ိတ္ဆက္ျခင္း

	Route::get('user', array('before' => 'old', 'uses' => 'UserController@showProfile'));

#### လမ္းေျကာင္းတစ္ခုေပါ္သုိ့ Route filter အမ်ား ခ်ိတ္ဆက္ျခင္း

	Route::get('user', array('before' => 'auth|old', function()
	{
		return 'You are authenticated and over 200 years old!';
	}));

#### လမ္းေျကာင္းတစ္ခုေပါ္သို့ Route filter အမ်ား အား Array အျဖစ္ျဖင့္ ခ်ိတ္ဆက္ျခင္း

	Route::get('user', array('before' => array('auth', 'old'), function()
	{
		return 'You are authenticated and over 200 years old!';
	}));

#### Route filter ထိန္းကြပ္ကိန္းမ်ား သတ္မွတ္ျခင္း

	Route::filter('age', function($route, $request, $value)
	{
		//
	});

	Route::get('user', array('before' => 'age:200', function()
	{
		return 'Hello World';
	}));

ေနာက္ဆြယ္ Route filter မ်ား သည္ `$response` အား တတိယေျမာက္ argument အျဖစ္ လက္ခံရရွိပါသည္။

	Route::filter('log', function($route, $request, $response)
	{
		//
	});

#### Pattern အေျခခံ Filter မ်ား

Route filter တစ္ခုအား လမ္းေျကာင္းတုိ့၏ URI ေပါ္ အေျခခံ ၍ သတ္မွတ္ထားေသာ လမ္းေျကာင္း အုပ္စုတစ္ခု လုံး ေပါ္သုိ့ သက္ေရာက္ေစရန္လည္း သတ္မွတ္နုိင္ပါသည္။ 

	Route::filter('admin', function()
	{
		//
	});

	Route::when('admin/*', 'admin');

ေပးထားေသာ ဥပမာတြင္ `admin` route filter သည္ `admin/` ျဖင့္ စေသာ လမ္းေျကာင္းအားလုံး ေပါ္သုိ့ သက္ေရာက္မည္ ျဖစ္ပါသည္။ ခေရပြင့္ စာလုံး `*` ကုိ မည္သည့္ စာလုံးနွင့္မဆုိ ကုိက္ညီေစမည့္ သံခိတ္ စာလုံး အျဖစ္ အသုံးျပု နုိင္ပါသည္။

ထုိ့ အျပင္ HTTP ျကိယာမ်ားျဖင့္လည္း pattern အေျခခံ filter မ်ား အား ကန့္သတ္နုိင္ပါသည္။
You may also constrain pattern filters by HTTP verbs:

	Route::when('admin/*', 'admin', array('post'));

#### Filter class မ်ား

အဆင့္ျမင့္ route filter မ်ား တြင္ Closure တစ္ခု ထက္ class တစ္ခုကုိ အသုံးျပု ခ်င္ ေကာင္း အသုံးျပု ပါလိမ့္မည္။စင္စစ္ filter class မ်ားသည္ application [IoC Container](/docs/ioc) မွ တစ္ဆင့္ ျပန္ျဖည္ခ်င္းျဖစ္ရာ dependency injection ကုိ အသုံး ျပု နုိင္ေစ၍ test လုပ္ျခင္းကုိ အေထာက္အပံ့ေကာင္းေကာင္းေပးနုိင္ပါသည္။

#### Class အေျခခံ filter တစ္ခု အား မွတ္ပုံတင္ျခင္း

	Route::filter('foo', 'FooFilter');

ပုံမွန္အားျဖင့္ `FooFilter` class ၏ `filter` method ကုိ ေခါ္ပါလိမ့္မည္။

	class FooFilter {

		public function filter()
		{
			// Filter logic...
		}

	}

အကယ္၍ `filter` method ကုိ မသုံးလုိပါက အျခား method တစ္ခုကုိ သတ္မွတ္လုိက္ရုံပင္။

	Route::filter('foo', 'FooFilter@foo');

<a name="named-routes"></a>
## အမည္ရွိ လမ္းေျကာင္းမ်ား

အမည္ရွိလမ္းေျကာင္းမ်ားသည္ လမ္းေျကာင္းလြွဲမ်ား ျပု လုပ္ေသာအခါ သုိ့မဟုတ္ URL မ်ား ေရးသားေသာအခါ လမ္းေျကာင္းမ်ားကို ညြွန္းဆုိရာ ၌ ပုိမုိလြယ္ကူေစပါသည္။

	Route::get('user/profile', array('as' => 'profile', function()
	{
		//
	}));

Controller action အတြဲမ်ား အတြက္ လည္း လမ္းေျကာင္းအမည္မ်ား သတ္မွတ္နုိင္ပါသည္။

	Route::get('user/profile', array('as' => 'profile', 'uses' => 'UserController@showProfile'));

အထက္ပါအတုိင္းသတ္မွတ္ျပီးပါက ေပးထားေသာ လမ္းေျကာင္းနာမည္ျဖင့္ URL မ်ား ထုတ္ရာ၌ ျဖစ္ေစ လမ္းေျကာင္းလြွဲမ်ား အသုံးျပု ရာ ၌ ျဖစ္ေစ သုံးနုိင္ပါျပီ။

	$url = URL::route('profile');

	$redirect = Redirect::route('profile');

လက္ရွိ ေရာက္ရွိေနေသာ လမ္းေျကာင္း၏ အမည္ကုိ `currentRouteName` method ျဖင့္ သိရွိအသုံးျပု နုိင္ပါသည္။

	$name = Route::currentRouteName();

<a name="route-groups"></a>
## လမ္းေျကာင္း အုပ္စုမ်ား

တစ္ခါတစ္ရံ  လမ္းေျကာင္း အုပ္စု တစ္ခု ေပါ္သုိ့ filter မ်ား သက္ေရာက္ဖုိ့ လုိအပ္ေကာင္းလုိအပ္နုိင္ပါသည္။ ထုိအခါမ်ိ  ုးတြင္ လမ္းေျကာင္းတစ္ခုစီအတြက္ filter မ်ားသတ္မွတ္မည့္အစား လမ္းေျကာင္းအုပ္စု တစ္ခုကို အသုံးျပု နုိင္ပါသည္။

	Route::group(array('before' => 'auth'), function()
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

`group` array အတြင္းတြင္`namespace` ထိန္းကြပ္ကိန္းထည့္၍ လည္း ေပးထားေသာ အုပ္စုအတြင္းရွိ controller မ်ားအား namespace တစ္ခုအတြင္း က်ေရာက္ေနေစရန္ စီမံနုိင္ပါသည္။

	Route::group(array('namespace' => 'Admin'), function()
	{
		//
	});

<a name="sub-domain-routing"></a>
## Sub-Domain မ်ား အသုံးျပု ၍ လမ္းေျကာင္းေပးျခင္း

Laravel လမ္းေျကာင္းမ်ားတြင္ သံခိတ္သုံး sub-domain မ်ားကုိ ေကာင္းမြန္စြာ စီမံအသုံးခ်နုိင္ျပီး domain မွ သံခိတ္ ထိန္းကြပ္ကိန္းမ်ား ကုိ ေပးပုိ့နုိင္ပါသည္။

#### Sub-domain လမ္းေျကာင္းမ်ား မွတ္ပံုတင္ျခင္း

	Route::group(array('domain' => '{account}.myapp.com'), function()
	{

		Route::get('user/{id}', function($account, $id)
		{
			//
		});

	});

<a name="route-prefixing"></a>
## လမ္းေျကာင္းေရွ့ ဆြယ္ေပးျခင္း

လမ္းေျကာင္း အုပ္စု တစ္ခု အား `prefix` ထိန္းကြပ္ကိန္းအား `group` array တြင္ ထည့္သြင္း၍ ေရွ့ ဆြယ္ လမ္းေျကာင္းတစ္ခုေပးနုိင္ပါသည္။

	Route::group(array('prefix' => 'admin'), function()
	{

		Route::get('user', function()
		{
			//
		});

	});

<a name="route-model-binding"></a>
## လမ္းေျကာင္း နွင့္ Model ခ်ိတ္တြယ္ျခင္း

Model ခ်ိတ္တြယ္ျခင္း သည္ model instance တစ္ခုအား လမ္းေျကာင္းမ်ား အတြင္းသုိ့ အလြယ္တကူ ထုိးသြင္းနုိင္ေစပါသည္။ ဥပမာ user တစ္ေယာက္၏ id ကုိ လမ္းေျကာင္းအတြင္း ထည့္သြင္းမည့္အစား ေပးထားေသာ id နွင့္ ကုိက္ညီသည့္ user model instance တစ္ခုကုိ တုိက္ရုိက္ထည့္သြင္းနုိင္ပါသည္။ ပထမဦးစြာ`Route::model` method ကုိ အသုံးျပု ျပီး ေပးထားေသာ ထိန္းကြပ္ကိန္းအတြင္း အသုံးျပု မည့္ model အမည္ကို သတ္မွတ္ေပးရပါမည္။

#### ထိန္းကြပ္ကိန္းတစ္ခုအား model တစ္ခုျဖင့္ ခ်ိတ္တြယ္ျခင္း

	Route::model('user', 'User');

ျပီးေနာက္ `{user}` ထိန္းကြပ္ကိန္းပါ၀င္သည့္ လမ္းေျကာင္းတစ္ခု သတ္မွတ္ေပးရပါမည္။

	Route::get('profile/{user}', function(User $user)
	{
		//
	});

`{user}` ထိန္းကြပ္ကိန္းကို `User` model ျဖင့္ ခ်ိတ္တြယ္ခဲ့သျဖင့္ `User` instance တစ္ခုကုိ လမ္းေျကာင္းအတြင္းသို့ ထုိးသြင္းပါလိမ့္မည္။ ဥပမာအားျဖင့္ `profile/1` သုိ့ လာေသာ ေတာင္းဆုိခ်က္တစ္ခုသည္ ID 1 ရွိေသာ `User` instance တစ္ခုကုိ ထုိးသြင္းပါလိမ့္မည္။

>**မွတ္ခ်က္** အကယ္၍ ကုိက္ညီသည့္ model instance တစ္ခုကို database တြင္ ရွာမေတြ့ ပါက 404 error ျဖစ္ေပါ္ပါလိမ့္မည္။

အကယ္၍ မိမိဘာသာ "not found" တုန့္ျပန္ခ်က္တစ္ခု သတ္မွတ္လိုပါက `model` method တြင္ Closure တစ္ခုအား တတိယ arugment အျဖစ္ ေပးပို့နုိင္ပါသည္။

	Route::model('user', 'User', function()
	{
		throw new NotFoundHttpException;
	});

တစ္ခါတစ္ရံ ကိုယ္တုိင္ လမ္းေျကာင္းထိန္းကြပ္ကိန္းမ်ား မိမိ ဘာသာ ျဖည္လုိျခင္း မ်ိ  ုးရွိနုိင္ပါသည္။ ထုိ့ အတြက္ `Route::bind` method ကုိ သုံးလိုက္ရုံပင္။

	Route::bind('user', function($value, $route)
	{
		return User::where('name', $value)->first();
	});

<a name="throwing-404-errors"></a>
## 404 error မ်ား ထုတ္လြွတ္ျခင္း

လမ္းေျကာင္းတစ္ခု ဆီမွ 404 error တစ္ခု ျဖစ္ေပါ္ေအာင္ ကိုယ္တုိင္ ျပု လုပ္နည္း နွစ္မ်  ိုး ရွိပါသည္။ ပထမတစ္နည္း မွာ `App::abort` method ကုိ အသုံးျပု ျခင္းျဖစ္သည္။

	App::abort(404);

ဒုတိယတည္နည္းမွာ `Symfony\Component\HttpKernel\Exception\NotFoundHttpException` ကုိ ကုိယ္တုိင္ ထုတ္လြွတ္ျခင္းျဖစ္သည္။

404 exception မ်ား ကိုင္တြယ္ျခင္း နွင့္ ၎တုိ့ အတြက္ ကုိယ္ပုိင္တုန့္ျပန္ခ်က္မ်ား ျပု လုပ္ျခင္းတုိ့ နွင့္ ပတ္သက္၍ [errors](/docs/errors#handling-404-errors) အပိုင္းတြင္ ပုိမုိ ဖတ္ရွုနုိင္ပါသည္။

<a name="routing-to-controllers"></a>
## Controller မ်ား အား လမ္းေျကာင္းေပးျခင္း

Laravel တြင္ လမ္းေျကာင္းေပးရာ၌ Closure မ်ား ကုိသာ မဟုတ္ controller class မ်ားကို လည္း အသုံးျပု နုိင္သည့္ အျပင္  [resource controllers](/docs/controllers#resource-controllers လမ္းေျကာင္းမ်ား ပါ ခြင့္ျပုထားပါသည္။

[Controllers](/docs/controllers) လမ္းညြွန္ တြင္အေသးစိတ္ ဖတ္ရွု နုိင္ပါသည္။
