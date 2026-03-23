import { KnowledgeArticleRecord, KnowledgeCategoryRecord } from '../types/domain';

export const knowledgeCategoryRecords: KnowledgeCategoryRecord[] = [
  {
    id: 'enc-infra',
    slug: 'infrastructure',
    title: 'Infrastructure',
    tag: '/KNOWLEDGE_BASE/ENC_V1.0',
    summary: 'The runtime layer behind confidential execution: nodes, routing, orchestration, and the operational surfaces the network depends on.',
    description: 'Deep dives into MPC Nodes, Enclaves, the Mempool, and the core routing architecture of Arcium.',
    prefix: 'IN',
    group: 'knowledge',
    relatedNodeIds: ['arcium', 'cat-payments', 'proj-squads'],
    bodySections: [
      {
        title: 'What Lives Here',
        body: 'Infrastructure content explains how Arcium moves from abstract privacy guarantees to an actual operating network. It covers the execution surfaces, the movement of encrypted work across the system, and the components that let applications rely on confidential compute as a service.',
      },
      {
        title: 'Why It Matters',
        body: 'This category is where builders connect product claims to system reality. If Arcium is going to support wallets, AI runtimes, or private market infrastructure, the underlying node and routing model has to be legible enough for developers to trust and integrate.',
      },
    ],
  },
  {
    id: 'enc-crypto',
    slug: 'cryptography',
    title: 'Cryptography',
    tag: '/KNOWLEDGE_BASE/CRY_V1.2',
    summary: 'The protocol vocabulary for understanding how confidential execution protects data while still producing usable outputs.',
    description: 'The mathematical foundation. Explore Multi-Party Computation protocols and Zero-Knowledge proofs.',
    prefix: 'CR',
    group: 'knowledge',
    relatedNodeIds: ['arcium', 'cat-ai', 'cat-prediction'],
    bodySections: [
      {
        title: 'What Lives Here',
        body: 'Cryptography content translates the protocol layer into product consequences. It frames how Multi-Party Computation, verification, and encrypted coordination let Arcium expose useful application behavior without exposing the inputs that produced it.',
      },
      {
        title: 'Why It Matters',
        body: 'Without this layer, the rest of the atlas turns into branding. These articles make the privacy model concrete enough for readers to understand where confidentiality comes from and what kinds of tradeoffs builders are actually making.',
      },
    ],
  },
  {
    id: 'enc-eco',
    slug: 'ecosystem',
    title: 'Ecosystem',
    tag: '/KNOWLEDGE_BASE/ECO_V2.0',
    summary: 'A guided view of the projects, product patterns, and market categories that make Arcium tangible.',
    description: 'Guides, tutorials, and deep-dives on deploying and integrating with the Arcium network.',
    prefix: 'EC',
    group: 'knowledge',
    relatedNodeIds: ['cat-defi', 'cat-ai', 'cat-consumer', 'cat-prediction'],
    bodySections: [
      {
        title: 'What Lives Here',
        body: 'Ecosystem content is the bridge between theory and product. It shows where confidential compute appears in real user journeys: swaps, inference, wallet security, prediction systems, and consumer-facing applications.',
      },
      {
        title: 'Why It Matters',
        body: 'An ecosystem map only becomes useful when the territories are connected to explanations. This category helps readers move from node exploration to clearer mental models of what each product area is trying to accomplish on top of Arcium.',
      },
    ],
  },
  {
    id: 'enc-comp',
    slug: 'comparisons',
    title: 'Comparisons',
    tag: '/KNOWLEDGE_BASE/CMP_V1.1',
    summary: 'Context for where Arcium fits relative to adjacent privacy approaches, execution models, and trust assumptions.',
    description: 'How Arcium stacks up against other privacy-preserving layers, FHE, and traditional TEEs.',
    prefix: 'CM',
    group: 'knowledge',
    relatedNodeIds: ['arcium', 'cat-defi', 'cat-ai'],
    bodySections: [
      {
        title: 'What Lives Here',
        body: 'Comparison content helps readers reason about Arcium by contrast. It focuses less on feature checklists and more on the structural differences between confidential execution, hardware trust models, and other privacy-preserving architectures.',
      },
      {
        title: 'Why It Matters',
        body: 'Most new readers do not start from zero. They arrive with prior models for wallets, rollups, AI compute, or secure enclaves. Comparison pages anchor the atlas inside that existing context so the rest of the material is easier to evaluate.',
      },
    ],
  },
  {
    id: 'cat-defi',
    slug: 'defi-trading',
    title: 'DeFi & Trading',
    tag: 'FINANCE_LAYER',
    summary: 'A territory focused on confidential order flow, private execution intent, and market infrastructure that does not leak strategy by default.',
    description: 'Financial apps that protect your trading strategies and transaction history.',
    prefix: 'DF',
    group: 'ecosystem',
    relatedNodeIds: ['proj-jupiter', 'proj-undesk', 'proj-ellisium'],
    bodySections: [
      {
        title: 'Market Structure',
        body: 'This territory groups products that benefit when trade intent stays hidden until execution. Routing, OTC activity, and dark-pool style behavior all become more credible when the system does not force users to reveal strategy to the public mempool or to counterparties too early.',
      },
      {
        title: 'Atlas Reading',
        body: 'Use this page as the narrative layer for the DeFi region of the map. The related projects show how Arcium can serve both familiar consumer entry points and more specialized execution workflows where confidentiality is part of the product value, not just an implementation detail.',
      },
    ],
  },
  {
    id: 'cat-ai',
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    tag: 'COMPUTE_LAYER',
    summary: 'Private inference, protected prompts, and encrypted datasets are the main thread through this AI-focused territory.',
    description: 'AI bots and models that can process sensitive information without exposing the raw data.',
    prefix: 'AI',
    group: 'ecosystem',
    relatedNodeIds: ['proj-nosana', 'proj-ionet', 'proj-loyal'],
    bodySections: [
      {
        title: 'Private Inference',
        body: 'AI products become much more usable when a user does not have to choose between utility and confidentiality. This territory maps the systems that treat Arcium as a secure execution layer for prompts, intermediate computation, model calls, or agent workflows.',
      },
      {
        title: 'Atlas Reading',
        body: 'The nodes here are useful because they span infrastructure and user-facing experiences. Some represent compute supply, while others represent applications that turn secure execution into something a non-technical user can immediately understand.',
      },
    ],
  },
  {
    id: 'cat-payments',
    slug: 'payments-wallets',
    title: 'Payments & Wallets',
    tag: 'INFRASTRUCTURE',
    summary: 'Wallet coordination, signing, approvals, and payment flows are strongest when the operational logic remains confidential.',
    description: 'Tools to send crypto privately and manage wallet security safely.',
    prefix: 'PW',
    group: 'ecosystem',
    relatedNodeIds: ['proj-squads', 'arcium'],
    bodySections: [
      {
        title: 'Operational Security',
        body: 'Wallet infrastructure is an obvious proving ground for confidential execution because key workflows, approvals, and recovery logic all carry real operational risk. Arcium gives builders a way to keep those flows expressive without making them fully transparent.',
      },
      {
        title: 'Atlas Reading',
        body: 'This territory is smaller in the current atlas, but it is strategically important. It shows how privacy can improve everyday product safety, not just specialized markets or advanced cryptographic demos.',
      },
    ],
  },
  {
    id: 'cat-consumer',
    slug: 'consumer-apps',
    title: 'Consumer Apps',
    tag: 'UX_LAYER',
    summary: 'Consumer products are where privacy stops being an abstract property and becomes part of ordinary user experience.',
    description: 'Everyday applications offering private identities and secure interactions.',
    prefix: 'CA',
    group: 'ecosystem',
    relatedNodeIds: ['proj-anonmesh', 'proj-dreader'],
    bodySections: [
      {
        title: 'Invisible Privacy',
        body: 'Consumer applications benefit from confidentiality when the protection feels natural instead of ceremonial. Messaging, reading history, local-first communication, or identity-sensitive flows all improve when privacy is built into the system rather than bolted on at the edges.',
      },
      {
        title: 'Atlas Reading',
        body: 'This territory broadens the story the atlas can tell. It shows that Arcium is not only for protocol engineers or market operators; it can also sit underneath products that ordinary users interact with every day.',
      },
    ],
  },
  {
    id: 'cat-prediction',
    slug: 'prediction-markets',
    title: 'Prediction Markets',
    tag: 'INFORMATION_LAYER',
    summary: 'Encrypted information markets matter because they let participants commit capital without broadcasting conviction or timing.',
    description: 'Platforms to bet on future events without revealing your positions to the public.',
    prefix: 'PM',
    group: 'ecosystem',
    relatedNodeIds: ['proj-pythia', 'proj-epoch'],
    bodySections: [
      {
        title: 'Information as Product',
        body: 'Prediction systems become more interesting when the market can hold information without instantly leaking it. This territory covers products that use confidential execution to protect trader behavior while keeping settlement and coordination legible enough to operate as a market.',
      },
      {
        title: 'Atlas Reading',
        body: 'These nodes are a useful complement to DeFi because they show a different reason to care about confidentiality. The value is not just hidden execution quality; it is the ability to preserve private belief and positioning inside a live market.',
      },
    ],
  },
];

