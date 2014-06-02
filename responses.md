# Views & Responses

- [Basic Responses](#basic-responses)
- [Redirects](#redirects)
- [Views](#views)
- [View Composers](#view-composers)
- [Special Responses](#special-responses)
- [Response Macros](#response-macros)

<a name="basic-responses"></a>
## Basic Responses

#### String တစ္ခုကို Routes ကေန return ျပန္ခ်င္ရင္ -

	Route::get('/', function()
	{
		return 'Hello World';
	});

#### Creating Custom Responses

Symfony\Component\HttpFoundation\Response` class ကေန Response` တစ္ခုကျဖစ္လာတယ္၊  HTTPS responses ေတြကို တည္ေဆာက္ဖို႕ရာအတြက္ မ်ားစြာေသာ methods ေတြကေန စီစဥ္ေပးပါတယ္။

	$response = Response::make($contents, $statusCode);

	$response->header('Content-Type', $value);

	return $response;

သင္က `Response` class တစ္ခုရဲ႕ method ကိုလည္းလိုခ်င္တယ္... ဒါေပမယ္႕ response content အျဖစ္ return ျပန္ခ်င္တယ္ ဆိုရင္ေတာ႕`Response::view` method ကအဆင္ေျပပါလိမ္႕မယ္-

	return Response::view('hello')->header('Content-Type', $type);

#### Cookies ေတြကို Responses ေတြဆီျပန္ခ်င္တယ္ဆိုရင္

	$cookie = Cookie::make('name', 'value');

	return Response::make($content)->withCookie($cookie);

<a name="redirects"></a>
## ျပန္လည္လမ္းေၾကာင္းညႊန္ၾကားမွူ႔

#### Redirect လုပ္ခ်င္တယ္ဆိုရင္ -

	return Redirect::to('user/login');

#### Flash Data နဲ႕ Redirect လုပ္ရင္ -

	return Redirect::to('user/login')->with('message', 'Login Failed');

> **Note:** Since the `with` method flashes data to the session, you may retrieve the data using the typical `Session::get` method.

#### Nmaed Route ႏွင္႕ Redirect လုပ္ရင္-

	return Redirect::route('login');

#### Route Parameters တစ္ခုနဲ႕ Redirect လုပ္ရင္ -


	return Redirect::route('profile', array(1));

#### Route ထဲမွာ name parameters ပါတာကို Redirect လုပ္ရင္

	return Redirect::route('profile', array('user' => 1));

#### Controller ရဲ႕ Action တစ္ခုကေန Redirect တစ္ခု return လုပ္ခ်င္ရင္

	return Redirect::action('HomeController@index');

#### Paramater ပါတဲ႕ Controller တစ္ခုကို Redirect တစ္ခု return လုပ္ျခင္း

	return Redirect::action('UserController@profile', array(1));

#### Name Parameters တစ္ခုပါတဲ႕ Controller Action တစ္ခုကေန Redirect  တစ္ခု return လုပ္ျခင္း

	return Redirect::action('UserController@profile', array('user' => 1));

<a name="views"></a>
## Views 

သင္႕ရဲ႕ presentation logic ကေန controller နဲ႕ domain logic ေတြ ခြဲျခားဖို႕ရာအတြက္ Views က အဆင္ေျပဆံုးျဖစ္ေအာင္စီစဥ္ေပးပါတယ္။
Views Files ေတြက `app/views` directory ထဲမွာ ရွိပါတယ္။ Views မွာ ထံုးစံအတိုင္း သင္႔ application ရဲ႕ HTML ေတြပါဝင္ပါတယ္ ။

ေအာက္မွာေဖာ္ျပထားတာကေတာ႕ Views နမူနာတစ္ခုပါ:

	<!-- View stored in app/views/greeting.php -->

	<html>
		<body>
			<h1>Hello, <?php echo $name; ?></h1>
		</body>
	</html>

အဲ႕ဒီ႕အထက္က View ကို browser ကိုေအာက္ကလို retun ျပန္ခဲ႕ပါတယ္

	Route::get('/', function()
	{
		return View::make('greeting', array('name' => 'Taylor'));
	});

The second argument passed to `View::make` is an array of data that should be made available to the view.

#### Data ေတြကို View ဆီကို pass လုပ္ျခင္း

	// Using conventional approach
	$view = View::make('greeting')->with('name', 'Steve');

	// Using Magic Methods
	$view = View::make('greeting')->withName('steve');

အထက္ကဥပမာမွာ `$name` variable ကို view ကေနၿပီးေတာ႕ access လုပ္ႏုိင္ပါတယ္၊ ေနာက္ `Steve` ေကာေပါ႕။

သင္႕အေနနဲ႕ data ထဲက array ေတြကို `make` method ရဲ႕ second partameter မွာ array ျဖစ္တဲ႕ data ကို pass လုပ္ႏိုင္ပါတယ္။ သင္လုပ္ခ်င္ရင္ေပါ႕

	$view = View::make('greetings', $data);

သင္႕အေနနဲ႕ data နည္းနည္း ေလးကို views အားလံုးကို share ႏိုင္ပါတယ္၊

	View::share('name', 'Steve');

#### View တစ္ခုမွ Sub-View တစ္ခုကို pass လုပ္ျခင္း

တစ္ခါတစ္ေလသင္႕အေနနဲ႕ veiw တစ္ခုကေန တစ္ခုေျပာင္းခ်င္ပါလိမ္႕မယ္။ ဥပမာ၊ ဒုတိယ view တစ္ခုကို `app/views/child/view.php` မွာ stored လုပ္ထားတယ္၊ ကြ်န္ေတာ္တို႕ ေနာက္ထက္ View တစ္ခုကို Pass လုပ္ခ်င္တယ္ဆိုရင္... like so:

	$view = View::make('greeting')->nest('child', 'child.view');

	$view = View::make('greeting')->nest('child', 'child.view', $data);

paraent view က sub-view ဆီကေန render လုပ္ႏိုင္ပါၿပီ-

	<html>
		<body>
			<h1>Hello!</h1>
			<?php echo $child; ?>
		</body>
	</html>

<a name="view-composers"></a>
## View Composers

View က rendered ျဖစ္တဲ႕အခ်ိန္မွာ View composers ေတြက callbacks ဒါမွမဟုတ္ရင္ class methods ေတြကို ေခၚခဲ႕တယ္ ။ သင္႕ application မွ render လုပ္ၿပီးေတာ႕ သင့္ရဲ႕ view ကိုအခ်ိန္တိုင္း ေသခ်ာေပါက္ေပးရမယ္႕ data ရွိတဲ႕အခါမ်ိဳးဆိုရင္  ... အဲ႕ဒီ႕ code ကို location တစ္ခုထဲကေန View Composer တစ္ခုက organize လုပ္ႏိုင္တယ္ ။

#### View Composer တစ္ခု သတ္မွတ္ျခင္း

	View::composer('profile', function($view)
	{
		$view->with('count', User::count());
	});

အခု `profile` view က rendered ျဖစ္တဲ႕အခ်ိန္တိုင္းမွာ  `count` data က view ဆီကို bound ပါလိမ္႕မယ္

View composer တစ္ခုကေန Multiple Views ကိုတစ္ႀကိမ္တည္းသင္႕အေနနဲ႕ attach လုပ္ႏိုင္ပါတယ္

    View::composer(array('profile','dashboard'), function($view)
    {
        $view->with('count', User::count());
    });

If you would rather use a class based composer, which will provide the benefits of being resolved through the application [IoC Container](/docs/ioc), you may do so: 

	View::composer('profile', 'ProfileComposer');

View Composer Class တစ္ခုကို ေအာက္ကလုိ define လုပ္ႏိုင္ပါတယ္ :

	class ProfileComposer {

		public function compose($view)
		{
			$view->with('count', User::count());
		}

	}

#### Composer ႏွစ္ခုသတ္မွတ္ျခင္း

တစ္ခ်ိန္တည္းမွာဘဲ Composers Group ေတြကို Register လုပ္ဖို႕သင္႕အေနနဲ႕ `composers` method ကိုသံုးႏိုင္ပါတယ္။


	View::composers(array(
		'AdminComposer' => array('admin.index', 'admin.profile'),
		'UserComposer' => 'user',
	));

> **Note:** There is no convention on where composer classes may be stored. You are free to store them anywhere as long as they can be autoloaded using the directives in your `composer.json` file.

### View Creators ( View ဖန္တီးသူမ်ား)

View **creators** ေတြက view composers ေတြလုပ္သလိုမ်ိဳးတစ္ပံုစံတည္းလုပ္တာပါ။ သို႕ေပမယ္႕လည္း...view ေတြ instantiated ျဖစ္ၿပီးၿပီဆိုမွ သူတို႕က ခ်က္ခ်င္း fired လုပ္တာပါ။ View creator တစ္ခုလုပ္ဖို႕ Register လုပ္ခ်င္တယ္ဆိုရင္ `creator` method ကိုသံုးပါ။

	View::creator('profile', function($view)
	{
		$view->with('count', User::count());
	});

<a name="special-responses"></a>
## Special Responses 

#### JSON Response တစ္ခုျပဳလုပ္ျခင္း

	return Response::json(array('name' => 'Steve', 'state' => 'CA'));

#### JSON Response တစ္ခုျပဳလုပ္ျခင္း

	return Response::json(array('name' => 'Steve', 'state' => 'CA'))->setCallback(Input::get('callback'));

#### File Download Response တစ္ခုျပဳလုပ္ျခင္း

	return Response::download($pathToFile);

	return Response::download($pathToFile, $name, $headers);

> **Note:** Symfony HttpFoundation, which manages file downloads, requires the file being downloaded to have an ASCII file name.

<a name="response-macros"></a>
## Response Macros

သင္႕အေနနဲ႕ကိုယ္ပိုင္ response တစ္ခုျပဳလုပ္ၿပီးေတာ႕ routes နဲ႕ controllers ေတြကေနျပန္ၿပီးေတာ႕အသံုးျပဳခ်င္တယ္ဆိုရင္... သင္႕အေနနဲ႕ `Response::macro` method ကိုသံုးႏိုင္ပါတယ္

	Response::macro('caps', function($value)
	{
		return Response::make(strtoupper($value));
	});

`micro` function ကသူ႕ရဲ႕  name တစ္ခုကို first argument အျဖစ္လက္ခံထားတယ္၊ ေနာက္ Closure ကေတာ႕ သူ႕ရဲ႕ဒုတိယတစ္ခုပါ။ micro name က `Response` class ကို ေခၚတဲ႕အခ်ိန္မွာ macro closure က execute ျဖစ္သြားပါတယ္ :

	return Response::caps('foo');

micros ေတြကို သင္႕ရဲ႕ `app/start`  files ထဲမွာ define လုပ္ထားရပါမယ္။  တစ္နည္းအားျဖင္႕ သင္႕ separate လုပ္ထားတဲ႕ macros ေတြကို `start` files မွာသင္ျပန္ organize လုပ္ရပါမယ္။
