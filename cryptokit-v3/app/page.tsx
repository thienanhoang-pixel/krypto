import Nav from '@/components/layout/Nav';
import TabBar from '@/components/layout/TabBar';
import ToolsSection from '@/components/tools/ToolsSection';
import UseCasesSection from '@/components/tools/UseCasesSection';
import ExchangesSection from '@/components/tools/ExchangesSection';

export default function HomePage() {
  return (
    <main>
      <Nav />
      <TabBar />
      <div id="sec-tools">
        <ToolsSection />
      </div>
      <div id="sec-usecases" style={{ display: 'none' }}>
        <UseCasesSection />
      </div>
      <div id="sec-exchanges" style={{ display: 'none' }}>
        <ExchangesSection />
      </div>
    </main>
  );
}
