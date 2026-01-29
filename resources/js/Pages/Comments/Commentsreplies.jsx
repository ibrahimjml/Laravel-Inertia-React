import { useState } from 'react';
import { router, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import moment from 'moment';
import Commentreport from './Commentreport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useLikes from '@/Hooks/useLikes';
import LikeCommentButton from '@/Components/Ui/LikeCommentButton';

export default function Commentsreplies({ comment, slug, level = 0 ,type,postuser,reasons}) {
  const {csrf} = usePage().props;
    // Likes Hook
  const { userLikeCount, displayTotal, pendingLikes, showLikeEffect, heartAnimation, handleLike, handleUndo} = useLikes({
      type: "comment",
      id: comment.id,
      csrf,
      initialUserLikes: comment.user_like_count ?? 0,
      initialTotalLikes: comment.likes_sum_count ?? 0,
     });
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showModel,setShowModel] = useState(false);
  const [showReportModel,setShowReportModel] = useState(false);


  const { data, setData, post, reset,processing,errors } = useForm({
    content: '',
    parent_id: comment.id,
  });

  const isReply = level > 0 ;

  const submitReply = (e) => {
    e.preventDefault();
    post(route('comment.create', slug ), {
      onSuccess: () => {
        reset();
        setShowReply(false);
      },
    });
  };

  const {data: editData,setData: setEditData, put,processing: editProcessing,errors: editErrors,} = useForm({
    content: comment.content,
  });

  const openReportModel = ()=>{
  setShowReportModel(true);
  setShowReplies(false);
  setShowModel(false);
  }

const buttonsCount = (userLikeCount > 0 ? 1 : 0) + (comment?.can_modify  ? 2 : 0) + (comment?.can_report ? 1 : 0);

  return (
    <div className={ 'relative mb-4' }>
    
    {/* report comment model */}
    {showReportModel &&
     <Commentreport commentID={comment.id} reasons={reasons} closeModel={()=>{setShowReportModel(false)}}/>
     }
    {isReply && (
      <div className="absolute top-0 bottom-0 w-px h-8 bg-gray-400"
            style={{ left: '-8px' }}></div>
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
           { comment.parent?.user && ( 
            <p className="text-sm text-gray-500 dark:text-gray-400"> 
            Replying to 
            <span className="font-semibold">
              @{comment.parent.user.name}
            </span>
             </p> )}
            
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
        
          <LikeCommentButton
                 onLike = {handleLike}
                 displayTotal = {displayTotal}
                 userLikeCount = {userLikeCount}
                 pendingLikes = {pendingLikes}
                 heartAnimation = {heartAnimation}
                 showLikeEffect = {showLikeEffect}
          />
      
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
                slug={slug}
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
