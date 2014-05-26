# Cache

- [ျပင္ဆင္ျခင္း](#configuration)
- [Cache အသံုးျပဳသည့္ပံုစံ](#cache-usage)
- [Increments & Decrements](#increments-and-decrements)
- [Cache Tags](#cache-tags)
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
## Increments & Decrements

`file` နဲ႔ `database`မွလြဲ၍ က်န္တဲ့ cache drivers ေတြအားလံုးကို `increment` နဲ႔ `decrement`လုပ္ေဆာင္ခ်က္ေတြအတြက္ အေထာက္အပံ့ေပးထားပါတယ္။

#### Incrementing A Value

	Cache::increment('key');

	Cache::increment('key', $amount);

#### Decrementing A Value

	Cache::decrement('key');

	Cache::decrement('key', $amount);

<a name="cache-tags"></a>
## Cache Tags

> **သတိျပဳရန္:** `file` သို႔မဟုတ္ `database` cache driver သံုးထားရင္ေတာ့ Cache tags ကို အေထာက္အပံ့ေပးမွာမဟုတ္ပါဘူး။ ၎အျပင္ cache ကို tags ေတြနဲ႔တြဲသံုးမယ္ဆိုရင္ အဲ့ဒီ cache ကို အၿမဲတမ္းသိမ္းဆည္းထားမွာျဖစ္တဲ့အတြက္ `memcached` ကဲသို႔ေသာ driver ကိုအသံုးျပဳမွသာ permormance အတြက္ပိုၿပီးအဆင္ေျပေစမွာပါ။ အဲ့ဒီေတာ့မွ အသံုးမလိုေတာ့တဲ့ အခ်က္အလက္ေတြကို အလိုအေလၽွာက္ ပယ္ဖ်က္ေပးမွာျဖစ္ပါတယ္။

#### Accessing A Tagged Cache

Cache tags allow you to tag related items in the cache, and then flush all caches tagged with a given name. To access a tagged cache, use the `tags` method.

You may store a tagged cache by passing in an ordered list of tag names as arguments, or as an ordered array of tag names:

	Cache::tags('people', 'authors')->put('John', $john, $minutes);

	Cache::tags(array('people', 'artists'))->put('Anne', $anne, $minutes);

You may use any cache storage method in combination with tags, including `remember`, `forever`, and `rememberForever`. You may also access cached items from the tagged cache, as well as use the other cache methods such as `increment` and `decrement`.

#### Accessing Items In A Tagged Cache

To access a tagged cache, pass the same ordered list of tags used to save it.

	$anne = Cache::tags('people', 'artists')->get('Anne');

	$john = Cache::tags(array('people', 'authors'))->get('John');

You may flush all items tagged with a name or list of names. For example, this statement would remove all caches tagged with either `people`, `authors`, or both. So, both "Anne" and "John" would be removed from the cache:

	Cache::tags('people', 'authors')->flush();

In contrast, this statement would remove only caches tagged with `authors`, so "John" would be removed, but not "Anne".

	Cache::tags('authors')->flush();

<a name="database-cache"></a>
## Database Cache

When using the `database` cache driver, you will need to setup a table to contain the cache items. You'll find an example `Schema` declaration for the table below:

	Schema::create('cache', function($table)
	{
		$table->string('key')->unique();
		$table->text('value');
		$table->integer('expiration');
	});
