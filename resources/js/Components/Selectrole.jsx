import { useState } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function SelectRole({user, roles }) {
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
      {roles && roles.map(role =>(
        <option key={role.value} value={role.value}>{role.label}</option>
      ))}
    </select>
  );
}
