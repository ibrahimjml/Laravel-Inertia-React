import {  Head, router, useForm, usePage } from '@inertiajs/react'
import Blogcard from '../Components/Blogcard';
import { route } from 'ziggy-js';
import Paginatelinks from '../Components/Paginatelinks';
import Removingfilters from '../Components/Removingfilters';
import Inputsearch from '../Components/Inputsearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Home({ posts, filters }) {
  const {auth} = usePage().props;

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
<<<<<<< HEAD
    {auth.user && <h1 className="text-2xl text-black dark:text-slate-200 text-center">Welcome, <span className='font-semibold'>{auth.user.name}</span></h1>}
    <div className="container flex flex-wrap lg:flex-row gap-3 mt-3 mx-auto w-[80%]">
{/* search */}
<div className="my-4 w-full flex justify-center">
<Inputsearch Search={Search} data={data.search} setData={(eo)=>{setData('search',eo.target.value)}}/>
</div>

{/* removing filters */}
<div className='flex items-center gap-3 w-full sm:w-auto'>
<Removingfilters filters={filters} sortValue={sortValue} username={username} params={params}/>
</div>
{/* sort options  */}
  <div className="mt-4 sm:w-auto lg:ml-auto">
=======
    {auth.user && 
    <h1 className="text-2xl text-black dark:text-slate-200 text-center">
      Welcome to blog,
      <span className='font-semibold'>&nbsp;{auth.user.name}</span>
      </h1>}
      <p className='text-lg text-center text-black/50 dark:text-gray-200/50'>Create and Search Posts, News, tips, and best practices for PHP and any technology.</p>
    <div className="flex gap-3 mt-3 items-center">
{/* search */}
<div className="my-4 flex-1">
<Inputsearch Search={Search} data={data.search} setData={(eo)=>{setData('search',eo.target.value)}}/>
</div>

{/* sort options  */}
  <div>
>>>>>>> origin/v1.0.3
  <select
    id="sort"
    value={String(data.sort || 'latest')}
    onChange={handleChange}
<<<<<<< HEAD
    className="block w-full px-4 py-2  border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
  >
=======
    className="block w-full h-12 px-4 py-2  border border-gray-300 rounded-lg dark:bg-gray-800/80 dark:text-white dark:border-gray-600 cursor-pointer"
    >
>>>>>>> origin/v1.0.3
    <option value="latest">Latest</option>
    <option value="oldest">Oldest</option>
    <option value="popular">Popular</option>
    <option value="followings">Followings</option>
    <option value="trend">Trending</option>
  </select>
</div>
      </div>
<<<<<<< HEAD
    <div className='container mx-auto w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 mt-5'>
=======
    {/* removing filters */}
    <div className='flex items-center gap-3 w-full sm:w-auto px-4'>
    <Removingfilters filters={filters} sortValue={sortValue} username={username} params={params}/>
    </div>
    <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 mt-5'>
>>>>>>> origin/v1.0.3

    {posts.data && posts.data.map((post) => (
        <div key={post.id}>
          <Blogcard post={post} request={filters}  type="post" id={post.id} auth={auth}/>
        </div>
      ))}
      
      </div>
<<<<<<< HEAD
      <div className='flex justify-center items-center mt-4 '>
=======
      <div className='flex justify-end items-center mt-4 '>
>>>>>>> origin/v1.0.3
      <Paginatelinks posts={posts}/>
      </div>
      
    
    </>
  )
}
