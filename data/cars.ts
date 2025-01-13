// import { GetStaticProps } from 'next';
import { getApiUrl } from '../utilities/getEnvs';

const apiUrl = getApiUrl();

export type Car = {
  imageUrl: string;
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
};

export const getCars = async () => {
  try {
    const { data } = await fetch(`${apiUrl}/cars`).then((result) =>
      result.json()
    );
    return {
      cars: data,
    };
  } catch (e) {
    console.log(e);
    return { cars: [] };
  }
};

export const getCarAndOwner = async (id: string) => {
  try {
    const result = await fetch(`${apiUrl}/cars/${id}?getOwner=true`).then(
      (result) => result.json()
    );
    const { data, statusCode, error } = result;
    if (statusCode === 200) return { car: data, error: null, statusCode };
    return { car: null, statusCode, error };
  } catch (error) {
    return { car: null, error };
  }
};
