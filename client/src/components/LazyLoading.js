import React from "react"

const style = {
    gradient: {
        animationDuration: '1.8s',
        animationFillMode: 'forwards',
        animationIterationCount: 'infinite',
        animationName: 'placeHolderShimmer',
        animationTimingFunction: 'linear',
        background: 'linear-gradient(to right, #fafafa 8%, #f4f4f4 38%, #fafafa 54%)',
        backgroundSize: '1000px 640px',
        position: 'relative'
    },
    shape: {
        marginBottom:'0.4rem', height: 80,width: '100%',backgroundColor: '#ccc'
    }
}

const LazyLoading=({lines = 10, options= {}})=>{
    return <div style={{
        borderBottom: '1px solid #ccc'
    }}>
        {
            Array(lines).fill(0).map(()=> <div style={{
                ...style.shape,
                ...style.gradient,
                ...options
            }}></div>)
        }
    </div>
}

export default LazyLoading