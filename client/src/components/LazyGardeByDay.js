import React, { lazy, Suspense } from 'react';
import LazyLoading from './LazyLoading';

const Component = lazy(() => import('./GardeByDay'))





export default ()=>{
    
    return <Suspense fallback={<LazyLoading />}>
    <Component />
   </Suspense>
}