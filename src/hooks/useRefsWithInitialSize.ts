import React, { Children, ReactElement, Ref, useRef } from 'react';

interface RefWithInitialSize<T extends HTMLElement> {
    element: T;
    initialSize: number;
}

export interface ForwardRefProps<T> {
    onRef?: Ref<T>;
}

interface RefsWithInitialSizeHook<T extends HTMLElement> {
    getRef: (index: number) => RefWithInitialSize<T>;
    setRef: (index: number, element: T) => void;
    /**
     * Update the initial size of the element
     */
    resetRef: (index: number) => void;
    /**
     * Clone the children and pass `onRef` props to record the element ref.
     */
    childrenWithRef: <P extends ForwardRefProps<T>>(children: ReactElement<P> | ReactElement<P>[]) => ReactElement<P>[];
}

export type Direction = 'horizontal' | 'vertical';

const createRefWithInitialSize = < T extends HTMLElement>(direction: Direction, element: T): RefWithInitialSize<T> => {
    const boundingClientRect = element.getBoundingClientRect();
    if (direction == 'horizontal') {
        return {
            element,
            initialSize: boundingClientRect.width,
        }
    } else {
        return {
            element,
            initialSize: boundingClientRect.height
        }
    }
    
}
/**
 * Creates a ref that save the `dom element` and the `initial size` for a list of elements. * 
 * @param direction ["horizontal"|"vertical"] Direction to save initial size. `horizontal` uses `width` | `vertical` uses `height`.
 */
export const useRefsWithInitialSize = < T extends HTMLElement>(direction: Direction): RefsWithInitialSizeHook<T> => {
    const refs = useRef<RefWithInitialSize<T>[]>(null);

    const getRef = (index: number) => {
        const current = refs.current;
        return current ? current[index] : null;
    }

    const setRef = (index: number, element?: T) => {
        if (!element) return;
        
        const current = refs.current;
        refs.current = current ? [...current] : [];
        refs.current[index] = createRefWithInitialSize<T>(direction, element);
    }

    const resetRef = (index: number) => {
        const current = refs.current;
        if (current && current[index] && current[index].element) {
            setRef(index, current[index].element)
        }
    }

    const childrenWithRef = <P extends ForwardRefProps<T>>(children: ReactElement<P> | ReactElement<P>[]) => {
        return Children.map(children, (child, index) => {
            const newProps: Partial<P> = {};
            newProps.onRef = (ref: T) => setRef(index, ref);
            return React.cloneElement<P>(child, newProps);
        })
    }

    return {
        getRef,
        setRef,
        resetRef,
        childrenWithRef,
    }
}