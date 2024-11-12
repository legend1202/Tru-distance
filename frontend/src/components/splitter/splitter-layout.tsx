import React, { Component, ReactNode } from 'react';

import Pane from './pane';

interface PaneProps {
  vertical?: boolean;
  percentage?: boolean;
  primary?: boolean;
  size?: number | null;
  children: ReactNode;
}



interface SplitterLayoutProps {
  customClassName?: string;
  vertical?: boolean;
  percentage?: boolean;
  primaryIndex?: number;
  primaryMinSize?: number;
  secondaryInitialSize?: number;
  secondaryMinSize?: number;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onSecondaryPaneSizeChange?: (size: number) => void;
  children: ReactNode[];
}

interface SplitterLayoutState {
  secondaryPaneSize: number;
  resizing: boolean;
}

const DEFAULT_SPLITTER_SIZE = 4;

class SplitterLayout extends Component<SplitterLayoutProps, SplitterLayoutState> {
  container: HTMLDivElement | null = null;

  splitter: HTMLDivElement | null = null;

  static defaultProps: Partial<SplitterLayoutProps> = {
    customClassName: '',
    vertical: false,
    percentage: false,
    primaryIndex: 0,
    primaryMinSize: 0,
    secondaryInitialSize: undefined,
    secondaryMinSize: 0,
    onDragStart: undefined,
    onDragEnd: undefined,
    onSecondaryPaneSizeChange: undefined,
    children: [],
  };

  constructor(props: SplitterLayoutProps) {
    super(props);
    this.state = {
      secondaryPaneSize: 0,
      resizing: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('touchend', this.handleMouseUp);
    document.addEventListener('touchmove', this.handleTouchMove);

    let secondaryPaneSize;
    if (typeof this.props.secondaryInitialSize !== 'undefined') {
      secondaryPaneSize = this.props.secondaryInitialSize;
    } else {
      const containerRect = this.container!.getBoundingClientRect();
      const splitterRect = this.splitter
        ? this.splitter.getBoundingClientRect()
        : ({ width: DEFAULT_SPLITTER_SIZE, height: DEFAULT_SPLITTER_SIZE } as DOMRect);

      secondaryPaneSize = this.getSecondaryPaneSize(
        containerRect,
        splitterRect,
        {
          left: containerRect.left + (containerRect.width - splitterRect.width) / 2,
          top: containerRect.top + (containerRect.height - splitterRect.height) / 2,
        },
        false
      );
    }
    this.setState({ secondaryPaneSize });
  }

  componentDidUpdate(prevProps: SplitterLayoutProps, prevState: SplitterLayoutState) {
    if (prevState.secondaryPaneSize !== this.state.secondaryPaneSize && this.props.onSecondaryPaneSizeChange) {
      this.props.onSecondaryPaneSizeChange(this.state.secondaryPaneSize);
    }
    if (prevState.resizing !== this.state.resizing) {
      if (this.state.resizing) {
        this.props.onDragStart?.();
      } else {
        this.props.onDragEnd?.();
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('touchend', this.handleMouseUp);
    document.removeEventListener('touchmove', this.handleTouchMove);
  }

  getSecondaryPaneSize(
    containerRect: DOMRect,
    splitterRect: DOMRect,
    clientPosition: { left: number; top: number },
    offsetMouse: boolean
  ): number {
    let totalSize: number;
    let splitterSize: number;
    let offset: number;

    if (this.props.vertical) {
      totalSize = containerRect.height;
      splitterSize = splitterRect.height;
      offset = clientPosition.top - containerRect.top;
    } else {
      totalSize = containerRect.width;
      splitterSize = splitterRect.width;
      offset = clientPosition.left - containerRect.left;
    }
    if (offsetMouse) offset -= splitterSize / 2;
    offset = Math.max(0, Math.min(offset, totalSize - splitterSize));

    let secondaryPaneSize;
    if (this.props.primaryIndex === 1) {
      secondaryPaneSize = offset;
    } else {
      secondaryPaneSize = totalSize - splitterSize - offset;
    }
    return secondaryPaneSize;
  }

  handleResize = () => {
    if (this.splitter && !this.props.percentage) {
      const containerRect = this.container!.getBoundingClientRect();
      const splitterRect = this.splitter.getBoundingClientRect();
      const secondaryPaneSize = this.getSecondaryPaneSize(
        containerRect,
        splitterRect,
        { left: splitterRect.left, top: splitterRect.top },
        false
      );
      this.setState({ secondaryPaneSize });
    }
  };

  handleMouseMove = (e: MouseEvent) => {
    if (this.state.resizing) {
      const containerRect = this.container!.getBoundingClientRect();
      const splitterRect = this.splitter!.getBoundingClientRect();
      const secondaryPaneSize = this.getSecondaryPaneSize(
        containerRect,
        splitterRect,
        { left: e.clientX, top: e.clientY },
        true
      );
      clearSelection();
      this.setState({ secondaryPaneSize });
    }
  };

  handleTouchMove = (e: TouchEvent) => {
    this.handleMouseMove(e.changedTouches[0] as unknown as MouseEvent);
  };

  handleSplitterMouseDown = () => {
    clearSelection();
    this.setState({ resizing: true });
  };

  handleMouseUp = () => {
    if (this.state.resizing) {
      this.setState({ resizing: false });
    }
  };

  render() {
    const { customClassName, vertical, percentage, primaryIndex, children } = this.props;
    let containerClasses = 'splitter-layout';
    if (customClassName) containerClasses += ` ${customClassName}`;
    if (vertical) containerClasses += ' splitter-layout-vertical';
    if (this.state.resizing) containerClasses += ' layout-changing';

    const childrenArray = React.Children.toArray(children).slice(0, 2);
    if (childrenArray.length === 0) childrenArray.push(<div />);

    const wrappedChildren = childrenArray.map((child, i) => {
      const primary = i === (primaryIndex ?? 0);
      const size = primary ? undefined : this.state.secondaryPaneSize;
      return (
        <Pane vertical={vertical} percentage={percentage} primary={primary} size={size} key={i}>
          {child}
        </Pane>
      );
    });

    return (
      <div className={containerClasses} ref={(c) => (this.container = c)}>
        {wrappedChildren[0]}
        {wrappedChildren.length > 1 && (
          <div
            role="separator"
            className="layout-splitter"
            ref={(c) => (this.splitter = c)}
            onMouseDown={this.handleSplitterMouseDown}
            onTouchStart={this.handleSplitterMouseDown}
          />
        )}
        {wrappedChildren[1]}
      </div>
    );
  }
}

function clearSelection() {
  const selection = window.getSelection();
  if (selection) {
    if (selection.empty) selection.empty();
    else selection.removeAllRanges();
  }
}

export default SplitterLayout;
