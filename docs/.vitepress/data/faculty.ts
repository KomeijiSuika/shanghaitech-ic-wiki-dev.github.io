// 上科大信息学院 IC 相关教授与课题组。
// 来源：信息学院师资库（sist.shanghaitech.edu.cn/szdwx，2026-11 核对）与
// 《后摩尔器件与集成系统中心》介绍材料。研究方向字段尽量照录官方描述；
// 实验室名称来自中心介绍材料或课题组主页。信息变动请以学院主页为准，欢迎 PR 修正。

export interface Faculty {
  name: string
  title: string
  center: string
  /** 关联的 directions.ts 中的方向 id，第一个为主方向 */
  dirs: string[]
  focus: string
  lab?: string
  home: string
  site?: string
  note?: string
}

const PM = '后摩尔器件与集成系统中心'
const EL = '智慧电气科学中心'
const SS = '系统与安全中心'

export const faculty: Faculty[] = [
  {
    name: '娄鑫',
    title: '长聘副教授',
    center: PM,
    dirs: ['digital', 'ai-hw'],
    focus: '数字 VLSI 设计；智能视觉、三维重建与渲染芯片',
    lab: 'VLSI 信号处理实验室（VSPLab）',
    home: 'https://sist.shanghaitech.edu.cn/louxin/main.htm',
    site: 'https://vsplab.cn/'
  },
  {
    name: '哈亚军',
    title: '教授',
    center: PM,
    dirs: ['digital', 'security', 'ai-hw'],
    focus: 'FPGA 结构、设计工具及应用；超低功耗数字电路与系统；硬件安全；智能车与嵌入式系统',
    lab: '可重构与智能计算实验室',
    home: 'https://sist.shanghaitech.edu.cn/hayj/main.htm',
    site: 'http://faculty.sist.shanghaitech.edu.cn/faculty/hayj'
  },
  {
    name: '刘思廷',
    title: '助理教授',
    center: PM,
    dirs: ['ai-hw', 'digital', 'arch'],
    focus: '数字集成电路设计；先进计算电路与系统（动态随机计算、低比特计算、边缘 AI）',
    lab: '先进计算电路与系统实验室（CAS4ET）',
    home: 'https://sist.shanghaitech.edu.cn/liust/main.htm',
    site: 'https://faculty.sist.shanghaitech.edu.cn/liust/'
  },
  {
    name: '任轩乐',
    title: '助理教授',
    center: PM,
    dirs: ['security', 'digital', 'eda'],
    focus: '隐私计算芯片设计、硬件安全、芯片设计自动化',
    home: 'https://sist.shanghaitech.edu.cn/rxl/main.htm',
    site: 'https://renxuanle.github.io/index.html'
  },
  {
    name: '周平强',
    title: '教授',
    center: PM,
    dirs: ['eda', 'security', 'photonics'],
    focus: 'EDA、集成电路设计、硬件安全、光电混合计算',
    lab: '集成电路与系统实验室',
    home: 'https://sist.shanghaitech.edu.cn/zhoupq/main.htm',
    site: 'http://faculty.sist.shanghaitech.edu.cn/faculty/zhoupq/'
  },
  {
    name: '耿浩',
    title: '助理教授',
    center: PM,
    dirs: ['eda'],
    focus: '机器学习赋能 EDA：芯片设计空间探索、可制造性设计、计算光刻',
    home: 'https://sist.shanghaitech.edu.cn/genghao/main.htm',
    site: 'https://true-genghao.github.io/genghao/'
  },
  {
    name: '张芯韵',
    title: '助理教授',
    center: PM,
    dirs: ['eda'],
    focus: 'AI 驱动的芯片设计自动化（AI4EDA）、IC 可制造性设计、IC 物理设计',
    home: 'https://sist.shanghaitech.edu.cn/zxy1/main.htm',
    site: 'https://yxgnahz.github.io/'
  },
  {
    name: '吕宏鸣',
    title: '助理教授',
    center: PM,
    dirs: ['analog'],
    focus: '数模混合集成电路设计、脑机接口芯片、植入式医疗芯片',
    lab: '医疗集成电路与微系统实验室（BICML）',
    home: 'https://sist.shanghaitech.edu.cn/lvhm/main.htm',
    site: 'https://bicml.shanghaitech.edu.cn/'
  },
  {
    name: '寇煦丰',
    title: '教授',
    center: PM,
    dirs: ['devices'],
    focus: '微纳电子器件与电路设计、自旋电子学、拓扑量子体系应用、低温电子学',
    home: 'https://sist.shanghaitech.edu.cn/kouxf/main.htm',
    site: 'https://sites.google.com/site/xufengkouspersonalwebsite/'
  },
  {
    name: '杨雨梦',
    title: '助理教授',
    center: PM,
    dirs: ['devices'],
    focus: '磁存储与磁传感器（自旋电子学）',
    home: 'https://sist.shanghaitech.edu.cn/yangym1/main.htm',
    site: 'http://faculty.sist.shanghaitech.edu.cn/faculty/yangym/index.html'
  },
  {
    name: '祝智峰',
    title: '助理教授',
    center: PM,
    dirs: ['devices', 'ai-hw'],
    focus: '基于自旋电子的下一代磁性存储技术与类脑计算技术',
    lab: '计算自旋电子器件实验室',
    home: 'https://sist.shanghaitech.edu.cn/zhuzhf/main.htm',
    site: 'https://zhuzibn.github.io/'
  },
  {
    name: '廖立杨',
    title: '助理教授',
    center: PM,
    dirs: ['devices', 'rf'],
    focus: '面向量子信息、射频器件及芯片电源管理的自旋电子学混合系统',
    home: 'https://sist.shanghaitech.edu.cn/lly1/main.htm'
  },
  {
    name: '邹新波',
    title: '副教授',
    center: PM,
    dirs: ['devices', 'power', 'rf'],
    focus: '第三代半导体功率器件、GaN 基微波和毫米波器件、宽禁带半导体陷阱物性',
    lab: '氮化镓电子器件实验室（GaNology Lab）',
    home: 'https://sist.shanghaitech.edu.cn/zouxb/main.htm',
    site: 'http://ganology.sist.shanghaitech.edu.cn/'
  },
  {
    name: '封松林',
    title: '研究员',
    center: PM,
    dirs: ['devices'],
    focus: '微系统技术、量子器件和物理、低维半导体材料、器件和物理',
    home: 'https://sist.shanghaitech.edu.cn/fengsl/main.htm'
  },
  {
    name: '陈佰乐',
    title: '教授',
    center: PM,
    dirs: ['photonics', 'devices'],
    focus: '雪崩光电二极管、高速光电探测芯片、III-V 族光子芯片、硅基集成激光器和探测器',
    lab: '光电器件实验室',
    home: 'https://sist.shanghaitech.edu.cn/chenbl/main.htm',
    site: 'https://faculty.sist.shanghaitech.edu.cn/faculty/chenbl/#about'
  },
  {
    name: '王成',
    title: '副教授',
    center: PM,
    dirs: ['photonics', 'ai-hw'],
    focus: '人工智能光计算芯片、半导体激光器、激光通信、激光雷达',
    home: 'https://sist.shanghaitech.edu.cn/wangcheng1/main.htm'
  },
  {
    name: '邹毅',
    title: '副教授',
    center: PM,
    dirs: ['photonics'],
    focus: '集成光子学、光互联、光电融合芯片、微纳光子学',
    lab: '集成光子学与微纳光子学实验室（EZLab）',
    home: 'https://sist.shanghaitech.edu.cn/zouyi/main.htm',
    site: 'https://faculty.sist.shanghaitech.edu.cn/zouyi'
  },
  {
    name: '陆娟娟',
    title: '助理教授',
    center: PM,
    dirs: ['photonics'],
    focus: '光子集成电路、非线性光子学、量子光子学',
    lab: '非线性及量子光芯片实验室（iNQuP）',
    home: 'https://sist.shanghaitech.edu.cn/lujj/main.htm',
    site: 'https://juanjuanlu.wordpress.com/'
  },
  {
    name: '曲俞睿',
    title: '助理教授',
    center: PM,
    dirs: ['photonics', 'ai-hw'],
    focus: '光计算/AI、光芯片、光子智能感知、微纳光子学',
    lab: '微纳光电器件与计算实验室',
    home: 'https://sist.shanghaitech.edu.cn/quyr/main.htm',
    site: 'https://yuruiqulab.github.io/'
  },
  {
    name: '吴涛',
    title: '长聘副教授',
    center: PM,
    dirs: ['mems', 'eda'],
    focus: '微纳机电系统（MEMS/NEMS）、压电器件与微系统（PiezoMEMS）、AI 辅助集成电路设计（AI4IC）',
    lab: '微系统与先进传感器实验室（SMALL）',
    home: 'https://sist.shanghaitech.edu.cn/wutao/main.htm',
    site: 'https://small.shanghaitech.edu.cn/'
  },
  {
    name: '曹文翰',
    title: '助理教授',
    center: PM,
    dirs: ['mems', 'rf'],
    focus: '柔性电子器件、软体机器人、太赫兹超表面器件、多层级微纳传感器件',
    home: 'https://sist.shanghaitech.edu.cn/cwh/main.htm'
  },
  {
    name: '林丰涵',
    title: '助理教授',
    center: PM,
    dirs: ['rf'],
    focus: '模式与结构电磁学、天线理论与技术、微波电路与器件、电磁波调控、人工智能辅助电磁设计',
    lab: '超感知实验室',
    home: 'https://sist.shanghaitech.edu.cn/linfh/main.htm'
  },
  {
    name: '王雄',
    title: '副教授',
    center: `${PM}、智能医学信息研究中心`,
    dirs: ['rf'],
    focus: '微波/毫米波/超声生物医学成像、电磁波与声波调控、超构表面、物理神经网络',
    home: 'https://sist.shanghaitech.edu.cn/wangxiong/main.htm'
  },
  {
    name: '王浩宇',
    title: '教授、副院长',
    center: `${EL}、智能网络中心`,
    dirs: ['power'],
    focus: '电力电子、电源管理芯片、算力电源、电动汽车',
    lab: 'PEARL 实验室',
    home: 'https://sist.shanghaitech.edu.cn/wanghy/main.htm',
    site: 'https://pearl.shanghaitech.edu.cn'
  },
  {
    name: '傅旻帆',
    title: '副教授',
    center: EL,
    dirs: ['power', 'rf'],
    focus: '电力电子、无线传能、脑机接口充电、功率 IC、射频功放、电磁兼容、宽禁带器件应用',
    home: 'https://sist.shanghaitech.edu.cn/fumf/main.htm',
    site: 'https://aepcl.sist.shanghaitech.edu.cn/'
  },
  {
    name: '梁俊睿',
    title: '副教授',
    center: EL,
    dirs: ['power', 'mems'],
    focus: '环境能量收集、电力电子、无源物联网、功率管理集成电路、机电一体化',
    home: 'https://sist.shanghaitech.edu.cn/liangjr/main.htm',
    site: 'https://metal.shanghaitech.edu.cn'
  },
  {
    name: '叶朝锋',
    title: '副教授',
    center: `智能医学信息研究中心、${EL}`,
    dirs: ['mems'],
    focus: '电磁精密传感、电磁无损检测、弱磁测量、信号/图像处理',
    home: 'https://sist.shanghaitech.edu.cn/yechf/main.htm',
    site: 'https://psit.sist.shanghaitech.edu.cn/'
  },
  {
    name: '任豪',
    title: '助理教授',
    center: PM,
    dirs: ['mems'],
    focus: 'MEMS 谐振器与传感器、MEMS 微生物燃料电池与超级电容器、穿戴/植入式医疗传感器',
    home: 'https://sist.shanghaitech.edu.cn/',
    note: '信息来自后摩尔中心介绍材料，当前师资库未检索到个人页，以学院公布为准'
  },
  {
    name: '肖原',
    title: '助理教授',
    center: SS,
    dirs: ['security', 'arch'],
    focus: '系统安全、（微）架构、侧信道攻击、可信执行环境、x86/RISC-V',
    home: 'https://sist.shanghaitech.edu.cn/xy/main.htm',
    site: 'https://faculty.sist.shanghaitech.edu.cn/xiaoyuan/'
  },
  {
    name: '王春东',
    title: '助理教授',
    center: SS,
    dirs: ['arch'],
    focus: '数据存储与管理、操作系统与体系结构、数据安全与隐私',
    home: 'https://sist.shanghaitech.edu.cn/wangchd/main.htm',
    site: 'https://Chundong.Wang'
  },
  {
    name: '殷树',
    title: '副教授',
    center: SS,
    dirs: ['arch'],
    focus: '高性能计算、高性能文件系统',
    home: 'https://sist.shanghaitech.edu.cn/yinshu/main.htm',
    site: 'https://lion.sist.shanghaitech.edu.cn/'
  }
]

export function facultyByDirection(dir: string): Faculty[] {
  return faculty.filter((f) => f.dirs.includes(dir))
}
