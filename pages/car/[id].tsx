import { NextPage } from "next";
import Error from "next/error";
import { useRouter } from 'next/router';
import { BaseLayout } from '../../layouts/base-layout';
import Head from '../../components/header/head';
import BgImage from "../../components/background/bg-image";
import Header from "../../layouts/header";
import Backdrop from "../../components/background/backdrop";
import { getCarAndOwner } from "../../data/cars";
import { CardBig } from "../../components/card/big-card";

const Car: NextPage = (props) => {
  const router = useRouter()
  const { car, statusCode }: any = props;
  if (statusCode === 200) {
    return (
      <BaseLayout>
        <Head/>
        <BgImage>
          <Header/>
          <Backdrop>
            <main className='h-screen block box-border pt-[66px] overflow-y-auto px-5'>
              <div className="py-5">
                <CardBig car={car} />
              </div>
            </main>
          </Backdrop>
        </BgImage>
      </BaseLayout>
    );
  }
  return (<Error statusCode={404} title={"This vehicle could not be found"} />);
};

// This gets called on every request
export async function getServerSideProps(context: any) {
  // Fetch data from external API 

  const { id } = context.query;
  const { car, error, statusCode } = await getCarAndOwner(id);

  // Pass data to the page via props
  return { props: { car, statusCode, error } };
}

export default Car;
