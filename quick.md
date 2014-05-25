# Laravel Quickstart

- [Installation](#installation)
- [Routing](#routing)
- [Creating A View](#creating-a-view)
- [Creating A Migration](#creating-a-migration)
- [Eloquent ORM](#eloquent-orm)
- [Displaying Data](#displaying-data)

<a name="installation"></a>
## Installation

### Laravel Installer ကုိ အသုံးျပဳျခင္း

ေရွးဦးစြာ [Laravel installer PHAR archive](http://laravel.com/laravel.phar) ကုိ ေဒါင္းပါ။  အဆင္ေျပေစရန္အတြက္ ထုိ  file ကုိ `laravel` ဟု အမည္ေပးျပီး `/usr/local/bin` ထဲသုိ ့ေျပာင္းေရြ  ့လုိက္ပါ။ ထုိေနာက္ `laravel new` command ျဖင့္ သင္ထားရွိထားေသာ directory ေပၚတြင္ laravel installation အလုိအေလ်ာက္ ျပလုပ္သြားမည္ ျဖစ္သည္။  ဥပမာ `laravel new blog` ဆုိသည့္ command ကုိအသုံးျပပါက `blog` အမည္ရွိ folder တစ္ခုကုိ တည္ေဆာက္ေပးျပီး လုိအပ္သည့္ package မ်ားကိုပါ တခါတည္း ေဒါင္းလုပ္လုပ္ကာ စုစည္းေပးသြားမည္ ျဖစ္သည္။ ၄င္းသုိ ့ install ျပဳလုပ္ျခင္းသည္ Composer မွ install လုပ္ျခင္းထက္ ပုိ၍ လ်င္ျမန္ပါလိမ့္မည္။

### Composer ကို အသုံးျပဳျခင္း

Laravel framework ကုိ [Composer](http://getcomposer.org) မွလည္း installation ႏွင့္ လုိအပ္သည့္ package မ်ားကုိ ထည့္သြင္းႏုိင္သည္။ Composer မသြင္းရေသးပါက  [Composer ထည့္သြင္းျခင္းနည္းလမ္း](http://getcomposer.org/doc/00-intro.md) ကုိၾကည့္၍ ထည့္သြင္းႏုိင္ပါသည္။

ထုိေနာက္ သင့္အေနျဖင့္ terminal မွ ေအာက္ပါ command ကုိ ရုိက္သြင္းျခင္းျဖင့္ Laravel ကုိ install ျပဳလုပ္ႏုိင္မည္ ျဖစ္သည္။

	composer create-project laravel/laravel your-project-name --prefer-dist

၄င္း command မွ laravel အသစ္စက္စက္ ကုိ သင့္`your-project-name` folder အတြင္းတြင္ တည္ရွိေနမည္ကို ေတြ ့ရပါမည္။

ထုိတင္မက သင့္ အေနျဖင့္ [Laravel repository from Github](https://github.com/laravel/laravel/archive/master.zip) မွ ေဒါင္းေလာ့ ျပဳလုပ္ျပီး directory ထဲတြင္ `composer install` run ၍လည္း install ျပဳလုပ္ႏုိင္ပါသည္။ ထုိ command မွ framework တြင္ လုိအပ္ေသာ package မ်ားကုိ အလုိအေလ်ာက္ download ျပဳလုပ္ျပီး install သြားမည္ ျဖစ္သည္။

### Permissions

Laravel ကုိ install ျပဳလုပ္ျပီးပါက သင့္အေနျဖင့္ web server ၏ write permission ျဖင့္ပတ္သတ္၍ `app/storage` ထဲတြင္ ျပင္ဆင္ရန္ လုိအပ္ေကာင္း လုိအပ္ေပမည္။ အေသးစိတ္ အခ်က္အလက္ကုိ  [Installation](/docs/installation) တြင္ ၾကည့္ရႈႏုိင္ပါသည္။

### Serving Laravel

အၾကမ္းအားျဖင့္ Apache သုိ ့မဟုတ္ Nginx ေပၚတြင္ laravel application ကုိ တင္ထားႏုိင္သည္။  သင့္ အသုံးျပဳေသာ PHP version မွာ 5.4 အထက္ျဖစ္ျပီး PHP တြင္ပါဝင္ေသာ default server ကုိ အသုံးျပဳလုိပါက သင့္အေနျဖင့္ Artisan command ျဖစ္သည့္ `serve` ကုိ အသုံးျပဳႏုိင္သည္။

	php artisan serve

<a name="directories"></a>
### Directory Structure

Framework ကုိ install ျပဳလုပ္ျပီးေနာက္ သင့္ အေနျဖင့္ directory structure ျဖင့္ ရင္းႏွီးေနရန္ လုိေပမည္။ `app` directory ထဲတြင္ `views`, `controllers`, and `models` အစရွိသည့္ folder မ်ား တည္ရွိေနသည္ကုိ ေတြ ့ ရမည္ ျဖစ္သည္။ သင့္ application ၏ code မ်ားကုိ ထုိထဲတြင္ ေရးသားရမည္ ျဖစ္သည္။ သင့္အေနျဖင့္ လုိအပ္မည့္ configuration ႏွင့္ ပတ္သတ္၍ `app/config` အမည္ရွိ directory ထဲတြင္ၾကည့္ရႈရမည္ ျဖစ္သည္။

<a name="routing"></a>
## Routing

ေရွးဦးစြာ Route တစ္ခုကို တည္ေဆာက္ၾကပါစို ့။  Laravel တြင္ အရုိးရွင္းဆုံး route မွာ route to Closure ျဖစ္သည္။ `app/routes.php` ကုိဖြင့္ျပီး ေအာက္ပါ code ကုိထည့္သြင္းၾကည့္ပါ။ 

	Route::get('users', function()
	{
		return 'Users!';
	});

ထုိေနာက္ web browser ေပၚတြင္ `/users` ဟူေသာ route ျဖင့္ စမ္းၾကည့္ပါက သင့္အေနျဖင့္ `Users!` တုံ ့ျပန္သည္ကို ျမင္ေတြ ့ရမည္ ျဖစ္သည္။ 
ေကာင္းေလစြ! သင့္အေနျဖင့္ ပထမဦးစြာ route တစ္ခုကို ဖန္တီးလုိက္ျပီ ျဖစ္သည္။


Route မ်ားမွာ controller မ်ားႏွင့္လည္း ခ်ိတ္ဆက္ အလုပ္လုပ္ႏိုင္သည္။ ဥပမာ

	Route::get('users', 'UserController@getIndex');

အဆုိပါ route တြင္ 	`/users` ဟုေခၚယူလုိက္ပါက `UserController` class အတြင္းရွိ `getIndex` method  ကုိ အလုပ္လုပ္မည္ ျဖစ္သည္။ Controller routing ႏွင့္ ပတ္သတ္၍ အေသးစိတ္ကုိ [controller documentation](/docs/controllers) တြင္ၾကည့္ရႈႏုိင္သည္။

<a name="creating-a-view"></a>
## View တစ္ခု တည္ေဆာက္ျခင္း

ထုိေနာက္ user data မ်ားကို ေဖာ္ျပရန္ ရုိးရွင္းသည့္ view တစ္ခုကို တည္ေဆာက္ရန္ လုိေပမည္။  view file မ်ားသည္ `app/views` directory  ထဲတြင္ တည္ရွိမည္ ျဖစ္သည္။  View တြင္ သင့္ application တြင္ ေဖာ္ျပလုိသည့္  HTML ျဖင့္ ေဖာ္ျပသြားမည္ ျဖစ္သည္။  `layout.blade.php` ႏွင့္ `users.blade.php` ဟု၍ file ႏွစ္ခုကို တည္ေဆာက္လုိက္ပါ။ `layout.blade.php` ဟုသည့္ file တြင္ ေအာက္ပါ အတုိင္း ေရးသားလုိက္ပါ။

	<html>
		<body>
			<h1>Laravel Quickstart</h1>

			@yield('content')
		</body>
	</html>

ထုိေနာက္ `users.blade.php` ဟုေသာ view တစ္ခုကို တည္ေဆာက္ လတၱံ ့။ 

	@extends('layout')

	@section('content')
		Users!
	@stop

တခ်ိဳ  ့ေသာ syntax မ်ားမွ သင့္အတြက္ နည္းနည္း စိမ္းေနမည္ ျဖစ္သည္။ အဘယ္ေၾကာင့္ဆုိေသာ္ ယခု အသုံးျပဳထားသည္မွာ Laravel ၏ templating system ျဖစ္သည့္ Blade ကုိ အသုံးျပဳထားျခင္း ေၾကာင့္ ျဖစ္သည္။ Blade သည္ အလြန္ျမန္ဆန္ လွေပသည္။ အေၾကာင္းမွာ ရုိးရွင္းလြယ္ကူ regular expression မ်ားကုိ အသုံးျပဳကာ PHP အျဖစ္သုိ ့ compile ျပဳလုပ္ထားျခင္းေၾကာင့္ျဖစ္သည္။ Blade အေနျဖင့္ အလြန္တရာ စြမ္းအင္ၾကီးမားလွေသာ template inheritance ကဲ့သို ့ေသာ feature မ်ားကို support ေပးရုံသာမက  PHP တြင္ ေရးသားႏုိင္သည့္ `if` ႏွင့္ `for` သုိ ့ေသာ Conditional statement မ်ားကိုပါ ေသသပ္လွပစြာ ေရးသားႏိုင္ေသာေၾကာင့္ျဖစ္သည္။ အေသးစိတ္ကို  [Blade documentation](/docs/templates) ၾကည့္ရႈႏုိင္ေပမည္။ 

ယခု ကြ်န္ေတာ္တုိ ့ views အပုိင္းကို ဖန္တီးျပီး ျဖစ္၍ `/users` ဟုေသာ route ဘက္ကုိ ျပန္လွည့္ၾကပါစုိ ့။ Route မွ `Users!` ဟု return ျပန္ျခင္းထက္ 
view ကို ျပန္ေပးဖုိ ့လုိေပမည္။ 

	Route::get('users', function()
	{
		return View::make('users');
	});

အံၾသဖြယ္ေကာင္းေလစြ။ သင့္အေနျဖင့္ layout တစ္ခုကို extends ျပဳလုပ္ထားေသာ view တစ္ခုကုိ တည္ေဆာက္ျပီးေပသည္။ ဆက္၍ database layer တြင္ ဆက္၍ လႈပ္ရွားၾကပါစုိ ့။

<a name="creating-a-migration"></a>
## Migration တစ္ခုဖန္တီးျခင္း

Table တစ္ခုတည္ေဆာက္ျပီး data ေတြကုိ handle ႏုိင္ရန္ Laravel migration system ကုိ အသုံးျပဳရန္လုိေပမည္။ Migration အေနျဖင့္ သင့္ database ၏ modification ကုိ အလြယ္တကူ သတ္မွတ္ႏုိင္ျပီး သင့္အဖြဲ  ့သားမ်ားႏွင့္ မွ်ေဝႏုိင္ေပမည္။

ေရွးဦးစြာ database ႏွင့္ ခ်ိတ္ဆက္ရန္ လုိေပမည္။ database ျဖင့္ခ်ိတ္ဆက္ရန္ အတြက္ `app/config/database.php` တြင္ ျပင္ဆင္ရန္လုိေပမည္။ ပုံမွန္အားျဖင့္ Laravel သည္ MySQL ျဖင့္ အသုံးျပဳရန္ သတ္မွတ္ထားသည္။ သင့္အေနျဖင့္ လုိအပ္ေသာ credential မ်ားကုိ config file တြင္ ျဖည့္သြင္းရန္လုိေပမည္။ သင့္အေနျဖင့္ အလုိရွိပါက စိတ္ၾကိဳက္ `driver` option ကုိ `sqlite` ျဖစ္ေစေျပာင္းလဲႏုိင္ျပီ။ ၄င္းအေနျဖင့္ `app/database` directory ေအာက္တြင္ တည္ရွိမည့္ SQLite database ကို အလုပ္လုပ္မည္ ျဖစ္သည္။

ထုိေနာက္ migration တစ္ခု ဖန္တီးရန္ [Artisan CLI](/docs/artisan) ကုိ အသုံးျပဳမည္ ျဖစ္သည္။ project ၏ root တြင္ ေအာက္ပါ အတုိင္း terminal မွ run ရန္ လုိေပမည္။

	php artisan migrate:make create_users_table

ဆက္၍ `app/database/migrations` တည္ရွိသည့္ migration file ကုိ ရွာရန္ လုိေပမည္။ ထုိထဲတြင္ `up` ႏွင့္`down`ဟူေသာ method ႏွစ္ခုပါဝင္မည္ ျဖစ္သည္။


`up` method တြင္ database တြင္ ေျပာင္းလဲခ်င္သည္မ်ားကို ထည့္သြင္းေရးသား၍  `down` method ေျပာင္းျပန္ေရးသားရမည္ ျဖစ္သည္။
ေအာက္ပါအတုိင္း migration ကုိ တည္ေဆာက္လုိက္ပါ။

	public function up()
	{
		Schema::create('users', function($table)
		{
			$table->increments('id');
			$table->string('email')->unique();
			$table->string('name');
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('users');
	}

ဆက္၍ migrate ျပဳလုပ္လုိပါက terminal တြင္`migrate` ဟုရုိက္ရန္လုိေပမည္။ 

	php artisan migrate

migration တစ္ခုကို rollback (ေနာက္ျပန္လွည့္) လုိပါက သင့္အေနျဖင့္ `migrate:rollback` ဟူ၍  ရုိက္ရုံသာ ျဖစ္သည္။ ယခု database table ရွိျပီ ျဖစ္၍ 
data ေလးနည္းနည္းျဖင့္ စလုိက္ၾကပါစို ့။

<a name="eloquent-orm"></a>
## Eloquent ORM

Eloquent ORM သည္ Laravel ၏ အလွတရား တစ္ရပ္ပင္ျဖစ္သည္။ သင့္အေနျဖင့္ Ruby on Rails framework ကုိ အသုံးျပဳဖူးပါက ၄င္းကဲ့သုိ ့ database interaction ျပဳလုပ္ရာတြင္ ActiveRecord ORM style သုံးထားသာ Eloquent ႏွင့္ရင္းႏွီးေနမည္ ျဖစ္သည္။  

ပထမဦးဆုံး model တစ္ခုကို သတ္မွတ္ၾကပါစို ့။ Eloquent model တစ္ခုသည္ ဆက္စပ္ေနေသာ database table မ်ား၏ query ကုိပါ အသုံးျပဳႏုိင္သည္။ သိပ္မ်ား နားရႈပ္သြားသလား မသိ။ အခုလာမယ့္ အပုိင္းမွာ တျဖည္းျဖည္း နားလည္လာမွာပါ။ Model ေတြဟာ `app/models` ဆုိတဲ့ directory အတြင္းမွာ တည္ရွိပါတယ္။ အဆုိပါ directory ထဲမွာ ေအာက္ပါအတုိင္း `User.php` ဆုိတဲ့ model တစ္ခုကုိ တည္ေဆာက္လုိက္ပါ။

	class User extends Eloquent {}

သတိျပဳရမည္မွာ ကြ်န္ေတာ္တုိ ့အေနျဖင့္ Eloquent ကုိ မည္သည့္ table အသုံးျပဳရန္ မညြန္းဆုိရေသးေခ်။ Eloquent တြင္ အသုံးျပဳနည္း မ်ားစြာ ရွိသည့္ အနက္တစ္ခုမွာ Model အမည္၏ အမ်ားကိန္းမွာ database table အျဖစ္ အလုိအေလ်ာက္ သိရွိေနမည္ ျဖစ္သည္။ အဆင္ေျပေလစြ!

သင့္အေနျဖင့္ ၾကိဳက္သည့္ database administration tool ကို အသုံးျပဳျပီး `users` table တြင္ row အနည္းငယ္ data သြင္းလုိက္ပါ။  ထုိေနာက္ Eloquent ကုိ အသုံးျပဳ၍  data မ်ားကို ထုတ္ယူျပီး view သုိ ့လြဲေျပာင္းေပးလုိက္မည္။

ယခု `/users` route ကုိ ေအာက္ပါပုံစံေျပာင္းလဲလုိက္ပါ။

	Route::get('users', function()
	{
		$users = User::all();

		return View::make('users')->with('users', $users);
	});

အထက္ပါ route ကုိၾကည့္ပါ။ ေရွးဦးစြာ `User` model မွ `all` method မွာ `users` table မွ rows အားလုံးကုိ ထုတ္ေပးမည္ ျဖစ္သည္။ ထုိေနာက္ ထုိ record မ်ားကုိ `with` method အသုံးျပဳ၍ view သုိ ့ passing ေပးလုိက္ျခင္း ျဖစ္သည္။ ထုိ `with` method  သည္ key ႏွင့္ value အေနျဖင့္ data မ်ားကို လက္ခံမည္ ျဖစ္သည္။ ထုိအခါ view သုိ ့ data မ်ားေရာက္သြားမည္ ျဖစ္သည္။

ေကာင္းေလးစြ။ ယခု ကြ်န္ေတာ္တုိ ့ user ကုိ data မ်ား ျပသႏုိင္ရန္ အဆင္သင့္ျဖစ္ေခ်ျပီ။

<a name="displaying-data"></a>
## Data မ်ား ျပသျခင္း

ယခုအခါ `users` ကုိ view တြင္ ျမင္သာေစရန္ ျပဳလုပ္ျပီးျပီျဖစ္သည္။ ကြ်န္ေတာ္တုိ ့ ေအာက္ပါ အတုိင္း ျပသႏုိင္ေလျပီ။

	@extends('layout')

	@section('content')
		@foreach($users as $user)
			<p>{{ $user->name }}</p>
		@endforeach
	@stop

သင့္အေနျဖင့္ `echo` statements ကုိရွာေနလား မသိ။ Blade ကုိ အသုံးျပဳရာတြင္ data မ်ားကို တြန္ ့ကြင္း ႏွစ္ခု အၾကား ထည့္သြင္းျခင္းျဖင့္ data မ်ားကို echo အစား ျပသေပးႏုိင္သည္။ ဘယ္ေလာက္မ်ား လြယ္ကူေပသလဲ။ ယခုအခါ သင့္အေနျဖင့္ `/users` route ကုိ လွမ္းေခၚလုိက္ျခင္းျဖင့္ သင့္ users မ်ားကုိ ျပသႏုိင္ေလျပီ။

အထက္ပါ ဥပမာဟာ အစသာရွိပါေသးသည္။ ထုိ tutorial တြင္ သင့္အေနျဖင့္ laravel ၏ အေျခခံကို ေတြ ့ျမင္ႏုိင္မည္ ျဖစ္သည္။ သုိ ့ေသာ္လည္း ပုိမုိ၍ စိတ္လႈပ္ရွားစရာ အခ်က္မ်ားစြာ စီတန္း၍ ေလ့လာရန္ က်န္ရွိေနပါေသးသည္။ documentation ကုိ ဖတ္ရႈျခင္းျဖင့္  စြမ္းအားၾကီးမားလွသည့္  [Eloquent](/docs/eloquent) ႏွင့္ [Blade](/docs/templates) ကဲ့သုိ ့ေသာ သုိ ့မဟုတ္ သင့္ပုိစိတ္ဝင္စားႏုိင္သည့္  [Queues](/docs/queues) ႏွင့္ [Unit Testing](/docs/testing) ကဲ့သုိ ့ေသာ အေၾကာင္းအရာမ်ားကို ေလ့လာႏုိင္သည္။ ထပ္၍ သင့္ application ၏ architecture ကုိ သက္ေတာင့္သက္သာ ျဖစ္ေစမည့္  [IoC Container](/docs/ioc) မ်ားလည္း ပါဝင္ပါေသးသည္။ ေရြးခ်ယ္ပါေလာ့။
