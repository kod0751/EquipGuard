// ---------- ENUM / UNION ----------
export type EquipmentType = '중형 설비' | '대형 설비' | '고성능 설비';

export type EquipmentStatus = '정상' | '주의' | '긴급';

export type FailureType = 'PWF' | 'TWF' | 'HDF' | 'OSF' | 'RNF';

export interface FailurePrediction {
  type: FailureType;
  probability: number; // 0 ~ 1
}

// ---------- DOMAIN ----------
export interface Equipment {
  id: string;
  assetId: string;
  type: EquipmentType;
  expected_error?: number; // 0 ~ 1
  status?: EquipmentStatus;
  air_temp: number;
  process_temp: number;
  rpm: number;
  torque: number;
  tool_wear: number;
  failure_predictions?: FailurePrediction[];
}
