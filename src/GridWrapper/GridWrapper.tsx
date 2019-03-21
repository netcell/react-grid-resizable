import { clamp, last } from 'lodash';
import React, { ReactElement } from 'react';
import { CellProps } from '../CellWrapper/Cell';
import { processOptions } from '../CellWrapper/ResizeDirectionOptions';
import { Direction, useRefsWithInitialSize } from '../hooks/useRefsWithInitialSize';
import { Separator, SeparatorDivProps } from '../Separators/Separator';

/**
 * Interface for extending this wrapper by providing specific direction
 */
export interface GridWrapperProps<P extends CellProps> {
    children? : ReactElement<P> | ReactElement<P>[];
    /**
     * Provide props to the separators of the grid
     */
    separatorProps?: SeparatorDivProps;
}

interface GridWrapperPropsWithDirection<P extends CellProps> extends GridWrapperProps<P> {
    direction: Direction;
}

const getStylePropertyForSize = (direction: Direction) => {
    if (direction == 'horizontal') {
        return 'width';
    } else {
        return 'height';
    }
}

const getDirectionOptions = (direction: Direction) => {
    if (direction == 'horizontal') {
        return {
            current: 'left',
            previous: 'right'
        }
    } else {
        return {
            current: 'top',
            previous: 'bottom'
        }
    }
}

export const GridWrapper = <P extends CellProps>(props: GridWrapperPropsWithDirection<P>) => {
    const {
        getRef,
        resetRef,
        childrenWithRef,
    } = useRefsWithInitialSize<HTMLDivElement>(props.direction);

    const stylePropertyForSize = getStylePropertyForSize(props.direction);
    const directionOptions     = getDirectionOptions(props.direction);

    const resizeElement = (element: HTMLDivElement, initialSize: number, sizeChange: number) => {
        element.style[stylePropertyForSize] = `${initialSize + sizeChange}px`;
        /**
         * If the element is resized, the flex property must be set to `none`
         * Otherwise, the element will not be able to get smaller
         */
        element.style.flex = 'none';
    }
    /**
     * Create an event handler to save the size of the cells around the separator before dragging
     * @param currentIndex Index of the element after the separator
     */
    const dragStartHandlerCreator = (currentIndex: number) => () => {
        resetRef(currentIndex - 1);
        resetRef(currentIndex);
    }
    /**
     * Create an event handler to update the size of the cells around the separator when it is dragged
     * @param currentIndex Index of the element after the separator
     * @param resizeCurrent Should the element after the separator be resized
     * @param resizePrevious Should the element before the separator be resized
     */
    const dragHandlerCreator = (currentIndex: number, resizeCurrent: boolean, resizePrevious: boolean) => (distance: number) => {
        const previousRef = getRef(currentIndex - 1);
        const currentRef  = getRef(currentIndex);

        const previousInitialSize = previousRef.initialSize;
        const currentInitialSize  = currentRef.initialSize;
        /**
         * We need to clamp the distance so that it does not exceed the size of the elements around the separator
         * If we do not do this, when one element might receive negative number as size which is not a problem
         * but the problem is that the other element will start extending in size
         */
        distance = clamp(
            distance, 
            resizePrevious ? -previousInitialSize : distance,
            resizeCurrent  ?  currentInitialSize  : distance
        );

        if (resizePrevious) {
            resizeElement(previousRef.element, previousInitialSize, distance);
        }
        
        if (resizeCurrent) {
            resizeElement(currentRef.element, currentInitialSize, -distance);
        }
    }
    
    const childrenWithSeparator = childrenWithRef<P>(props.children)
    /**
     * Insert Separator between children and set event handler
     */
    .reduce<ReactElement[]>((newChildren, currentChild, currentIndex, children) => {
        if (!newChildren.length) {
            return [
                currentChild,
            ]
        } else {
            const previousChild = last(newChildren);

            const resizePrevious = processOptions(previousChild.props)[directionOptions.previous];
            /**
             * Should not resize the last element in the grid if it is a flex one
             */
            const isLastElement = currentIndex == children.length - 1;
            const hasInitialSize = currentChild.props.initialHeight || currentChild.props.initialWidth;
            const resizeCurrent  = (isLastElement && !hasInitialSize) ? false : processOptions(currentChild.props )[directionOptions.current];
            /**
             * Separator is not inserted if these elements don't want to be resized here
             */
            if (!resizePrevious && !resizeCurrent) {
                return [
                    ...newChildren,
                    currentChild,
                ];
            } else {
                const onDragStart = dragStartHandlerCreator(currentIndex);
                const onDrag = dragHandlerCreator(currentIndex, resizeCurrent, resizePrevious);

                return [
                    ...newChildren,
                    <Separator key={`${currentIndex - 1}-${currentIndex}`}
                        {...props.separatorProps}
                        direction   = {props.direction}
                        onDrag      = {onDrag}
                        onDragStart = {onDragStart}
                    />,
                    currentChild,
                ];
            }
            
        }
    }, []);
    
    return <>
        {childrenWithSeparator}
    </>
}