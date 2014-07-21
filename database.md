# Database အသုုံးျပဳပုုံ အေျခခံ

- [Configuration](#configuration)
- [Read / Write Connections](#read-write-connections)
- [Running Queries](#running-queries)
- [Database Transactions](#database-transactions)
- [Accessing Connections](#accessing-connections)
- [Query Logging](#query-logging)

<a name="configuration"></a>
## Configuration

Laravel တြင္ Database ႏွင့္ ခ်ိိတ္ဆက္ အသုုံးျပဳရွာတြင္ အင္မတန္ လြယ္ကူ ေအာင္ ျပဳလုုပ္ထားသည္။ Database Configuration file ကိုု `app/config/database.php` တြင္ ေတြ ့ႏုုိင္မည္ ျဖစ္သည္။ ထုုိ ဖုုိင္ထဲတြင္ သင့္ ခ်ိိတ္ဆက္လုုိေသာ database connection ကိုု ထည့္သြင္း ႏုုိင္သလုုိ မည္သည့္ connection ကိုု ပုုံေသ အသုုံးျပဳမည္ကုုိပါ သတ္မွတ္ႏုုိင္သည္။ Support လုုပ္သည့္ database system မ်ားႏွင့္ အစမ္း အေနျဖင့္ ခ်ိတ္ဆက္ထားသည့္ ပုုံစံမ်ားကိုု ထည့္သြင္းထားသျဖင့္ ၾကည့္ရႈျပီး လုုိအပ္သလုုိ ေျပာင္းလဲ ႏုုိင္မည္ ျဖစ္သည္။ လက္ရွိတြင္ Laravel အေနျဖင့္ MySQL,Postgres, SQLite ႏွင့္ SQL Server တုုိ ့ကုုို support လုုပ္သည္။
 

<a name="read-write-connections"></a>
## Read / Write Connections

တခါတရံ သင့္အေနျဖင့္ database တစ္ခုုကိုု SELECT ကဲ့သုုိ ့ statement မ်ား အသုုံးျပဳျပီး က်န္ အျခားတစ္ခုုကိုု INSERT, UPDATE, ႏွင့္ DELETE statement မ်ားကုုိ အသုုံးျပဳလုုိသည့္ အခါမ်ားလည္း ရွိေပမည္။ ထုုိသုုိ ့ ျပဳျပင္ရာတြင္ Laravel တြင္ ေလညင္းေလး တုုိက္ခတ္သကဲ့သုုိ ့  ျငိမ့္ေညာင္းသာယာစြာ အလြယ္တကူ ျပင္ဆင္ အသုုံးျပဳႏုုိင္သည္။ ထုုိ Connection မ်ားကုုိ Raw Query အသုုံးျပဳရာတြင္ ျဖစ္ေစ ၊ Query Builder ျဖင့္ ေရးသာသည္ ျဖစ္ေစ ၊ Eloquent ORM ကိုု အသုုံးျပဳသည္ ျဖစ္ေစ အသုုံးျပဳႏုုိင္မည္ ျဖစ္သည္။ 


To see how read / write connections should be configured, let's look at this example:

'mysql' => array(
'read' => array(
'host' => '192.168.1.1',
),
'write' => array(
'host' => '196.168.1.2'
),
'driver'    => 'mysql',
'database'  => 'database',
'username'  => 'root',
'password'  => '',
'charset'   => 'utf8',
'collation' => 'utf8_unicode_ci',
'prefix'    => '',
),

သင့္ အေနျဖင့္ Key အသစ္ ႏွစ္ခုုျဖစ္ေသာ `read` ႏွင့္ `write` ကုုိ configuration array ထဲတြင္ ထည့္သြင္းထားသည္ကိုု သတိျပဳမိေပမည္။ ၄င္း key ႏွစ္ခုုလုုံးတြင္`host` ဟုုေသာ key သည္ value အေနျဖင့္ တည္ရွိေနမည္ ျဖစ္သည္။ Read ႏွင့္ Write Connections မ်ားအတြက္ အဓိက `mysql` array မွ လုုပ္ေဆာင္သြားမည္ျဖစ္သည္။ ထုုိေၾကာင့္ မိမိတုုိ ့အေနျဖင့္ ထုုိ `read` ႏွင့္ `write` အတြင္းမွ တန္ဖုုိးမ်ားကုုိ ေျပာင္းလဲျခင္း ျဖင့္ မိမိတုုိ ့ စိတ္ၾကိဳက္ ျပင္ဆင္ႏုုိင္သည္။ ထုုိေၾကာင့္ “read” connection အတြက္ 192.168.1.1 ကိုု အသုုံးျပဳထားျပီး 192.168.1.2 ကုုိ “write” connection ကုုိ အသုုံးျပဳထားသည္။ database credentials မ်ား၊ prefix ႏွင့္ character set မ်ားႏွင့္ အျခား option မ်ားမွာ connections ႏွစ္ခုုလုုံး အတူတူပင္ ျဖစ္မည္။ 

<a name="running-queries"></a>
## Query မ်ား အသုုံးျပဳျခင္း

database connection ကုုိ အေျခခ်ျပီးသည္ႏွင့္ `DB` ကုုိ အသုုံးျပဳႏိုုင္ျပီး query မ်ား run ႏုုိင္ျပီ ျဖစ္သည္။

####  Select Query ကုုိ အသုုံးျပဳျခင္း

$results = DB::select('select * from users where id = ?', array(1));

`select` method မွာ ရလဒ္မ်ားကုုိ အျမဲတမ္း `array` အေနျဖင့္ ထုုတ္ေပးမည္ ျဖစ္သည္။

#### Insert Statement ကုုိ အသုုံးျပဳျခင္း

DB::insert('insert into users (id, name) values (?, ?)', array(1, 'Dayle'));

#### Update Statement ကုုိ အသုုံးျပဳျခင္း

DB::update('update users set votes = 100 where name = ?', array('John'));

#### Delete Statement ကုုိ အသုုံးျပဳျခင္း

DB::delete('delete from users');

> **သတိျပဳရန္:**  `update` ႏွင့္ `delete` statement မ်ားမွာ သက္ေရာက္မႈရွိေသာ rows ကုုိ return ျပန္ေပးမည္ ျဖစ္သည္။

#### အျခား Statement မ်ား အသုုံးျပဳျခင္း

DB::statement('drop table users');

#### Query Events မ်ားကုုိ ေစာင့္ဖမ္းျခင္း

query events မ်ားကုုိ `DB::listen` method အသုုံးျပဳျပီး ေစာင့္ဖမ္းကာ ခ်ိတ္ဆက္ ေရးသားႏုုိင္ေသးသည္။

DB::listen(function($sql, $bindings, $time)
{
//
});

<a name="database-transactions"></a>
## Database Transactions

Database transaction မ်ားကုုိ အသုုံးျပဳလုုိပါက `transaction` method ကုုိ အသုုံးျပဳႏုုိင္သည္။

DB::transaction(function()
{
DB::table('users')->update(array('votes' => 1));

DB::table('posts')->delete();
});

> **သတိျပဳရန္:** `transaction` closure အတြင္းတြင္ ျဖစ္ေပၚလာေသာ exception တုုိင္းသည္  transaction ကုုိ အလုုိအေလ်ာက္ roll back လုုပ္သြားမည္ ျဖစ္သည္။

တခါတရံ ကုုိယ့္ဖာသာကိုုယ္ transactions ေရးသားရန္ လုုိေပမည္။

DB::beginTransaction();

ျပီးလ်င္ `rollback` method ကုုိ အသုုံးျပဳျပီး ေနာက္သုုိ ့ျပန္သြားႏုုိင္သည္။

DB::rollback();

ေနာက္ဆုုံး အေနျဖင့္  transaction တစ္ခုုကုုိ  `commit` method ကုုိ အသုုံးျပဳႏုုိင္ေသးသည္။

DB::commit();

<a name="accessing-connections"></a>
## Accessing Connections

Connection မ်ားစြာျဖင့္ အသုုံးျပဳေနရပါက `DB::connection` method ကုုိ အသုုံးျပဳႏုုိင္သည္။

$users = DB::connection('foo')->select(...);

Raw အတိုုင္း access ျပဳလုုပ္ႏုုိင္သလုုိ၊ PDO instance ကုုိလည္း ရႏုုိင္ပါေသးသည္။

$pdo = DB::connection()->getPdo();

တျခာတရံ database တစ္ခုုကုုိပဲ  ထပ္မံျပီး reconnect လုုပ္ရေသာ အခါမ်ိဳး ရွိႏုုိင္ေသးသည္။

DB::reconnect('foo’);    

Database တစ္ခုုကုုိ PDO instance တစ္ခုု၏ `max_connections` limit ထက္မ်ားလာျပီး ျဖတ္ေတာက္ ေပးရႏ္ လုုိအပ္လာပါက `disconnect` method ကုုိ အသုုံးျပဳႏုုိင္သည္။

DB::disconnect('foo');

<a name="query-logging"></a>
## Query Logging

default အေနျဖင့္ laravel သည္ query တုုိင္း၏ log ကိုု လက္ရွိ run မည့္ request ၏ memory တြင္မွတ္ထားေလ့ ရွိသည္။ သုုိ ့ေသာ္လည္း rows အေျမာက္အျမား ကုုိ insert ျပဳလုုပ္ျခင္းကဲ့သုုိ ့ေသာ အခါ  memory အလြန္အမင္း အသုုံးမ်ားႏုုိင္သည္။ ထုုိသုုိ ့ေသာ အခါ Log မွတ္ျခင္းကုုိ မျပဳလုုပ္လုုိပါက `disableQueryLog` method ကိုု အသုုံးျပဳႏုုိင္သည္။


DB::connection()->disableQueryLog();

Executed Query မ်ား၏ array ကိုု ထုုတ္ယူလုုိပါက `getQueryLog` method ကုုိ အသုုံးျပဳႏုုိင္သည္။

       $queries = DB::getQueryLog();
