import Image from "next/image";
import { FiPhoneCall, FiCompass } from "react-icons/fi";

const TableRow = (props: any) => {
  const { title, value } = props;
  return (
    <tr>
      <td className="align-text-top">{title}</td>
      <td className="text-slate-500 pl-4 py-1 align-text-top">{value}</td>
    </tr>
  );
};

export const CardBig = ({ car }: any) => {
  return (
    <div
      className="
        xl:max-w-[70%]
        max-w-[90%]
        w-full
        flex
        flex-col
        h-auto
        mx-auto"
    >
      <div className="w-full lg:flex lg:flex-row justify-between">
        <div
          className=" w-full
            min-h-[200px]
            lg:w-8/12
            rounded-t-lg
            bg-cover shadow-lg shadow-white/70
            bg-center block cursor-pointer box-border"
        >
          <Image
            alt={car.title}
            src={car.imageUrl}
            layout="responsive"
            width={400}
            height={280}
            className=""
          />
        </div>

        <div
          className="p-4
          bg-white
          box-border
          lg:ml-4
          font-semibold
          text-slate-700
          lg:w-4/12 shadow-lg"
        >
          <div>
            <div className="text-slate-800 font-semibold text-3xl">
              {car.title}
            </div>
            <div className="text-indigo-600 font-semibold text-xl pt-4">
              {car.price}
            </div>
          </div>
          <div className="pt-4 text-slate-600 font-semibold">
            <div className="pb-2">
              <FiPhoneCall className="inline text-indigo-600" />
              <span className=""> {car.ownerDetails.phoneNumber}</span>
            </div>
            <div>
              <FiCompass className=" text-indigo-600 inline" />
              <span className=""> {car.ownerDetails.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-4 bg-white p-4 sm:flex sm:flex-row justify-start shadow-lg">
        <div className="w-full sm:w-4/12">
          <table>
            <tbody>
              <TableRow title={"Make"} value={car.manufacturer} />
              <TableRow title={"Model"} value={car.model} />
              <TableRow title={"Body"} value={car.bodyType} />
              <TableRow
                title={"State"}
                value={
                  <span className="text-[#FFA500] font-semibold">
                    {car.state}
                  </span>
                }
              />
            </tbody>
          </table>
        </div>
        <div className="w-full sm:w-9/12">{car.description}</div>
      </div>
    </div>
  );
};
