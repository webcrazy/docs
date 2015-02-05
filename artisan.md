# Artisan CLI

- [အစပျိုး](#introduction)
- [အသုံးပြုပုံ](#usage)
- [CLI အပြင်မှ Command များ ခေါ်ယူ အသုံးပြုခြင်း](#calling-commands-outside-of-cli)
- [Artisan Command များ Schedule ပြုလုပ်ခြင်း](#scheduling-artisan-commands)

<a name="introduction"></a>
## အစပျိုး


Artisan ဟာ Laravel မှာ ပါဝင်တဲ့ command-line interface ဖြစ်ပြီးတော့ သင် application ကို develop ပြုလုပ်ချိန်မှာမှာ အဆင်ပြေလှတဲ့ Command တွေကို အသုံးပြုနိုင်အောင် ဖန်တီးပေးထားပါတယ်။ Artisan ဟာ Symfony Console ရဲ့ အစိတ်အပိုင်းတစ်ခုကနေ ရေးသားထားတာ ဖြစ်ပါတယ်။ 


<a name="usage"></a>
## အသုံးပြုပုံ

####  အသုံးပြုနိုင်သည့် Commands များအား စီတန်းကြည့်ရှုခြင်း

အသုံးပြုနိုင်သည့် Command များကို ကြည့်ရှုလိုပါက `list` command ကို အသုံးပြုနိုင်ပါသည်။ 

php artisan list

#### Command တစ်ခုချင်းစီ၏ အသုံးပြုပုံကို ကြည့်ရှုခြင်း

Command တိုင်းတွင် “help” suffix ပါဝင်ပြီး command တစ်ခု၏ အသုံးပြုနိုင်သည့် argument နှင့် options များကို ကြည့်ရှုနိုင်သည်။ ထိုသို့ကြည့်ရှုလိုပါက မိမိအသုံးပြုလိုသည့် command ၏ နောက်မှ help ဟုထည့်ရိုက်ပေးရန်သာလိုသည်။

php artisan help migrate

#### Configuration Environment အားသတ်မှတ်ခြင်း

သင့်အနေဖြင့် `--env` switch ကိုအသုံးပြုကာ မိမိတို့ run နေသည့် command ၏ သက်ရောက်လိုသော environment ကို ရွေးချယ်သတ်မှတ်နိုင်သည်။

php artisan migrate --env=local

#### လက်ရှိအသုံးပြုနေသည့် Laravel Version အား ဖော်ပြခြင်း

မိမိတို့ လက်ရှိ အသုံးပြုနေသည့် Laravel version   `--version` option ကိုအသုံးပြုပြီး သိရှိနိုင်သည်။

php artisan --version

<a name="calling-commands-outside-of-cli"></a>
## CLI မှ မဟုတ်ပဲ artisan ကို အသုံးပြုခြင်း

တခါတရံ သင့်အနေဖြင့် CLI ကို အသုံးမပြုပဲ Artisan ကို ခေါ်ယူလိုသည့် အခါမျိုးလည်း ရှိကောင်းရှိပေမည်။ ဥပမာ သင့်အနေဖြင့် HTTP route အတွင်းတွင် Artisan ကို run လိုသည့်အခါမျိုးတွင် သင့်အနေဖြင့် `Artisan` facade ကို အသုံးပြုနိုင်သည်။ 


Route::get('/foo', function()
{
$exitCode = Artisan::call('command:name', ['--option' => 'foo']);

//
});

ထိုအပြင် သင့်၏ Artisan Command များကို  [queue workers](/docs/5.0/queues) အသုံးပြပြီး queue လုပ်ထားနိုင်သေးသည်။

Route::get('/foo', function()
{
Artisan::queue('command:name', ['--option' => 'foo']);

//
});

<a name="scheduling-artisan-commands"></a>
## Artisan Command များအား schedule ပြုလုပ်ခြင်း 


အရင် developer များအနေဖြင့် ၎င်းတို့ schedule ပြုလုပ်လိုသော Cron entry များကို  တစ်ခုချင်းစီ generate ပြုလုပ်ခဲ့ရပါသည်။ ထိုသို့ပြုလုပ်ရခြင်းသည် အတော်လေး ခေါင်းကိုက်စရာ ဖြစ်ပါသည်။
Console schedule များသည် source control အတွင်းမပါရှိသဖြင့် Server သို့ SSH အသုံးပြုကာ ဝင်ရောက်ပြီး Cron entries များကို ထည့်သွင်းခဲ့ရပါသည်။ အခု ပိုပြီးလွယ်အောင် လုပ်ကြရအောင်။ Laravel command scheduler အနေဖြင့် Laravel အတွင်းမှပင် သင် define ပြုလုပ်လိုသော Cron entry များကို အလွယ်တကူ စီမံနိုင်ပြီ ဖြစ်သဖြင့် သင့်အနေဖြင့် Cron entry တစ်ခုသာ လိုအပ်တော့မည် ဖြစ်သည်။

သင်၏ command schedule များသည်  `app/Console/Kernel.php`  တွင်တည်ရှိမည် ဖြစ်သည်။  ထို class အတွင်းတွင် `schedule` method ကိုတွေ့ရှိမည် ဖြစ်သည်။  အစပျိုးရန် အတွက် လွယ်ကူ ရှင်းလင်းသည့် example ကိုလည်း ထို method ထဲတွင် တွေ့ရှိရမည် ဖြစ်သည်။  သင့်အနေဖြင့် `Schedule` object ကို အသုံးပြုပြီး schedule ပြုလုပ်နိုင်သည်။ သင့် server ပေါ်တွင် ထည့်သွင်းရန်လိုမည့် Cron entry အောက်ပါ တစ်ခုသာ ဖြစ်သည်။ 


* * * * * php /path/to/artisan schedule:run 1>> /dev/null 2>&1

ထို Cron သည်  Laravel command scheduler ကို မိနစ်တိုင်း ခေါ်ယူမည် ဖြစ်သည်။. ထိုနောက် Larvel အနေဖြင့် သင့် scheduled job များကို schedule ထဲက အတိုင်း လုပ်ဆောင်ပေးမည် ဖြစ်မည်။ ထိုထက် လွယ်ကူရှင်းလင်းရန် မရှိပေ။ 

### Scheduling Examples များ

အောက်က ဥပမာများကို တချက်ကြည့်လိုက်ရအောင်။ 

#### Closures ထဲတွင် schedule ပြုလုပ်ခြင်း

$schedule->call(function()
{
// Do some task...

})->hourly();

####  Terminal Commands များကို Schedule ပြုလုပ်ခြင်း 

$schedule->exec('composer self-update')->daily();

#### Manual Cron Expression

$schedule->command('foo')->cron('* * * * *');

#### ကြိမ်ဖန်များစွာ ပြုလုပ်သည့် Job များ

$schedule->command('foo')->everyFiveMinutes();

$schedule->command('foo')->everyTenMinutes();

$schedule->command('foo')->everyThirtyMinutes();

####နေစဉ် ပြုလုပ်သည့် Job များ

$schedule->command('foo')->daily();

#### နာရီ သတ်မှတ်ထားသော နေစဉ်ပြုလုပ်သည့် Job များ (၂၄ နာရီ စည်းမျဉ်းဖြင့်)

$schedule->command('foo')->dailyAt('15:00');

#### တစ်နေ့ နှစ်ခါ ပြုလုပ်မည့် Job များ

$schedule->command('foo')->twiceDaily();

#### ရုံးဖွင့်ရက်တိုင်း run မည့် Job များ

$schedule->command('foo')->weekdays();

#### အပတ်စဉ် Job များ

$schedule->command('foo')->weekly();

// Schedule weekly job for specific day (0-6) and time...
$schedule->command('foo')->weeklyOn(1, '8:00');

#### လစဉ် Job များ

$schedule->command('foo')->monthly();

####  Jobs များ run မည့် Environment ကို တင်ကြိုသတ်မှတ်ခြင်း 

$schedule->command('foo')->monthly()->environments('production');

#### Maintenance Mode တွင်ပင် run မည့် Job များ 

$schedule->command('foo')->monthly()->evenInMaintenanceMode();

#### Callback True ဖြစ်မှသာ run မည့် Job 

$schedule->command('foo')->monthly()->when(function()
{
return true;
});
