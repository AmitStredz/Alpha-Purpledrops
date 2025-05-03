import { useState, useEffect } from "react";
import ToggleSlider from "../../../components/toggle-slider/ToggleSlider";
import { FaTrafficLight } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
import { BASE_URL } from "../../../api/api";

const list = [
  { icon: <FaTrafficLight />, title: "Bot is" },
  { icon: <IoMdDownload />, title: "Buying is" },
  { icon: <MdFileUpload />, title: "Selling is" },
];

const SwitchBoxSideBar = ({ botStatus, botIsEnabled }) => {
  const [switches, setSwitches] = useState({
    bot: false,
    buying: false,
    selling: false,
  });
  const token = localStorage.getItem("token");
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("");

  useEffect(() => {
    // Set initial state based on botStatus
    if (botStatus === "ACTIVE" || botStatus === "In Progress") {
      console.log("Bot Status: ", botStatus);

      setSwitches({
        bot: true,
        buying: true,
        selling: true,
      });
      botIsEnabled(true);
    } else {
      setSwitches({
        bot: false,
        buying: false,
        selling: false,
      });
      botIsEnabled(false);
    }
  }, [botStatus]);

  useEffect(() => {
    botIsEnabled(switches.bot);
  }, [switches]);

  const updateBackend = async (action) => {
    try {
      const response = await fetch(`${BASE_URL}/bot/pause-resume/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      // Return true if successful
      // window.location.reload();
      return true;
    } catch (error) {
      console.error("Error updating status:", error);
      // Return false if failed
      return false;
    }
  };

  const handleToggle = async (type) => {
    if (botStatus?.toLowerCase() === "inactive") {
      setTooltipText(
        "Please start the bot first."
      );
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }
    setSwitches((prevSwitches) => {
      let newSwitches = { ...prevSwitches };

      if (type === "bot") {
        // If bot is being enabled, check if buying and selling are enabled
        if (
          !prevSwitches.bot &&
          (!prevSwitches.buying || !prevSwitches.selling)
        ) {
          // Show tooltip for 3 seconds
          setTooltipText(
            "Please enable both Buying and Selling before enabling the Bot"
          );
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 3000);
          return prevSwitches; // Don't allow bot to be enabled
        }

        const isEnabling = !prevSwitches.bot;

        // Create new switches state
        newSwitches = {
          bot: isEnabling,
          buying: isEnabling,
          selling: isEnabling,
        };

        // Call API and handle the response
        updateBackend(isEnabling ? "resume" : "pause").then((success) => {
          if (!success) {
            // If API call failed, revert the switches
            setSwitches(prevSwitches);
          }
        });
      } else {
        // Update individual switch
        newSwitches[type] = !prevSwitches[type];
        // If either buying or selling is disabled, disable bot too
        if (!newSwitches.buying || !newSwitches.selling) {
          newSwitches.bot = false;
        }
      }

      return newSwitches;
    });
  };

  return (
    <>
      <div className="text-left w-full my-5 mx-auto bg-white rounded-lg relative">
        {showTooltip && <div className="tooltip">{tooltipText}</div>}
        {list.map((item, index) => {
          const type = index === 0 ? "bot" : index === 1 ? "buying" : "selling";
          return (
            <div key={index}>
              <div className="py-2 px-4">
                <div>
                  <div className="flex justify-around items-center my-5">
                    <span className="text-5xl text-[#8601FF]">{item.icon}</span>
                    <div className="flex flex-col items-center">
                      <span className="text-[16px] mb-1 text-alphaGreen uppercase">
                        {item.title}{" "}
                        <span className="font-bold">
                          {switches[type] ? "Enabled" : "Disabled"}
                        </span>
                      </span>
                      <div className="toggle-slider">
                        <input
                          type="checkbox"
                          id={`${type}-toggle`}
                          checked={switches[type]}
                          onChange={() => handleToggle(type)}
                          disabled={true}
                        />
                        <label htmlFor={`${type}-toggle`} className="slider" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-alphaGray" />
            </div>
          );
        })}
      </div>

      <style>
        {`
          .toggle-slider {
            position: relative;
            width: 60px;
            height: 34px;
          }

          .slider {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            border-radius: 34px;
            cursor: not-allowed;
            transition: 0.4s;
          }

          .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            border-radius: 50%;
            transition: 0.4s;
          }

          input[type="checkbox"] {
            display: none;
          }

          input[type="checkbox"]:checked + .slider {
            background-color: #15b58e;
          }

          input[type="checkbox"]:checked + .slider:before {
            transform: translateX(26px);
          }

          .tooltip {
            position: absolute;
            top: -10px;
            left: 0px;
            // transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 1000;
            white-space: normal;
            animation: fadeInOut 3s ease-in-out;
          }

          .tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 0%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #333 transparent transparent transparent;
          }

          @keyframes fadeInOut {
            0% { opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </>
  );
};

const getRandId = () => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(2, 10);
};

export default SwitchBoxSideBar;
