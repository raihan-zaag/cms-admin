'use client';

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  type CSSProperties,
} from 'react';
import { Resizable } from 're-resizable';
import { useNode, useEditor } from '@craftjs/core';
import { debounce } from 'lodash';
import { cn } from '@/lib/utils';

// Utility functions — add these to your numToMeasurement.ts file if missing
function isPercentage(value: string | number): boolean {
  return typeof value === 'string' && value.trim().endsWith('%');
}

function pxToPercent(px: number, parentSize: number): number {
  return (px / parentSize) * 100;
}

function percentToPx(percent: string | number, parentSize: number): number {
  const numeric = typeof percent === 'string' ? parseFloat(percent) : percent;
  return (numeric / 100) * parentSize;
}

function getElementDimensions(el: HTMLElement | null): { width: number; height: number } {
  if (!el) return { width: 0, height: 0 };
  const { width, height } = el.getBoundingClientRect();
  return { width, height };
}

type ResizerProps = {
  propKey: { width: string; height: string };
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
  fillSpace?: string;
};

export const Resizer = forwardRef<any, ResizerProps>(
  ({ propKey, style, children, className, fillSpace }, ref) => {
    const {
      id,
      actions: { setProp },
      connectors: { connect, drag },
      nodeWidth,
      nodeHeight,
      parent,
      active,
      inNodeContext,
    } = useNode((node) => ({
      parent: node.data.parent,
      active: node.events.selected,
      inNodeContext: true,
      nodeWidth: node.data.props[propKey.width],
      nodeHeight: node.data.props[propKey.height],
    }));

    const { isRootNode, parentDirection } = useEditor((state, query) => ({
      parentDirection:
        parent && state.nodes[parent]?.data.props?.flexDirection,
      isRootNode: query.node(id).isRoot(),
    }));

    const resizable = useRef<Resizable>(null);
    const isResizing = useRef(false);
    const editingDimensions = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
    const nodeDimensions = useRef({ width: nodeWidth, height: nodeHeight });

    // Always keep nodeDimensions in sync with props
    useEffect(() => {
      nodeDimensions.current = { width: nodeWidth, height: nodeHeight };
    }, [nodeWidth, nodeHeight]);

    const [internalDimensions, setInternalDimensions] = useState({
      width: nodeWidth,
      height: nodeHeight,
    });

    const updateInternalDimensionsInPx = useCallback(() => {
      const { width, height } = nodeDimensions.current;
      const parentEl = resizable.current?.resizable?.parentElement || null;
      const parentDims = getElementDimensions(parentEl);
      setInternalDimensions({
        width: percentToPx(width, parentDims.width),
        height: percentToPx(height, parentDims.height),
      });
    }, []);

    const updateInternalDimensionsWithOriginal = useCallback(() => {
      const { width, height } = nodeDimensions.current;
      setInternalDimensions({ width, height });
    }, []);

    const getUpdatedDimensions = (dw: number, dh: number) => {
      const current = editingDimensions.current;
      return {
        width: current.width + dw,
        height: current.height + dh,
      };
    };

    // Always keep nodeDimensions in sync with props
    useEffect(() => {
      nodeDimensions.current = { width: nodeWidth, height: nodeHeight };
    }, [nodeWidth, nodeHeight]);

    useEffect(() => {
      if (!isResizing.current) updateInternalDimensionsWithOriginal();
    }, [nodeWidth, nodeHeight, updateInternalDimensionsWithOriginal]);

    useEffect(() => {
      const resizeListener = debounce(updateInternalDimensionsWithOriginal, 1);
      window.addEventListener('resize', resizeListener);
      return () => window.removeEventListener('resize', resizeListener);
    }, [updateInternalDimensionsWithOriginal]);

    // Calculate max dimensions based on parent
    const getMaxDimensions = useCallback(() => {
      if (isRootNode) {
        return { maxWidth: undefined, maxHeight: undefined };
      }
      
      const parentEl = resizable.current?.resizable?.parentElement;
      if (!parentEl) return { maxWidth: undefined, maxHeight: undefined };
      
      const parentDims = getElementDimensions(parentEl);
      const parentStyle = window.getComputedStyle(parentEl);
      const parentPaddingLeft = parseFloat(parentStyle.paddingLeft) || 0;
      const parentPaddingRight = parseFloat(parentStyle.paddingRight) || 0;
      const parentPaddingTop = parseFloat(parentStyle.paddingTop) || 0;
      const parentPaddingBottom = parseFloat(parentStyle.paddingBottom) || 0;
      
      return {
        maxWidth: parentDims.width - parentPaddingLeft - parentPaddingRight - 10,
        maxHeight: parentDims.height - parentPaddingTop - parentPaddingBottom - 10,
      };
    }, [isRootNode]);

    const maxDimensions = getMaxDimensions();

    useImperativeHandle(ref, () => resizable.current?.resizable, []);

    return (
      <Resizable
        enable={{
          top: active && inNodeContext,
          left: active && inNodeContext,
          bottom: active && inNodeContext,
          right: active && inNodeContext,
          topLeft: active && inNodeContext,
          topRight: active && inNodeContext,
          bottomLeft: active && inNodeContext,
          bottomRight: active && inNodeContext,
        }}
        className={cn(className, {
          'm-auto': isRootNode,
          flex: true,
        })}
        ref={(r) => {
          if (r?.resizable) {
            resizable.current = r;
            connect(drag(r.resizable));
          }
        }}
        size={internalDimensions}
        style={style}
        bounds={isRootNode ? undefined : "parent"}
        minWidth={50}
        minHeight={50}
        maxWidth={maxDimensions.maxWidth}
        maxHeight={maxDimensions.maxHeight}
        onResizeStart={(e) => {
          updateInternalDimensionsInPx();
          e.preventDefault();
          e.stopPropagation();

          const dom = resizable.current?.resizable;
          if (dom) {
            const rect = dom.getBoundingClientRect();
            editingDimensions.current = {
              width: rect.width,
              height: rect.height,
            };
          }
          isResizing.current = true;
        }}
        onResize={(_, __, ___, delta) => {
          const dom = resizable.current?.resizable;
          const updated = getUpdatedDimensions(delta.width, delta.height);

          const parentEl = dom?.parentElement ?? null;
          const parentDims = getElementDimensions(parentEl);

          // For non-root nodes, ensure we don't exceed parent dimensions
          let constrainedWidth = updated.width;
          let constrainedHeight = updated.height;

          if (!isRootNode && parentEl) {
            // Get parent's inner dimensions (excluding padding/border)
            const parentStyle = window.getComputedStyle(parentEl);
            const parentPaddingLeft = parseFloat(parentStyle.paddingLeft) || 0;
            const parentPaddingRight = parseFloat(parentStyle.paddingRight) || 0;
            const parentPaddingTop = parseFloat(parentStyle.paddingTop) || 0;
            const parentPaddingBottom = parseFloat(parentStyle.paddingBottom) || 0;
            
            const availableWidth = parentDims.width - parentPaddingLeft - parentPaddingRight - 10; // 10px margin
            const availableHeight = parentDims.height - parentPaddingTop - parentPaddingBottom - 10; // 10px margin
            
            constrainedWidth = Math.min(Math.max(updated.width, 50), availableWidth);
            constrainedHeight = Math.min(Math.max(updated.height, 50), availableHeight);
          } else {
            // For root nodes, just ensure minimum size
            constrainedWidth = Math.max(updated.width, 100);
            constrainedHeight = Math.max(updated.height, 100);
          }

          const widthValue = isPercentage(nodeWidth)
            ? `${pxToPercent(constrainedWidth, parentDims.width)}%`
            : `${constrainedWidth}px`;

          const heightValue = isPercentage(nodeHeight)
            ? `${pxToPercent(constrainedHeight, parentDims.height)}%`
            : `${constrainedHeight}px`;

          setProp((props: any) => {
            props[propKey.width] = widthValue;
            props[propKey.height] = heightValue;
          }, 500);

          // If this is a root node and height is increasing, allow container to grow
          if (isRootNode) {
            // Find the canvas container and ensure it can grow
            const canvasContainer = dom?.closest('.min-h-full') || 
                                  dom?.closest('[data-cy="canvas"]') || 
                                  dom?.closest('.craftjs-renderer')?.parentElement;
            
            if (canvasContainer && canvasContainer instanceof HTMLElement) {
              const newMinHeight = Math.max(constrainedHeight + 100, 600); // Ensure minimum canvas height
              canvasContainer.style.minHeight = `${newMinHeight}px`;
            }
          }
        }}
        onResizeStop={() => {
          isResizing.current = false;
          updateInternalDimensionsWithOriginal();
        }}
      >
        {children}

        {active && (
          <div className="absolute inset-0 pointer-events-none z-[9999]">
            {/* Top-Left */}
            <span
              className="absolute w-[10px] h-[10px] bg-white border-2 border-blue-400 rounded-full shadow-md"
              style={{
                top: '-5px',
                left: fillSpace === 'yes' && parentDirection === 'row' ? '50%' : '-5px',
                transform:
                  fillSpace === 'yes'
                    ? parentDirection === 'row'
                      ? 'translateX(-50%)'
                      : 'translateY(-50%)'
                    : undefined,
              }}
            />
            {/* Top-Right */}
            {fillSpace !== 'yes' && (
              <span
                className="absolute w-[10px] h-[10px] bg-white border-2 border-blue-400 rounded-full shadow-md"
                style={{ top: '-5px', right: '-5px' }}
              />
            )}
            {/* Bottom-Left */}
            <span
              className="absolute w-[10px] h-[10px] bg-white border-2 border-blue-400 rounded-full shadow-md"
              style={{
                bottom: '-5px',
                left: fillSpace === 'yes' && parentDirection === 'row' ? '50%' : '-5px',
                transform:
                  fillSpace === 'yes'
                    ? parentDirection === 'row'
                      ? 'translateX(-50%)'
                      : 'translateY(50%)'
                    : undefined,
              }}
            />
            {/* Bottom-Right */}
            {fillSpace !== 'yes' && (
              <span
                className="absolute w-[10px] h-[10px] bg-white border-2 border-blue-400 rounded-full shadow-md"
                style={{ bottom: '-5px', right: '-5px' }}
              />
            )}
          </div>
        )}
      </Resizable>
    );
  }
);
