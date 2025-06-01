import { useEffect, useRef, useState } from 'react';
import { router, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import moment from 'moment';
import Commentreport from './Commentreport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Commentsreplies({ comment, postId, level = 0 ,type,postuser,reasons}) {
  const {csrf,auth } = usePage().props;
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
  const [showReportModel,setShowReportModel] = useState(false);
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
      const response = await fetch(route('comments.likes',comment.id), {
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

  const handleUndo = async () => {
    try {
      const response = await fetch(route('comments.undo',comment.id), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrf,
        },
        body: JSON.stringify({ type, id:comment.id }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserLikeCount(data.userLikes);
        setLikeTotal(data.totalLikes);
      }
    } catch (error) {
      console.error("Undo failed", error);
    }
  };

  const {data: editData,setData: setEditData, put,processing: editProcessing,errors: editErrors,} = useForm({
    content: comment.content,
  });

  const openReportModel = ()=>{
  setShowReportModel(true);
  setShowReplies(false);
  setShowModel(false);
  }
    useEffect(() => {
      return () => {
        clearTimeout(animationTimeoutRef.current);
        clearTimeout(debounceTimer.current);
      };
    }, []);

const buttonsCount = (userLikeCount > 0 ? 1 : 0) + (comment?.can_modify  ? 2 : 0) + (comment?.can_report ? 1 : 0);
console.log(buttonsCount);
  return (
    <div
      className={`${level === 0 ? 'border-b border-gray-200 dark:border-b-gray-600 pb-7 mb-4' : 'mt-3 relative pb-2'}`}
      style={{ marginLeft: isReply ? `${level * 10}px` : 0,}}>
    
    {/* report comment model */}
    {showReportModel &&
     <Commentreport commentID={comment.id} reasons={reasons} closeModel={()=>{setShowReportModel(false)}}/>
     }
      {isReply && (
        <div
          className="absolute left-0 top-0 h-10 w-px bg-gray-400"
          style={{ transform: 'translateX(-8px)' }}>
        </div>
      )}

      <div className="pl-2 text-xl ">
        <div className="flex">
          <FontAwesomeIcon icon='user' className=" mt-1 text-gray-500"></FontAwesomeIcon>
          <div className="flex flex-col ml-3 w-full">
            <div className='flex gap-2 items-center w-full'>
            <div className="flex flex-col w-full">
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold dark:text-gray-200">
                {comment.user.name}
              </p>
              {postuser === comment.user.id && 
                <div className="text-xs text-white font-semibold bg-green-500 px-2 w-fit rounded-full text-center">
                  Author
                </div>
              }
            </div>
            <span className="text-xs text-gray-500 w-full mb-3">{moment(comment.created_at).fromNow()}</span>
          </div>
              
            <div className="relative flex items-center w-full">
              {(userLikeCount > 0 || comment.can_modify || comment.can_report) && (
            <button onClick={()=>{setShowModel(!showModel)}} className='w-fit ml-auto'>
            <FontAwesomeIcon icon='ellipsis-vertical'></FontAwesomeIcon>
           </button>
              )}
             {/* undo likes,edit,delete model */}
             {showModel && (
              <div className={`absolute z-50 ${buttonsCount === 3  ? 'top-[-170px]': buttonsCount === 2 ? 'top-[-110px]':'top-[-70px]'} right-[-6px] border border-black dark:border-slate-200 bg-white dark:bg-dark text-white rounded-lg overflow-hidden w-40`}>
                {userLikeCount > 0 && (
                  <button onClick={() => { handleUndo(); setShowModel(false); }} className="block w-full px-6 text-sm py-3 text-black dark:text-white dark:hover:bg-slate-900 ">
                    Undo <small className="text-red-500">+{userLikeCount}</small> Lik{userLikeCount > 1 ? "es" : "e"}
                  </button>
                )}
                {comment.can_report && 
                  <button
                onClick={openReportModel}
                 className='className="block w-full px-6 text-sm py-3 text-black dark:text-white dark:hover:bg-slate-900 '>
                  Report
                  </button>
                }
                {comment.can_modify && 
                <>
                <button onClick={() => {setIsEditing(true); setShowModel(false)}} className="block w-full px-6 text-sm py-3 text-black dark:text-blue-600 font-semibold dark:hover:bg-slate-900 ">Edit</button>
                <button   onClick={() => {
                  setShowModel(false);
                if (confirm("Are you sure?")) { router.delete(route('comment.delete', comment.id));}}}
                className="block w-full px-6 text-sm py-3 dark:text-red-600 text-black font-semibold dark:hover:bg-slate-900 ">
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

        <button onClick={() => setShowReply(!showReply)} className="text-blue-500 font-semibold text-xs mt-1" >
          {showReply ? 'Cancel' : 'Reply'}
        </button>

        {  comment.replies_count >0 &&
        <span  onClick={() => setShowReplies(!showReplies)}
         className=' text-xs ml-3 cursor-pointer'>
        <FontAwesomeIcon icon='comment' className=' dark:text-white mr-2'></FontAwesomeIcon>{ comment.replies_count} {showReplies ? "Hide" : "Show"}</span>
        }
        
           <button className="px-2 py-1 text-sm ml-2 rounded transition-all">
              <FontAwesomeIcon 
               onClick={handleLike} 
              icon={[(userLikeCount + pendingLikes > 0) ? 'fas':'far','thumbs-up']} 
              className={`fa-thumbs-up mr-2  dark:text-slate-200 ${heartAnimation}`}>
              </FontAwesomeIcon>
              <span >
               {pendingLikes > 0 ? Number(likeTotal) + Number(pendingLikes) : likeTotal}
              </span>
            </button>
              {showLikeEffect && (
               <div className="inline-flex items-center justify-center w-7 h-7 px-2 rounded-full dark:bg-red-500 bg-dark animate-bounce">
                 <div className="text-white text-sm font-bold">+{userLikeCount + pendingLikes}</div>
               </div>
             )}
      
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
              {processing ? (<FontAwesomeIcon icon='spinner' spin className=" text-white"></FontAwesomeIcon>) : 'Reply'}
            </button>
          
          </form>
        )}

        {/* show replies */}
        {showReplies &&  comment.replies?.length > 0 && (
          <div className="mt-2">
            {comment.replies.map((reply) => (
              <Commentsreplies
                key={reply.id}
                comment={reply}
                postId={postId}
                reasons={reasons}
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
