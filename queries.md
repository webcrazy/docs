# Query Builder

- [မိတ္ဆက္](#introduction)
- [Select မ်ား](#selects)
- [Join မ်ား](#joins)
- [အဆင့္ျမင့္ where clause မ်ား](#advanced-wheres)
- [Aggregate မ်ား](#aggregates)
- [Raw expression မ်ား](#raw-expressions)
- [Insert မ်ား](#inserts)
- [Update မ်ား](#updates)
- [Delete မ်ား](#deletes)
- [Union မ်ား](#unions)
- [Pessimistic Locking](#pessimistic-locking)
- [Query မ်ားကုိ Cache လုပ္ျခင္း](#caching-queries)

<a name="introduction"></a>
## မိတ္ဆက္

Database query builder သည္ database query မ်ား တည္ေဆာက္ျခင္း၊ အသုံးျပု ျခင္းမ်ား ျပုလုပ္ရာ၌ လြယ္ကူသက္သာ အဆင္ေျပေစေသာ interface တစ္ခုကုိ ေပးပါသည္။ သင့္ application ၏ database နွင့္ ပတ္သက္ေသာ လုပ္ထုံးလုပ္နည္း အမ်ားစုအတြက္ အသုံးျပု နုိင္ျပီး ေထာက္ပံ့ေပးထားေသာ database စနစ္ အားလုံးအတြက္ အလုပ္လုပ္ပါသည္။

>**မွတ္ခ်က္**။ ။ Laravel query builder သည္ သင့္ application အား SQL injection တုိက္ခုိက္မွုမ်ားမွ ကာကြယ္ရန္ PDO parameter binding အား အသုံးျပု ထားပါသည္။ Binding အျဖစ္ ေပးပုိ့သည့္ string မ်ားအား သန့္စင္ရန္ မလိုအပ္ပါ။

<a name="selects"></a>
## Select မ်ား

#### Table တစ္ခုမွ row အားလုံးကုိ ထုတ္ယူျခင္း

	$users = DB::table('users')->get();

	foreach ($users as $user)
	{
		var_dump($user->name);
	}

#### Table တစ္ခုမွ row တစ္ခုခ်င္းစီ ထုတ္ယူျခင္း

	$user = DB::table('users')->where('name', 'John')->first();

	var_dump($user->name);

#### Row တစ္ခုမွ Column တစ္ခုခ်င္းစီ ထုတ္ယူျခင္း

	$name = DB::table('users')->where('name', 'John')->pluck('name');

#### Column တန္ဖုိးမ်ားအား list တစ္ခု အျဖစ္ ထုတ္ယူျခင္း

	$roles = DB::table('roles')->lists('title');

ဤ method သည္ role title မ်ားပါ၀င္ေသာ array တစ္ခုကုိ return ျပန္ပါလိမ့္မည္။ သင္သည္ return ျပန္လာေသာ array အတြက္ key column တစ္ခုကုိ လည္း သတ္မွတ္နုိင္ပါသည္။

	$roles = DB::table('roles')->lists('title', 'name');

#### Select clause တစ္ခု သတ္မွတ္ျခင္း

	$users = DB::table('users')->select('name', 'email')->get();

	$users = DB::table('users')->distinct()->get();

	$users = DB::table('users')->select('name as user_name')->get();

#### မူလရွိျပီးသား query တြင္ select clause တစ္ခု ထပ္ထည့္ျခင္း

	$query = DB::table('users')->select('name');

	$users = $query->addSelect('age')->get();

#### Where Operator မ်ား အသုံးျပုျခင္း

	$users = DB::table('users')->where('votes', '>', 100)->get();

#### OR statement မ်ား

	$users = DB::table('users')
	                    ->where('votes', '>', 100)
	                    ->orWhere('name', 'John')
	                    ->get();

#### Where Between ကုိ အသုံးျပု ျခင္း

	$users = DB::table('users')
	                    ->whereBetween('votes', array(1, 100))->get();

#### Where Not Between အား အသုံးျပု ျခင္း

	$users = DB::table('users')
	                    ->whereNotBetween('votes', array(1, 100))->get();

#### Where In အား array တစ္ခုျဖင့္ အသုံးျပု ျခင္း

	$users = DB::table('users')
	                    ->whereIn('id', array(1, 2, 3))->get();

	$users = DB::table('users')
	                    ->whereNotIn('id', array(1, 2, 3))->get();

#### တန္ဖုိးမျဖည့္သြင္းထားေသာ Record မ်ားအား ရွာေဖြရန္ Where Null ကုိ အသုံးျပု ျခင္း

	$users = DB::table('users')
	                    ->whereNull('updated_at')->get();

#### Order By, Group By နွင့္ Having

	$users = DB::table('users')
	                    ->orderBy('name', 'desc')
	                    ->groupBy('count')
	                    ->having('count', '>', 100)
	                    ->get();

#### Offset နွင့္ Limit

	$users = DB::table('users')->skip(10)->take(5)->get();

<a name="joins"></a>
## Join မ်ား

Query builder အား join statement မ်ား ေရးသားရန္လည္း အသုံးျပု နုိင္ပါသည္။ ေအာက္ပါဥပမာမ်ားကို ျကည့္ပါ၊

#### အေျခခံ join statement

	DB::table('users')
	            ->join('contacts', 'users.id', '=', 'contacts.user_id')
	            ->join('orders', 'users.id', '=', 'orders.user_id')
	            ->select('users.id', 'contacts.phone', 'orders.price')
	            ->get();

#### ဘယ္ Join Statement

	DB::table('users')
		    ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
		    ->get();

သင့္ အေနနွင့္ ပုိမို အဆင့္ျမင့္ေသာ join clause မ်ား လည္း သတ္မွတ္နုိင္ပါသည္။

	DB::table('users')
	        ->join('contacts', function($join)
	        {
	        	$join->on('users.id', '=', 'contacts.user_id')->orOn(...);
	        })
	        ->get();

အကယ္၍ သင့္ join clause မ်ား တြင္ "where" ပုံစံ clause မ်ားကုိ သုံးလုိပါက `where` နွင့္ `orWhere` methodမ်ားကုိ join တစ္ခုတြင္ ထည့္သြင္းအသုံးျပုနုိင္ပါသည္။ ၎ method မ်ားသည္ column နွစ္ခုကို နွုိင္းယွဥ္မည့္အစား column တစ္ခုအား တန္ဖုိးတစ္ခုျဖင့္ နွုိင္းယွဥ္ပါလိမ့္မည္။

	DB::table('users')
	        ->join('contacts', function($join)
	        {
	        	$join->on('users.id', '=', 'contacts.user_id')
	        	     ->where('contacts.user_id', '>', 5);
	        })
	        ->get();

<a name="advanced-wheres"></a>
## အဆင့္ျမင့္ where clause မ်ား

#### Parameter အုပ္စုဖြဲ့  ျခင္း

တစ္ခါတစ္ရံ သင္သည္  "where exists" သုိ့မဟုတ္ အဆင့္ဆင့္ parameter အုပ္စုဖြဲ့ ျခင္းမ်ား ကဲ့သုိ့ ပုိမုိ အဆင့္ျမင့္ေသာ where clause မ်ားအား လုိအပ္နုိင္ပါသည္။ ၎တု့ိကုိလည္း Laravel query builder ျဖင့္ ကိုင္တြယ္နုိင္ပါသည္။

	DB::table('users')
	            ->where('name', '=', 'John')
	            ->orWhere(function($query)
	            {
	            	$query->where('votes', '>', 100)
	            	      ->where('title', '<>', 'Admin');
	            })
	            ->get();

အထက္ပါ query သည္ ေအာက္ပါ SQL statement ကုိ ထုတ္ေပးပါလိမ့္မည္။

	select * from users where name = 'John' or (votes > 100 and title <> 'Admin')

#### Exists Statement မ်ား

	DB::table('users')
	            ->whereExists(function($query)
	            {
	            	$query->select(DB::raw(1))
	            	      ->from('orders')
	            	      ->whereRaw('orders.user_id = users.id');
	            })
	            ->get();

အထက္ပါ query သည္ ေအာက္ပါ SQL statement ကုိ ထုတ္ေပးပါလိမ့္မည္။

	select * from users
	where exists (
		select 1 from orders where orders.user_id = users.id
	)

<a name="aggregates"></a>
## Aggregate မ်ား

Query builder သည္ အမ်ိ  ုးမ် ိ ုးေသာ aggregate method မ်ား ကုိလည္း သတ္မွတ္ေပးထားပါသည္။ `count`, `max`, `min`, `avg` နွင့္ `sum` အစရွိသျဖင့္ ရွိပါသည္။

#### Aggregate Method မ်ားအား အသုံးျပု ျခင္း

	$users = DB::table('users')->count();

	$price = DB::table('orders')->max('price');

	$price = DB::table('orders')->min('price');

	$price = DB::table('orders')->avg('price');

	$total = DB::table('users')->sum('votes');

<a name="raw-expressions"></a>
## Raw expression မ်ား

တစ္ခါတစ္ရံ သင္ သည္ query တစ္ခုတြင္ raw expression တစ္ခု ထည့္သြင္းရန္ လုိအပ္နုိင္ပါသည္။ ၎ expression မ်ားသည္ query အတြင္းသုိ့ string မ်ား အျဖစ္ ထည့္သြင္းခံရပါလိမ့္မည္။ ထုိ့ေျကာင့္ SQL injections ပစ္မွတ္မ်ား ကုိ မတည္ေဆာက္မိေစရန္ ဂရုျပုဖုိ့ လုိပါသည္။ သင္သည္ raw expression မ်ား သတ္မွတ္ရန္ `Db::raw` method ကုိ အသုံးျပုနုိင္ပါသည္။

#### Raw expression မ်ား အသုံးျပု ျခင္း

	$users = DB::table('users')
	                     ->select(DB::raw('count(*) as user_count, status'))
	                     ->where('status', '<>', 1)
	                     ->groupBy('status')
	                     ->get();

#### Column တန္ဖုိးတစ္ခုအား တိုးျခင္း သုိ့မဟုတ္ ေလ်ွာ့ျခင္း

	DB::table('users')->increment('votes');

	DB::table('users')->increment('votes', 5);

	DB::table('users')->decrement('votes');

	DB::table('users')->decrement('votes', 5);

သင့္ အေနနွင့္ အျခား update လုပ္လုိေသာcolumn မ်ား ကိုလည္း ထပ္မံ ထည့္သြင္းေပးနုိင္ပါသည္။

	DB::table('users')->increment('votes', 1, array('name' => 'John'));

<a name="inserts"></a>
## Insert မ်ား

#### Table တစ္ခု အတြင္းသုိ့ Record မ်ား ထည့္သြင္းျခင္း

	DB::table('users')->insert(
		array('email' => 'john@example.com', 'votes' => 0)
	);

#### Table တစ္ခုအတြင္းသုိ့ အလိုအေလ်ာက္ ID နံပါတ္တုိးျခင္း မပါ၀င္ပဲ Record အသစ္မ်ား ထည့္သြင္းျခင္း

အကယ္၍ table တြင္ အလုိအေလ်ာက္တုိး id နံပါတ္ပါရွိပါက `insertGetId` method ကုိ သုံး၍ record အသစ္ ထည့္သြင္းျပီး id ကုိ ရယူနုိင္ပါသည္။

	$id = DB::table('users')->insertGetId(
		array('email' => 'john@example.com', 'votes' => 0)
	);

>**မွတ္ခ်က္**။ ။ အကယ္၍ PostgreSQL ကုိ အသုံးျပု ပါက `insertGetId` method အတြက္ အလုိအေလ်ာက္တုိး column အား "id" ဟု အမည္ေပးထားရန္ လုိပါသည္။

#### Table Table တစ္ခု အတြင္း Record အမ်ားအျပား ထည့္သြင္းျခင္း

	DB::table('users')->insert(array(
		array('email' => 'taylor@example.com', 'votes' => 0),
		array('email' => 'dayle@example.com', 'votes' => 0),
	));

<a name="updates"></a>
## Update မ်ား

#### Table တစ္ခုအတြင္းရွိ Record မ်ားအား ျပု ျပင္မြမ္းမံျခင္း

	DB::table('users')
	            ->where('id', 1)
	            ->update(array('votes' => 1));

<a name="deletes"></a>
## Delete မ်ား

#### Table တစ္ခုအတြင္းရွိ record မ်ား အား ဖ်က္သိမ္းျခင္း

	DB::table('users')->where('votes', '<', 100)->delete();

#### Table တစ္ခုအတြင္းရွိ record အားလုံးအား ဖ်က္သိမ္းျခင္း

	DB::table('users')->delete();

#### Table တစ္ခုအား truncate လုပ္ျခင္း

	DB::table('users')->truncate();

<a name="unions"></a>
## Union မ်ား

Query builder သည္ query နွစ္ခုအား အလြယ္တကူ "union" လုပ္နုိင္ေစရန္ နည္းလမ္းတစ္ခု ပံ့ပိုးေပးထားပါသည္။

	$first = DB::table('users')->whereNull('first_name');

	$users = DB::table('users')->whereNull('last_name')->union($first)->get();

`unionAll`method လည္းရွိပါသည္။ ၎၏ method signature မွာ `union` နွင့္ အတူတူပင္ ျဖစ္ပါသည္။

<a name="pessimistic-locking"></a>
## Pessimistic Locking

Query builder တြင္ သင့္ select statement မ်ား "pessimistic locking" ျပု လုပ္နုိင္ရန္ ဖန္ရွင္ တစ္ခ် ိ ု့ ပံ့ပုိးေပးထားပါသည္။

Select statement တစ္ခုအား "shared_lock" ျဖင့္ သုံးလိုလ်ွင္ သင့္ query တြင္ `sharedLock` method အား အသုံးျပုနုိင္ပါသည္။

	DB::table('users')->where('votes', '>', 100)->sharedLock()->get();

Select statement တစ္ခုအား update လုပ္ျခင္းမွ ကာကြယ္လုိလွ်င္ သင့္ query တြင္ `lockForUpdate` method ကုိ အသုံးျပုနုိင္ပါသည္။

	DB::table('users')->where('votes', '>', 100)->lockForUpdate()->get();

<a name="caching-queries"></a>
## Query မ်ားကုိ Cache လုပ္ျခင္း

သင္သည္ query တစ္ခု၏ ရလဒ္ကုိ `remember` method ကုိ သုံး ၍ အလြယ္တကူ cache လုပ္နုိင္ပါသည္။

	$users = DB::table('users')->remember(10)->get();

အထက္ပါ ဥပမာတြင္ သင့္ query ရလဒ္အား ၁၀ မိနစ္ အထိ cache လုပ္ေပးသြားမည္ ျဖစ္သည္။ အကယ္၍ ရလဒ္မ်ားသည္ cache လုပ္ျပီး ျဖစ္ပါက database အား ထပ္မံ query လုပ္မည္မဟုတ္ပဲ ရလဒ္မ်ားအား သင့္ application အတြက္ သတ္မွတ္ထားေသာ cache driver မွ ရယူေပးသြားမည္ ျဖစ္ပါသည္။

အကယ္၍ သင္သည္ ေထာက္ပံ့ေပးထားေသာ [supported cache driver](cache#cache-tags.md) တစ္ခုကို သုံးပါက cache မ်ားအတြက္ tag မ်ားလည္း ထည့္သြင္းနုိင္ပါသည္။

	$users = DB::table('users')->cacheTags(array('people', 'authors'))->remember(10)->get();

