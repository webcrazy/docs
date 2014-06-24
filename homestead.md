# Laravel ရဲ႕ Official Development Homestead အေၾကာင္း

- [Homestead မိတ္ဆက္](#introduction)
- [Homestead မွာပါဝင္ေသာ Software မ်ား](#included-software)
- [Installation & Setup](#installation-and-setup)
- [ေန႕စဥ္အသံုးျပဳမွူ](#general-usage)
- [Ports](#ports)

<a name="introduction"></a>
## Homestead မိတ္ဆက္

သင္႕ရဲ႕ PHP Development environment  ကို local development environment မွာပါ ၾကည္ႏူးသာယာဖြယ္ေကာင္းေအာင္Laravel က အေကာင္းဆံုးႀကိဳးစားအားထုတ္မွူတစ္ခုလုပ္ခဲ႕ပါတယ္။ [Vagrant](http://vagrantup.com) ကသင္႕ရဲ႕ Virtual Machine ေတြကို လြယ္လြယ္ကူကူ ထိန္းသိမ္း ႏိုင္ေအာင္ သင္႕ကိုေထာက္ပံ့ ေပးထားပါတယ္။


Laravel Homestead က official ပါ၊ Vagrant  "box" မွာ ႀကိဳဳ ၿပီး package လုပ္ထားတာပါ... ေနာက္ အဲဒါကသင္႕ကို development environment တစ္ခု တည္ေဆာက္တဲ႕ေနရာမွာ PHP, a web server, နဲ႕ အျခားအသံုးဝင္တဲ႕  tools ေတြကို သင္႕ရဲ႕ local machine မွာ install လုပ္စရာမလိုပါဘူး။ ဘယ္ Opearting System ကိုသံုးတယ္ဆိုတာကိုလည္း worry မ်ားစရာမလိုေတာ႕ပါဘူး။ Vagrant boxes ေတြနဲ႕ဘဲ အသံုးျပဳလို႕ရပါတယ္။ တကယ္လို႕တစ္ခုခုမွားသြားတယ္ဆိုရင္ vagrant boxes ေတြကိုမိနစ္အနည္းငယ္အတြင္း destory လုပ္ၿပီးေတာ႕ ျပန္ၿပီး create လုပ္ႏိုင္ပါတယ္။

Homestead က မည္သည္႕ Window, Mac, Linux မွာမဆို run ပါတယ္။ Homesead မွာ Nginx web server, PHP 5.5, MySQL, Postgres, Redis, Memcached နဲ႕ အျခား Laravel application အတြက္ အသံုးဝင္တာေတြပါဝင္ပါတယ္။

<a name="included-software"></a>
## Homestead မွာပါဝင္ေသာ Software မ်ား

- Ubuntu 14.04
- PHP 5.5
- Nginx
- MySQL
- Postgres
- Node (With Bower, Grunt, and Gulp)
- Redis
- Memcached
- Beanstalkd
- [Laravel Envoy](ssh#envoy-task-runner.md)
- Fabric + HipChat Extension

<a name="installation-and-setup"></a>
## Installation & Setup

### VirtualBox နဲ႕ Vagrant Installing

သင္အေနနဲ႕ Homestead environment ကိုမဖြင္႕ခင္ [VirtualBox](https://www.virtualbox.org/wiki/Downloads) နဲ႕ [Vagrant](http://www.vagrantup.com/downloads.html) ကို install လုပ္ထားရပါ႕မယ္။ ဒီ software ႏွစ္ခုေပါင္းၿပီး popular operating systems မ်ားကိုလြယ္ကူစြာ virtual install လုပ္လို႕ရပါမည္။ 

### Vagrant Box မ်ားထည္႕ျခင္း

VirtualBox နဲ႕ Vagrant ကို install လုပ္ၿပီးၿပီဆိုရင္ ပထမဆံုး သင္႕ရဲ႕ Vagrant installation မွာ  `laravel/homestead` လို႕ terminal ကေန run ၿပီး Laravel ရဲ႕ Homestead ကို Virtual Box မွာ add လိုက္ပါ။ Laravel ရဲ႕ Homestead box ကို download လုပ္ဖို႕အတြက္ သင္႕အင္တာနက္ conn  ေပၚမူတည္ၿပီး အခိ်ၾကာပါ႕မယ္

	vagrant box add laravel/homestead

### Clone The Homestead Repository

သင္ရဲ႕ Vagrant Installation မွာ box ထည့္ၿပီးသြားၿပီဆိုရင္ သင္႕အေနနဲ႕ဒီ repository ကို download ဒါမွမဟုတ္ clone လုပ္ေပးပါ။ နားလည္ထားရမွာက ဒီ repositiry က `Homestead` ပါ၊ ဒီ Folder ထဲမွာ သင္႕ရဲ႕ Laravel Projects ေတြကို ထားရမွာပါ၊ Homestead box ေတြကသင့္ရဲ႕ Laravel (နဲ႕ PHP Projects) ေတြကို host အျဖစ္ run မွာျဖစ္ပါတယ္။

	git clone https://github.com/laravel/homestead.git Homestead

### Set Your SSH Key

ၿပီးရင္ေတာ႕သင္ download လုပ္ထားတဲ႕ repository ထဲမွာပါတဲ႕ `Homestead.yaml` file ကို edit လုပ္သင္႕ပါတယ္။ ဒီ file ထဲမွာဆိုရင္ သင္ရဲ႕ public SSH key တို႕ ေနာက္ သင္႔ရဲ႕ main machine နဲ႕ Homestead virtual machine တို႕ကို share တဲ႕ Folder တို႕ကို configure လုပ္ႏိုင္ပါတယ္။

သင္႕မွာ SSH key မရွိဘူးလား၊ သင္က Linux ဒါမွမဟုတ္ Mac မွာဆိုရင္  ေအာက္မွာေဖာ္ျပထားတဲ႕ command ကို run လိုက္တာနဲ႕  ssh key တစ္စံုကိုသင္႕အတြက္ဖန္တီးေပးပါလိမ္႕မယ္

	ssh-keygen -t rsa -C "your@email.com"

Windows မွာဆိုရင္ သင္အေနနဲ႕ [Git](http://git-scm.com/) ကို install လုပ္ၿပီးေတာ႕ `Git Bash`မွာ အထက္က command ကို run ၿပီးေတာ႕ အဆင္ေျပပါတယ္။ အဲလိုမွမဟုတ္ဘူးဆိုရင္လည္း[PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) and [PuTTYgen](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html). တို႕ကိုအသံုးျပဳႏိုင္ပါတယ္။ 

သင္ SSH Key ကို create လုပ္ၿပီးၿပီဆိုရင္  `Homestead.yaml` file ထဲက `authorize` ဆိုတဲ႕ လမ္းေၾကာင္းထဲမွာ သင္႕ရဲ႕ SSH Key ရဲ႕ path ကိုသတ္မွတ္လိုက္ပါ။

### Configure Your Shared Folders

သင့္ရဲ႕ Homestead environment နဲ႕ သင္႕ရဲ႕ local machine ႏွစ္ခုၾကားမွာ Share တဲ႕ Folder ေတြအားလံုးက `Homestead.yaml` File ထဲမွာရွိမွာပါ။ တကယ္လို႕ အဲ႕ဒီ႕ Files ေတြ change သြားရင္ သင္႕ရဲ႕ local machine နဲ႕ Homestead environment ကို auto sync လုပ္ေပးသြားမွာပါ။ Share Folders ေတြအမ်ားႀကီးကိုလည္းသင္လိုအပ္ရင္ configure လုပ္ရမွာပါ။

### Configure Your Nginx Sites

Nginx နဲ႕သိပ္မရင္းႏွီးဘူးမဟုတ္လား ျပသနာမရွိပါဘူး။ `sites` ေတြကသင္႕ရဲ႕ Homestead environment က Folders ေတြကို "domain" ဆီကိုလြယ္ကူစြာ map ေပးပါလိမ္႕မယ္။ Site configuration တစ္ခုကို `Homestead.yaml` မွာေတြ႕ႏိုင္ပါတယ္။ သင္႕အေနနဲ႕ sites အမ်ားႀကီးကိုသင္႕ရဲ႕ Homestead မွာထည္႕ခ်င္ပါလိမ္႕မယ္၊ Homestad က သင္႕virtualized Laravel Projects ေတြရဲ႕ environment ေတြကို အဆင္ေျပေစပါလိမ္႕မယ္။

### Bash Aliases

To add Bash aliases to your Homestead box, simply add to the `aliases` file in the root of the Homestead directory.

### VagrantBox ကိုစတင္ျခင္း

`Homestead.yaml` file မွာသင္႕ရဲ႕ link ေတြကို edit လုပ္ၿပီးၿပီဆိုရင္ သင္႕ရဲ႕ `Homestead` directory ထဲမွာ `vagrant up` ဆိုၿပီး terminal ကေန run လိုက္ပါ။ Vagrant က Virtual Machine ကို boot လုပ္ပါ႕လိမ္႕မယ္ ၿပီးရင္ေတာ႕ သင္႕ရဲ႕ share folders နဲ႕ Nginx sites ေတြကို auto configure လုပ္သြားပါလိမ္႕မယ္။

သင္႕ရဲ႕ Nginx sites ေတြအတြက္ "domain" ေတြကို သင္ရဲ႕ local machine က hosts မွာထက္ေပါင္းထည္႕ဖို႕မေမ႕ပါနဲ႕ဦး။ hosts file ကသင့္ local machine က requests ေတြကို Homestead ဆီကို redirect လုပ္ေပးပါလိမ္႕မယ္။ Mac နဲ႕ linux မွာ ဆိုရင္ hosts file က `/etc/hosts` ထဲမွာျပင္လို႕ရပါတယ္။ Window မွာဆိုရင္ေတာ႕ `C:\Windows\System32\drivers\etc\hosts` မွာရွိပါတယ္။ သင္ထက္ေပါင္းထည္႕ရမယ္႕ line က ေအာက္ကလိုျဖစ္ပါလိမ္႕မယ္၊

	127.0.0.1  homestead.app

သင့္ရဲ႕ domain ကိုသင္႕ရဲ႕ `hosts` file ထဲကိုေပါင္းထည့္ၿပီးၿပီဆိုရင္ သင္ရဲ႕ browser ကေနသင့္ domain ေနာက္က port နံပါတ္နဲ႕ဆိုရင္သင့္ရဲ႕ဆိုက္ကို access လုပ္လို႕ရပါၿပီ။

	http://homestead.app:8000

သင္ရဲ႕ database ေတြကိုဘယ္လို connect လုပ္မလဲဆိုတာကို ေလ႕လာဖို႕ ဆက္ဖတ္ပါဦ။

<a name="daily-usage"></a>
## ေန႕စဥ္အသံုးျပဳမွူ

### SSH ကို connect လုပ္ျခင္း

သင္႕ရဲ႕ Homestead environment ကို SSH ကေန ခ်ိတ္ဆက္ဝင္ဖို႕ သင္႕အေနနဲ႕ `127.0.0.1` port ကေတာ႕ 2222 ျဖစ္ၿပီး SSH key ကေတာ႕ သင္ရဲ႕`Homestead.yaml`မွာ သင္သတ္မွတ္ခဲ႕တဲ႕ key ဘဲျဖစ္ပါတယ္။ `vagrant ssh` ဆိုၿပီးသင္႕ရဲ႕ Homestead Folder ကေနလည္း ဝင္လို႕ရပါတယ္။

သင္အေနနဲ႕ ဒါ႕ထက္အဆင္ေျပမွဴ လိုခ်င္ေသးတယ္ဆိုရင္ေတာ႕ ေအာက္မွာေဖာ္ျပထားတဲ႕ alias ကို သင္႕ရဲ႕ `~/.bash_aliases` ဒါမွမဟုတ္ `~/.bash_profile` မွာေပါင္းထည္႕လိုက္တာက ပိုၿပီးအသံုးဝင္ပါမယ္၊ 

	alias vm='ssh vagrant@127.0.0.1 -p 2222'

### သင့္ရဲ႕ Databases မ်ားကို connect လုပ္ျခင္း

homestead` ရဲ႕ databases ေတြျဖစ္တဲ႕ MySQL နဲ႕ Postgres ႏွစ္ခုလံုးကို box ေတြရဲ႕အျပင္မွာ configuration လုပ္ထားပါတယ္။ ဒါထက္ပိုၿပီးအဆင္ေျပဖို႕ Laravel ရဲ႕ `local` database ကို default configure လုပ္ထားပါတယ္။

သင္႕ရဲ႕ database MySQL ဒါမွမဟုတ္ Postgres ကို Navicat (သို႕) Sequel Pro ကေနသင္႕ရဲ႕ main machine နဲ႕ connect လုပ္ခ်င္တယ္ဆိုရင္ သင္႕အေနနဲ႕  MySQL အတြက္ `127.0.0.1` နဲ႕ port 33060 နဲ႕Postgres အတြက္ port 54320 ျဖစ္ပါတယ္။ Database ႏွစ္ခုလံုးအတြက္ username နဲ႕ password က  `homestead`/ `secreat` ျဖစ္ပါတယ္။

> **Note:** You should only use these non-standard ports when connecting to the databases from your main machine. You will use the default 3306 and 5432 ports in your Laravel database configuration file since Laravel is running _within_ the Virtual Machine.

### ေနာက္ထက္ဆိုက္တစ္ခု ထပ္ထည္႕ျခင္း

သင့္ရဲ႕ Homestead environment ကသင္ထည္႕ခ်င္တာေတြထည္႕ၿပီးသြားၿပီ run လည္း run ေနၿပီဆိုရင္ သင္႕အေနနဲ႕ Laravel applications ေတြကို သင္႕ရဲ႕ Nginx sites မွာထပ္ထည္႕ခ်င္မွာေပါ႕။ Homestead environment တစ္ခုမွာ သင္ႀကိဳက္သေလာက္ Laravel installation လုပ္ႏိုင္ပါတယ္။ Laravel application ထက္ေပါင္းထည္႕ တဲ႕ေနရာမွာ နည္းႏွစ္ခုရွိပါတယ္။ ပထမတစ္ခုကသင္႕ရဲ႕ `Homestead.yaml` files မွာထက္ေပါင္းထည္႕ပါ  ၿပီးရင္ `vagrant destory` နဲ႕ box ေတြကို ဖ်က္ပါ၊ ၿပီးရင္ `vagrant up` ျပန္လုပ္ပါ။

ေနာက္ထက္နည္းတစ္ခုကေတာ႕ သင္႕ရဲ႕ Homestead environment မွာ `serve` script ကိုသံုးၿပီး Laravel application ေတြကိုထက္ထည္႕ႏိုင္ပါတယ္။ `serve` script ကိုအသံုးျပဳခ်င္တယ္ဆိုရင္ေတာ႕ သင္႕ရဲ႕ Homestead environment ထဲကိုဝင္ၿပီးေတာ႕ ေအာက္က command ကို run လိုက္ပါ

	serve domain.app /home/vagrant/Code/path/to/public/directory

> **မွတ္ခ်က္:** `serve` command ကို run ၿပီးၿပီဆိုရင္  `hosts` file ထဲမွာ သင္ထပ္ေပါင္းထည္႕လိုက္တဲ႕ ေနာက္ထက္ site ကို သင့္ရဲ႕ စက္မွာ ထက္ေပါင္းထည္႕ဖို႕ မေမ႕ပါနဲ႕။

<a name="ports"></a>
## Ports

ေအာက္မွာေဖာ္ျပထားတဲ႕ ports ေတြက  သင္႕ Homestead ရဲ႕ ports ေတြျဖစ္ပါတယ္

- **SSH:** 2222 -> Forwards To 22
- **HTTP:** 8000 -> Forwards To 80
- **MySQL:** 33060 -> Forwards To 3306
- **Postgres:** 54320 -> Forwards To 5432
