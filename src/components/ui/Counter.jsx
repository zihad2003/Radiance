import { useState, useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

const Counter = ({ from, to, duration = 2, suffix = "" }) => {
    const nodeRef = useRef();
    const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const node = nodeRef.current;
            const controls = animate(from, to, {
                duration: duration,
                onUpdate(value) {
                    node.textContent = Math.round(value).toLocaleString() + suffix;
                },
                ease: "easeOut"
            });
            return () => controls.stop();
        }
    }, [isInView, from, to, duration, suffix]);

    return <span ref={nodeRef}>{from}{suffix}</span>;
};

export default Counter;
