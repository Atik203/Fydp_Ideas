import { Section, SectionTitle, ColBox, TwoCol } from '@/components/shared/Section';
import { Callout } from '@/components/shared/Callout';
import { InfoGrid } from '@/components/shared/InfoGrid';
import { Badge } from '@/components/shared/Badge';
import { GanttTable } from '@/components/shared/GanttTable';
import { Timeline } from '@/components/shared/Timeline';
import { RiskTable } from '@/components/shared/RiskTable';
import { datasets, failures, ganttPhases, milestones, resources, risks } from '@/data/overview';

export function Idea1Content() {
  return (
    <>

      {/* ───────────── 1. Core Idea ───────────── */}
      <Section accent="blue" className="animate-fade-up">
        <SectionTitle icon="💡">1. Core Idea</SectionTitle>
        <p className="mb-3 text-sm sm:text-base">
          We propose a <strong>trust-calibrated multi-agent scientific deliberation</strong> framework to mitigate{' '}
          <strong>sycophantic consensus collapse</strong> in LLM reasoning. Agents whose claims are verified by
          retrieved scientific literature accumulate higher trust weights, preventing hallucinating majorities from
          suppressing correct minority agents.
        </p>
        <Callout variant="success" title="🎯 Positioning & Contributions">
          <p className="mb-2">
            Recent work has <em>diagnosed and measured</em> inter-agent sycophancy (Yao et al., 2025) and the
            correct-minority-suppression effect (He et al., 2026). Our contribution is the missing{' '}
            <strong>mitigation</strong> side: an in-session, evidence-grounded mechanism, plus an open evaluation
            harness.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li><strong>C1 — Trust-Calibrated Evidence-Grounded Aggregation (primary).</strong> A bounded, dynamic, evidence-weighted trust rule that re-weights agents during the debate.</li>
            <li><strong>C2 — Open Sycophancy-Stress Evaluation Harness (co-primary).</strong> A pre-registered injection protocol + CCR / MPR / ECR metrics + 9-baseline suite.</li>
            <li><strong>C3 — Supporting:</strong> Progressive, source-partitioned retrieval for atomic-claim verification.</li>
          </ul>
        </Callout>
      </Section>

      {/* ───────────── 2. Research Motivation ───────────── */}
      <Section className="animate-fade-up animate-delay-1">
        <SectionTitle icon="🔬">2. Research Motivation</SectionTitle>
        <TwoCol>
          <ColBox>
            <h4 className="text-sm font-bold mb-2">Why this problem matters</h4>
            <p className="text-sm leading-relaxed">
              Sycophancy is cited as an open problem in 50+ peer-reviewed papers since 2023. In multi-agent systems,
              it undermines the reason multi-agent debate is used — if debate collapses to whichever position sounds
              most confident rather than which is most correct, it adds cost without adding reliability.
            </p>
          </ColBox>
          <ColBox>
            <h4 className="text-sm font-bold mb-2">The specific gap</h4>
            <p className="text-sm leading-relaxed">
              <strong>No existing framework dynamically re-weights agent influence within an active debate session
              based on real-time verifiability of claims against external evidence.</strong> This is the exact,
              verified gap.
            </p>
          </ColBox>
        </TwoCol>
        <h4 className="text-sm font-bold mt-4 mb-2">Existing limitations (verified against literature)</h4>
        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr>
                {['Work', 'Year', 'What it does', 'What\'s missing'].map((h) => (
                  <th key={h} className="p-3 text-left font-bold bg-[#f1f5f9] border-b-2 border-[#e2e8f0] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Yao et al. (Peacemaker)', '2025', 'Diagnoses & measures inter-agent sycophancy', 'No mitigation — diagnostic only'],
                ['He et al. (Minority Sentinel)', '2026', 'Post-hoc classifier on debate logs', 'Intervenes after debate ends, not during'],
                ['iMAD (Fan et al.)', '2026', 'Decides when to debate (efficiency)', 'Doesn\'t decide whom to trust once debating'],
                ['MoA (Wang et al.)', '2025', 'Static multi-model aggregation', 'No evidence grounding or dynamic trust'],
              ].map(([work, yr, does, missing], i) => (
                <tr key={i} className="border-b border-[#e2e8f0] last:border-0 hover:bg-[#dce4ff] even:bg-[#f8fafc] transition-colors">
                  <td className="p-3 font-medium whitespace-nowrap">{work}</td>
                  <td className="p-3 whitespace-nowrap">{yr}</td>
                  <td className="p-3">{does}</td>
                  <td className="p-3 text-[#e03131]">{missing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ───────────── 3. Problem Statement ───────────── */}
      <Section accent="teal" className="animate-fade-up animate-delay-2">
        <SectionTitle icon="🎯">3. Problem Statement</SectionTitle>
        <p className="text-sm mb-4">
          <strong>Research hypothesis:</strong> If agent influence in aggregation is dynamically re-weighted during
          debate based on external evidence verification, sycophantic collapse will measurably decrease compared to
          standard majority-vote debate, without requiring model fine-tuning.
        </p>
        <h4 className="text-sm font-bold mb-3">Four Engineering Challenges (Washington Accord Level)</h4>
        <TwoCol>
          <ColBox>
            <h4 className="text-sm font-semibold mt-0 mb-2">Challenge A — Real-time Verification</h4>
            <p className="text-sm text-[#64748b] mb-0">Decompose claims into atomic propositions; retrieve supporting/contradicting evidence within &lt;10 s per turn.</p>
          </ColBox>
          <ColBox>
            <h4 className="text-sm font-semibold mt-0 mb-2">Challenge B — Trust Stability</h4>
            <p className="text-sm text-[#64748b] mb-0">Design update rule avoiding degenerate equilibria (full collapse or single-agent dominance).</p>
          </ColBox>
          <ColBox>
            <h4 className="text-sm font-semibold mt-0 mb-2">Challenge C — Behavioral Effectiveness</h4>
            <p className="text-sm text-[#64748b] mb-0">Ensure trust weights change model outputs, not merely appear in context and get ignored by attention. <strong>Highest risk.</strong></p>
          </ColBox>
          <ColBox>
            <h4 className="text-sm font-semibold mt-0 mb-2">Challenge D — Heterogeneous Agents</h4>
            <p className="text-sm text-[#64748b] mb-0">Trust calibration must be model-agnostic across ~14–32B open-weight models from different families.</p>
          </ColBox>
        </TwoCol>
      </Section>

      {/* ───────────── 4. Complete System Architecture ───────────── */}
      <Section className="animate-fade-up animate-delay-3">
        <SectionTitle icon="🏗️">4. Complete System Architecture</SectionTitle>
        <div className="bg-[#f0f7ff] dark:bg-[rgba(59,91,219,0.08)] border border-[#bfdbfe] dark:border-[rgba(59,91,219,0.3)] rounded-lg p-4 sm:p-5 mb-5 overflow-x-auto">
          <pre className="bg-transparent border-0 p-0 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
{`Input (scientific question)
        ↓
Confidence Estimator (gate: debate needed?)
        ↓
[IF confident] → Direct Answer → Output
        ↓ [IF uncertain]
Three Heterogeneous Agents state initial positions (Round 0)
        ↓
Claim Decomposition (each agent's answer → atomic propositions)
        ↓
Source-Partitioned Retrieval (Agent A→PubMed, B→ArXiv, C→Semantic Scholar)
        ↓
Evidence Scoring (cross-encoder reranker: supports / contradicts / no evidence)
        ↓
Trust Update (Sᵢ(t+1) = Sᵢ(t) + α·Vᵢ − β·Hᵢ → softmax → clamp[0.1,0.9] → renormalize)
        ↓
[Optional: Injection point for testing, between Round 1 and Round 2]
        ↓
Agents Revise Positions (Round 2, aware of each other's arguments + own trust standing)
        ↓
Repeat Retrieval → Trust Update → Revision for K rounds (K=3 default)
        ↓
Trust-Weighted Aggregation (final answer = argmax over trust-weighted positions)
        ↓
Final Output: Answer + Evidence Citations + Trust Trajectory + Per-Agent Reasoning`}</pre>
        </div>

        <TwoCol>
          <ColBox>
            <h4 className="text-sm font-bold mb-2">4.1 Confidence Estimator</h4>
            <p className="text-sm leading-relaxed mb-0">Lightweight single-pass check using self-reported confidence or 3-sample agreement. Avoids full debate cost on easy questions. Failure mode: over-triggering (wastes compute, no correctness risk).</p>
          </ColBox>
          <ColBox>
            <h4 className="text-sm font-bold mb-2">4.2 Agent Pool (N=3)</h4>
            <p className="text-sm leading-relaxed mb-0">Qwen3-32B, Mistral-Small-3.2-24B, Phi-4-Reasoning — three different families for genuine heterogeneity. Each tracks own trust vector T ∈ ℝ³, initialized uniformly at 1/N.</p>
          </ColBox>
          <ColBox>
            <h4 className="text-sm font-bold mb-2">4.3 Source-Partitioned RAG</h4>
            <p className="text-sm leading-relaxed mb-0">Claims → atomic propositions → Agent A→PubMed, B→ArXiv, C→Semantic Scholar. Prevents all agents retrieving from same narrow slice. Cross-encoder reranker scores evidence per claim.</p>
          </ColBox>
          <ColBox>
            <h4 className="text-sm font-bold mb-2">4.4 Trust Update (Core)</h4>
            <p className="text-sm leading-relaxed mb-0">
              <code>Sᵢ(t+1) = Sᵢ(t) + α·Vᵢ − β·Hᵢ</code> then softmax → clamp[0.1, 0.9] → renormalize.
              Vᵢ = supported claims proportion, Hᵢ = contradicted proportion. α=1.5, β=1.0 (validated on held-out).
            </p>
          </ColBox>
          <ColBox>
            <h4 className="text-sm font-bold mb-2">4.5 Revision Rounds (K=3)</h4>
            <p className="text-sm leading-relaxed mb-0">Agents see peer arguments + own trust standing. Simulates genuine deliberation. Trust trajectory logged across rounds for ECR analysis.</p>
          </ColBox>
          <ColBox>
            <h4 className="text-sm font-bold mb-2">4.6 Trust-Weighted Adjudication</h4>
            <p className="text-sm leading-relaxed mb-0">Final answer = argmax over Σ(Tᵢ × positionᵢ) at round K — not majority vote. Correct minority with high trust can outweigh two unsupported majority agents.</p>
          </ColBox>
        </TwoCol>
      </Section>

      {/* ───────────── 5. Detailed Multi-Agent Pipeline ───────────── */}
      <Section accent="blue" className="animate-fade-up animate-delay-4">
        <SectionTitle icon="🔧">5. Detailed Multi-Agent Pipeline</SectionTitle>

        <h4 className="text-sm font-bold mb-3">Agent 0 — Confidence Estimator (Gatekeeper)</h4>
        <div className="overflow-x-auto rounded-lg shadow-sm mb-5">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr>
                {['Property', 'Detail'].map((h) => (
                  <th key={h} className="p-2.5 text-left font-bold bg-[#f1f5f9] border-b-2 border-[#e2e8f0]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Purpose', 'Avoid full debate cost on easy questions (all agents agree correctly)'],
                ['Input → Output', 'Raw question → binary gate (debate / no-debate) + direct answer if no-debate'],
                ['Prompt strategy', 'Simple CoT + explicit confidence self-report, or 3-sample agreement check'],
                ['Failure mode', 'Mis-classifies hard as easy → answered without debate (acceptable — eval datasets are pre-filtered to divergent cases)'],
                ['Recovery', 'None needed — failure is cost inefficiency, not a correctness bug'],
                ['If removed', 'Debate runs on every question. No correctness impact, only ~9 vs ~1 forward passes on easy questions'],
              ].map(([prop, detail], i) => (
                <tr key={i} className="border-b border-[#e2e8f0] last:border-0 hover:bg-[#dce4ff] even:bg-[#f8fafc] transition-colors">
                  <td className="p-2.5 font-medium whitespace-nowrap">{prop}</td>
                  <td className="p-2.5">{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 className="text-sm font-bold mb-3">Agents 1–3 — Debate Agents</h4>
        <TwoCol>
          <ColBox>
            <h4 className="text-sm font-semibold mb-1">Qwen3-32B (4-bit)</h4>
            <p className="text-xs text-[#64748b] mb-0">Strong reasoning, open-weight, fits single A100 quantized. Upgrade path: larger Qwen if compute allows.</p>
          </ColBox>
          <ColBox>
            <h4 className="text-sm font-semibold mb-1">Mistral-Small-3.2-24B</h4>
            <p className="text-xs text-[#64748b] mb-0">Different training lineage → genuine heterogeneity, not just a second Qwen checkpoint. Smaller size is intentional (mirrors real-world heterogeneous deployment).</p>
          </ColBox>
          <ColBox>
            <h4 className="text-sm font-semibold mb-1">Phi-4-Reasoning</h4>
            <p className="text-xs text-[#64748b] mb-0">Reasoning-specialized training — adds a third distinct "cognitive style." Newer model, less battle-tested in MAD literature.</p>
          </ColBox>
          <ColBox>
            <h4 className="text-sm font-semibold mb-1">Recovery Mechanisms</h4>
            <p className="text-xs text-[#64748b] mb-0">Unparseable output → fallback LLM extraction. Timeout → retry once then mark INCONCLUSIVE for that round. Never blocks the whole debate.</p>
          </ColBox>
        </TwoCol>

        <h4 className="text-sm font-bold mt-5 mb-3">Retrieval Sub-System &amp; Orchestrator</h4>
        <TwoCol>
          <ColBox>
            <h4 className="text-sm font-semibold mb-1">Retrieval</h4>
            <p className="text-xs text-[#64748b] mb-0">Source-partitioned: Agent A→PubMed, B→ArXiv, C→Semantic Scholar. Cross-encoder reranks passages. Per-claim verdict: supported / contradicted / unverifiable. If removed → system reduces to MoA (baseline B6).</p>
          </ColBox>
          <ColBox>
            <h4 className="text-sm font-semibold mb-1">Orchestrator</h4>
            <p className="text-xs text-[#64748b] mb-0">LangGraph state machine manages round sequencing, injection point (t=1→2), trust updates, final aggregation. Hard round cap (K=3) and retry cap (3) prevent runaway loops.</p>
          </ColBox>
        </TwoCol>
      </Section>

      {/* ───────────── 6. Complete Data Flow ───────────── */}
      <Section className="animate-fade-up animate-delay-5">
        <SectionTitle icon="↔️">6. Complete Data Flow</SectionTitle>
        <div className="bg-[#f8fafc] dark:bg-[#1a1d35] border border-[#e2e8f0] dark:border-[rgba(255,255,255,0.1)] rounded-lg p-4 sm:p-5 overflow-x-auto">
          <pre className="bg-transparent border-0 p-0 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
{`1. USER/EVAL-HARNESS SUBMITS QUESTION
   → raw question string + ground truth (hidden from agents)

2. CONFIDENCE GATE CHECK
   → intermediate output: debate=True/False
   → [if False: skip to step 8 with direct answer]

3. ROUND 0 — INITIAL POSITIONS
   → 3× {agent_id, answer, reasoning_trace, initial_trust=1/3}

4. CLAIM DECOMPOSITION
   → 3× list of atomic claims, each tagged to source agent

5. SOURCE-PARTITIONED RETRIEVAL
   → per-claim {evidence_verdict, passage, relevance_score}
   → first external signal enters the system

6. TRUST UPDATE (Round 1)
   → updated Sᵢ, Tᵢ per agent (logged for ECR calibration)
   → [OPTIONAL: INJECTION — fabricated wrong "expert consensus"]

7. REVISION ROUNDS (repeat steps 3–6 for K=3)
   → full trust trajectory across rounds (needed for Propositions 2–3)

8. TRUST-WEIGHTED AGGREGATION
   → final answer = argmax over Σ(Tᵢ × positionᵢ) at round K

9. FINAL RESULT PACKAGE
   → answer + citations + trust trajectory + reasoning traces`}</pre>
        </div>
        <p className="text-xs text-[#64748b] mt-2">
          Every intermediate output is logged — trust trajectory (step 7) is required to verify Propositions 2–3
          empirically; per-claim evidence verdicts (step 5) are required for ECR calibration.
        </p>
      </Section>

      {/* ───────────── 7. Models & Tools ───────────── */}
      <Section accent="teal" className="animate-fade-up">
        <SectionTitle icon="🛠️">7. Models &amp; Tools</SectionTitle>
        <p className="text-sm mb-4">
          Full model stack per blueprint §7. All open-weight, inference-only, single A100.
        </p>
        <InfoGrid cards={resources} />

        <h4 className="text-sm font-bold mt-5 mb-3">Implementation Difficulty Ranking (easiest → hardest)</h4>
        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr>
                {['#', 'Component', 'Difficulty', 'Why'].map((h) => (
                  <th key={h} className="p-2.5 text-left font-bold bg-[#f1f5f9] border-b-2 border-[#e2e8f0]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [1, 'vLLM multi-model serving', 'Low', 'Well-documented, standard setup'],
                [2, 'Retrieval + reranking', 'Moderate', 'Mostly API/plumbing work'],
                [3, 'Claim decomposition + tagging', 'Moderate', 'Needs careful prompt engineering + fallback extraction'],
                [4, 'Trust update + LangGraph state machine', 'Moderate–High', 'Operator order must match proven Proposition 1 (softmax→clamp→renormalize)'],
                [5, 'iMAD reimplementation (B9)', 'Highest', '~10 working days; requires reconstructing method from paper description'],
              ].map(([rank, component, difficulty, why], i) => (
                <tr key={i} className="border-b border-[#e2e8f0] last:border-0 hover:bg-[#dce4ff] even:bg-[#f8fafc] transition-colors">
                  <td className="p-2.5 font-bold">{rank}</td>
                  <td className="p-2.5">{component}</td>
                  <td className="p-2.5"><Badge variant={i === 4 ? 'rose' : i >= 2 ? 'amber' : 'blue'}>{difficulty}</Badge></td>
                  <td className="p-2.5">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ───────────── 8. Dataset Plan ───────────── */}
      <Section className="animate-fade-up animate-delay-1">
        <SectionTitle icon="📊">8. Dataset Plan</SectionTitle>
        <p className="text-sm mb-4">Five datasets across adversarial and stable categories. BrokenMath/BrokenArXiv are primary for sycophancy measurement.</p>
        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr>
                {['Dataset', 'Role', 'Source', 'Size', 'Limitation'].map((h) => (
                  <th key={h} className="p-2.5 text-left font-bold bg-[#f1f5f9] border-b-2 border-[#e2e8f0] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datasets.map((ds, i) => (
                <tr key={i} className="border-b border-[#e2e8f0] last:border-0 hover:bg-[#dce4ff] even:bg-[#f8fafc] transition-colors">
                  <td className="p-2.5 font-medium">{ds.name}</td>
                  <td className="p-2.5"><Badge variant={i < 3 ? 'rose' : 'blue'}>{ds.role.split(' ')[0]}</Badge> {ds.role}</td>
                  <td className="p-2.5">{ds.source}</td>
                  <td className="p-2.5 whitespace-nowrap">{ds.size}</td>
                  <td className="p-2.5 text-xs text-[#64748b]">{ds.limitation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#64748b] mt-3">
          <strong>Fallback:</strong> If HLE access is delayed → GPQA-Diamond with injection protocol. If BrokenArXiv snapshot discontinues → freeze last snapshot. If Semantic Scholar API degrades → OpenAlex API.
        </p>
      </Section>

      {/* ───────────── 9. Evaluation Strategy ───────────── */}
      <Section accent="blue" className="animate-fade-up animate-delay-2">
        <SectionTitle icon="📐">9. Evaluation Strategy</SectionTitle>
        <h4 className="text-sm font-bold mb-3">Metrics &amp; Primary Hypotheses</h4>
        <div className="overflow-x-auto rounded-lg shadow-sm mb-5">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr>
                {['Metric', 'Definition', 'Primary Hypothesis'].map((h) => (
                  <th key={h} className="p-2.5 text-left font-bold bg-[#f1f5f9] border-b-2 border-[#e2e8f0]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['CCR (Collapse Rate)', '% of correct agents who abandon under injected pressure', 'H1: Trust-calibration increases CCR by ≥20% vs MAD on BrokenMath/BrokenArXiv'],
                ['MPR (Minority Preservation)', '% debates where correct minority survives to final output', 'H2: MPR improves by ≥15pp vs plain MAD across 3 adversarial datasets'],
                ['ECR (Evidence Calibration)', 'Correlation between trust weight and empirical correctness', 'H3: ECR > 0.80 on GPQA, indicating trust tracks correctness'],
                ['Task Accuracy', 'Standard answer accuracy per benchmark', 'H4: No regression on stable splits; ≥ MAD + 10% on adversarial'],
              ].map(([metric, defn, hyp], i) => (
                <tr key={i} className="border-b border-[#e2e8f0] last:border-0 hover:bg-[#dce4ff] even:bg-[#f8fafc] transition-colors">
                  <td className="p-2.5 font-medium">{metric}</td>
                  <td className="p-2.5">{defn}</td>
                  <td className="p-2.5 text-[#3b5bdb]">{hyp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 className="text-sm font-bold mb-3">Baselines (B1–B9)</h4>
        <div className="overflow-x-auto rounded-lg shadow-sm mb-4">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr>
                {['ID', 'Baseline', 'What it measures'].map((h) => (
                  <th key={h} className="p-2.5 text-left font-bold bg-[#f1f5f9] border-b-2 border-[#e2e8f0]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['B1', 'Single-Agent CoT', 'Floor: no debate at all'],
                ['B2', 'Single-Agent + RAG', 'Single-agent with evidence'],
                ['B3', 'MAD (majority vote)', 'Standard multi-agent debate'],
                ['B4', 'MAD + RAG', 'Debate with evidence'],
                ['B5', 'Self-Consistency', 'k samples, majority vote'],
                ['B6', 'MoA (equal-weight)', 'Multi-model, static aggregation'],
                ['B7', 'Oracle (Gemini 2.5 Pro)', 'Upper-bound ceiling'],
                ['B8', 'Ours (trust-weighted)', 'Primary system'],
                ['B9', 'iMAD', 'Closest published competitor'],
              ].map(([id, bl, what], i) => (
                <tr key={i} className="border-b border-[#e2e8f0] last:border-0 hover:bg-[#dce4ff] even:bg-[#f8fafc] transition-colors">
                  <td className="p-2.5 font-bold whitespace-nowrap">{id}</td>
                  <td className="p-2.5">{bl}</td>
                  <td className="p-2.5">{what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 className="text-sm font-bold mb-3">Ablation Studies</h4>
        <p className="text-sm mb-3">Four ablations isolate each component's contribution:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {[
            ['No trust calibration', 'Falls back to equal-weight aggregation → isolates trust mechanism effect'],
            ['No progressive retrieval', 'Single-shot retrieval only → isolates progressive refinement effect'],
            ['No source partitioning', 'All agents retrieve from same corpus → isolates partitioning effect'],
            ['No adaptive triggering', 'Debate runs on every question → isolates confidence gate effect'],
          ].map(([name, effect], i) => (
            <div key={i} className="bg-[#f0f2f7] dark:bg-[#1a1d35] border border-[#e2e8f0] dark:border-[rgba(255,255,255,0.1)] rounded-md p-3">
              <div className="font-semibold text-xs mb-1">{name}</div>
              <div className="text-xs text-[#64748b]">{effect}</div>
            </div>
          ))}
        </div>

        <Callout variant="info" title="📊 Statistical Validation">
          3 random seeds + 95% confidence intervals + paired bootstrap + Cohen's d across all comparisons. Preempts the common reviewer criticism of single-run comparisons in MAD literature.
        </Callout>
      </Section>

      {/* ───────────── 10. Edge Cases & Failure Handling ───────────── */}
      <Section className="animate-fade-up animate-delay-3">
        <SectionTitle icon="🛡️">10. Edge Cases &amp; Failure Handling</SectionTitle>
        <p className="text-sm mb-4">
          Per blueprint §10. Each failure mode has documented detection, prevention, mitigation, and recovery.
        </p>
        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr>
                {['Failure Scenario', 'Detection', 'Mitigation', 'Recovery'].map((h) => (
                  <th key={h} className="p-2.5 text-left font-bold bg-[#f1f5f9] border-b-2 border-[#e2e8f0] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {failures.map((f, i) => (
                <tr key={i} className="border-b border-[#e2e8f0] last:border-0 hover:bg-[#dce4ff] even:bg-[#f8fafc] transition-colors">
                  <td className="p-2.5 font-medium">{f.scenario}</td>
                  <td className="p-2.5">{f.detection}</td>
                  <td className="p-2.5">{f.mitigation}</td>
                  <td className="p-2.5">{f.recovery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ───────────── 11. Risk Assessment ───────────── */}
      <Section accent="amber" className="animate-fade-up animate-delay-4">
        <SectionTitle icon="⚠️">11. Risk Assessment</SectionTitle>
        <p className="text-sm mb-4">
          Per blueprint §11. The highest-likelihood risk (timeline overload in Phase 2) has a pre-planned mitigation:
          use iMAD's published numbers for easy-question conditions.
        </p>
        <RiskTable rows={risks} />
        <p className="text-xs text-[#64748b] mt-3">
          <strong>Critical risk:</strong> Trust signal doesn't behaviorally change output (Challenge C) — mitigated
          by Month 1 pilot (~20–30 toy questions) before full build-out. If pilot fails, the project reframes to
          report the negative result honestly as a finding about when evidence-grounded trust does/doesn't influence
          LLM aggregation behavior.
        </p>
      </Section>

      {/* ───────────── 12. Month-by-Month Roadmap ───────────── */}
      <Section className="animate-fade-up animate-delay-5">
        <SectionTitle icon="📅">12. Month-by-Month Roadmap (Jul 2026 – Apr 2027)</SectionTitle>
        <p className="text-sm mb-4">
          Per blueprint §12. Five phases over 10 months. Gates 0–3 mark explicit go/no-go decisions.
        </p>
        <GanttTable phases={ganttPhases} />
        <Timeline items={milestones} />
      </Section>

      {/* ───────────── 13. Implementation Order ───────────── */}
      <Section accent="teal" className="animate-fade-up">
        <SectionTitle icon="📋">13. Implementation Order</SectionTitle>
        <p className="text-sm mb-4">
          Per blueprint §13 — exact build sequence with dependency reasoning. Never build step N before step N-1.
        </p>
        <div className="space-y-3">
          {[
            { step: 1, title: 'vLLM multi-model serving', desc: 'Nothing else testable without this. Verify all 3 checkpoints load + generate in 4-bit quant before writing orchestration.' },
            { step: 2, title: 'Vanilla MAD reproduction (Du et al. 2023)', desc: 'Gate 0. Validates base debate loop independent of our additions. Isolates later bugs to our code.' },
            { step: 3, title: 'Injection protocol (§5.4 Steps 1–6)', desc: 'Must exist before trust mechanism — trust calibration only evaluable against a working stress test.' },
            { step: 4, title: 'Month-1 behavioral-effectiveness pilot', desc: 'Highest-risk assumption (Section 0). Tests on ~20–30 toy questions before full mechanism build.' },
            { step: 5, title: 'Claim decomposition + source-partitioned retrieval', desc: 'Trust formula inputs (Vᵢ, Hᵢ) are outputs of retrieval. Build retrieval before trust math.' },
            { step: 6, title: 'Trust update function (softmax → clamp → renormalize)', desc: 'Unit-test operator order in isolation. Verify Tᵢ never leaves [0.1, 0.9] computationally.' },
            { step: 7, title: 'Full debate loop (LangGraph state machine)', desc: 'Only after steps 1–6 each independently validated. Integration bugs easier to isolate.' },
            { step: 8, title: 'Baselines B1–B4', desc: 'Reuses components from steps 1, 5. Establishes comparison floor.' },
            { step: 9, title: 'Baselines B5–B6 (Self-Consistency, MoA)', desc: 'Independent of core mechanism. Can be built in parallel with step 10.' },
            { step: 10, title: 'Baseline B9 (iMAD reimplementation)', desc: 'Highest difficulty (~10 days). Sequenced last — benefits from confidence-scoring-adjacent code from step 1.' },
            { step: 11, title: 'Full experiment matrix', desc: 'Only after every component passes its validation gate.' },
            { step: 12, title: 'Human evaluation + failure analysis', desc: 'Last — requires completed experimental results to annotate against.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-3 items-start bg-[#f0f2f7] dark:bg-[#1a1d35] border border-[#e2e8f0] dark:border-[rgba(255,255,255,0.1)] rounded-md p-3 sm:p-4 hover:border-[#3b5bdb] dark:hover:border-[#3b5bdb] transition-colors">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#3b5bdb] text-white font-bold text-xs flex-shrink-0 shadow-[0_2px_8px_rgba(59,91,219,.35)]">
                {step}
              </span>
              <div className="min-w-0">
                <div className="font-semibold text-sm">{title}</div>
                <div className="text-xs text-[#64748b] mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <Callout variant="warning" title="🚫 What Should Never Be Built Out of Order" className="mt-4">
          <ul className="text-sm space-y-1">
            <li>Never build trust update <strong>before</strong> retrieval exists (step 6 before step 5) — it would have nothing real to operate on.</li>
            <li>Never build B9 (iMAD) <strong>before</strong> the core system (steps 1–7) — B9 reuses debate-loop infrastructure.</li>
            <li>Never run full experiment matrix (step 11) <strong>before</strong> Month-1 pilot (step 4) confirms the core assumption.</li>
          </ul>
        </Callout>
      </Section>

      {/* ───────────── Q1 Justification ───────────── */}
      <Section className="animate-fade-up animate-delay-1">
        <SectionTitle icon="🎯">Q1 Publication Justification</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#d3f9d8] dark:bg-[rgba(12,166,120,0.15)] border border-[#0ca678] dark:border-[rgba(12,166,120,0.3)] rounded-md p-4">
            <div className="font-bold text-xs uppercase tracking-wider text-[#0ca678] mb-1">Novel Mechanism</div>
            <p className="text-sm">No prior work provides an in-session, evidence-grounded trust calibration mechanism for multi-agent debate. CCR/MPR/ECR metrics are new.</p>
          </div>
          <div className="bg-[#dbe4ff] dark:bg-[rgba(28,126,214,0.15)] border border-[#1c7ed6] dark:border-[rgba(28,126,214,0.3)] rounded-md p-4">
            <div className="font-bold text-xs uppercase tracking-wider text-[#1c7ed6] mb-1">Rigorous Evaluation</div>
            <p className="text-sm">9-baseline suite, 5 benchmarks, 3 seeds, statistical testing with 95% CIs and effect sizes (Cohen's d).</p>
          </div>
          <div className="bg-[#d3f9d8] dark:bg-[rgba(12,166,120,0.15)] border border-[#0ca678] dark:border-[rgba(12,166,120,0.3)] rounded-md p-4">
            <div className="font-bold text-xs uppercase tracking-wider text-[#0ca678] mb-1">Open Reproducibility</div>
            <p className="text-sm">Full protocol released as a benchmark for future sycophancy mitigation research. Evaluation harness independently reusable.</p>
          </div>
          <div className="bg-[#dbe4ff] dark:bg-[rgba(28,126,214,0.15)] border border-[#1c7ed6] dark:border-[rgba(28,126,214,0.3)] rounded-md p-4">
            <div className="font-bold text-xs uppercase tracking-wider text-[#1c7ed6] mb-1">Timely Topic</div>
            <p className="text-sm">Inter-agent sycophancy is actively studied in 2025–2026. This fills the missing mitigation piece at exactly the right time.</p>
          </div>
        </div>
      </Section>

    </>
  );
}
