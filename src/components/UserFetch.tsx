import { useState,useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGithubUser, searchGithubUser } from '../api/github';
import RecentUser from './RecentUser';
;

import UserCard from './UserCard';
import { useDebounce } from 'use-debounce';

import SuggestionDropdown from './SuggestionDropDown';
const UserFetch = () => {
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');
   const [recentUsers, setRecentUsers] = useState<string[]>(() => {
    const stored = localStorage.getItem('recentUsers');
    return stored ? JSON.parse(stored) : [];
   });
  
  const [debouncedUsername] = useDebounce(username, 300);
  const[showSuggestions, setShowSuggestions] = useState(false);


  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users', submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),
    enabled: !!submittedUsername,
  });
  // Query to fetch suggestions for user search
  const { data: suggestions } = useQuery({
    queryKey: ['github-user-suggestions', debouncedUsername],
    queryFn: () => searchGithubUser(debouncedUsername),
    enabled: debouncedUsername.length > 1,
  });

  useEffect(() => {
    localStorage.setItem('recentUsers', JSON.stringify(recentUsers));
  }, [recentUsers]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    setSubmittedUsername(trimmed);
    setUsername('');

    setRecentUsers((prev) => {
      const updated = [trimmed, ...prev.filter((u) => u !== trimmed)];
      return updated.slice(0, 5);
    });
  };

   useEffect(() => {
    localStorage.setItem('recentUsers', JSON.stringify(recentUsers));
  }, [recentUsers]);

  return (
    <div className='max-3xl items-center rounded shadow-2xl p-16'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <div className="">
          <input
          type='text'
          value={username}
          className='border border-gray-200 rounded shadow py-2 px-3 m-4 w-full'
          placeholder='username'
            onChange={(e) => {
              const value = e.target.value;
              setUsername(value)
              setShowSuggestions(value.trim( ).length > 1);
            }}
          />
        {showSuggestions && suggestions?.length > 0 && (
            <SuggestionDropdown
              suggestions={suggestions}
              show={showSuggestions}
              onSelect={(selected) => {
                setUsername(selected);
                setShowSuggestions(false);

                if (submittedUsername !== selected) {
                  setSubmittedUsername(selected);
                } else {
                  refetch();
                }

                setRecentUsers((prev) => {
                  const updated = [
                    selected,
                    ...prev.filter((u) => u !== selected),
                  ];
                  return updated.slice(0, 5);
                });
              }}
            />
          )}
        </div>
        
        <button
          type='submit'
          className='py-2 px-3 rounded shadow bg-blue-500 text-white w-full'
        >
          search
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {data && <UserCard user={data} />}
      {recentUsers.length > 0 && (
        <RecentUser
          users={recentUsers}
          onSelect={(username) => {
            setUsername(username);
            setSubmittedUsername(username);
          }}
        />
      )}
    </div>
  );
};

export default UserFetch;
