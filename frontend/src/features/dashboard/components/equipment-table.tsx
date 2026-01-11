import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import {
  AVATAR_STYLE_MAP,
  STATUS_STYLE_MAP,
} from '../constants/equipmennt-styles';
import { getErrorColor } from '@/shared/constants/wear';
import { useEquipmentListQuery } from '@/shared/api/equipment.query';
import { useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import type { Equipment } from '@/shared/types/equipment';

const columnHelper = createColumnHelper<Equipment>();

export function EquipmentTable() {
  const { data, isLoading, error } = useEquipmentListQuery();

  // 고장 확률이 높은 순으로 상위 6개 추출
  const topFailureData = useMemo(() => {
    if (!data) return [];
    return [...data]
      .sort((a, b) => (b.expected_error ?? 0) - (a.expected_error ?? 0))
      .slice(0, 6);
  }, [data]);

  // TanStack Table 컬럼 정의
  const columns = useMemo(
    () => [
      columnHelper.accessor('assetId', {
        header: '설비 ID',
        cell: (info) => {
          const equipment = info.row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarFallback className={AVATAR_STYLE_MAP[equipment.type]}>
                  {info.getValue().charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold text-sm">{info.getValue()}</span>
            </div>
          );
        },
      }),
      columnHelper.accessor('type', {
        header: '유형',
        cell: (info) => <span className="text-sm">{info.getValue()}</span>,
      }),
      columnHelper.accessor('expected_error', {
        header: '고장 확률',
        cell: (info) => {
          const percent = Math.round((info.getValue() ?? 0) * 100);
          return (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-30">
                <div
                  className={`h-full ${getErrorColor(percent)}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-sm font-medium min-w-9">{percent}%</span>
            </div>
          );
        },
      }),
      columnHelper.accessor('status', {
        header: '상태',
        cell: (info) => {
          const status = info.getValue();
          return status ? (
            <span className={STATUS_STYLE_MAP[status]}>{status}</span>
          ) : null;
        },
      }),
    ],
    []
  );

  const table = useReactTable({
    data: topFailureData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-1">설비 상태 모니터링 (Top 6)</h2>
        <p className="text-sm text-muted-foreground">
          고장 확률이 높은 상위 6개 설비의 예측 결과입니다.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-3 px-2 text-sm text-muted-foreground font-normal"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-4 px-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}