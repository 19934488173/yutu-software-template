import Filter from './Filter';
import ResultTable from './ResultTable';
import ParamsProvider from './useParamsContext';

const Growth = () => {
  return (
    <ParamsProvider>
      <Filter />
      <ResultTable />
    </ParamsProvider>
  );
};
export default Growth;
