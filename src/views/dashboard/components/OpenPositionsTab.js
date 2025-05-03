import { RotatingLines } from "react-loader-spinner";

const OpenPositionsTab = ({ isfirst, tradeCycleOrders, isLoading }) => {
  return (
    <div
      className={`text-left w-full py-4 px-5 mx-auto bg-white ${
        isfirst ? `rounded-b-lg` : `rounded-lg`
      }`}
    >
      {isLoading ? (
        <div className="flex justify-center w-full">
          <RotatingLines
            visible={true}
            height="40"
            width="40"
            color="blue"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : tradeCycleOrders?.length > 0 ? (
        <div>
          <div>These are your current open positions.</div>
          <div className="w-full overflow-auto p-5">
            <table className="w-full">
              <thead className=" ">
                <tr className="font-normal bg-white bg-opacity-10 text-[12px] sm:text-[16px] ">
                  <th className="">Started at</th>
                  <th className="">Cost</th>
                  <th className="">BNB Bought</th>
                  <th className="">Bought at</th>
                  <th className="">Order type</th>
                </tr>
              </thead>
              {/* {swapHistory.length > 0 ? ( */}
              {tradeCycleOrders?.map((item, index) => (
                <tbody className="text-[12px] sm:text-[16px]">
                  <tr
                    key={index}
                    className=" border-b border-gray-700 font-extralight"
                  >
                    {/* <td className="py-2 px-4">{new Date(item?.started_at).toLocaleDateString()}</td> */}
                    <td className="py-2 px-">{new Date(item?.timestamp).toLocaleDateString()}</td>
                    <td className="py-2 px-">{item?.order_capital}</td>
                    <td className="py-2 px-">{item?.quantity}</td>
                    <td className="py-2 px-">{item?.fill_price}</td>
                    <td className="py-2 px-">{item?.order_type}</td>
                    
                  </tr>
                </tbody>
              ))}
              {/* ) 
                : (
                  <div>No swapping history found.</div>
                  )
                  }  */}
            </table>
          </div>
        </div>
      ) : (
        <div className="text-white">You do not have any positions {`(yet)`}.</div>
      )}
    </div>
  );
};
export default OpenPositionsTab;
