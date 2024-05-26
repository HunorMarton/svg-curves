import { AppProvider } from "../state/context.tsx";
import { PageArc } from "../connected/PageArc.tsx";

export const Page: React.FC = () => (
  <AppProvider>
    <PageArc />
  </AppProvider>
);
