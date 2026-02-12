export type EvidenceLevel = 'A' | 'B' | 'C' | 'D';

export interface Evidence {
  id: string;
  url: string;
  title: string;
  level: EvidenceLevel;
  votes: number;
  addedBy: string;
  addedAt: Date;
}

export interface Comment {
  id: string;
  type: 'verification' | 'discussion';
  author: string;
  content: string;
  createdAt: Date;
  votes: number;
  evidences?: Evidence[];
}

export interface Argument {
  id: string;
  title: string;
  position: 'support' | 'against' | 'neutral';
  description: string;
  evidences: Evidence[];
  votes: number;
}

export interface Post {
  id: string;
  question: string;
  aiResponse: string;
  aiModel: string;
  createdAt: Date;
  updatedAt: Date;
  submitter: string;
  arguments: Argument[];
  comments: Comment[];
  conclusion?: string;
  conclusionLevel: EvidenceLevel;
  views: number;
  status: 'active' | 'resolved' | 'disputed';
}

// モックデータ
export const mockPosts: Post[] = [
  {
    id: '1',
    question: '地球温暖化は本当に人為的なものですか?',
    aiResponse: 'はい、地球温暖化は主に人為的な活動によって引き起こされています。産業革命以降、化石燃料の燃焼により大気中のCO2濃度が急激に上昇しており、これが地球の平均気温上昇の主な原因とされています。IPCCの報告書によると、現在の温暖化の95%以上が人間活動に起因すると結論づけられています。',
    aiModel: 'GPT-4',
    createdAt: new Date('2026-02-10'),
    updatedAt: new Date('2026-02-12'),
    submitter: '田中太郎',
    status: 'active',
    conclusionLevel: 'A',
    views: 1247,
    conclusion: '複数の査読済み論文と国際機関のレポートにより、人為的温暖化は高い信頼性で支持されている。ただし、具体的な影響度や予測モデルには議論の余地あり。',
    arguments: [
      {
        id: 'arg1',
        title: 'IPCC報告書による裏付け',
        position: 'support',
        description: '気候変動に関する政府間パネル(IPCC)の第6次評価報告書で明確に人為的温暖化が示されている',
        votes: 142,
        evidences: [
          {
            id: 'ev1',
            url: 'https://www.ipcc.ch/report/ar6/',
            title: 'IPCC第6次評価報告書',
            level: 'A',
            votes: 89,
            addedBy: '佐藤花子',
            addedAt: new Date('2026-02-10'),
          },
          {
            id: 'ev2',
            url: 'https://www.nature.com/articles/climate-change-2023',
            title: 'Nature誌 - 人為的温暖化の証拠',
            level: 'A',
            votes: 53,
            addedBy: '鈴木一郎',
            addedAt: new Date('2026-02-11'),
          },
        ],
      },
      {
        id: 'arg2',
        title: '過去の気候変動との比較',
        position: 'neutral',
        description: '地球の気候は過去にも自然変動してきたため、現在の変動がどこまで人為的かは慎重な検討が必要',
        votes: 78,
        evidences: [
          {
            id: 'ev3',
            url: 'https://science.org/paleoclimate-studies',
            title: 'Science - 古気候学からの視点',
            level: 'B',
            votes: 45,
            addedBy: '山田次郎',
            addedAt: new Date('2026-02-11'),
          },
        ],
      },
    ],
    comments: [
      {
        id: 'c1',
        type: 'verification',
        author: '佐藤花子',
        content: 'IPCC AR6では、人為的影響の可能性が「extremely likely (95%以上)」と記載されています。これは科学的コンセンサスとして非常に強いレベルです。',
        createdAt: new Date('2026-02-10'),
        votes: 45,
      },
      {
        id: 'c2',
        type: 'discussion',
        author: '鈴木一郎',
        content: 'AIの回答は正確ですが、「95%以上」という数値の根拠となる具体的な測定方法についても言及すべきだったと思います。',
        createdAt: new Date('2026-02-11'),
        votes: 23,
      },
    ],
  },
  {
    id: '2',
    question: 'ビタミンCは風邪の予防に効果がありますか?',
    aiResponse: 'ビタミンCは風邪の予防に一定の効果があります。定期的にビタミンCを摂取することで、風邪の期間を短縮できることが研究で示されています。特に激しい運動をする人や寒冷地に住む人には効果的です。ただし、風邪をひいた後に大量摂取しても予防ほどの効果は期待できません。',
    aiModel: 'Claude 3.5',
    createdAt: new Date('2026-02-11'),
    updatedAt: new Date('2026-02-12'),
    submitter: '山本美咲',
    status: 'disputed',
    conclusionLevel: 'C',
    views: 892,
    conclusion: '一般的な予防効果は限定的。特定条件下(激しい運動、寒冷環境)では効果あり。期間短縮効果は軽微(約8%)。',
    arguments: [
      {
        id: 'arg3',
        title: 'コクランレビューによる分析',
        position: 'against',
        description: '一般人口での風邪予防効果は統計的に有意ではないとされている',
        votes: 67,
        evidences: [
          {
            id: 'ev4',
            url: 'https://www.cochrane.org/vitamin-c-common-cold',
            title: 'Cochrane Review - ビタミンCと風邪',
            level: 'A',
            votes: 52,
            addedBy: '中村健太',
            addedAt: new Date('2026-02-11'),
          },
        ],
      },
    ],
    comments: [
      {
        id: 'c3',
        type: 'verification',
        author: '中村健太',
        content: 'Cochraneの系統的レビュー(2013)では、一般人口での予防効果は認められていません。期間短縮効果も成人で8%、子供で14%程度と限定的です。',
        createdAt: new Date('2026-02-11'),
        votes: 34,
      },
    ],
  },
  {
    id: '3',
    question: 'プログラミング言語Pythonは機械学習に最適ですか?',
    aiResponse: 'はい、Pythonは機械学習に最適な言語です。TensorFlow、PyTorch、scikit-learnなど、豊富なライブラリが揃っており、学習コストも低いため、初心者からプロフェッショナルまで幅広く使われています。また、大規模なコミュニティがあるため、問題解決も容易です。',
    aiModel: 'GPT-4',
    createdAt: new Date('2026-02-12'),
    updatedAt: new Date('2026-02-12'),
    submitter: '加藤愛',
    status: 'active',
    conclusionLevel: 'B',
    views: 456,
    comments: [
      {
        id: 'c4',
        type: 'discussion',
        author: '伊藤拓也',
        content: '「最適」という表現は状況によります。プロトタイピングには最適ですが、本番環境での推論速度を重視する場合はC++やRustの方が適切なケースもあります。',
        createdAt: new Date('2026-02-12'),
        votes: 12,
      },
    ],
    arguments: [],
  },
  {
    id: '4',
    question: '1日1回の瞑想習慣でストレスが改善しますか?',
    aiResponse: '毎日10分程度の瞑想を行うことで、ストレスホルモンであるコルチゾールの低下が期待できます。メタ分析でも「自覚的なストレスの低減」との関連が確認されており、習慣化すれば睡眠の質の向上にもつながるとされています。',
    aiModel: 'Gemini Pro',
    createdAt: new Date('2026-02-05'),
    updatedAt: new Date('2026-02-09'),
    submitter: '森田翔',
    status: 'resolved',
    conclusionLevel: 'B',
    views: 1044,
    conclusion: '日常的なマインドフルネス瞑想は、自覚的ストレスの有意な低下と睡眠の質改善に寄与する。医療介入を置き換えるものではないが、補助的ケアとして推奨できる。',
    arguments: [
      {
        id: 'arg4',
        title: 'ランダム化比較試験での効果',
        position: 'support',
        description: '2014年JAMA Internal Medicineに掲載された試験で、マインドフルネス瞑想群が対照群よりストレス指標を有意に改善',
        votes: 81,
        evidences: [
          {
            id: 'ev5',
            url: 'https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/1809754',
            title: 'JAMA Intern Med - Mindfulness-Based Therapy',
            level: 'A',
            votes: 60,
            addedBy: '井上真',
            addedAt: new Date('2026-02-06'),
          },
        ],
      },
      {
        id: 'arg5',
        title: '効果は中程度との指摘',
        position: 'neutral',
        description: 'メタ分析では効果量は中程度に留まり、慢性疾患患者では差が縮まるとの報告もある',
        votes: 41,
        evidences: [
          {
            id: 'ev6',
            url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3927237/',
            title: 'Meta-analysis of Mindfulness-Based Stress Reduction',
            level: 'B',
            votes: 28,
            addedBy: '小林優',
            addedAt: new Date('2026-02-07'),
          },
        ],
      },
    ],
    comments: [
      {
        id: 'c5',
        type: 'verification',
        author: '井上真',
        content: 'JAMAの試験では8週間の介入でPerceived Stress Scaleのスコアが5.1ポイント改善していました。follow-upでも効果は維持されていました。',
        createdAt: new Date('2026-02-06'),
        votes: 38,
      },
      {
        id: 'c6',
        type: 'discussion',
        author: '小林優',
        content: '臨床現場では併用療法として案内しています。瞑想アプリの利用など現実的な導入方法を明記するとさらによいと思います。',
        createdAt: new Date('2026-02-08'),
        votes: 19,
      },
    ],
  },
];

export function getPostById(id: string): Post | undefined {
  return mockPosts.find(post => post.id === id);
}

export function getAllPosts(): Post[] {
  return mockPosts;
}
