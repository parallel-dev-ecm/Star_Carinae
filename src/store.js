import { proxy } from "valtio";
import { useProxy } from "valtio/utils";

const store = proxy({ open: true, currentUrl: null });
export const useStore = () => useProxy(store);
