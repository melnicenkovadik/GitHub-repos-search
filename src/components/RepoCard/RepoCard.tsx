import { IRepo } from '../../models/models';
import { MouseEvent } from 'react';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';

export const RepoCard = ({ repo, toRemove = false }: { repo: IRepo, toRemove?: boolean }) => {
  const {
    addFavorite,
    removeFavorite,
  } = useActions();
  const { favorites } = useAppSelector(state => state.github);

  function addToFav(event: MouseEvent<HTMLDivElement>) {
    addFavorite({
      html_url: repo.html_url,
      name: repo.name,
      description: repo.description,
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
      },
      forks: repo.forks,
      watchers: repo.watchers,
    });
  }

  function removeFromFav(event: MouseEvent<HTMLDivElement>) {
    removeFavorite(repo.html_url);
  }

  const isFavorite = favorites.some((favorite) => favorite.html_url === repo.html_url);

  return (
    <div className='border px-3 py-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
      <a href={repo.html_url} target='_blank'>
        <h2 className='text-lg font-bold'>{repo?.name}</h2>
        <p className='text-sm'>{repo?.description}</p>
      </a>
      <div className='flex items-center'>
        <img className='w-6 h-6 rounded-full mr-2' src={repo.owner.avatar_url} alt='avatar' />
        <p className='text-sm'>{repo?.owner?.login}</p>
      </div>
      <div className='flex items-center'>
        Forks: <span className='ml-1'>{repo?.forks}</span>
        <div className='px-2' />
        Watchers: <span className='ml-1'>{repo?.watchers}</span>
      </div>

      {!isFavorite ?
        <div className='cursor-pointer flex items-center px-2 py-3 font-bold bg-amber-300 hover:shadow-md w-fit h-[20px]' onClick={addToFav}>
          <span>Add </span>
        </div> :
        <div className='cursor-pointer flex items-center px-2 py-3 bg-red-500 font-bold hover:shadow-md w-fit h-[20px]' onClick={removeFromFav}>
          <span>Remove</span>
        </div>
      }

    </div>
  );
};