import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Verifyemail({message}) {
  const {post,processing}=useForm();
  const Submit = (eo)=>{
  eo.preventDefault();
post(route('verification.send'),{
  preserveScroll:true
})
  }
  return (
    <div className='grid  place-items-center'>
      <div className='space-y-2'>
       <h1>Please verify your email within the link that we already sent to you .</h1>
       <p className='text-sm text-gray-500'>Didn't verified your email yet,click resend</p>
       <form onSubmit={Submit}>
        <button disabled={processing} type='submit' className={`bg-green-400 ${processing ? 'bg-slate-400':''} text-slate-200 text-center px-3 py-px`}>Resend</button>
       </form>
       <p className='bg-green-400 text-slate-200 text-center px-3 '>{message}</p>
      </div>
    </div>
  )
}
