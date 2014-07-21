# Forms & HTML

- [Form တစ္ခုဖြင့္ျခင္း](#opening-a-form)
- [CSRF Protection](#csrf-protection)
- [Form Model Binding](#form-model-binding)
- [Labels](#labels)
- [Text, Text Area, Password & Hidden Fields](#text)
- [Checkbox မ်ားႏွင့္ Radio Button မ်ား](#checkboxes-and-radio-buttons)
- [File Input](#file-input)
- [Drop-Down Lists](#drop-down-lists)
- [Buttons](#buttons)
- [Custom Macros](#custom-macros)
- [Generating URLs](#generating-urls)

<a name="opening-a-form"></a>
## Form တစ္ခု ဖြင့္ျခင္း

#### Opening A Form

	{{ Form::open(array('url' => 'foo/bar')) }}
		//
	{{ Form::close() }}


default အေနျဖင့္  `POST` method အေနျဖင့္ သတ္မွတ္မည္ ျဖစ္ေသာ္လည္း မိမိတုိ ့ၾကိဳက္ႏွစ္သက္သည့္ အျခား method ကိုလည္း အသုံးျပဳႏုိင္သည္။

	echo Form::open(array('url' => 'foo/bar', 'method' => 'put'))

> **Note:** HTML forms မ်ားတြင္ `POST` ႏွင့္ `GET`၊ `PUT` ႏွင့္ `DELETE` methods  မ်ားသာ အသုံးျပဳႏုိင္မည္ ျဖစ္ျပီး  `_method` ဟုသည့္ hidden field အလုိအေလ်ာက္ ထည့္သြင္းသြားမည္ ျဖစ္သည္။ 

သင့္အေနျဖင့္ Route ႏွင့္ Controller action အေျချပဳ Form မ်ားကုိ ဖြင့္ႏိုင္ဦးမည္ ျဖစ္သည္။

	echo Form::open(array('route' => 'route.name'))

	echo Form::open(array('action' => 'Controller@method'))

သင့္အေနျဖင့္ route ၏ paratmeter ကုိပါ ေအာက္ပါ အတုိင္း ထည့္သြင္းႏိုင္မည္ ျဖစ္သည္။

	echo Form::open(array('route' => array('route.name', $user->id)))

	echo Form::open(array('action' => array('Controller@method', $user->id)))

သင့္၏ Form အေနျဖင့္  file uploads ကုိ လက္ခံလုိပါက `files` option ကုိ array အတြင္းထည့္သြင္း၍ သတ္မွတ္ႏုိင္သည္။

	echo Form::open(array('url' => 'foo/bar', 'files' => true))

<a name="csrf-protection"></a>
## CSRF Protection

#### Form တစ္ခုထဲတြင္ CSRF Token ထည့္သြင္းျခင္း

Laravel အေနျဖင့္ cross-site request forgery မ်ားမွ ကာကြယ္ႏုိင္ရန္ method တစ္ခု ထည့္သြင္းထာသည္။ ပထမဦးစြာ သင့္ User session ထဲတြင္ random token တစ္ခု ထည့္သြင္းထားမည္။ သင့္ အံၾသသြားပါသလား။ စိတ္မပူပါႏွင့္ ၊  အလုိအေလ်ာက္ ထည့္သြင္းသြားမည္ ျဖစ္သည္။ CSRF token သည္ သင့္ Form မ်ားတြင္ hidden field မ်ား အေနျဖင့္ အလုိအေလ်ာက္ ထည့္သြင္းသြားမည္ ျဖစ္သည္။ သုိ ့ေသာ္ သင့္အေနျဖင့္ hidden field ၏ HTML ကုိ generate လုပ္လုိပါက `token` method ကုိ အသုံးျပဳႏုိင္ပါသည္။

	echo Form::token();

#### CSRF Filter ႏွင့္ Route တစ္ခု ခ်ိတ္ဆက္ျခင္း

	Route::post('profile', array('before' => 'csrf', function()
	{
		//
	}));

<a name="form-model-binding"></a>
## Form Model Binding

#### Form Model တစ္ခု ဖြင့္လွစ္ျခင္း

တခါတရံ  သင့္အေနျဖင့္ Model တစ္ခုမွ အခ်က္အလက္မ်ား အတုိင္း Form တစ္ခုကုိ ဖန္တီး လုိခ်င္ေပလိမ့္မည္။ ထုိသုိ ့အသုံးျပဳႏုိင္ရန္ `Form::model` method ကုိ အသုံးျပဳႏုိင္သည္။

	echo Form::model($user, array('route' => array('user.update', $user->id)))

ယခု သင့္အေနျဖင့္ Form element တစ္ခု ဥပမာ text input ကဲ့သုိ ့ကုိ Model ၏ value ႏွင့္ ခ်ိတ္ဆက္ျပီး အလုိအေလ်ာက္အေနျဖင့္ ထုိ္ field ၏ အခ်က္အလက္မ်ားကုိ ထည့္သြင္းသြားမည္ ျဖစ္သည္။ ထုိေၾကာင့္ ဥပမာ `email` field တစ္ခု ဆုိပါစုိ ့ user model ၏ `email` attribute သည္ value အေနျဖင့္ အလုိအေလ်ာက္ အေနျဖင့္ ေဖာ္ျပထားမည္ ကုိ ေတြ  ့ရမည္။ သုိ ့ေသာ္ ဒါတင္ မကေသးပါဘူး။ Session Flash အခ်က္အလက္ႏွင့္  input name တုိ ့ကုိက္ညီပါက ကုိက္ညီေသာ model ၏ အခ်က္အလက္မ်ားကို ထည့္သြင္းသြားမည္ ျဖစ္သည္။ ထုိေၾကာင့္ အစီအစဥ္အားျဖင့္ ေအာက္ပါ အတုိင္း ျဖစ္ေပမည္။


1. Session Flash Data (Input အေဟာင္းမ်ား)
2. Explicitly Passed Value
3. Model Attribute Data

ထုိသုိ ့ ျပဳလုပ္ျခင္းအားျဖင့္  model value မ်ားႏွင့္ ခ်ိတ္ဆက္ထားရုံသာ မက validation error မ်ားကုိပါ ျပန္လည္ ေဖာ္ျပႏုိင္သည့္ Form မ်ားကုိ အလြယ္တကူ ေဖာ္ျပႏုိင္မည္ ျဖစ္သည္။

> **သတိျပဳရန္:** `Form::model` ကုိ အသုံးျပဳပါက `Form::close` ျဖင့္ Form ကုိ မျဖစ္မေန ပိတ္ေပးရန္ လုိလိမ့္မည္။ 

<a name="labels"></a>
## Labels

#### Label တစ္ခု တည္ေဆာက္ျခင္း

	echo Form::label('email', 'E-Mail Address');

####  အျခားေသာ HTML Attributes ထည့္သြင္း သတ္မွတ္ျခင္း

	echo Form::label('email', 'E-Mail Address', array('class' => 'awesome'));

> **Note:** label တစ္ခုကို တည္ေဆာက္ျပီးပါက Label name ျဖင့္ တူညီသည့္ အျခား Form element တုိင္းကုိ label name တြင္ပါဝင္ ID ကို အလုိအေလ်ာက္ ထည့္သြင္းေပးမည္ ျဖစ္သည္။

<a name="text"></a>
## Text, Text Area, Password & Hidden Fields

#### Text Input တစ္ခု ထည့္သြင္းျခင္း

	echo Form::text('username');

#### Default Value တစ္ခု ထည့္သြင္းျခင္း

	echo Form::text('email', 'example@gmail.com');

> **သတိျပဳရန္:**  *hidden* ႏွင့္ *textarea* method မ်ားမွာ *text* method ႏွင့္ အတူတူပင္ ျဖစ္သည္။

#### Password Input တစ္ခု ထည့္သြင္းျခင္း

	echo Form::password('password');

#### အျခား Input မ်ား ထည့္သြင္းျခင္း

	echo Form::email($name, $value = null, $attributes = array());
	echo Form::file($name, $attributes = array());

<a name="checkboxes-and-radio-buttons"></a>
## Checkbox မ်ားႏွင့္ Radio Button မ်ား

####  Checkbox သုိ ့မဟုတ္ Radio Input တစ္ခု ထည့္သြင္းျခင္း

	echo Form::checkbox('name', 'value');

	echo Form::radio('name', 'value');

####  နဂုိကတည္းက ေရြးခ်ယ္ထားသည့္ Checkbox သုိ ့မဟုတ္ Radio Input တစ္ခု ထည့္သြင္းျခင္း

	echo Form::checkbox('name', 'value', true);

	echo Form::radio('name', 'value', true);

<a name="file-input"></a>
## File Input

#### File Input တစ္ခု ထည့္သြင္းျခင္း

	echo Form::file('image');

> **သတိျပဳရန္:**  form ထဲတြင္ `files` option ကုိ `true` ေပးထားရန္လုိေပမည္။

<a name="drop-down-lists"></a>
## Drop-Down Lists

#### Drop-Down List တစ္ခု ထည့္သြင္းျခင္း

	echo Form::select('size', array('L' => 'Large', 'S' => 'Small'));

#### ေရြးခ်ယ္ထားသည့္ Drop-Down List တစ္ခု ထည့္သြင္းျခင္း

	echo Form::select('size', array('L' => 'Large', 'S' => 'Small'), 'S');

#### Grouped List တစ္ခု ထည့္သြင္းျခင္း

	echo Form::select('animal', array(
		'Cats' => array('leopard' => 'Leopard'),
		'Dogs' => array('spaniel' => 'Spaniel'),
	));

#### Range သတ္မွတ္ထားသည့္  Drop-Down List တစ္ခု ထည့္သြင္းျခင္း

    echo Form::selectRange('number', 10, 20);

#### ၁၂ လကုိ ေဖာ္ျပထားသည့္ List တစ္ခုထည့္သြင္းျခင္း

    echo Form::selectMonth('month');

<a name="buttons"></a>
## Buttons

#### Submit Button တစ္ခုထည့္သြင္းျခင္း

	echo Form::submit('Click Me!');

> **သတိျပဳရန္:**  button element ျပဳလုပ္လုိပါသလား ?  *button* method ကုိ အသုံးျပဳႏုိင္သည္။ ၄င္းမွာ *submit* ႏွင့္ အတူတူပင္ျဖစ္သည္။

<a name="custom-macros"></a>
## Custom Macros

####  Form Macro တစ္ခု သတ္မွတ္ျခင္း

"macros" ဟု ေခၚသည့္ မိမိတုိ ့စိတ္ၾကိဳက္  custom Form class helpers မ်ားကုိထည့္သြင္းႏုိင္သည္။ ေရွးဦးစြာ မိမိတုိ ့သတ္မွတ္လုိသည့္ macro တစ္ခုကို Closure ျဖင့္ သတ္မွတ္ႏုိင္သည္။

	Form::macro('myField', function()
	{
		return '<input type="awesome">';
	});

ထုိေနာက္ သင့္အေနျဖင့္ အဆုိပါ အမည္ျဖင့္ macro တစ္ခုကို ေခၚဆုိႏုိင္သည္။

#### Calling A Custom Form Macro

	echo Form::myField();


<a name="generating-urls"></a>
## URL မ်ားထည့္သြင္းျခင္း 

URL မ်ားထည့္သြင္းျခင္းႏွင့္ ပတ္သတ္၍ သိရွိလုိပါက documentation မွ [helpers](helpers#urls.md) တြင္ ၾကည့္ရႈႏုိင္သည္။
