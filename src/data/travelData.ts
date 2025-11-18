export const attractions = [
  {
    id: 'urumqi',
    name: '乌鲁木齐',
    nameEn: 'Urumqi',
    coordinates: [43.8256, 87.6168] as [number, number],
    day: 1,
    type: 'city' as const,
    description: '新疆维吾尔自治区首府，丝绸之路重镇',
    highlights: ['红山公园10万株郁金香', '新疆博物馆丝路文化', '国际大巴扎'],
    image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '全天'
  },
  {
    id: 'tianchi',
    name: '天山天池',
    nameEn: 'Tianchi Lake',
    coordinates: [43.8833, 88.1333] as [number, number],
    day: 2,
    type: 'lake' as const,
    description: '世界自然遗产，雪山环抱的高山湖泊',
    highlights: ['2.8万株郁金香盛开', '雪山森林碧水相映', '天池游船体验'],
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '4-5小时'
  },
  {
    id: 'keketuohai',
    name: '可可托海',
    nameEn: 'Keketuohai',
    coordinates: [46.9833, 89.5833] as [number, number],
    day: 3,
    type: 'scenic' as const,
    description: '世界地质公园，额尔齐斯河源头',
    highlights: ['顶冰花绽放', '地质奇观', '额尔齐斯河大峡谷'],
    image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '全天'
  },
  {
    id: 'burqin',
    name: '布尔津',
    nameEn: 'Burqin',
    coordinates: [47.7022, 86.8561] as [number, number],
    day: 4,
    type: 'city' as const,
    description: '童话边城，通往喀纳斯的门户',
    highlights: ['五彩滩雅丹地貌', '布尔津烤鱼', '额尔齐斯河夜景'],
    image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '半天'
  },
  {
    id: 'kanas',
    name: '喀纳斯',
    nameEn: 'Kanas',
    coordinates: [48.8150, 87.0400] as [number, number],
    day: 5,
    type: 'lake' as const,
    description: '中国最美湖泊，神秘的水怪传说',
    highlights: ['神仙湾晨雾', '月亮湾S形河湾', '卧龙湾水怪传说'],
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '全天'
  },
  {
    id: 'hemu',
    name: '禾木村',
    nameEn: 'Hemu Village',
    coordinates: [48.6667, 87.0000] as [number, number],
    day: 6,
    type: 'village' as const,
    description: '神的自留地，图瓦人原始村落',
    highlights: ['图瓦人文化', '原始村落风光', '春季初绿草原'],
    image: 'https://images.pexels.com/photos/1761280/pexels-photo-1761280.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '半天'
  },
  {
    id: 'karamay',
    name: '克拉玛依',
    nameEn: 'Karamay',
    coordinates: [45.5950, 84.8892] as [number, number],
    day: 6,
    type: 'city' as const,
    description: '石油之城，世界魔鬼城所在地',
    highlights: ['世界魔鬼城', '雅丹地貌奇观', '石油工业遗迹'],
    image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '半天'
  },
  {
    id: 'sailimu',
    name: '赛里木湖',
    nameEn: 'Sayram Lake',
    coordinates: [44.6000, 81.2000] as [number, number],
    day: 7,
    type: 'lake' as const,
    description: '大西洋最后一滴眼泪，高山湖泊',
    highlights: ['融冰期清澈湖面', '野百合花期', '环湖公路'],
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '4-5小时'
  }
];

