import { useCallback } from 'react';
import { fetchPairs, savePair } from '../services/pairsService';

export const useFirebase = () => {
  const getPairs = useCallback(async () => {
    return await fetchPairs();
  }, []);

  const updatePair = useCallback(async (headValue, dinosaur, customTextInput) => {
    await savePair(headValue, dinosaur, customTextInput);
  }, []);

  return { getPairs, updatePair };
};