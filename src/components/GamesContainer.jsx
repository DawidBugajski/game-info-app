import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { API_KEY, BASE_URL } from 'utils/constans';
import Carousel from './Carousel';

const GamesContainer = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['gamesHomePage'],

    // APi returns only 20 results (games), if you want pring the top 100, You have to loop it.
    queryFn: async () => {
      const promises = [];
      for (let i = 1; i <= 5; i++) {
        promises.push(
          axios.get(`${BASE_URL}?key=${API_KEY}&ordering=-ordering&page=${i}`)
        );
      }

      const responses = await Promise.all(promises);
      const games = responses.reduce(
        (acc, curr) => acc.concat(curr.data.results),
        []
      );
      return games;
    },
  });
  if (isLoading) return 'Loading...';
  if (error) return `Error ${error.message}`;
  console.log(data);

  return (
    <div className='bg-[#181A1B] relative'>
      <h2 className='absolute ml-6 text-2xl italic font-semibold -top-12'>
        Top 100 games of{' '}
        <span class='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-white relative inline-block mx-2'>
          <span class='relative text-main-red'>all</span>
        </span>{' '}
        time
      </h2>
      <Carousel data={data} />
    </div>
  );
};

export default GamesContainer;

// should i rename this component?
