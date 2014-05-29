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
## Other Blade Control Structures

#### Echoing Data

	Hello, {{{ $name }}}.

	The current UNIX timestamp is {{{ time() }}}.

#### Echoing Data After Checking For Existence

Sometimes you may wish to echo a variable, but you aren't sure if the variable has been set. Basically, you want to do this:

	{{{ isset($name) ? $name : 'Default' }}}

However, instead of writing a ternary statement, Blade allows you to use the following convenient short-cut:

	{{{ $name or 'Default' }}}

#### Displaying Raw Text With Curly Braces

If you need to display a string that is wrapped in curly braces, you may escape the Blade behavior by prefixing your text with an `@` symbol:

	@{{ This will not be processed by Blade }}

Of course, all user supplied data should be escaped or purified. To escape the output, you may use the triple curly brace syntax:

	Hello, {{{ $name }}}.

If you don't want the data to be escaped, you may use double curly-braces:

	Hello, {{ $name }}.

> **Note:** Be very careful when echoing content that is supplied by users of your application. Always use the triple curly brace syntax to escape any HTML entities in the content.

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

You may also pass an array of data to the included view:

	@include('view.name', array('some'=>'data'))

#### Overwriting Sections

By default, sections are appended to any previous content that exists in the section. To overwrite a section entirely, you may use the `overwrite` statement:

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

Blade even allows you to define your own custom control structures. When a Blade file is compiled, each custom extension is called with the view contents, allowing you to do anything from simple `str_replace` manipulations to more complex regular expressions.

The Blade compiler comes with the helper methods `createMatcher` and `createPlainMatcher`, which generate the expression you need to build your own custom directives.

The `createPlainMatcher` method is used for directives with no arguments like `@endif` and `@stop`, while `createMatcher` is used for directives with arguments.

The following example creates a `@datetime($var)` directive which simply calls `->format()` on `$var`:

	Blade::extend(function($view, $compiler)
	{
		$pattern = $compiler->createMatcher('datetime');

		return preg_replace($pattern, '$1<?php echo $2->format('m/d/Y H:i'); ?>', $view);
	});
