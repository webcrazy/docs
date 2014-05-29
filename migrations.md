# Migrations & Seeding

- [အစပ်ိဳး](#introduction)
- [Migrations ဖန္တီးျခင္း](#creating-migrations)
- [Migrations ျပဳလုပ္ျခင္း](#running-migrations)
- [Migrations ေနာက္ျပန္ျခင္း](#rolling-back-migrations)
- [Database Seeding](#database-seeding)

<a name="introduction"></a>
## အစပ်ိဳး

Migration မွာ Database အတြက္ Version Control ျပဳလုပ္ႏုိင္ရန္ ဖန္တီးထားသည္။ ၄င္းကို အသုံးျပဳျခင္းျဖင့္ database schema မ်ားကို အလြယ္တကူ ျပင္ဆင္ႏုိင္ျပီး team တစ္ခုလုံး တူညီသည့္ database schema ကုိ အသုံးျပဳႏုိင္ရန္ ပံပုိးထားသည္။ Migrations မွာ ပွံမွန္အားျဖင့္ [Schema Builder](/docs/schema) ျဖင့္ တြဲဖက္ အသုံးျပဳၾကသည္။

<a name="creating-migrations"></a>
## Migrations ဖန္တီးျခင္း

migration တစ္ခု ဖန္တီးႏိုင္ရန္ Artisan CLI တြင္ `migrate:make` ဟူသည္ command ကုိ အသုံးျပဳႏုိင္သည္။

	php artisan migrate:make create_users_table

Migration file မ်ားသည္ `app/database/migrations` ဆုိသည့္ folder တြင္တည္ရွိမည္ ျဖစ္ျပီး Migrations မ်ားကုိ အစဥ္အတုိင္း စီရီထားမည့္ timestamp ျဖင့္ သတ္မွတ္ထားမည္ ျဖစ္သည္။

Migration တစ္ခု ဖန္တီးေနစဥ္ `--path` ဟု attribute ကို အသုံးျပဳႏုိင္သည္။ အဆုိပါ path မွာ သင္ install လုပ္ထားေသာ root directory မွ အလုိအေလ်ာက္ သိရွိမည္ ျဖစ္ပါသည္။

	php artisan migrate:make foo --path=app/migrations

	
`--table` ႏွင့္ `--create` options မ်ားကို အသုံးျပဳ၍  table အမည္ကုိ သတ္မွတ္ျခင္း ၊  table အသစ္ကို ဖန္တီးျခင္း မ်ား ျပဳလုပ္ႏုိင္ပါမည္။

	php artisan migrate:make add_votes_to_user_table --table=users

	php artisan migrate:make create_users_table --create=users

<a name="running-migrations"></a>
## Migrations ျပဳလုပ္ျခင္း

#### Migration ကုိ အျပည့္အဝ ျပဳလုပ္ျခင္း

	php artisan migrate

#### Path  လမ္းေၾကာင္းတစ္ခုတြင္သာ Migration ျပဳလုပ္ျခင္း

	php artisan migrate --path=app/foo/migrations

#### Package တစ္ခုအတြက္ Migration ျပဳလုပ္ျခင္း

	php artisan migrate --package=vendor/package

> **သတိျပဳရန္:**  migrations run ေနစဥ္ "class not found" ဟု error ေတြ ့ရွိပါက `composer dump-autoload` ဆုိသည့္ command ကုိ run ၾကည့္ပါ။

### Production တြင္ Migration ျပဳလုပ္ျခင္း

အခ်ိဳ  ့ေသာ migration operations မ်ားမွာ အႏၱာရယ္မ်ားလွေပသည္။ တနည္းအားျဖင့္ သင့္၏ အခ်က္အလက္မ်ားကို စကၠန္ ့ပုိင္းအတြင္ ဆုံးရႈံးသြားေစႏုိင္သည္။ အဆုိပါ အႏၱာရယ္မွ ကာကြယ္ႏုိင္ရန္  production အေျခအေနတြင္ migration ျပဳလုပ္ရန္ confirmation ေတာင္းခံပါသည္။ ထုိေတာင္းခံမႈကုိ ေက်ာ္လြွားလုိပါက `--force` flag ကုိ အသုံးျပဳႏုိင္သည္။

	php artisan migrate --force

<a name="rolling-back-migrations"></a>
## Rolling Back Migrations

#### Migrations ေနာက္ျပန္ျခင္း

	php artisan migrate:rollback

#### Migrations ပထမဆုံး အေျခအေနသုိ ့ ေနာက္ျပန္ျခင္း

	php artisan migrate:reset

#### အစမွ အဆုံး ေနာက္ျပန္ျပီးေနာက္ တဖန္ Migration ျပဳလုပ္ျခင္း

	php artisan migrate:refresh

	php artisan migrate:refresh --seed

<a name="database-seeding"></a>
## Database Seeding

Laravel အေနျဖင့္ database ကို အလြယ္တကူ seed ျပဳလုပ္ႏုိင္ရင္ seed classes မ်ားပါရွိပါသည္။ Seed class မ်ားမွာ `app/database/seeds` တြင္တည္ရွိမည္ ျဖစ္သည္။ Seed class မ်ားကို အလုိရွိသလုိ အမည္ေပးႏုိင္ေသာ္လည္း အဓိပၸါယ္ရွိေသာ နာမည္မ်ိဳး ဥပမာ `UserTableSeeder` စသျဖင့္သာ ေပးသင့္သည္။ ပုံမွန္အားျဖင့္ `DatabaseSeeder` class မွာ ဖန္တီးေပးထားသည္။ ထုိ class မွ သင့္အေနျဖင့္ `call` method ကုိ အသုံးျပဳကာ
အစီအစဥ္အလုိက္ အျခားေသာ seed classes မ်ားကုိ run ႏုိင္သည္။

#### Example Database Seed Class

	class DatabaseSeeder extends Seeder {

		public function run()
		{
			$this->call('UserTableSeeder');

			$this->command->info('User table seeded!');
		}

	}

	class UserTableSeeder extends Seeder {

		public function run()
		{
			DB::table('users')->delete();

			User::create(array('email' => 'foo@bar.com'));
		}

	}

Database ကို seed ျပဳလုပ္ရန္ Artisan CLI မွ `db:seed` command ကုိ အသုံးျပဳႏုိင္သည္။

	php artisan db:seed

ပုံမွန္အားျဖင့္ `db:seed` command မွာ `DatabaseSeeder` class ကုိ run မည္ျဖစ္ျပီး ထုိမွတဆင့္ အျခား seed class မ်ားကို ေခၚယူမည္ ျဖစ္သည္။ သုိ ့ပင္ေသာ္ညား `--class` option ကုိ အသုံးျပဳကာ သီးသန္ ့ seeder class တစ္ခုခ်င္းစီလည္း run ႏုိင္ပါေသးသည္။

	php artisan db:seed --class=UserTableSeeder

ထုိအျပင္ `migrate:refresh` ကုိအသုံးျပဳကာ, rollback ျပဳလုပ္ျပီး  migrations ကုိ အစမွ တဖန္ျပန္၍ run ျခင္းကိုလည္း ျပဳလုပ္ႏုိင္မည္ ျဖစ္သည္။

	php artisan migrate:refresh --seed
