# Templates

- [Controller Layouts](#controller-layouts)
- [Blade Templating](#blade-templating)
- [Other Blade Control Structures](#other-blade-control-structures)
- [Extending Blade](#extending-blade)

<a name="controller-layouts"></a>
## Controller Layouts

Laravel မွာအသံုးျပဳေသာ templates ပံုစံမ်ားထဲကတစ္ခုကေတာ့ controller layouts ကေနအသံုးျပဳတဲ့ပံုစံျဖစ္ပါတယ္။ `layout` property ကို controller မွာသတ္မွတ္လိုက္တာနဲ႔ view ဖိုဒါထဲမွာ ႀကိဳတင္သတ္မွတ္ျပင္ဆင္ထားတဲ့ view ဖိုင္ကို သင့္အတြက္ယူေဆာင္ေပးပါလိမ့္မယ္။ ၿပီးရင္ေတာ့ controller ကေနညႊန္ၾကားလာတဲ့တဲ့ ညႊန္ၾကားခ်က္တြကို လက္ခံေဆာင္ရြက္ေပးမွာျဖစ္ပါတယ္။

#### Controller တြင္ Layout ကိုသတ္မွတ္ျခင္း

	class UserController extends BaseController {

		/**
		 * The layout that should be used for responses.
		 */
		protected $layout = 'layouts.master';

		/**
		 * Show the user profile.
		 */
		public function showProfile()
		{
			$this->layout->content = View::make('user.profile');
		}

	}

<a name="blade-templating"></a>
## Blade Templating

Laravel မွာပါတဲ့ template ပံုစံေနာက္တစ္ခုျဖစ္တဲ့ Blade ဆိုတာကေတာ့ ရိုးရွင္းၿပီး၊ စြမ္းေဆာင္ရည္ျပည့္ဝတဲ့ လုပ္ေဆာင္ခ်က္ေတြအမ်ားႀကီးပါတဲ့ template engine တစ္ခုျဖစ္ပါတယ္။ Blade ရဲ့ပံုစံက ပင္မ _template_ မွာတည္ေဆာက္ထားတဲ့ပံုစံကို ထပ္ပြားယူၿပီး(_inheritance_) အေျပာင္းအလဲလုပ္ခ်င္တဲ့ေနရာေတြထဲကို (_section_) လိုအပ္သလို ျပဳျပင္ေျပာင္းလဲႏိုင္တဲ့ ပံုစံျဖစ္ပါတယ္။ Blade template ကိုအသံုးျပဳခ်င္ရင္ေတာ့ `.blade.php` extension နဲ႔အသံုးျပဳရမွာပါ။ 

#### Blade ပံုစံသတ္မွတ္ျခင္း

	<!-- Stored in app/views/layouts/master.blade.php -->

	<html>
		<body>
			@section('sidebar')
				This is the master sidebar.
			@show

			<div class="container">
				@yield('content')
			</div>
		</body>
	</html>

#### Blade ပံုစံကို အသံုးျပဳျခင္း

	@extends('layouts.master')

	@section('sidebar')
		@parent

		<p>This is appended to the master sidebar.</p>
	@stop

	@section('content')
		<p>This is my body content.</p>
	@stop

အေပၚမွာျပထားတဲ့ဥပမာမွာ ပင္မ template ပံုစံကို `extend` လုပ္ယူၿပီး ပင္မ layout ထဲက section ေနရာကို ထပ္ထည့္ထားတာကို သတိျပဳပါ။ ပင္မ layout ထဲမွာ ႀကိဳတင္သတ္မွတ္ထားတဲ့ အခ်က္အလက္ေတြကို chile view ထဲမွာ ထပ္သံုးခ်င္ရင္ `@parent` ဆိုတဲ့ ညႊန္ၾကားခ်က္ကိုအသံုးျပဳႏိုင္ပါတယ္။ Sidebar နဲ႔ footer ကဲ့သို႔ေသာ အပိုင္းေတြအတြက္ လိုအပ္တဲ့ အခ်က္အလက္ေတြကို ထပ္ထည့္ႏိုင္တဲ့ လုပ္ေဆာင္ခ်က္တစ္ခုျဖစ္ပါတယ္။ 

တစ္ခါတစ္ရံ `@section` သတ္မွတ္ထား / မထား မေသခ်ာဘူး `@yield` နဲ႔ဆြဲယူထားတဲ့ ေနရာထဲကိုလဲ default value တစ္ခု ထည့္ခ်င္တယ္ဆိုရင္ ဒုတိယ argument အေနနဲ႔ ထည့္ေပးလိုက္ရင္ ရပါတယ္။ 

	@yield('section', 'Default Content');

<a name="other-blade-control-structures"></a>
## Blade တြင္အသံုးျပဳႏိုင္ေသာ အျခား control structures မ်ား

#### အခ်က္အလက္ထုတ္ျပျခင္း

	Hello, {{{ $name }}}.

	The current UNIX timestamp is {{{ time() }}}.

#### အခ်က္အလက္ ရွိ/မရွိ စစ္ေဆးၿပီးမွ ထုတ္ျပျခင္း 

တစ္ခါတစ္ရံမွာ အခ်က္အလက္တစ္ခုကိုထုတ္ျပခ်င္ေသာ္လည္း အဲ့ဒီ အခ်က္အလက္ထည့္ထားတဲ့ variable ကို အသံုးျပဳထားျခင္း ရွိ/မရွိ မေသခ်ာတဲ့ အေျခအေနမ်ိဳးမွာ ပံုမွန္ဆိုရင္ ေအာက္ပါအတိုင္း အသံုးျပဳၾကပါတယ္။

	{{{ isset($name) ? $name : 'Default' }}}

အဲ့ဒီပံုစံကို Blade နဲ႔လြယ္လြယ္ကူကူပဲေရးႏိုင္ပါတယ္... ေအာက္မွာေရးထားတဲ့ပံုစံကိုၾကည့္လုိက္ပါ။

	{{{ $name or 'Default' }}}

#### တြန္႔ကြင္း (Curly Braces) ႏွင့္အုပ္ထားေသာ စာသားမ်ားအတိုင္း ထုတ္ျပျခင္း

တြန္႔ကြင္း (curly braces) အုပ္ထားတဲ့ စာသားမ်ားကို ထုတ္ျပဖို႔ လိုအပ္လွၽင္ေတာ့ blade ပံုစံကို ေရွ႔မွာ `@` သကၤတ နဲ႔ခံျပီး အသံုးျပဳႏိုင္ပါတယ္။

	@{{ This will not be processed by Blade }}

အသံုးျပဳသူဆီက ဝင္လာမဲ့ အခ်က္အလက္ေတြကို escape သို႔မဟုတ္ purified လုပ္သင့္ပါတယ္။ အဲ့လိုျပဳလုပ္ဖို႔အတြက္ တြန္႔ကြင္းသံုးခု (triple curly brace) ကိုအသံုးျပဳႏိုင္ပါတယ္။ 

	Hello, {{{ $name }}}.

အကယ္၍ escape မလုပ္ခ်င္ဘူးဆုိရင္ေတာ့ တြန္႔ကြင္း ႏွစ္ခု (double curly braces) ကိုအသံုးျပဳႏိုင္ပါတယ္။

	Hello, {{ $name }}.

> **သတိျပဳရန္:** Application ကိုအသံုးျပဳဳသူဆီကလာမဲ့ အခ်က္အလက္ေတြကိုထုတ္ျပတဲ့ကိစၥကို အထူးဂရုစိုက္ဖို႔ လိုအပ္ပါတယ္။ အဲ့ဒါေၾကာင့္ HTML entities ေတြကို escape ျပဳလုပ္ဖို႔အတြက္ တြန္႔ကြင္းသံုးခု (triple curly brace) ကိုအၿမဲတမ္းအသံုးျပဳသင့္ပါတယ္။

#### If Statements

	@if (count($records) === 1)
		I have one record!
	@elseif (count($records) > 1)
		I have multiple records!
	@else
		I don't have any records!
	@endif

	@unless (Auth::check())
		You are not signed in.
	@endunless

#### Loops

	@for ($i = 0; $i < 10; $i++)
		The current value is {{ $i }}
	@endfor

	@foreach ($users as $user)
		<p>This is user {{ $user->id }}</p>
	@endforeach

	@while (true)
		<p>I'm looping forever.</p>
	@endwhile

#### Including Sub-Views

	@include('view.name')

Include လုပ္ထားတဲ့ view ေတြဆီကိုလဲ အခ်က္အလက္ေတြကို passing လုပ္လို႔ရပါတယ္။

	@include('view.name', array('some'=>'data'))

#### Overwriting Sections

ပံုမွန္ဆိုရင္ sections ဟာ ယခင္ရွိပီးသား အခ်က္အလက္ေတြနဲ႔အတူ ေနာက္ထပ္ ထပ္ထည့္လာတဲ့ အခ်က္အလက္ေတြကို ေပါင္းထည့္လိုက္တာျဖစ္ပါတယ္။ အကယ္၍ ယခင္အခ်က္အလက္ေတြကို ဖ်က္ျပစ္ပီး ေနာက္ထပ္ ထပ္ထည့္လိုက္တဲ့ အခ်က္အလက္ကိုပဲ အသံုးျပဳခ်င္ရင္ေတာ့ `overwrite` ကိုအသံုးျပဳႏိုင္ပါတယ္။

	@extends('list.item.container')

	@section('list.item.content')
		<p>This is an item of type {{ $item->type }}</p>
	@overwrite

#### Displaying Language Lines

	@lang('language.line')

	@choice('language.line', 1);

#### Comments

	{{-- This comment will not be in the rendered HTML --}}

<a name="extending-blade"></a>
## Extending Blade

Blade ကိုအသံုးျပဳျပီး စိတ္ႀကိဳက္ control structure ေတြကိုျပဳလုပ္ႏိုင္ပါတယ္။ blade file ကို compile လုပ္ပီးတဲ့အခါ၊ သတ္မွတ္ထားတဲ့ စိတ္ႀကိဳက္ control structure ေတြကို view အတြက္ အခ်က္အလက္ေတြနဲ႔အတူ ေခၚယူသံုးစြဲပါတယ္။ allowing you to do anything from simple `str_replace` manipulations to more complex regular expressions.

Blade compiler မွာ `createMatcher` နဲ႔ `create:lainMatcher` ဆိုၿပီး helper methods ႏွစ္ခု ရွိပါတယ္။ အဲ့ဒီ methods ေတြကေန စိတ္ႀကိဳက္ control structure ေတြျပဳလုပ္ဖို႔ လိုအပ္တဲ့ အရာေတြကိုျပဳလုပ္ေပးပါတယ္။ 

`createPlainMatcher` method ကို `@endif` တို႔ `@stop` တို႔လို arguments ေတြမပါတာအတြက္ အသံုးျပဳၿပီး၊ `createMatcher` method ကိုေတာ့ arguments ပါတာေတြျပဳလုပ္ဖို႔အတြက္ အသံုးျပဳပါတယ္။

ေအာက္ပါ ဥပမာကေတာ့ `@datatime($var)` ကို ျပဳလုပ္ထားတာပါ။ အဲ့ဒီ directive မွာပါတဲ့ `$var` ရဲ့ တန္ဖိုးကို `->format()` အသံုးျပဳၿပီး အလြယ္တကူ ေခၚသံုးႏိုင္ပါတယ္။ 

	Blade::extend(function($view, $compiler)
	{
		$pattern = $compiler->createMatcher('datetime');

		return preg_replace($pattern, '$1<?php echo $2->format('m/d/Y H:i'); ?>', $view);
	});
