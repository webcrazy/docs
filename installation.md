# Installation

- [Install Composer](#install-composer)
- [Install Laravel](#install-laravel)
- [Server Requirements](#server-requirements)

<a name=“install-composer”></a>
## Install Composer

Laravel အတွက် လိုအပ်တဲ့ အစိတ်အပိုင်းတွေကို ထိန်းချုပ်ဖို့အတွက် Composer ကိုအသုံးပြုထားပါတယ်။ ဒါ့ကြောင့် Laravel ကိုအသုံးမပြုခင် ၊ သင့်စက်ထဲမှာ Composer ကို Install အရင်ပြုလုပ်ထားသင့်ပါတယ်။

<a name=“install-laravel”></a>
## Install Laravel

### Via Laravel Installer

အရင်ဆုံး Composer ကိုသုံပြီးတော့ Laravel install ကို Download လုပ်ပါ။

	composer global require “laravel/installer=~1.1”

သင့် System အနေနဲ့ `laravel` ကို ဖတ်လို့ရအောင် PATH ထဲမှာ `~/.composer/vendor/bin` ကို ထည့်သွင်းပေးထားဖို့ လိုအပ်ပါတယ်။

	Install လုပ်ပြီးသွားပြီဆိုတာနဲ့ ၊ `laravel new` လို့ Run လိုက်တာနဲ့ သင့် Directory ထဲမှာ Laravel အသစ်တစ်ခု ရရှိမှာဖြစ်ပါတယ်။ ဥပမာ `laravel new blog` လို့ Run မယ်ဆိုရင် `blog` ဆိုတဲ့ folder နဲ့ laravel အပါအဝင် Laravel ကလိုအပ်တဲ့ Package တွေပါ ပါပြီးသား Installation တစ်ခုကို ရရှိနိုင်ပါတယ်။ ဒီလိုနည်းလမ်းက Composer ကနေတစ်ဆင့် Install လုပ်တာထပ် ပိုပြီးတော့ မြန်ပါတယ်။

	laravel new blog

### Via Composer Create-Project

Composer ရဲ့ `create-project` ကို Terminal မှာ Run ပြီးတော့ Laravel ကို Install ပြုလုပ်နိုင်ပါသေးတယ်။

	composer create-project laravel/laravel —prefer-dist

<a name=“server-requirements”></a>

### Scaffolding
Larval မှာက User Registration နဲ့ Authentication တွေ အလိုလိုပါပြီးသားပါ။ အကယ်၍ မပါစေချင်ဘူးဆိုရင်တော့ `fresh` ဆိုတဲ့ Artisan command ကို Run ပေးရပါမယ်။

	php artisan fresh

## Server Requirements

ဒီ Laravel framework မှာ လိုအပ်တဲ့ System Requirement အချို့ရှိပါတယ်

- PHP >= 5.4
- Mcrypt PHP Extension
- OpenSSL PHP Extension
- Mbstring PHP Extension

PHP 5.5 ဖြစ်တာကြောင့် တစ်ချို့သော OS version တွေမှာ PHP JSON Extension ကို ကိုယ်တိုင် Install ပြုလုပ်ဖို့လိုပါလိမ့်မယ်။ Ubuntu သုံးတယ်ဆိုရင်တော့ `apt-get install php5-json` လို့ Run လိုက်တာနဲ့ ရပါတယ်။

<a name=“configuration”></a>
## Configuration

Laravel ကို Install လုပ်ပြီးပြီဆိုတာနဲ့ Application key ကို ကျပန်းစလုံးတွေနဲ့ သတ်မှတ်ပေးရပါမယ်။ Laravel ကို Composer ကနေ Install လုပ်ထားတာဆိုရင် တစ်ခါတည်း `key:generate` ကိုသုံးပြီး အလိုအလျောက် သတ်မှတ်ပေးပြီးသား ဖြစ်ပါလိမ့်မယ်။

ပုံမှန်အားဖြင့်တော့ ၊ အဲဒီ Key က ၃၂ လုံးခန့် ရှိပါတယ်။ Key ကို `.env` ဖိုင်ထဲမှာ သတ်မှတ်နိုင်ပါတယ်။ **Application Key မသတ်မှတ်ဘူးဆိုရင်တော့ ၊ သင့်ရဲ့ User Sessions နဲ့ တစ်ခြားသော Encrypt လုပ်ထားတဲ့ အချက်အလက်တွေ လုံခြုံမှူမရှိနိုင်ပါဘူး**

Laravel မှာ တစ်ခြားသော Configuration တွေမလိုအပ်ဘဲ Development ကိုစတင်နိုင်ပါတယ်။ ဒါပေမယ့်လဲ `config/app.php` ဖိုင်နဲ့ သူ့ရဲ့ Documentation ကို တစ်ချက်လောက် လိုက်ကြည့်သင့်ပါတယ်။ အဲ့ထဲမှာ `timezone` နဲ့ `locale` အစရှိတဲ့ Option တွေပါဝင်ပါတယ်။

Laravel ကို install လုပ်ပြီးပြီဆိုတာနဲ့ [သင့်ရဲ့ local environment ကို ဖွဲစည်းပေးသင့်ပါတယ်။](/docs/5.0/configuration#environment-configuration)

> **သတိပြုရန်:** `app.debug` ကို Production application မှာ `true` လို့သတ်မှတ်မပေးသင့်ပါဘူး

<a name=“permissions”></a>
### Permissions

Laravel မှာ တစ်ချို့သော Permission တွေ သတ်မှတ်ပေးဖို့တော့ လိုအပ်ပါလိမ့်မယ်။ `storage` ထဲမှာရှိတဲ့ folder တွေအားလုံး web server ကနေ Write လုပ်လို့ရရပါမယ်။
<a name=“pretty-urls”></a>

## Pretty URLs

### Apache

ဒီ Framework မှာ `index.php` မပါဘဲ အလုပ်လုပ်အောင်လို့ `public/.htaccess` ဖိုင်ကိုသုံးပါတယ်။ သင့် Application idk Apache နဲ့ Run တာဆိုရင်တော့ `mod_rewrite` module ကို ဖွင့်ပေးထားဖို့ လိုအပ်ပါတယ်။

Laravel မှာပါပြီးသား `.htaccess` ဖိုင်က သင့် Apache မှာ အလုပ်မလုပ်ဘူးဆိုရင် အောင်ကအတိုင်းထည့်ပြီး Run ကြည့်ပါ

	Options +FollowSymLinks
	RewriteEngine On

	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteRule ^ index.php [L]

### Nginx

Nginx မှာဆိုရင်တော့ အောက်ကအတိုင်း ထည့်ပြီးသုံးနိုင်ပါတယ်။

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

[Homestead](/docs/5.0/homestead) ကိုသုံးတာဆိုရင်တော့ ၊ Configuration အလိုအလျောက် လုပ်ပေးပါလိမ့်မယ်။