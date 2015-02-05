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

#### Specifying The Configuration Environment

You may specify the configuration environment that should be used while running a command using the `--env` switch:

php artisan migrate --env=local

#### Displaying Your Current Laravel Version

You may also view the current version of your Laravel installation using the `--version` option:

php artisan --version

<a name="calling-commands-outside-of-cli"></a>
## Calling Commands Outside Of CLI

Sometimes you may wish to execute an Artisan command outside of the CLI. For example, you may wish to fire an Artisan command from an HTTP route. Just use the `Artisan` facade:

Route::get('/foo', function()
{
$exitCode = Artisan::call('command:name', ['--option' => 'foo']);

//
});

You may even queue Artisan commands so they are processed in the background by your [queue workers](/docs/5.0/queues):

Route::get('/foo', function()
{
Artisan::queue('command:name', ['--option' => 'foo']);

//
});

<a name="scheduling-artisan-commands"></a>
## Scheduling Artisan Commands

In the past, developers have generated a Cron entry for each console command they wished to schedule. However, this is a headache. Your console schedule is no longer in source control, and you must SSH into your server to add the Cron entries. Let's make our lives easier. The Laravel command scheduler allows you to fluently and expressively define your command schedule within Laravel itself, and only a single Cron entry is needed on your server.

Your command schedule is stored in the `app/Console/Kernel.php` file. Within this class you will see a `schedule` method. To help you get started, a simple example is included with the method. You are free to add as many scheduled jobs as you wish to the `Schedule` object. The only Cron entry you need to add to your server is this:

* * * * * php /path/to/artisan schedule:run 1>> /dev/null 2>&1

This Cron will call the Laravel command scheduler every minute. Then, Laravel evalutes your scheduled jobs and runs the jobs that are due. It couldn't be easier!

### More Scheduling Examples

Let's look at a few more scheduling examples:

#### Scheduling Closures

$schedule->call(function()
{
// Do some task...

})->hourly();

#### Scheduling Terminal Commands

$schedule->exec('composer self-update')->daily();

#### Manual Cron Expression

$schedule->command('foo')->cron('* * * * *');

#### Frequent Jobs

$schedule->command('foo')->everyFiveMinutes();

$schedule->command('foo')->everyTenMinutes();

$schedule->command('foo')->everyThirtyMinutes();

#### Daily Jobs

$schedule->command('foo')->daily();

#### Daily Jobs At A Specific Time (24 Hour Time)

$schedule->command('foo')->dailyAt('15:00');

#### Twice Daily Jobs

$schedule->command('foo')->twiceDaily();

#### Job That Runs Every Weekday

$schedule->command('foo')->weekdays();

#### Weekly Jobs

$schedule->command('foo')->weekly();

// Schedule weekly job for specific day (0-6) and time...
$schedule->command('foo')->weeklyOn(1, '8:00');

#### Monthly Jobs

$schedule->command('foo')->monthly();

#### Limit The Environment The Jobs Should Run In

$schedule->command('foo')->monthly()->environments('production');

#### Indicate The Job Should Run Even When Application Is In Maintenance Mode

$schedule->command('foo')->monthly()->evenInMaintenanceMode();

#### Only Allow Job To Run When Callback Is True

$schedule->command('foo')->monthly()->when(function()
{
return true;
});
