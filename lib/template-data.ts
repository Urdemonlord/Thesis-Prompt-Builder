export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

const templates: PromptTemplate[] = [
  // Computer Science
  {
    id: "cs-thesis-proposal",
    title: "Thesis Proposal Structure",
    description: "Basic structure for a computer science thesis proposal",
    category: "computer-science",
    content: `# Computer Science Thesis Proposal

## Problem Statement
[Describe the problem you aim to solve and its significance in the field]

## Literature Review
[Summarize relevant research and identify gaps your thesis will address]

## Research Questions
1. [Primary research question]
2. [Secondary research question]
3. [Tertiary research question if applicable]

## Methodology
[Explain your approach, tools, frameworks, and data sources]

## Expected Outcomes
[Describe the anticipated results and contributions to the field]

## Timeline
[Outline your research schedule with major milestones]

## References
[List key references in IEEE or ACM format]`
  },
  {
    id: "cs-algorithm-analysis",
    title: "Algorithm Analysis Framework",
    description: "Framework for analyzing algorithm complexity and performance",
    category: "computer-science",
    content: `# Algorithm Analysis Framework

## Algorithm Description
[Provide a clear description of the algorithm and its purpose]

## Pseudocode
\`\`\`
[Insert pseudocode here]
\`\`\`

## Time Complexity Analysis
- Best case: [O(?)]
- Average case: [O(?)]
- Worst case: [O(?)]

## Space Complexity Analysis
[Analyze space requirements]

## Implementation Considerations
[Discuss practical implementation issues and solutions]

## Benchmarking Methodology
[Describe how you will test and compare performance]

## Expected Results
[What outcomes do you anticipate from your analysis?]`
  },
  
  // Law
  {
    id: "law-case-analysis",
    title: "Legal Case Analysis",
    description: "Template for analyzing legal cases with precedent",
    category: "law",
    content: `# Legal Case Analysis Framework

## Case Overview
[Summarize the key facts and procedural history]

## Legal Issues
[Identify the main legal questions presented]

## Applicable Law
[Outline relevant statutes, precedents, and legal principles]

## Arguments
### Plaintiff's Arguments
[Summarize the plaintiff's key arguments]

### Defendant's Arguments
[Summarize the defendant's key arguments]

## Court's Reasoning
[Analyze the court's reasoning and decision-making process]

## Holding and Implications
[State the court's holding and discuss its broader implications]

## Critical Analysis
[Provide your own critical assessment of the decision]`
  },
  
  // Economics
  {
    id: "economics-research-framework",
    title: "Economic Research Design",
    description: "Framework for economic research methodology",
    category: "economics",
    content: `# Economic Research Framework

## Research Question
[State your primary economic inquiry]

## Theoretical Framework
[Explain the economic theories that inform your research]

## Hypotheses
1. [Primary hypothesis]
2. [Secondary hypothesis]
3. [Null hypothesis]

## Data Sources
[Describe your data sources, collection methods, and limitations]

## Methodology
[Explain your econometric approach or other analytical methods]

## Model Specification
[Detail your economic model and variables]

## Expected Results
[Describe anticipated findings and their significance]

## Policy Implications
[Discuss potential policy relevance of your research]

## References
[List key references in APA format]`
  },
  
  // Psychology
  {
    id: "psychology-experiment-design",
    title: "Psychology Experiment Design",
    description: "Template for designing psychology experiments",
    category: "psychology",
    content: `# Psychology Experiment Design

## Research Question
[State your primary psychological inquiry]

## Theoretical Background
[Summarize relevant psychological theories and previous findings]

## Hypotheses
[State your experimental hypotheses clearly]

## Methodology
### Participants
[Describe sample size, demographics, and recruitment strategy]

### Materials
[Detail all experimental materials and measures]

### Procedure
[Outline the step-by-step experimental procedure]

## Ethical Considerations
[Address informed consent, deception, debriefing, and other ethical issues]

## Statistical Analysis Plan
[Describe planned statistical analyses and power calculations]

## Expected Results
[Discuss anticipated findings and their theoretical implications]

## Limitations
[Acknowledge potential limitations of your design]`
  },
  
  // Literature
  {
    id: "literature-analysis-framework",
    title: "Literary Analysis Framework",
    description: "Framework for analyzing literary works",
    category: "literature",
    content: `# Literary Analysis Framework

## Text Selection
[Introduce the literary work(s) you are analyzing]

## Thesis Statement
[Present your central argument about the text]

## Critical Approach
[Explain your theoretical framework (e.g., feminist, postcolonial, psychoanalytic)]

## Textual Analysis
[Provide close reading of key passages that support your thesis]

## Context
[Situate the text within its historical, cultural, or literary context]

## Comparative Elements
[If applicable, compare with other works or authors]

## Significance
[Explain the importance of your analysis to literary scholarship]

## Conclusion
[Summarize your findings and suggest further avenues for research]`
  },
  
  // Geography
  {
    id: "geography-fieldwork-report",
    title: "Geographic Fieldwork Report",
    description: "Structure for reporting on geographic fieldwork",
    category: "geography",
    content: `# Geographic Fieldwork Report

## Study Area
[Describe the location and its geographical significance]

## Research Objectives
[State the aims and objectives of your fieldwork]

## Methodology
[Detail your field techniques, sampling methods, and data collection]

## Data Presentation
[Describe how you will organize and present your spatial data]

## GIS Analysis
[Explain the GIS or mapping techniques you will employ]

## Environmental Factors
[Discuss relevant environmental variables and their impact]

## Human Geography Elements
[Address human interactions with the landscape if applicable]

## Results and Discussion
[Outline expected findings and their geographical significance]

## References
[List key references in appropriate format]`
  }
];

export function getTemplatesByCategory(category: string): PromptTemplate[] {
  return templates.filter(template => template.category === category);
}

export function getAllTemplates(): PromptTemplate[] {
  return templates;
}

export function getTemplateById(id: string): PromptTemplate | undefined {
  return templates.find(template => template.id === id);
}