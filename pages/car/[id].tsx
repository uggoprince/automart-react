import React from "react";
import { GetServerSidePropsContext } from "next";
import PropTypes from "prop-types";
import { NextPage } from "next";
import Error from "next/error";
import { BaseLayout } from "../../layouts/base-layout";
import Head from "../../components/header/head";
import BgImage from "../../components/background/bg-image";
import Header from "../../layouts/header";
import Backdrop from "../../components/background/backdrop";
import { getCarAndOwner } from "../../data/cars";
import { CardBig } from "../../components/card/big-card";
import { useAuth } from "../../auth/AuthContext";

interface CarProps {
  car: object;
  statusCode: number;
}

const Car: NextPage<CarProps> = (props) => {
  const { car, statusCode } = props;
  const { getAuthUser } = useAuth();
  const authData = getAuthUser();
  if (statusCode === 200) {
    return (
      <BaseLayout>
        <Head />
        <BgImage>
          <Header authData={authData} />
          <Backdrop>
            <main className="h-screen block box-border pt-[66px] overflow-y-auto px-5">
              <div className="py-5">
                <CardBig car={car} />
              </div>
            </main>
          </Backdrop>
        </BgImage>
      </BaseLayout>
    );
  }
  return <Error statusCode={404} title={"This vehicle could not be found"} />;
};


export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Fetch data from external API 

  const { id } = context.query;
  const { car, error, statusCode } = await getCarAndOwner(Array.isArray(id) ? id[0] : id || '');

  // Pass data to the page via props
  return { props: { car, statusCode, error } };
}
Car.propTypes = {
  car: PropTypes.object.isRequired,
  statusCode: PropTypes.number.isRequired,
};

export default Car;
