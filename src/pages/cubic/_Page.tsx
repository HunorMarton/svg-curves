import { AppProvider } from "../../state/context.tsx";
import { PageCubicBezier } from "../../connected/PageCubicBezier.tsx";

export const Page: React.FC = () => (
  <AppProvider>
    <PageCubicBezier />
  </AppProvider>
);
