# ဆက္ရွင္

- [ျပင္ဆင္ျခင္း](#configuration)
- [Session Usage](#session-usage)
- [Flash Data](#flash-data)
- [Database Sessions](#database-sessions)
- [Session Drivers](#session-drivers)

<a name="configuration"></a>
## ျပင္ဆင္ျခင္း

HTTP မွာ Stateless protocol ျဖစ္ေသာေၾကာင့္ request တစ္ခုႏွင့္တစ္ခု ၾကားထဲတြင္ Session ထဲတြင္ အခ်က္အလက္မ်ားကုိ သိမ္းဆည္းကာ ပုိ ့ေဆာင္ရေပသည္။ Laravel တြင္ session ကုိ နည္းလမ္းမ်ိဳးစုံျဖင့္ အသုံးျပဳႏုိင္ရန္ API တစ္ခုကို ဖန္တီးကာ စုစည္းထားသည္။ အျခားေသာ ေက်ာ္ၾကားသည့္  
[Memcached](http://memcached.org) ႏွင့္ [Redis](http://redis.io), Session အျဖစ္အသုံးျပဳႏုိင္သည့္ နည္းလမ္းမ်ားကို ပံ့ပုိးထားသည္။

Session ႏွင့္ပတ္သတ္သည့္ အခ်က္အလက္မ်ားကုိ `app/config/session.php` တြင္ လုိအပ္သလုိ ေျပာင္းလဲ ရမည္ ျဖစ္သည္။ ပုံမွန္အားျဖင့္ application အေတာ္မ်ားမ်ားတြင္ အဆင္ေျပမည့္ `file` session driver ကုိ အသုံးျပဳထားသည္။

#### Reserved Keys (သီးသန္႕ key)


`flash` ဆက္ရွင္ကီးကို Laravel Farmework အတြင္းပိုင္းတြင္သံုးထားပါသည္၊ ထို႕ေၾကာင္႕  သင္႕အေနနဲ႕အဲ႕ဒီ႕ `flash` ဆိုတဲ႕အမည္နဲ႕  session ထဲကို item တစ္ခုမွ မထည္႕သင္႕ပါ။

<a name="session-usage"></a>
## Session Usage

#### Storing An Item In The Session

	Session::put('key', 'value');

#### Push A Value Onto An Array Session Value

	Session::push('user.teams', 'developers');

#### Retrieving An Item From The Session

	$value = Session::get('key');

#### Retrieving An Item Or Returning A Default Value

	$value = Session::get('key', 'default');

	$value = Session::get('key', function() { return 'default'; });

#### Session မွ value တစ္ခု ထုတ္ယူကာ ဖယ္ထုတ္ျခင္း

	$value = Session::pull('key', 'default');

#### Session မွ value မ်ားအားလုံး ေခၚယူျခင္း

	$data = Session::all();

#### Session မွ item ရွိမရွိ စစ္ေဆးျခင္း

	if (Session::has('users'))
	{
		//
	}

#### Session မွ item တစ္ခုကို ထုတ္ပယ္ျခင္း

	Session::forget('key');

#### Session တစ္ခုလုံး ရွင္းပစ္ျခင္း

	Session::flush();

#### Session ID အသစ္ထုတ္ယူျခင္း

	Session::regenerate();

<a name="flash-data"></a>
## Flash Data

တခါတရံ  တစ္ခ်ိဳ  ့ေသာ data မ်ားကုိ ေနာက္ထပ္ request တစ္ခါစာသာ သိမ္းဆည္းလုိေပမည္။ ထုိသုိ ့ျပဳလုပ္ႏုိင္ရန္ `Session::flash` method ကုိ အသုံးျပဳႏုိင္သည္။

	Session::flash('key', 'value');

#### ေနာက္ထပ္ request တစ္ခုစာ သက္တမ္းတုိးျခင္း

	Session::reflash();

#### ေနာက္ထပ္ request တစ္ခုစာ သက္တမ္းတုိးျခင္း  (ေရြးခ်ယ္ထားေသာ data မ်ားသာ) 

	Session::keep(array('username', 'email'));

<a name="database-sessions"></a>
## Database Sessions


`database` session driver ကုိ အသုံးျပဳပါက Session item မ်ားကို သိမ္းဆည္းရန္ table တစ္ခု တည္ေဆာက္ရန္လုိေပမည္။ ေအာက္တြင္  table အတြက္ `Schema` တည္ေဆာက္ပုံကုိ ေဖာ္ျပထားပါသည္။

	Schema::create('sessions', function($table)
	{
		$table->string('id')->unique();
		$table->text('payload');
		$table->integer('last_activity');
	});

	
Table ကုိ အသုံးျပဳထားေသာေၾကာင့္ `session:table` ဟူသည့္ Artisan command ကုိ အသုံးျပဳျပီး migration ျပဳလုပ္ႏုိင္သည္။


	php artisan session:table

	composer dump-autoload

	php artisan migrate

<a name="session-drivers"></a>
## Session Drivers

session "driver" မွ session data မ်ား မည္သည့္ေနရာတြင္း သိမ္းဆည္းမည္ကုိ သတ္မွတ္ထားသည္။  Laravel အေနျဖင့္ အေတာ္ေလးေကာင္းမြန္ေသာ driver အမ်ိဳးအစားမ်ားကို ပံပုိးထားသည္။

- `file` - sessions သည္ `app/storage/sessions` တြင္ သိမ္းဆည္းထားမည္။
- `cookie` - sessions သည္ encrypted cookies အေနျဖင့္ သိမ္းဆည္းထားမည္ ျဖစ္သည္။
- `database` session သည့္ application ၏ database ထဲတြင္ သိမ္းဆည္းထားမည္ ျဖစ္သည္။
- `memcached` / `redis` တုိ ့သည္ ျမန္ဆန္သြက္လက္သည့္ cache based session engine မ်ားျဖစ္ၾကသည္။
- `array` - sessions သည္ PHP array အျဖစ္ သိမ္းဆည္းမည္ျဖစ္ျပီး ေနာက္ထပ္ request မ်ားအတြက္ သိမ္းဆည္းထားႏုိင္မည္ မဟုတ္ေပ။


> **မွတ္ခ်က္:**  array driver သည္ [unit tests](testing.md) အတြက္ အသုံးျပဳျခင္း ျဖစ္ျပီး တကယ့္ session data အတြက္ အသုံးျပဳျခင္း မဟုတ္ေပ။

