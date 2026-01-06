import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { equipmentFormSchema } from '../schemas/equipment-schema';
import { useCreateEquipmentMutation } from '@/shared/api/equipment.query';

interface EquipmentAddModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type EquipmentFormValues = z.infer<typeof equipmentFormSchema>;

export function EquipmentAddModal({ open, onOpenChange }: EquipmentAddModalProps) {
  const form = useForm({
    resolver: zodResolver(equipmentFormSchema),
    mode: 'onChange',
    defaultValues: {
      assetId: '',
      type: '',
      air_temp: 0,
      process_temp: 0,
      rpm: 0,
      torque: 0,
      tool_wear: 0,
    },
  });

  const { mutate, isPending } = useCreateEquipmentMutation();

  const onSubmit = (values: EquipmentFormValues) => {
    mutate(values)
    onOpenChange(false)
    form.reset()
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25 font-['NanumSquareNeo']">
        <DialogHeader>
          <DialogTitle>설비 추가</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="assetId"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>설비 ID</FormLabel>
                    <FormControl><Input placeholder="L47185" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>유형</FormLabel>
                    <FormControl><Input placeholder="대형 설비" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="air_temp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>대기 온도 (K)</FormLabel>
                    <FormControl><Input type="number" {...field} value={(field.value as number) ?? 0}/></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="process_temp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>공정 온도 (K)</FormLabel>
                    <FormControl><Input type="number" {...field} value={(field.value as number) ?? 0}/></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rpm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>회전수 (RPM)</FormLabel>
                    <FormControl><Input type="number" {...field} value={(field.value as number) ?? 0} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="torque"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>토크 (Nm)</FormLabel>
                    <FormControl><Input type="number" step="0.1" {...field} value={(field.value as number) ?? 0} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tool_wear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>마모도</FormLabel>
                    <FormControl><Input type="number" step="0.1" {...field} value={(field.value as number) ?? 0} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="pt-4">
              <Button 
                type="submit" 
                className="bg-teal-500 hover:bg-teal-600 w-full" 
                disabled={!form.formState.isValid || isPending}
            >
                {isPending ? '저장 중...' : '설비 저장'}
            </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}