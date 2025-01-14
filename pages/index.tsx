import React from 'react';
import type { NextPage } from 'next';
import PropTypes from 'prop-types';
import { getCars, Car } from '../data/cars';
import { Card } from '../components/card';
import GeneralLayout from '../layouts/gen-layout';

interface HomeProps {
  cars: Array<Car>;
}

const Home: NextPage<HomeProps> = (props) => {
  const { cars } = props;
  return (
    <GeneralLayout>
      <main className='h-screen block box-border pt-[0px] overflow-y-auto px-5'>
        <div
          className='w-full
              min-h-full
              grid
              grid-cols-1
              sm:grid-cols-1
              md:grid-cols-2
              lg:grid-cols-2
              xl:grid-cols-3
              2xl:grid-cols-4
              place-content-start
              py-5
              gap-8
              box-border'
        >
          {cars.map((car: Car) => {
            return <Card car={car} key={car._id} />;
          })}
        </div>
      </main>
    </GeneralLayout>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const { cars } = await getCars();

  // Pass data to the page via props
  return { props: { cars } };
}
Home.propTypes = {
  cars: PropTypes.array.isRequired,
};

export default Home;
