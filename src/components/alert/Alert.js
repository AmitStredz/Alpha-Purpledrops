const Alert = ({
  message,
  icon,
  fontClasses,
  bgColorClasses,
  deleteAlertColorClasses,
}) => {
  const removeAlert = (e) => {
    e.target.parentElement.remove();
  };
  const removeParent = (e) => {
    e.target.parentElement.parentElement.remove();
  };

  return (
    <div className="space-y-6">
      <div
        className={`flex items-center max-sm:flex-col ${bgColorClasses} p-4 rounded-lg relative`}
        role="alert"
      >
        <div className="flex items-center max-sm:mb-2">{icon}</div>

        <span
          className={`block text-center sm:inline text-sm ml-4 mr-8 max-sm:ml-0 max-sm:mt-2 capitalize ${fontClasses}`}
        >
          {message}
        </span>

        <svg
          onClick={removeAlert}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-7 rounded-lg transition-all p-2 cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 ${deleteAlertColorClasses}`}
          viewBox="0 0 320.591 320.591"
        >
          <path
            onClick={removeParent}
            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
            data-original="#000000"
          />
          <path
            onClick={removeParent}
            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
            data-original="#000000"
          />
        </svg>
      </div>
    </div>
  );
};
const SuccessAlert = ({ message, bold = false }) => {
  return (
    <Alert
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[18px] fill-[#8601FF] inline mr-3"
          viewBox="0 0 512 512"
        >
          <ellipse
            cx="256"
            cy="256"
            fill="#32bea6"
            data-original="#32bea6"
            rx="256"
            ry="255.832"
          />
          <path
            fill="#fff"
            d="m235.472 392.08-121.04-94.296 34.416-44.168 74.328 57.904 122.672-177.016 46.032 31.888z"
            data-original="#ffffff"
          />
        </svg>
      }
      message={message}
      fontClasses={getFontWeight(bold)}
      bgColorClasses={"bg-green-100 text-green-800"}
      deleteAlertColorClasses={"hover:bg-green-200 fill-[#8601FF] "}
    />
  );
};

const ErrorAlert = ({ message, bold = false }) => {
  return (
    <Alert
      message={message}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[18px] fill-red-500 inline mr-3"
          viewBox="0 0 32 32"
        >
          <path
            d="M16 1a15 15 0 1 0 15 15A15 15 0 0 0 16 1zm6.36 20L21 22.36l-5-4.95-4.95 4.95L9.64 21l4.95-5-4.95-4.95 1.41-1.41L16 14.59l5-4.95 1.41 1.41-5 4.95z"
            data-original="#ea2d3f"
          />
        </svg>
      }
      fontClasses={getFontWeight(bold)}
      bgColorClasses={"bg-red-100 text-red-800"}
      deleteAlertColorClasses={"hover:bg-red-200 fill-red-500 "}
    />
  );
};

const InfoAlert = ({ message, bold = false }) => {
  return (
    <Alert
      message={message}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[18px] fill-blue-500 inline mr-3"
          viewBox="0 0 23.625 23.625"
        >
          <path
            d="M11.812 0C5.289 0 0 5.289 0 11.812s5.289 11.813 11.812 11.813 11.813-5.29 11.813-11.813S18.335 0 11.812 0zm2.459 18.307c-.608.24-1.092.422-1.455.548a3.838 3.838 0 0 1-1.262.189c-.736 0-1.309-.18-1.717-.539s-.611-.814-.611-1.367c0-.215.015-.435.045-.659a8.23 8.23 0 0 1 .147-.759l.761-2.688c.067-.258.125-.503.171-.731.046-.23.068-.441.068-.633 0-.342-.071-.582-.212-.717-.143-.135-.412-.201-.813-.201-.196 0-.398.029-.605.09-.205.063-.383.12-.529.176l.201-.828c.498-.203.975-.377 1.43-.521a4.225 4.225 0 0 1 1.29-.218c.731 0 1.295.178 1.692.53.395.353.594.812.594 1.376 0 .117-.014.323-.041.617a4.129 4.129 0 0 1-.152.811l-.757 2.68a7.582 7.582 0 0 0-.167.736 3.892 3.892 0 0 0-.073.626c0 .356.079.599.239.728.158.129.435.194.827.194.185 0 .392-.033.626-.097.232-.064.4-.121.506-.17l-.203.827zm-.134-10.878a1.807 1.807 0 0 1-1.275.492c-.496 0-.924-.164-1.28-.492a1.57 1.57 0 0 1-.533-1.193c0-.465.18-.865.533-1.196a1.812 1.812 0 0 1 1.28-.497c.497 0 .923.165 1.275.497.353.331.53.731.53 1.196 0 .467-.177.865-.53 1.193z"
            data-original="#030104"
          />
        </svg>
      }
      fontClasses={getFontWeight(bold)}
      bgColorClasses={"bg-blue-100 text-blue-800 "}
      deleteAlertColorClasses={"hover:bg-blue-200 fill-blue-500"}
    />
  );
};

const WarningAlert = ({ message, bold = false }) => {
  return (
    <Alert
      message={message}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[18px] fill-yellow-500 inline mr-3"
          viewBox="0 0 128 128"
        >
          <path
            d="M56.463 14.337 6.9 106.644C4.1 111.861 8.173 118 14.437 118h99.126c6.264 0 10.338-6.139 7.537-11.356L71.537 14.337c-3.106-5.783-11.968-5.783-15.074 0z"
            data-original="#fad271"
          />
          <g fill="#fff">
            <path
              d="M64 31.726a5.418 5.418 0 0 0-5.5 5.45l1.017 44.289A4.422 4.422 0 0 0 64 85.726a4.422 4.422 0 0 0 4.482-4.261L69.5 37.176a5.418 5.418 0 0 0-5.5-5.45z"
              data-original="#fff"
            />
            <circle cx="64" cy="100.222" r="6" data-original="#fff" />
          </g>
        </svg>
      }
      fontClasses={getFontWeight(bold)}
      bgColorClasses={"bg-yellow-100 text-yellow-800"}
      deleteAlertColorClasses={"hover:bg-yellow-200 fill-yellow-500"}
    />
  );
};
const getFontWeight = (bold) => {
  return bold ? "font-bold" : "";
};

export { SuccessAlert, ErrorAlert, InfoAlert, WarningAlert, Alert };
