import { useCallback, useEffect } from "react";

const Popup = ({ isOpen, onClose, children }) => {
  // Function to close popup on Escape button
  const handleCloseByEsc = useCallback(
    (event) => {
      if (isOpen) {
        if (event.key === "Escape") {
          onClose();
        }
      }
    },
    // eslint-disable-next-line
    [isOpen]
  );
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleCloseByEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
    };
  }, [handleCloseByEsc, isOpen]);
  return [children];
};

export default Popup;
