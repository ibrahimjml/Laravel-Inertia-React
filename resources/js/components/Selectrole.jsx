import { useState } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function SelectRole({ user }) {
  const [selectedRole, setSelectedRole] = useState(user.role);

  const handleChange = (e) => {
    const newRole = e.target.value;
    setSelectedRole(newRole); 

  
    router.put(route('user.updaterole', user.id), {
      role: newRole,  
      preserveState: true,  
    });
  };

  return (
    <select
      className="bg-gray-100 rounded p-2 dark:bg-slate-700 dark:text-slate-200"
      value={selectedRole} 
      onChange={handleChange} 
    >
      <option value="admin">Admin</option>
      <option value="subscriber">Subscriber</option>
      <option value="suspended">Suspended</option>
    </select>
  );
}
