# Events

- [အသုံးပြု နည်း အခြေခံ](#basic-usage)
- [Wildcard Listener များ](#wildcard-listeners)
- [Class များအား Listener များ အဖြစ်အသုံးပြုခြင်း](#using-classes-as-listeners)
- [Queued လုပ်ထားသော event များ](#queued-events)
- [Event subscriber များ](#event-subscribers)

<a name="basic-usage"></a>
## အသုံးပြု နည်း အခြေခံ

Laravel ၏ `Event` class သည် ရိုးရှင်းသော observer pattern တည်ဆောက်မှုတစ်ခု ဖြစ်ပြီး event များ အား စောင့်ကြည့်ခြင်း၊ နားထောင်ခြင်းများ ပြု လုပ်နိုင်စေရန် စွမ်းဆောင်ပေးပါသည်။

#### Event တစ်ခုအားစောင့်ကြည့်ခြင်း
	Event::listen('auth.login', function($user)
	{
		$user->last_login = new DateTime;

		$user->save();
	});

#### Event တစ်ခု ဖြစ်ပွားစေခြင်း

	$event = Event::fire('auth.login', array($user));

#### Event များအား ဦးစားပေးအစီအစဉ်ဖြင့် စောင့်ကြည့်ခြင်း

သင်သည် Event များကို စောင့်ကြည့် ရာ၌ ဦးစားပေးအဆင့် သတ်မှတ်နိုင်ပါသည်။ ပိုမြင့်သော ဦးစားပေးအဆင့်ရှိသည့် event listener များက အရင်လုပ်ဆောင်မည်ဖြစ်ပြီး အကယ်၍ ဦးစားပေးအဆင့်ခြင်း တူခဲ့လျှင် စောင့်ကြည့်ရန်သတ်မှတ်ခဲ့သော အစီအစဉ်အတိုင်း လုပ်ဆောင်သွားမည်ဖြစ်ပါသည်။

	Event::listen('auth.login', 'LoginHandler', 10);

	Event::listen('auth.login', 'OtherHandler', 5);

#### Event တစ်ခုအား ဆက်လက် ဖြန့်ဝေမှုမှ ရပ်တန့်ခြင်း

တစ်ခါတစ်ရံ သင်သည် Event တစ်ခု၏ ဖြန့်ဝေမှု ကို အခြားသော listener များထံ မရောက်စေရန် ရပ်တန့်စေလိုခြင်းမျ ိ ုး ရှိနိုင်ပါသည်။ ထိုသို့ ရပ်တန့်စေရန် သင့် listener အား `false` ကို return ပြန်စေခြင်းဖြင့် ပြု လုပ်နိုင်ပါသည်။

	Event::listen('auth.login', function($event)
	{
		// Handle the event...

		return false;
	});

### Event များကို မှတ်ပုံတင်ရန်နေရာ

Event များကို မည်သို့ မှတ်ပုံတင်ရမည်ကိုတော့ သင် သိပေပြီ။ သို့သော် မည်သည့် နေရာတွင် ပြုလုပ်ရမည်နည်း ဟု သင်စဉ်းစားကောင်း စဉ်းစားနေလိမ့်မည်။ စိတ်မပူပါနှင့်။ ထိုမေးခွန်းသည် မေးနေကျ မေးခွန်းတစ်ခု ဖြစ်ပါသည်။ ကံမကောင်းထောက်မလှစွာပင် ထိုမေးခွန်းမှာ အဖြေရကျပ်သော မေးခွန်းတစ်ခု ဖြစ်ပါသည်။ အဘယ်ကြောင့်ဆိုသော် သင်သည် event တစ်ခုအား မည်သည့်နေရာတွင်မဆို မှတ်ပုံတင်နိုင်သောကြောင့် ဖြစ်ပါသည်။သင့် အတွက် သဲလွန်စတစ်ချိ  ု့ ပေးပါမည်။ အခြားသော framework ကို စက်နှိုးပေးသည့် ကုတ်များနှင့်အတူ သင့် event များအား `app/start/global.php` ဖိုင်ကဲ့သို့ သင့် `start` ဖိုင်များ အတွင်း မှတ်ပုံတင်နိုင်ပါသည်။

အကယ်၍ သင့် `start` ဖိုင်များ မှာ ပြွတ်သိပ် နေပါက `app/events.php` ကဲ့သို့ သတ်သတ် ဖိုင် တစ်ခုသတ်မှတ်၍ ယင်းဖိုင်အား သင့် `start` ဖိုင်အတွင်းတွင် ပါဝင်စေရန် ပြုလုပ်နိုင်ပါသည်။ ဤနည်းမှာ သင့် event မှတ်ပုံတင်ခြင်းများအား သင်၏ အခြားသော framework စက်နှိုးပေးသည့် ကုတ်များနှင့် သီးခြားစီ သပ်ရပ်စွာ ခွဲထုတ်နိုင်သော ရိုးရိုးရှင်းရှင်း နည်းလမ်းတစ်ခုပင် ဖြစ်ပါသည်။ အကယ်၍ သင် သည် class များတည်ဆောက် အသုံးပြု ရသည် ကို ပိုမို သဘောကျပါက သင့် event များအား  [service provider](ioc#service-providers.md) တစ်ခုအတွင်းတွင် မှတ်ပုံတင်နိုင်ပါသည်။ အဆိုပါနည်းအားလုံးအနက်မှ မည်သည့်နည်းကို မှ တရားသေ မှန်ကန်သည် ဟု မပြောနိုင်သည့်အတွက် သင့် application ၏ ပမာဏအပေါ် မူတည်ပြီး သင့် အတွက် အဆင်ပြေ နိုင်မည့် နည်းလမ်းတစ်ခုကို ရွေးချယ်နိုင်ပါသည်။

<a name="wildcard-listeners"></a>
## Wildcard Listener များ

#### Wildcard Event Listener များ မှတ်ပုံတင်ခြင်း

Event များကို မှတ်ပုံတင်ရာတွင် ခရေပွင့် စာလုံး`*` ကို အသုံးပြု ပြီး wilcard listener များ လည်း သတ်မှတ်နိုင်ပါသည်။

	Event::listen('foo.*', function($param)
	{
		// Handle the event...
	});

အထက်ပါ listener သည် `foo.` နှင့် အစပြု သော event အားလုံးကို စောင့်ကြည့်နားထောင်မည် ဖြစ်ပါသည်။

သင်သည် မည်သည့် event ဖြစ်ပွားခဲ့သည့်ကို `Event::firing` method ကို သုံး၍ ဆုံးဖြတ်နိုင်ပါသည်။

	Event::listen('foo.*', function($param)
	{
		if (Event::firing() == 'foo.bar')
		{
			//
		}
	});

<a name="using-classes-as-listeners"></a>
## Class များအား Listener များ အဖြစ်အသုံးပြုခြင်း
 
အချိ  ု့ နေရာများတွင် သင်သည် event တစ်ခုကို အသုံးပြု ထိန်းချ  ုပ်ရန် Closure တစ်ခု ထက် class တစ်ခုကို သုံးကောင်းသုံးလိုပါမည်။ Class event listener များသည်  [Laravel IoC container](ioc.md) ကို အသုံးပြု ၍ resolve လုပ်ခြင်းဖြစ်ရာ သင့် listener များ တွင် dependecy injection ကို စွမ်းအားပြည့် အသုံးပြုနိုင်စေပါသည်။

#### Class Listener တစ်ခု မှတ်ပုံတင်ခြင်း

	Event::listen('auth.login', 'LoginHandler');

#### Event Listner class တစ်ခု သတ်မှတ်ခြင်း

ပုံမှန်အားဖြင့် `LoginHandler` class ၏ `handle` method ကို အသုံးပြု ပါလိမ့်မည်။

	class LoginHandler {

		public function handle($data)
		{
			//
		}

	}

#### စောင့်ကြည့်မည့် method ကို သတ်မှတ်ခြင်း

အကယ်၍ သင်သည် ပုံမှန် `handle` method ကို မသုံးလိုပါက သင်သုံးလိုသည့် method ကို သတ်မှတ်နိုင်ပါသည်။

	Event::listen('auth.login', 'LoginHandler@onLogin');

<a name="queued-events"></a>
## Queued လုပ်ထားသော event များ

#### Queued လုပ်ထားသော event တစ်ခုအားမှတ်ပုံတင်ခြင်း

သင်သည် `queue` နှင့် `flush` method များကို အသုံးပြု ၍ event တစ်ခုကို ချက်ချင်းမဖြစ်ပွားစေပဲ queue လုပ်ထားနိုင်ပါသည်။

	Event::queue('foo', array($user));

#### Event Flusher တစ်ခု မှတ်ပုံတင်ခြင်း

	Event::flusher('foo', function($user)
	{
		//
	});

နောက်ဆုံးတွင် သင်သည် `flush` method ကို သုံး၍ သင်၏ queued လုပ်ထားသော event များ အား "flusher" သက်ဆိုင်ရာ "flusher" ကို run ၍ ရှင်းထုတ်နိုင်ပါသည်။

	Event::flush('foo');

<a name="event-subscribers"></a>
## Event subscriber များ

#### Event subscriber တစ်ခု သတ်မှတ်ခြင်း

Event subscriber များသည် မိမိ class အတွင်းထဲမှနေ၍ တစ်ခုထက်ပိုသော event များအား စောင့်ကြည့်သော class များ ပင်ဖြစ်ပါသည်။ Subscriber အားလုံးသည် `subscribe` method ကိုသတ်မှတ်ရမည်ဖြစ်ပြီး ယင်း method တွင် Event dispatcher instance တစ်ခု ကို parameter အဖြစ် ထည့်သွင်းရမည် ဖြစ်ပါသည်။

	class UserEventHandler {

		/**
		 * Handle user login events.
		 */
		public function onUserLogin($event)
		{
			//
		}

		/**
		 * Handle user logout events.
		 */
		public function onUserLogout($event)
		{
			//
		}

		/**
		 * Register the listeners for the subscriber.
		 *
		 * @param  Illuminate\Events\Dispatcher  $events
		 * @return array
		 */
		public function subscribe($events)
		{
			$events->listen('auth.login', 'UserEventHandler@onUserLogin');

			$events->listen('auth.logout', 'UserEventHandler@onUserLogout');
		}

	}

#### Event Subscriber တစ်ခု မှတ်ပုံတင်ခြင်း

Subscriber အား သတ်မှတ်ပြီးပြီ ဆိုသည်နှင့် ၎င်းအား `Event` class ကို အသုံးပြု ၍ မှတ်ပုံတင်နိုင်ပါပြီ။

	$subscriber = new UserEventHandler;

	Event::subscribe($subscriber);

သင်သည် [Laravel IoC container](ioc.md) ကို သုံး၍ လည်း သင့် subscriber အား resolve လုပ်နိုင်ပါသည်။ ထိုသို့ လုပ်နိုင်ရန် သင့် subscriber ၏ နာမည်အား `subscribe` method အတွင်း ထည့်သွင်းပေးရပါမည်။

	Event::subscribe('UserEventHandler');


