import { FaGithubAlt } from 'react-icons/fa6';
import type { GithubUser } from '../type';


const UserCard = ({ user }: { user: GithubUser }) => {
    return ( 
        <div className="flex flex-col items-center space-y-4 text-center mt-6">
                  <img
                      src={user.avatar_url}
                      alt={user.login}
                      className='w-32 h-32 rounded-full mb-4'
                  />
                  <h2 className='text-2xl font-bold mb-2'>{user.name || user.login}</h2>
                  <a href={user.html_url} target='_blank' rel='noopener noreferrer' className='text-2xl bg-black text-white rounded-xl px-3 py-2 font-bold mb-2 flex place-items-center p-2'>
                      <FaGithubAlt className='mr-2' />
                      View Profile</a>
                  <p className='text-gray-600 mb-4'>{user.bio}</p>
                  <p className='text-gray-600 mb-4 text-center'>{user.location}</p>
                  <p className='text-gray-600 mb-4'>{user.company}</p>
                  <p className='text-gray-600 mb-4'>{user.email}</p>
              </div>
     );
}
 
export default UserCard;