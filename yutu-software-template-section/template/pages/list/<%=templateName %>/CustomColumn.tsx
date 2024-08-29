import { useCallback, useMemo } from 'react';
import { ColumnProps } from 'antd/es/table';
import { countUnit } from 'src/utils/countUnit';
import getNumRange from 'src/utils/getNumRange';
import { salesFields, salesMoneyFields } from '../dataSource';
import { useParamsContext } from './useParamsContext';
import { RocketingList } from 'src/data/use-category-rank';

type KeysTs = keyof RocketingList;
/** 自定义看板 */
const CustomColumn = (data: { name: string; variableName: string }[] = []) => {
  const { state } = useParamsContext();
  const { sort } = state;

  /** 渲染表格判断 */
  const renderHtml = useCallback((key: string, record: any) => {
    /** 【需要计算数字展示区间】：销量字段 */
    if (salesFields.some((i) => i === key)) {
      return getNumRange(record[key as KeysTs], 'sales', 2, true);
    }
    /** 【需要计算数字展示区间】：销售额字段 */
    if (salesMoneyFields.some((i) => i === key)) {
      return getNumRange(record?.[key as KeysTs], 'salesMoney', 2, true);
    }

    if (key === 'addSalesCompare' || key === 'salesMoneyCompare') {
      return record[key] ? `${countUnit(record[key] * 100, 2, true)}%` : '--';
    }
    /** 其他数字类型展示（可排序） */
    return record[key as KeysTs] === '' || null
      ? '--'
      : countUnit(record[key as KeysTs], 2, true);
  }, []);

  /** 自定义看板 */
  const columnsCustom = useMemo<ColumnProps<RocketingList>[]>(() => {
    return data.map((item) => ({
      title: (
        <span
          className={`text-[14px] ${
            sort === item.variableName ? 'text-newrank' : ''
          }`}
        >
          {item.name}
        </span>
      ),
      dataIndex: item.variableName || '',
      align: 'center',
      width: item.variableName === 'salesMoneyTrend' ? 140 : 125,
      render: (_: string, record: any) => {
        return (
          <span
            className={`text-[16px] ${
              sort === item.variableName ? 'text-newrank' : ''
            }`}
          >
            {renderHtml(item.variableName, record)}
          </span>
        );
      },
    }));
  }, [data, sort, renderHtml]);

  return columnsCustom;
};

export default CustomColumn;
