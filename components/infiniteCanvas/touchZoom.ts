/**
 * @file Handles pan and zoom events to create an infinite canvas.
 *
 * This acts as a replacement for the "panzoom" library on `npm` that's less
 * buggy on mobile and feels natural. It's loosely based on tldraw.
 *
 * https://github.com/tldraw/tldraw/blob/24cad695/packages/core/src/hooks/useZoomEvents.ts
 *
 * Unfortunately this code barely works. Not by lack of effort, mind you, I
 * actually spent hours. Gestures are hard. :(
 */

  import {
    Gesture,
    type Handler,
    type WebKitGestureEvent,
  } from "@use-gesture/vanilla";
  import Vec from "@tldraw/vec";

  const util = require('util')
  
  // Credits: from excalidraw
  // https://github.com/excalidraw/excalidraw/blob/07ebd7c68ce6ff92ddbc22d1c3d215f2b21328d6/src/utils.ts#L542-L563
  const getNearestScrollableContainer = (
    element: HTMLElement
  ): HTMLElement | Document => {
    let parent = element.parentElement;
    while (parent) {
      if (parent === document.body) {
        return document;
      }
      const { overflowY } = window.getComputedStyle(parent);
      const hasScrollableContent = parent.scrollHeight > parent.clientHeight;
      if (
        hasScrollableContent &&
        (overflowY === "auto" ||
          overflowY === "scroll" ||
          overflowY === "overlay")
      ) {
        return parent;
      }
      parent = parent.parentElement;
    }
    return document;
  };
  
  function isDarwin(): boolean {
    return /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
  }
  
  function debounce<T extends (...args: any[]) => void>(fn: T, ms = 0) {
    let timeoutId: number | any;
    return function(...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(args), ms);
    };
  }
  
  // config for zoom and pan bounds
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 10;

  
  const SCALING_FACTOR = 1.5;
  
  const IS_FINITE = true;
  
  export class TouchZoom {
    #node: HTMLElement | null;
    #scrollingAnchor: HTMLElement | Document;
    #gesture: Gesture;
    #resizeObserver: ResizeObserver;
  
    #bounds = {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      width: 0,
      height: 0,
    };
    #originPoint: number[] | undefined = undefined;
    #delta: number[] = [0, 0];
    #lastMovement = 1;
    #wheelLastTimeStamp = 0;
  
    #callbacks = new Set<(manual: boolean) => void>();
  
    isPinching = false;
    center: number[] = [0, 0];
    zoom: number = 1;
    // bounds for zoom and pan
    MIN_X: number = 0;
    MAX_X: number = 0;
    MIN_Y: number = 0;
    MAX_Y: number = 1000;
    zp_minX: number = this.MIN_X;
    zp_maxX: number = this.MAX_X;
    zp_minY: number = this.MIN_Y;
    zp_maxY: number = this.MAX_Y;
  
    #preventGesture = (event: TouchEvent) => event.preventDefault();
  
    constructor(node: HTMLElement, zpBounds?: [number, number, number, number]) {
      // console.log(util.inspect(node, false, 1, true /* enable colors */))
      this.#node = node;
      this.#scrollingAnchor = getNearestScrollableContainer(node);
      // @ts-ignore
      document.addEventListener("gesturestart", this.#preventGesture);
      // @ts-ignore
      document.addEventListener("gesturechange", this.#preventGesture);
  
      this.#updateBounds();
      window.addEventListener("resize", this.#updateBoundsD);
      this.#scrollingAnchor.addEventListener("scroll", this.#updateBoundsD);
  
      this.#resizeObserver = new ResizeObserver((entries) => {
        if (this.isPinching) return;
        if (entries[0].contentRect) this.#updateBounds();
      });
      this.#resizeObserver.observe(node);
  
      this.#gesture = new Gesture(
        node,
        {
          onWheel: this.#handleWheel,
          onPinchStart: this.#handlePinchStart,
          onPinch: this.#handlePinch,
          onPinchEnd: this.#handlePinchEnd,
          onDrag: this.#handleDrag,
        },
        {
          target: node,
          eventOptions: { passive: false },
          pinch: {
            from: [this.zoom, 0],
            scaleBounds: () => {
              return { from: this.zoom, max: MAX_ZOOM, min: MIN_ZOOM };
            },
          },
          drag: {
            filterTaps: true,
          },
        }
      );

      this.MIN_X = zpBounds? zpBounds[0] : this.MIN_X;
      this.MAX_X = zpBounds? zpBounds[1] : this.MAX_X;
      this.MIN_Y = zpBounds? zpBounds[2] : this.MIN_Y;
      this.MAX_Y = zpBounds? zpBounds[3] : this.MAX_Y;
      this.zp_minX = this.MIN_X;
      this.zp_maxX = this.MAX_X;
      this.zp_minY = this.MIN_Y;
      this.zp_maxY = this.MAX_Y;
      // console.log(util.inspect(this.#node, false, 1, true /* enable colors */))
    }
  
    #getPoint(e: PointerEvent | Touch | WheelEvent): number[] {
      return [
        +e.clientX.toFixed(2) - this.#bounds.minX,
        +e.clientY.toFixed(2) - this.#bounds.minY,
      ];
    }
  
    #updateBounds = () => {
      // console.log("update bounds")
      if (!this.#node) {
        return;
      }
      const rect = this.#node.getBoundingClientRect();
      this.#bounds = {
        minX: rect.left,
        maxX: rect.left + rect.width,
        minY: rect.top,
        maxY: rect.top + rect.height,
        width: rect.width,
        height: rect.height,
      };
    };
  
    #updateBoundsD = debounce(this.#updateBounds, 100);
  
    onMove(callback: (manual: boolean) => void): () => void {
      this.#callbacks.add(callback);
      return () => this.#callbacks.delete(callback);
    }
  
    async moveTo(pos: number[], zoom: number) {
      // Cubic bezier easing
      const smoothstep = (z: number) => {
        const x = Math.max(0, Math.min(1, z));
        return x * x * (3 - 2 * x);
      };
  
      const beginTime = Date.now();
      const totalTime = 350; // milliseconds
  
      const start = this.center;
      const startZ = 1 / this.zoom;
      const finishZ = 1 / zoom;
      while (true) {
        const t = Date.now() - beginTime;
        if (t > totalTime) break;
        const k = smoothstep(t / totalTime);
  
        this.center = Vec.lrp(start, pos, k);
        this.zoom = 1 / (startZ * (1 - k) + finishZ * k);
        this.#moved(false);
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      if (IS_FINITE) {
        this.center = [
          Vec.clamp(pos[0], this.zp_minX, this.zp_maxX),
          Vec.clamp(pos[1], this.zp_minY, this.zp_maxY),
        ];
      }
      this.center = pos;
      this.zoom = zoom;
      this.#moved(false);
    }
  
    #moved(manual = true) {
      for (const callback of this.#callbacks) {
        callback(manual);
      }
    }
  
    #handleWheel: Handler<"wheel", WheelEvent> = ({ event: e }) => {
      console.log("wheel")
      e.preventDefault();
      if (this.isPinching || e.timeStamp <= this.#wheelLastTimeStamp) return;
  
      this.#wheelLastTimeStamp = e.timeStamp;
  
      const [x, y, z] = normalizeWheel(e);
  
      // alt+scroll or ctrl+scroll = zoom (when not clicking)
      if ((e.altKey || e.ctrlKey || e.metaKey) && e.buttons === 0) {
        const point =
          e.clientX && e.clientY
            ? this.#getPoint(e)
            : [this.#bounds.width / 2, this.#bounds.height / 2];
        const delta = z * 0.618;
  
        let newZoom = (1 - delta / 80) * this.zoom;
        newZoom = Vec.clamp(newZoom, MIN_ZOOM, MAX_ZOOM);
  
        const offset = Vec.sub(point, [
          this.#bounds.width / 2,
          this.#bounds.height / 2,
        ]);
        const movement = Vec.mul(offset, 1 / this.zoom - 1 / newZoom);

        let newCenter = Vec.add(this.center, movement);
        if (IS_FINITE) {
          newCenter = [
            Vec.clamp(newCenter[0], this.zp_minX, this.zp_maxX),
            Vec.clamp(newCenter[1], this.zp_minY, this.zp_maxY),
          ];
        }
        this.center = newCenter;

        // this.center = Vec.add(this.center, movement);
        this.zoom = newZoom;

        this.zp_maxX = this.MAX_X * newZoom * SCALING_FACTOR;
        this.zp_maxY = this.MAX_Y * newZoom * SCALING_FACTOR;
        this.zp_minX = this.MIN_X * newZoom * SCALING_FACTOR;
        this.zp_minY = this.MIN_Y * newZoom * SCALING_FACTOR;
  
        this.#moved();
        return;
      }
  
      // otherwise pan
      const delta = Vec.mul(
        e.shiftKey && !isDarwin()
          ? // shift+scroll = pan horizontally
          [y, 0]
          : // scroll = pan vertically (or in any direction on a trackpad)
          [x, y],
        0.5
      );
  
      if (Vec.isEqual(delta, [0, 0])) return;

      let newCenter = Vec.add(this.center, Vec.div(delta, this.zoom));
      if (IS_FINITE) {
        if (Math.abs(delta[0]) > Math.abs(delta[1])) { // check if change in x direction is greater than change in y direction
          newCenter = [
            Vec.clamp(newCenter[0], this.zp_minX, this.zp_maxX),
            Vec.clamp(newCenter[1], this.zp_minY, this.zp_maxY),
          ];
        } else {
          newCenter = [
            this.center[0],
            Vec.clamp(newCenter[1], this.zp_minY, this.zp_maxY),
          ];
        }
      }
      this.center = newCenter;
      // this.center = Vec.add(this.center, Vec.div(delta, this.zoom));
      this.#moved();
    };
  
    #handlePinchStart: Handler<
      "pinch",
      WheelEvent | PointerEvent | TouchEvent | WebKitGestureEvent
    > = ({ origin, event }) => {
      if (event instanceof WheelEvent) return;
  
      this.isPinching = true;
      this.#originPoint = origin;
      this.#delta = [0, 0];
      this.#lastMovement = 1;
      this.#moved();
    };
  
    #handlePinch: Handler<
      "pinch",
      WheelEvent | PointerEvent | TouchEvent | WebKitGestureEvent
    > = ({ origin, movement, event }) => {
      console.log("pinch")
      if (event instanceof WheelEvent) return;
      
  
      if (!this.#originPoint) return;
      const delta = Vec.sub(this.#originPoint, origin);
      const trueDelta = Vec.sub(delta, this.#delta);
      this.#delta = delta;
  
      const zoomLevel = movement[0] / this.#lastMovement;
      this.#lastMovement = movement[0];
      
      let newCenter = Vec.add(this.center, Vec.div(trueDelta, this.zoom * 2));
      if (IS_FINITE) {
        newCenter = [
          Vec.clamp(newCenter[0], this.zp_minX, this.zp_maxX),
          Vec.clamp(newCenter[1], this.zp_minY, this.zp_maxY),
        ];
      }
      this.center = newCenter;
      // this.center = Vec.add(this.center, Vec.div(trueDelta, this.zoom * 2));
      const newZoom = Vec.clamp(this.zoom * zoomLevel, MIN_ZOOM, MAX_ZOOM);
      this.zoom = newZoom;

      this.zp_maxX = this.MAX_X * newZoom * SCALING_FACTOR;
      this.zp_maxY = this.MAX_Y * newZoom * SCALING_FACTOR;
      this.zp_minX = this.MIN_X * newZoom * SCALING_FACTOR;
      this.zp_minY = this.MIN_Y * newZoom * SCALING_FACTOR;

      this.#moved();
    };
  
    #handlePinchEnd: Handler<
      "pinch",
      WheelEvent | PointerEvent | TouchEvent | WebKitGestureEvent
    > = () => {
      this.isPinching = false;
      this.#originPoint = undefined;
      this.#delta = [0, 0];
      this.#lastMovement = 1;
      this.#moved();
    };
  
    #handleDrag: Handler<
      "drag",
      TouchEvent | MouseEvent | PointerEvent | KeyboardEvent
    > = ({ delta, elapsedTime }) => {
      console.log("DRAGGIN")
      if (delta[0] === 0 && delta[1] === 0 && elapsedTime < 200) return;

      let newCenter = Vec.sub(this.center, Vec.div(delta, this.zoom));
      if (IS_FINITE) {
        newCenter = [
          Vec.clamp(newCenter[0], this.zp_minX, this.zp_maxX),
          Vec.clamp(newCenter[1], this.zp_minY, this.zp_maxY),
        ];
      }
      this.center = newCenter;

      // this.center = Vec.sub(this.center, Vec.div(delta, this.zoom));
      this.#moved();
    };
  
    destroy() {
      if (this.#node) {
        // @ts-ignore
        document.addEventListener("gesturestart", this.#preventGesture);
        // @ts-ignore
        document.addEventListener("gesturechange", this.#preventGesture);
  
        window.removeEventListener("resize", this.#updateBoundsD);
        this.#scrollingAnchor.removeEventListener("scroll", this.#updateBoundsD);
  
        this.#resizeObserver.disconnect();
  
        this.#gesture.destroy();
        this.#node = null;
      }
    }
  }
  
  // Reasonable defaults
  const MAX_ZOOM_STEP = 10;
  
  // Adapted from https://stackoverflow.com/a/13650579
  function normalizeWheel(event: WheelEvent) {
    const { deltaY, deltaX } = event;
  
    let deltaZ = 0;
  
    if (event.ctrlKey || event.metaKey) {
      const signY = Math.sign(event.deltaY);
      const absDeltaY = Math.abs(event.deltaY);
  
      let dy = deltaY;
  
      if (absDeltaY > MAX_ZOOM_STEP) {
        dy = MAX_ZOOM_STEP * signY;
      }
  
      deltaZ = dy;
    }
  
    return [deltaX, deltaY, deltaZ];
  }
  