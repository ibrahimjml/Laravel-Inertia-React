@component('mail::message')

<h2>Hey,{{$user->name}}</h2>
<p>Please click the button to reset your password</p>
@component('mail::button',['url'=>url('reset/'.$token)])
Reset your Password
@endcomponent
<p>Thanks</p>
@endcomponent