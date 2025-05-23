import { Link, router} from "@inertiajs/react";
import moment from "moment";
import { route } from "ziggy-js";

export default function Blogcard({post,request}) {
  
  const params={
    ...(request.search && {search:request.search}),
    ...(request.user_id && {user_id:request.user_id}),
    ...(request.tag && {tag:request.tag})
    
  };
  const selectTag = (tag) => {
    router.get(route("home", { ...params, tag: tag.trim() }));

  }

  const selectname = (userID)=>{
    router.get(route("home",{...params,user_id:userID}));
  }
  
  return (
    <div className="bg-white dark:border-2 border-slate-600 dark:bg-gray-800 rounded-md shadow-lg overflow-hidden h-full flex flex-col justify-between">
      <div>
        <Link href={route('posts.show',post.id)}>
          <img
            className="w-full h-48 object-cover object-center"
            src={
              post.image
                ? `/images/${post.image}`
                : "storage/images/default.jpg"
            }
            alt=""
          />
        </Link>
        <div className="p-4">
          <h3 className="font-bold text-xl mb-2">
            {post.title.slice(0, 60)}...
          </h3>
          <p>
            Posted : {moment(post.created_at).fromNow()}
          </p>
          <span>BY: <button onClick={()=>selectname(post.user.id)} className="font-semibold text-green-500 dark:text-blue-500">{post.user.name}</button></span>
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex items-center justify-start gap-3 px-4 pb-3 mt-2">
              {post.hashtags.map((tag) => (
                <button
                onClick={() => selectTag(tag.name)}
                  key={tag.id}
                  className="bg-slate-600 px-2 py-px text-white text-sm rounded-full"
                >
                  {tag.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
