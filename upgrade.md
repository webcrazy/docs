<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<title></title>
	<meta name="generator" content="LibreOffice 4.2.5.2 (Linux)">
	<meta name="created" content="0;0">
	<meta name="changed" content="20140726;93312287680936">
	<style type="text/css">
	<!--
		p { color: #000000 }
	-->
	</style>
</head>
<body lang="en-US" text="#000000" dir="ltr" style="background: transparent">
<p style="margin-bottom: 0in"># Version <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မြင့်တင်ခြင်း</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">- [version 4.1 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှ
</span></font></span></font>4.2 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း</span></font></span></font>](#upgrade-4.2)</p>
<p style="margin-bottom: 0in">- [version 4.1.x <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှ
</span></font></span></font>4.1.29 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း</span></font></span></font>](#upgrade-4.1.29)</p>
<p style="margin-bottom: 0in">- [version 4.1.25 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှ
</span></font></span></font>4.1.26 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း</span></font></span></font>](#upgrade-4.1.26)</p>
<p style="margin-bottom: 0in">- [version 4.0 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှ
</span></font></span></font>4.1 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း</span></font></span></font>](#upgrade-4.1)</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">&lt;a name=&quot;upgrade-4.2&quot;&gt;&lt;/a&gt;</p>
<p style="margin-bottom: 0in">## version 4.1 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှ
</span></font></span></font>4.2 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### PHP 5.4+</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">Laravel 4.2 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
သုံးပြုဖို့အတွက် </span></font></span></font>php
version 5.4.0 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">နှင့်
အထက်မှာ ဖြစ်ရပါမယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Encryption Defaults</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">'app/config/app.php' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲတွင်
</span></font></span></font>'cipher'(<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">စကားဝှက်ရေးနည်း</span></font></span></font>)
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အသစ်ထည့်ပါ။
စကားဝှက်ရေးနည်းအတွက် </span></font></span></font>value
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကိုတော့
</span></font></span></font>`MCRYPT_RIJNDAEL_256' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထည့်ပေးပါမယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">	'cipher' =&gt; MCRYPT_RIJNDAEL_256</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အခုထည့်လိုက်တဲ့
စကားဝှက်ရေးနည်းက </span></font></span></font>laravel
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ရဲ့
စကားဝှက်တွေ ထုတ်တဲ့အခါကျရင်
သုံးပြုသွားပါလိမ့်မယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ယာယီဖျက်သိမ်းတဲ့
</span></font></span></font>model <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တွေအတွက်
</span></font></span></font>Traits <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကိုသုံးပြုနိုင်ပါပြီ</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ယာယီဖျက်သိမ်းနိုင်တဲ့
</span></font></span></font>models <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တွေရေးပြီးဆိုရင်
ဟိုအရင်တုန်းက </span></font></span></font>'SoftDeltes'
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font></span></font>function <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သုံးခဲ့ပါတယ်။
အခုဆိုရင်တော့ </span></font></span></font>'SoftDeleteingTrait'
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font></span></font>function <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
အောက်ကပုံစံအတိုင်းသုံးပြုရပါမယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">	use
Illuminate\Database\Eloquent\SoftDeletingTrait;</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">	class User extends Eloquent {</p>
<p style="margin-bottom: 0in">		use SoftDeletingTrait;</p>
<p style="margin-bottom: 0in">	}</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဒီလိုမျိုးသုံးလိုက်ပြီဆိုရင်တော့
</span></font></span></font>'deleted_at' column <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
</span></font></span></font>'dataes'<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှာ
အောက်ကပုံစံအတိုင်းထည့်ပေးသင့်ပါတယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">	class User extends Eloquent {</p>
<p style="margin-bottom: 0in">		use SoftDeletingTrait;</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">		protected $dates = ['deleted_at'];</p>
<p style="margin-bottom: 0in">	}</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">Soft delete <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">လုပ်လုပ်ဖို့အတွက်
</span></font></span></font>API <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တွေမှာလဲ
အပေါ်က နည်းအတိုင်းသာ
သုံးပြုရမှာဖြစ်ပါသည်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### View / Pagination <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အတွက်
</span></font></span></font>Enviornment <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ရဲ့
နာမည်တွေ ပြောင်းလိုက်ပြီ</span></font></span></font></p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တကယ်လို့
</span></font></span></font>`Illuminate\View\Environment` class <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သို
့မဟုတ်
</span></font></span></font>`Illuminate\Pagination\Environment`<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တွေသုံးခဲ့တယ်ဆိုရင်တော့
အဲဒီနှစ်ခုနေရာမှာ
</span></font></span></font>`Illuminate\View\Factory` <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">နဲ့
</span></font></span></font>`Illuminate\Pagination\Factory <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
အစားထိုးထည့်သုံးရပါလိမ့်မယ်။အခုလိုမျိုး
နာမည်ပြောင်းလိုက်တာက သူ
့တို့ရဲ့  </span></font></span></font>function <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">နဲ့
ပိုမိုထိရောက်သော
နာမည်တွေဖြစ်သွားအောင်ဖြစ်ပါတယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Pagination class <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှာ
</span></font></span></font>parameter <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အသစ်ထည့်ခြင်း</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တကယ်လို
့</span></font></span></font>`Illuminate\Pagination\Presenter`class
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
ထပ်ချဲ့ ပြီးအသုံးပြုခဲ့ရင်တော့
အရင်သုံးခဲ့တဲ့ </span></font></span></font>`getPageLinkWrapper`
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font></span></font>abstract method <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှာ
</span></font></span></font>'rel' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font></span></font>parameter <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">လေးကို
 အောက်ကပုံစံအတိုင်းထပ်ထည့်ပေးရပါတယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">	abstract public function
getPageLinkWrapper($url, $page, $rel = null);</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">&lt;a name=&quot;upgrade-4.1.29&quot;&gt;&lt;/a&gt;</p>
<p style="margin-bottom: 0in">## version 4.1.x <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှ
</span></font></span></font>4.1.29 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">Laravel 4.1.29 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှာတော့
</span></font></span></font>lavael <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှာသုံးပြုထားတဲ့
</span></font></span></font>database drivers <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တွေရဲ့
 </span></font></span></font>column<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကိုးကားတွေမူ
တွေကို မြင့်တင်ပေးထားတာဖြစ်ပါတယ်။
အဲဒီလိုလုပ်လိုက်တဲ့အတွက်
</span></font></span></font>model <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲမှာ
</span></font></span></font>'filable' property <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တွေ
မသတ်မှတ်ထားတဲ့အခါမှာ </span></font></span></font>mass
assignment <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အတွက်ဖြင့်ပေါ်လာမည့်
လုံးခြံရေးဆိုင်ရာယိုပေါက်တွေကို
ကာကွယ်ပေးသွားပါလိမ့်မည်။အဲဒါအခါကျရင်
</span></font></span></font>
</p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကိုယ့်ရဲ့
 </span></font></span></font>application <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">က
အတိုင်းတာတခုထိတော့
လုံခြုံရေးကောင်းသွားမှာပါ။ဘယ်လိုပဲဖြစ်ဖြစ်
</span></font></span></font>'guarded'<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သုံးပြုထားပြီး
</span></font></span></font>user <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဘက်က
လာတဲ့ </span></font></span></font>data passing(<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဥပမာ
</span></font></span></font>update/save) <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ပိုင်းပါလာရင်တော့
ကိုယ့်ရဲ့ </span></font></span></font>application
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှာ
 </span></font></span></font>mass assignment <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကြောင့်
ဖြစ်လာနိုင်တဲ့ပြသနာတွေကို
ကာကွယ်ဖို ့အတွက် </span></font></span></font>version
4.1.28 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သို
့ ချက်ခြင်းပဲမြင့်တင်သင့်ပါတယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">Laravel 4.1.28 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
မြင့်တင်ဖို့ ကတော့ </span></font></span></font>terminal
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှ
တစ်ဆင့် </span></font></span></font>'composer update'
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">လေးလုပ်လိုက်ရုံဖြင့်
မြင့်တင်လို့ရပါတယ်။ </span></font></span></font>
</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">&lt;a name=&quot;upgrade-4.1.26&quot;&gt;&lt;/a&gt;</p>
<p style="margin-bottom: 0in">## version 4.1.25 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှ
</span></font></span></font>4.1.26 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">Laravel 4.1.26 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကတော့
</span></font></span></font>'remember me' cookies <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အတွက်
</span></font></span></font>security <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အတွက်
ထုတ်ပေးထားတဲ့ </span></font></span></font>version
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဖြစ်ပါတယ်။အရင်တုန်းကဆိုရင်
</span></font></span></font>user browser<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှတဆင့်
</span></font></span></font>remember cookie <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
တိုက်ခိုက်သူတယောက်ယောက်ရသွားပြီဆိုရင်
</span></font></span></font>user <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">က
အကောင့်ရဲ့  </span></font></span></font>password
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ပြောင်းတာသို
့မဟုတ် </span></font></span></font>logged ou
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ပြုလုပ်ခဲ့ရင်တောင်မှ
အဲဒီ </span></font></span></font>cookie <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ရဲ့
သက်တမ်းတခုထိကို တိုက်ခိုက်သူက
သုံးပြုနိုင်မှာဖြစ်ပါတယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အဲဒီကာကွယ်မူအတွက်
</span></font></span></font>'remember_token' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font></span></font>column <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
</span></font></span></font>'users' table
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှာထည့်ပေးရပါတယ်။အဲဒီလိုထည့်လိုက်ပြီဆိုရင်တော့
</span></font></span></font>user login <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ပြုလုပ်တိုင်း
ဝင်လိုက်တဲ့ </span></font></span></font>account
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အတွက်
</span></font></span></font>token <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အသစ်တွေထုတ်ပေးသွားပါလိမ့်မယ်။
</span></font></span></font>User <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">က
</span></font></span></font>logs out <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">လုပ်လိုက်ရင်လဲ
</span></font></span></font>token
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အသစ်ထုတ်ပေးသွားပါလိမ့်မယ်။အခုလိုမျိုး
ပြုလုပ်လိုက်တဲ့အတွက် </span></font></span></font>user
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ရဲ့
 </span></font></span></font>cookie <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ပါသွားရင်တောင်မှ
အကောင့်ကို </span></font></span></font>logs out
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">လိုက်ရုံဖြင့်
တိုက်ခိုက်သူရထားတဲ့ </span></font></span></font>cookie
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">က
အလုပ်လုပ်မှာမဟုတ်တော့ပါဘူး။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Upgrade Path</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ပထမဆုံး
</span></font></span></font>'remember_token'(VARCHAR(100), TEXT,) <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
</span></font></span></font>'users' tale <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲကိုထည့်ပေးပါ။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ပြီးရင်တော့
သင်က </span></font></span></font>Eloquent <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ရဲ
့</span></font></span></font>authentication driver
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သုံးပြုတယ်ဆိုရင်တော့
အောက်ကပုံစံအတိုင်း </span></font></span></font>'User'
class <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
ပြင်ပေးဖို့လိုပါတယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">	public function getRememberToken()</p>
<p style="margin-bottom: 0in">	{</p>
<p style="margin-bottom: 0in">		return $this-&gt;remember_token;</p>
<p style="margin-bottom: 0in">	}</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">	public function
setRememberToken($value)</p>
<p style="margin-bottom: 0in">	{</p>
<p style="margin-bottom: 0in">		$this-&gt;remember_token = $value;</p>
<p style="margin-bottom: 0in">	}</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">	public function getRememberTokenName()</p>
<p style="margin-bottom: 0in">	{</p>
<p style="margin-bottom: 0in">		return 'remember_token';</p>
<p style="margin-bottom: 0in">	}</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">&gt; **<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှတ်ချက်</span></font></span></font>**
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အပေါ်ကလိုမျိုး
</span></font></span></font>&quot;remember token&quot;
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထည့်လိုက်ပြီဆိုရင်တော့
လက်ရှိအလုပ်လုပ်နေတဲ့
</span></font></span></font>'remember me' sessions
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တွေအားလုံးအလုပ်လုပ်မှာမဟုတ်တော့ပါဘူး။
ဒါကြောင့် </span></font></span></font>useraccount
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အကောင့်တွေ
အကုန်လုံး </span></font></span></font>login
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ပြန်လုပ်ပေးဖို
့လိုအပ်ပါတယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Package Maintainers</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">`Illuminate\Auth\UserProviderInterface`
interface <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
ညွန်ကြားချက်</span></font></span></font>(method)<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">နှစ်ခုထည့်ပေးဖို့လိုပါတယ်။သာမန်သုံးပြုပုံတွေကိုတော့
</span></font></span></font>default drivers <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တွေမှာတွေ့နိုင်ပါတယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">	public function
retrieveByToken($identifier, $token);</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">	public function
updateRememberToken(UserInterface $user, $token);</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">`Illuminate\Auth\UserInterface` <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှာလဲ
</span></font></span></font>&quot;upgrade path' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှာဖော်ပြထားတဲ့
</span></font></span></font>method <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သုံးခုကို
လက်ခံရရှိမှာဖြစ်ပါတယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">&lt;a name=&quot;upgrade-4.1&quot;&gt;&lt;/a&gt;</p>
<p style="margin-bottom: 0in">## version 4.0 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှ
</span></font></span></font>4.1 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Upgrading Your Composer Dependency</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">laravel 4.1 <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကိုမြင့်တင်ဖို့အတွက်
</span></font></span></font>'composer.json'
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဖိုင်ထဲက</span></font></span></font>'larave/framework'
version <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
</span></font></span></font>'4.1.*' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ပြောင်းပေးရပါမယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Replacing Files</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">'public/index.php' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဖိုင်ကို
</span></font></span></font>[<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဒီလင့်မှာသွားကြည့်ပြီးအကုန်ကူးထည့်ပါ။</span></font></span></font>](https://github.com/laravel/laravel/blob/master/public/index.php).</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">'artisan' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဖိုင်ကိုလဲ
</span></font></span></font>[<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဒီလင့်မှာသွားကြည့်ပြီးကူးထည့်ပါ။</span></font></span></font>](https://github.com/laravel/laravel/blob/master/artisan).</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Adding Configuration Files &amp;
Options</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">'app/config/app.php' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲက
</span></font></span></font>'aliases' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">နဲ့
</span></font></span></font>'providers'<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
</span></font></span></font>update <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">လုပ်ပေးဖို့လဲလိုပါတယ်။
</span></font></span></font>update <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ပြုလုပ်ဖို့အတွက်
</span></font></span></font>[<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဒီလင့်မှာသွားကြည့်ပြီးကူးထည့်ပါ။</span></font></span></font>](https://github.com/laravel/laravel/blob/master/app/config/app.php).
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သတိတစ်ခုထားရမှာက
အရင် </span></font></span></font>app.php <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲက
</span></font></span></font>provider <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">နဲ့
</span></font></span></font>alias <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တွေကို
ပြန်ထည့်ဖို့ မမေ့ဖို့ပါ။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">'app/config' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲမှာ
</span></font></span></font>remote.php
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့ဖိုင်တစ်ခုဆောက်ပါ။ပြီးရင်
</span></font></span></font>[<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဒီလင့်မှာ</span></font></span></font>](https://github.com/laravel/laravel/blob/master/app/config/remote.php)
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သွားကြည့်ပြီး
အကုန်ကူးထည့်ပါ။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ပြီးရင်တော့
</span></font></span></font>'app/config/session.php' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲမှာ
</span></font></span></font>'expire_on_close' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font></span></font>key <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တစ်ခုထည့်ပါ။
သူ ့ရဲ့ </span></font></span></font>value <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကိုတော့
</span></font></span></font>'false' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ပဲပေးထားပါ။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">နောက်တစ်ခုကတော့
</span></font></span></font>'app/config/queue.php' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲမှာ
</span></font></span></font>'failed' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font></span></font>key <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">နဲ့
</span></font></span></font>value <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
အောက်ကပုံစံအတိုင်းထည့်ပါ။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">	'failed' =&gt; array(</p>
<p style="margin-bottom: 0in">		'database' =&gt; 'mysql', 'table' =&gt;
'failed_jobs',</p>
<p style="margin-bottom: 0in">	),</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">နောက်တစ်ခုအနေနဲ့
</span></font></span></font>'app/config/view.php' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲက
</span></font></span></font>'pagination' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ရဲ့
 </span></font></span></font>value <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
</span></font></span></font>`pagination::slider-3` <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သို
့ပြောင်းထည့်ပါ။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Controller Updates</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တကယ်လို့
</span></font></span></font>'app./controllers/BaseController.php'
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲမှာ
</span></font></span></font>'use' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သုံးပြုထားရင်တော့
</span></font></span></font>`use
Illuminate\Routing\Controllers\Controller;` <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
</span></font></span></font>`use Illuminate\Routing\Controller;`<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သို
့ပြောင်းပေးရပါမယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Password Reminders Updates</p>
<p style="margin-bottom: 0in">Password reminders <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အတွက်ကတော့
ပိုပြီး ဆင်ပြေလွယ်ကူဖို့အတွက်
ပြန်ဆင်ပေးထားပါတယ်။ </span></font></span></font>'php
artisan auth:reminders-controller' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font></span></font>Artisan command <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သုံးပြီး
စမ်းသပ်နိုင်ပါတယ်။ </span></font></span></font>laravel
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ရဲ့
 </span></font></span></font>documentation <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကိုလဲ
</span></font></span></font>[<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဒီမှာ</span></font></span></font>](/docs/security#password-reminders-and-reset)<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သွားလေ့လာပြီး
ကိုယ့်</span></font></span></font>application <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
လိုအပ်သလို ထပ်ထည့်နိုင်ပါတယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">'app/lang/en' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲက
</span></font></span></font>reminders.php <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဖိုင်ကိုလဲ

</span></font></span></font>[<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဒီလင့်မှာ</span></font></span></font>](https://github.com/laravel/laravel/blob/master/app/lang/en/reminders.php)
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သွားဖတ်ပြီး
ပြင်ထည့်လိုက်ပါ။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Environment Detection Updates</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">Application <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ရဲ
့လုံခြံုရေးပိုင်းဆိုင်ရာအတွက်
</span></font></span></font>URL domains <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သုံးပြုပြီး
</span></font></span></font>application enviornment <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">စစ်ဆေးခြင်းကို
ရပ်ဆိုင်းလိုက်ပါတယ်။အဲဒီလိုသုံးပြုချင်းက
တိုက်ခိုက်သူတွေအတွက် </span></font></span></font>request
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ရဲ
့ </span></font></span></font>enviornment <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကိုပြောင်းလဲနိုင်ခြင်း
သို ့မဟုတ် အလွယ်တကူ
ပြောင်းလဲနိုင်ခြင်းကြောင့်
ရပ်ဆိုင်းရခြင်းဖြစ်ပါတယ်။
</span></font></span></font>enviornment <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">စစ်ဆေးခြင်းအတွက်
</span></font></span></font>user <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သုံးပြုနေတဲ့
စက်ရဲ ့</span></font></span></font>hostname<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကိုသုံးပြု
ပြီးစစ်ဆေးသင့်ပါတယ်။ </span></font></span></font>(
MAC, Linux, Windows <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တွေမှာ
</span></font></span></font>'hostname' command <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သုံးပြုပါတယ်</span></font></span></font>)</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Simpler Log Files</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">Laravek <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">မှာ
</span></font></span></font>'app/storage/logs/laravel.log' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲမှာ
</span></font></span></font>log <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဖိုင်တွေထုတ်ပေးပါတယ်။ဘယ်လိုပဲဖြစ်ဖြစ်
</span></font></span></font>'app/start' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲက
</span></font></span></font>'global.php' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲမှာ
လိုအပ်တဲ့ နေရာကိုပြောင်းလဲသုံးပြုနိုင်ပါသည်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Removing Redirect Trailing Slash</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">'bootstrap/start.php' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲမှာ
</span></font></span></font>`$app-&gt;redirectIfTrailingSlash()'
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font></span></font>method <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
ဖြုတ်ပစ်လိုက်ပါ။ အဲဒီအဆင့်က
ဒီ ဗားရှင်းမှာ မလိုအပ်တော့ပါဘူး။
ဘာလို့လဲဆိုတော့ သူ့အလုပ်လုပ်တဲ့
အတိုင်းတာကို </span></font></span></font>.htaccess
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">က
အလုပ်လုပ်ပေးသွားလို့ဖြစ်ပါတယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ပြီးရင်တော့
</span></font></span></font>'public' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဖိုဒါထဲက
</span></font></span></font>.htaccess <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ထဲက
စာတွေအကုန်ဖျက်ပြီး
</span></font></span></font>[<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ဒီလင့်</span></font></span></font>](https://github.com/laravel/laravel/blob/master/public/.htaccess)<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကစာတွေ
ပြန်ကူးထည့်ပြီး သိမ်းပါ။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Current Route Access</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">The current route <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
သုံးပြုဖို့အတွက် အရင်ကဆိုရင်
</span></font></span></font>`Route::getCurrentRoute()`
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">သုံးပြုပေမယ့်နေရာမှာ
ဒီဗားရှင်းမှာတော့
</span></font></span></font>`Route::current()` <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
သုံးပြု ရပါတယ်။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Composer Update</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in"><font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">အားလုံးပြီးသွားရင်တော့
</span></font></span></font>'composer update' <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကွန်မန်းကို
</span></font></span></font>run <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">လိုက်လို
့ရပါပြီ။ တကယ်လို ့</span></font></span></font>error
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တစ်ခုခုပြရင်တော့
</span></font></span></font>`composer update --no-scripts` <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကို
သုံးပြီး </span></font></span></font>update
<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ပြုလုပ်ရင်
ဆင်ပြေသွားပါပြီ။</span></font></span></font></p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">### Wildcard Event Listeners</p>
<p style="margin-bottom: 0in"><br>
</p>
<p style="margin-bottom: 0in">The Wilecard event listenets <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">က
တော့ ဒီဗားရှင်းမှာ </span></font></span></font>event
handler functions parameters<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တွေ
နဲ့ တွဲဖက်အလုပ်မလုပ်တော့ပါဘူး။တကယ်လို
့ဖျက်သိမ်းသွားတဲ့
</span></font></span></font>events<font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">တွေဖမ်းချင်ရင်တော့
</span></font></span></font>`Event::firing()` <font face="Lohit Devanagari"><span lang="hi-IN"><font face="Padauk"><span lang="hi-IN">ကိုသုံးပြီး
ဖမ်းနိုင်ပါတယ်။</span></font></span></font></p>
</body>
</html>