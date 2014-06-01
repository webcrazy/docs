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

View composers are callbacks or class methods that are called when a view is rendered. If you have data that you want bound to a given view each time that view is rendered throughout your application, a view composer can organize that code into a single location. Therefore, view composers may function like "view models" or "presenters".

#### Defining A View Composer

	View::composer('profile', function($view)
	{
		$view->with('count', User::count());
	});

Now each time the `profile` view is rendered, the `count` data will be bound to the view.

You may also attach a view composer to multiple views at once:

    View::composer(array('profile','dashboard'), function($view)
    {
        $view->with('count', User::count());
    });

If you would rather use a class based composer, which will provide the benefits of being resolved through the application [IoC Container](/docs/ioc), you may do so:

	View::composer('profile', 'ProfileComposer');

A view composer class should be defined like so:

	class ProfileComposer {

		public function compose($view)
		{
			$view->with('count', User::count());
		}

	}

#### Defining Multiple Composers

You may use the `composers` method to register a group of composers at the same time:

	View::composers(array(
		'AdminComposer' => array('admin.index', 'admin.profile'),
		'UserComposer' => 'user',
	));

> **Note:** There is no convention on where composer classes may be stored. You are free to store them anywhere as long as they can be autoloaded using the directives in your `composer.json` file.

### View Creators

View **creators** work almost exactly like view composers; however, they are fired immediately when the view is instantiated. To register a view creator, simple use the `creator` method:

	View::creator('profile', function($view)
	{
		$view->with('count', User::count());
	});

<a name="special-responses"></a>
## Special Responses

#### Creating A JSON Response

	return Response::json(array('name' => 'Steve', 'state' => 'CA'));

#### Creating A JSONP Response

	return Response::json(array('name' => 'Steve', 'state' => 'CA'))->setCallback(Input::get('callback'));

#### Creating A File Download Response

	return Response::download($pathToFile);

	return Response::download($pathToFile, $name, $headers);

> **Note:** Symfony HttpFoundation, which manages file downloads, requires the file being downloaded to have an ASCII file name.

<a name="response-macros"></a>
## Response Macros

If you would like to define a custom response that you can re-use in a variety of your routes and controllers, you may use the `Response::macro` method:

	Response::macro('caps', function($value)
	{
		return Response::make(strtoupper($value));
	});

The `macro` function accepts a name as its first argument, and a Closure as its second. The macro's Closure will be executed when calling the macro name on the `Response` class:

	return Response::caps('foo');

You may define your macros in one of your `app/start` files. Alternatively, you may organize your macros into a separate file which is included from one of your `start` files.
