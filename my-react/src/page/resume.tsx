import './resume.css';

export function Resume() {
    return (
        <div className="resume-page">
            <div className="resume-header">
                <div className="name-title">
                    <h1>刘宇航</h1>
                    <div className="job-tag">意向岗位：Unity客户端开发</div>
                </div>
                <div className="contact-bar">
                    <span>📞 19845454009</span>
                    <span>📧 2468274332@qq.com</span>
                    <span>👨 男｜22岁｜现居哈尔滨</span>
                </div>z
            </div>

            <section className="resume-block">
                <h2>求职意向</h2>
                <div className="block-content">
                    <p>意向岗位：Unity客户端开发｜求职类型：校招</p>
                </div>
            </section>

            <section className="resume-block">
                <h2>教育经历</h2>
                <div className="block-content">
                    <div className="timeline-item">
                        <div className="time-row">2022.09 - 2026.06</div>
                        <div className="content-row">黑龙江工程学院 | 软件工程 本科</div>
                    </div>
                </div>
            </section>

            <section className="resume-block">
                <h2>相关技能</h2>
                <div className="block-content">
                    <ul>
                        <li>精通 C#，深入理解 List/Dictionary/HashSet 等泛型容器的内部扩容机制与内存分配规律，具备基于 Profiler 的 GC 调优与代码重构经验。</li>
                        <li>熟悉 Git 工作流与多人协同开发；熟练借助 Cursor/Codex 等 AI 工具生成代码结构与单元测试模板，提升重复性开发效率；具备独立开发编辑器扩展（EditorWindow/Inspector）的能力。</li>
                        <li>精通 Unity 生命周期与消息机制，熟练掌握 UGUI、Input System、Cinemachine、TextMeshPro 等核心组件，具备 2D/3D 全流程项目从零搭建及 PC/移动端多平台适配经验。</li>
                        <li>掌握 UI 合批、渲染层级、CPU 占用分析等常规优化手段。具备对象池架构设计与落地能力，有效降低高频创建销毁带来的性能开销。</li>
                        <li>熟悉 Unity 底层资源管理机制，能针对不同资源类型制定合理的异步卸载策略。</li>
                        <li>掌握 A* 寻路算法在游戏中的应用；了解 DOTS 架构（ECS/Job System/Burst）的核心设计思想与适用场景。</li>
                        <li>基于 Netcode for GameObjects 实现过服务器权威架构下的多人状态同步，熟悉 ServerRpc / ClientRpc / NetworkVariable 的使用。了解本地预测与快照插值等常见网络同步补偿机制。</li>
                        <li>了解 AssetBundle 打包、依赖分析、版本校验及基于 Hash 比对的差异更新原理。了解基于 XLua 的代码热更新机制。</li>
                    </ul>
                </div>
            </section>

            <section className="resume-block">
                <h2>实习项目</h2>
                <div className="block-content">
                    <div className="timeline-item">
                        <div className="time-row">2026.01 – 2026.06</div>
                        <div className="content-row">
                            <div className="item-head">哈尔滨唯创网讯科技开发有限公司｜Unity 客户端开发实习生</div>
                            <div className="sub-title">实习项目：智慧园区数字孪生交互展示客户端</div>
                            <div className="tech-label">技术栈：Unity 2022.3 LTS、C#、UGUI、AssetBundle、HTTP/WebSocket、Git</div>
                            <ul>
                                <li>参与基于 Unity 的智慧园区数字孪生交互展示客户端开发，面向 PC 与触控大屏场景，负责场景交互、设备信息展示和 UI 功能实现。</li>
                                <li>使用 ScriptableObject 与 JSON 设计楼层、设备、告警等数据配置结构，实现模型点击、楼层切换、设备详情、镜头定位和路径漫游等功能。</li>
                                <li>使用 AssetBundle 对场景、模型和贴图资源进行拆分，编写异步加载、缓存及场景切换释放逻辑，解决重复加载和资源残留问题。</li>
                                <li>配合后端对接 HTTP/WebSocket 数据接口，将设备状态和告警消息转换为客户端事件，并通过事件分发机制驱动 UI 刷新、模型高亮和提示动画。</li>
                                <li>使用 Unity Profiler 分析 DrawCall、GC Alloc 和 UI 重建开销，优化 Canvas 分层、对象池及高频提示刷新逻辑，提升演示环境下的运行稳定性。</li>
                                <li>配合策划、美术完成多轮功能联调，补充一键重置、离线演示、日志导出等功能，并协助整理客户端打包与现场部署检查流程。</li>
                            </ul>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="time-row">2025.09 – 2025.11</div>
                        <div className="content-row">
                            <div className="item-head">天津智橙科技有限公司｜Unity开发实习生</div>
                            <div className="sub-title">实习项目：基于Kinect的体感游戏</div>
                            <ul>
                                <li>参与线下多人互动大屏体感游戏开发（支持1-6人），负责核心交互模块与动作识别功能实现。</li>
                                <li>独立设计适配 Unity 的 Mono 状态机，支持在 Inspector 面板可视化配置“能量球攻击”等玩法的状态逻辑与转换条件，降低后续迭代维护成本。</li>
                                <li>基于 Kinect SDK 对接微软、奥比中光多款深度摄像头，编写设备适配脚本统一异构硬件骨骼数据格式，完成关节坐标归一化处理。</li>
                                <li>对接 YOLOv8 抠像算法与骨骼追踪数据流，采用帧数据缓存策略协调双路输入，修复设备切换时的动作识别断层与画面卡顿。</li>
                                <li>调整相机渲染顺序与 Render Queue，解决抠像人像与游戏场景物体的层级错乱问题。</li>
                                <li>编写“能量球攻击”、“踩格子”等核心动作判定逻辑，通过校准骨骼关节运动轨迹与速度阈值过滤误触发，保障玩法顺利落地。</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="resume-block">
                <h2>项目经历</h2>
                <div className="block-content">
                    <div className="timeline-item">
                        <div className="time-row">2025.12 - 至今</div>
                        <div className="content-row">
                            <div className="item-head">自研框架｜独立开发</div>
                            <ul>
                                <li>设计并实现了一套基于 IoC 架构的轻量级游戏框架，解决模块强耦合、UI 数据刷新混乱、资源生命周期管理失控等问题。</li>
                                <li>设计 Model/System/Utility/Presentation 四层架构，通过 IoC 容器统一管理模块生命周期，新增功能仅需实现接口并注册，符合开闭原则。</li>
                                <li>基于 BindableProperty&lt;T&gt; 实现数据与 UI 双向绑定，UI 订阅数据变更自动刷新，彻底摆脱手动轮询。</li>
                                <li>设计 ResourceScope 作用域容器，将资源加载与释放绑定到具体场景或页面生命周期。在实现过程中处理了不同类型资源（原生资产与预制体实例）的差异化释放问题。</li>
                                <li>配套开发资源依赖编辑器、PoolKit 运行时调试器、UIKit 配置编辑器等可视化工具。</li>
                                <li>开源地址：<a href="https://github.com/sagesum/CatAndFishFramework.git" target="_blank" rel="noreferrer">https://github.com/sagesum/CatAndFishFramework.git</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="time-row">2026.03 - 2026.04</div>
                        <div className="content-row">
                            <div className="item-head">数字人-AI语音交互｜独立开发</div>
                            <ul>
                                <li>基于 Unity 与 ChatdollKit 重构对话流程，打通 STT（SenseVoice）→ LLM → TTS（CosyVoice）全链路，使用 UniTask 处理异步请求与播放时序，实现用户与虚拟角色的实时对话。</li>
                                <li>封装 OpenAI 兼容的大模型接入层，支持对接 SiliconFlow / ModelScope / DeepSeek / Ollama 等兼容后端，具备模型快速切换与参数扩展能力。</li>
                                <li>实现本地语音合成模块，封装 WAV 数据解析与 AudioClip 播放流程，处理超时控制、语音缓存与顺序预取策略，提升响应可用性。</li>
                                <li>优化流式打字展示、句子拆分与播放等待逻辑，引入 CancellationToken 取消机制，避免页面切换时的残留回调。</li>
                            </ul>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="time-row">2024.09 - 2024.11</div>
                        <div className="content-row">
                            <div className="item-head">屠龙勇士（角色扮演RPG游戏）｜独立开发</div>
                            <ul>
                                <li>基于 Netcode for GameObjects 搭建 3D 多人联机 RPG Demo，负责联机大厅、角色生成、移动同步、战斗交互、任务背包等核心系统。</li>
                                <li>采用服务器权威架构，客户端通过 ServerRpc 上报请求，服务器侧统一计算伤害与消耗，修改 NetworkVariable 自动广播状态，保证多端战斗表现一致。</li>
                                <li>实现多人大厅系统（昵称/角色/准备状态），通过 NetworkSceneManager 实现 Host 切场景后 Client 自动同步进入。</li>
                                <li>实现玩家移动与动画同步，以及近战扇形判定、四段连击、攻击冷却与装备加成计算。</li>
                                <li>实现任务系统、NPC 对话、敌人生成及背包系统（基于 NetworkList 同步，支持个人可见掉落拾取）。</li>
                                <li>基于 ScriptableObject 搭建物品与生成数据配置体系，接入 Input System、Cinemachine 完成聊天、血条、复活倒计时等完整交互表现。</li>
                            </ul>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="time-row">2025.01 - 2025.03</div>
                        <div className="content-row">
                            <div className="item-head">坚持到最后-类吸血鬼幸存者｜独立开发</div>
                            <ul>
                                <li>基于 Unity 2022.3 LTS 开发 2D 生存割草类游戏，负责玩家移动、自动战斗、敌人波次、商店成长、角色选择等核心玩法系统搭建。</li>
                                <li>采用组件化架构拆分玩家系统，基于 ScriptableObject 搭建数据驱动配置体系，将角色/武器/物品数据与业务逻辑分离，提升数值调整与角色扩展效率。</li>
                                <li>设计并实现游戏状态流转机制，驱动 UI、波次与游戏流程切换。</li>
                                <li>实现自动战斗武器系统（近战/远程），支持自动索敌、攻击间隔、暴击计算及武器升级。</li>
                                <li>封装通用对象池，对子弹、掉落物、伤害飘字等高频对象进行复用，回池时执行协程停止、事件解绑与状态重置，保障内存安全。</li>
                                <li>接入 LeanTween、移动端摇杆、震动反馈与摄像机跟随，提升移动端游戏操作手感与战斗反馈。</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="resume-block">
                <h2>自我评价</h2>
                <div className="block-content">
                    <p>热爱游戏开发，具备从零搭建完整项目的能力。对架构设计有实际落地经验（自研IoC框架），对多人联机同步方案有从理论到Demo的完整实践。乐于钻研底层原理，能通过阅读源码和调试定位性能瓶颈与内存问题。对战斗系统、资源管理、性能优化等方向有持续的技术热情。</p>
                    <p>面对新需求能快速拆解技术方案，面对线上问题能冷静定位根因。具备独立编写编辑器工具以提升研发效率的习惯，也善于与美术、策划协作推进功能落地。</p>
                </div>
            </section>

            <section className="resume-block">
                <h2>游戏经历</h2>
                <div className="block-content">
                    <ul>
                        <li>CS:GO（1500h）：熟悉多人竞技游戏的帧同步/状态同步逻辑及经济系统对战术策略的调控作用。</li>
                        <li>博德之门3（150h）：关注DND规则在电子游戏中的数值化实现，对多职业平衡与环境交互设计有开发者视角的观察。</li>
                        <li>我的世界（2000h）：长期接触模组开发社区，理解沙盒游戏的模块化架构与资源加载机制。</li>
                        <li>艾尔登法环（150h）：对高难度动作游戏中的BOSS行为树设计与攻击惩罚反馈机制有深入体验。</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
