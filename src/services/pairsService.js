import { db } from '../api/firebase';
import { collection, getDocs, setDoc, doc } from "firebase/firestore"; 

const collectionName = "pairs";

export const fetchPairs = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => doc.data());
};

export const savePair = async (headValue, dinosaur, customTextInput = "") => {
  const newPair = { headValue, dinosaur, customTextInput };
  await setDoc(doc(db, collectionName, headValue), newPair);
};