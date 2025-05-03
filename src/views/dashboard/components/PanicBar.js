import { useState } from "react";
import { BASE_URL } from "../../../api/api";
import { GoAlertFill } from "react-icons/go";
import ConfirmModal from "../../../components/modals/confirmModal";

const PanicBar = ({ panicTriggered }) => {
  const token = localStorage.getItem("token");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState("");
  const [error, setError] = useState("");

  const handlePanicConfirm = () => {
    if (inputText.toLowerCase() === "trigger-panic") {
      updateBackend();
      setShowConfirmModal(false);
      setInputText("");
      setError("");
    } else {
      setError("Please type 'trigger-panic' to confirm");
    }
  };

  const updateBackend = async () => {
    try {
      const response = await fetch(`${BASE_URL}/bot/panic/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }
      if (data?.message) {
        setSuccessModalMessage(data?.message);
        setIsSuccessModal(true);
        setTimeout(() => {
          setIsSuccessModal(false);
        }, 3000);
        panicTriggered();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="flex w-full text-left my-5 mx-auto bg-white rounded-lg relative">
      <div className="flex items-center p-3">
        <GoAlertFill size={40} color="red" />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <span>Sell Positions and Stop</span>
        <button
          className="bg-red-600 p-3 rounded-md text-white"
          onClick={() => setShowConfirmModal(true)}
        >
          Panic Button
        </button>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Panic Action</h2>
            <p className="mb-4">Type "trigger-panic" to confirm:</p>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="enter trigger panic"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => {
                  setShowConfirmModal(false);
                  setInputText("");
                  setError("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={handlePanicConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {isSuccessModal && (
        <ConfirmModal
          isClose={false}
          title="Success"
          message1={successModalMessage}
        />
      )}
    </div>
  );
};

export default PanicBar;
