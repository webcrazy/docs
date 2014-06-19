# Pagination

- [ျပင္ဆင္ျခင္း](#configuration)
- [အသံုးအႏႈန္း](#usage)
- [Appending To Pagination Links](#appending-to-pagination-links)
- [Converting To JSON](#converting-to-json)
- [Custom Presenters](#custom-presenters)

<a name="configuration"></a>
## ျပင္ဆင္ျခင္း

Frameworks ေတာ္ေတာ္မ်ားမ်ားအတြက္ေတာ့ pagination ျပဳလုပ္ဖို႔အတြက္ စိတ္ပ်က္စရာ ကိစၥေတြ ႀကံဳေတြ႔ႏိုင္ပါတယ္။ Laravel ကေတာ့ ဒီကိစၥကို လြယ္လြယ္ကူကူ ပဲျပဳလုပ္ႏိုင္ေအာင္ အဆင္သင့္ ျပင္ဆင္ထားေပးပါတယ္။`app/config/view.php` ဖိုင္ထဲမွာ pagination အတြက္ option တစ္ခု ပါရွိပါတယ္။ အဲ့ဒီ `pagination` option မွာ pagination links ေတြအတြက္ ဘယ္ view ကိုအသံုးျပဳသင့္တယ္ဆိုတာကို သတ္မွတ္ေပးထားႏိုင္ပါတယ္။ ပံုမွန္အတိုင္းဆိုရင္ေတာ့ Laravel မွာ pagination အတြက္ view ႏွစ္ခုကို သတ္မွတ္ေပးထားပါတယ္။ 

`pagination::slider` ကိုအသံုးျပဳမယ္ဆိုရင္ လက္ရွိ view မွာေဖာ္ျပထားတဲ့ items အေရအတြက္ကိုအေျခခံပီးေတာ့ links ေတြထုတ္ေပးပါတယ္။ `pagination::simple` view ကေတာ့ "previous" နဲ႔ "next" button ႏွစ္ခုထုတ္ေပးပါတယ္။ အဲ့ဒီ view ႏွစ္ခုစလံုးဟာ Twitter Bootstrap နဲ႔ အဆင္ေျပေျပတြဲဖက္အသံုးျပဳႏိုင္ပါတယ္။ 

<a name="usage"></a>
## အသံုးအႏႈန္း

အခ်က္အလက္ေတြကို paginate လုပ္လုပ္ဖို႔အတြက္ နည္းနည္းေတြ အမ်ားႀကီးရွိပါတယ္။ အဲ့ဒီအထဲကမွ `paginate` method ကို Laravel ရဲ့ Query Builder သို႔မဟုတ္ Eloquent Model ေတြနဲ႔တဲသံုးတဲ့နည္းကေတာ့ အရိုးရွင္းဆံုးနည္းလမ္းျဖစ္ပါတယ္။ 

#### Paginating Database Results

	$users = DB::table('users')->paginate(15);

#### Paginating An Eloquent Model

[Eloquent](/docs/eloquent) models ေတြကိုလည္း paginate လုပ္ႏိုင္ပါတယ္ -

	$allUsers = User::paginate(15);

	$someUsers = User::where('votes', '>', 100)->paginate(15);

`paginate` method ကို passing ေပးလိုက္တဲ့ argument(number) ဟာ စာမ်က္ႏွာတစ္ခုေပၚမွာ အခ်က္အလက္ ဘယ္ေလာက္ေပၚမယ္ဆိုတဲ့ အေရအတြက္ျဖစ္ပါတယ္။ Pagination links ေတြကို view မွာျပန္ျပဖို႔အတြက္ေတာ့ `links` method ကိုအသံုးျပဳႏိုင္ပါတယ္။ 

	<div class="container">
		<?php foreach ($users as $user): ?>
			<?php echo $user->name; ?>
		<?php endforeach; ?>
	</div>

	<?php echo $users->links(); ?>

လက္ရွိ စာမ်က္ႏွာနဲ႔ပတ္သက္ၿပီး framework ကို ဘာျပင္ဆင္မႈမွ မလုပ္ခဲ့တာကို သတိျပဳမိမွာပါ။ အဲ့ဒီအတြက္ laravel က အလိုအေလ်ာက္ဆံုးျဖတ္ေပးပါတယ္။ 

Pagination အတြက္ custom view ကိုအသံုးျပဳခ်င္ရင္ေတာ့ `links` method ထဲမွာ view ကို passing ေပးလိုက္ရံုပါပဲ။

	<?php echo $users->links('view.name'); ?>

Pagination information ေတြကိုလဲ ေအာက္ပါ methods ေတြကိုအသံုးျပဳၿပီး ရယူႏိုင္ပါတယ္။ 

- `getCurrentPage`
- `getLastPage`
- `getPerPage`
- `getTotal`
- `getFrom`
- `getTo`
- `count`


#### "Simple Pagination"

အကယ္၍ pagination view မွာ "next" နဲ႔ "previous" links ေတြကိုပဲျပခ်င္ရင္ေတာ့ ပိုၿပီးအဆင္ေျပတဲ့ query ကုိျပဳလုပ္ေပးႏိုင္တဲ့ `simplePaginate` method ကိုအသံုးျပဳႏိုင္ပါတယ္။ view မွာ page numbers ေတြအတိအက်ေဖာ္ျပစရာမလိုတဲ့အတြက္ data ေတြအမ်ားႀကီးကို paginate လုပ္ရာမွာ ပိုမို အဆင္ေျပေစပါတယ္။ 

	$someUsers = User::where('votes', '>', 100)->simplePaginate(15);

#### Creating A Paginator Manually

အကယ္၍ pagination ကို manually ျပဳလုပ္ခ်င္ရင္ `Paginator::make` method ကိုအသံုးျပဳႏိုင္ပါတယ္။ 

	$paginator = Paginator::make($items, $totalItems, $perPage);

#### Customizing The Paginator URI

Paginator ကအသံုးျပဳတဲ့ URI ကိုလဲ `setBaseUrl` method ကိုအသံုးျပဳၿပီး ျပင္ဆင္ႏိုင္ပါတယ္။ 

	$users = User::paginate();

	$users->setBaseUrl('custom/url');

အေပၚမွာျပထားတဲ့ ဥပမာအရဆိုရင္ pagination URLs ဟာ http://example.com/custom/url?page=2 ပံုစံျဖစ္သြားမွာပါ။

<a name="appending-to-pagination-links"></a>
## Appending To Pagination Links

သင့္အေနနဲ႔ `appends` method ကိုအသံုးျပဳၿပီး query string ေတြကို pagination links ေတြဆီကို ထပ္ေပါင္းထည့္လို႔ရပါတယ္။

	<?php echo $users->appends(array('sort' => 'votes'))->links(); ?>

အေပၚမွာေရးထားတဲ့ အတိုင္းဆိုရင္ URLs ဟာ ေအာက္ပါပံုစံနဲ႔ထြက္လာမွာပါ။

	http://example.com/something?page=2&sort=votes

Paginator's URLs မွာ "hash fragment" ထပ္ေပါင္းထည့္ခ်င္ရင္ေတာ့ `fragment` method ကိုအသံုးျပဳႏိုင္ပါတယ္။ 

	<?php echo $users->fragment('foo')->links(); ?>

အေပၚက mehtod call ဟာ URLs ကို ေအာက္ပါအတိုင္းထုတ္ေပးပါလိမ့္မယ္။

	http://example.com/something?page=2#foo

<a name="converting-to-json"></a>
## Converting To JSON

The `Paginator` class implements the `Illuminate\Support\Contracts\JsonableInterface` contract and exposes the `toJson` method. You can may also convert a `Paginator` instance to JSON by returning it from a route. The JSON'd form of the instance will include some "meta" information such as `total`, `current_page`, `last_page`, `from`, and `to`. The instance's data will be available via the `data` key in the JSON array.

<a name="custom-presenters"></a>
## Custom Presenters

Pagination ရဲ့ UI style ဟာ default အေနအထားမွာ Bootstrap Frontend Framework က pagination ပံုစံအတိုင္းျပဳလုပ္ေပးထားပါတယ္။ သင့္အေနနဲ႔ customize presenter နဲ႔ အသံုးျပဳခ်င္တယ္ဆိုရင္လဲ အသံုးျပဳလို႔ရႏိုင္ပါတယ္။ 

### Extending The Abstract Presenter

`Illuminate\Pagination\Presenter` class ကို extend လုပ္ၿပီး အဲ့ဒီ class ရဲ့ abstract methods ေတြကို implement ျပဳလုပ္ၿပီးေျပာငး္လဲ အသံုးျပဳႏိုင္ပါတယ္။ ေအာက္မွာ ျပထားတဲ့ ဥပမာကေတာ့ Zurb Foundation ရဲ့ ပံုစံကိုေျပာင္းလဲ အသံုးျပဳထားတာျဖစ္ပါတယ္။ 

    class ZurbPresenter extends Illuminate\Pagination\Presenter {

        public function getActivePageWrapper($text)
        {
            return '<li class="current"><a href="">'.$text.'</a></li>';
        }

        public function getDisabledTextWrapper($text)
        {
            return '<li class="unavailable">'.$text.'</li>';
        }

        public function getPageLinkWrapper($url, $page)
        {
            return '<li><a href="'.$url.'">'.$page.'</a></li>';
        }

    }

### Using The Custom Presenter

ပထမဦးဆံုး custom presenter ျပဳလုပ္လို႔တဲ့ view ဖိုင္ကို `app/views` ေအာက္မွာ ျပဳလုပ္ေပးလိုက္ပါ။ ျပီးရင္ `app/config/view.php` ေအာက္မွာရွိတဲ့ `pagination` `pagination::slider-3` ေနရာမွာ အသစ္လုပ္ထားတဲ့ view file ရဲ့ name နဲ႔အစားထိုးလိုက္ပါ။ အေပၚမွာျပထားတဲ့ Zurb Foundation အတိုင္းဆိုရင္ သင့္ရဲ့ view ဖိုင္အသစ္ဟာ ေအာက္ပါ ပံုစံအတိုင္းျဖစ္ရမွာပါ။ 

    <ul class="pagination">
        <?php echo with(new ZurbPresenter($paginator))->render(); ?>
    </ul>
