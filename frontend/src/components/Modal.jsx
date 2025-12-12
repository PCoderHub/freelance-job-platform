import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function Modal({ open, onClose, children }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  if (!open) return null;

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      fullWidth
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <button
        accessKey=""
        className="flex justify-end mx-2 mt-5 text-red-500 hover:text-red-600 hover:cursor-pointer"
        onClick={onClose}
        type="button"
      >
        <span accessKey="">x</span>
      </button>
      {children}
    </Dialog>
  );
}

export default Modal;
