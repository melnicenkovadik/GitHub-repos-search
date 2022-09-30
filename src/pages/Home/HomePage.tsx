import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../../store/github/github.api';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { RepoCard } from '../../components/RepoCard/RepoCard';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export function HomePage() {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const { isLoading, isError, data } = useSearchUsersQuery(debouncedSearch, {
    skip: debouncedSearch.length < 3,
  });
  const [fetchRepos, { isLoading: isLoadingRepos, isError: isReposError, data: repos }] = useLazyGetUserReposQuery();
  const searchDropdownRef = useRef(null);

  useOutsideClick(searchDropdownRef, () => setShowDropdown(false));

  useEffect(() => {
    if (data?.length) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [data]);

  const renderRepos = () => {
    if (isLoadingRepos) {
      return <div className='flex justify-center pt-10 h-screen w-screen'>Loading...</div>;
    }

    if (isReposError) {
      return <div className='flex justify-center pt-10 h-screen w-screen'>Something went wrong</div>;
    }
    return repos?.map((repo: any) => (
      <RepoCard key={repo.id} repo={repo} />
    ));

  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  function onDivClick(userName: string) {
    fetchRepos(userName);
    setShowDropdown(false);
  }

  return (
    <div className='container px-5 py-5'>
      <div className='relative w-[560px]'>
        <input
          onChange={onInputChange}
          type='text'
          className='border py-2 px-4 mb-2 h-[42px]'
          placeholder='Search for github' />
        {showDropdown ?
          <div className='absolute overflow-scroll top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white'>
            {isLoading ? (<div className='flex justify-center pt-10 h-screen w-screen'>Loading...</div>) : null}
            {isError ? (<div className='flex justify-center pt-10 h-screen w-screen'>Something went wrong</div>) : null}
            {data?.map((user: any) => (
              <div
                ref={searchDropdownRef}
                key={user.id}
                className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
                onClick={() => onDivClick(user.login)}>
                <div>{user?.login}</div>
              </div>
            ))}
          </div> : null}
      </div>
      <div className='grid grid-cols-2 py-10 gap-5'>
        {renderRepos()}
      </div>
    </div>
  );
}