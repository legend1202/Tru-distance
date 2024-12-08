import { FlowDataContext } from './flow-data-context';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function FlowDataConsumer({ children }: Props) {
  return <FlowDataContext.Consumer>{() => children}</FlowDataContext.Consumer>;
}
