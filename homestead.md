# Laravel Homestead

- [Homestead မိတ္ဆက္](#introduction)
- [Homestead မွာပါဝင္ေသာ Software မ်ား](#included-software)
- [Installation & Setup](#installation-and-setup)
- [ေန႕စဥ္အသံုးျပဳမွူ](#general-usage)
- [Ports](#ports)

<a name="introduction"></a>
## Homestead မိတ္ဆက္

သင္႕ရဲ႕ PHP Development environment  ကို local development environment မွာပါ ၾကည္ႏူးသာယာဖြယ္ေကာင္းေအာင္Laravel က အေကာင္းဆံုးႀကိဳးစားအားထုတ္မွူတစ္ခုလုပ္ခဲ႕ပါတယ္။ [Vagrant](http://vagrantup.com) ကသင္႕ရဲ႕ Virtual Machine ေတြကို လြယ္လြယ္ကူကူ ထိန္းသိမ္း ႏိုင္ေအာင္ သင္႕ကိုေထာက္ပံ့ ေပးထားပါတယ္။

Laravel Homestead is an official, pre-packaged Vagrant "box" that provides you a wonderful development environment without requiring you to install PHP, a web server, and any other server software on your local machine. No more worrying about messing up your operating system! Vagrant boxes are completely disposable. If something goes wrong, you can destroy and re-create the box in minutes!

Laravel Homestead က official ပါ၊ Vagrant  "box" မွာ ႀကိဳဳ ၿပီး package လုပ္ထားတာပါ... ေနာက္ အဲဒါကသင္႕ကို development environment တစ္ခု တည္ေဆာက္တဲ႕ေနရာမွာ PHP, a web server, နဲ႕ အျခား 

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
- [Laravel Envoy](/docs/ssh#envoy-task-runner)
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

Not familiar with Nginx? No problem. The `sites` property allows you to easily map a "domain" to a folder on your Homestead environment. A sample site configuration is included in the `Homestead.yaml` file. Again, you may add as many sites to your Homestead environemnt as necessary.Homestead can serve as a convenient, virtualized environemnt for every Laravel project you are working on!

### Bash Aliases

To add Bash aliases to your Homestead box, simply add to the `aliases` file in the root of the Homestead directory.

### VagrantBox ကိုစတင္ျခင္း

Once you have edited the `Homestead.yaml` to your liking, run the `vagrant up` command from the Homestead directory in your terminal. Vagrant will boot the virtual machine, and configure your shared folders and Nginx sites automatically!

Don't forget to add the "domains" for your Nginx sites to the `hosts` file on your machine! The `hosts` file will redirect your requests for the local domains into your Homestead environment. On Mac and Linux, this file is located at `/etc/hosts`. On Windows, it is located at `C:\Windows\System32\drivers\etc\hosts`. The lines you add to this file will look like the following:

	127.0.0.1  homestead.app

Once you have added the domain to your `hosts` file, you can access the site via your web browser on port 8000!

	http://homestead.app:8000

သင္ရဲ႕ database ေတြကိုဘယ္လို connect လုပ္မလဲဆိုတာကို ေလ႕လာဖို႕ ဆက္ဖတ္ပါဦ။

<a name="daily-usage"></a>
## ေန႕စဥ္အသံုးျပဳမွူ

### SSH ကို connect လုပ္ျခင္း

To connect to your Homestead environment via SSH, you should connect to `127.0.0.1` on port 2222 using the SSH key you specified in your `Homestead.yaml` file. You may also simply run the `vagrant ssh` command from your `Homestead` directory.

If you want even more convenience, it can be helpful to add the following alias to your `~/.bash_aliases` or `~/.bash_profile`:

	alias vm='ssh vagrant@127.0.0.1 -p 2222'

### သင့္ရဲ႕ Databases မ်ားကို connect လုပ္ျခင္း

A `homestead` database is configured for both MySQL and Postgres out of the box. For even more convenience, Laravel's `local` database configuration is set to use this database by default.

To connect to your MySQL or Postgres database from your main machine via Navicat or Sequel Pro, you should connect to `127.0.0.1` and port 33060 (MySQL) or 54320 (Postgres). The username and password for both databases is `homestead` / `secret`.

> **Note:** You should only use these non-standard ports when connecting to the databases from your main machine. You will use the default 3306 and 5432 ports in your Laravel database configuration file since Laravel is running _within_ the Virtual Machine.

### ေနာက္ထက္ဆိုက္တစ္ခု ထပ္ထည္႕ျခင္း

Once your Homestead environment is provisioned and running, you may want to add additional Nginx sites for your Laravel applications. You can run as many Laravel installation as you wish on a single Homestead environment. There are two ways to do this. First, you may simply add the sites to your `Homestead.yaml` file, `vagrant destroy` the box, and then `vagrant up` again.

Alternatively, you may use the `serve` script that is available on your Homestead environment. To use the `serve` script, SSH into your Homestead environment and run the following command:

	serve domain.app /home/vagrant/Code/path/to/public/directory

> **မွတ္ခ်က္:** `serve` command ကို run ၿပီးၿပီဆိုရင္  `hosts` file ထဲမွာ သင္ထပ္ေပါင္းထည္႕လိုက္တဲ႕ ေနာက္ထက္ site ကို သင့္ရဲ႕ စက္မွာ ထက္ေပါင္းထည္႕ဖို႕ မေမ႕ပါနဲ႕။

<a name="ports"></a>
## Ports

ေအာက္မွာေဖာ္ျပထားတဲ႕ ports ေတြက  သင္႕ Homestead ရဲ႕ ports ေတြျဖစ္ပါတယ္

- **SSH:** 2222 -> Forwards To 22
- **HTTP:** 8000 -> Forwards To 80
- **MySQL:** 33060 -> Forwards To 3306
- **Postgres:** 54320 -> Forwards To 5432