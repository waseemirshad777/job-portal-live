import { useToast } from 'vue-toast-notification';
const toast = useToast();

export function successToast(message) {
  toast.open({
    message: message,
    type: 'success',
    position: 'top-right', 
  });
}
export function errorToast(message) {
  toast.open({
    message: message,
    type: 'error',
    position: 'top-right', 
  });
}