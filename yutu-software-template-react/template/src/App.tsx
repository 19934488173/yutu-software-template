import { SWRConfig } from 'swr';
import { ClickToComponent } from 'click-to-react-component';

const swrConfig: React.ComponentProps<typeof SWRConfig>['value'] = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
  dedupingInterval: 3000,
};

function App() {
  return (
    <>
      <ClickToComponent />
      <SWRConfig value={swrConfig}>
        <div className="text-red-400">react项目模版</div>
      </SWRConfig>
    </>
  );
}

export default App;
