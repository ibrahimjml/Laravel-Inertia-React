import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Postreportmodel({ close, reasons, postID }) {
  const { props } = usePage();
  const status = props.flash?.error;

  const [selectedReason, setSelectedReason] = useState('');
  const { data, setData, post, processing, errors, reset } = useForm({
    reason: '',
    other: '',
    post_id: postID,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('post.report'), {
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[40%] max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={close}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <i className="fa-solid fa-close text-black dark:text-white"></i>
        </button>
        <form onSubmit={handleSubmit}>
          <h2 className="font-bold mb-2">Report This Post</h2>

          {reasons.map((reason) => (
            <label key={reason.value} className="block">
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

          {errors.reason && <div className="text-red-500 text-sm">{errors.reason}</div>}
          {errors.other && <div className="text-red-500 text-sm">{errors.other}</div>}
          {status && <div className="text-red-500 text-sm">{status}</div>}
          <button 
          type="submit"
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded disabled:bg-opacity-20"
          disabled={!selectedReason || (selectedReason === 'Other' && !data.other)}
           >
            {processing ? (
              <i className="fa-solid fa-spinner fa-spin text-white"></i>
            ) : (
              'Submit report'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
