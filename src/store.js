import { proxy } from "valtio";
import { useProxy } from "valtio/utils";

const store = proxy({ open: false, starSearch: null });
export const useStore = () => useProxy(store);
