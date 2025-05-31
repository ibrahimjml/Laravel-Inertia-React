import { useEffect, useRef, useState } from 'react';
import { router, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Commentsreplies({ comment, postId, level = 0 ,type,postuser}) {
  const {csrf } = usePage().props;
  const [likeTotal, setLikeTotal] = useState(comment.likes_sum_count ?? 0);
  const [userLikeCount, setUserLikeCount] = useState(comment.user_like_count ?? 0);
  const [pendingLikes, setPendingLikes] = useState(0);
  const [showLikeEffect, setShowLikeEffect] = useState(false);
  const [heartAnimation, setHeartAnimation] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const debounceTimer = useRef(null);
  const animationTimeoutRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModel,setShowModel] = useState(false);
  const MAX_LIKES = 30;

  const { data, setData, post, reset,processing,errors } = useForm({
    content: '',
    parent_id: comment.id,
  });

  const isReply = level > 0;

  const submitReply = (e) => {
    e.preventDefault();
    post(route('comment.create', postId ), {
      onSuccess: () => {
        reset();
        setShowReply(false);
      },
    });
  };

  const handleLike = () => {
    if (userLikeCount + pendingLikes >= MAX_LIKES){
      setShowLikeEffect(false);
      setHeartAnimation("animate-shake");
    
    clearTimeout(animationTimeoutRef.current);
    animationTimeoutRef.current = setTimeout(() => {
      setHeartAnimation("");
    }, 400);
    return;
    }

    setHeartAnimation("animate-pop");
    setShowLikeEffect(true);

    clearTimeout(animationTimeoutRef.current);
    animationTimeoutRef.current = setTimeout(() => {
      setHeartAnimation("");
      setShowLikeEffect(false);
    }, 400);

// send count likes to backend
    setPendingLikes((prev) => {
      const newCount = prev + 1;

      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        sendLikes(newCount);
      }, 1000);

      return newCount;
    });
  };

  const sendLikes = async (count) => {

    try {
      const response = await fetch(`/comments/${comment.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrf,
        },
        body: JSON.stringify({ type, id:comment.id, count }),
      });

      if (response.ok) {
        const data = await response.json();
         setUserLikeCount(data.userLikes);
        setLikeTotal(data.totalLikes);
      }
    } catch (err) {
      console.error("Failed to send likes", err);
    } finally {
      setPendingLikes(0);
    }
  };
    useEffect(() => {
      return () => {
        clearTimeout(animationTimeoutRef.current);
        clearTimeout(debounceTimer.current);
      };
    }, []);
    
const {data: editData,setData: setEditData, put,processing: editProcessing,errors: editErrors,} = useForm({
  content: comment.content,
});

  return (
    <div
      className={`${level === 0 ? 'border-b border-gray-200 dark:border-b-gray-600 pb-4 mb-4' : 'mt-3 relative'}`}
      style={{
        marginLeft: isReply ? `${level * 10}px` : 0,
        marginTop: isReply ? '20px' : '3px',
      }}
    >

      {isReply && (
        <div
          className="absolute left-0 top-0 h-4 w-px bg-gray-400"
          style={{ transform: 'translateX(-8px)' }}>
        </div>
      )}

      <div className="pl-2 text-xl ">
        <div className="flex">
          <i className="fa-solid fa-user mt-1 text-gray-500"></i>
          <div className="flex flex-col ml-3 w-full">
            <div className='flex gap-2 items-center w-full'>
              <p className="text-lg font-semibold dark:text-gray-200">
                {comment.user.name}
              </p>

              {postuser === comment.user.id && 
             <div className='flex items-center gap-1 text-xs'>
              <b>·</b>
              <p className=' text-white font-semibold bg-green-500 px-2 w-fit rounded-full text-center'>Author</p>
             </div>
                }
                <div className="relative flex items-center w-full">
            <button onClick={()=>{setShowModel(!showModel)}} className='w-fit ml-auto'>
            <i className="fa-solid fa-ellipsis-vertical"></i>
           </button>
           {/* undo likes,edit,delete model */}
             {showModel && (
              <div className={`absolute z-50 top-[-70px] right-[-6px] border dark:border-slate-200 bg-slate-600 dark:bg-slate-800 text-white rounded-lg overflow-hidden w-40`}>
                {userLikeCount > 0 && (
                  <button onClick={() => { handleUndo(); setShowModel(false); }} className="block w-full px-6 text-sm py-3 hover:bg-slate-700 text-left">
                    Undo <small className="text-red-500">+{userLikeCount}</small> Lik{userLikeCount > 1 ? "es" : "e"}
                  </button>
                )}
                {comment.can_modify && 
                <>
                <button onClick={() => {setIsEditing(true); setShowModel(false)}} className="block w-full px-6 text-sm py-3 hover:bg-slate-700 text-left">Edit</button>
                <button   onClick={() => {
                if (confirm("Are you sure?")) { router.delete(route('comment.delete', comment.id));}}}
                className="block w-full px-6 text-sm py-3 hover:bg-slate-700 text-left">
                  Delete
                </button>
                </>
                }
                
              </div>
          
            )}
            </div>
            </div>

            {isEditing ? (
          <form
          onSubmit={(e) => {
            e.preventDefault();
            put(route('comment.update', comment.id), {
              preserveScroll: true,
              onSuccess: () => setIsEditing(false),
            });
          }}>
    <textarea
      value={editData.content}
      onChange={(e) => setEditData('content',e.target.value)}
      className="w-full border p-1 rounded text-black"
    />
    {editErrors.content && <small className='text-red-500'>{editErrors.content}</small>}
    <div className="flex space-x-2 mt-1">
      <button
        type="submit"
        className="text-white bg-blue-500 px-2 py-1 rounded text-sm"
      >
      {editProcessing ? (<i className="fa-solid fa-spinner fa-spin text-white"></i>) : 'Save'}
      </button>
      <button onClick={() => {setIsEditing(false);}}
        className="text-sm text-gray-500" >
        Cancel
      </button>
    </div>
  </form>
) : (
  <p className="text-lg dark:text-gray-200">{comment.content}</p>
)}
          </div>
        </div>

        <button onClick={() => setShowReply(!showReply)} className="text-blue-500 text-xs mt-1" >
          {showReply ? 'Cancel' : 'Reply'}
        </button>

        {  comment.replies_count >0 &&
        <span  onClick={() => setShowReplies(!showReplies)}
         className=' text-xs ml-3 cursor-pointer'>
        <i className='fa-solid fa-comment dark:text-white mr-2'></i>{ comment.replies_count} {showReplies ? "Hide" : "Show"}</span>
        }
         <button className="px-2 py-1 text-sm rounded transition-all">
            <i onClick={handleLike} className={`fa-thumbs-up mr-2 ${(userLikeCount + pendingLikes > 0) ? "fa-solid " : "fa-regular  "} dark:text-slate-200 ${heartAnimation}`}></i>
            <span >
             {pendingLikes > 0 ? Number(likeTotal) + Number(pendingLikes) : likeTotal}
            </span>
          </button>
                
 
        {showReply && (
          <form onSubmit={submitReply} className="mt-2">
            <textarea
              className="w-full border rounded p-2 text-lg text-black"
              value={data.content}
              onChange={(e) => setData('content', e.target.value)}
              placeholder={`Reply to ${comment.user.name}`}
            />
            {errors.content && <small className='text-red-500'>{errors.content}</small>}
            <button
              type="submit"
              className="mt-1 block bg-blue-500 text-white px-2 py-1 rounded text-sm">
              {processing ? (<i className="fa-solid fa-spinner fa-spin text-white"></i>) : 'Reply'}
            </button>
          
          </form>
        )}

        {/* show replies */}
        {showReplies && comment.replies?.length > 0 && (
          <div className="mt-2">
            {comment.replies.map((reply) => (
              <Commentsreplies
                key={reply.id}
                comment={reply}
                postId={postId}
                postuser={postuser}
                level={level + 1}
                type={type}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
