import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { route } from 'ziggy-js'
import moment from "moment";
import Morearticles from '../components/Morearticles';
import Postreportmodel from '../Components/Postreportmodel';
import Commentitem from './Comments/Commentsreplies';
import Commentsmodel from './Comments/Commentsmodel';


export default function Show({ posts,canmodify,tags,morearticles,reportReasons}) {
  const {auth,comments,sort} = usePage().props;
  // const [userLikeCount, setUserLikeCount] = useState(posts.user_like ?? 0);
  // const [likeTotal, setLikeTotal] = useState(posts.likes_sum_count ?? 0);
  const [isFollowing, setIsFollowing] = useState(posts.user.is_followed ?? false);
  const [showmodel,setshowmodel] = useState(false);
  const [showReportmodel,setshowReportmodel] = useState(false);
  const [showcommentmodel,setshowCommentmodel] = useState(false);
  const { delete: destroy } = useForm();

 const togglemodel = ()=> setshowmodel(!showmodel);

  const handleDelete = (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      destroy(route('posts.destroy', postId), {
        preserveScroll: true,
      });
    }
  }
  const handleFollowToggle = () => {
  router.post(route('togglefollow', posts.user.id), {}, {
    preserveState: true,
    preserveScroll: true,
    onSuccess: () => {
      setIsFollowing((prev) => !prev);
      setshowmodel(false);
    },
  });
};
const opencomment = ()=>{
  setshowCommentmodel(true);
}

  return (
    <>
    <Head title={posts.title.slice(0,5)}/>
      <div className=' flex justify-center'>

        <div className=" bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-[50%] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="p-5 roubded-lg object-cover w-full rounded-t-lg h-96 md:h-auto  md:rounded-none md:rounded-s-lg"
            src={posts.image} 
            alt={posts.title}/>
             <div className='py-5 px-4 leading-normal'>
              <div className='flex items-center justify-center'>
                <h5 className="mb-2 text-3xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{posts.title}</h5>
                <span className="ml-2">
                <b>·</b>
                <small className="ml-2">
                  <i className="fa-solid fa-clock mr-2"></i>{moment(posts.created_at).fromNow()}</small>
              </span>
              </div>
              <span className='flex justify-center items-center pb-3'>
            <i className="fa-solid fa-user text-gray-600 dark:text-white"></i>
            <button
              className="font-semibold ml-2 text-green-500 dark:text-blue-500"
            >
              {posts.user.name}
            </button>
            {isFollowing && (
            <span className="ml-2">
              <b>·</b>
            <small className="ml-2">Following</small>
              </span>
            )}
              
            
          </span>
            </div>
            <div className='flex justify-between mr-3'>
             <div className='flex items-center justify-start gap-3 px-4 pb-3 '>
              {tags && tags.map((tag) => (
                <button
                  key={tag}
                  className="bg-slate-600 px-2 py-px text-white text-sm rounded-full"
                >
                  {tag}
                </button>
              ))}
            </div> 
            <div className='relative'>
             <button onClick={togglemodel}>
             <i className="fa-solid fa-ellipsis"></i>
              </button>
                {/* show model  */}
            {showmodel && (
          <div className={`absolute z-50 ${!canmodify ? 'top-[-100px]':'top-[-170px]'} right-[-6px] border dark:border-slate-200 bg-slate-600 dark:bg-slate-800 text-white rounded-lg overflow-hidden w-40`}>
            {canmodify &&(
              <>
              <Link href={route('posts.edit',posts.id)} className='block w-full px-6 py-3 hover:bg-slate-700 text-left '>Edit</Link>
              <button onClick={() => handleDelete(posts.id)} className='block w-full px-6 py-3 hover:bg-slate-700 text-left '>Delete</button>
              </>
            )}
            {auth.user.id !== posts.user.id &&
            <button
        onClick={handleFollowToggle}
          className="block w-full px-6 py-3 hover:bg-slate-700 text-left ">
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
            }
        
        <button onClick={()=>{setshowReportmodel(!showReportmodel)}} className="block w-full px-6 py-3 hover:bg-slate-700 text-left ">Report</button>
      </div>
        )}
        </div>
          </div>
          
        </div>

      </div>
        <div className='md:w-[50%] mx-auto mt-5 leading-4'>
            <p className="mb-3 font-normal lg:text-xl text-gray-700 dark:text-gray-400">{posts.description}</p>
        </div>
        {/* like|comment|share model */}
       <div className="flex  items-center gap-2 mx-auto bg-white dark:bg-dark border-2 dark:border-gray-500 rounded-full w-fit px-4 py-4 divide-x divide-gray-500 dark:divide-gray-400 my-2 text-sm font-medium">
         <span className="px-2  h-full flex items-center justify-center gap-1 ">
           <i className="fa-solid fa-heart text-red-500"></i>
            <b>+{posts.likes_sum_count}</b>
         </span>
         <span onClick={opencomment} className="px-2  h-full flex items-center justify-center gap-1 cursor-pointer">
           <i className="fa-regular fa-comment dark:text-white"></i> 
           {posts.comments_count >0 && <b>+{posts.comments_count}</b>}
         </span>
         <span className="px-2 h-full  py-1 flex items-center justify-center gap-1 ">
           <i className="fa-solid fa-share dark:text-white"></i> 
         </span>
         </div>

      {/* more articles */}
      {morearticles.length >0 && (
        <>
      <p className="text-gray-500 text-lg text-center font-semibold mt-5 uppercase">More Articles</p>
      <div className='w-[80%] grid gap-10 mx-auto mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
      { morearticles.map((post) => (
        <Morearticles key={post.id} post={post}/>
      ))}
      </div>
      </>
    )}
    {/* report model */}
    { showReportmodel &&(
  <Postreportmodel close={() => setshowReportmodel(false)} reasons={reportReasons} postID={posts.id}/>
    )}
    {/* comment model */}
    { showcommentmodel && 
    <Commentsmodel 
     count={posts.comments_count} 
     postId={posts.id}
     postuserId={posts.user.id}
     comments={comments} 
     onClose={() => setshowCommentmodel(false)} 
     type="comment"
     sort={sort}
     />
    }
    </>
  )
}
