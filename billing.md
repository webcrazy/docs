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

Laravel Cashier provides an expressive, fluent interface to [Stripe's](https://stripe.com) subscription billing services. It handles almost all of the boilerplate subscription billing code you are dreading writing. In addition to basic subscription management, Cashier can handle coupons, swapping subscription, subscription "quantites", cancellation grace periods, and even generate invoice PDFs.

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

Subscription တစ္ခုကို Cancel လုပ္တာ ပန္ၿခံထဲမွာ လမ္းေလွ်ာက္သလိုပါဘဲ...

	$user->subscription()->cancel();

When a subscription is cancelled, Cashier will automatically set the `subscription_ends_at` column on your database. This column is used to know when the `subscribed` method should begin returning `false`. For example, if a customer cancels a subscription on March 1st, but the subscription was not scheduled to end until March 5th, the `subscribed` method will continue to return `true` until March 5th.

<a name="resuming-a-subscription"></a>
## Resuming A Subscription

If a user has cancelled their subscription and you wish to resume it, use the `resume` method:

	$user->subscription('monthly')->resume($creditCardToken);

If the user cancels a subscription and then resumes that subscription before the subscription has fully expired, they will not be billed immediately. Their subscription will simply be re-activated, and they will be billed on the original billing cycle.

<a name="checking-subscription-status"></a>
## Checking Subscription Status

To verify that a user is subscribed to your application, use the `subscribed` command:

	if ($user->subscribed())
	{
		//
	}

The `subscribed` method makes a great candidate for a route filter:

	Route::filter('subscribed', function()
	{
		if (Auth::user() && ! Auth::user()->subscribed())
		{
			return Redirect::to('billing');
		}
	});

You may also determine if the user is still within their trial period (if applicable) using the `onTrial` method:

	if ($user->onTrial())
	{
		//
	}

To determine if the user was once an active subscriber, but has cancelled their subscription, you may use the `cancelled` method:

	if ($user->cancelled())
	{
		//
	}

You may also determine if a user has cancelled their subscription, but are still on their "grace period" until the subscription fully expires. For example, if a user cancels a subscription on March 5th that was scheduled to end on March 10th, the user is on their "grace period" until March 10th. Note that the `subscribed` method still returns `true` during this time.

	if ($user->onGracePeriod())
	{
		//
	}

The `everSubscribed` method may be used to determine if the user has ever subscribed to a plan in your application:

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
