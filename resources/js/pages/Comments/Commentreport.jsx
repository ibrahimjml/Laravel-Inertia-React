import { useForm, usePage } from '@inertiajs/react';
import  { useState } from 'react'
import { route } from 'ziggy-js';

export default function Commentreport({commentID,reasons,closeModel}) {
    const { props } = usePage();
    const status = props.flash?.error;

    const [selectedReason, setSelectedReason] = useState('');
    const { data, setData, post, processing, errors, reset } = useForm({
      reason: '',
      other: '',
      comment_id: commentID,
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      post(route('comment.report',commentID), {
      data: {
      ...data,
      other: selectedReason === 'Other' ? data.other : '',
    },
    
        onSuccess: () => {
          reset();
          setSelectedReason('');
          close();
        },
      });
    };
  return (
<div className="fixed inset-0 z-50 bg-dark bg-opacity-70 flex justify-center items-center">
  {/* Centered Panel */}
  <div className="relative w-full max-w-md dark:bg-dark bg-white p-6 shadow-xl rounded-lg">
    <form onSubmit={handleSubmit}>
      <h2 className="font-bold mb-4 text-lg">Report This Comment</h2>

      {reasons.map((reason) => (
        <label key={reason.value} className="block mb-2">
          <input
            type="radio"
            value={reason.value}
            onChange={() => {
              setSelectedReason(reason.value);
              setData('reason', reason.value);
            }}
            checked={selectedReason === reason.value}
            className="mr-2"
          />
          {reason.value}
        </label>
      ))}

      {selectedReason === 'Other' && (
        <textarea
          className="w-full mt-2 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          placeholder="Please describe the issue..."
          value={data.other}
          onChange={(e) => setData('other', e.target.value)}
          rows={4}
        />
      )}

      {errors.reason && <div className="text-red-500 text-sm mt-1">{errors.reason}</div>}
      {errors.other && <div className="text-red-500 text-sm mt-1">{errors.other}</div>}
      {status && <div className="text-red-500 text-sm mt-1">{status}</div>}

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded disabled:bg-opacity-20"
        disabled={!selectedReason || (selectedReason === 'Other' && !data.other)}
      >
        {processing ? (
          <i className="fa-solid fa-spinner fa-spin text-white"></i>
        ) : (
          'Submit Report'
        )}
      </button>
        <button
        onClick={closeModel}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded disabled:bg-opacity-20">
        Cancel
      </button>
    </form>
  </div>
</div>

  )
}
