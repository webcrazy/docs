# Requests & Input

- [Basic Input](#basic-input)
- [Cookies](#cookies)
- [Old Input](#old-input)
- [Files](#files)
- [Request Information](#request-information)

<a name="basic-input"></a>
## Basic Input

You may access all user input with a few simple methods. You do not need to worry about the HTTP verb used for the request, as input is accessed in the same way for all verbs.

Http verb ေတြအားလံုးက input ဆီကို ဝင္ေရာက္လာတဲ႕အခ်ိန္မွာ Simple methods ေတြနဲ႕ users အားလံုးရဲ႕ input ေတြကို access လုပ္ႏိုင္ပါတယ္။ Request ေတြအတြက္ HTTP verb ေတြကိုစိုးရိမ္စရာမလိုပါဘူး။

#### Input Value တစ္ခုကိုျပန္လည္ရခ်င္ရင္

	$name = Input::get('name');

#### Input မွာ Value မရွိေသးဘဲ Default Value ျပခ်င္ရင္ -

	$name = Input::get('name', 'Sally');

#### Input Value ရွိတာကိုဆံုးျဖတ္ဖို႕-

	if (Input::has('name'))
	{
		//
	}

#### Input အားလံုးရဲ႕ Request ကိုရခ်င္ရင္-

	$input = Input::all();

#### Input တစ္ခ်ိဳ႕ရဲ႕ Request အားလံုးကိုရခ်င္ရင္-

	$input = Input::only('username', 'password');

	$input = Input::except('credit_card');

When working on forms with "array" inputs, you may use dot notation to access the arrays:
Form ေတြကို arrays input ေတြနဲ႕အသံုးျပဳတဲ႕အခါမွာ arrays ေတြကို access လုပ္ဖို႕ "." သေကၤတကိုအသံုးျပဳရပါမယ္။

	$input = Input::get('products.0.name');

> **Note:** Some JavaScript libraries such as Backbone may send input to the application as JSON. You may access this data via `Input::get` like normal.

<a name="cookies"></a>
## Cookies

Cookies အားလံုးကို Laravel Framework က authernication code နဲ႕ encrypted လုပ္ထားပါတယ္၊ ဒါကဘာကိုဆိုလိုတာလဲဆိုရင္ cookie ေတြကို client ကေျပာင္းလိုက္ၿပီဆိုရင္ သူတို႕တရားမဝင္တာကိုနားလည္လိမ္႕မယ္။

#### Cookie တစ္ခုရဲ႕ Value ကိုရခ်င္ရင္

	$value = Cookie::get('name');

#### Response တစ္ခုဆီကို Cookie အသစ္တစ္ခု attach လုပ္ခ်င္ရင္ -

	$response = Response::make('Hello World');

	$response->withCookie(Cookie::make('name', 'value', $minutes));

#### ေနာက္ Response တစ္ခုအတြက္ Cookie တစ္ခုကို Queue လုပ္ျခင္း
Response မလုပ္ခင္မွာ cookie တစ္ခုကို set ခ်င္တယ္ဆို႔င္ရင္ `Cookie::queue()` method ကိုသံုးပါ။ သင္႕ application မွ ေနာက္ဆံုး response ကို cookie က အလိုလို attach လုပ္သြားပါလိမ္႕မယ္။

	Cookie::queue($name, $value, $minutes);

#### Creating A Cookie That Lasts Forever

	$cookie = Cookie::forever('name', 'value');

<a name="old-input"></a>
## Old Input

သင္႕အေနနဲ႕ request တစ္ခုကေန တစ္ခု အကူးအေျပာင္းအထိ input ေတြကိုထိမ္းသိမ္းထားခ်င္ပါလိမ္႕မယ္... ဥပမာ သင္႕အေနနဲ႕ form input ေတြကို validation လုပ္ၿပီး errors message နဲ႕အတူ input ေတြကိုျပန္ျပတဲ႕ အခ်ိန္မ်ိဳးေပါ႕။

#### Flashing Input To The Session

	Input::flash();

#### Flashing Only Some Input To The Session

	Input::flashOnly('username', 'email');

	Input::flashExcept('password');

Since you often will want to flash input in association with a redirect to the previous page, you may easily chain input flashing onto a redirect.

	return Redirect::to('form')->withInput();

	return Redirect::to('form')->withInput(Input::except('password'));

> **Note:** You may flash other data across requests using the [Session](/docs/session) class.

#### Input Data အေဟာင္းေတြကိုျပန္ၾကည္႕ခ်င္ရင္ -

	Input::old('username');

<a name="files"></a>
## Files

#### File Upload တစ္ခုကိုျပန္ၾကည္႕ခ်င္ရင္ -

	$file = Input::file('photo');

#### File upload လုပ္သြားလား မသြားလား ဆံုးျဖတ္ျခင္ရင္

	if (Input::hasFile('photo'))
	{
		//
	}

The object returned by the `file` method is an instance of the `Symfony\Component\HttpFoundation\File\UploadedFile` class, which extends the PHP `SplFileInfo` class and provides a variety of methods for interacting with the file.

#### File Upload လုပ္တာမွားလားစစ္ခ်င္ရင္ -

	if (Input::file('photo')->isValid())
	{
		//
	}

#### Upload File ကို Move လုပ္ခ်င္ရင္

	Input::file('photo')->move($destinationPath);

	Input::file('photo')->move($destinationPath, $fileName);

#### File Upload လုပ္သြားတဲ႕ လမ္းေၾကာင္းရခ်င္ရင္ -

	$path = Input::file('photo')->getRealPath();

#### Upload File ရဲ႕ မူလအမည္ကိုရခ်င္ရင္ -

	$name = Input::file('photo')->getClientOriginalName();

#### Upload File ရဲ႕ extension ကိုသိခ်င္ရင္

	$extension = Input::file('photo')->getClientOriginalExtension();

#### Upload လုပ္လိုက္တဲ႕ File Size ကိုသိခ်င္ရင္

	$size = Input::file('photo')->getSize();

#### Upload File ရဲ႕ MIME Type ကိုသိခ်င္ရင္

	$mime = Input::file('photo')->getMimeType();

<a name="request-information"></a>
## Request Information

The `Request` class provides many methods for examining the HTTP request for your application and extends the `Symfony\Component\HttpFoundation\Request` class. Here are some of the highlights.

#### Request URI ရဲ႕ လမ္းေၾကာင္းကိုသိခ်င္ရင္

	$uri = Request::path();

#### Request Method ကို retrieving လုပ္ခ်င္ရင္

	$method = Request::method();

	if (Request::isMethod('post'))
	{
		//
	}

#### Request လမ္းေၾကာင္းက pattern တစ္ခုနဲ႕ mathces ျဖစ္လားဆိုတာကိုဆံုးျဖတ္ခ်င္ရင္ -

	if (Request::is('admin/*'))
	{
		//
	}

#### Request URL ကိုရယူျခင္ရင္

	$url = Request::url();

#### Request URI segment ကို retrieve လုပ္ခ်င္ရင္

	$segment = Request::segment(1);

#### Request Header ကိုရခ်င္ရင္ -

	$value = Request::header('Content-Type');

#### Retrieving Values From $_SERVER

	$value = Request::server('PATH_INFO');

#### Request က HTTPS ကလားဆိုတာကိုစစ္ခ်င္ရင္ -

	if (Request::secure())
	{
		//
	}

#### Request က AJAX သံုးထားလားဆိုတာကိုစစ္ခ်င္ရင္

	if (Request::ajax())
	{
		//
	}

#### Request မွာ JSON Content Type ရွိလားဆိုတာကိုစစ္ခ်င္ရင္

	if (Request::isJson())
	{
		//
	}

#### Request က JSON ကို ေတာင္းလားဆိုတာကိုစစ္ခ်င္ရင္

	if (Request::wantsJson())
	{
		//
	}

#### Request ရဲ႕ Response ကို Check လုပ္ခ်င္ရင္

The `Request::format` method will return the requested response format based on the HTTP Accept header:

	if (Request::format() == 'json')
	{
		//
	}
