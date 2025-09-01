import { Search as SearchIcon } from "lucide-react";

const SearchIdle = () => {
  return (
    <div className='text-center py-16'>
      <SearchIcon className='w-16 h-16 text-gray-500 mx-auto mb-4' />
      <h2 className='text-2xl font-bold mb-2'>Start Your Search</h2>
      <p className='text-gray-500 max-w-md mx-auto'>
        Enter a movie or TV show title above to discover amazing content
        from around the world.
      </p>
    </div>
  );
};

export default SearchIdle;
