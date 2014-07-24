# Events

- [အသုံးျပု နည္း အေျခခံ](#basic-usage)
- [Wildcard Listener မ်ား](#wildcard-listeners)
- [Class မ်ားအား Listener မ်ား အျဖစ္အသုံးျပုျခင္း](#using-classes-as-listeners)
- [Queued လုပ္ထားေသာ event မ်ား](#queued-events)
- [Event subscriber မ်ား](#event-subscribers)

<a name="basic-usage"></a>
## အသုံးျပု နည္း အေျခခံ

Laravel ၏ `Event` class သည္ ရုိးရွင္းေသာ observer pattern တည္ေဆာက္မွုတစ္ခု ျဖစ္ျပီး event မ်ား အား ေစာင့္ျကည့္ျခင္း၊ နားေထာင္ျခင္းမ်ား ျပု လုပ္နုိင္ေစရန္ စြမ္းေဆာင္ေပးပါသည္။

#### Event တစ္ခုအားေစာင့္ျကည့္ျခင္း
	Event::listen('auth.login', function($user)
	{
		$user->last_login = new DateTime;

		$user->save();
	});

#### Event တစ္ခု ျဖစ္ပြားေစျခင္း

	$event = Event::fire('auth.login', array($user));

#### Event မ်ားအား ဦးစားေပးအစီအစဥ္ျဖင့္ ေစာင့္ျကည့္ျခင္း

သင္သည္ Event မ်ားကုိ ေစာင့္ျကည့္ ရာ၌ ဦးစားေပးအဆင့္ သတ္မွတ္နုိင္ပါသည္။ ပုိျမင့္ေသာ ဦးစားေပးအဆင့္ရွိသည့္ event listener မ်ားက အရင္လုပ္ေဆာင္မည္ျဖစ္ျပီး အကယ္၍ ဦးစားေပးအဆင့္ျခင္း တူခဲ့လ်ွင္ ေစာင့္ျကည့္ရန္သတ္မွတ္ခဲ့ေသာ အစီအစဥ္အတုိင္း လုပ္ေဆာင္သြားမည္ျဖစ္ပါသည္။

	Event::listen('auth.login', 'LoginHandler', 10);

	Event::listen('auth.login', 'OtherHandler', 5);

#### Event တစ္ခုအား ဆက္လက္ ျဖန့္ေ၀မွုမွ ရပ္တန့္ျခင္း

တစ္ခါတစ္ရံ သင္သည္ Event တစ္ခု၏ ျဖန့္ေ၀မွု ကုိ အျခားေသာ listener မ်ားထံ မေရာက္ေစရန္ ရပ္တန့္ေစလုိျခင္းမ် ိ ုး ရွိနုိင္ပါသည္။ ထုိသုိ့ ရပ္တန့္ေစရန္ သင့္ listener အား `false` ကုိ return ျပန္ေစျခင္းျဖင့္ ျပု လုပ္နုိင္ပါသည္။

	Event::listen('auth.login', function($event)
	{
		// Handle the event...

		return false;
	});

### Event မ်ားကုိ မွတ္ပုံတင္ရန္ေနရာ

Event မ်ားကုိ မည္သုိ့ မွတ္ပုံတင္ရမည္ကုိေတာ့ သင္ သိေပျပီ။ သုိ့ေသာ္ မည္သည့္ ေနရာတြင္ ျပုလုပ္ရမည္နည္း ဟု သင္စဥ္းစားေကာင္း စဥ္းစားေနလိမ့္မည္။ စိတ္မပူပါနွင့္။ ထုိေမးခြန္းသည္ ေမးေနက် ေမးခြန္းတစ္ခု ျဖစ္ပါသည္။ ကံမေကာင္းေထာက္မလွစြာပင္ ထုိေမးခြန္းမွာ အေျဖရက်ပ္ေသာ ေမးခြန္းတစ္ခု ျဖစ္ပါသည္။ အဘယ္ေျကာင့္ဆုိေသာ္ သင္သည္ event တစ္ခုအား မည္သည့္ေနရာတြင္မဆို မွတ္ပုံတင္နုိင္ေသာေျကာင့္ ျဖစ္ပါသည္။သင့္ အတြက္ သဲလြန္စတစ္ခ်ိ  ု့ ေပးပါမည္။ အျခားေသာ framework ကုိ စက္နွုိးေပးသည့္ ကုတ္မ်ားနွင့္အတူ သင့္ event မ်ားအား `app/start/global.php` ဖုိင္ကဲ့သုိ့ သင့္ `start` ဖုိင္မ်ား အတြင္း မွတ္ပုံတင္နုိင္ပါသည္။

အကယ္၍ သင့္ `start` ဖုိင္မ်ား မွာ ျပြတ္သိပ္ ေနပါက `app/events.php` ကဲ့သုိ့ သတ္သတ္ ဖုိင္ တစ္ခုသတ္မွတ္၍ ယင္းဖုိင္အား သင့္ `start` ဖုိင္အတြင္းတြင္ ပါ၀င္ေစရန္ ျပုလုပ္နုိင္ပါသည္။ ဤနည္းမွာ သင့္ event မွတ္ပုံတင္ျခင္းမ်ားအား သင္၏ အျခားေသာ framework စက္နွုိးေပးသည့္ ကုတ္မ်ားနွင့္ သီးျခားစီ သပ္ရပ္စြာ ခြဲထုတ္နုိင္ေသာ ရုိးရုိးရွင္းရွင္း နည္းလမ္းတစ္ခုပင္ ျဖစ္ပါသည္။ အကယ္၍ သင္ သည္ class မ်ားတည္ေဆာက္ အသုံးျပု ရသည္ ကုိ ပုိမုိ သေဘာက်ပါက သင့္ event မ်ားအား  [service provider](ioc#service-providers.md) တစ္ခုအတြင္းတြင္ မွတ္ပုံတင္နုိင္ပါသည္။ အဆုိပါနည္းအားလုံးအနက္မွ မည္သည့္နည္းကုိ မွ တရားေသ မွန္ကန္သည္ ဟု မေျပာနုိင္သည့္အတြက္ သင့္ application ၏ ပမာဏအေပါ္ မူတည္ျပီး သင့္ အတြက္ အဆင္ေျပ နုိင္မည့္ နည္းလမ္းတစ္ခုကုိ ေရြးခ်ယ္နုိင္ပါသည္။

<a name="wildcard-listeners"></a>
## Wildcard Listener မ်ား

#### Wildcard Event Listener မ်ား မွတ္ပုံတင္ျခင္း

Event မ်ားကုိ မွတ္ပုံတင္ရာတြင္ ခေရပြင့္ စာလုံး`*` ကုိ အသုံးျပု ျပီး wilcard listener မ်ား လည္း သတ္မွတ္နုိင္ပါသည္။

	Event::listen('foo.*', function($param)
	{
		// Handle the event...
	});

အထက္ပါ listener သည္ `foo.` နွင့္ အစျပု ေသာ event အားလုံးကုိ ေစာင့္ျကည့္နားေထာင္မည္ ျဖစ္ပါသည္။

သင္သည္ မည္သည့္ event ျဖစ္ပြားခဲ့သည့္ကုိ `Event::firing` method ကုိ သုံး၍ ဆုံးျဖတ္နုိင္ပါသည္။

	Event::listen('foo.*', function($param)
	{
		if (Event::firing() == 'foo.bar')
		{
			//
		}
	});

<a name="using-classes-as-listeners"></a>
## Class မ်ားအား Listener မ်ား အျဖစ္အသုံးျပုျခင္း
 
အခ်ိ  ု့ ေနရာမ်ားတြင္ သင္သည္ event တစ္ခုကို အသုံးျပု ထိန္းခ်  ုပ္ရန္ Closure တစ္ခု ထက္ class တစ္ခုကုိ သုံးေကာင္းသုံးလုိပါမည္။ Class event listener မ်ားသည္  [Laravel IoC container](ioc.md) ကုိ အသုံးျပု ၍ resolve လုပ္ျခင္းျဖစ္ရာ သင့္ listener မ်ား တြင္ dependecy injection ကုိ စြမ္းအားျပည့္ အသုံးျပုနုိင္ေစပါသည္။

#### Class Listener တစ္ခု မွတ္ပုံတင္ျခင္း

	Event::listen('auth.login', 'LoginHandler');

#### Event Listner class တစ္ခု သတ္မွတ္ျခင္း

ပုံမွန္အားျဖင့္ `LoginHandler` class ၏ `handle` method ကုိ အသုံးျပု ပါလိမ့္မည္။

	class LoginHandler {

		public function handle($data)
		{
			//
		}

	}

#### ေစာင့္ျကည့္မည့္ method ကုိ သတ္မွတ္ျခင္း

အကယ္၍ သင္သည္ ပုံမွန္ `handle` method ကုိ မသုံးလုိပါက သင္သုံးလုိသည့္ method ကုိ သတ္မွတ္နုိင္ပါသည္။

	Event::listen('auth.login', 'LoginHandler@onLogin');

<a name="queued-events"></a>
## Queued လုပ္ထားေသာ event မ်ား

#### Queued လုပ္ထားေသာ event တစ္ခုအားမွတ္ပုံတင္ျခင္း

သင္သည္ `queue` နွင့္ `flush` method မ်ားကုိ အသုံးျပု ၍ event တစ္ခုကုိ ခ်က္ခ်င္းမျဖစ္ပြားေစပဲ queue လုပ္ထားနုိင္ပါသည္။

	Event::queue('foo', array($user));

#### Event Flusher တစ္ခု မွတ္ပုံတင္ျခင္း

	Event::flusher('foo', function($user)
	{
		//
	});

ေနာက္ဆုံးတြင္ သင္သည္ `flush` method ကုိ သုံး၍ သင္၏ queued လုပ္ထားေသာ event မ်ား အား "flusher" သက္ဆုိင္ရာ "flusher" ကုိ run ၍ ရွင္းထုတ္နုိင္ပါသည္။

	Event::flush('foo');

<a name="event-subscribers"></a>
## Event subscriber မ်ား

#### Event subscriber တစ္ခု သတ္မွတ္ျခင္း

Event subscriber မ်ားသည္ မိမိ class အတြင္းထဲမွေန၍ တစ္ခုထက္ပုိေသာ event မ်ားအား ေစာင့္ျကည့္ေသာ class မ်ား ပင္ျဖစ္ပါသည္။ Subscriber အားလုံးသည္ `subscribe` method ကုိသတ္မွတ္ရမည္ျဖစ္ျပီး ယင္း method တြင္ Event dispatcher instance တစ္ခု ကုိ parameter အျဖစ္ ထည့္သြင္းရမည္ ျဖစ္ပါသည္။

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

#### Event Subscriber တစ္ခု မွတ္ပုံတင္ျခင္း

Subscriber အား သတ္မွတ္ျပီးျပီ ဆုိသည္နွင့္ ၎အား `Event` class ကုိ အသုံးျပု ၍ မွတ္ပုံတင္နုိင္ပါျပီ။

	$subscriber = new UserEventHandler;

	Event::subscribe($subscriber);

သင္သည္ [Laravel IoC container](ioc.md) ကုိ သုံး၍ လည္း သင့္ subscriber အား resolve လုပ္နုိင္ပါသည္။ ထုိသုိ့ လုပ္နုိင္ရန္ သင့္ subscriber ၏ နာမည္အား `subscribe` method အတြင္း ထည့္သြင္းေပးရပါမည္။

	Event::subscribe('UserEventHandler');


