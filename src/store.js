import { proxy } from "valtio";
import { useProxy } from "valtio/utils";

const store = proxy({ open: true });
export const useStore = () => useProxy(store);
