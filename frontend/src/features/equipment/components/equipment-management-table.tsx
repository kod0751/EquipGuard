'use client';

import { useMemo, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
} from '@tanstack/react-table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  AVATAR_STYLE_MAP,
  STATUS_STYLE_MAP,
} from '@/features/dashboard/constants/equipmennt-styles';
import { equipmentMockData } from '@/shared/constants/equipment-mock';
import { getErrorColor, getRiskStatus } from '@/shared/constants/wear';
import { Eye, Pencil, Trash2, ArrowUpDown } from 'lucide-react';

type Equipment = (typeof equipmentMockData)[number];

// 컬럼 헬퍼 생성
const columnHelper = createColumnHelper<Equipment>();

interface EquipmentManagementTableProps {
  filter: string;
  searchQuery: string;
}

export function EquipmentManagementTable({
  filter,
  searchQuery,
}: EquipmentManagementTableProps) {
  // 정렬 상태 관리
  const [sorting, setSorting] = useState<SortingState>([]);

  // 상태 매핑 함수
  const getStatusId = (expectedError: number): string => {
    if (expectedError >= 0.75) return 'critical';
    if (expectedError >= 0.5) return 'warning';
    return 'normal';
  };

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    let data = equipmentMockData;

    // 상태 필터링
    if (filter !== 'all') {
      data = data.filter((equipment) => {
        const statusId = getStatusId(equipment.expectedError ?? 0);
        return statusId === filter;
      });
    }

    // 검색 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      data = data.filter(
        (equipment) =>
          equipment.id.toLowerCase().includes(query) ||
          equipment.type.toLowerCase().includes(query) ||
          equipment.status?.toLowerCase().includes(query)
      );
    }

    return data;
  }, [filter, searchQuery]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '설비 정보',
        cell: (info) => {
          const equipment = info.row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarFallback className={AVATAR_STYLE_MAP[equipment.type]}>
                  {equipment.id.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold text-sm">{info.getValue()}</span>
            </div>
          );
        },
      }),

      columnHelper.accessor('type', {
        header: '유형',
        cell: (info) => (
          <span className="text-sm text-foreground">{info.getValue()}</span>
        ),
      }),

      columnHelper.accessor('status', {
        header: '상태',
        cell: (info) => {
          const equipment = info.row.original;
          const riskStatus = getRiskStatus(equipment);
          return (
            <span className={`text-sm ${STATUS_STYLE_MAP[riskStatus]}`}>
              {info.getValue()}
            </span>
          );
        },
      }),

      columnHelper.accessor('expectedError', {
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-2 hover:text-foreground"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              고장 확률
              <ArrowUpDown className="w-3 h-3" />
            </button>
          );
        },
        cell: (info) => {
          const failurePercent = Math.round((info.getValue() ?? 0) * 100);
          const ErrorColor = getErrorColor(failurePercent);
          return (
            <div className="flex items-center gap-3">
              {/* 프로그레스 바 */}
              <div className="h-2 w-25 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${ErrorColor}`}
                  style={{ width: `${failurePercent}%` }}
                />
              </div>
              <span className="text-sm font-medium w-10">
                {failurePercent}%
              </span>
            </div>
          );
        },
        sortingFn: 'basic',
      }),

      columnHelper.display({
        id: 'actions',
        header: '작업',
        cell: (info) => (
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              aria-label="보기"
              onClick={() => handleView(info.row.original)}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              aria-label="수정"
              onClick={() => handleEdit(info.row.original)}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-red-500"
              aria-label="삭제"
              onClick={() => handleDelete(info.row.original)}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredData, // 표시할 데이터
    columns, // 컬럼 정의
    state: {
      sorting, // 현재 정렬 상태
    },
    onSortingChange: setSorting, // 정렬 변경 시 호출

    // 필수 모델들
    getCoreRowModel: getCoreRowModel(), // 기본 행 모델
    getSortedRowModel: getSortedRowModel(), // 정렬 기능 활성화
    getFilteredRowModel: getFilteredRowModel(), // 필터링 기능 활성화
  });

  // 액션 핸들러들
  const handleView = (equipment: Equipment) => {
    console.log('View:', equipment);
    //TODO: Detail 열기
  };

  const handleEdit = (equipment: Equipment) => {
    console.log('Edit:', equipment);
    //TODO: 수정 폼 열기
  };

  const handleDelete = (equipment: Equipment) => {
    console.log('Delete:', equipment);
    //TODO: 설비 삭제 확인 폼 열기
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* 테이블 헤더 */}
          <thead className="bg-muted/30 border-b border-border">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  // header: 각 컬럼의 헤더
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
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

          {/* 테이블 바디 */}
          <tbody className="divide-y divide-border">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
