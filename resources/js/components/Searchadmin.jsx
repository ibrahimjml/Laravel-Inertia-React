import { router, useForm } from '@inertiajs/react';
import React from 'react'
import { route } from 'ziggy-js';
import Inputsearch from './Inputsearch';

export default function Searchinput({search,suspend}) {
  const{data,setData} = useForm({

    search: search || "",
    suspend: suspend?? false
  });
  const Search = (eo) => {
    eo.preventDefault();

    router.get(route('users.page'),{
      search: data.search,
      suspend: suspend?? false
    });
  };
  return (
<Inputsearch Search={Search} data={data.search} setData={(eo)=>{setData('search',eo.target.value)}}/>
  )
}
