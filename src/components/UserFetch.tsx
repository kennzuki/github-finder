import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaGithubAlt } from 'react-icons/fa6';
import { fetchGithubUser } from '../api/github';
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
              <div className="flex flex-col items-center space-y-4 text-center mt-6">
                  <img
                      src={data.avatar_url}
                      alt={data.login}
                      className='w-32 h-32 rounded-full mb-4'
                  />
                  <h2 className='text-2xl font-bold mb-2'>{data.name || data.login}</h2>
                  <a href={data.html_url} target='_blank' rel='noopener noreferrer' className='text-2xl bg-black text-white rounded-xl px-3 py-2 font-bold mb-2 flex place-items-center p-2'>
                      <FaGithubAlt className='mr-2' />
                      View Profile</a>
                  <p className='text-gray-600 mb-4'>{data.bio}</p>
                  <p className='text-gray-600 mb-4 text-center'>{data.location}</p>
                  <p className='text-gray-600 mb-4'>{data.company}</p>
                  <p className='text-gray-600 mb-4'>{data.email}</p>
              </div>)}
    </div>
  );
};

export default UserFetch;
