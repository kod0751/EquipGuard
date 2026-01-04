import { useOutletContext } from 'react-router-dom';
import type { Equipment } from '@/shared/types/equipment';

import { PredictionEmpty } from './components/prediction-empty';
import PredictionResult from './components/prediction-result';

interface OutletContext {
  predictedEquipment: Equipment | null;
}

export default function PredictionPage() {
  const { predictedEquipment } = useOutletContext<OutletContext>();

  return (
    <>
      {!predictedEquipment ? (
        <PredictionEmpty />
      ) : (
        <PredictionResult equipment={predictedEquipment} />
      )}
    </>
  );
}
