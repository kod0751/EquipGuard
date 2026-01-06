import * as z from 'zod';

export const equipmentFormSchema = z.object({
  assetId: z.string().min(1, '설비 ID를 입력해주세요.'),
  type: z.string().min(1, '설비 유형을 선택해주세요.'),
  air_temp: z.coerce.number().min(0, '온도를 입력해주세요.'),
  process_temp: z.coerce.number().min(0, '온도를 입력해주세요.'),
  rpm: z.coerce.number().min(0, 'RPM을 입력해주세요.'),
  torque: z.coerce.number().min(0, '토크를 입력해주세요.'),
  tool_wear: z.coerce.number().min(0, '공구 마모도를 입력해주세요.'),
});

export type EquipmentFormValues = z.infer<typeof equipmentFormSchema>;