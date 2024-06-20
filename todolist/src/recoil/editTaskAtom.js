import { atom } from 'recoil'
import addTaskAtom from './addTaskAtom';

const editTaskAtom = atom({
    key: 'editTaskAtom', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
  });

export default editTaskAtom;