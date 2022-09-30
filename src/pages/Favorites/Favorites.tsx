import { useAppSelector } from '../../hooks/redux';
import { RepoCard } from '../../components/RepoCard/RepoCard';

export const Favorites = () => {
  const { favorites } = useAppSelector(state => state.github);
  if (favorites.length === 0) {
    return <div className='flex justify-center pt-10 h-screen w-screen'>No favorites</div>;
  }
  return (
    <div className='container px-5 py-5'>
      <div className='grid grid-cols-2  gap-5'>
        {favorites.map((favorite) => (
          <RepoCard repo={favorite} toRemove />
        ))}
      </div>
    </div>
  );
};
