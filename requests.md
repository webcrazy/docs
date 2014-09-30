# Requests နှင့် Input များအကြောင်း 

- [Basic Input](#basic-input)
- [Cookies](#cookies)
- [Old Input](#old-input)
- [Files](#files)
- [Request Information](#request-information)

<a name="basic-input"></a>
## Basic Input


Http အချက်အလက် တွေအားလုံးက input ဆီကို ဝင်ရောက်လာတဲ့အချိန်မှာ ရိုးရှင်းလွယ်ကူလှတဲ့ method တွေကို အသုံးပြုပြီး users အားလုံးရဲ့ input တွေကို access လုပ်နိုင်ပါတယ်။ Request တွေအတွက် HTTP အချက်အလက်များကိုစိုးရိမ်စရာမလိုပါဘူး။

#### Input Value တစ်ခုကိုပြန်လည်ရချင်ရင်

	$name = Input::get('name');

#### Input မှာ Value မရှိသေးဘဲ Default Value ပြချင်ရင် -

	$name = Input::get('name', 'Sally');

#### Input Value ရှိတာကိုဆုံးဖြတ်ဖို့-

	if (Input::has('name'))
	{
		//
	}

#### Input အားလုံးရဲ့ Request ကိုရချင်ရင်-

	$input = Input::all();

#### Input တစ်ချို့ရဲ့ Request အားလုံးကိုရချင်ရင်-

	$input = Input::only('username', 'password');

	$input = Input::except('credit_card');

Form တွေကို arrays input တွေနဲ့အသုံးပြုတဲ့အခါမှာ arrays တွေကို access လုပ်ဖို့ "." သင်္ကေတကိုအသုံးပြုရပါမယ်။

	$input = Input::get('products.0.name');

> **သတိပြုရန်:** တချို့  JavaScript library များ  (ဥပမာ Backbone) application သို့ JSON အနေဖြင့် အချက်အလက်များကို ပို့ဆောင် မည်ဖြစ်သည်။ သင့်အနေဖြင့်  အဆိုပါ အချက်အလက်များကိုလည်း နဂိုအတိုင်း  `Input::get` ကို အသုံးပြု၍ ထုတ်ယူနိုင်သည်။


<a name="cookies"></a>
## Cookies

Cookies အားလုံးကို Laravel Framework က authernication code နဲ့ encrypted လုပ်ထားပါတယ်၊ ဒါကဘာကိုဆိုလိုတာလဲဆိုရင် cookie တွေကို client ကပြောင်းလိုက်ပြီဆိုရင် သူတို့တရားမဝင်တာကိုနားလည်လိမ့်မယ်။

#### Cookie တစ်ခုရဲ့ Value ကိုရချင်ရင်

	$value = Cookie::get('name');

#### Response တစ်ခုဆီကို Cookie အသစ်တစ်ခု attach လုပ်ချင်ရင် -

	$response = Response::make('Hello World');

	$response->withCookie(Cookie::make('name', 'value', $minutes));

#### နောက် Response တစ်ခုအတွက် Cookie တစ်ခုကို Queue လုပ်ခြင်း

Response မလုပ်ခင်မှာ cookie တစ်ခုကို set ချင်တယ်ဆို့င်ရင် `Cookie::queue()` method ကိုသုံးပါ။ သင့် application မှ နောက်ဆုံး response ကို cookie က အလိုလို attach လုပ်သွားပါလိမ့်မယ်။

	Cookie::queue($name, $value, $minutes);

#### Cookie တစ်ခုကို အချိန်အကန့် အသတ်မရှိ ဖန်တီးခြင်း 

	$cookie = Cookie::forever('name', 'value');

<a name="old-input"></a>
## Old Input

သင့်အနေနဲ့ request တစ်ခုကနေ တစ်ခု အကူးအပြောင်းအထိ input တွေကိုထိမ်းသိမ်းထားချင်ပါလိမ့်မယ်... ဥပမာ သင့်အနေနဲ့ form input တွေကို validation လုပ်ပြီး errors message နဲ့အတူ input တွေကိုပြန်ပြတဲ့ အချိန်မျိုးပေါ့။

#### Flashing Input To The Session

	Input::flash();

#### Flashing Only Some Input To The Session

	Input::flashOnly('username', 'email');

	Input::flashExcept('password');

တခါတရံ သင့်အနေဖြင့်  flash input များကို ယခင် page ဖြင့် ချိတ်ဆက် လုပ်ဆောင်လိုသည်များ ရှိပေမည်။ ထိုသို့ အခြေအနေများတွင် သင့် အနေဖြင့်  အလွယ်တကူ ချိတ်ဆက် အသုံးပြုနိုင်သည်။

	return Redirect::to('form')->withInput();

	return Redirect::to('form')->withInput(Input::except('password'));

> **သတိပြုရန်:** သင့်အနေဖြင့် [Session](session.md) ကိုအသုံးပြုပြီး flash မည်သို့ မည်ပုံပြုလုပ်သွားသည်ကို သိရှိလိုပေမည်။  

#### Input Data အဟောင်းတွေကိုပြန်ကြည့်ချင်ရင် -

	Input::old('username');

<a name="files"></a>
## Files

#### File Upload တစ်ခုကိုပြန်ကြည့်ချင်ရင် -

	$file = Input::file('photo');

#### File upload လုပ်သွားလား မသွားလား ဆုံးဖြတ်ခြင်ရင်

	if (Input::hasFile('photo'))
	{
		//
	}



The object returned by the `file` method မှပြန်လာသည့် object မှာ `Symfony\Component\HttpFoundation\File\UploadedFile` ၏ instance ဖြစ်ပြီး  PHP မှ `SplFileInfo` class ကို extend လုပ်ထားခြင်း ဖြစ်၍  file နဲ့ပတ်သတ်သည့်  method အတော်များများကို ထောက်ပံ့ပေးနိုင်သည်။ 

#### File Upload လုပ်တာမှားလားစစ်ချင်ရင် -

	if (Input::file('photo')->isValid())
	{
		//
	}

#### Upload File ကို Move လုပ်ချင်ရင်

	Input::file('photo')->move($destinationPath);

	Input::file('photo')->move($destinationPath, $fileName);

#### File Upload လုပ်သွားတဲ့ လမ်းကြောင်းရချင်ရင် -

	$path = Input::file('photo')->getRealPath();

#### Upload File ရဲ့ မူလအမည်ကိုရချင်ရင် -

	$name = Input::file('photo')->getClientOriginalName();

#### Upload File ရဲ့ extension ကိုသိချင်ရင်

	$extension = Input::file('photo')->getClientOriginalExtension();

#### Upload လုပ်လိုက်တဲ့ File Size ကိုသိချင်ရင်

	$size = Input::file('photo')->getSize();

#### Upload File ရဲ့ MIME Type ကိုသိချင်ရင်

	$mime = Input::file('photo')->getMimeType();

<a name="request-information"></a>
## Request အချက်အလက်များ 


`Request` class သည် HTTP request များနှင့်ပတ်သတ်သည့် method များကို ထောက်ပံ့ပေးထားပြီး  `Symfony\Component\HttpFoundation\Request` မှ extend လုပ်ထားခြင်း ဖြစ်သည်။ ၎င်းတို့ အနက်မှ အောက်ပါတို့ကို hightlight လုပ်ထားပါသည်။


#### Request URI ရဲ့ လမ်းကြောင်းကိုသိချင်ရင်

	$uri = Request::path();

#### Request Method ကို retrieving လုပ်ချင်ရင်

	$method = Request::method();

	if (Request::isMethod('post'))
	{
		//
	}

#### Request လမ်းကြောင်းက pattern တစ်ခုနဲ့ mathces ဖြစ်လားဆိုတာကိုဆုံးဖြတ်ချင်ရင် -

	if (Request::is('admin/*'))
	{
		//
	}

#### Request URL ကိုရယူခြင်ရင်

	$url = Request::url();

#### Request URI segment ကို retrieve လုပ်ချင်ရင်

	$segment = Request::segment(1);

#### Request Header ကိုရချင်ရင် -

	$value = Request::header('Content-Type');

#### Retrieving Values From $_SERVER

	$value = Request::server('PATH_INFO');

#### Request က HTTPS ကလားဆိုတာကိုစစ်ချင်ရင် -

	if (Request::secure())
	{
		//
	}

#### Request က AJAX သုံးထားလားဆိုတာကိုစစ်ချင်ရင်

	if (Request::ajax())
	{
		//
	}

#### Request မှာ JSON Content Type ရှိလားဆိုတာကိုစစ်ချင်ရင်

	if (Request::isJson())
	{
		//
	}

#### Request က JSON ကို တောင်းလားဆိုတာကိုစစ်ချင်ရင်

	if (Request::wantsJson())
	{
		//
	}

#### Request ရဲ့ Response ကို Check လုပ်ချင်ရင်


`Request::format` method မှ HTTP Accept header ၏ ပုံစံကို return ပြန်လာမည် ဖြစ်သည်။  

	if (Request::format() == 'json')
	{
		//
	}
 Save Copy
