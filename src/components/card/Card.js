import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Card = ({
  title,
  primaryPrice,
  secondaryPrice,
  descriptionList,
  isPrimary,
  planType,
  clickEvent,
}) => (
  <div className="bg-white hover:shadow-xl rounded-2xl p-6 w-72 m-3 cursor">
    <h1 className="text-xl font-semibold mb-2">{title}</h1>
    <div className="font-bold">
      <span className="text-3xl text-[#8601FF]">{primaryPrice}/</span>
      <span className="text-lg text-slate-600">{secondaryPrice}</span>
      <hr className="border-dotted border-slate-400 my-5 px-3" />
      <div className="font-normal text-left">
        {descriptionList.map((description, index) => (
          <p className="my-3" index={index}>
            <FaArrowRight className="text-[#8601FF] inline mr-2" />
            {description}
          </p>
        ))}
      </div>
    </div>
    {isPrimary ? (
      <div className="text-white mt-9">
        <button
          className="w-full rounded-xl bg-[#8601FF] border-[#8601FF]"
          onClick={clickEvent}
          data-planType={planType}
        >
          Buy Now <FaArrowRight className="inline m-2" />
        </button>
      </div>
    ) : (
      <div className="text-black mt-9">
        <button
          onClick={clickEvent}
          data-planType={planType}
          className="w-full rounded-xl bg-white border-black"
        >
          Buy Now <FaArrowRight className="inline m-2" />
        </button>
      </div>
    )}
  </div>
);

export default Card;
