import { toast } from "react-toastify";

const successStyle = {
  backgroundColor: "#000",
  color: "#facc15", 
  fontWeight: "600",
  borderRadius: "8px",
  border: "1px solid #facc15",
};

const errorStyle = {
  backgroundColor: "#000",
  color: "#ef4444", 
  fontWeight: "600",
  borderRadius: "8px",
  border: "1px solid #ef4444",
};

export const showSuccessToast = (msg) =>
  toast.success(msg, { style: successStyle });

export const showErrorToast = (msg) => toast.error(msg, { style: errorStyle });
