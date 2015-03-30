# Laravel Homestead

- [Introduction](#introduction)
- [Included Software](#included-software)
- [Installation & Setup](#installation-and-setup)
- [Daily Usage](#daily-usage)
- [Ports](#ports)

<a name="introduction"></a>
## Introduction

သင့်ရဲ့ PHP Development environment ကို local development environment မှာပါ ကြည်နူးသာယာဖွယ်ကောင်းအောင်Laravel က အကောင်းဆုံးကြိုးစားအားထုတ်မှူတစ်ခုလုပ်ခဲ့ပါတယ်။ Vagrant ကသင့်ရဲ့ Virtual Machine တွေကို လွယ်လွယ်ကူကူ ထိန်းသိမ်း နိုင်အောင် သင့်ကိုထောက်ပံ့ ပေးထားပါတယ်။

Laravel Homestead က official ပါ၊ Vagrant "box" မှာ ကြို ပြီး package လုပ်ထားတာပါ... နောက် အဲဒါကသင့်ကို development environment တစ်ခု တည်ဆောက်တဲ့နေရာမှာ PHP, a web server, နဲ့ အခြားအသုံးဝင်တဲ့ tools တွေကို သင့်ရဲ့ local machine မှာ install လုပ်စရာမလိုပါဘူး။ ဘယ် Opearting System ကိုသုံးတယ်ဆိုတာကိုလည်း worry များစရာမလိုတော့ပါဘူး။ Vagrant boxes တွေနဲ့ဘဲ အသုံးပြုလို့ရပါတယ်။ တကယ်လို့တစ်ခုခုမှားသွားတယ်ဆိုရင် vagrant boxes တွေကိုမိနစ်အနည်းငယ်အတွင်း destory လုပ်ပြီးတော့ ပြန်ပြီး create လုပ်နိုင်ပါတယ်။

Homestead က မည်သည့် Window, Mac, Linux မှာမဆို run ပါတယ်။ Homesead မှာ Nginx web server, PHP 5.5, MySQL, Postgres, Redis, Memcached နဲ့ အခြား Laravel application အတွက် အသုံးဝင်တာတွေပါဝင်ပါတယ်။

> **Note:** If you are using Windows, you may need to enable hardware virtualization (VT-x). It can usually be enabled via your BIOS.

လောလောဆယ် Homestead ကို Vagrant 1.6 မှာ built and test လုပ်ထားပါတယ်။

<a name="included-software"></a>
## Homestead မှာပါဝင်သော Software များ

- Ubuntu 14.04
- PHP 5.6
- HHVM
- Nginx
- MySQL
- Postgres
- Node (With Bower, Grunt, and Gulp)
- Redis
- Memcached
- Beanstalkd
- [Laravel Envoy](/docs/ssh#envoy-task-runner)
- Fabric + HipChat Extension

<a name="installation-and-setup"></a>
## Installation & Setup

### Installing VirtualBox & Vagrant

သင်အနေနဲ့ Homestead environment ကိုမဖွင့်ခင် [VirtualBox](https://www.virtualbox.org/wiki/Downloads) နဲ့ [Vagrant](http://www.vagrantup.com/downloads.html) ကို install လုပ်ထားရပါ့မယ်။ ဒီ software နှစ်ခုပေါင်းပြီး popular operating systems များကိုလွယ်ကူစွာ virtual install လုပ်လို့ရပါမည်။


### Vagrant Box များထည့်ခြင်း

VirtualBox နဲ့ Vagrant ကို install လုပ်ပြီးပြီဆိုရင် ပထမဆုံး သင့်ရဲ့ Vagrant installation မှာ `laravel/homestead` လို့ terminal ကနေ run ပြီး Laravel ရဲ့ Homestead ကို Virtual Box မှာ add လိုက်ပါ။ Laravel ရဲ့ Homestead box ကို download လုပ်ဖို့အတွက် သင့်အင်တာနက် conn ပေါ်မူတည်ပြီး အချိကြာပါ့မယ်

	vagrant box add laravel/homestead

### Installing Homestead

#### Git ကနေ Manual install လုပ်ခြင်း (No Local PHP)

သင့်အနေနဲ့ PHP ကိုသင့်စက်ထဲမှာ install လုပ်မထားချင်ဘူး  Homestead repo ကို manually clone လုပ်ပြီးတော့ Homestead ကို install လုပ်ချင်တယ်ဆိုရင်တော့ Homestead repo ကို clone လုပ်လိုက်ပါ၊ ( Homestead repo ကို install လုပ်တဲ့နေရာက Home directory ထဲမှာလို့မှတ်ယူပါ့မယ်။) Homestead box က သင့်ရဲ့ laravel နဲ့ PHP projects တွေကို serve လုပ်ပါလိမ့်မယ်:

	git clone https://github.com/laravel/homestead.git Homestead

သင့်အနေနဲ့ Homestead CLI tool ကို install လုပ်ပြီးသွားပြီဆိုရင်တော့ `bash init.sh` ဆိုတဲ့ command ကို run လိုက်ရင် `Homestead.yaml` configuration ကို create လုပ်ပေးပါလိမ့်မယ်

	bash init.sh

`Homestead.yaml` file က `~/.homestead` directory မှာ ရှိနေပါလိမ့်မယ်

#### Composer နဲ့ PHP Tool

သင့် vagrant installation မှာ box added ပြီးပြီဆိုရင်တော့ Homestead CLI tool ကို Composer `global` command သုံးပြီးတော့ install လုပ်ဖို့အဆင်သင့်ဖြစ်ပါပြီ

	composer global require "laravel/homestead=~2.0"

သင် `homestead` command ကို terminal ကနေမ run ခင် သင့်ရဲ့ `~/.composer/vendor/bin` directory PATH က `homestead`  လို့ခေါ်လို့ရအောင်အရင်လုပ်ထားရပါ့မယ်

သင် Homestead CLI tool ကို Install လုပ်ထားပြီးပြီဆိုရင် `Homestead.yaml` file create လုပ်ဖို့ရာအတွက် `init` command ကို run ပေးရပါမယ်:

	homestead init

`Homestead.yaml` က `~/.homestead` directory ထဲမှာတည်ရှိရမှာပါ။ သင်က Mac ဒါမှမဟုတ် Linux system ကိုသုံးတယ်ဆိုလို့ရှိရင် `Homestead.yaml` file ကိုပြင်ဆင်ချင်တယ်ဆိုရင် terminal ကနေ`homestead edit` command ကို run ပြီးပြင်ဆင်နိုင်ပါတယ်

	homestead edit

### Set Your SSH Key

ပြီးရင်တော့သင် download လုပ်ထားတဲ့ repository ထဲမှာပါတဲ့ `Homestead.yaml` file ကို edit လုပ်သင့်ပါတယ်။ ဒီ file ထဲမှာဆိုရင် သင်ရဲ့ public SSH key တို့ နောက် သင့်ရဲ့ main machine နဲ့ Homestead virtual machine တို့ကို share တဲ့ Folder တို့ကို configure လုပ်နိုင်ပါတယ်

သင့်မှာ SSH key မရှိဘူးလား၊ သင်က Linux ဒါမှမဟုတ် Mac မှာဆိုရင် အောက်မှာဖော်ပြထားတဲ့ command ကို run လိုက်တာနဲ့ ssh key တစ်စုံကိုသင့်အတွက်ဖန်တီးပေးပါလိမ့်မယ်

	ssh-keygen -t rsa -C "you@homestead"


Windows မှာဆိုရင် သင်အနေနဲ့ [Git](http://git-scm.com/) ကို install လုပ်ပြီးတော့ `Git Bash` မှာ အထက်က command ကို run ပြီးတော့ အဆင်ပြေပါတယ်။ အဲလိုမှမဟုတ်ဘူးဆိုရင်လည်း [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) and [PuTTYgen](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) တို့ကိုအသုံးပြုနိုင်ပါတယ်။

သင် SSH Key ကို create လုပ်ပြီးပြီဆိုရင် `Homestead.yaml ` file ထဲက authorize ဆိုတဲ့ လမ်းကြောင်းထဲမှာ သင့်ရဲ့ SSH Key ရဲ့ path ကိုသတ်မှတ်လိုက်ပါ။

### သင့် Shar လုပ်ထားတဲ့ Folders များကို Configure လုပ်ခြင်း

`Homestead.yaml` file ထဲမှာ သင် share လုပ်ထားတဲ့ `folders` တွေအကုန်လုံးကို list တစ်ခုလိုတွေ့ရမှာဖြစ်ပါတယ်။ အဲ့ဒီ့ folder ထဲက Files တွေပြောင်းသွားရင် သင့် local machine နဲ့ Homestead environment ကိုအဲ့ဒါတွေက sync လုပ်ပေးပါလိမ့်မယ်။ သင့်အနေနဲ့ share folders တွေကိုလိုအပ်သလောက်ထက်မံ configure လုပ်နိုင်ပါတယ်။

### Configure Your Nginx Sites

Nginx နဲ့သိပ်မရင်းနှီးဘူးမဟုတ်လား ပြသနာမရှိပါဘူး။ `sites` တွေကသင့်ရဲ့ Homestead environment က Folders တွေကို "domain" ဆီကိုလွယ်ကူစွာ map ပေးပါလိမ့်မယ်။ Site configuration တစ်ခုကို Homestead.yaml မှာတွေ့နိုင်ပါတယ်။ သင့်အနေနဲ့ sites အများကြီးကိုသင့်ရဲ့ Homestead မှာထည့်ချင်ပါလိမ့်မယ်၊ Homestad က သင့်virtualized Laravel Projects တွေရဲ့ environment တွေကို အဆင်ပြေစေပါလိမ့်မယ်။

သင့်အနေနဲ့ Homestead နဲ့ run သမျှ site အကုန်လုံးကို [HHVM](http://hhvm.com) ကိုအသုံးပြုစေချင်ရင် `hhvm` option ကို `true` ပေးထားလိုက်ပါ:

	sites:
	    - map: homestead.app
	      to: /home/vagrant/Code/Laravel/public
	      hhvm: true

### Bash Aliases

သင့် Homestead box မှာ Bash a`liases` တွေထက်ထည့်ချင်ရင် `~/.homestead` directory ထဲက `aliases` file မှာထက်ထည့်နိုင်ပါတယ်

### VagrantBox ကိုစတင်ခြင်း

`Homestead.yaml` file မှာသင့်ရဲ့ link တွေကို edit လုပ်ပြီးပြီဆိုရင် သင့်ရဲ့ `Homestead` directory ထဲမှာ `vagrant up` ဆိုပြီး terminal ကနေ run လိုက်ပါ။ Vagrant က Virtual Machine ကို boot လုပ်ပါ့လိမ့်မယ် ပြီးရင်တော့ သင့်ရဲ့ share folders နဲ့ Nginx sites တွေကို auto configure လုပ်သွားပါလိမ့်မယ်။

To destroy the machine, you may use the `vagrant destroy --force` command.

သင့်ရဲ့ Nginx sites တွေအတွက် "domain" တွေကို သင်ရဲ့ local machine က hosts မှာထက်ပေါင်းထည့်ဖို့မမေ့ပါနဲ့ဦး။ hosts file ကသင့် local machine က requests တွေကို Homestead ဆီကို redirect လုပ်ပေးပါလိမ့်မယ်။ Mac နဲ့ linux မှာ ဆိုရင် hosts file က `/etc/hosts` ထဲမှာပြင်လို့ရပါတယ်။ Window မှာဆိုရင်တော့ `C:\Windows\System32\drivers\etc\hosts` မှာရှိပါတယ်။ သင်ထက်ပေါင်းထည့်ရမယ့် line က အောက်ကလိုဖြစ်ပါလိမ့်မယ်၊:

	192.168.10.10  homestead.app

သင့် Ip နဲ့ `Homestead.yaml` file ထဲက IP နဲ့ညီညီသေချာအောင်လုပ်ပါ။ သင့် domain ကို`hosts` file မှာပေါင်းထည့်ပြီးပြီဆိုရင်, site ကိုသင့် browser ကနေ access လုပ်လို့ရပါပြီ!

	http://homestead.app

သင်ရဲ့ database တွေကိုဘယ်လို connect လုပ်မလဲဆိုတာကို လေ့လာဖို့ ဆက်ဖတ်ပါဦး။

<a name="daily-usage"></a>
## နေ့စဉ်အသုံးပြုမှူ

### SSH ကို connect လုပ်ခြင်း


သင့်ရဲ့ Homestead environment ကို SSH ကနေ connect လုပ်ချင်တယ်ဆိုရင် သင့် Homestead directory ကနေ `vagrant ssh` command ကို run လိုက်ပါ

သင့် Homestead machine ဆီကိုသင်ခဏခဏဝင်ရပါလိမ့်မယ် ဒါ့ကြောင့် သင့် host machine မှာ "alias" ဘယ်လို create လုပ်လဲဆိုတာအောက်မှာကြည့်လိုက်ပါ...

	alias vm="ssh vagrant@127.0.0.1 -p 2222"

သင်ဒီ alias ကို create လုပ်ပြီးသွားပြီဆိုလို့ရှိရင် vm လို့ terminal ကနေရိုက်လိုက်လို့ရှိရင် သင့် Homestead machine ထဲကို သင့် system ရဲ့မည်သည့်နေရာကမဆိုဝင်နိုင်ပါလိမ့်မယ်။

### သင့်ရဲ့ Databases များကို connect လုပ်ခြင်း

`homestead` database တစ်ခုက MySQL နဲ့ Postgres နှစ်ခုရွေးချယ်စရာရှိဖို့ရန် configure လုပ်ထားပါတယ်။ ဒါ့ထက်ပိုအဆင်ပြေဖို့ရာအတွက် Laravel ရဲ့ `local` database ကို default အနေနဲ့ configurate လုပ်ထားပေးပါတယ်။

သင့် MySQl ဒါမှမဟုတ် Postgres database ကိုသင့် main machine ကို Navicat ဒါမှမဟုတ် Seque Pro ကနေ ချိတ်ဆက်ရန်အတွက် MySQL မှာဆို `172.0.0.1` port 33060 ကနေချိတ်ဆက်သင့်ပြီးတော့  Postgres အတွက်ကတော့ port 54320ကနေချိတ်ဆက်သင့်ပါတယ်။

> **Note:** You should only use these non-standard ports when connecting to the databases from your main machine. You will use the default 3306 and 5432 ports in your Laravel database configuration file since Laravel is running _within_ the Virtual Machine.

### နောက်ထက်ဆိုက်တစ်ခု ထပ်ထည့်ခြင်း

Once your Homestead environment is provisioned and running, you may want to add additional Nginx sites for your Laravel applications. You can run as many Laravel installations as you wish on a single Homestead environment. There are two ways to do this: First, you may simply add the sites to your `Homestead.yaml` file and then run `vagrant provision`.

Alternatively, you may use the `serve` script that is available on your Homestead environment. To use the `serve` script, SSH into your Homestead environment and run the following command:

	serve domain.app /home/vagrant/Code/path/to/public/directory

> **Note:** After running the `serve` command ကို run ပြီးပြီဆိုရင် `hosts` file ထဲမှာ သင်ထပ်ပေါင်းထည့်လိုက်တဲ့ နောက်ထက် site ကို သင့်ရဲ့ စက်မှာ ထက်ပေါင်းထည့်ဖို့ မမေ့ပါနဲ့။

<a name="ports"></a>
## Ports

အောက်မှာဖော်ပြထားတဲ့ ports တွေက သင့် Homestead ရဲ့ ports တွေဖြစ်ပါတယ်

- **SSH:** 2222 &rarr; Forwards To 22
- **HTTP:** 8000 &rarr; Forwards To 80
- **MySQL:** 33060 &rarr; Forwards To 3306
- **Postgres:** 54320 &rarr; Forwards To 5432
