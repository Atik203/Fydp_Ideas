import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { OverviewPage } from '@/pages/OverviewPage';
import { IdeaDetailPage } from '@/pages/IdeaDetailPage';
import { RoadmapPage } from '@/pages/RoadmapPage';
import { ProposalPage } from '@/pages/ProposalPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <SiteNav />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<OverviewPage />} />
              <Route path="/idea/1" element={<IdeaDetailPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/proposal" element={<ProposalPage />} />
            </Routes>
          </div>
          <SiteFooter />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
