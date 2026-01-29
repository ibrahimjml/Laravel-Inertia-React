import { useEffect, useRef } from 'react';
import { router, useForm, usePage } from '@inertiajs/react';
import Commentsreplies from './Commentsreplies';
import { route } from 'ziggy-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';

export default function Commentsmodel({ slug, comments, onClose,count ,type,canmodify,sort,postuserId,reasons}) {
  const {flash}= usePage().props;
  const { data, setData, post, reset, processing,errors } = useForm({ content: '' });

  const submitComment = (e) => {
    e.preventDefault();
  post(route('comment.create', slug), {
      preserveScroll:true,
      onSuccess: () =>  reset(),
      
    });
  };
    const{data: sortData,setData: setSortData} = useForm({
      sort: sort || 'New',
      
    });
const handleChange = (e) => {
    const newSort = e.target.value;
    setSortData('sort', newSort);
    router.get(route('posts.show',slug), {
      sort: newSort
    }, {
      preserveState: true,
      
    });
  };
useEffect(() => {
  document.body.style.overflow = 'hidden';
  return () => {
    document.body.style.overflow = '';
  };
}, []);
const FlashSuccess = useRef(null);
useEffect(() => {
  if (flash.success && flash.success !== FlashSuccess.current) {
    toast.success(flash.success);
    FlashSuccess.current = flash.success
  }
}, [flash.success]);
  return (
    <div className="fixed inset-0 z-50 bg-dark bg-opacity-70 flex justify-end">

      {/* Slide panel */}
      <div className="relative w-full max-w-md h-full dark:bg-dark bg-white shadow-xl transform transition-transform duration-300 translate-x-0">
        <h3 className="text-lg font-semibold ml-3 mt-3">Comments ({count})</h3>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 dark:text-white hover:text-gray-500 text-xl">
          <FontAwesomeIcon icon='times'></FontAwesomeIcon>
        </button>

        {/* Content */}
        <div className="pr-4 overflow-y-auto h-full pt-12 scrollbar-dark">
          <form onSubmit={submitComment} className="mb-4 border-b border-b-gray-200 dark:border-b-gray-600 pb-4">
            <textarea
              className="w-full ml-3 bg-transparent border-none focus:outline-none focus:ring-0 rounded p-2"
              value={data.content}
              onChange={(e) => setData('content', e.target.value)}
              placeholder="Write a thoughtful comment"
            />
            {errors.content && <small className='text-red-500'>{errors.content}</small>}
            <button
              type="submit"
              className="mt-2 block ml-auto rounded-full bg-blue-500 text-white px-4 py-1 "
            >
            {processing ? (<FontAwesomeIcon icon='spinner' spin className=" text-white"></FontAwesomeIcon>) : 'Comment'}
            </button>
          </form>
        {/* sort comments */}
        <div className='block ml-2'>
          <select
            id="sort"
            value={sortData.sort}
            onChange={handleChange}
            className="px-3 py-1 mb-10 border rounded-lg dark:bg-transparent dark:text-white dark:border-gray-600">
            <option value="Top" className='dark:bg-dark'>Top Comments</option>
            <option value="New" className='dark:bg-dark'>New Comments</option>
          </select>
        </div>
          
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <Commentsreplies
                key={comment.id}
                comment={comment}
                slug={slug}
                postuser={postuserId}
                level={0}
                type={type}
                reasons={reasons}
                canmodify={canmodify}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
