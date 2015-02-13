# HTTP Middleware

- [မိတ်ဆက်](#introduction)
- [Middleware တစ်ခု ဖန်တီးခြင်း](#defining-middleware)
- [Middleware တစ်ခု register လုပ်ခြင်း](#registering-middleware)
- [Terminable Middleware](#terminable-middleware)

<a name="introduction"></a>
## မိတ်ဆက်.

HTTP middleware တစ်ခုသည်　သင့်　application ထံ　ဝင်ရောက်လာသော　HTTP request　များအား　စိစစ်စီမံရာတွင်　အဆင်ပြေပြေ　အသုံးပြုနိုင်စေရန်　အထောက်အပံ့ပေးထားသည့်နည်းလမ်းတစ်ခု　ဖြစ်ပါသည်။ဥပမာ သင့်　application အားအသုံးပြုသူတစ်ယောက်ကို　authenticated ဖြစ်မဖြစ်　စိစစ်ပေးသည့်　middleware တစ်ခု　Laravel တွင်ပါရှိပါသည်။အကယ်၍　အသုံးပြုသူသည်　authenticate လုပ်ပြီးသားမဟုတ်ပါက　middleware မှ　အသုံးပြုသူအား　log in screen သို့　redirect လုပ်ပေးသွားမည်　ဖြစ်သည်။သို့သော်　user သည်　authenticate လုပ်ပြီးသားဖြစ်ပါက　middleware မှ　အဆိုပါ　request အား　သင့်　application အတွင်းထပ်မံခရီးဆက်ခွင့်　ပြုလိုက်မည်ဖြစ်သည်။

Authentication မှမဟုတ်ပါ၊　အခြားလုပ်ဆောင်ချက်အထွေထွေကိုလည်း　middleware တစ်ခုအဖြစ်　ဖန်တီးရေးသားနိုင်ပါသည်။ပမာဆိုရလျှင် CORS middleware တစ်ခုက　သင့်　application မှထွက်ခွာမည့်　response အားလုံးကို　သက်ဆိုင်ရာ　header များထည့်ပေးခြင်းအတွက်တာဝန်ယူနိုင်သလို　logging middleware တစ်ခုက　သင့်　application ထံဝင်ရောက်လာမည့်　request အားလုံးကို log ထုတ်ပေးရန်　တာဝန်ယူနိုင်ပါသည်။


Laravel framework　အတွင်းတွင်　maintenance, authentication, CSRF protection အစရှိဖြင့်　middleware များစွာထည့်သွင်းပေးထားပါသည်။　ထို　middleware အားလုံးသည်　`app/Http/Middleware` directoryတွင်　တည်ရှိပါသည်။

<a name="defining-middleware"></a>
##Middleware တစ်ခု ဖန်တီးခြင်း

To create a new middleware, use the `make:middleware` Artisan command:
middleware　တစ်ခုဖန်တီးရန်　`make:middleware`　Artisan commandကိုသုံးပါ။

php artisan make:middleware OldMiddleware

၎င်း command က OldMiddleware class အသစ်တစ်ခုကို　သင့်　`app/Http/Middleware`　directory အတွင်းတွင်　ဖန်တီးပေးမည်ဖြစ်သည်။　အဆိုပါ　middleware တွင်　ပေးပို့လာသော　အသက် `age` သည် 200 ထက်ကြီးမှသာ　လျှင်　route ကို　ပေး၀င်ပြီး　သို့မဟုတ်ပါက　အသုံးပြုသူများကို　မူလစာမျက်နှာသို့သာ　ပို့ဆောင်ပေးမည်ဆိုပါစို့။　　

<?php namespace App\Http\Middleware;

class OldMiddleware {

	/**
	* Run the request filter.
	*
	* @param  \Illuminate\Http\Request  $request
	* @param  \Closure  $next
	* @return mixed
	*/
	public function handle($request, Closure $next)
	{
		if ($request->input('age') < 200)
		{
			return redirect('home');
		}

		return $next($request);
	}

}

သင်မြင်သည့်အတိုင်း　အကယ်၍　ပေးထားသောအသက်`age`　သည်　 `200`　ထက်ငယ်ခဲ့ပါက middleware မှ　HTTP redirect ပြုလုပ်မည်ဖြစ်သည်။　သို့မဟုတ်ပါက　request သည်　application အတွင်း　ထပ်မံခရီးဆက်၀င်ရောက်နိုင်မည်ဖြစ်သည်။　ထိုသို့　ခရီးဆက်စေရန်　(တစ်နည်းအားဖြင့်　middleware ကို　ဖြတ်သန်းသွားလာနိုင်စေရန်)　`$next` callback အား　`$request` object　ဖြင့်ရိုးရှင်းစွာ　call လိုက်ရုံပင်ဖြစ်သည်။　


middleware များအား　HTTP request များ　သင့် application ထံမရောက်မီ　အဆင့်ဆင့်　ဖြတ်သန်းရသော　အလွှာအထပ်ထပ်　အဖြစ်မြင်ယောင်ကြည့်နိုင်ပါသည်။　အလွှာတစ်ခုချင်းစီက　request ကိုစိစစ်ပြီး　လိုအပ်လျှင်　ငြင်းပယ်ခြင်းကိုပါလုပ်ဆောင်နိုင်မည်ဖြစ်သည်။

<a name="registering-middleware"></a>
## Middleware တစ်ခု register လုပ်ခြင်း

### Global Middleware

အကယ်၍　သင်သည်　middleware　တစ်ခုအား　HTTP request　တိုင်းအတွက်　run စေချင်လျှင်　အဆိုပါ　middleware class အား `app/Http/Kernel.php`class　၏　`$middleware` property တွင်ထည့်သွင်းလိုက်ရုံပင်။　

### Middleware များအား　Route များဖြင့်　တွဲဖက်ခြင်း

အကယ်၍　သင်သည်　middleware　တစ်ခုအား　သီးသန့်　route တစ်ခုဖြင့်　တွဲဖက်ပေးချင်လျှင်　သင့်အနေနှင့်　ပထမဦးစွာ　ထို　middleware　အတွက်　`app/Http/Kernel.php` file တွင်　အတိုကောက်ကီးတစ်ခုအား သတ်မှတ်ပေးသင့်ပါသည်။ Default အားဖြင့်　အဆိုပါ　class ၏`$routeMiddleware`　property တွင်　Laravel　တွင်ထည့်သွင်းထားသော　middleware များပါ၀င်ပါသည်။　သင့်ကိုယ်ပိုင်　middleware ကိုထည့်သွင်းရန်　၎င်း list တွင်　append လုပ်၍　သင်နှစ်သက်ရာ　ကီးတစ်ခု　သတ်မှတ်ပေးရုံပင်　ဖြစ်သည်။　

middleware　အား　HTTP kernel　အတွင်းတွင်　သတ်မှတ်ပြီးသွားလျှင်　သင့်အနေဖြင့်　route options array တွင်　`middleware` key ကို　အသုံးပြုပြီး　တွဲဖက်ပေးနိုင်ပါပြီ။　　

Route::get('admin/profile', ['middleware' => 'auth', function()
{
	//
	}]);

	<a name="terminable-middleware"></a>
	## Terminable Middleware

	တစ်ခါတစ်ရံ　middleware　တစ်ခုအနေဖြင့် Browser ထံသို့　 HTTP response　ပြန်ပြီးခါမှ　အလုပ်လုပ်ရန်လိုအပ်တာမျိုးရှိတတ်သည်။　ဥပမာ　Laravel အတွင်း၌　ပါ၀င်သော　"session" middleware သည်　session data အား　 Browser ထံသို့　 HTTP response　ပြန်ပြီးခါမှ　storage သို့　ရေးသားခြင်းဖြစ်သည်။　ထိုသို့လုပ်ဆောင်နိုင်စေရန်　သင့်အနေဖြင့်　middleware တစ်ခုအား　"terminable"　အဖြစ်သတ်မှတ်နိုင်သည်။　　

	use Illuminate\Contracts\Routing\TerminableMiddleware;

	class StartSession implements TerminableMiddleware {

		public function handle($request, $next)
		{
			return $next($request);
		}

		public function terminate($request, $response)
		{
			// Store the session data...
		}

	}

	သင်မြင်နိုင်သည့်အတိုင်းပင်　`TerminableMiddleware`　၌　`handle` method တစ်ခုထပ်မံသတ်မှတ်ခြင်းအပြင် `terminate` method　ကိုပါ　သတ်မှတ်ပေးရသည်။　`TerminableMiddleware` တစ်ခု　သတ်မှတ်ပြီးလျှင်　သင့်အနေနှင့်　၎င်း　middleware အား　သင့်　HTTP kernel ၏　Global middleware စာရင်းအတွင်းသို့　ထည့်သွင်းပေးသင့်သည်။　　
	
