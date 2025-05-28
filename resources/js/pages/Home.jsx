import {  Head, Link, router, useForm, usePage } from '@inertiajs/react'
import Blogcard from '../components/Blogcard';
import { route } from 'ziggy-js';
import Paginatelinks from '../components/Paginatelinks';
import Removingfilters from '../components/Removingfilters';
import Inputsearch from '../Components/Inputsearch';

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
  <select
    id="sort"
    value={String(data.sort || 'latest')}
    onChange={handleChange}
    className="block w-full px-4 py-2  border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
  >
    <option value="latest">Latest</option>
    <option value="oldest">Oldest</option>
    <option value="popular">Popular</option>
    <option value="followings">Followings</option>
    <option value="trend">Trending</option>
  </select>
</div>
      </div>
    <div className='container mx-auto w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 mt-5'>

    {posts.data && posts.data.map((post) => (
        <div key={post.id}>
          <Blogcard post={post} request={filters}  type="post" id={post.id} auth={auth}/>
        </div>
      ))}
      
      </div>
      <div className='flex justify-center items-center mt-4 '>
      <Paginatelinks posts={posts}/>
      </div>
      
    
    </>
  )
}
