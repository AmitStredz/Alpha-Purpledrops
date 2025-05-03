const OpenPositionsTab1= ({ isfirst }) => {
  return (
    <div
      className={`text-left w-full py-4 px-5 mx-auto bg-white ${
        isfirst ? `rounded-b-lg` : `rounded-lg`
      }`}
    >
      <div>These are your</div>
      <div>You do not have any positions {`(yet)`}.</div>
    </div>
  );
};
export default OpenPositionsTab1;
