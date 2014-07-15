# Unit Testing

- [Introduction](#introduction)
- [Defining & Running Tests](#defining-and-running-tests)
- [Test Environment](#test-environment)
- [Calling Routes From Tests](#calling-routes-from-tests)
- [Mocking Facades](#mocking-facades)
- [Framework Assertions](#framework-assertions)
- [Helper Methods](#helper-methods)
- [Refreshing The Application](#refreshing-the-application)

<a name="introduction"></a>
## Introduction

Laravel ဟာ unit testing ကို အဓိကအေျခခံထားၿပီး တည္ေဆာက္ထားတာ ျဖစ္ပါတယ္။ ဒါ့အျပင္ testing framework ျဖစ္တဲ့ PHPUnit support လည္း ပါဝင္ပါတဲ့အတြက္ application ကို စ setup လုပ္ကတည္းက `phpunit.xml` ဖိုင္ကို တစ္ခါတည္း setup လုပ္ေပးထားမွာ ျဖစ္ပါတယ္။ PHPUnit အျပင္ Laravel မွာ Symfony ရဲ႕ HttpKernel, DomCrawler ႏွင့္ BrowserKit တို႔ ပါဝင္တဲ့အတြက္ testing လုပ္ရာမွာ application ရဲ႕ views ေတြကို web browser တစ္ခုကဲ့သို႔ simulate လုပ္ႏိုင္ၿပီး စစ္ေဆးျပဳျပင္ႏိုင္မွာျဖစ္ပါတယ္။

ဥပမာ အေနျဖင့္ test ဖိုင္တစ္ခုလည္း `app/tests` folder ထဲမွာပါဝင္ပါတယ္။ Laravel appilcation တစ္ခုကို install လုပ္ၿပီးပါက `phpunit` command ကို run ယံုျဖင့္ application ရဲ႕ tests မ်ားကို run ႏိုင္မွာျဖစ္ပါတယ္။


<a name="defining-and-running-tests"></a>
## Defining & Running Tests (Tests မ်ား သတ္မွတ္ျခင္းနွင့္ Run ျခင္း)

Test case ကိုဖန္တီးဖို႔ `app/tests` folder ထဲမွာ file အသစ္တစ္ခု ျပဳလုပ္ပါ။ class ကေတာ့ `TestCase` class ကို extend ရမွာျဖစ္ပါတယ္။ ထုိ႔ေနာက္မွာေတာ့ သင္ႏွစ္သက္သလို test methods မ်ားကို PHPUnit ကိုအသံုးျပဳၿပီး ဖန္တီးႏိုင္ၿပီ ျဖစ္ပါတယ္။


#### Test Class ဥပမာ

	class FooTest extends TestCase {

		public function testSomethingIsTrue()
		{
			$this->assertTrue(true);
		}

	}

သင့္ application မွ tests မ်ားကို terminal မွ `phpunit` command ရိုက္ၿပီး run ႏိုင္ပါတယ္။


> **သတိ:** ကိုယ့္ဟာကို `setUp` method ေရးထားပါက `parent::setUp` ကို ေခၚဖို႔ သတိရပါ။

<a name="test-environment"></a>
## Test Environment

unit tests မ်ားကို run ေနစဥ္ Laravel က configuration environment ကို `testing` သို႔ အလိုအေလ်ာက္ ေျပာင္းထားမွာျဖစ္ပါတယ္။ ထို႔အျပင္ Laravel ရဲ႕ test environment ထဲမွာ  `session` ႏွင့္ `cache` တို႔ရဲ႕ configuration files မ်ားပါ ပါဝင္မွာျဖစ္ပါတယ္။ ဒီ drivers ႏွစ္ခုစလံုးကို test environment ထဲမွာ `array` အျဖစ္ set ထားမွာျဖစ္ပါတဲ့အတြက္ testing လုပ္ၿပီးရင္ေတာ့ testing နဲ႔ပတ္သက္တဲ့ session သို႔မဟုတ္ cache data ေတြေတာ့ ပ်က္သြားမွာျဖစ္ပါတယ္။ လိုအပ္ရင္လိုအပ္သလို တျခား testing environments ေတြကို ဆက္လက္ဖန္တီးလို႔လည္း ရပါတယ္။

<a name="calling-routes-from-tests"></a>

## Calling Routes From Tests (Tests မ်ားမွ Routes ကိုေခၚျခင္း)

#### Test တစ္ခုမွ Route ကိုေခၚျခင္း
`call` method ကိုအသုံးျပဳ၍ route တစ္ခုခုကို test ကေန အလြယ္တကူ ေခၚႏိုင္ပါတယ္၊

	$response = $this->call('GET', 'user/profile');

	$response = $this->call($method, $uri, $parameters, $files, $server, $content);
	
ထို႔ေနာက္ `Illuminate\Http\Response` object ကို စစ္ေဆးႏိုင္ပါတယ္။

	$this->assertEquals('Hello World', $response->getContent());

#### Test တစ္ခုမွ Controller ကိုေခၚျခင္း

test ကေန controller ကိုလည္းေခၚႏိုင္ပါတယ္။

	$response = $this->action('GET', 'HomeController@index');

	$response = $this->action('GET', 'UserController@profile', array('user' => 1));
	
ဒီ `getContent` method ဟာ response ကေန evaluated string contents ေတြကို ျပန္ေပးမွာျဖစ္ပါတယ္။ သင့္၏ route မွ `View` return ရင္ေတာ့ `original` property ကို အသံုးျပဳ၍ access လုပ္ႏိုင္ပါတယ္၊

	$view = $response->original;

	$this->assertEquals('John', $view['name']);

HTTPS route တစ္ခုကိုေခၚလိုပါက `callSecure` method ကို အသံုးျပဳႏိုင္ပါတယ္။

	$response = $this->callSecure('GET', 'foo/bar');

> **သတိ:** testing environment ေတြထဲမွာ route filters ေတြကို disable ထားပါတယ္။. ျပန္လည္ enable ခ်င္ရင္ေတာ့, test ထဲမွာ `Route::enableFilters()` ထည့္လိုက္ပါ။

### DOM Crawler

Route ကိုေခၚ၍ DOM Crawler ကိုလက္ခံၿပီး ရလာတဲ့ content ကိုစစ္ေဆးႏိုင္ပါတယ္။ 

	$crawler = $this->client->request('GET', '/');

	$this->assertTrue($this->client->getResponse()->isOk());

	$this->assertCount(1, $crawler->filter('h1:contains("Hello World!")'));

Crawler အသံုးျပဳပံုႏွင့္ပတ္သက္ၿပီး ပိုသိလိုပါက ၎ရဲ႕[official documentation](http://symfony.com/doc/master/components/dom_crawler.html) ကို ကိုးကားပါ၊

<a name="mocking-facades"></a>
## Mocking Facades (Facades မ်ား အတုျပဳလုပ္ျခင္း)

Testing လုပ္ေနစဥ္ ရံဖန္ရံခါမွ Laravel ၏ static facade call ေတြကို အတုျပဳလုပ္ (mock) လိုတတ္ပါတယ္။ ဥပမာအေနျဖင့္ ေအာက္ပါ controller action ကိုၾကည့္ပါ။ 

	public function getIndex()
	{
		Event::fire('foo', array('name' => 'Dayle'));

		return 'All done!';
	}
	
`Event` class သို႔ ေခၚထားေသာ call အား  facade မွာရွိတဲ့ `shouldReceive` method ျဖင့္ အတုျပဳလုပ္ႏိုင္ပါတယ္။ [Mockery](https://github.com/padraic/mockery) mock instance တစ္ခု ျပန္လည္ return မွာ ျဖစ္ပါတယ္။

#### Facade တစ္ခု အတုျပဳလုပ္ျခင္း

	public function testGetIndex()
	{
		Event::shouldReceive('fire')->once()->with('foo', array('name' => 'Dayle'));

		$this->call('GET', '/');
	}

> **သတိ:** `Request` facade ကိုေတာ့ မ mock သင့္ပါဘူး။ အဲဒီအစား pass ခ်င္တဲ့ input  အား `call` method သို႔ pass ၿပီး test ကို run ပါ။

<a name="framework-assertions"></a>
## Framework Assertions (Framework စစ္ေဆးျခင္းမ်ား)

Laravel တြင္ testing လုပ္ဖို႔ အနည္းငယ္ ပိုမိုလြယ္ကူသက္သာေစရန္ `assert` methods မ်ားပါဝင္ပါတယ္။

#### Respones မ်ား HTTP status OK ျဖစ္ေၾကာင္း စစ္ေဆးျခင္း

	public function testMethod()
	{
		$this->call('GET', '/');

		$this->assertResponseOk();
	}

#### အျခား response statuses မ်ားအား စစ္ေဆးျခင္း

	$this->assertResponseStatus(403);

#### responses မ်ား HTTP Redirects မ်ား ျဖစ္ေၾကာင္း စစ္ေဆးျခင္း

	$this->assertRedirectedTo('foo');

	$this->assertRedirectedToRoute('route.name');

	$this->assertRedirectedToAction('Controller@method');

#### View တြင္ data ရွိေၾကာင္း စစ္ေဆးျခင္း

	public function testMethod()
	{
		$this->call('GET', '/');

		$this->assertViewHas('name');
		$this->assertViewHas('age', $value);
	}

#### Session တြင္ data ရွိေၾကာင္း စစ္ေဆးျခင္း

	public function testMethod()
	{
		$this->call('GET', '/');

		$this->assertSessionHas('name');
		$this->assertSessionHas('age', $value);
	}

#### Session တြင္ Errors မ်ား စစ္ေဆးျခင္း

    public function testMethod()
    {
        $this->call('GET', '/');

        $this->assertSessionHasErrors();

        // Asserting the session has errors for a given key...
        $this->assertSessionHasErrors('name');

        // Asserting the session has errors for several keys...
        $this->assertSessionHasErrors(array('name', 'age'));
    }

#### Input အေဟာင္းမ်ား Data စစ္ေဆးျခင္း

	public function testMethod()
	{
		$this->call('GET', '/');

		$this->assertHasOldInput();
	}

<a name="helper-methods"></a>
## Helper Methods (အေထာက္အကူ Methods မ်ား)

Application test လုပ္ရာတြင္ ပိုမိုလြယ္ကူေစရန္ `TestCase` class တြင္ helper methods မ်ားပါဝင္ပါတယ္။

#### Tests မွ Sessisons data မ်ား ဖန္တီ ျခင္း flush ျခင္း

	$this->session(['foo' => 'bar']);

	$this->flushSession();

#### လက္ရွိ authenticated ျဖစ္ၿပီးေသာ User တစ္ေယာက္ဖန္တီးျခင္း

`be` method အား အသံုးျပဳ၍ လက္ရွိ authenticated ျဖစ္ၿပီးေသာ user တစ္ေယာက္ဖန္တီးႏိုင္ပါတယ္။

	$user = new User(array('name' => 'John'));

	$this->be($user);

Database အား `seed` method အသံုးျပဳ၍ re-seed ျပဳလုပ္ႏိုင္ပါတယ္။

#### Test မွ Database အား Re-seed ျပဳလုပ္ျခင္း

	$this->seed();

	$this->seed($connection);

Database seeds မ်ားျပဳလုပ္ျခင္းႏွင့္ ပတ္သက္၍ documentation ရဲ႕ [migrations and seeding](migrations#database-seeding.md) အခန္းမွာ သြားၾကည့္ႏိုင္ပါတယ္။


<a name="refreshing-the-application"></a>
## Application အား refresh ျပဳလုပ္ျခင္း

သင္၏ Laravel `Application/IoC Container` အား `$this->app` မွတစ္ဆင့္ မည္သည့္ test method မွမဆို access ႏိုင္ပါတယ္။ ဒီ Application instance ဟာ test case တစ္ခုစီ အတြက္ ျပန္လည္ refresh သြားမွာျဖစ္ပါတယ္။ Application အား သင္ သတ္မွတ္ထားေသာ method တစ္ခုအတြက္သာ refresh ျပဳလုပ္ခ်င္ပါက test method မွ `refreshApplication` method ကို အသံုးျပဳႏိုင္ပါတယ္။ ဒါဟာ test cases မ်ား စ run ကတည္းက IoC container ထဲမွာရွိေတသာ အပို bindings မ်ား၊ အတုျပဳလုပ္ျခင္း (mocks) မ်ားအား reset ျပဳလုပ္သြားမွာ ျဖစ္ပါတယ္။