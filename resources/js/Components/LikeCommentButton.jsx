import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function LikeCommentButton({
  onLike,
  displayTotal,
  userLikeCount,
  pendingLikes,
  heartAnimation,
  showLikeEffect}) {
  return (
    <>
    <button className="px-2 py-1 text-sm ml-2 rounded transition-all">
          <FontAwesomeIcon 
                onClick={onLike} 
                icon={[(displayTotal > 0) ? 'fas':'far','thumbs-up']} 
                className={`fa-thumbs-up mr-2  dark:text-slate-200 ${heartAnimation}`}>
          </FontAwesomeIcon>
          <span>
            {displayTotal}
          </span>
    </button>
    {showLikeEffect && (
     <div className="inline-flex items-center justify-center w-7 h-7 px-2 rounded-full dark:bg-red-500 bg-dark animate-bounce">
       <div className="text-white text-sm font-bold">+{Number(userLikeCount + pendingLikes)}</div>
     </div>
     )}
  </>
  )
}
