import { AppProvider } from "../../state/context.tsx";
import { PageQuadraticBezier } from "../../connected/PageQuadraticBezier.tsx";

export const Page: React.FC = () => (
  <AppProvider>
    <PageQuadraticBezier />
  </AppProvider>
);
