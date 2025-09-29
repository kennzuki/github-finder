import type { GithubUser } from '../type';

type SuggestionDropdownProps = {
  suggestions: GithubUser[];
  show: boolean;
  onSelect: (username: string) => void;
};

const SuggestionDropdown = ({
  suggestions,
  show,
  onSelect,
}: SuggestionDropdownProps) => {
  if (!show || suggestions.length === 0) return null;

  return (
  <ul className="absolute bg-white border border-gray-200 rounded shadow py-2 px-3 mt-[0.25rem]-4 w-[250px] overflow-y-auto z-10">
      {suggestions.slice(0, 5).map((user: GithubUser) => (
        <li className='flex gap-2 items-center mb-4 capitalize ' key={user.login} onClick={() => onSelect(user.login)}>
          <img src={user.avatar_url} alt={user.login} className='w-8 h-8 rounded-full' />
          {user.login}
         
        </li>
      ))}
    </ul>
  );
};

export default SuggestionDropdown;