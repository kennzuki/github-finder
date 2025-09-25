import { FaClock, FaUser } from 'react-icons/fa';
import { QueryClient } from '@tanstack/react-query';
import { fetchGithubUser } from '../api/github';

type RecentSearchUersProps = {
  users: string[];
  onSelect: (user: string) => void;
};

const RecentUser = ({ users, onSelect }: RecentSearchUersProps) => {

  const queryClient = new QueryClient();
  return (
    <div className='flex flex-col items-center bg-gray-100 p-4 rounded shadow mt-6'>
      <div className='flex gap-3 items-center'>
        <FaClock />
        <h1 className='text-2xl font-bold'>Recent Users</h1>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user}>
            <button
              onClick={() => onSelect(user)}
              onMouseOver={() => {
                queryClient.prefetchQuery({
                  queryKey: ['users', user],
                  queryFn: () => fetchGithubUser(user),
                })
              }}
              className='w-[250px] py-2 px-3 rounded shadow-xl bg-gray-200 text-black flex gap-2 items-center mx-auto mt-4'
            >
              <FaUser />
              {user}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentUser;
