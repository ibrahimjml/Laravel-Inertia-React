import {  Head, router, useForm, usePage } from '@inertiajs/react'
import Blogcard from '../Components/Blogcard';
import { route } from '@/ziggylocale';
import Paginatelinks from '../Components/Paginatelinks';
import Removingfilters from '../Components/Removingfilters';
import Inputsearch from '../Components/Inputsearch';
import { useMessagesT } from '@/i18n/helpers/useMessagesT';

export default function Home({ posts, filters }) {
  const {auth} = usePage().props;
  const m = useMessagesT();
  const{data,setData} = useForm({
    search: filters.search || '',
    sort: filters.sort || 'latest',
  })

const params = {
  ...(data.search?.trim() ? { search: data.search.trim() } : {}),
  ...(data.sort? {sort:data.sort} : {}),
  ...(filters.tag ? { tag: filters.tag } : {}),
  ...(filters.user ? { user: filters.user } : {}),
};

  const username = filters.user ? posts.data.find((l)=>l.user_id === Number(filters.user))?.user.name : null;

const Search =(eo)=>{
eo.preventDefault();

router.get(route('home',{...params}));
}
 const handleChange = (e) => {
    const newSort = e.target.value;
    setData('sort', newSort);
    router.get(route('home'), {
      ...params,
      sort: newSort
    }, {
      preserveState: true,
      
    });
  };
  const sortValue = typeof data.sort === 'string' ? data.sort.trim() : '';

  return (
    <>
    <Head title='Home' />
    {auth.user && 
    <h1 className="text-2xl text-black dark:text-slate-200 text-center">
      {m("blog")}
      </h1>}
      <p className='text-lg text-center text-black/50 dark:text-gray-200/50'>{m("Create_and_Search_Posts_News_tips_and_best_practices_for_PHP_and_any_technology")}</p>
    <div className="flex gap-3 mt-3 items-center">
{/* search */}
<div className="my-4 flex-1">
<Inputsearch Search={Search} data={data.search} setData={(eo)=>{setData('search',eo.target.value)}}/>
</div>

{/* sort options  */}
  <div>
  <select
    id="sort"
    value={String(data.sort || 'latest')}
    onChange={handleChange}
    className="block w-full h-12 px-4 py-2  border border-gray-300 rounded-lg dark:bg-gray-800/80 dark:text-white dark:border-gray-600 cursor-pointer"
    >
    <option value="latest">{m('latest')}</option>
    <option value="oldest">{m('oldest')}</option>
    <option value="popular">{m('popular')}</option>
    <option value="followings">{m('followings')}</option>
    <option value="trend">{m('trending')}</option>
  </select>
</div>
      </div>
    {/* removing filters */}
    <div className='flex items-center gap-3 w-full sm:w-auto px-4'>
    <Removingfilters filters={filters} sortValue={sortValue} username={username} params={params}/>
    </div>
    <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 mt-5'>

    {posts.data && posts.data.map((post) => (
        <div key={post.id}>
          <Blogcard post={post} request={filters}  type="post" id={post.id} auth={auth}/>
        </div>
      ))}
      
      </div>
      <div className='flex justify-end items-center mt-4 '>
      <Paginatelinks posts={posts}/>
      </div>
      
    
    </>
  )
}
