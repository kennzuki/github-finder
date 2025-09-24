import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
const UserFetch = () => {
  const [username, setUsername] = useState('');
    const [submittedUsername, setSubmittedUsername] = useState('');
    const{data,isLoading,isError,error}=useQuery({
      queryKey:['users',submittedUsername],
        queryFn: async () =>
            const res = await fetch(`import.meta.env.Vite_GITHUB_URL_API/users/${submittedUsername}`)
      if(!res.ok){
            throw new Error('User not found')
    }
            const data = await res.json()
            return data
    })
  return (
    <div className='max-3xl flec flex-col items-center rounded shadow-2xl'>
      <form action=''>
        <input type='text' value={username} className='' onClick={(e) => setSubmittedUsername(e.target.value)}/>
      </form>
    </div>
  );
};

export default UserFetch;
