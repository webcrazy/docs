## Artisan CLI

- [မိတ္ဆက္](#introduction)
- [အသုုံးျပဳပုုံ](#အသုုံးျပဳပုုံ)

<a name="introduction"></a>
## မိတ္ဆက္

Artisan သည္ laravel တြင္အသုုံးျပဳသည့္ command line interface တစ္ခုုျဖစ္သည္။ ၄င္းတြင္ application develop ျပဳလုုပ္ရာတြင္ အလြန္အသုုံးဝင္လွေသာ commands မ်ားစြာပါဝင္သည္။ ၄င္းမွာ Symfony ၏ console component မွဆင္းသက္လာျခင္း ျဖစ္သည္။


<a name="usage"></a>
## အသုုံးျပဳပုုံ

#### အသုုံးျပဳႏုုိင္သည့္ Command မ်ားကုုိ စီရီျပသျခင္း

Artisan တြင္ပါဝင္သည့္ Command အကုုန္လုုံးကုုိ list အေနျဖင့္ ျပသလုုိပါက `list` ဟုုသည့္ command ကုုိ အသုုံးျပဳႏုုိင္သည္။

	php artisan list

#### Command  တစ္ခုုခ်င္း၏ အသုုံးျပဳျခင္း လမ္းညြန္မႈကုုိ ၾကည့္ရႈျခင္း 

Command တုုိင္းလုုိလုုိ တြင္ “help” ဟုု အပုုိေဆာင္း ရုုိက္ျခင္း ျဖင့္ မိမိတုုိ ့ အသုုံးျပဳမည့္ Command တြင္ ထည့္သြင္းရမည့္ arguments မ်ားႏွင့္ ေရြးခ်ယ္စရာမ်ားကုုိ သိရွိႏုုိင္ပါသည္။

	php artisan help migrate

#### Configuration Environment ကုုိ သတ္မွတ္ျခင္း

မိမိတုုိ ့ အသုုံးျပဳလုုိသည္ Configuration Environment ကုုိ —env ဟုုေသာ  switch ျဖင့္ ေရြးခ်ယ္သတ္မွတ္ႏုုိင္သည္။ 


	php artisan migrate --env=local

#### လက္ရွိ အသုုံးျပဳေနသည့္ Laravel version ကိုုေဖာ္ျပျခင္း

မိမိတုုိ ့လက္ရွိအသုုံးျပဳေနသည့္ Laravel version ကုုိ သိရွိလုုိပါက —switch ကုုိ အသုုံးျပဳျပီး  သိရွိႏုုိင္ပါသည္။ 
 

	php artisan --version
