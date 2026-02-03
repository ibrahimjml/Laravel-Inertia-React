@component('mail::message')

<h2>Hey,{{$user->name}}</h2>
<p>Please click the button to reset your password</p>
@component('mail::button',[ 'url' => route('reset.password', [
        'locale' => app()->getLocale(),
        'token' => $token
    ])])
Reset your Password
@endcomponent
<p>Thanks</p>
@endcomponent