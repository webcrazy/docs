# Laravel Cashier

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Subscribing To A Plan](#subscribing-to-a-plan)
- [No Card Up Front](#no-card-up-front)
- [Swapping Subscriptions](#swapping-subscriptions)
- [Subscription Quantity](#subscription-quantity)
- [Cancelling A Subscription](#cancelling-a-subscription)
- [Resuming A Subscription](#resuming-a-subscription)
- [Checking Subscription Status](#checking-subscription-status)
- [Handling Failed Payments](#handling-failed-payments)
- [Invoices](#invoices)

<a name="introduction"></a>
## Introduction

Laravel Cashier က Subscription Billing Service တစ္ခုျဖစ္တဲ့ Stripe သံုးတဲ့အခါ ပိုၿပီးလြယ္ကူေစေအာင္လို႔ လုပ္ေပးထားပါတယ္။ Stripe သံုးဖို႔အတြက္ အစအဆံုး ျပန္ေရးေနစရာမလိုေတာ့ေအာင္လို႔ အေျခခံ Code ေတြ ေရးထားၿပီးသားျဖစ္ပါတယ္။ အေျခခံ Subscription Management အျပင္ , Coupons, Subscription ကို Upgrade လုပ္တဲ့ Feature (Swap), Subscription Quantities, Subscription ကို သတ္မွတ္ထားတဲ့ ကာလအတြင္း Subscription ကို Cancel လုပ္လို႔ရမယ့္ Feature လည္းပါဝင္ပါတယ္။ ေနာက္ Invoice ကို PDF ထုတ္လို႔ရေအာင္လဲ ကူညီေပးပါတယ္။

<a name="configuration"></a>
## Configuration

#### Composer

ပထမဆံုး သင္႕ရဲ႕ Composer File မွာ Casher package ကိုထည္႕ေပးပါ၊

	"laravel/cashier": "~2.0"

#### Service Provider

ေနာက္... သင္ရဲ႕ `app` configuration file ထဲမွာ `Laravel\Cashier\CashierServiceProvider` ကို regiter လုပ္ပါ၊

#### Migration

Chashier ကိုမသံုးခင္မွာ... columns တစ္ခ်ိဳ႕ကို သင္႕ရဲ႕ database ထဲကို add လုပ္ဖို႕လိုပါမယ္။ မစိုးရိမ္ပါနဲ႕... လိုအပ္တဲ႕ column ေတြကိုထက္ထည္႕ဖို႕  `cashier:table` Artisan command ကိုသံုးႏိုင္ပါတယ္။

#### Model Setup

ေနာက္... သင္႕ရဲ႕ model definition မွာ BillableTrait နဲ႕ appropriate date mutators ေတြကို add လုိက္ပါ:

	use Laravel\Cashier\BillableTrait;
	use Laravel\Cashier\BillableInterface;

	class User extends Eloquent implements BillableInterface {

		use BillableTrait;

		protected $dates = ['trial_ends_at', 'subscription_ends_at'];

	}

#### Stripe Key

ေနာက္ဆံုးမွာေတာ႕ သင္႕ရဲ႕ Stripe key ကိုသင္႕ရဲ႕ bootstrap files တစ္ခုထဲမွာ set လုပ္လိုက္ပါ

	User::setStripeKey('stripe-key');

<a name="subscribing-to-a-plan"></a>
## Subscribing To A Plan

user ကို Stripe plan တစ္ခုေပးဖို႕ သင္႕မွာ model instance တစ္ခုရွိတယ္ဆိုရင္ လြယ္လြယ္ကူကူ subscribe လုပ္ႏိုင္ပါတယ္
	$user = User::find(1);

	$user->subscription('monthly')->create($creditCardToken);

subscription ကို create လုပ္ၿပီးသြားၿပီဆိုရင္ သင္႕အေနနဲ႕ cupon ကို apply လုပ္ဖို႕ `withCoupon` ကိုသံုးႏိုင္ပါတယ္

	$user->subscription('monthly')
	     ->withCoupon('code')
	     ->create($creditCardToken);

Stripe subscription ကို `subscription` method က automatically create လုပ္သြားလိမ္႕မယ္... သင္႕ရဲ႕ Strip customer ID နဲ႕ အျခား billing information နဲ႕ပတ္သတ္တဲ႕ database ေတြေကာ update လုပ္သြားပါလိမ္႕မယ္။

သင္႕မွာ trail period ရွိတယ္ဆိုရင္ သင္႕ရဲ႕ model မွာ trial end date ကို subscribing လုပ္ၿပီးမွာ set လုပ္ထားရဲ႕လားဆိုတာကိုေသခ်ာ make sure လုပ္ပါ။

	$user->trial_ends_at = Carbon::now()->addDays(14);

	$user->save();

<a name="no-card-up-front"></a>
## No Card Up Front
သင္႕ရဲ႕ application က ပထမဆံုး free-trial တစ္ခုကို credit-card မပါဘဲ လက္ခံမယ္ဆိုရင္ `cardUpFront` ကိုသင္႕ရဲ႕ modle မွာ `false` ဆိုၿပီး set လုပ္ပါ...

	protected $cardUpFront = false;

Account creation မွာ trial ေနာက္ဆံုးရက္ကို model မွာ set လုပ္ထားရဲ႕လားဆိုတာကို make sure လုပ္ပါ...

	$user->trial_ends_at = Carbon::now()->addDays(14);

	$user->save();

<a name="swapping-subscriptions"></a>
## Swapping Subscriptions

Subscription အသစ္တစ္ခုမွာ user တစ္ေယာက္ ကို swap လုပ္ခ်င္တယ္ဆိုရင္  `swap` method ကိုသံုးပါ...

	$user->subscription('premium')->swap();

တကယ္လို႕ user က trial မွာဘဲရွိေနတယ္ ဆိုရင္ trial က ပံုမွန္ maintained လုပ္သြားပါ႕မယ္။ ေနာက္ subscription အတြက္ "quantity" တစ္ခုရွိတယ္ဆိုရင္ အဲ႕ဒီ႕ quantity ကိုလည္း maintain လုပ္သြားပါ႕မယ္။

<a name="subscription-quantity"></a>
## Subscription Quantity

တစ္ခါတစ္ေလမွာ subscriptions ေတြက "quantity" ကေနၿပီးေတာ႕ affect ျဖစ္တယ္။ ဥပမာ... သင္႕ရဲ႕ application က user account တစ္ခုအတြက္ တစ္လ ကို $10 charge လုပ္တယ္ဆိုပါေတာ႕။ သင္႕ရဲ႕ subscription quantity ကို တိုးခ်င္တာဘဲျဖစ္ျဖစ္၊ ေလ်ာ႕ခ်င္တာဘဲျဖစ္ျဖစ္ လြယ္လြယ္ကူကူ လုပ္ခ်င္တယ္ဆိုရင္ `increment` နဲ႕ `decrement` methods ကိုသံုးႏိုင္ပါတယ္

	$user = User::find(1);

	$user->subscription()->increment();

	// Add five to the subscription's current quantity...
	$user->subscription()->increment(5)

	$user->subscription->decrement();

	// Subtract five to the subscription's current quantity...
	$user->subscription()->decrement(5)

<a name="cancelling-a-subscription"></a>
## Cancelling A Subscription

Subscription တစ္ခုကို Cancel လုပ္တာ ပန္ၿခံထဲမွာ လမ္းေလွ်ာက္ရသလိုပါဘဲ...

	$user->subscription()->cancel();

Subscription တစ္ခု cancel လုပ္သြားတဲ႕အခ်ိန္မွာ Casher က  `subscription_ends_at` column ကို သင္႕ရဲ႕ database မွာ အလိုလို set လုပ္သြားပါ႕မယ္။  ဥပမာ၊ customer က March လတစ္ရက္ေန႕မွာ subscription ကို Cancel လုပ္သြားတယ္ ေနာက္ March 5 ရက္ေန႕မွာ subscription end ျဖစ္မယ္လို႕ schedule လည္းမရွိဘူးဆိုရင္ `subscribed` method က March လ 5 ရက္ေန႕အထိ return `true` ျပန္ေနမွာပါ။

<a name="resuming-a-subscription"></a>
## Resuming A Subscription

User တစ္ေယာက္ကသူရဲ႕ subscription ကို cancelled လုပ္သြားတဲ႕အခ်ိန္မွာ သင္႕အေနနဲ႕ သူတို႕ resume ျပန္လုပ္ဖို႕ဆုေတာင္းေနမွာေပါ႕၊ ဒါဆိုရင္ `resume` method ကိုသံုးလိုက္ပါ:

	$user->subscription('monthly')->resume($creditCardToken);

တကယ္လို႕ user က subscription တစ္ခုကို cancels လုပ္လိုက္တယ္၊ ေနာက္ subscription က fully expired မျဖစ္ခင္မွာ user က resume ျပန္လုပ္လုိက္တယ္ဆိုရင္ သူတို႕က bill ေတြကိုခ်က္ခ်င္းမျဖတ္ပါဘူး။ သူတို႕ရဲ႕ subscription ေတြကို ရိုးရွင္းစြာပဲ re-activated လုပ္သြားပါတယ္ ေနာက္ သူတို႕ရဲ႕ မူလ    billing cycle အတိုင္း  billed လုပ္ပါလိမ္႕မယ္။

<a name="checking-subscription-status"></a>
## Checking Subscription Status

User တစ္ေယာက္က သင္႕ရဲ႕ application ကို subscribed လုပ္သြားတာကို verify လုပ္ရန္အတြက္ `subscribed` command: ကိုသံုးပါ-

	if ($user->subscribed())
	{
		//
	}

`subscribed` method က Route filter အတြက္ အေကာင္းဆံုး အသင္႕ေတာ္ဆံုး လုပ္ေဆာင္ေပးထားပါတယ္:


	Route::filter('subscribed', function()
	{
		if (Auth::user() && ! Auth::user()->subscribed())
		{
			return Redirect::to('billing');
		}
	});

သင့္အေနနဲ႕ user က trial ကာလမွာဟုတ္မဟုတ္ကို `onTrial` method ကိုအသံုးျပဳၿပီးေတာ႕ ဆံုးျဖတ္ေပးႏိုင္ပါတယ္:

	if ($user->onTrial())
	{
		//
	}

သင္႕အေနနဲ႕ user က active subscriber လား ဒါမွမဟုတ္ cancel လုပ္လုိက္ၿပီလားဆိုတာကို `cancelled` method ကိုသံုးၿပီးေတာ႕စစ္ႏိုင္ပါတယ္:


	if ($user->cancelled())
	{
		//
	}

သင္႕အေနနဲ႕ User ကသူ႕ရဲ႕ subscription ကို cancel လုပ္လိုက္ၿပီ ဒါေပမယ္႕ subscription ကလည္း fully expires မျဖစ္ေသးဘူး... တစ္နည္းအားျဖင့္ "grace period" လည္းမကုန္ေသးဘူးဆိုတာကို ဆံုးျဖတ္ႏိုင္ပါတယ္။ ဥပမာ၊ user က subscription ကို March လ 5 ရက္ေန႕မွာ cancel လုပ္လိုက္တယ္... တကယ္တမ္း scheduled မွာက March လ 10 ရက္ေန႕မွၿပီးမယ္ဆိုရင္ အဲ႕ဒီ႕ user က "grace period" မွာဘဲရွိေသးပါတယ္။ မွတ္ထားရမွာက `subscribed` method ကအဲ႕ဒီ႕အခ်ိန္မွာ `true` return ဘဲျပန္ေနဦးမွာပါ။

	if ($user->onGracePeriod())
	{
		//
	}

User က သင့္ application ရဲ႕ plan တစ္ခုကိုအၿမဲတမ္း subscribed လုပ္ၿပီးၿပီလား မလုပ္ရေသးဘူးလားဆိုတာကို `everSubscribed` method နဲ႕ စစ္ေဆးႏိုင္ပါတယ္:

	if ($user->everSubscribed())
	{
		//
	}

<a name="handling-failed-payments"></a>
## Handling Failed Payments

What if a customer's credit card expires? No worries - Cashier includes a Webhook controller that can easily cancel the customer's subscription for you. Just point a route to the controller:

	Route::post('stripe/webhook', 'Laravel\Cashier\WebhookController@handleWebhook');

That's it! Failed payments will be captured and handled by the controller. The controller will cancel the customer's subscription after three failed payment attempts. The `stripe/webhook` URI in this example is just for example. You will need to configure the URI in your Stripe settings.

If you have additional Stripe webhook events you would like to handle, simply extend the Webhook controller:

	class WebhookController extends Laravel\Cashier\WebhookController {

		public function handleWebhook()
		{
			// Handle other events...

			// Fallback to failed payment check...
			return parent::handleWebhook();
		}

	}

> **Note:** In addition to updating the subscription information in your database, the Webhook controller will also cancel the subscription via the Stripe API.

<a name="invoices"></a>
## Invoices

You can easily retrieve an array of a user's invoices using the `invoices` method:

	$invoices = $user->invoices();

When listing the invoices for the customer, you may use these helper methods to display the relevant invoice information:

	{{ $invoice->id }}

	{{ $invoice->dateString() }}

	{{ $invoice->dollars() }}

Use the `downloadInvoice` method to generate a PDF download of the invoice. Yes, it's really this easy:

	return $user->downloadInvoice($invoice->id, [
		'vendor'  => 'Your Company',
		'product' => 'Your Product',
	]);
