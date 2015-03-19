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

#### Manually Via Git (No Local PHP)

Alternatively, if you do not want to install PHP on your local machine, you may install Homestead manually by simply cloning the repository. Consider cloning the repository into a `Homestead` folder within your "home" directory, as the Homestead box will serve as the host to all of your Laravel (and PHP) projects:

	git clone https://github.com/laravel/homestead.git Homestead

Once you have installed the Homestead CLI tool, run the `bash init.sh` command to create the `Homestead.yaml` configuration file:

	bash init.sh

The `Homestead.yaml` file will be placed in your `~/.homestead` directory.

#### With Composer + PHP Tool

Once the box has been added to your Vagrant installation, you are ready to install the Homestead CLI tool using the Composer `global` command:

	composer global require "laravel/homestead=~2.0"

Make sure to place the `~/.composer/vendor/bin` directory in your PATH so the `homestead` executable is found when you run the `homestead` command in your terminal.

Once you have installed the Homestead CLI tool, run the `init` command to create the `Homestead.yaml` configuration file:

	homestead init

The `Homestead.yaml` file will be placed in the `~/.homestead` directory. If you're using a Mac or Linux system, you may edit `Homestead.yaml` file by running the `homestead edit` command in your terminal:

	homestead edit

### Set Your SSH Key

ပြီးရင်တော့သင် download လုပ်ထားတဲ့ repository ထဲမှာပါတဲ့ `Homestead.yaml` file ကို edit လုပ်သင့်ပါတယ်။ ဒီ file ထဲမှာဆိုရင် သင်ရဲ့ public SSH key တို့ နောက် သင့်ရဲ့ main machine နဲ့ Homestead virtual machine တို့ကို share တဲ့ Folder တို့ကို configure လုပ်နိုင်ပါတယ်

သင့်မှာ SSH key မရှိဘူးလား၊ သင်က Linux ဒါမှမဟုတ် Mac မှာဆိုရင် အောက်မှာဖော်ပြထားတဲ့ command ကို run လိုက်တာနဲ့ ssh key တစ်စုံကိုသင့်အတွက်ဖန်တီးပေးပါလိမ့်မယ်

	ssh-keygen -t rsa -C "you@homestead"


Windows မှာဆိုရင် သင်အနေနဲ့ [Git](http://git-scm.com/) ကို install လုပ်ပြီးတော့ `Git Bash` မှာ အထက်က command ကို run ပြီးတော့ အဆင်ပြေပါတယ်။ အဲလိုမှမဟုတ်ဘူးဆိုရင်လည်း [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) and [PuTTYgen](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) တို့ကိုအသုံးပြုနိုင်ပါတယ်။

သင် SSH Key ကို create လုပ်ပြီးပြီဆိုရင် `Homestead.yaml ` file ထဲက authorize ဆိုတဲ့ လမ်းကြောင်းထဲမှာ သင့်ရဲ့ SSH Key ရဲ့ path ကိုသတ်မှတ်လိုက်ပါ။

### Configure Your Shared Folders

The `folders` property of the `Homestead.yaml` file lists all of the folders you wish to share with your Homestead environment. As files within these folders are changed, they will be kept in sync between your local machine and the Homestead environment. You may configure as many shared folders as necessary!

### Configure Your Nginx Sites

Nginx နဲ့သိပ်မရင်းနှီးဘူးမဟုတ်လား ပြသနာမရှိပါဘူး။ `sites` တွေကသင့်ရဲ့ Homestead environment က Folders တွေကို "domain" ဆီကိုလွယ်ကူစွာ map ပေးပါလိမ့်မယ်။ Site configuration တစ်ခုကို Homestead.yaml မှာတွေ့နိုင်ပါတယ်။ သင့်အနေနဲ့ sites အများကြီးကိုသင့်ရဲ့ Homestead မှာထည့်ချင်ပါလိမ့်မယ်၊ Homestad က သင့်virtualized Laravel Projects တွေရဲ့ environment တွေကို အဆင်ပြေစေပါလိမ့်မယ်။

You can make any Homestead site use [HHVM](http://hhvm.com) by setting the `hhvm` option to `true`:

	sites:
	    - map: homestead.app
	      to: /home/vagrant/Code/Laravel/public
	      hhvm: true

### Bash Aliases

To add Bash aliases to your Homestead box, simply add to the `aliases` file in the root of the `~/.homestead` directory.

### VagrantBox ကိုစတင်ခြင်း

`Homestead.yaml` file မှာသင့်ရဲ့ link တွေကို edit လုပ်ပြီးပြီဆိုရင် သင့်ရဲ့ `Homestead` directory ထဲမှာ `vagrant up` ဆိုပြီး terminal ကနေ run လိုက်ပါ။ Vagrant က Virtual Machine ကို boot လုပ်ပါ့လိမ့်မယ် ပြီးရင်တော့ သင့်ရဲ့ share folders နဲ့ Nginx sites တွေကို auto configure လုပ်သွားပါလိမ့်မယ်။

To destroy the machine, you may use the `vagrant destroy --force` command.

သင့်ရဲ့ Nginx sites တွေအတွက် "domain" တွေကို သင်ရဲ့ local machine က hosts မှာထက်ပေါင်းထည့်ဖို့မမေ့ပါနဲ့ဦး။ hosts file ကသင့် local machine က requests တွေကို Homestead ဆီကို redirect လုပ်ပေးပါလိမ့်မယ်။ Mac နဲ့ linux မှာ ဆိုရင် hosts file က `/etc/hosts` ထဲမှာပြင်လို့ရပါတယ်။ Window မှာဆိုရင်တော့ `C:\Windows\System32\drivers\etc\hosts` မှာရှိပါတယ်။ သင်ထက်ပေါင်းထည့်ရမယ့် line က အောက်ကလိုဖြစ်ပါလိမ့်မယ်၊:

	192.168.10.10  homestead.app

Make sure the IP address listed is the one you set in your `Homestead.yaml` file. Once you have added the domain to your `hosts` file, you can access the site via your web browser!

	http://homestead.app

သင်ရဲ့ database တွေကိုဘယ်လို connect လုပ်မလဲဆိုတာကို လေ့လာဖို့ ဆက်ဖတ်ပါဦး။

<a name="daily-usage"></a>
## နေ့စဉ်အသုံးပြုမှူ

### SSH ကို connect လုပ်ခြင်း

To connect to your Homestead environment via SSH, issue the `vagrant ssh` command from your Homestead directory.

Since you will probably need to SSH into your Homestead machine frequently, consider creating an "alias" on your host machine:

	alias vm="ssh vagrant@127.0.0.1 -p 2222"

Once you create this alias, you can simply use the "vm" command to SSH into your Homestead machine from anywhere on your system.

### သင့်ရဲ့ Databases များကို connect လုပ်ခြင်း

A `homestead` database is configured for both MySQL and Postgres out of the box. For even more convenience, Laravel's `local` database configuration is set to use this database by default.

To connect to your MySQL or Postgres database from your main machine via Navicat or Sequel Pro, you should connect to `127.0.0.1` and port 33060 (MySQL) or 54320 (Postgres). The username and password for both databases is `homestead` / `secret`.

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
