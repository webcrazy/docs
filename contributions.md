# Contribution Guide

- [Bug Reports](#bug-reports)
- [Core Development Discussion](#core-development-discussion)
- [Which Branch?](#which-branch)
- [Security Vulnerabilities](#security-vulnerabilities)
- [Coding Style](#coding-style)

<a name="bug-reports"></a>
## Bug Reports

ပိုမိုကောင်းမွန်အောင် လုပ်ဆောင်နိုင်ရန် Laravel တွင် bug report များကိုသာမက pull request များကို အထူးသဖြင့် အားပေးလျက်ရှိသည်။ "Bug reports”  များတွင် pull request အနေဖြင့်ပါဝင်နိုင်ပြီး unit test ပြုလုပ်ရတွင် fail ဖြစ်သည့် အကြောင်းအရာများပါ ပါဝင်နိုင်သည်။ 

သိုသော့် bug report ကိုပို့ပါက သင့်၏ အကြောင်းအရားကို သေချာရှင်းလင်းစွာ ရေးသားထားရန် လိုပေမည်။ ထိုအပြင် သက်ဆိုင်သော အချက်အလက်ကို ပါနိုင်သလောက် ပါစေနိုင်ပြီး issue တွင် code sample များပါပါဝင်ပါက ပိုကောင်းသည်။ bug report တင်ခြင်း အဓိက ရည်ရွယ်ချက်မှာ သင့်အတွက် ပိုမိုအဆင်ပြေစေရန် ၊ ကျန်သူများကလည်း သင့် BUG ကို စမ်းသပ်နိုင်ပြီး ပြင်ဆင်နိုင်ရန် ရည်ရွယ်ခြင်း ဖြစ်သည်။

သတိပြုရန်မှာ bug report များမှာ သင်ကိုယ်တိုင် တခြားသူများနဲ့ အတူတကွ ပြဿနာကို ရှင်းလင်းရန် ထုတ်ဖော်ပြသခြင်း ဖြစ်သည်။ အခြားသူများက အလိုအလျောက် ခုန်ပျံကျော်လွှားပြီး သင့်ပြဿာနာကို ဖြေရှင်း နိုင်ချင် နိုင်ပေမည်။ bug report များ ပြုလုပ်ခြင်းဖြင့် သင်ကဲ့သို့ ရင်ဆိုင်နေသော အခြား အသုံးပြုသူများနှင့် ပူပေါင်းဖြေရှင်းနိုင်မည် ဖြစ်သည်။ Laravel source code များကို github တွင် တွေ့နိုင်မည် ဖြစ်ပြီး Laravel projects ၏ တစ်ခုချင်းဆီသော အစိတ်အပိုင်းများကို အောက်ပါအတိုင်းတွေ့နိုင်မည်။ 


- [Laravel Framework](https://github.com/laravel/framework)
- [Laravel Application](https://github.com/laravel/laravel)
- [Laravel Documentation](https://github.com/laravel/docs)
- [Laravel Cashier](https://github.com/laravel/cashier)
- [Laravel Envoy](https://github.com/laravel/envoy)
- [Laravel Homestead](https://github.com/laravel/homestead)
- [Laravel Homestead Build Scripts](https://github.com/laravel/settler)
- [Laravel Website](https://github.com/laravel/laravel.com)
- [Laravel Art](https://github.com/laravel/art)

<a name="core-development-discussion"></a>
## Core Development Discussion

Bugs ၊ feature အသစ်များနှင့် လက်ရှိ feature ကိုအသုံးပြုခြင်းနှင့်ပတ်သတ်သည့် ဆွေးနွေးချက်များကို (Freenode) IRC-channel မှ
`#laravel-dev` တွင်ပြုလုပ်နိုင်သည်။  Laravel ၏ အဓိက ထိန်းသိမ်းသူ ဖြစ်သည့် Taylor Otwell အနေဖြင့် ကြားရက်များတွင် မနက်  ၈ နာရီ မှ ညနေ ၅ နာရီ အကြား (UTC-06:00 or အမေရိက/ချီကာဂို) စံတော်ချိန်တွင် တည်ရှိမည် ဖြစ်ပြီး အခြားအချိန်များတွင်လည်း တော်တော်များများ ရှိတက်ပါသည်။ ထို `#laravel-dev` IRC channel လူတိုင်း ဆွေးနွေးနိုင်ရန် ဖွင့်လှစ်ထား ခြင်း ဖြစ်ပြီး  ပါဝင်ကူညီဆွေနွေးလိုသည် ဖြစ်စေ ၊ ကြည့်ရှုလိုသည် ဖြစ်စေ ၊ ကြိုဆိုပါသည်။ 


<a name="which-branch"></a>
##ဘယ် Branch မှာတင်ရမှာလဲ?


bug fixes **အားလုံး**ကို နောက်ဆုံး stable release branch တွင် ပါဝင်လာမည် ဖြစ်သည်။ Bug fix များကို နောက် version တွင်ပါလာမည့် feature များကို fix ပြုလုပ်သည်မှတပါး `master` branch ပေါ်သို့ မတင်ရန် မေတ္တာရပ်ခံအပ်ပါသည်။ 


**fully backwards compatible** ဖြစ်ပြီး **အဓိကမကျသော** feature များကိုမူ latest stable branch များတွင်ပါဝင်လာမည် ဖြစ်သည်။ 


**အဓိကကျသော**  feature အသစ်များကိုမူ `master` branch သို့သာ အမြဲတမ်း pull request ပို့သင့်ပြီး Laravel Version အသစ် release လုပ်ပါက ပါဝင်လာမည် ဖြစ်သည်။ 

ကိုယ့် feature ကို အဓိကကျသည် မကျသည်ကို သိရှိလိုပါက `#laravel-dev` IRC channel (Freenode) တွင် Taylor Otwell ကို မေးနိုင်ပါသည်။ 

<a name="security-vulnerabilities"></a>
## Security Vulnerabilities


Laravel အတွင်း security vulnerability တစ်ခုတွေ့ရှိပါက ကျေးဇူးပြုပြီး Taylor Otwell  <a href="mailto:taylorotwell@gmail.com">taylorotwell@gmail.com</a> ဆီသို့ email ပို့ပါ  security vulnerabilities တိုင်းကို ဖော်ပြသွားမည် ဖြစ်သည်။ 

<a name="coding-style"></a>
## Coding Style

Laravel သည် [PSR-0](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-0.md) နှင့် [PSR-1](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-1-basic-coding-standard.md) coding standards များကို လိုက်နာထားသည်။ ၎င်း standards များ အပြင် အောက်ပါ Coding standards များကိုလည်း ဖြည့်စွက် လိုက်နာသင့်ပါသည်။ 


- class namespace ကြေညာချက်များသည် `<?php` နှင့် တလိုင်းတည်း တည်ရှိသင့်သည်။ 
- class အဖွင့် `{` သည် class name ကြေညာချက်နှင့် တလိုင်းတည်း ရှိရမည်။ 
- Functions နှင့် control structures များအနေဖြင့် Allman style braces ကို အသုံးပြုရမည်။
- tabs ဖြင့် indent လုပ်ပြီး spaces ဖြင့် align လုပ်ရမည်
