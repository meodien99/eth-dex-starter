import { toast, ToastContent, ToastOptions, Slide, Id } from "react-toastify";


export const defaultToastOptions: ToastOptions = {
  position: undefined,
  autoClose: undefined,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Slide,
};

type ToastType = "success" | "error" | "info" | "warning" | "default";

/**
 * Display toast
 *
 * @param {ToastType} type
 * @param {ToastContent} content
 * @param {ToastOptions} [options=defaultToastOption]
 * @return {Id}
 */
export const showToast = (
  type: ToastType,
  content: ToastContent,
  options: Partial<ToastOptions> = {},
): Id => {
  const o = { ...defaultToastOptions, ...options };

  switch (type) {
    case "success": {
      return toast.success(content, o);
    }
    case "error": {
      return toast.error(content, o);
    }
    case "info": {
      return toast.info(content, o);
    }
    case "warning": {
      return toast.warn(content, o);
    }
    default: {
      return toast(content, o);
    }
  }
};