export const worksData = [
    {
        id: 'pinpin',
        number: '01',
        title: 'PinPin',
        subtitle: 'AI Skincare Companion',
        category: 'AI Product',
        description: '探索 AI 如何帮助用户建立个性化护肤习惯。\n从需求研究、产品设计到 AI 交互体验，构建面向日常使用的智能护肤助手。',
        role: ['Product Design', 'AI Interaction'],
        keywords: ['AI Product', 'Product Design', 'AI Interaction'],
        detailUrl: 'pinpin.html',
        image: 'assets/pinpin-home.png',
        side: 'right',
        tree: {
            branchIndex: 0,
            yOffset: 0
        }
    },
    {
        id: 'content-growth',
        number: '02',
        title: 'Content Growth',
        subtitle: 'Content Strategy',
        category: 'Content Strategy',
        description: '通过持续内容发布和数据观察，探索用户兴趣、标题表达与内容传播之间的关系。\n从内容测试到数据分析，建立基于反馈的内容优化方式。',
        role: ['Content Strategy', 'Data Analysis'],
        keywords: ['Content Strategy', 'Data Analysis', 'Growth'],
        image: 'assets/content-growth-home.jpg',
        detailUrl: 'content-growth.html',
        side: 'left',
        tree: {
            branchIndex: 1,
            yOffset: 0
        }
    },
    {
        id: 'research',
        number: '03',
        title: 'Digital Culture Research',
        subtitle: 'User Research',
        category: 'User Research',
        description: '基于 K-pop 内容案例，研究不同平台中的用户表达与文化讨论。\n通过评论分析和平台比较，探索数字内容如何影响用户意义建构。',
        role: ['User Research', 'Data Analysis'],
        keywords: ['User Research', 'Data Analysis', 'Digital Culture'],
        detailUrl: 'research.html',
        image: 'assets/research-allergy-mv.jpg',
        side: 'right',
        tree: {
            branchIndex: 2,
            yOffset: 0
        }
    },
    {
        id: 'concert',
        number: '04',
        title: 'Concert Project',
        subtitle: 'Project Coordination',
        category: 'Project Coordination',
        description: '参与大型演出项目的内容策划、商业合作与现场执行。\n从宣传传播、活动设计到现场协调，探索复杂项目中的协作与推进方式。',
        role: ['Project Coordination', 'Content Planning'],
        keywords: ['Project Coordination', 'Content Planning', 'Event Strategy'],
        image: 'assets/concert-home.jpg',
        detailUrl: 'concert.html',
        side: 'left',
        tree: {
            branchIndex: 3,
            yOffset: 0
        }
    },
    {
        id: 'design-collection',
        number: '05',
        title: 'Design Collection',
        subtitle: 'Visual Design',
        category: 'Visual Design',
        description: '探索视觉语言、品牌表达与空间体验之间的关系。\n通过平面设计、包装设计和视觉系统实践，建立个人设计方法。',
        role: ['Visual Design', 'Brand Design'],
        keywords: ['Visual Design', 'Brand Design', 'Creative Exploration'],
        image: 'assets/design-collection-home.png',
        detailUrl: 'design-collection.html',
        side: 'right',
        tree: {
            branchIndex: 4,
            yOffset: 0
        }
    }
];

export const navItems = [
    { id: 'home', label: 'HOME', number: null },
    { id: 'about', label: 'ABOUT', number: '01' },
    {
        id: 'works',
        label: 'WORKS',
        number: '02',
        subItems: [
            { id: 'pinpin', label: 'PinPin' },
            { id: 'content-growth', label: 'Content Growth' },
            { id: 'research', label: 'Research' },
            { id: 'concert', label: 'Concert Project' },
            { id: 'design-collection', label: 'Design Collection' }
        ]
    },
    { id: 'resume', label: 'RESUME', number: '03' }
];

export const heroData = {
    name: 'Chen Ming',
    titleLines: ['Designing Products,', 'Exploring Human Behavior.'],
    descriptionLines: [
        '探索 AI 产品、用户体验与数字文化，',
        '通过研究、设计和技术连接人与产品。',
        '',
        'Exploring AI products, user experience',
        'and digital culture through research,',
        'design and technology.'
    ]
};

export const resumeData = {
    titleEn: 'BACKGROUND',
    titleCn: 'Background',
    subtitleLines: [
        '环境设计培养了我对空间、体验和视觉表达的理解。',
        '媒体研究让我关注数字文化、用户行为和内容传播。',
        '在持续的产品实践中，研究如何将设计与技术结合，探索 AI 时代新的产品形态。'
    ],
    contact: {
        name: 'Chen Ming',
        role: 'AI Product Designer',
        location: '杭州（可接受远程工作）',
        email: '15397034700@163.com',
        phone: '+86 153 9703 4700',
        education: 'M.A. Media Studies'
    },
    quickLinks: [
        { id: 'resume', labelCn: '下载简历', labelEn: 'Download Resume', href: '#' },
        { id: 'email', labelCn: '发送邮件', labelEn: 'Send Email', href: 'mailto:15397034700@163.com' }
    ],
    endingText: 'Let\'s Connect.'
};

export const contactData = {
    resumeLabel: 'Download Resume',
    contactLabel: 'Get in Touch'
};
