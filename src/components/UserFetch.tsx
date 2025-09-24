import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchGithubUser } from '../api/github';
import UserCard from './UserCard';
const UserFetch = () => {
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', submittedUsername],
      queryFn: ()=> fetchGithubUser(submittedUsername),
      enabled: !!submittedUsername,
  });
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmittedUsername(username.trim());
    }
    
  return (
    <div className='max-3xl items-center rounded shadow-2xl p-16'>
      <form onSubmit={handleSubmit}  className='flex flex-col items-center'>
        <input
          type='text'
          value={username}
          className='border border-gray-200 rounded shadow py-2 px-3 m-4'
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type='submit' className='py-2 px-3 rounded shadow bg-blue-500 text-white'>
          search
        </button>
          </form>
          {isLoading && <p>Loading...</p>}
          {isError && <p>{error.message}</p>}
          {data && (
              <UserCard user={data} />)}
    </div>
  );
};

export default UserFetch;
