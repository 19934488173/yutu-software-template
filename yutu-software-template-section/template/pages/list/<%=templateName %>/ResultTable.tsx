import { ColumnProps } from 'antd/es/table';
import { useMemo } from 'react';
import TablePro from 'src/components/TablePro';
import { ReactComponent as CategorySvg } from 'src/assets/img/category.svg';
import { growthDefaultFields } from '../dataSource';
import CustomColumn from './CustomColumn';
import {
  useCategoryRocketingList,
  RocketingList,
} from 'src/data/use-category-rank';
import { useParamsContext } from './useParamsContext';
import pageTotalNumber from 'src/utils/page-total-number';
import TopThree from 'src/components/TopThree';
import SearchNoticeInfo from 'src/components/SearchNoticeInfo';
import { openLinkPath } from 'src/utils/open-link-path';

const ResultTable = () => {
  const { state, dispatch } = useParamsContext();
  const { start, size } = state;
  /** 默认看板column */
  const defaultCustom = CustomColumn(Array.from(growthDefaultFields.values()));

  const { data, isValidating } = useCategoryRocketingList(state);

  const columns: ColumnProps<RocketingList>[] = useMemo(() => {
    const info = [
      {
        title: '排名',
        width: 80,
        dataIndex: 'index',
        align: 'center' as any,
        render: (_: any, __: any, index: number) => {
          return <TopThree rank={index + (start - 1) * size} />;
        },
      },
      {
        title: '品类',
        width: '14%',
        dataIndex: 'categoryId',
        render: (_: any, record: any) => {
          return (
            <div className="flex items-center">
              <CategorySvg />
              <div className="flex items-center ml-2">
                <span className="text-[16px] text-[#E8EDEE] font-bold inline-block max-[250px] truncate mr-2">
                  {record?.productTypeV4
                    ? record?.productTypeV4
                    : record?.productTypeV3}
                </span>
                <span
                  className="text-[#D2D9D9] text-[12px] px-2 py-[3px] border-[#CDCFCF] border-[1px] bg-[rgba(232,237,238,0.102)] rounded-[2px] max-w-[120px] truncate"
                  title={`${record?.productTypeV1}-${record?.productTypeV2}${
                    record?.productTypeV4 ? `-${record?.productTypeV3}` : ''
                  }`}
                >
                  {record?.productTypeV1}-{record?.productTypeV2}
                  {record?.productTypeV4 ? `-${record?.productTypeV3}` : ''}
                </span>
              </div>
            </div>
          );
        },
      },
    ];
    return [...info, ...defaultCustom];
  }, [defaultCustom, size, start]);

  return (
    <div>
      <TablePro
        rowKey={(record) => record.categoryId}
        columns={columns}
        dataSource={data?.list ?? []}
        rowClassName="cursor-pointer"
        pagination={{
          hideOnSinglePage:
            pageTotalNumber(data?.total, data?.count) <= 0 ? true : false,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
          total: pageTotalNumber(data?.total, data?.count),
          pageSize: size,
          current: start,
          onChange: (page, pageSize) => {
            dispatch({
              type: 'changeParams',
              payload: {
                start: page,
                size: pageSize,
              },
            });
          },
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        scroll={{ x: 'max-content' }}
        loading={isValidating}
        onRow={(record) => {
          return {
            onClick: (e) => {
              window.open(
                openLinkPath(
                  `/category/detail/sell/overview/${record?.categoryId}`
                )
              );
              e.stopPropagation();
              e.preventDefault();
            },
          };
        }}
      />
      <SearchNoticeInfo
        currentTotal={(start - 1) * size + (data ? data?.list.length : 0)}
        total={pageTotalNumber(data?.total, data?.count)}
        targetTotal={data?.total}
        customVip={2}
      />
    </div>
  );
};
export default ResultTable;
