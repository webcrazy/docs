<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<title></title>
	<meta name="generator" content="LibreOffice 4.2.5.2 (Linux)">
	<meta name="created" content="0;0">
	<meta name="changed" content="20140726;92701071313756">
</head>
<body lang="en-US" dir="ltr" style="background: transparent">
<p style="margin-bottom: 0in"><a name="upgrade-4.2"></a><a name="upgrade-4.1.29"></a><a name="upgrade-4.1.26"></a><a name="upgrade-4.1"></a>
<font face="Padauk"># Version </font><font face="Padauk"><span lang="hi-IN">မြင့်တင်ခြင်း
</span></font><font face="Padauk">- [version 4.1 </font><font face="Padauk"><span lang="hi-IN">မှ
</span></font><font face="Padauk">4.2 </font><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း</span></font><font face="Padauk">](#upgrade-4.2)
- [version 4.1.x </font><font face="Padauk"><span lang="hi-IN">မှ
</span></font><font face="Padauk">4.1.29 </font><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း</span></font><font face="Padauk">](#upgrade-4.1.29)
- [version 4.1.25 </font><font face="Padauk"><span lang="hi-IN">မှ
</span></font><font face="Padauk">4.1.26 </font><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း</span></font><font face="Padauk">](#upgrade-4.1.26)
- [version 4.0 </font><font face="Padauk"><span lang="hi-IN">မှ
</span></font><font face="Padauk">4.1 </font><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း</span></font><font face="Padauk">](#upgrade-4.1)
## version 4.1 </font><font face="Padauk"><span lang="hi-IN">မှ
</span></font><font face="Padauk">4.2 </font><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း </span></font><font face="Padauk">###
PHP 5.4+ Laravel 4.2 </font><font face="Padauk"><span lang="hi-IN">ကို
သုံးပြုဖို့အတွက် </span></font><font face="Padauk">php
version 5.4.0 </font><font face="Padauk"><span lang="hi-IN">နှင့်
အထက်မှာ ဖြစ်ရပါမယ်။ </span></font><font face="Padauk">###
Encryption Defaults 'app/config/app.php' </font><font face="Padauk"><span lang="hi-IN">ထဲတွင်
</span></font><font face="Padauk">'cipher'(</font><font face="Padauk"><span lang="hi-IN">စကားဝှက်ရေးနည်း</span></font><font face="Padauk">)
</font><font face="Padauk"><span lang="hi-IN">အသစ်ထည့်ပါ။
စကားဝှက်ရေးနည်းအတွက် </span></font><font face="Padauk">value
</font><font face="Padauk"><span lang="hi-IN">ကိုတော့
</span></font><font face="Padauk">`MCRYPT_RIJNDAEL_256' </font><font face="Padauk"><span lang="hi-IN">ထည့်ပေးပါမယ်။
</span></font><font face="Padauk">'cipher' =&gt; MCRYPT_RIJNDAEL_256
</font><font face="Padauk"><span lang="hi-IN">အခုထည့်လိုက်တဲ့
စကားဝှက်ရေးနည်းက </span></font><font face="Padauk">laravel
</font><font face="Padauk"><span lang="hi-IN">ရဲ့ စကားဝှက်တွေ
ထုတ်တဲ့အခါကျရင် သုံးပြုသွားပါလိမ့်မယ်။
</span></font><font face="Padauk">### </font><font face="Padauk"><span lang="hi-IN">ယာယီဖျက်သိမ်းတဲ့
</span></font><font face="Padauk">model </font><font face="Padauk"><span lang="hi-IN">တွေအတွက်
</span></font><font face="Padauk">Traits </font><font face="Padauk"><span lang="hi-IN">ကိုသုံးပြုနိုင်ပါပြီ
ယာယီဖျက်သိမ်းနိုင်တဲ့
</span></font><font face="Padauk">models </font><font face="Padauk"><span lang="hi-IN">တွေရေးပြီးဆိုရင်
ဟိုအရင်တုန်းက </span></font><font face="Padauk">'SoftDeltes'
</font><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font><font face="Padauk">function </font><font face="Padauk"><span lang="hi-IN">သုံးခဲ့ပါတယ်။
အခုဆိုရင်တော့ </span></font><font face="Padauk">'SoftDeleteingTrait'
</font><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font><font face="Padauk">function </font><font face="Padauk"><span lang="hi-IN">ကို
အောက်ကပုံစံအတိုင်းသုံးပြုရပါမယ်။
</span></font><font face="Padauk">use
Illuminate\Database\Eloquent\SoftDeletingTrait; class User extends
Eloquent { use SoftDeletingTrait; } </font><font face="Padauk"><span lang="hi-IN">ဒီလိုမျိုးသုံးလိုက်ပြီဆိုရင်တော့
</span></font><font face="Padauk">'deleted_at' column </font><font face="Padauk"><span lang="hi-IN">ကို
</span></font><font face="Padauk">'dataes'</font><font face="Padauk"><span lang="hi-IN">မှာ
အောက်ကပုံစံအတိုင်းထည့်ပေးသင့်ပါတယ်။
</span></font><font face="Padauk">class User extends Eloquent { use
SoftDeletingTrait; protected $dates = ['deleted_at']; } Soft delete
</font><font face="Padauk"><span lang="hi-IN">လုပ်လုပ်ဖို့အတွက်
</span></font><font face="Padauk">API </font><font face="Padauk"><span lang="hi-IN">တွေမှာလဲ
အပေါ်က နည်းအတိုင်းသာ
သုံးပြုရမှာဖြစ်ပါသည်။ </span></font><font face="Padauk">###
View / Pagination </font><font face="Padauk"><span lang="hi-IN">အတွက်
</span></font><font face="Padauk">Enviornment </font><font face="Padauk"><span lang="hi-IN">ရဲ့
နာမည်တွေ ပြောင်းလိုက်ပြီ
တကယ်လို့ </span></font><font face="Padauk">`Illuminate\View\Environment`
class </font><font face="Padauk"><span lang="hi-IN">သို ့မဟုတ်
</span></font><font face="Padauk">`Illuminate\Pagination\Environment`</font><font face="Padauk"><span lang="hi-IN">တွေသုံးခဲ့တယ်ဆိုရင်တော့
အဲဒီနှစ်ခုနေရာမှာ
</span></font><font face="Padauk">`Illuminate\View\Factory` </font><font face="Padauk"><span lang="hi-IN">နဲ့
</span></font><font face="Padauk">`Illuminate\Pagination\Factory </font><font face="Padauk"><span lang="hi-IN">ကို
အစားထိုးထည့်သုံးရပါလိမ့်မယ်။အခုလိုမျိုး
နာမည်ပြောင်းလိုက်တာက သူ
့တို့ရဲ့ </span></font><font face="Padauk">function
</font><font face="Padauk"><span lang="hi-IN">နဲ့
ပိုမိုထိရောက်သော
နာမည်တွေဖြစ်သွားအောင်ဖြစ်ပါတယ်။
</span></font><font face="Padauk">### Pagination class </font><font face="Padauk"><span lang="hi-IN">မှာ
</span></font><font face="Padauk">parameter </font><font face="Padauk"><span lang="hi-IN">အသစ်ထည့်ခြင်း
တကယ်လို ့</span></font><font face="Padauk">`Illuminate\Pagination\Presenter`class
</font><font face="Padauk"><span lang="hi-IN">ကို ထပ်ချဲ့
ပြီးအသုံးပြုခဲ့ရင်တော့
အရင်သုံးခဲ့တဲ့ </span></font><font face="Padauk">`getPageLinkWrapper`
</font><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font><font face="Padauk">abstract method </font><font face="Padauk"><span lang="hi-IN">မှာ
</span></font><font face="Padauk">'rel' </font><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font><font face="Padauk">parameter </font><font face="Padauk"><span lang="hi-IN">လေးကို
အောက်ကပုံစံအတိုင်းထပ်ထည့်ပေးရပါတယ်။
</span></font><font face="Padauk">abstract public function
getPageLinkWrapper($url, $page, $rel = null); ## version 4.1.x </font><font face="Padauk"><span lang="hi-IN">မှ
</span></font><font face="Padauk">4.1.29 </font><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း </span></font><font face="Padauk">Laravel
4.1.29 </font><font face="Padauk"><span lang="hi-IN">မှာတော့
</span></font><font face="Padauk">lavael </font><font face="Padauk"><span lang="hi-IN">မှာသုံးပြုထားတဲ့
</span></font><font face="Padauk">database drivers </font><font face="Padauk"><span lang="hi-IN">တွေရဲ့
</span></font><font face="Padauk">column</font><font face="Padauk"><span lang="hi-IN">ကိုးကားတွေမူ
တွေကို မြင့်တင်ပေးထားတာဖြစ်ပါတယ်။
အဲဒီလိုလုပ်လိုက်တဲ့အတွက်
</span></font><font face="Padauk">model </font><font face="Padauk"><span lang="hi-IN">ထဲမှာ
</span></font><font face="Padauk">'filable' property </font><font face="Padauk"><span lang="hi-IN">တွေ
မသတ်မှတ်ထားတဲ့အခါမှာ </span></font><font face="Padauk">mass
assignment </font><font face="Padauk"><span lang="hi-IN">အတွက်ဖြင့်ပေါ်လာမည့်
လုံးခြံရေးဆိုင်ရာယိုပေါက်တွေကို
ကာကွယ်ပေးသွားပါလိမ့်မည်။အဲဒါအခါကျရင်
ကိုယ့်ရဲ့ </span></font><font face="Padauk">application
</font><font face="Padauk"><span lang="hi-IN">က အတိုင်းတာတခုထိတော့
လုံခြုံရေးကောင်းသွားမှာပါ။ဘယ်လိုပဲဖြစ်ဖြစ်
</span></font><font face="Padauk">'guarded'</font><font face="Padauk"><span lang="hi-IN">သုံးပြုထားပြီး
</span></font><font face="Padauk">user </font><font face="Padauk"><span lang="hi-IN">ဘက်က
လာတဲ့ </span></font><font face="Padauk">data passing(</font><font face="Padauk"><span lang="hi-IN">ဥပမာ
</span></font><font face="Padauk">update/save) </font><font face="Padauk"><span lang="hi-IN">ပိုင်းပါလာရင်တော့
ကိုယ့်ရဲ့ </span></font><font face="Padauk">application
</font><font face="Padauk"><span lang="hi-IN">မှာ </span></font><font face="Padauk">mass
assignment </font><font face="Padauk"><span lang="hi-IN">ကြောင့်
ဖြစ်လာနိုင်တဲ့ပြသနာတွေကို
ကာကွယ်ဖို ့အတွက် </span></font><font face="Padauk">version
4.1.28 </font><font face="Padauk"><span lang="hi-IN">သို ့
ချက်ခြင်းပဲမြင့်တင်သင့်ပါတယ်။
</span></font><font face="Padauk">Laravel 4.1.28 </font><font face="Padauk"><span lang="hi-IN">ကို
မြင့်တင်ဖို့ ကတော့ </span></font><font face="Padauk">terminal
</font><font face="Padauk"><span lang="hi-IN">မှ တစ်ဆင့်
</span></font><font face="Padauk">'composer update'
</font><font face="Padauk"><span lang="hi-IN">လေးလုပ်လိုက်ရုံဖြင့်
မြင့်တင်လို့ရပါတယ်။ </span></font><font face="Padauk">##
version 4.1.25 </font><font face="Padauk"><span lang="hi-IN">မှ
</span></font><font face="Padauk">4.1.26 </font><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း </span></font><font face="Padauk">Laravel
4.1.26 </font><font face="Padauk"><span lang="hi-IN">ကတော့
</span></font><font face="Padauk">'remember me' cookies </font><font face="Padauk"><span lang="hi-IN">အတွက်
</span></font><font face="Padauk">security </font><font face="Padauk"><span lang="hi-IN">အတွက်
ထုတ်ပေးထားတဲ့ </span></font><font face="Padauk">version
</font><font face="Padauk"><span lang="hi-IN">ဖြစ်ပါတယ်။အရင်တုန်းကဆိုရင်
</span></font><font face="Padauk">user browser</font><font face="Padauk"><span lang="hi-IN">မှတဆင့်
</span></font><font face="Padauk">remember cookie </font><font face="Padauk"><span lang="hi-IN">ကို
တိုက်ခိုက်သူတယောက်ယောက်ရသွားပြီဆိုရင်
</span></font><font face="Padauk">user </font><font face="Padauk"><span lang="hi-IN">က
အကောင့်ရဲ့ </span></font><font face="Padauk">password
</font><font face="Padauk"><span lang="hi-IN">ပြောင်းတာသို
့မဟုတ် </span></font><font face="Padauk">logged ou
</font><font face="Padauk"><span lang="hi-IN">ပြုလုပ်ခဲ့ရင်တောင်မှ
အဲဒီ </span></font><font face="Padauk">cookie </font><font face="Padauk"><span lang="hi-IN">ရဲ့
သက်တမ်းတခုထိကို တိုက်ခိုက်သူက
သုံးပြုနိုင်မှာဖြစ်ပါတယ်။
အဲဒီကာကွယ်မူအတွက် </span></font><font face="Padauk">'remember_token'
</font><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font><font face="Padauk">column </font><font face="Padauk"><span lang="hi-IN">ကို
</span></font><font face="Padauk">'users' table
</font><font face="Padauk"><span lang="hi-IN">မှာထည့်ပေးရပါတယ်။အဲဒီလိုထည့်လိုက်ပြီဆိုရင်တော့
</span></font><font face="Padauk">user login </font><font face="Padauk"><span lang="hi-IN">ပြုလုပ်တိုင်း
ဝင်လိုက်တဲ့ </span></font><font face="Padauk">account
</font><font face="Padauk"><span lang="hi-IN">အတွက် </span></font><font face="Padauk">token
</font><font face="Padauk"><span lang="hi-IN">အသစ်တွေထုတ်ပေးသွားပါလိမ့်မယ်။
</span></font><font face="Padauk">User </font><font face="Padauk"><span lang="hi-IN">က
</span></font><font face="Padauk">logs out </font><font face="Padauk"><span lang="hi-IN">လုပ်လိုက်ရင်လဲ
</span></font><font face="Padauk">token
</font><font face="Padauk"><span lang="hi-IN">အသစ်ထုတ်ပေးသွားပါလိမ့်မယ်။အခုလိုမျိုး
ပြုလုပ်လိုက်တဲ့အတွက် </span></font><font face="Padauk">user
</font><font face="Padauk"><span lang="hi-IN">ရဲ့ </span></font><font face="Padauk">cookie
</font><font face="Padauk"><span lang="hi-IN">ပါသွားရင်တောင်မှ
အကောင့်ကို </span></font><font face="Padauk">logs
out </font><font face="Padauk"><span lang="hi-IN">လိုက်ရုံဖြင့်
တိုက်ခိုက်သူရထားတဲ့ </span></font><font face="Padauk">cookie
</font><font face="Padauk"><span lang="hi-IN">က
အလုပ်လုပ်မှာမဟုတ်တော့ပါဘူး။
</span></font><font face="Padauk">### Upgrade Path </font><font face="Padauk"><span lang="hi-IN">ပထမဆုံး
</span></font><font face="Padauk">'remember_token'(VARCHAR(100),
TEXT,) </font><font face="Padauk"><span lang="hi-IN">ကို
</span></font><font face="Padauk">'users' tale </font><font face="Padauk"><span lang="hi-IN">ထဲကိုထည့်ပေးပါ။
ပြီးရင်တော့ သင်က </span></font><font face="Padauk">Eloquent
</font><font face="Padauk"><span lang="hi-IN">ရဲ ့</span></font><font face="Padauk">authentication
driver </font><font face="Padauk"><span lang="hi-IN">သုံးပြုတယ်ဆိုရင်တော့
အောက်ကပုံစံအတိုင်း </span></font><font face="Padauk">'User'
class </font><font face="Padauk"><span lang="hi-IN">ကို
ပြင်ပေးဖို့လိုပါတယ်။ </span></font><font face="Padauk">public
function getRememberToken() { return $this-&gt;remember_token; }
public function setRememberToken($value) { $this-&gt;remember_token =
$value; } public function getRememberTokenName() { return
'remember_token'; } &gt; **</font><font face="Padauk"><span lang="hi-IN">မှတ်ချက်</span></font><font face="Padauk">**
</font><font face="Padauk"><span lang="hi-IN">အပေါ်ကလိုမျိုး
</span></font><font face="Padauk">&quot;remember token&quot;
</font><font face="Padauk"><span lang="hi-IN">ထည့်လိုက်ပြီဆိုရင်တော့
လက်ရှိအလုပ်လုပ်နေတဲ့
</span></font><font face="Padauk">'remember me' sessions
</font><font face="Padauk"><span lang="hi-IN">တွေအားလုံးအလုပ်လုပ်မှာမဟုတ်တော့ပါဘူး။
ဒါကြောင့် </span></font><font face="Padauk">useraccount
</font><font face="Padauk"><span lang="hi-IN">အကောင့်တွေ
အကုန်လုံး </span></font><font face="Padauk">login
</font><font face="Padauk"><span lang="hi-IN">ပြန်လုပ်ပေးဖို
့လိုအပ်ပါတယ်။ </span></font><font face="Padauk">###
Package Maintainers `Illuminate\Auth\UserProviderInterface` interface
</font><font face="Padauk"><span lang="hi-IN">ကို
ညွန်ကြားချက်</span></font><font face="Padauk">(method)</font><font face="Padauk"><span lang="hi-IN">နှစ်ခုထည့်ပေးဖို့လိုပါတယ်။သာမန်သုံးပြုပုံတွေကိုတော့
</span></font><font face="Padauk">default drivers
</font><font face="Padauk"><span lang="hi-IN">တွေမှာတွေ့နိုင်ပါတယ်။
</span></font><font face="Padauk">public function
retrieveByToken($identifier, $token); public function
updateRememberToken(UserInterface $user, $token);
`Illuminate\Auth\UserInterface` </font><font face="Padauk"><span lang="hi-IN">မှာလဲ
</span></font><font face="Padauk">&quot;upgrade path' </font><font face="Padauk"><span lang="hi-IN">မှာဖော်ပြထားတဲ့
</span></font><font face="Padauk">method </font><font face="Padauk"><span lang="hi-IN">သုံးခုကို
လက်ခံရရှိမှာဖြစ်ပါတယ်။ </span></font><font face="Padauk">##
version 4.0 </font><font face="Padauk"><span lang="hi-IN">မှ </span></font><font face="Padauk">4.1
</font><font face="Padauk"><span lang="hi-IN">သို့
မြင့်တင်ခြင်း </span></font><font face="Padauk">###
Upgrading Your Composer Dependency laravel 4.1 </font><font face="Padauk"><span lang="hi-IN">ကိုမြင့်တင်ဖို့အတွက်
</span></font><font face="Padauk">'composer.json'
</font><font face="Padauk"><span lang="hi-IN">ဖိုင်ထဲက</span></font><font face="Padauk">'larave/framework'
version </font><font face="Padauk"><span lang="hi-IN">ကို
</span></font><font face="Padauk">'4.1.*' </font><font face="Padauk"><span lang="hi-IN">ပြောင်းပေးရပါမယ်။
</span></font><font face="Padauk">### Replacing Files
'public/index.php' </font><font face="Padauk"><span lang="hi-IN">ဖိုင်ကို
</span></font><font face="Padauk">[</font><font face="Padauk"><span lang="hi-IN">ဒီလင့်မှာသွားကြည့်ပြီးအကုန်ကူးထည့်ပါ။</span></font><font face="Padauk">](https://github.com/laravel/laravel/blob/master/public/index.php).
'artisan' </font><font face="Padauk"><span lang="hi-IN">ဖိုင်ကိုလဲ
</span></font><font face="Padauk">[</font><font face="Padauk"><span lang="hi-IN">ဒီလင့်မှာသွားကြည့်ပြီးကူးထည့်ပါ။</span></font><font face="Padauk">](https://github.com/laravel/laravel/blob/master/artisan).
### Adding Configuration Files &amp; Options 'app/config/app.php' </font><font face="Padauk"><span lang="hi-IN">ထဲက
</span></font><font face="Padauk">'aliases' </font><font face="Padauk"><span lang="hi-IN">နဲ့
</span></font><font face="Padauk">'providers'</font><font face="Padauk"><span lang="hi-IN">ကို
</span></font><font face="Padauk">update </font><font face="Padauk"><span lang="hi-IN">လုပ်ပေးဖို့လဲလိုပါတယ်။
</span></font><font face="Padauk">update </font><font face="Padauk"><span lang="hi-IN">ပြုလုပ်ဖို့အတွက်
</span></font><font face="Padauk">[</font><font face="Padauk"><span lang="hi-IN">ဒီလင့်မှာသွားကြည့်ပြီးကူးထည့်ပါ။</span></font><font face="Padauk">](https://github.com/laravel/laravel/blob/master/app/config/app.php).
</font><font face="Padauk"><span lang="hi-IN">သတိတစ်ခုထားရမှာက
အရင် </span></font><font face="Padauk">app.php </font><font face="Padauk"><span lang="hi-IN">ထဲက
</span></font><font face="Padauk">provider </font><font face="Padauk"><span lang="hi-IN">နဲ့
</span></font><font face="Padauk">alias </font><font face="Padauk"><span lang="hi-IN">တွေကို
ပြန်ထည့်ဖို့ မမေ့ဖို့ပါ။
</span></font><font face="Padauk">'app/config' </font><font face="Padauk"><span lang="hi-IN">ထဲမှာ
</span></font><font face="Padauk">remote.php
</font><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့ဖိုင်တစ်ခုဆောက်ပါ။ပြီးရင်
</span></font><font face="Padauk">[</font><font face="Padauk"><span lang="hi-IN">ဒီလင့်မှာ</span></font><font face="Padauk">](https://github.com/laravel/laravel/blob/master/app/config/remote.php)
</font><font face="Padauk"><span lang="hi-IN">သွားကြည့်ပြီး
အကုန်ကူးထည့်ပါ။ ပြီးရင်တော့
</span></font><font face="Padauk">'app/config/session.php' </font><font face="Padauk"><span lang="hi-IN">ထဲမှာ
</span></font><font face="Padauk">'expire_on_close' </font><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font><font face="Padauk">key </font><font face="Padauk"><span lang="hi-IN">တစ်ခုထည့်ပါ။
သူ ့ရဲ့ </span></font><font face="Padauk">value </font><font face="Padauk"><span lang="hi-IN">ကိုတော့
</span></font><font face="Padauk">'false' </font><font face="Padauk"><span lang="hi-IN">ပဲပေးထားပါ။
နောက်တစ်ခုကတော့ </span></font><font face="Padauk">'app/config/queue.php'
</font><font face="Padauk"><span lang="hi-IN">ထဲမှာ
</span></font><font face="Padauk">'failed' </font><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font><font face="Padauk">key </font><font face="Padauk"><span lang="hi-IN">နဲ့
</span></font><font face="Padauk">value </font><font face="Padauk"><span lang="hi-IN">ကို
အောက်ကပုံစံအတိုင်းထည့်ပါ။
</span></font><font face="Padauk">'failed' =&gt; array( 'database' =&gt;
'mysql', 'table' =&gt; 'failed_jobs', ), </font><font face="Padauk"><span lang="hi-IN">နောက်တစ်ခုအနေနဲ့
</span></font><font face="Padauk">'app/config/view.php' </font><font face="Padauk"><span lang="hi-IN">ထဲက
</span></font><font face="Padauk">'pagination' </font><font face="Padauk"><span lang="hi-IN">ရဲ့
</span></font><font face="Padauk">value </font><font face="Padauk"><span lang="hi-IN">ကို
</span></font><font face="Padauk">`pagination::slider-3` </font><font face="Padauk"><span lang="hi-IN">သို
့ပြောင်းထည့်ပါ။ </span></font><font face="Padauk">###
Controller Updates </font><font face="Padauk"><span lang="hi-IN">တကယ်လို့
</span></font><font face="Padauk">'app./controllers/BaseController.php'
</font><font face="Padauk"><span lang="hi-IN">ထဲမှာ </span></font><font face="Padauk">'use'
</font><font face="Padauk"><span lang="hi-IN">သုံးပြုထားရင်တော့
</span></font><font face="Padauk">`use
Illuminate\Routing\Controllers\Controller;` </font><font face="Padauk"><span lang="hi-IN">ကို
</span></font><font face="Padauk">`use
Illuminate\Routing\Controller;`</font><font face="Padauk"><span lang="hi-IN">သို
့ပြောင်းပေးရပါမယ်။ </span></font><font face="Padauk">###
Password Reminders Updates Password reminders </font><font face="Padauk"><span lang="hi-IN">အတွက်ကတော့
ပိုပြီး ဆင်ပြေလွယ်ကူဖို့အတွက်
ပြန်ဆင်ပေးထားပါတယ်။ </span></font><font face="Padauk">'php
artisan auth:reminders-controller' </font><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font><font face="Padauk">Artisan command </font><font face="Padauk"><span lang="hi-IN">သုံးပြီး
စမ်းသပ်နိုင်ပါတယ်။ </span></font><font face="Padauk">laravel
</font><font face="Padauk"><span lang="hi-IN">ရဲ့ </span></font><font face="Padauk">documentation
</font><font face="Padauk"><span lang="hi-IN">ကိုလဲ
</span></font><font face="Padauk">[</font><font face="Padauk"><span lang="hi-IN">ဒီမှာ</span></font><font face="Padauk">](/docs/security#password-reminders-and-reset)</font><font face="Padauk"><span lang="hi-IN">သွားလေ့လာပြီး
ကိုယ့်</span></font><font face="Padauk">application </font><font face="Padauk"><span lang="hi-IN">ကို
လိုအပ်သလို ထပ်ထည့်နိုင်ပါတယ်။
 </span></font><font face="Padauk">'app/lang/en' </font><font face="Padauk"><span lang="hi-IN">ထဲက
</span></font><font face="Padauk">reminders.php </font><font face="Padauk"><span lang="hi-IN">ဖိုင်ကိုလဲ
</span></font><font face="Padauk">[</font><font face="Padauk"><span lang="hi-IN">ဒီလင့်မှာ</span></font><font face="Padauk">](https://github.com/laravel/laravel/blob/master/app/lang/en/reminders.php)
</font><font face="Padauk"><span lang="hi-IN">သွားဖတ်ပြီး
ပြင်ထည့်လိုက်ပါ။ </span></font>
</p>
<p style="margin-bottom: 0in"> <font face="Padauk">### Environment
Detection Updates Application </font><font face="Padauk"><span lang="hi-IN">ရဲ
့လုံခြံုရေးပိုင်းဆိုင်ရာအတွက်
</span></font><font face="Padauk">URL domains </font><font face="Padauk"><span lang="hi-IN">သုံးပြုပြီး
</span></font><font face="Padauk">application enviornment
</font><font face="Padauk"><span lang="hi-IN">စစ်ဆေးခြင်းကို
ရပ်ဆိုင်းလိုက်ပါတယ်။အဲဒီလိုသုံးပြုချင်းက
တိုက်ခိုက်သူတွေအတွက် </span></font><font face="Padauk">request
</font><font face="Padauk"><span lang="hi-IN">ရဲ ့ </span></font><font face="Padauk">enviornment
</font><font face="Padauk"><span lang="hi-IN">ကိုပြောင်းလဲနိုင်ခြင်း
သို ့မဟုတ် အလွယ်တကူ
ပြောင်းလဲနိုင်ခြင်းကြောင့်
ရပ်ဆိုင်းရခြင်းဖြစ်ပါတယ်။
</span></font><font face="Padauk">enviornment </font><font face="Padauk"><span lang="hi-IN">စစ်ဆေးခြင်းအတွက်
</span></font><font face="Padauk">user </font><font face="Padauk"><span lang="hi-IN">သုံးပြုနေတဲ့
စက်ရဲ ့</span></font><font face="Padauk">hostname</font><font face="Padauk"><span lang="hi-IN">ကိုသုံးပြု
ပြီးစစ်ဆေးသင့်ပါတယ်။ </span></font><font face="Padauk">(
MAC, Linux, Windows </font><font face="Padauk"><span lang="hi-IN">တွေမှာ
</span></font><font face="Padauk">'hostname' command </font><font face="Padauk"><span lang="hi-IN">သုံးပြုပါတယ်</span></font><font face="Padauk">)
### Simpler Log Files Laravek </font><font face="Padauk"><span lang="hi-IN">မှာ
</span></font><font face="Padauk">'app/storage/logs/laravel.log'
</font><font face="Padauk"><span lang="hi-IN">ထဲမှာ </span></font><font face="Padauk">log
</font><font face="Padauk"><span lang="hi-IN">ဖိုင်တွေထုတ်ပေးပါတယ်။ဘယ်လိုပဲဖြစ်ဖြစ်
</span></font><font face="Padauk">'app/start' </font><font face="Padauk"><span lang="hi-IN">ထဲက
</span></font><font face="Padauk">'global.php' </font><font face="Padauk"><span lang="hi-IN">ထဲမှာ
လိုအပ်တဲ့ နေရာကိုပြောင်းလဲသုံးပြုနိုင်ပါသည်။
</span></font><font face="Padauk">### Removing Redirect Trailing
Slash 'bootstrap/start.php' </font><font face="Padauk"><span lang="hi-IN">ထဲမှာ
</span></font><font face="Padauk">`$app-&gt;redirectIfTrailingSlash()'
</font><font face="Padauk"><span lang="hi-IN">ဆိုတဲ့
</span></font><font face="Padauk">method </font><font face="Padauk"><span lang="hi-IN">ကို
ဖြုတ်ပစ်လိုက်ပါ။ အဲဒီအဆင့်က
ဒီ ဗားရှင်းမှာ မလိုအပ်တော့ပါဘူး။
ဘာလို့လဲဆိုတော့ သူ့အလုပ်လုပ်တဲ့
အတိုင်းတာကို </span></font><font face="Padauk">.htaccess
</font><font face="Padauk"><span lang="hi-IN">က
အလုပ်လုပ်ပေးသွားလို့ဖြစ်ပါတယ်။
ပြီးရင်တော့ </span></font><font face="Padauk">'public'
</font><font face="Padauk"><span lang="hi-IN">ဖိုဒါထဲက
</span></font><font face="Padauk">.htaccess </font><font face="Padauk"><span lang="hi-IN">ထဲက
စာတွေအကုန်ဖျက်ပြီး
</span></font><font face="Padauk">[</font><font face="Padauk"><span lang="hi-IN">ဒီလင့်</span></font><font face="Padauk">](https://github.com/laravel/laravel/blob/master/public/.htaccess)</font><font face="Padauk"><span lang="hi-IN">ကစာတွေ
ပြန်ကူးထည့်ပြီး သိမ်းပါ။
</span></font><font face="Padauk">### Current Route Access The
current route </font><font face="Padauk"><span lang="hi-IN">ကို
သုံးပြုဖို့အတွက် အရင်ကဆိုရင်
</span></font><font face="Padauk">`Route::getCurrentRoute()`
</font><font face="Padauk"><span lang="hi-IN">သုံးပြုပေမယ့်နေရာမှာ
ဒီဗားရှင်းမှာတော့
</span></font><font face="Padauk">`Route::current()` </font><font face="Padauk"><span lang="hi-IN">ကို
သုံးပြု ရပါတယ်။ </span></font><font face="Padauk">###
Composer Update </font><font face="Padauk"><span lang="hi-IN">အားလုံးပြီးသွားရင်တော့
</span></font><font face="Padauk">'composer update' </font><font face="Padauk"><span lang="hi-IN">ကွန်မန်းကို
</span></font><font face="Padauk">run </font><font face="Padauk"><span lang="hi-IN">လိုက်လို
့ရပါပြီ။ တကယ်လို ့</span></font><font face="Padauk">error
</font><font face="Padauk"><span lang="hi-IN">တစ်ခုခုပြရင်တော့
</span></font><font face="Padauk">`composer update --no-scripts` </font><font face="Padauk"><span lang="hi-IN">ကို
သုံးပြီး </span></font><font face="Padauk">update
</font><font face="Padauk"><span lang="hi-IN">ပြုလုပ်ရင်
ဆင်ပြေသွားပါပြီ။ </span></font><font face="Padauk">###
Wildcard Event Listeners The Wilecard event listenets </font><font face="Padauk"><span lang="hi-IN">က
တော့ ဒီဗားရှင်းမှာ </span></font><font face="Padauk">event
handler functions parameters</font><font face="Padauk"><span lang="hi-IN">တွေ
နဲ့ တွဲဖက်အလုပ်မလုပ်တော့ပါဘူး။တကယ်လို
့ဖျက်သိမ်းသွားတဲ့
</span></font><font face="Padauk">events</font><font face="Padauk"><span lang="hi-IN">တွေဖမ်းချင်ရင်တော့
</span></font><font face="Padauk">`Event::firing()` </font><font face="Padauk"><span lang="hi-IN">ကိုသုံးပြီး
ဖမ်းနိုင်ပါတယ်။ </span></font>
</p>
</body>
</html>