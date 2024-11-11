import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Selectrole({ user }) {
  const { setData, put } = useForm({
    role: user.role, 
  });

  const handleChange = (eo) => {
    const newRole = eo.target.value;
    setData('role', newRole); 

  
    put(route('user.updaterole',user.id), {
      data: { role: newRole },
      preserveScroll: true,
    
    
    });
  };

  return (
    <select
      className="bg-gray-100 rounded p-2 dark:bg-slate-700 dark:text-slate-200"
      value={user.role} 
      onChange={handleChange}
    
    >
      <option value="admin">Admin</option>
      <option value="subscriber">Subscriber</option>
      <option value="suspended">Suspended</option>
    </select>
  );
}