export const itinerary = [
  {
    day: 1,
    title: '乌鲁木齐',
    subtitle: '适应与探索',
    distance: '市区游览',
    duration: '全天',
    activities: [
      { time: '上午', activity: '抵达乌鲁木齐，办理入住', location: '市区酒店' },
      { time: '下午', activity: '游览红山公园（10万株郁金香盛开）', location: '红山公园' },
      { time: '晚上', activity: '参观新疆博物馆，了解丝绸之路文化', location: '新疆博物馆' }
    ],
    highlights: [
      '红山公园春季郁金香花海',
      '新疆博物馆楼兰美女干尸',
      '国际大巴扎民族风情',
      '品尝正宗新疆美食'
    ],
    accommodation: '乌鲁木齐市区酒店',
    meals: ['大盘鸡', '手抓饭', '烤包子'],
    image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    day: 2,
    title: '乌鲁木齐 → 天山天池 → 阜康',
    subtitle: '雪山湖泊初体验',
    distance: '110公里',
    duration: '约2小时',
    activities: [
      { time: '上午', activity: '前往天山天池景区', location: '天山天池' },
      { time: '中午', activity: '天池游船，欣赏雪山倒影', location: '天池湖面' },
      { time: '下午', activity: '游览西小天池、定海神针', location: '天池景区' },
      { time: '晚上', activity: '入住阜康，体验温泉', location: '阜康市' }
    ],
    highlights: [
      '2.8万株郁金香竞相绽放',
      '博格达峰雪山倒影',
      '定海神针古树',
      '天池温泉养生'
    ],
    accommodation: '阜康市酒店',
    meals: ['新疆拌面', '椒麻鸡', '酸奶'],
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    day: 3,
    title: '阜康 → 富蕴可可托海',
    subtitle: '地质奇观探秘',
    distance: '约300公里',
    duration: '4-5小时',
    activities: [
      { time: '上午', activity: '出发前往可可托海', location: '沿途风光' },
      { time: '下午', activity: '游览可可托海地质公园', location: '可可托海' },
      { time: '傍晚', activity: '额尔齐斯河大峡谷徒步', location: '大峡谷' }
    ],
    highlights: [
      '顶冰花春季绽放',
      '额尔齐斯河源头',
      '神钟山地质奇观',
      '三号矿坑工业遗迹'
    ],
    accommodation: '富蕴县酒店',
    meals: ['手抓肉', '奶茶', '馕'],
    image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    day: 4,
    title: '可可托海 → 布尔津',
    subtitle: '童话边城',
    distance: '约200公里',
    duration: '3-4小时',
    activities: [
      { time: '上午', activity: '前往布尔津', location: '沿途风光' },
      { time: '下午', activity: '游览五彩滩（日落时分最美）', location: '五彩滩' },
      { time: '晚上', activity: '品尝布尔津烤鱼', location: '河堤夜市' }
    ],
    highlights: [
      '五彩滩雅丹地貌',
      '额尔齐斯河日落',
      '布尔津烤鱼美食',
      '河堤夜市风情'
    ],
    accommodation: '布尔津县酒店',
    meals: ['冷水鱼', '烤鱼', '狗鱼'],
    image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    day: 5,
    title: '布尔津 → 喀纳斯',
    subtitle: '神的后花园',
    distance: '150公里',
    duration: '2-3小时',
    activities: [
      { time: '上午', activity: '前往喀纳斯景区', location: '喀纳斯' },
      { time: '中午', activity: '游览神仙湾（晨雾缭绕）', location: '神仙湾' },
      { time: '下午', activity: '月亮湾、卧龙湾观光', location: '三湾' },
      { time: '傍晚', activity: '观鱼台俯瞰喀纳斯湖', location: '观鱼台' }
    ],
    highlights: [
      '神仙湾晨雾仙境',
      '月亮湾S形河湾',
      '卧龙湾水怪传说',
      '观鱼台全景视角'
    ],
    accommodation: '喀纳斯景区内',
    meals: ['奶茶', '马肉', '图瓦特色餐'],
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    day: 6,
    title: '喀纳斯 → 禾木 → 克拉玛依',
    subtitle: '原始村落与魔鬼城',
    distance: '约400公里',
    duration: '6-7小时',
    activities: [
      { time: '上午', activity: '游览禾木村', location: '禾木村' },
      { time: '中午', activity: '前往克拉玛依', location: '沿途' },
      { time: '下午', activity: '游览世界魔鬼城', location: '魔鬼城' },
      { time: '晚上', activity: '入住克拉玛依', location: '克拉玛依市' }
    ],
    highlights: [
      '禾木村图瓦人文化',
      '原始村落风光',
      '世界魔鬼城雅丹地貌',
      '石油工业城市风貌'
    ],
    accommodation: '克拉玛依市酒店',
    meals: ['烤羊肉串', '拉条子', '酸奶疙瘩'],
    image: 'https://images.pexels.com/photos/1761280/pexels-photo-1761280.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    day: 7,
    title: '克拉玛依 → 赛里木湖 → 乌鲁木齐',
    subtitle: '大西洋最后一滴眼泪',
    distance: '约600公里',
    duration: '8-9小时',
    activities: [
      { time: '上午', activity: '前往赛里木湖', location: '沿途' },
      { time: '中午', activity: '环湖游览，野百合花期', location: '赛里木湖' },
      { time: '下午', activity: '返回乌鲁木齐', location: '沿途' },
      { time: '晚上', activity: '送机/送站，结束行程', location: '乌鲁木齐' }
    ],
    highlights: [
      '赛里木湖融冰期美景',
      '野百合花海',
      '环湖公路自驾',
      '高山湖泊全景'
    ],
    accommodation: '返程',
    meals: ['手抓饭', '烤肉', '奶茶'],
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const routeInfo = {
  budget: {
    groupTour: '3000-5000元/人',
    privateTour: '4000-6000元/人',
    tickets: [
      { name: '天山天池', price: '105元' },
      { name: '喀纳斯', price: '230元' },
      { name: '赛里木湖', price: '70元' },
      { name: '可可托海', price: '90元' }
    ]
  },
  weather: {
    temperature: '白天15-20℃ / 夜晚5-10℃',
    characteristics: [
      '温差大，需备保暖衣物',
      '紫外线强，注意防晒',
      '气候干燥，多喝水',
      '高海拔地区注意高反'
    ]
  },
  essentials: {
    protection: [
      '☀️ 防晒霜SPF50+、墨镜、遮阳帽',
      '💧 润唇膏、保湿水（气候干燥）',
      '🧴 防蚊液、创可贴'
    ],
    clothing: [
      '🧥 保暖外套（早晚温差大）',
      '👟 舒适徒步鞋、换洗衣物',
      '🧣 围巾、手套（高海拔地区）'
    ],
    electronics: [
      '🔋 充电宝、相机、手机防水套',
      '📱 备用电池、数据线'
    ],
    medicine: [
      '💊 肠胃药、感冒药',
      '🏔️ 高原反应药（赛里木湖）'
    ]
  },
  food: [
    {
      location: '乌鲁木齐',
      dishes: ['大盘鸡', '手抓饭', '烤包子', '椒麻鸡'],
      rating: 5
    },
    {
      location: '布尔津',
      dishes: ['冷水鱼', '烤鱼', '狗鱼', '额河烤鱼'],
      rating: 5
    },
    {
      location: '喀纳斯',
      dishes: ['奶茶', '马肉', '图瓦人特色餐', '酸奶'],
      rating: 4
    },
    {
      location: '全程通用',
      dishes: ['烤羊肉串', '馕', '酸奶疙瘩', '拉条子'],
      rating: 5
    }
  ],
  tips: [
    '五一期间独库公路尚未开放（通常5月底6月初开放），本线路避开此路段',
    '北疆春季景观正值观赏期，郁金香、顶冰花等春季花卉盛开',
    '尊重当地民族习俗与宗教信仰，进入清真餐厅不携带猪肉制品',
    '提前预订住宿（五一旺季），购买旅游保险',
    '保持通讯畅通，告知家人行程，注意人身和财产安全',
    '拍照前征得当地人同意，保护环境不乱扔垃圾'
  ],
  emergency: {
    tourism: '12301',
    consultation: '0991-2801111',
    rescue: '110/120/119'
  }
};
