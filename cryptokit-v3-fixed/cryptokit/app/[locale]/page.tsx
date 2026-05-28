import { useTranslations } from 'next-intl';
import Nav from '@/components/layout/Nav';
import ToolsSection from '@/components/tools/ToolsSection';
import UseCasesSection from '@/components/tools/UseCasesSection';
import ExchangesSection from '@/components/tools/ExchangesSection';
import TabBar from '@/components/layout/TabBar';

export default function HomePage() {
  return (
    <main>
      <Nav />
      <TabBar />
      {/* Sections rendered client-side via TabBar */}
      <div id="sec-tools" className="section active">
        <ToolsSection />
      </div>
      <div id="sec-usecases" className="section">
        <UseCasesSection />
      </div>
      <div id="sec-exchanges" className="section">
        <ExchangesSection />
      </div>
    </main>
  );
}
