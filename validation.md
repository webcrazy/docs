# စိစစ်ခြင်း

- [အခြေခံအသုံးပြုပုံ](#basic-usage)
- [Error message များ](#working-with-error-messages)
- [Error Messages များနှင့် View များ](#error-messages-and-views)
- [အသုံးပြနိုင်သည့် Validation Rule များ](#available-validation-rules)
- [အခြေအနေအလိုက် ထည့်သွင်းနိုင်သည့်ု Rules များ](#conditionally-adding-rules)
- [ကိုယ်ပိုင် Error Message များ](#custom-error-messages)
- [ကိုယ်ပိုင် Validation Rule များ](#custom-validation-rules)

<a name="basic-usage"></a>
## အခြေခံအသုံးပြုပုံ

Laravel အနေဖြင့် data များကို စိစစ်ရာတွင် ရိုးရှင်း အဆင်ပြေသော နည်းလမ်းများကို အသုံးပြုထားသည်။ error message များကို `Validation` class မှ တဆင့် ထုတ်ယူနိုင်သည်။

#### အခြေခံအသုံးပြုပုံ ဥပမာ

	$validator = Validator::make(
		array('name' => 'Dayle'),
		array('name' => 'required|min:5')
	);

Validation ပြုလုပ်ရာတွင်  `make` method ဟုသည့် method ကို အသုံးပြုပြီး array တွင်းပါရှိမည့် ပထမ argument မှာ data ဖြစ်ပြီး ဒုတိယ argument မှာ ထို data များကို စိစစ်သည့် rule များကို ထည့်သွင်းရမည်။


#### Array ကို အသုံးပြု၍ Rule များ သတ်မှတ်ခြင်း

တခုထက်ပိုသော rule များကို သတ်မှတ်လိုပါက "pipe" character ကိုဖြစ်စေ array အတွင်း ခြား၍ဖြစ်စေ ထည့်သွင်းနိုင်သည်။

	$validator = Validator::make(
		array('name' => 'Dayle'),
		array('name' => array('required', 'min:5'))
	);

#### Fields များစွာကို စိစစ်ခြင်း

    $validator = Validator::make(
        array(
            'name' => 'Dayle',
            'password' => 'lamepassword',
            'email' => 'email@example.com'
        ),
        array(
            'name' => 'required',
            'password' => 'required|min:8',
            'email' => 'required|email|unique:users'
        )
    );

`Validator` instance ကို ပြုလုပ်ပြီးပါက `fails` သို ့မဟုတ် `passes` method ကို အသုံးပြု၍ အချက်အလက်များ စိစစ်နိုင်သည်။


	if ($validator->fails())
	{
		// The given data did not pass validation
	}

စိစစ်ခြင်း မအောင်မြင်ပါက validator မှ error message ကို ရယူနိုင်ပေသည်။

	$messages = $validator->messages();

်fail ဖြစ်သည့် rule များကိုသာ ရယူလိုပြီး message များ မပါဝင်စေလိုပါက `failed` method ကို အသုံးပြုနိုင်သည်။

	$failed = $validator->failed();

#### Files များစိစစ်ခြင်း

`Validator` class အနေဖြင့် `size` နှင့် `mimes` အပါအဝင် များမြောင်လှသော validation method များကို အထောက်အပံ့ပေးထားပြီး file များ validate ပြုလုပ်လိုပါက ထိုထဲ့သို့ ထည့်သွင်းရန်သာ လိုပေမည်။


<a name="working-with-error-messages"></a>
## Error Messages များနှင့် လှုပ်ရှားခြင်း


After calling the  on a 
`Validator` instance မှ `messages` method ကို ခေါ်ပြီးပါက Error message များဖြင့် အလုပ်လုပ်ရာတွင် လွယ်ကူစေမည့် method များစွာပါဝင်မည့် `MessageBag` ပါဝင်မည် ဖြစ်သည်။

#### Field တစ်ခုမှ ပထမဆုံး Error Message ကို ထုတ်ယူခြင်း

	echo $messages->first('email');

#### Field တစ်ခုမှ Error Message များထုတ်ယူခြင်း

	foreach ($messages->get('email') as $message)
	{
		//
	}

#### Field အားလုံးမှ Error Message များထုတ်ယူခြင်း

	foreach ($messages->all() as $message)
	{
		//
	}

#### Field တစ်ခုမှ message ရှိမရှိ စစ်ဆေးခြင်း

	if ($messages->has('email'))
	{
		//
	}

#### Error Message များအား Format ပြောင်း၍ ထုတ်ယူခြင်း

	echo $messages->first('email', '<p>:message</p>');
	
> **မှတ်ချက်:**  ပုံမှန်အားဖြင့် messages များကို Bootstrap ဖြင့် အဆင်ပြေမည့် ပုံစံများအနေဖြင့် သတ်မှတ်ထားပါသည်။

#### Error Messages များအား Format တစ်ခု သတ်မှတ်၍ ထုတ်ယူခြင်း

	foreach ($messages->all('<li>:message</li>') as $message)
	{
		//
	}

<a name="error-messages-and-views"></a>
## Error Message များနှင့် View များ

Validation ကို ဆောင်ရွက်ပြီးသည်နှင့် Error message များကို လွယ်လင့်တကူ ပြန်လည်ပြသနိုင်ရန် လိုအပ်ပေသည်။ ထိုလိုအပ်ချက်များကို Laravel မှ အဆင်ပြေလွယ်ကူစွာ ဖြည့်စွမ်းထားသည်။ အောက်ပါ route များကို ဥပမာ အနေဖြင့် ကြည့်ပါ။

	Route::get('register', function()
	{
		return View::make('user.register');
	});

	Route::post('register', function()
	{
		$rules = array(...);

		$validator = Validator::make(Input::all(), $rules);

		if ($validator->fails())
		{
			return Redirect::to('register')->withErrors($validator);
		}
	});

	
စိစစ်ခြင်း မအောင်မြင်ပါက `Validator` instance ကို `withErrors` method ဖြင့် Error များကို passing ပေးလိုက်ပြီး Redirect ပြုလုပ်လိုက်သည် ကို တွေ့ရပေမည်။ အဆိုပါ method ကို အသုံးပြုခြင်းဖြင့် error message များကို လွယ်လင့်တကူ ဖြတ်ကနဲ  ပြသရာတွင် သုံးနိုင်ရင် next request ၏ Session ထဲတွင် ထည့်သွင်းထားပါသည်။

သို့ပင်သော်ညား GET route နဲ့ Error Message များကို အသေချည်နှောင်ထားရန် မလိုသည်ကို သတိပြုရမည်။ အဘယ်ကြောင့်ဆိုသော် Laravel သည် Session data များမှ Error များကို စစ်ဆေးပြီး view ဆီသို့ အဆင်ပြေသည်နှင့် တပြိုင်နက် ပြသနိုင်ရန် ပြင်ဆင်ထားသည်ကို သတိပြုရမည်။ **ထိုကြောင့် အရေးကြီးသည့် အချက်မှာ`$errors` ဟုသည် variable မှာ သင့် view ၏ request တိုင်းတွင် ပြင်ဆင်ထားသောကြောင့် အမြဲတမ်း အဆင်သင့် ဖြစ်နေသည်ကို မှတ်ထားရန်လိုသည်။ `$errors` variable မှာ `MessageBag` ၏ instance ဖြစ်သည်။

ထိုကြောင့် redirect ပြုလုပ်ပြီးနောက် `$errors` variable နှင့် သင့် view မှာ အလိုအလျောက် ချည်နှောင်ပြီးသား ဖြစ်ပေသည်။

	<?php echo $errors->first('email'); ?>

### အမည်ပေးထားသော Error Bag များ

သင့်အနေဖြင့် Page တစ်ခုတည်းတွင် များပြားလှသော form များသည်ရှိသည် ဆိုပါစို့။ ထိုအခါ သင့်အနေဖြင့် Error များ၏ `MessageBag` များကို ကွဲပြားခြားနား စေရန် အမည်နာမ ပေးလိုပေမည်။ ထိုအခါတွင် သင့်အနေဖြင့် `withErrors` ဟုသည့် method ၏ ဒုတိယ argument အနေဖြင့် မိမိပေးလိုသည့် အမည်ကို ထည့်သွင်းနိုင်သည်။

	return Redirect::to('register')->withErrors($validator, 'login');

ထိုနောက် သင့်အနေဖြင့် `$errors` variable မှ `MessageBag` instance ကို အောက်ပါအတိုင်း ဆွဲထုတ်နိုင်သည်။

	<?php echo $errors->login->first('email'); ?>

<a name="available-validation-rules"></a>
## အသုံးပြုနိုင်သည့် စိစစ်ခြင်း Rule များ

အောက်တွင် ဖော်ပြထားသည်မှာ အသုံးပြုနိုင်သော စိစစ်ရေး rule များနှင့် ၄င်းတို့၏ function များဖြစ်ကြသည်။

- [Accepted](#rule-accepted)
- [Active URL](#rule-active-url)
- [After (Date)](#rule-after)
- [Alpha](#rule-alpha)
- [Alpha Dash](#rule-alpha-dash)
- [Alpha Numeric](#rule-alpha-num)
- [Array](#rule-array)
- [Before (Date)](#rule-before)
- [Between](#rule-between)
- [Confirmed](#rule-confirmed)
- [ရက်စွဲ](#rule-date)
- [Date Format](#rule-date-format)
- [Different](#rule-different)
- [Digits](#rule-digits)
- [Digits Between](#rule-digits-between)
- [E-Mail](#rule-email)
- [Exists (Database)](#rule-exists)
- [Image (File)](#rule-image)
- [In](#rule-in)
- [ကိန်းပြည့်များ](#rule-integer)
- [IP Address](#rule-ip)
- [Max](#rule-max)
- [MIME Types](#rule-mimes)
- [Min](#rule-min)
- [Not In](#rule-not-in)
- [Numeric](#rule-numeric)
- [Regular Expression](#rule-regex)
- [Required](#rule-required)
- [Required If](#rule-required-if)
- [Required With](#rule-required-with)
- [Required With All](#rule-required-with-all)
- [Required Without](#rule-required-without)
- [Required Without All](#rule-required-without-all)
- [Same](#rule-same)
- [Size](#rule-size)
- [Unique (Database)](#rule-unique)
- [URL](#rule-url)

<a name="rule-accepted"></a>
#### accepted

အဆိုပါ field တွင် စိစစ်သည်မှာ  _yes_, _on_, သို ့မဟုတ်  _1_  တို့ဖြစ်သည်။ "Terms of Service" ကဲ့သို့ တခုသာ ရွေးမရွေး စိစစ်ရာနေရာများတွင် ၄င်းကို အသုံးပြုနိုင်သည်။


<a name="rule-active-url"></a>
#### active_url

အဆိုပါ field တွင် စိစစ်သည်မှာ `checkdnsrr` ဟုသည် PHP function ကို အသုံးပြု၍ အင်ထုထားသည့် URL ဟုတ်မဟုတ်ကို စစ်ဆေးသွားမည် ဖြစ်သည်။

<a name="rule-after"></a>
#### after:_date_

အဆိုပါ field တွင် စိစစ်သည်မှာ သတ်မှတ်ထားသော date အတွင်းတွင်သာ ထည့်သွင်းစေရန် ဖြစ်သည်။ date များကို  PHP ၏ `strtotime` function ကို အသုံးပြု၍ ပြောင်းလဲကာ စိစစ်သွားမည် ဖြစ်သည်။

<a name="rule-alpha"></a>
#### alpha
အဆိုပါ field တွင် ပါဝင်သော အချက်အလက်များသည် အက္ခရာ များသာ ဖြစ်ရမည် ဖြစ်သည်။ ဥပမာ ကိန်းဂဏန်းများကို လက်ခံသွားမည် မဟုတ်။

<a name="rule-alpha-dash"></a>
#### alpha_dash

အဆိုပါ field တွင် ပါဝင်သော အချက်အလက်များသည် အက္ခရာ နှင့် ကိန်းဂဏန်းများသာ မက dash နှင့် underscore ကိုပါ လက်ခံသွားမည် ဖြစ်သည်။

<a name="rule-alpha-num"></a>
#### alpha_num

အဆိုပါ field တွင် ပါဝင်သော အချက်အလက်များသည် အက္ခရာ နှင့် ကိန်းဂဏန်းများသာ လက်ခံသွားမည်။

<a name="rule-array"></a>
#### array

အဆိုပါ field တွင် ပါဝင်သော အချက်အလက်များသည် array အမျိုးအစားကိုသာ လက်ခံသွားမည်။

<a name="rule-before"></a>
#### before:_date_

အဆိုပါ field တွင်ပါဝင်သော အချက်အလက်များကို date ဖြင့် စိစစ်သတ်မှတ်ခြင်း ဖြစ်သည်။ dates များကို PHP မှ `strtotime` function ကို အသုံးပြု၍ passing ပေးသွားမည် ဖြစ်သည်။

<a name="rule-between"></a>
#### between:_min_,_max_

အဆိုပါ field တွင်ထည့်သွင်းသော အချက်အလက်များ ၏ အများဆုံးနှင့် အနည်းဆုံး တန်ဖိုးများကို သတ်မှတ်ခြင်း ဖြစ်ပြီး String ၊ numeric နှင့် file များကို `size` rule ကို အသုံးပြုသကဲ့သို့ ဆင်တင်တင်ပင် ဖြစ်သည်။

<a name="rule-confirmed"></a>
#### confirmed

အဆိုပါ field ၏ အချက်အလက်သည် ရည်ညွန်း field ၏ အချက်အလက် ဥပမာ `foo_confirmation`  နှင့် တူညီရမည် ဖြစ်သည်။ ဥပမာ ပြုရသော် `password` field သည် `password_confirmation` field နှင့် ထပ်တူညီရမည် ဖြစ်သည်။

<a name="rule-date"></a>
#### date

တိကျ မှန်ကန်သော date ဖြစ်စေရန် စိစစ်ပေးပြီး `strtotime` ဟူသော PHP function ကို အသုံးပြုထားသည်။

<a name="rule-date-format"></a>
#### date_format:_format_

အဆိုပါ field မှ format နှင့် တူညီရမည် ဖြစ်ပြီး `date_parse_from_format` ဟူသည် PHP function ကို အသုံးပြုထားသည်။

<a name="rule-different"></a>
#### different:_field_

အဆိုပါ field သည် အခြား ရည်ညွန်း field နှင့် လုံးဝ ကွဲပြားခြားရမည် ဖြစ်သည်။
The given _field_ must be different than the field under validation.

<a name="rule-digits"></a>
#### digits:_value_

အဆိုပါ file တွင် numeric value ဖြစ်ပြီး တိကျသေချာသော ဂဏန်း အလုံးအရေအတွက် ကိုသာ ထည့်သွင်းရမည်ဖြစ်သည်။

<a name="rule-digits-between"></a>
#### digits_between:_min_,_max_

အဆို field တွင် _min_ and _max_ အကြား ထည့်သွင်းရသော ဂဏန်းအလုံးအရေအတွက်ကိုသာ ထည့်သွင်းခွင့်ရမည်ဖြစ်သည်။

<a name="rule-email"></a>
#### email

အဆိုပါ field တွင် email address format အတိုင်း ထည့်သွင်းထားခြင်း ရှိမရှိ စစ်ဆေးသွားမည် ဖြစ်သည်။

<a name="rule-exists"></a>
#### exists:_table_,_column_

ထို field ကို validation တွင် ထည့်သွင်းပါက database တွင်ပါရှိသည့် table column ဖြင့် တိုက်စစ်မည် ဖြစ်သည်။

#### Exists Rule ကို အသုံးပြုပုံ

	'state' => 'exists:states'

#### Custom Column Name ဖြင့်စစ်ဆေးခြင်း

	'state' => 'exists:states,abbreviation'

သင့်အနေဖြင့် အခြားသော condition များထည့်သွင်းပါက "where" clause ကို အသုံးပြု၍ စစ်ဆေးမည် ဖြစ်သည်။

	'email' => 'exists:staff,email,account_id,1'

သင့်အနေဖြင့် `NULL` database value များကိုလည်း သတ်မှတ်စစ်ဆေးနိုင်မည် ဖြစ်သည်။

	'email' => 'exists:staff,email,deleted_at,NULL'

<a name="rule-image"></a>
#### ပုံများ

ထို validation ဖြင့် စစ်ဆေးထားပါက တင်လိုက်သော file များကို ပုံဟုတ်မဟုတ် စစ်ဆေးသွားမည် ဖြစ်သည်။  (jpeg, png, bmp, or gif)

<a name="rule-in"></a>
#### in:_foo_,_bar_,...

list အတွင်းရှိ value များဖြင့် မှန်မမှန် စစ်ဆေးသွားမည် ဖြစ်သည်။

<a name="rule-integer"></a>
#### ကိန်းပြည့်များ

ထို field အတွင်းရှိ အချက်အလက်များကို ကိန်းပြည့် ဟုတ်မဟုတ် စစ်ဆေးသွားမည် ဖြစ်သည်။

<a name="rule-ip"></a>
#### ip

ထို field အတွင်းရှိ အချက်အလက်များကို IP address ပုံစံဖြင့် ထည့်သွင်းသွားခြင်း ဟုတ်မဟုတ် စစ်ဆေးသွားမည် ဖြစ်သည်။

<a name="rule-max"></a>
#### max:_value_

ထို field အတွင်းရှိ အချက်အလက်များ၏ အများဆုံး value ကို သတ်မှတ်ထားခြင်းဖြစ်သည်။ Strings များ numerics များနှင့် file များကိုမူ `size` ဆိုသည့် rule ကို အသုံးပြုနိုင်မည် ဖြစ်သည်။

<a name="rule-mimes"></a>
#### mimes:_foo_,_bar_,...

အဆိုပါ file သည် MIME type ဟုတ်မဟုတ် စစ်ဆေးသွားမည် ဖြစ်သည်။

#### Basic Usage Of MIME Rule

	'photo' => 'mimes:jpeg,bmp,png'

<a name="rule-min"></a>
#### min:_value_

ထို field အတွင်းရှိ အချက်အလက်များ၏ အနည်းဆုံး value ကို သတ်မှတ်ထားခြင်းဖြစ်သည်။ Strings များ numerics များနှင့် file များကိုမူ `size` ဆိုသည့် rule ကို အသုံးပြုနိုင်မည် ဖြစ်သည်။

<a name="rule-not-in"></a>
#### not_in:_foo_,_bar_,...

ထို list ထဲတွင် ပါဝင်သည့်မှ တစ်ပါး အခြားသော  အချက်အလက်များ ထည့်သွင်းနိုင်မည် ဖြစ်သည်။

<a name="rule-numeric"></a>
#### numeric

ကိန်းဂဏန်းများ ဟုတ်မဟုတ် စစ်ဆေးသွားမည် ဖြစ်သည်။

<a name="rule-regex"></a>
#### regex:_pattern_

regular expression များဖြင့် စစ်ဆေးနိုင်မည် ဖြစ်သည်။

**သတိပြုရန်:** `regex` pattern ကိုအသုံးပြုပါရာတွင် pipe character များပါဝင်ပါက rule များကို pipe delimiter များဖြင့် သတ်မှတ်ရမည့် အစား array ထဲတွင် ထည့်သွင်းရမည် ဖြစ်သည်။


<a name="rule-required"></a>
#### required

ထို field ကို မထည့်မဖြစ် ထည့်ရန် သတ်မှတ်ခြင်း ဖြစ်သည်။

<a name="rule-required-if"></a>
#### required\_if:_field_,_value_

ထို _field_ မှ value သည် _value_ မှ အချက်အလက်ဖြင့် တူညီရမည် ဖြစ်သည်။

<a name="rule-required-with"></a>
#### required_with:_foo_,_bar_,...

 သတ်မှတ်ထားသော field တခု တည်ရှိနေမှ ထည့်သွင်းခွင့် ပေးမည် ဖြစ်သည်။

<a name="rule-required-with-all"></a>
#### required_with_all:_foo_,_bar_,...

သတ်မှတ်ထားသော fieldများ တည်ရှိနေမှ ထည့်သွင်းခွင့် ပေးမည် ဖြစ်သည်။

<a name="rule-required-without"></a>
#### required_without:_foo_,_bar_,...

သတ်မှတ်ထားသော field တစ်ခု တည်ရှိမနေမှ ထည့်သွင်းခွင့် ပေးမည် ဖြစ်သည်။


<a name="rule-required-without-all"></a>
#### required_without_all:_foo_,_bar_,...

သတ်မှတ်ထားသော fieldများ တည်ရှိမနေမှ ထည့်သွင်းခွင့် ပေးမည် ဖြစ်သည်။


<a name="rule-same"></a>
#### same:_field_

အခြားသော field တစ်ခုဖြင့် အချက်အလက် ထပ်တူဖြစ်နေမှ ထည့်သွင်းခွင့်ပေးမည် ဖြစ်သည်။

<a name="rule-size"></a>
#### size:_value_

အချက်အလက် ၏ size ကို စိစစ်ခြင်း ဖြစ်သည်။  string data များအတွက်  _value_ မှာ character အရေအတွက်ကို ရည်ရွယ်ပြီး numeric data များအတွက် _value_  မှာ integer value ကို ရည်ရွယ်ကာ file များအတွက်မူ  _size_  kilobytes ဖြင့် ဖော်ပြထားသည့် file size တန်ဖိုး ဖြစ်သည်။

<a name="rule-unique"></a>
#### unique:_table_,_column_,_except_,_idColumn_

Database ထဲတွင် အဆိုပါ table name မရှိမှသာ ထည့်သွင်းနိုင်မည် ဖြစ်သည်။

#### Unique Rule ကိုအသုံးပြုပုံ

	'email' => 'unique:users'

#### Custom Column Name တစ်ခုသတ်မှတ်ခြင်း

	'email' => 'unique:users,email_address'

#### သတ်မှတ်ထားသည့် ID အား unique ဖြစ်ရန် သတ်မှတ်ခြင်း

	'email' => 'unique:users,email_address,10'

#### အခြားသော Where Clauses များထည့်သွင်းခြင်း

သင့်အနေဖြင့် အခြားသော အခြေအနေများကို "where" clauses များအဖြစ် ထည့်သွင်းနိုင်သည်။

	'email' => 'unique:users,email_address,NULL,id,account_id,1'

အပေါ် rule တွင် account_id တန်ဖိုး ၁ ကိုသာ unique check အဖြစ်သတ်မှတ်ထားမည် ဖြစ်သည်။

<a name="rule-url"></a>
#### url

URL ပုံစံ ဟုတ်မဟုတ် စစ်ဆေးသွားမည် ဖြစ်သည်။

> **သတိပြုရန်:** အဆိုပါ function သည် PHP ၏ `filter_var` method ကို အသုံးပြုမည် ဖြစ်သည်။

<a name="conditionally-adding-rules"></a>
## အခြေအနေအလိုက် ထည့်သွင်းနိုင်သည့်ု Rules များ

အချို့သော အခြေအနေများတွင် validation ကို input array ၏ အချို့သော field များတွင်သာ run လိုမည်ဖြစ်သည်။ ထိုသို့ပြုလုပ်လိုပါက `sometimes` ဟု၍ rule တွင်ထည့်သွင်းနိုင်မည်။

	$v = Validator::make($data, array(
		'email' => 'sometimes|required|email',
	));

ထိုသို့သော အခြေအနေမျိုးတွင် $data array တွင်ပါရှိမှသာ `email` field ကို စစ်ဆေးသွားမည် ဖြစ်သည်။

#### ရှုပ်ထွေးသော Validation များ

အချို့သော အခြေအနေများတွင် သင့်အနေဖြင့် အခြား field မှ တန်ဖိုး ၁၀၀ ကျော်မှသာ စစ်ဆေးလိုသည့် အခြေအနေမျိုး သို့မဟုတ် သင့်အနေဖြင့် field နှစ်ခုကို field တစ်ခုရှိမှသာ စစ်ဆေးလိုသည့် အခြေအနေမျိုးရှိပေမည်။ ထိုသို့သော rule မျိုးကို အလွယ်တကူ ထည့်သွင်းနိုင်သည်။ ရှေးဦးစွာ `Validator` instance ကို _static rules_ တွင် ထည့်သွင်းနိုင်မည်။

	$v = Validator::make($data, array(
		'email' => 'required|email',
		'games' => 'required|numeric',
	));


သင့် web application သည် game collector များအတွက် ဆိုပါစို့။ game collector တစ်ယောက် မိမိတို့ application ကို  register ပြုလုပ်ပြီး ၎င်းတို့ အနေဖြင့် ဂိမ်းအခု တစ်ရာထက်ပိုကြောင်း သိရှိရပါက အဘယ်ကြောင့် ထိုမျှ များပြလှသော ဂိမ်းများကို ပိုင်ဆိုင်ကြောင်း အကြောင်းအရင်းကို ရယူလိုသည် ဆိုပါက ၊ ဥပမာ ၎င်းတို့မှာ ဂိမ်းဆိုင်ဖွင့် သဖြင့်သော်လည်းကောင်း ဂိမ်းဆော့ရသည်ကို နှစ်သက်၍သော်လည်းကောင်း အများကြီးဝယ်ယူသည်ဟုဆိုပါစို့။ ထိုသို့သော requirement အတွက် `sometimes` ဟုသည့် method ကို `Validator` instance တွင် အသုံးပြုနိုင်သည်။


	$v->sometimes('reason', 'required|max:500', function($input)
	{
		return $input->games >= 100;
	});

`sometimes` method တွင် ဖြတ်သွားသည့် ပထမဆုံး  argument သည် မိမိတို့ အခြေအနေအရ စစ်ဆေးလိုသည့် fieldname ဖြစ်ပြီး ဒုတိယမှာ မိမိတို့ ထည်သွင်းလိုသည် rule ဖြစ်သည်။ တတိယ argument မှာမူ အချက်အလက်မှန်ကန်ပါက ဟူသည်ကို closure အတွင်း ဝင်ရောက်လာမည်ဖြစ်သည်။ `Closure` မှ တတိယ argument `true` ဟူပြန်ပါက ထို rules များပါဝင်မည်ဖြစ်သည်။ ထို method ရှုပ်ထွေးလှသည့် validation ကို အလွယ်တကူလုပ်ဆောင် နိုင်မည် ဖြစ်သည်။  သင့်အနေဖြင့် field များစွာအတွက် တပြိုင်နက် ထည့်သွင်းနိုင်သေးသည်။

	$v->sometimes(array('reason', 'cost'), 'required', function($input)
	{
		return $input->games >= 100;
	});

> **သတိပြုရန်:** `Closure` ကိုဖြတ်သွားသော `$input` parameter မှာ  `Illuminate\Support\Fluent`၏ instance ဖြစ်ပြီး input နှင့် file များကို access ပြုလုပ်နိုင်သည့် object အဖြစ်အသုံးပြုနိုင်သေးသည်။ 

<a name="custom-error-messages"></a>
## ကိုယ်ပိုင် Error Message များ

လိုအပ်ပါက သင့်အနေဖြင့် ကိုယ်ပိုင် error messages များကို မူလဟာများ အစား အသုံးပြုနိုင်သည်။ ထိုသို့ပြုလုပ်နိုင်ရန် နည်းလမ်းများစွာ ရှိပေသည်။

#### Validator သို့ ကိုယ်ပိုင် error message များပို့ပေးခြင်း

	$messages = array(
		'required' => 'The :attribute field is required.',
	);

	$validator = Validator::make($input, $rules, $messages);

> *သတိပြုရန်:* ထို `:attribute` place-holder မှာ field name အမည်ဖြင့် ထွက်လာမည် ဖြစ်သည်။ သင့်အနေဖြင့် အခြားသော  place-holders များကို validation message တွင်ပြောင်းလဲနိုင်သည်။

#### အခြား Validation Place-Holder များ

	$messages = array(
		'same'    => 'The :attribute and :other must match.',
		'size'    => 'The :attribute must be exactly :size.',
		'between' => 'The :attribute must be between :min - :max.',
		'in'      => 'The :attribute must be one of the following types: :values',
	);

####  Attribute တစ်ခုအတွက် ကိုယ်ပိုင် message တစ်ခု သတ်မှတ်ခြင်း

တခါတရံ သင့်အနေဖြင့် field တစ်ခုတည်း အတွက်သာ ကိုယ်ပိုင် error messages သတ်မှတ်လိုပေမည်။

	$messages = array(
		'email.required' => 'We need to know your e-mail address!',
	);

<a name="localization"></a>
####  အခြားသော ဘာသာစကားများအတွက် ကိုယ်ပိုင် message များ ဖန်တီးခြင်း

တခါတရံ သင့်အနေဖြင့် ကိုယ်ပိုင် messages များကို `Validator` မှ အစား language file မှသာ ထုတ်ယူရရှိလိုပေမည်။ ထိုသို့ပြုလုပ်ရန် သင့်၏  `custom` array ကို language file ဖြစ်သော `app/lang/xx/validation.php` တွင်ထည့်သွင်းနိုင်ပေသည်။

	'custom' => array(
		'email' => array(
			'required' => 'We need to know your e-mail address!',
		),
	),

<a name="custom-validation-rules"></a>
## ကိုယ်ပိုင် Validation Rules

#### ကိုယ်ပိုင် Validation Rule တစ်ခုကြေညာခြင်း

Laravel အနေဖြင့် များမြောင်လှသော validation rules များကို ထောက်ပံပေးထားသော်လည်း တခါတရံ သင့်အနေဖြင့် ကိုယ်ပိုင် တစ်ခု ဖန်တီးရန် လိုကောင်းလိုပေမည်။ ထိုသို့ပြုလုပ်နိုင်ရန် `Validator::extend` method ကို အသုံးပြုနိုင်သည်။

	Validator::extend('foo', function($attribute, $value, $parameters)
	{
		return $value == 'foo';
	});

ကိုယ်ပိုင် validator Closure မှ argument သုံးခု လက်ခံသည်။ `$attribute` ၏ အမည် ၊ ၎င်း၏ `$value` နှင့်  `$parameters` တို့ဖြစ်သည်။ ထိုအပြင် closure အစား class နှင့် method များကိုပါ ထည့်သွင်းနိုင်သည်။

	Validator::extend('foo', 'FooValidator@validate');

သင့်အနေဖြင့် ကိုယ်ပိုင် rule များသတ်မှတ်ပါက ကိုယ်ပိုင် error message များကိုပါက သတ်မှတ်ရန် လိုပေမည်။ သင့်အနေဖြင့် inline ကိုယ်ပိုင် message array ကိုအသုံးပြုခြင်း ဖြင့်သော်လည်းကောင်း validation language ထည့်သွင်းခြင်းဖြင့်သော်လည်းကောင်း သတ်မှတ်နိုင်သည်။

#### Extending The Validator Class

Closure callbacks ကိုအသုံးပြုပြီး Validator ကို extend လုပ်မည့်အစား သင့်အနေဖြင့် Validator class တစ်ခုလုံး extend ပြုလုပ်နိုင်သည်။ ထိုသို့ပြုလုပ်ရန် `Illuminate\Validation\Validator` ကို extend ပြုလုပ်၍ ရေးသားနိုင်သည်။ validation method ကို `validate` prefix အသုံးပြု၍ ထည့်သွင်းရမည် ဖြစ်သည်။

	<?php

	class CustomValidator extends Illuminate\Validation\Validator {

		public function validateFoo($attribute, $value, $parameters)
		{
			return $value == 'foo';
		}

	}

####  ကိုယ်ပိုင် Validator Resolver ကြေညာခြင်း

ထိုနောက် ကိုယ်ပိုင် Validator extension ကို ကြေညာရန် လိုအပ်ပေမည်။

	Validator::resolver(function($translator, $data, $rules, $messages)
	{
		return new CustomValidator($translator, $data, $rules, $messages);
	});

custom validation rule တစ်ခုပြုလုပ်ရာတွင် တခါတရံ custom place-holder များအစားထိုး error message များထည့်သွင်းရန် လိုလိမ့်မည်။ ထိုသို့ပြုလုပ်ရန် ကိုယ်ပိုင် validator ကို `replaceXXX` အသုံးပြု၍ အစားထိုးနိုင်သည်။ 

	protected function replaceFoo($message, $attribute, $rule, $parameters)
	{
		return str_replace(':foo', $parameters[0], $message);
	}

သင့်အနေဖြင့် `Validator` class ကိုအသုံးမပြုပဲ အစားထိုလိုပါက `Validator::replacer` method ကိုအသုံးပြုနိုင်သည်။

	Validator::replacer('rule', function($message, $attribute, $rule, $parameters)
	{
		//
	});
