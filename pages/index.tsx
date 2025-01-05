import type { NextPage, InferGetStaticPropsType } from 'next';
import Head from '../components/header/head';
import Header from '../layouts/header';
// import styles from '../styles/Home.module.css';
import { BaseLayout } from '../layouts/base-layout';
import Backdrop from '../components/background/backdrop';
import BgImage from '../components/background/bg-image';
import { getCars, Cars } from '../data/cars';
// import { BodyLayout } from '../layouts/body-layout';
// import HomeBody from '../layouts/home/body';
import { Card } from '../components/card';
import { useAuth } from '../auth/AuthContext';

const Home: NextPage = (props) => {
  const { cars }: any = props;
  const { getAuthUser } = useAuth();
  const authData = getAuthUser();
  return (
    <BaseLayout>
      <Head/>
      <BgImage>
        <Header authData={authData} />
        <Backdrop>
          <main className='h-screen block box-border pt-[0px] overflow-y-auto px-5'>
            <div className='w-full
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
              {cars.map((car: any) => {
                return <Card car={car} key={car._id} />;
              })}
            </div>
          </main>
        </Backdrop>
      </BgImage>
    </BaseLayout>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const { cars } = await getCars();

  // Pass data to the page via props
  return { props: { cars } };
}

export default Home
