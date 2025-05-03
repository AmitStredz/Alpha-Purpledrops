import Navbar from "../../components/navbar/header";
import Footer from "../../components/footer/footer";
import { RiH1 } from "react-icons/ri";

const ConnectBinance = () => {
  return (
    <div className="gradient-bg mx-auto ">
      <Navbar />

      <section className="my-5 text-white mx-5 lg:mx-32 text-left">
        <h1 className="text-3xl">Connection Exchange Purpledrops Trading Bot</h1>
        <h1 className="mt-3 mb-4">
          Kindly watch the video tutorial on how to connect your
          <span className="font-bold"> Binance </span>account to the purpledrops
          traing bot
        </h1>

        <video className="h-full w-full rounded-lg" controls autoPlay>
          <source
            src="https://docs.material-tailwind.com/demo.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="w-auto md:w-1/2 mt-8">
          <div className="my-4">
            <label className="block  mb-1 text-[12px]">Name</label>
            <div className="flex my-2">
              <input
                id="name"
                type="text"
                className="w-full rounded-xl px-4 py-3"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="my-4">
            <label className="block  mb-1 text-[12px]">API Key</label>
            <div className="flex my-2">
              <input
                id="name"
                type="text"
                className="w-full rounded-xl px-4 py-3"
                placeholder="Enter API Key"
              />
            </div>
          </div>

          <div className="my-4">
            <label className="block  mb-1 text-[12px]">API Secret</label>
            <div className="flex my-2">
              <input
                id="name"
                type="text"
                className="w-full rounded-xl px-4 py-3"
                placeholder="Enter API Secret"
              />
            </div>
          </div>

          <div className="my-4">
            <label className="block  mb-1 text-[12px]">Pass Pharse</label>
            <div className="flex my-2">
              <input
                id="name"
                type="text"
                className="w-full rounded-xl px-4 py-3"
                placeholder="Enter Pass Pharse"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center">
          <button className="p-2 px-20 rounded-xl text-center text-white bg-alphaGreen">
            Connect to Binance
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ConnectBinance;
