import { useEffect } from 'react';
import posthog from 'posthog-js';
import Home from './modules/home/Home';

const App = () => {
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    const phid = params.get('phid');
    console.log('phid', phid);

    posthog.identify(phid ?? undefined);
  }, []);

  return <Home />;
};

export default App;
