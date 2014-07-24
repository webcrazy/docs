# Version မြင့်တင်ခြင်း

- [version 4.1 မှ 4.2 သို့ မြင့်တင်ခြင်း](#upgrade-4.2)
- [version 4.1.x မှ 4.1.29 သို့ မြင့်တင်ခြင်း](#upgrade-4.1.29)
- [version 4.1.25 မှ 4.1.26 သို့ မြင့်တင်ခြင်း](#upgrade-4.1.26)
- [version 4.0 မှ 4.1 သို့ မြင့်တင်ခြင်း](#upgrade-4.1)

<a name="upgrade-4.2"></a>
## version 4.1 မှ 4.2 သို့ မြင့်တင်ခြင်း

### PHP 5.4+

Laravel 4.2 ကို သုံးပြုဖို့အတွက် php version 5.4.0 နှင့် အထက်မှာ ဖြစ်ရပါမယ်။

### Encryption Defaults

'app/config/app.php' ထဲတွင် 'cipher'(စကားဝှက်ရေးနည်း) အသစ်ထည့်ပါ။ စကားဝှက်ရေးနည်းအတွက် value ကိုတော့ `MCRYPT_RIJNDAEL_256' ထည့်ပေးပါမယ်။

	'cipher' => MCRYPT_RIJNDAEL_256

အခုထည့်လိုက်တဲ့ စကားဝှက်ရေးနည်းက laravel ရဲ့ စကားဝှက်တွေ ထုတ်တဲ့အခါကျရင် သုံးပြုသွားပါလိမ့်မယ်။

### ယာယီဖျက်သိမ်းတဲ့ model တွေအတွက် Traits ကိုသုံးပြုနိုင်ပါပြီ

ယာယီဖျက်သိမ်းနိုင်တဲ့ models တွေရေးပြီးဆိုရင် ဟိုအရင်တုန်းက 'SoftDeltes' ဆိုတဲ့ function သုံးခဲ့ပါတယ်။ အခုဆိုရင်တော့ 'SoftDeleteingTrait' ဆိုတဲ့ function ကို အောက်ကပုံစံအတိုင်းသုံးပြုရပါမယ်။

	use Illuminate\Database\Eloquent\SoftDeletingTrait;

	class User extends Eloquent {
		use SoftDeletingTrait;
	}

ဒီလိုမျိုးသုံးလိုက်ပြီဆိုရင်တော့ 'deleted_at' column ကို 'dataes'မှာ အောက်ကပုံစံအတိုင်းထည့်ပေးသင့်ပါတယ်။

	class User extends Eloquent {
		use SoftDeletingTrait;

		protected $dates = ['deleted_at'];
	}

Soft delete လုပ်လုပ်ဖို့အတွက် API တွေမှာလဲ အပေါ်က နည်းအတိုင်းသာ သုံးပြုရမှာဖြစ်ပါသည်။

### View / Pagination အတွက် Enviornment ရဲ့ နာမည်တွေ ပြောင်းလိုက်ပြီ
တကယ်လို့ `Illuminate\View\Environment` class သို ့မဟုတ် `Illuminate\Pagination\Environment`တွေသုံးခဲ့တယ်ဆိုရင်တော့ အဲဒီနှစ်ခုနေရာမှာ `Illuminate\View\Factory` နဲ့ `Illuminate\Pagination\Factory ကို အစားထိုးထည့်သုံးရပါလိမ့်မယ်။အခုလိုမျိုး နာမည်ပြောင်းလိုက်တာက သူ ့တို့ရဲ့  function နဲ့ ပိုမိုထိရောက်သော နာမည်တွေဖြစ်သွားအောင်ဖြစ်ပါတယ်။

### Pagination class မှာ parameter အသစ်ထည့်ခြင်း

တကယ်လို ့`Illuminate\Pagination\Presenter`class ကို ထပ်ချဲ့ ပြီးအသုံးပြုခဲ့ရင်တော့ အရင်သုံးခဲ့တဲ့ `getPageLinkWrapper` ဆိုတဲ့ abstract method မှာ 'rel' ဆိုတဲ့ parameter လေးကို  အောက်ကပုံစံအတိုင်းထပ်ထည့်ပေးရပါတယ်။

	abstract public function getPageLinkWrapper($url, $page, $rel = null);

<a name="upgrade-4.1.29"></a>
## version 4.1.x မှ 4.1.29 သို့ မြင့်တင်ခြင်း

Laravel 4.1.29 မှာတော့ lavael မှာသုံးပြုထားတဲ့ database drivers တွေရဲ့  columnကိုးကားတွေမူ တွေကို မြင့်တင်ပေးထားတာဖြစ်ပါတယ်။ အဲဒီလိုလုပ်လိုက်တဲ့အတွက် model ထဲမှာ 'filable' property တွေ မသတ်မှတ်ထားတဲ့အခါမှာ mass assignment အတွက်ဖြင့်ပေါ်လာမည့် လုံးခြံရေးဆိုင်ရာယိုပေါက်တွေကို ကာကွယ်ပေးသွားပါလိမ့်မည်။အဲဒါအခါကျရင် 
ကိုယ့်ရဲ့  application က အတိုင်းတာတခုထိတော့ လုံခြုံရေးကောင်းသွားမှာပါ။ဘယ်လိုပဲဖြစ်ဖြစ် 'guarded'သုံးပြုထားပြီး user ဘက်က လာတဲ့ data passing(ဥပမာ update/save) ပိုင်းပါလာရင်တော့ ကိုယ့်ရဲ့ application မှာ  mass assignment ကြောင့် ဖြစ်လာနိုင်တဲ့ပြသနာတွေကို ကာကွယ်ဖို ့အတွက် version 4.1.28 သို ့ ချက်ခြင်းပဲမြင့်တင်သင့်ပါတယ်။

Laravel 4.1.28 ကို မြင့်တင်ဖို့ ကတော့ terminal မှ တစ်ဆင့် 'composer update' လေးလုပ်လိုက်ရုံဖြင့် မြင့်တင်လို့ရပါတယ်။ 

<a name="upgrade-4.1.26"></a>
## version 4.1.25 မှ 4.1.26 သို့ မြင့်တင်ခြင်း

Laravel 4.1.26 ကတော့ 'remember me' cookies အတွက် security အတွက် ထုတ်ပေးထားတဲ့ version ဖြစ်ပါတယ်။အရင်တုန်းကဆိုရင် user browserမှတဆင့် remember cookie ကို တိုက်ခိုက်သူတယောက်ယောက်ရသွားပြီဆိုရင် user က အကောင့်ရဲ့  password ပြောင်းတာသို ့မဟုတ် logged ou ပြုလုပ်ခဲ့ရင်တောင်မှ အဲဒီ cookie ရဲ့ သက်တမ်းတခုထိကို တိုက်ခိုက်သူက သုံးပြုနိုင်မှာဖြစ်ပါတယ်။

အဲဒီကာကွယ်မူအတွက် 'remember_token' ဆိုတဲ့ column ကို 'users' table မှာထည့်ပေးရပါတယ်။အဲဒီလိုထည့်လိုက်ပြီဆိုရင်တော့ user login ပြုလုပ်တိုင်း ဝင်လိုက်တဲ့ account အတွက် token အသစ်တွေထုတ်ပေးသွားပါလိမ့်မယ်။ User က logs out လုပ်လိုက်ရင်လဲ token အသစ်ထုတ်ပေးသွားပါလိမ့်မယ်။အခုလိုမျိုး ပြုလုပ်လိုက်တဲ့အတွက် user ရဲ့  cookie ပါသွားရင်တောင်မှ အကောင့်ကို logs out လိုက်ရုံဖြင့် တိုက်ခိုက်သူရထားတဲ့ cookie က အလုပ်လုပ်မှာမဟုတ်တော့ပါဘူး။

### Upgrade Path

ပထမဆုံး 'remember_token'(VARCHAR(100), TEXT,) ကို 'users' tale ထဲကိုထည့်ပေးပါ။

ပြီးရင်တော့ သင်က Eloquent ရဲ ့authentication driver သုံးပြုတယ်ဆိုရင်တော့ အောက်ကပုံစံအတိုင်း 'User' class ကို ပြင်ပေးဖို့လိုပါတယ်။

	public function getRememberToken()
	{
		return $this->remember_token;
	}

	public function setRememberToken($value)
	{
		$this->remember_token = $value;
	}

	public function getRememberTokenName()
	{
		return 'remember_token';
	}

> **မှတ်ချက်** အပေါ်ကလိုမျိုး "remember token" ထည့်လိုက်ပြီဆိုရင်တော့ လက်ရှိအလုပ်လုပ်နေတဲ့ 'remember me' sessions တွေအားလုံးအလုပ်လုပ်မှာမဟုတ်တော့ပါဘူး။ ဒါကြောင့် useraccount အကောင့်တွေ အကုန်လုံး login ပြန်လုပ်ပေးဖို ့လိုအပ်ပါတယ်။

### Package Maintainers

`Illuminate\Auth\UserProviderInterface` interface ကို ညွန်ကြားချက်(method)နှစ်ခုထည့်ပေးဖို့လိုပါတယ်။သာမန်သုံးပြုပုံတွေကိုတော့ default drivers တွေမှာတွေ့နိုင်ပါတယ်။

	public function retrieveByToken($identifier, $token);

	public function updateRememberToken(UserInterface $user, $token);

`Illuminate\Auth\UserInterface` မှာလဲ "upgrade path' မှာဖော်ပြထားတဲ့ method သုံးခုကို လက်ခံရရှိမှာဖြစ်ပါတယ်။

<a name="upgrade-4.1"></a>
## version 4.0 မှ 4.1 သို့ မြင့်တင်ခြင်း

### Upgrading Your Composer Dependency

laravel 4.1 ကိုမြင့်တင်ဖို့အတွက် 'composer.json' ဖိုင်ထဲက'larave/framework' version ကို '4.1.*' ပြောင်းပေးရပါမယ်။

### Replacing Files

'public/index.php' ဖိုင်ကို [ဒီလင့်မှာသွားကြည့်ပြီးအကုန်ကူးထည့်ပါ။](https://github.com/laravel/laravel/blob/master/public/index.php).

'artisan' ဖိုင်ကိုလဲ [ဒီလင့်မှာသွားကြည့်ပြီးကူးထည့်ပါ။](https://github.com/laravel/laravel/blob/master/artisan).


### Adding Configuration Files & Options

'app/config/app.php' ထဲက 'aliases' နဲ့ 'providers'ကို update လုပ်ပေးဖို့လဲလိုပါတယ်။ update ပြုလုပ်ဖို့အတွက် [ဒီလင့်မှာသွားကြည့်ပြီးကူးထည့်ပါ။](https://github.com/laravel/laravel/blob/master/app/config/app.php). သတိတစ်ခုထားရမှာက အရင် app.php ထဲက provider နဲ့ alias တွေကို ပြန်ထည့်ဖို့ မမေ့ဖို့ပါ။

'app/config' ထဲမှာ remote.php ဆိုတဲ့ဖိုင်တစ်ခုဆောက်ပါ။ပြီးရင် [ဒီလင့်မှာ](https://github.com/laravel/laravel/blob/master/app/config/remote.php) သွားကြည့်ပြီး အကုန်ကူးထည့်ပါ။

ပြီးရင်တော့ 'app/config/session.php' ထဲမှာ 'expire_on_close' ဆိုတဲ့ key တစ်ခုထည့်ပါ။ သူ ့ရဲ့ value ကိုတော့ 'false' ပဲပေးထားပါ။

နောက်တစ်ခုကတော့ 'app/config/queue.php' ထဲမှာ 'failed' ဆိုတဲ့ key နဲ့ value ကို အောက်ကပုံစံအတိုင်းထည့်ပါ။

	'failed' => array(
		'database' => 'mysql', 'table' => 'failed_jobs',
	),

နောက်တစ်ခုအနေနဲ့ 'app/config/view.php' ထဲက 'pagination' ရဲ့  value ကို `pagination::slider-3` သို ့ပြောင်းထည့်ပါ။

### Controller Updates

တကယ်လို့ 'app./controllers/BaseController.php' ထဲမှာ 'use' သုံးပြုထားရင်တော့ `use Illuminate\Routing\Controllers\Controller;` ကို `use Illuminate\Routing\Controller;`သို ့ပြောင်းပေးရပါမယ်။

### Password Reminders Updates
Password reminders အတွက်ကတော့ ပိုပြီး ဆင်ပြေလွယ်ကူဖို့အတွက် ပြန်ဆင်ပေးထားပါတယ်။ 'php artisan auth:reminders-controller' ဆိုတဲ့ Artisan command သုံးပြီး စမ်းသပ်နိုင်ပါတယ်။ laravel ရဲ့  documentation ကိုလဲ [ဒီမှာ](/docs/security#password-reminders-and-reset)သွားလေ့လာပြီး ကိုယ့်application ကို လိုအပ်သလို ထပ်ထည့်နိုင်ပါတယ်။

'app/lang/en' ထဲက reminders.php ဖိုင်ကိုလဲ  [ဒီလင့်မှာ](https://github.com/laravel/laravel/blob/master/app/lang/en/reminders.php) သွားဖတ်ပြီး ပြင်ထည့်လိုက်ပါ။


### Environment Detection Updates

Application ရဲ ့လုံခြံုရေးပိုင်းဆိုင်ရာအတွက် URL domains သုံးပြုပြီး application enviornment စစ်ဆေးခြင်းကို ရပ်ဆိုင်းလိုက်ပါတယ်။အဲဒီလိုသုံးပြုချင်းက တိုက်ခိုက်သူတွေအတွက် request ရဲ ့ enviornment ကိုပြောင်းလဲနိုင်ခြင်း သို ့မဟုတ် အလွယ်တကူ ပြောင်းလဲနိုင်ခြင်းကြောင့် ရပ်ဆိုင်းရခြင်းဖြစ်ပါတယ်။ enviornment စစ်ဆေးခြင်းအတွက် user သုံးပြုနေတဲ့ စက်ရဲ ့hostnameကိုသုံးပြု ပြီးစစ်ဆေးသင့်ပါတယ်။ ( MAC, Linux, Windows တွေမှာ 'hostname' command သုံးပြုပါတယ်)


### Simpler Log Files

Laravek မှာ 'app/storage/logs/laravel.log' ထဲမှာ log ဖိုင်တွေထုတ်ပေးပါတယ်။ဘယ်လိုပဲဖြစ်ဖြစ် 'app/start' ထဲက 'global.php' ထဲမှာ လိုအပ်တဲ့ နေရာကိုပြောင်းလဲသုံးပြုနိုင်ပါသည်။

### Removing Redirect Trailing Slash

'bootstrap/start.php' ထဲမှာ `$app->redirectIfTrailingSlash()' ဆိုတဲ့ method ကို ဖြုတ်ပစ်လိုက်ပါ။ အဲဒီအဆင့်က ဒီ ဗားရှင်းမှာ မလိုအပ်တော့ပါဘူး။ ဘာလို့လဲဆိုတော့ သူ့အလုပ်လုပ်တဲ့ အတိုင်းတာကို .htaccess က အလုပ်လုပ်ပေးသွားလို့ဖြစ်ပါတယ်။

ပြီးရင်တော့ 'public' ဖိုဒါထဲက .htaccess ထဲက စာတွေအကုန်ဖျက်ပြီး [ဒီလင့်](https://github.com/laravel/laravel/blob/master/public/.htaccess)ကစာတွေ ပြန်ကူးထည့်ပြီး သိမ်းပါ။

### Current Route Access

The current route ကို သုံးပြုဖို့အတွက် အရင်ကဆိုရင် `Route::getCurrentRoute()` သုံးပြုပေမယ့်နေရာမှာ ဒီဗားရှင်းမှာတော့ `Route::current()` ကို သုံးပြု ရပါတယ်။

### Composer Update

အားလုံးပြီးသွားရင်တော့ 'composer update' ကွန်မန်းကို run လိုက်လို ့ရပါပြီ။ တကယ်လို ့error တစ်ခုခုပြရင်တော့ `composer update --no-scripts` ကို သုံးပြီး update ပြုလုပ်ရင် ဆင်ပြေသွားပါပြီ။

### Wildcard Event Listeners

The Wilecard event listenets က တော့ ဒီဗားရှင်းမှာ event handler functions parametersတွေ နဲ့ တွဲဖက်အလုပ်မလုပ်တော့ပါဘူး။တကယ်လို ့ဖျက်သိမ်းသွားတဲ့ eventsတွေဖမ်းချင်ရင်တော့ `Event::firing()` ကိုသုံးပြီး ဖမ်းနိုင်ပါတယ်။
