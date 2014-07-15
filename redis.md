# Redis

- [အစပ်ိဳး](#introduction)
- [Configuration](#configuration)
- [Usage](#usage)
- [Pipelining](#pipelining)

<a name="introduction"></a>
## အစပ်ိဳး

[Redis](http://redis.io) သည္ open source advanced key-value store တစ္ခုျဖစ္သည္။  ၄င္းသည္ keys မ်ားတြင္ [strings](http://redis.io/topics/data-types#strings), [hashes](http://redis.io/topics/data-types#hashes), [lists](http://redis.io/topics/data-types#lists), [sets](http://redis.io/topics/data-types#sets), and [sorted sets](http://redis.io/topics/data-types#sorted-sets) ပါဝင္ေသာေၾကာင့္  ရံဖန္ရံခါ  data structure server ဟု သတ္မွတ္ျခင္း ခံရသည္။   

> **Note:** သင့္တြင္ Redis PHP extension ကုိ PECL မွ တဆင့္ သြင္းျပီးပါက Redis အတြက္ အတုိေကာက္ အမည္ကုိ `app/config/app.php` ေၾကညာေပးရမည္။

<a name="configuration"></a>
## Configuration

Application အတြက္ Redis configuration မွာ **app/config/database.php**  အမည္ရွိ file ထဲတြင္ တည္ရွိမည္ ျဖစ္ျပီး ထုိ file ထဲတြင္  **redis** 
အမည္ရွိ array ကို application မွ အသုံးျပဳမည္ ျဖစ္သည္။


	'redis' => array(

		'cluster' => true,

		'default' => array('host' => '127.0.0.1', 'port' => 6379),

	),

default server configuration မွာ development အတြက္ ဦးတည္ထားေသာ္လည္း မိမိတုိ ့စိတ္ၾကိဳက္ ထုိ array ကိုေျပာင္းလဲ သတ္မွတ္ႏုိင္သည္။ 
ထုိ Redis server ၏ name ၊ host ႏွင့္ Server မွ အသုံးျပဳသည့္ port ကုိ ေၾကညာေပးရန္လုိေပမည္။


 Laravel Redis client ကုိ `cluster` option မွ Redis nodes မ်ား အၾကား client-side sharding ျပဳလုပ္ရန္ ညြန္ၾကားျခင္းျဖင့္ Nodes မ်ားမွ data ဆြဲယူျပီး RAM အတြက္ ေနရာလြတ္မ်ား ဖန္တီးႏိုင္မည္ ျဖစ္သည္။ သို ့ေသာ္ client-side sharding သည္ failover ကုိ ကုိင္တြယ္ႏုိင္ျခင္း မရွိေပ။ ထုိေၾကာင့္
 Primary data store မ်ား ရရွိႏိုသည့္ အေျခအေနတြင္ cache data မ်ား ထုတ္လြတ္ေပးသူ အျဖစ္ အသုံးဝင္သည္။

Redis Server အေနျဖင့္ စိစစ္ရန္လုိအပ္ပါက Redis Server Configuration array အတြင္း `password` key / value pair ကုိ ထည့္သြင္းႏုိင္သည္။

<a name="usage"></a>
## အသုံးျပဳပုံ


 `Redis::connection` method ကုိ ေခၚယူျခင္းျဖင့္ Redis instance ကုိရယူႏုိင္သည္။

	$redis = Redis::connection();

၄င္းသည္ default Redis server ၏ instance ကုိ ျပန္ေပးမည္ ျဖစ္သည္။ Server clustering ကုိ အသုံးျပဳေနသည္ မဟုတ္ပါက `connection` method 
တြင္ မိမိတုိ ့ အသုံးျပဳေနသည့္ server ၏ အမည္ကုိ configuration တြင္ ထည့္သြင္းေပးရန္ လုိအပ္ေပမည္။

	$redis = Redis::connection('other');

Redis ၏ instance ကုိ ရရွိသည္ႏွင့္ တျပိဳင္နက္ [Redis commands](http://redis.io/commands) ကုိ အသုံးျပဳႏုိင္ျပီ ျဖစ္သည္။ Laravel အေနျဖင့္ magic methods ကုိ အသုံးျပဳျပီး Redis server သုိ ့ command မ်ားကုိ ပုိ ့ေဆာင္ေပးသည္။

	$redis->set('name', 'Taylor');

	$name = $redis->get('name');

	$values = $redis->lrange('names', 5, 10);


အထက္က ေဖာ္ျပထားသည့္ အတုိင္း Magic method မ်ားမွ command မ်ားကို passing ေပးသြားသည္ကို ေတြ ့ရမည္ ျဖစ္သည္။ သုိ ့ေသာ္ သင့္အေနျဖင့္ Magic method မ်ားကုိ မသုံးမျဖစ္ သုံးရသည္ မဟုတ္ပဲ ၊ အသုံးမျပဳလုိပါက `command` method ကုိ အစားထုိး အသုံးျပဳႏုိင္သည္။

	$values = $redis->command('lrange', array(5, 10));

default connection  မွ ဆန္ ့က်င္ျပီး command မ်ား အသုံးျပဳလုိပါက `Redis` class မွ static magic method မ်ားကို အသုံးျပဳႏုိင္သည္။

	Redis::set('name', 'Taylor');

	$name = Redis::get('name');

	$values = Redis::lrange('names', 5, 10);

> **Note:** Laravel တြင္ Redis [cache](cache) ႏွင့္ [session](/docs/session.md) drivers မ်ား ပါဝင္ျပီး ျဖစ္သည္။

<a name="pipelining"></a>
## Pipelining

Operation တစ္ခုအတြက္ Command မ်ားစြာ ကုိ ပုိ ့လြတ္ရန္ လုိအပ္ပါက Pipelining ကုိ အသုံးျပဳရသည္။ ထုိ သုိ ့ ျပဳလုပ္ရန္ `pipeline`  ကုိ အသုံးျပဳရမည္။

#### Server သုိ ့ Command မ်ားကို Piping ျပဳလုပ္ျခင္း 

	Redis::pipeline(function($pipe)
	{
		for ($i = 0; $i < 1000; $i++)
		{
			$pipe->set("key:$i", $i);
		}
	});