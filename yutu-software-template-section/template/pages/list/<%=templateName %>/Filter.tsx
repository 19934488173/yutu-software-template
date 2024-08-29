import FilterTagPro from "src/components/FilterTag";
import { getCategoryV1, getCategoryV2 } from "../../utils/getCategoryTyoe";
import { useEffect, useMemo, useState } from "react";
import { useParamsContext } from "./useParamsContext";
import Export from "src/components/Download";
import { useCategoryRocketingList } from "src/data/use-category-rank";
import { sortList1 } from "../dataSource";

const Filter = () => {
  const { state, dispatch, filterRef } = useParamsContext();
  const { categoryV1, categoryV2, sort } = state;

  /** 计算出二级分类 */
  const categoryType2 = useMemo(() => getCategoryV2(categoryV1), [categoryV1]);

  const [options, setOptions] = useState<DownloadOptions>();

  const { data: tableData } = useCategoryRocketingList(state);

  // 导出
  useEffect(() => {
    setOptions({ ...state, excel_type: "636" });
  }, [state]);

  return (
    <div className="stickyFilterWrap" ref={filterRef}>
      <div>
        <FilterTagPro
          isBackTop
          level={2}
          isFilter99={true}
          title="一级品类"
          isDeploy={true}
          dataSource={getCategoryV1()}
          checked={categoryV1}
          onChange={(val) =>
            dispatch({
              type: "changeParams",
              payload: {
                categoryV1: val !== categoryV1 ? val : "",
                categoryV2: "",
                start: 1,
              },
            })
          }
        />
        {!!categoryType2?.length && (
          <FilterTagPro
            isBackTop
            level={2}
            isFilter99={true}
            title="二级品类"
            isDeploy={true}
            dataSource={categoryType2}
            checked={categoryV2}
            onChange={(val) =>
              dispatch({
                type: "changeParams",
                payload: {
                  categoryV2: val !== categoryV2 ? val : "",
                  start: 1,
                },
              })
            }
          />
        )}
      </div>
      <div className="xd-flex-between mb-[22px]">
        <FilterTagPro
          isBackTop
          level={2}
          isFilter99={true}
          title="排序字段"
          isSort={true}
          dataSource={sortList1}
          checked={sort}
          onChange={(val) =>
            dispatch({
              type: "changeParams",
              payload: {
                sort: val,
              },
            })
          }
        />
        <Export
          options={options}
          vipLevel={2}
          totalCount={tableData?.count ?? 0}
        />
      </div>
    </div>
  );
};
export default Filter;
