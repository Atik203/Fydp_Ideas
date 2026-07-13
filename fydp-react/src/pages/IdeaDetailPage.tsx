import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionTitle } from '@/components/shared/Section';
import { KpiRow } from '@/components/shared/KpiRow';
import { ideaMetadata } from '@/data/ideas';
import { Idea1Content } from './ideas/Idea1Content';

const idea = ideaMetadata[0];

export function IdeaDetailPage() {
  return (
    <>
      <PageHeader
        docType={idea.docType}
        label="Project Idea"
        title={idea.title}
        subtitle={idea.subtitle}
        coverItems={idea.coverItems}
      />

      <main className="max-w-[1150px] mx-auto my-10 px-4 sm:px-5">
        <Section>
          <SectionTitle icon="📊">At a Glance</SectionTitle>
          <KpiRow kpis={idea.kpis} />
        </Section>

        <Idea1Content />
      </main>
    </>
  );
}
