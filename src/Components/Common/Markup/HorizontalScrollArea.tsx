import {
  Root as ScrollRoot,
  Scrollbar,
  Thumb,
  Viewport,
} from "@radix-ui/react-scroll-area";
import { useRef, useState } from "react";
import { IChildren } from "../../../Utils/types";

import "../CommonStyles.css";
import "../../../App.css";

import arrowLeft from "../../../Assets/arrow-left.svg";
import arrowRight from "../../../Assets/arrow-right.svg";

interface Props {
  children?: IChildren;
  firstElemRef: React.RefObject<any>;
  lastElemRef: React.RefObject<any>;
  wrapperClassName?: string;
  viewportClassName?: string;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

export const HorizontalScrollArea: React.FC<Props> = ({
  children,
  firstElemRef,
  lastElemRef,
  wrapperClassName,
  viewportClassName,
  onNextClick,
  onPrevClick,
}) => {
  const viewportRef = useRef<any>();

  const _onPrevClick =
    onPrevClick ??
    function () {
      firstElemRef.current?.scrollIntoView({
        behavior: "smooth",
        inline: "end",
        block: "start",
      });
    };

  const _onNextClick =
    onNextClick ??
    function () {
      lastElemRef.current?.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "start",
      });
    };

  const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false);
  const [isRightArrowVisible, setIsRightArrowVisible] = useState(true);

  const onScroll = () => {
    const boundsFirst = firstElemRef.current?.getBoundingClientRect();
    const boundsLast = lastElemRef.current?.getBoundingClientRect();
    const boundsViewport = viewportRef.current?.getBoundingClientRect();
    if (Math.abs(boundsViewport.left - (boundsFirst?.left ?? 0)) <= 20) {
      if (isLeftArrowVisible) setIsLeftArrowVisible(false);
    } else {
      if (!isLeftArrowVisible) setIsLeftArrowVisible(true);
    }

    if (Math.abs(boundsViewport.right - (boundsLast?.right ?? 0)) <= 20) {
      if (isRightArrowVisible) setIsRightArrowVisible(false);
    } else {
      if (!isRightArrowVisible) setIsRightArrowVisible(true);
    }
  };

  return (
    <ScrollRoot type="auto" className={`ScrollAreaRoot ${wrapperClassName}`}>
      {isLeftArrowVisible && (
        <div
          className="horisontal-scroll-btn horisontal-scroll-btn-prev"
          onClick={_onPrevClick}
        >
          <img className="horisontal-scroll-btn-img" src={arrowLeft} alt="<" />
        </div>
      )}
      {isRightArrowVisible && (
        <div
          className="horisontal-scroll-btn horisontal-scroll-btn-next"
          onClick={_onNextClick}
        >
          <img className="horisontal-scroll-btn-img" src={arrowRight} alt=">" />
        </div>
      )}
      <Viewport
        className="ScrollAreaViewport"
        ref={viewportRef}
        onScroll={onScroll}
      >
        <div className={viewportClassName}>{children}</div>
      </Viewport>
      <Scrollbar
        className="ScrollAreaScrollbar"
        forceMount
        orientation="horizontal"
      >
        <Thumb className="ScrollAreaThumb" />
      </Scrollbar>
    </ScrollRoot>
  );
};
