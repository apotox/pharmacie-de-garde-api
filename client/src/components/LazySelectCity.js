import React, { lazy, Suspense } from 'react';
import LazyLoading from './LazyLoading';

const Component = lazy(() => import('./SelectCity'))

export default ()=>{
    
    return <Suspense  fallback={<LazyLoading lines={1} />}>
    <Component />
   </Suspense>
}