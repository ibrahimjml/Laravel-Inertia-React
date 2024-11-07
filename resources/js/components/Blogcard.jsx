import { Link } from "@inertiajs/react";
import moment from "moment";
import React from "react";
import { route } from "ziggy-js";

export default function Blogcard({ post }) {
  return (
    <div className="bg-white dark:border-2 border-slate-600 dark:bg-slate-800 rounded-md shadow-lg overflow-hidden h-full flex flex-col justify-between">
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
          <p>BY: {post.user.name}</p>
          {post.tags && (
            <div className="flex items-center justify-start gap-3 px-4 pb-3 mt-2">
              {post.tags.split(",").map((tag, index) => (
                <button
                  key={index}
                  className="bg-slate-600 px-2 py-px text-white text-sm rounded-full"
                >
                  {tag.trim()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
