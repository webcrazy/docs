# Artisan Development

- [Introduction](#introduction)
- [Building A Command](#building-a-command)
- [Registering Commands](#registering-commands)
- [Calling Other Commands](#calling-other-commands)

<a name="introduction"></a>
## Introduction

သင္႕ application အတြက္ ကိုယ္ပိုင္ commands ေတြကို Artisan နဲ႕ ထပ္ၿပီးေပါင္းထည္႕ႏိုင္ဖို႕စီစဥ္ထားပါတယ္။ သင္႕ရဲ႕ ကိုယ္ပိုင္ command ေတြကို `app/commands` မွာထက္ထည္႕ႏိုင္ပါတယ္၊ သို႕ေသာ္လည္းသင္႕ရဲ႕ကိုယ္ပိုင္ command ေတြကို  သင္ႀကိဳက္တဲ႕ storage location မွာ ထည္႕ႏိုင္ပါတယ္ သင္႕ရဲ႕ commands ေတြကို သင္႕ရဲ႕ `composer.json` settings မွာအေျခခံၿပီး autoload လုပ္ႏိုင္ပါတယ္။

<a name="building-a-command"></a>
## Building A Command

### Generating The Class

command တစ္ခုအသစ္ create လုပ္ရန္အတြက္ - သင္႕အေနနဲ႕  `command:make` Artisan command ကိုသံုးႏိုင္ပါတယ္၊  အဲ႕ဒါကသင္စတင္ဖို႕ command stub တစ္ခုကို generate ထုတ္ေပးပါလိမ္႕မယ္:

#### Generate A New Command Class

	php artisan command:make FooCommand

Default အရ generate လုပ္လိုက္တဲ႕ commands ေတြက `app/commands` မွာ  သိမ္းဆည္းထားမွာပါ... သို႕ေသာ္လည္း သင္႕ကိုယ္ပိုင္ path ဒါမွမဟုတ္ namespace တစ္ခု သတ္မွတ္ထားလို႕လည္းရပါတယ္:

	php artisan command:make FooCommand --path=app/classes --namespace=Classes

command create လုပ္တဲ႕အခ်ိန္မွာ `--command` option ကို terminal command name အျဖစ္ assign လုပ္ရန္အသံုးျပဳပါလိမ္႕မယ္:

	php artisan command:make AssignUsers --command=users:assign

### Writing The Command

သင္႕ရဲ႕  command generate လုပ္ၿပီးသြားတဲ႕အခ်ိန္မွာ သင္႕အေနနဲ႕ `name` နဲ႕ `description` ေတြရဲ႕ class properties ေတြကို ျဖည္႔စြတ္သင္႕ပါတယ္၊ အဲဒါေတြက သင္႕ရဲ႕ command ေတြကို `list` နဲ႕ screen မွာထုတ္ျပတဲ႕အခ်ိန္မွာ အသံုးျပဳမွာပါ။

သင္႕ command excute ျဖစ္သြားၿပီဆိုရင္ `fire` method ကိုေခၚပါ႕မယ္။ ဒီ method မွာသင္ႀကိဳက္တဲ႕ command logic ကိုထည္႕ႏိုင္တယ္။

### Arguments & Options

The `getArguments` and `getOptions` methods are where you may define any arguments or options your command receives. 

`getArguments` နဲ႕ `getOptions` methods ေတြကို သင္႕ command ကေနလက္ခံရရွိတဲ႕ မည္သည္႕ arguments ဒါမွမဟုတ္ options မဆို  သတ္မွတ္ႏိုင္ပါတယ္။ ဒီ methods ႏွစ္ခုက commands ေတြကို array တစ္ခု return ျပန္ပါတယ္၊ အဲ႕ဒီ႕ array က array options ေတြကို list တစ္ခုပံုစံနဲ႕ ေဖာ္ျပထားပါတယ္။

`arguments` ေတြကို defining လုပ္တဲ႕အခ်ိန္မွာ array definition values ေတြကို ေအာက္မွာျပထားသလိုကိုယ္စားျပဳပါတယ္ -

	array($name, $mode, $description, $defaultValue)

argument `mode` ေတြက `InputArgument::REQUIRED` or `InputArgument::OPTIONAL` တစ္ခုခုျဖစ္လိမ္႕မယ္။

`options` ေတြကိုသတ္မွတ္တဲ႕အခ်ိန္မွာ array definition values ေတြကို ေအာက္မွာျပထားသလိုကိုယ္စားျပဳပါတယ္ -

	array($name, $shortcut, $mode, $description, $defaultValue)

options အတြက္... argument `mode` က `InputOption::VALUE_REQUIRED`, `InputOption::VALUE_OPTIONAL`, `InputOption::VALUE_IS_ARRAY`, `InputOption::VALUE_NONE` ေတြျဖစ္လိမ္႕မယ္။

`VALUES_IS_ARRAY` mode ကဘာကိုေျပာတာလဲဆိုရင္ command ကိုေခၚတဲ႕အခ်ိန္မွာ ႏွစ္ႀကိမ္သံုးလို႕ရတယ္ဆိုတာကိုျပတာပါ -

	php artisan foo --option=bar --option=baz

The `VALUE_NONE` option indicates that the option is simply used as a "switch":
`VALUE_NONE` ကဘာကိုေျပာတာလဲဆိုရင္ သင္႕ရဲ႕ option ကို "switch" အျဖစ္ရိုးရွင္းစြာ သံုးလို႕ရတယ္ဆိုတာကိုျပတာပါ -

	php artisan foo --option

### Retrieving Input

ဘာလို႕ သင္႕ရဲ႕ command က execute ျဖစ္တာလည္း၊ သင္ေသခ်ာေပါက္ arguments နဲ႕ options ေတြကို  application က accept လုပ္လိုက္ တဲ႕ values access လုပ္ဖို႕လိုပါမယ္ လို႕ပါမယ္ ဒါကိုလုပ္ဖို႕ဆိုရင္ သင္႕အေနနဲ႕ `argument` နဲ႕ `option` method  ေတြကိုသံုးဖို႕လိုပါလိမ္႕မယ္။

#### Retrieving The Value Of A Command Argument

	$value = $this->argument('name');

#### Retrieving All Arguments

	$arguments = $this->argument();

#### Retrieving The Value Of A Command Option

	$value = $this->option('name');

#### Retrieving All Options

	$options = $this->option();

### Writing Output

To send output to the console, you may use the `info`, `comment`, `question` and `error` methods. Each of these methods will use the appropriate ANSI colors for their purpose.

Console ဆီကို output send ဖို႕ရာအတြက္  သင္႕အေနနဲ႕  `info`, `comment`, `question` နဲ႕ `error` methods ေတြကိုအသံုးျပဳဖို႕လိုပါလိမ္႕မယ္။ ဒီ methods တစ္ခုခ်င္းဆီက သူတို႕ရည္ရြယ္ခ်က္နဲ႕သင္႕ေလ်ာ္တဲ႕ ANSI colors ေတြကို အသံုးျပဳပါလိမ္႕မယ္။

#### Sending Information To The Console

	$this->info('Display this on the screen');

#### Sending An Error Message To The Console

	$this->error('Something went wrong!');

### Asking Questions

user input prompt အတြက္ သင္႕အေနနဲ႕ `ask` နဲ႕ `confirm` methods ေတြကို အသံုးျပဳႏိုင္ပါတယ္ -

#### Asking The User For Input

	$name = $this->ask('What is your name?');

#### Asking The User For Secret Input

	$password = $this->secret('What is the password?');

#### Asking The User For Confirmation

	if ($this->confirm('Do you wish to continue? [yes|no]'))
	{
		//
	}

သင္႕အေနနဲ႕ default value ကိုု `confirm` method အျဖစ္ သတ္မွတ္ထားႏိုင္ပါတယ္၊ ဒါက `true` or `false` ျဖစ္သင္႕ပါတယ္:

	$this->confirm($question, true);

<a name="registering-commands"></a>
## Registering Commands

#### Registering An Artisan Command

သင္ရဲ႕ command ကၿပီးသြားၿပီ ဆိုရင္ သင္႕အေနနဲ႕ Artisan နဲ႕ register လုပ္ရပါမယ္ ဒါမွ အသံုးျပဳလို႕ရမွာပါ။ ဒါကိုလည္း ထံုးစံအတိုင္းဘဲ `app/start/artisan.php` file မွာ လုပ္ရမွာပါ။ ဒီ file ထဲမွာ command ကို register လုပ္ဖို႕ရာအတြက္ `Artisan::add` method ကို အသံုးျပဳသင္႕ပါတယ္ -

	Artisan::add(new CustomCommand);

#### Registering A Command That Is In The IoC Container

သင္႕ ရဲ႕ command က application ရဲ႕  [IoC container](/docs/ioc) ထဲမွာ Register လုပ္ထားတယ္ဆိုရင္... Arisan ကေနေခၚႏိုင္ေအာင္ သင္႕အေနဲ႕ `Artisan::resolve` method ကို အသံုးျပဳရပါ႕မယ္ - 

	Artisan::resolve('binding.name');

<a name="calling-other-commands"></a>
## Calling Other Commands

တစ္ခါတစ္ေလသင္႕ command ကေနအျခား command တစ္ခုခုကိုေခၚခ်င္မွာေပါ့... ဒါလည္းရပါတယ္  `call` method နဲ႕ေခၚလိုက္ရံုပါဘဲ -

	$this->call('command:name', array('argument' => 'foo', '--option' => 'bar'));
