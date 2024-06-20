import { atom } from 'recoil'

const searchTextAtom = atom({
    key: 'searchTextAtom', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });

export default searchTextAtom;