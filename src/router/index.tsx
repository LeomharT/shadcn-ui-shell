import App from '@/app/App';
import FormFields from '@/features/form-fields';
import APIKeys from '@/pages/APIKeys';
import Editor from '@/pages/Editor';
import NotFound from '@/pages/NotFound';

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route index element={<div className='w-full'>Home</div>} />
        <Route path='chat' handle={{ title: 'Chat' }} element={'Chat'} />
        <Route path='api-keys' handle={{ title: 'API Keys' }} element={<APIKeys />} />
        <Route path='form-fields' handle={{ title: 'Form Fields' }} element={<FormFields />} />
      </Route>
      <Route path='/editor'>
        <Route index element={<Editor />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </>,
  ),
);

export default router;
