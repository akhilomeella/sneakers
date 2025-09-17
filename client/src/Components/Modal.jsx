const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white  rounded-lg shadow-lg w-11/12 max-w-lg p-6">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black cursor-pointer"
          >
            ✖
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
