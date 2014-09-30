# Database အသုုံးပြုပုုံ အခြေခံ

- [Configuration](#configuration)
- [Read / Write Connections](#read-write-connections)
- [Running Queries](#running-queries)
- [Database Transactions](#database-transactions)
- [Accessing Connections](#accessing-connections)
- [Query Logging](#query-logging)

<a name="configuration"></a>
## Configuration

Laravel တွင် Database နှင့် ချိိတ်ဆက် အသုုံးပြုရှာတွင် အင်မတန် လွယ်ကူ အောင် ပြုလုုပ်ထားသည်။ Database Configuration file ကိုု `app/config/database.php` တွင် တွေ ့နုုိင်မည် ဖြစ်သည်။ ထုုိ ဖုုိင်ထဲတွင် သင့် ချိိတ်ဆက်လုုိသော database connection ကိုု ထည့်သွင်း နုုိင်သလုုိ မည်သည့် connection ကိုု ပုုံသေ အသုုံးပြုမည်ကုုိပါ သတ်မှတ်နုုိင်သည်။ Support လုုပ်သည့် database system များနှင့် အစမ်း အနေဖြင့် ချိတ်ဆက်ထားသည့် ပုုံစံများကိုု ထည့်သွင်းထားသဖြင့် ကြည့်ရှုပြီး လုုိအပ်သလုုိ ပြောင်းလဲ နုုိင်မည် ဖြစ်သည်။ လက်ရှိတွင် Laravel အနေဖြင့် MySQL,Postgres, SQLite နှင့် SQL Server တုုိ ့ကုုို support လုုပ်သည်။
 

<a name="read-write-connections"></a>
## Read / Write Connections

တခါတရံ သင့်အနေဖြင့် database တစ်ခုုကိုု SELECT ကဲ့သုုိ ့ statement များ အသုုံးပြုပြီး ကျန် အခြားတစ်ခုုကိုု INSERT, UPDATE, နှင့် DELETE statement များကုုိ အသုုံးပြုလုုိသည့် အခါများလည်း ရှိပေမည်။ ထုုိသုုိ ့ ပြုပြင်ရာတွင် Laravel တွင် လေညင်းလေး တုုိက်ခတ်သကဲ့သုုိ ့  ငြိမ့်ညောင်းသာယာစွာ အလွယ်တကူ ပြင်ဆင် အသုုံးပြုနုုိင်သည်။ ထုုိ Connection များကုုိ Raw Query အသုုံးပြုရာတွင် ဖြစ်စေ ၊ Query Builder ဖြင့် ရေးသာသည် ဖြစ်စေ ၊ Eloquent ORM ကိုု အသုုံးပြုသည် ဖြစ်စေ အသုုံးပြုနုုိင်မည် ဖြစ်သည်။ 


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

သင့် အနေဖြင့် Key အသစ် နှစ်ခုုဖြစ်သော `read` နှင့် `write` ကုုိ configuration array ထဲတွင် ထည့်သွင်းထားသည်ကိုု သတိပြုမိပေမည်။ ၄င်း key နှစ်ခုုလုုံးတွင်`host` ဟုုသော key သည် value အနေဖြင့် တည်ရှိနေမည် ဖြစ်သည်။ Read နှင့် Write Connections များအတွက် အဓိက `mysql` array မှ လုုပ်ဆောင်သွားမည်ဖြစ်သည်။ ထုုိကြောင့် မိမိတုုိ ့အနေဖြင့် ထုုိ `read` နှင့် `write` အတွင်းမှ တန်ဖုုိးများကုုိ ပြောင်းလဲခြင်း ဖြင့် မိမိတုုိ ့ စိတ်ကြိုက် ပြင်ဆင်နုုိင်သည်။ ထုုိကြောင့် “read” connection အတွက် 192.168.1.1 ကိုု အသုုံးပြုထားပြီး 192.168.1.2 ကုုိ “write” connection ကုုိ အသုုံးပြုထားသည်။ database credentials များ၊ prefix နှင့် character set များနှင့် အခြား option များမှာ connections နှစ်ခုုလုုံး အတူတူပင် ဖြစ်မည်။ 

<a name="running-queries"></a>
## Query များ အသုုံးပြုခြင်း

database connection ကုုိ အခြေချပြီးသည်နှင့် `DB` ကုုိ အသုုံးပြုနိုုင်ပြီး query များ run နုုိင်ပြီ ဖြစ်သည်။

####  Select Query ကုုိ အသုုံးပြုခြင်း

$results = DB::select('select * from users where id = ?', array(1));

`select` method မှာ ရလဒ်များကုုိ အမြဲတမ်း `array` အနေဖြင့် ထုုတ်ပေးမည် ဖြစ်သည်။

#### Insert Statement ကုုိ အသုုံးပြုခြင်း

DB::insert('insert into users (id, name) values (?, ?)', array(1, 'Dayle'));

#### Update Statement ကုုိ အသုုံးပြုခြင်း

DB::update('update users set votes = 100 where name = ?', array('John'));

#### Delete Statement ကုုိ အသုုံးပြုခြင်း

DB::delete('delete from users');

> **သတိပြုရန်:**  `update` နှင့် `delete` statement များမှာ သက်ရောက်မှုရှိသော rows ကုုိ return ပြန်ပေးမည် ဖြစ်သည်။

#### အခြား Statement များ အသုုံးပြုခြင်း

DB::statement('drop table users');

#### Query Events များကုုိ စောင့်ဖမ်းခြင်း

query events များကုုိ `DB::listen` method အသုုံးပြုပြီး စောင့်ဖမ်းကာ ချိတ်ဆက် ရေးသားနုုိင်သေးသည်။

DB::listen(function($sql, $bindings, $time)
{
//
});

<a name="database-transactions"></a>
## Database Transactions

Database transaction များကုုိ အသုုံးပြုလုုိပါက `transaction` method ကုုိ အသုုံးပြုနုုိင်သည်။

DB::transaction(function()
{
DB::table('users')->update(array('votes' => 1));

DB::table('posts')->delete();
});

> **သတိပြုရန်:** `transaction` closure အတွင်းတွင် ဖြစ်ပေါ်လာသော exception တုုိင်းသည်  transaction ကုုိ အလုုိအလျောက် roll back လုုပ်သွားမည် ဖြစ်သည်။

တခါတရံ ကုုိယ့်ဖာသာကိုုယ် transactions ရေးသားရန် လုုိပေမည်။

DB::beginTransaction();

ပြီးလျင် `rollback` method ကုုိ အသုုံးပြုပြီး နောက်သုုိ ့ပြန်သွားနုုိင်သည်။

DB::rollback();

နောက်ဆုုံး အနေဖြင့်  transaction တစ်ခုုကုုိ  `commit` method ကုုိ အသုုံးပြုနုုိင်သေးသည်။

DB::commit();

<a name="accessing-connections"></a>
## Accessing Connections

Connection များစွာဖြင့် အသုုံးပြုနေရပါက `DB::connection` method ကုုိ အသုုံးပြုနုုိင်သည်။

$users = DB::connection('foo')->select(...);

Raw အတိုုင်း access ပြုလုုပ်နုုိင်သလုုိ၊ PDO instance ကုုိလည်း ရနုုိင်ပါသေးသည်။

$pdo = DB::connection()->getPdo();

တခြာတရံ database တစ်ခုုကုုိပဲ  ထပ်မံပြီး reconnect လုုပ်ရသော အခါမျိုး ရှိနုုိင်သေးသည်။

DB::reconnect('foo’);    

Database တစ်ခုုကုုိ PDO instance တစ်ခုု၏ `max_connections` limit ထက်များလာပြီး ဖြတ်တောက် ပေးရန် လုုိအပ်လာပါက `disconnect` method ကုုိ အသုုံးပြုနုုိင်သည်။

DB::disconnect('foo');

<a name="query-logging"></a>
## Query Logging

default အနေဖြင့် laravel သည် query တုုိင်း၏ log ကိုု လက်ရှိ run မည့် request ၏ memory တွင်မှတ်ထားလေ့ ရှိသည်။ သုုိ ့သော်လည်း rows အမြောက်အမြား ကုုိ insert ပြုလုုပ်ခြင်းကဲ့သုုိ ့သော အခါ  memory အလွန်အမင်း အသုုံးများနုုိင်သည်။ ထုုိသုုိ ့သော အခါ Log မှတ်ခြင်းကုုိ မပြုလုုပ်လုုိပါက `disableQueryLog` method ကိုု အသုုံးပြုနုုိင်သည်။


DB::connection()->disableQueryLog();

Executed Query များ၏ array ကိုု ထုုတ်ယူလုုိပါက `getQueryLog` method ကုုိ အသုုံးပြုနုုိင်သည်။

       $queries = DB::getQueryLog();
