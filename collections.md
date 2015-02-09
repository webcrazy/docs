# Collections

- [အစပျိုး](#introduction)
- [အခြေခံအသုံးပြုပုံ](#basic-usage)

<a name="introduction"></a>
## အစပျိုး

Array တွေနဲ့ ပိုမိုအဆင်ပြေစွာ အလုပ်လုပ်နိုင်အောင် `Illuminate\Support\Collection` class ဆိုတဲ့ wrapper တစ်ခုပါဝင်ပါတယ်။ ဥပမာ အောက်က Code တွေကို တချက်ကြည့်ရအောင်။ ကျွန်တော်တို့ `collect` helper ကို အသုံးပြုပြီး array မှာ collection instance တစ်ခုကို အသစ်ပြုလုပ်မှာ ဖြစ်ပါတယ်။ 


$collection = collect(['taylor', 'abigail', null])->map(function($name)
{
return strtoupper($name);
})
->reject(function($name)
{
return is_null($value);
});

အထက်က Code မှာ မြင်သည့်အတိုင်း `Collection` class ကိုအသုံးပြုပြီး mapping နဲ့ reducing တို့ကို chain method တွေနဲ့ အသုံးပြုနိုင်ပါတယ်။ အသေးစိတ်ကို သိရှိလိုပါက ဆက်လက်ဖတ်ရှုပါရန်။ 

<a name="basic-usage"></a>
## အခြေခံအသုံးပြုပုံ

#### Collection တစ်ခု အသစ်ပြုလုပ်ခြင်း

ခုနက ဖော်ပြခဲ့သလို `collect` helper သည် `Illuminate\Support\Collection` instance အသစ်တစ်ခုကို return ပြန်လာမည် ဖြစ်သည်။ သင့်အနေဖြင့် `Collection` class မှ `make` command ကို အသုံးပြုနိုင်ပါသေးသည်။ 

$collection = collect([1, 2, 3]);

$collection = Collection::make([1, 2, 3]);

[Eloquent](/docs/5.0/eloquent) 

objects  များဟာလည်း ယခုအခါ `Collection` instance များ အဖြစ်သာ return ပြန်လာပြီ ဖြစ်ပြီး သို့သော် သင့် အသုံးတည့်သလို `Collection` class ကို အသုံးပြုနိုင်ပါသည်။ 

#### Collection အကြောင်းဖတ်ရှုရန် 

ဒီနေရာမှာ Collection ၏ မြောက်များလှသော method များကို ဖော်ပြမည့်အစား API documentation ကို [အောက်ပါလင့်](http://laravel.com/api/master/Illuminate/Support/Collection.html)! 
တွင် ဖတ်ရှုနိုင်ပါသည်။ 
