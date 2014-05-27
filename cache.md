# Cache

- [ျပင္ဆင္ျခင္း](#configuration)
- [Cache အသံုးျပဳသည့္ပံုစံ](#cache-usage)
- [တန္ဖိုး ထပ္တိုးျခင္း ႏွင့္ ေလ်ာ႔ခ်ျခင္း](#increments-and-decrements)
- [Cache မ်ားအား အုပ္စုဖြဲ႔ျခင္း](#cache-tags)
- [Database Cache](#database-cache)

<a name="configuration"></a>
## ျပင္ဆင္ျခင္း

Caching ျပဳလုပ္နည္းပံုစံမ်ိဳးစံုတြက္ Laravel မွ API ထုတ္ေပးၿပီးသားျဖစ္ပါတယ္။ Cache configuration အတြက္ `app/config/cache.php` ဖိုင္ထဲမွာသြားျပင္ရမွာပါ။ Application တစ္ခုလံုးအတြက္အသံုးျပဳမဲ့ cache driver ကို အဲ့ဒီဖိုင္ထဲမွာ သတ္မွတ္ေပးရမွာပါ။  [Memcached](http://memcached.org) ႏွင့္ [Redis](http://redis.io) ကဲ့သိုေသာ လူသံုးမ်ားၿပီး popular ျဖစ္တဲ့ caching methods ေတြကို laravel မွာ အေထာက္အပံ့ေပးထားပါတယ္။ 

အဲ့ဒီ cache configuration ဖိုင္ထဲမွာ က်န္တဲ့ options ေတြလဲ အမ်ားႀကီးရွိပါေသးတယ္။ အဲ့ဒီအတြက္လဲ ဖိုင္ထဲမွာ တစ္ခါတည္း လမ္းညႊန္ခ်က္ေရးေပးထားၿပီးသားပါ။ အကယ္၍ အဲ့ဒီ options ေတြကိုအသံုးျပဳမယ္ဆိုရင္ေတာ့ option နဲ႔ပတ္သက္တဲ့လမ္းညႊန္ခ်က္ကို ေသေသခ်ာခ်ာဖတ္ၿပီးမွ အသံုးျပဳဖို႔လိုအပ္ပါတယ္။ ပံုမွန္အတိုင္းဆိုရင္ေတာ့ laravel ဟာ `file` cache driver အတြက္ ျပင္ဆင္ေပးထားပါတယ္။ အဲ့ဒီ cache ဖိုင္ objects ေတြကို နံပါတ္စဥ္အတိုင္း filesystem ထဲမွာသြားသိမ္းထားပါတယ္။ Application အႀကီးေတြအတြက္ဆိုရင္ေတာ့ Memcached သို႔မဟုတ္ APC (Alternative PHP Cache) ကဲ့သို႔ေသာ in-memory cache ေတြကိုအသံုးျပဳသင့္ပါတယ္။ 

<a name="cache-usage"></a>
## Cache အသံုးျပဳသည့္ပံုစံ

#### အခ်က္အလက္ကို Cache ထဲတြင္သိမ္းဆည္းျခင္း

	Cache::put('key', 'value', $minutes);

#### အခ်ိန္ကန္႔သတ္ဖို႔အတြက္ Carbon Objects အသံုးျပဳျခင္း

	$expiresAt = Carbon::now()->addMinutes(10);

	Cache::put('key', 'value', $expiresAt);

#### အခ်က္အလက္သည္ Cache ထဲတြင္ ရွိမေနလၽွင္ ထပ္ထည့္ျခင္း

	Cache::add('key', 'value', $minutes);

အကယ္၍ အခ်က္အလက္ဟာ cache ထဲမွာ **ရွိေနလၽွင္** `add` method ဟာ `true` return ျပန္မွာျဖစ္ၿပီး၊ အဲ့လိုမဟုတ္ရင္ေတာ့ `false` return ျပန္မွာျဖစ္ပါတယ္။

#### Cache ရွိမရွိ စစ္ေဆးျခင္း

	if (Cache::has('key'))
	{
		//
	}

#### Cache ထဲမွ အခ်က္အလက္ကို ရယူျခင္း

	$value = Cache::get('key');

#### အခ်က္အလက္ရယူျခင္း (သို႔မဟုတ္) Default Value တစ္ခု return ျပန္ျခင္း

	$value = Cache::get('key', 'default');

	$value = Cache::get('key', function() { return 'default'; });

#### အခ်က္အလက္ကို Cache ထဲသို႔ ထာဝရသိမ္းဆည္းျခင္း

	Cache::forever('key', 'value');

တစ္ခါတစ္ရံမွာ cache ထဲက အခ်က္အလက္ကိုလဲ ယူခ်င္တယ္၊ အကယ္၍ အဲ့ဒီအခ်က္အလက္ရွိမေနဘူးဆိုရင္လည္း cache ထဲကို default value တစ္ခု ထည့္ထားခဲ့ခ်င္တဲ့ အေျခအေနေတြရွိလာႏိုင္ပါတယ္။ အဲ့ဒီလို အေျခအေနမ်ိဳးအတြက္ `Cache::remember` method ကိုအသံုးျပဳႏိုင္ပါတယ္။   

	$value = Cache::remember('users', $minutes, function()
	{
		return DB::table('users')->get();
	});

`remember` နဲ႔ `forever` method ႏွစ္ခုလံုးကို ေပါင္းစပ္ၿပီး အသံုးျပဳႏိုင္ပါေသးတယ္။

	$value = Cache::rememberForever('users', function()
	{
		return DB::table('users')->get();
	});

Cache ထဲမွာသိမ္းဆည္းလိုက္တဲ့ အခ်က္အလက္ေတြဟာ နံပါတ္စဥ္အလိုက္သိမ္းဆည္းတာျဖစ္တဲ့အတြက္ သင့္အေနနဲ႔ ဘယ္လို အခ်က္အလက္အမ်ိဳးအစားကိုမဆို လြတ္လပ္စြာ သိမ္းဆည္းႏိုင္ေၾကာင္း သတိျပဳပါေလ။

#### Cache ထဲရွိ အခ်က္အလက္ကို ဆြဲထုတ္ျခင္း

Cache ထဲမွ အခ်က္အလက္ကို ရယူအသံုးျပဳၿပီးတာနဲ႔ ဖ်က္ျပစ္လိုက္ခ်င္တယ္ဆိုရင္ေတာ့၊ `pull` method ကိုအသံုးျပဳႏိုင္ပါတယ္။

	$value = Cache::pull('key');

#### Cache ထဲမွ အခ်က္အလက္ကို ပယ္ဖ်က္ျခင္း

	Cache::forget('key');

<a name="increments-and-decrements"></a>
## တန္ဖိုး ထပ္တိုးျခင္း ႏွင့္ ေလ်ာ႔ခ်ျခင္း

`file` နဲ႔ `database` driver မွလြဲ၍ က်န္တဲ့ cache drivers ေတြအားလံုးကို `increment` နဲ႔ `decrement`လုပ္ေဆာင္ခ်က္ေတြအတြက္ အေထာက္အပံ့ေပးထားပါတယ္။

#### အခ်က္အလက္တန္ဖိုး ထပ္တိုးျခင္း

	Cache::increment('key');

	Cache::increment('key', $amount);

#### အခ်က္အလက္တန္ဖိုးေလ်ာ႔ခ်ျခင္း

	Cache::decrement('key');

	Cache::decrement('key', $amount);

<a name="cache-tags"></a>
## Cache မ်ားအား အုပ္စုဖြဲ႔ျခင္း

> **သတိျပဳရန္:** `file` သို႔မဟုတ္ `database` cache driver သံုးထားရင္ေတာ့ Cache tags ကို အေထာက္အပံ့ေပးမွာမဟုတ္ပါဘူး။ ၎အျပင္ cache ကို tags ေတြနဲ႔တြဲသံုးမယ္ဆိုရင္ အဲ့ဒီ cache ကို အၿမဲတမ္းသိမ္းဆည္းထားမွာျဖစ္တဲ့အတြက္ `memcached` ကဲသို႔ေသာ driver ကိုအသံုးျပဳမွသာ permormance အတြက္ပိုၿပီးအဆင္ေျပေစမွာပါ။ အဲ့ဒီေတာ့မွ အသံုးမလိုေတာ့တဲ့ အခ်က္အလက္ေတြကို အလိုအေလၽွာက္ ပယ္ဖ်က္ေပးမွာျဖစ္ပါတယ္။

#### Accessing A Tagged Cache

Cache ထဲမွာရွိတဲ့ ဆက္စပ္ေနတဲ့ အခ်က္အလက္ေတြကို အတူတကြအုပ္စုဖြဲ႔ေပးျခင္းကို cache tags ကျပဳလုပ္ေပးႏိုင္ပါတယ္။ ၿပီးရင္ေတာ့ ေပးထားခဲ့တဲနာမည္အတိုင္းျပန္ၿပီး လြယ္လြယ္ကူကူပဲ ျပန္လည္ပယ္ဖ်က္ႏိုင္ပါတယ္။  Cache ေတြကို တစ္ခုတစည္းထဲ အုပ္စုဖြဲ႔ထားဖို႔အတြက္ `tags` method ကိုအသံုးျပဳရပါမယ္။

Cache ေတြကို တြဲစပ္ဖို႔အတြက္ `tags` method ထဲသို႔ အမည္မ်ားကို `,` ခံ၍ေသာ္လည္းေကာင္း၊ array အေနႏွင့္ passing ေပး၍ေသာ္လည္းေကာင္း သိမ္းဆည္းႏိုင္ပါတယ္။

	Cache::tags('people', 'authors')->put('John', $john, $minutes);

	Cache::tags(array('people', 'artists'))->put('Anne', $anne, $minutes);

Cache ေတြကိုတစ္ခုတစည္းထဲ အုပ္စုဖြဲ႔ထားဖို႔အတြက္ ႏွစ္သက္ရာ caching method ကိုအသံုးျပဳႏိုင္ပါတယ္။ `remember`, `forever` ႏွင့္ `rememberForever` စတာေတြအပါအဝင္ေပါ့။ You may also access cached items from the tagged cache, as well as use the other cache methods such as `increment` and `decrement`.

#### အုပ္စုဖြဲ႔ထားေသာ Cache ထဲမွ အခ်က္အလက္ကို ရယူျခင္း

အုပ္စုဖြဲ႔ထားေသာ cache ထဲမွ အခ်က္အလက္ကုိ ျပန္လည္ရယူဖို႔အတြက္ အုပ္စုဖြဲ႔ျခင္းျပဳလုပ္စဥ္က ေပးထားခဲ့တဲ့ အမည္မ်ားအတိုင္းအစဥ္လိုက္ျပန္လည္ passing ေပးၿပီး ရယူႏိုင္ပါတယ္။ 

	$anne = Cache::tags('people', 'artists')->get('Anne');

	$john = Cache::tags(array('people', 'authors'))->get('John');

ျပန္လည္ပယ္ဖ်က္ခ်င္တယ္ဆိုလ်င္လဲ အုပ္စုဖြဲ႔ျခင္းျပဳလုပ္စဥ္ကေပးထားခဲ့တဲ့ နာမည္တစ္ခု သို႔မဟုတ္ တစ္ခုထက္ပိုေသာ အမည္မ်ားကို အသံုးျပဳၿပီးပယ္ဖ်က္ႏိုင္ပါတယ္။ ေအာက္မွာေပးထားတဲ့ ဥပမာကို ၾကည့္မယ္ဆိုရင္ `people` အုပ္စုေကာ `author` အုပ္စုကိုေကာ ပယ္ဖ်က္လိုက္တာျဖစ္ပါတယ္။ အဲ့ဒီအတြက္ အဲ့ဒီအုပ္စုႏွစ္ခုထဲမွာပါတဲ့ "Anne" နဲ႔ "John" ကို cache ထဲကေန ဖ်က္သြားမွာျဖစ္ပါတယ္။ 

	Cache::tags('people', 'authors')->flush();

ေအာက္မွာျပထားတဲ့ ဥပမာအရဆိုရင္ `authors` အုပ္စုကိုပဲပယ္ဖ်က္လိုက္တာျဖစ္ပါတယ္။ အဲ့ဒါေၾကာင့္ `authors` အုပ္စုထဲမွာပါတဲ့ "John" ကိုပဲဖ်က္သြားမွာျဖစ္ၿပီး "Anne" ကိုဖ်က္သြားမွာမဟုတ္ပါဘူး။ အေပၚကဥပမာနဲ႔ ေအာက္က ဥပမာကို ယွဥ္ၾကည့္ပါ။ 

	Cache::tags('authors')->flush();

<a name="database-cache"></a>
## Database Cache

`database` cache driver ကိုအသံုးျပဳမယ္ဆိုရင္ေတာ့ cache အခ်က္အလက္ေတြကိုသိမ္းဆည္းဖို႔အတြက္ table တစ္ခုျပဳလုပ္ေပးဖို႔ လိုပါတယ္။ ေအာက္မွာ `Schema` နဲ႔ cache table ျပဳလုပ္ထားပံုကို ဥပမာအေနနဲ႔ျပေပးထားပါတယ္။ 

	Schema::create('cache', function($table)
	{
		$table->string('key')->unique();
		$table->text('value');
		$table->integer('expiration');
	});
