import App from '@/app/App';
import APIKeys from '@/pages/APIKeys';
import NotFound from '@/pages/NotFound';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<div className='w-full'>Home</div>} />
      <Route path='chat' handle={{ title: 'Chat' }} element={'Chat'} />
      <Route path='api-keys' handle={{ title: 'API Keys' }} element={<APIKeys />} />
      {/* Not Found */}
      <Route path='*' element={<NotFound />} />
    </Route>,
  ),
);

export default router;