export const knowledgeArticleRecords: KnowledgeArticleRecord[] = [
  {
    id: 'guide-understanding-arcium',
    slug: 'understanding-arcium',
    title: 'Understanding Arcium',
    tag: 'START_HERE',
    summary: 'A concise overview of Arcium as a confidential execution layer and why it matters across the rest of the atlas.',
    kind: 'guide',
    relatedCategoryId: 'enc-eco',
    relatedNodeIds: ['arcium', 'cat-defi', 'cat-ai'],
    bodySections: [
      {
        title: 'Core Idea',
        body: 'Arcium is presented throughout this project as the privacy layer of Web3: an execution environment where applications can process sensitive inputs without exposing them to a single operator or to the wider network. The atlas uses that premise as the lens for every map region and product node.',
      },
      {
        title: 'How to Use This Atlas',
        body: 'Start with the ecosystem map if you want breadth, then use the encyclopedia routes to deepen the model. The map shows where confidential compute appears. The articles and category pages explain why those connections matter and what kinds of products become possible when data can remain private during execution.',
      },
    ],
  },
  {
    id: 'guide-what-are-mxes',
    slug: 'what-are-mxes',
    title: 'What are MXEs?',
    tag: 'START_HERE',
    summary: 'An introductory framing for the execution environments that power Arcium across the network.',
    kind: 'guide',
    relatedCategoryId: 'enc-infra',
    relatedNodeIds: ['arcium', 'cat-payments'],
    bodySections: [
      {
        title: 'Execution Layer',
        body: 'MXEs are the execution surfaces referenced across the atlas when confidential logic needs to run somewhere concrete. They are the operational layer that turns Arcium from a privacy promise into a network that applications can actually target.',
      },
      {
        title: 'Why They Matter',
        body: 'For builders, MXEs are important because they shape the performance, trust, and integration story of the whole platform. When the atlas talks about private routing, secure inference, or confidential coordination, MXEs are the layer that makes those claims actionable.',
      },
    ],
  },
  {
    id: 'guide-ecosystem-overview',
    slug: 'ecosystem-overview',
    title: 'Ecosystem Overview',
    tag: 'START_HERE',
    summary: 'A quick orientation to the major territories on the Arcium map and how to read them.',
    kind: 'guide',
    relatedCategoryId: 'enc-eco',
    relatedNodeIds: ['cat-defi', 'cat-ai', 'cat-payments', 'cat-consumer', 'cat-prediction'],
    bodySections: [
      {
        title: 'Reading the Territories',
        body: 'The atlas is organized around product territories rather than protocol modules. Each region answers a simple question: where does confidential execution create a clear advantage for builders or users? That framing keeps the map legible even when the underlying systems are technically diverse.',
      },
      {
        title: 'What to Explore Next',
        body: 'If you want the fastest route through the material, start with DeFi, AI, and Payments. Those territories make the value of confidentiality easiest to see. From there, the prediction and consumer regions broaden the story by showing how Arcium can protect strategy, behavior, and user context outside the usual infrastructure narrative.',
      },
    ],
  },
  {
    id: 'art-1',
    slug: 'protocol-specifications-released',
    title: 'v1.4 Protocol Specifications Released',
    tag: 'SYS_UPDATE',
    summary: 'A short update on how a specification release helps the atlas move from concept to referenceable system behavior.',
    kind: 'update',
    date: '2024.10.22',
    relatedCategoryId: 'enc-infra',
    relatedNodeIds: ['arcium', 'cat-payments'],
    bodySections: [
      {
        title: 'Why a Spec Update Matters',
        body: 'Specification releases matter because they shrink the gap between ecosystem storytelling and implementation detail. In atlas terms, they give readers a firmer basis for interpreting the infrastructure claims attached to nodes, routing behavior, and execution surfaces.',
      },
      {
        title: 'How to Read This Update',
        body: 'Treat this article as a bridge into the infrastructure section. It is less about exhaustive changelog coverage and more about understanding that the network model is maturing into something that can be documented, referenced, and discussed with more precision.',
      },
    ],
  },
  {
    id: 'art-2',
    slug: 'zero-knowledge-proofs-in-arcium',
    title: 'Understanding Zero-Knowledge Proofs in Arcium',
    tag: 'DEEP_DIVE',
    summary: 'A concise cryptography-oriented explanation of how proof systems fit into the broader confidentiality story.',
    kind: 'update',
    date: '2024.10.20',
    relatedCategoryId: 'enc-crypto',
    relatedNodeIds: ['arcium', 'cat-prediction', 'cat-ai'],
    bodySections: [
      {
        title: 'Proofs in Context',
        body: 'Zero-knowledge language appears in the Arcium conversation because readers need a way to separate private execution from blind trust. Proof-oriented explanations help show how a system can hide the data that matters while still exposing enough evidence for users or builders to trust the output.',
      },
      {
        title: 'Why This Belongs in the Atlas',
        body: 'The atlas is not a cryptography paper, but it still needs a working explanation layer for the security model. This article gives that layer just enough structure to support the rest of the ecosystem pages without overwhelming new readers.',
      },
    ],
  },
  {
    id: 'art-3',
    slug: 'deploying-a-network-client-via-websockets',
    title: 'Deploying a Network Client via WebSockets',
    tag: 'TUTORIAL',
    summary: 'An onboarding-oriented walkthrough framing how a client integration fits into the infrastructure side of the atlas.',
    kind: 'update',
    date: '2024.10.15',
    relatedCategoryId: 'enc-infra',
    relatedNodeIds: ['arcium', 'cat-ai', 'cat-payments'],
    bodySections: [
      {
        title: 'Client Perspective',
        body: 'A deployment guide matters because it turns the atlas from a catalog into a workflow. Readers move from understanding what Arcium powers to understanding how a client might actually connect, subscribe, or exchange information with the network.',
      },
      {
        title: 'Why This Matters',
        body: 'Even a concise tutorial changes the product shape of the site. It signals that the knowledge base is not only for browsing concepts; it can also become the starting point for builders who want to turn the map into implementation work.',
      },
    ],
  },
];

export const startHereGuideIds = [
  'guide-understanding-arcium',
  'guide-what-are-mxes',
  'guide-ecosystem-overview',
] as const;

export const recentKnowledgeArticleIds = ['art-1', 'art-2', 'art-3'] as const;

const categoryById = new Map(knowledgeCategoryRecords.map((category) => [category.id, category]));
const articleById = new Map(knowledgeArticleRecords.map((article) => [article.id, article]));

export function getKnowledgeCategoryPath(slug: string): string {
  return `/encyclopedia/categories/${slug}`;
}

export function getKnowledgeArticlePath(slug: string): string {
  return `/encyclopedia/articles/${slug}`;
}

export function getKnowledgeCategoryPathById(id: string): string | null {
  const category = categoryById.get(id);
  return category ? getKnowledgeCategoryPath(category.slug) : null;
}

export function getKnowledgeArticlePathById(id: string): string | null {
  const article = articleById.get(id);
  return article ? getKnowledgeArticlePath(article.slug) : null;
}
