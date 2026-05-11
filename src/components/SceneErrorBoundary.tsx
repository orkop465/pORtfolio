import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode; fallback: ReactNode };
type State = { hasError: boolean };

export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(err: unknown) {
    console.warn('[wow] scene error, using fallback:', err);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
