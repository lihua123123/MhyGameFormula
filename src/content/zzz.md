> **特别说明：**
>
> 可统计的部分指该乘区括号内除了"1"之外的部分
> 代理人均为60级0画12技能等级

## 通用伤害

一般来说==直伤伤害==、==命破伤害==、==异常伤害==三大主要伤害类型均享有以下乘区
$$
\begin{align*}
    通用伤害(基础属性，倍率) & = (基础属性 \times 倍率 + 额外提升) \times (1 + 失衡易伤\%) \\
    	& \times (1 + 暴击伤害\%) \times (1 + 易伤\% - 减伤\%) \\
    	& \times (1 - 增抗\% + 减抗\% + 抗穿\%) \\
    	& \times (1 + 增伤\% - 弱伤\%)
\end{align*}
$$

没有特别说明的情况下**异常伤害**无法暴击

> 各乘区可以**统计的数值**上下限：
>
> 失衡易伤区：分有失衡时 $[-0.8, 4]$，以及未失衡时 $[0, 2]$
> 暴击区：$[0, 1]$；暴伤区：$[-1, 4]$，异常暴伤区：$[0, 2]$
> 易伤区：$[-0.8, 1]$
> 抗性区：$[-1, 1]$
> 增伤区：$[-1, 5]$

---

## 天赋倍率

代理人的天赋等级会决定其**伤害倍率**和**失衡倍率**，对于主要伤害源是异常的代理人来说天赋倍率不会有效的提升其伤害，仅有弥补一点失衡的作用
$$
\begin{align*}
    伤害倍率 & = 一级伤害倍率 \times (0.9 + 10\% \times n)
    \qquad{(n为天赋等级)}\\
    \\
    失衡倍率 & = 一级失衡倍率 \times (0.95 + 5\% \times n)
    \qquad{(n为天赋等级)}
\end{align*}
$$

---

## 防御区

**减防**和**无视防御**是加算关系，而**穿透率**与前者是乘算关系
$$
减穿系数 = (1 + 加防\% - 减防\% - 无视防御\% ) \times (1- 穿透率\%)
$$
敌人的防御系数会根据其一级的防御值来换算
$$
\begin{align*}
	防御系数 & = \frac{1 级基础防御值}{50} \\
	\\
	防御区 & = \frac{794}{防御系数 \times 794 \times 减穿系数 + 794 - 穿透值}
\end{align*}
$$

> 防御区可以统计的上下限：
>
> 防御区：$(0, 1]$

> 增伤盘与穿透盘的选择，当以下情况时选择穿透盘：
>
> 当统计的增伤区超过 $99.17\%$ 且无其他减穿系数影响时
> 当统计的增伤区超过 $168.61\%$ 且仅队伍中携带妮可 $40\%$ 减防时
> 当统计的增伤区超过 $61.67\%$ 且仅队伍中携带丽娜 $30\%$ 穿透时

---

## 直伤伤害

$$
\begin{align*}
    直伤伤害 & = 通用伤害(攻击力，技能倍率) \times 距离衰减区 \\
        & \times (1 + 直接攻击伤害\%) \\
        & \times 防御区 
\end{align*}
$$

---

## 命破伤害

命破职业的代理人会在核心天赋中写明**贯穿力**额外获得生命值的提升，而贯穿力默认仅有攻击力转化
$$
\begin{align*}
    贯穿力 & = \frac{生命值}{10} + \frac{3 \times 攻击力}{10}  \\
    \\
    命破伤害 & = 通用伤害(贯穿力，技能倍率) \\
    	& \times (1 + 贯穿增伤\% - 贯穿弱伤\%) \\
    	& \times (1 + 直接攻击伤害\%)
\end{align*}
$$

> 各乘区可以**统计的数值**上下限：
> 
> 贯穿增伤区：$[-0.8, 8]$

---

## 异常伤害

异常职业的代理人会根据每次**可以贡献异常积蓄的攻击**时获得的增益参与本次异常效果的结算，而非仅通过最后一次完成异常条的攻击的增益提高本次异常效果
$$
\begin{align*}
    异常伤害 & = 通用伤害(攻击力，异常属性倍率) \times \frac{异常精通}{100} \times 防御区 \\
    	& \times trunc(1 + \frac{\text{等级} - 1}{59}, 4) \\
    	& \times (1 + 异常增伤\% + 异常易伤\%) \\
    	& \times (1 + 异化系数\%)
\end{align*}
$$

> 各乘区可以**统计的数值**上下限：
>
> 异常精通区：$[0, 10]$
> 伤害等级区：$[1, 2]$
> 异常增伤区：$[-1, 2]$

> **异常增伤**包含了子类==紊乱增伤==、==异放增伤==和==乱流增伤==
> 触发后 $3s$ 内，无法再次触发同类异常效果

| 异常类型 | 倍率 | 次数 | 异常状态说明 | 总倍率 |
| :-: | :-: | :-: | :-: | :-: |
| <font color="#f0d12b">强击</font> | 713% | 1 | <font color="#f0d12b">畏缩</font>：使敌人受到的失衡值提升 $7.5\%$，持续 $10s$ | 713% |
| <font color="#98eff0">碎冰</font> | 500% | 1 | <font color="#98eff0">霜寒</font>：使敌人受到的暴击伤害提升 $10\%$，持续 $10s$<br /><font color="#98eff0">冻结</font>敌人，最多 $3.5s$，解除<font color="#98eff0">冻结</font>后触发<font color="#98eff0">碎冰</font> | 500% |
| <font color="#ff5521">灼烧</font> | 50% | 20 | 使敌人每 $0.5s$ 受到一次<font color="#ff5521">火属性</font>异常伤害，持续 $10s$ | 1000% |
| <font color="#2eb6ff">感电</font> | 125% | 10 | 使敌人受到攻击时触发一次<font color="#2eb6ff">电属性</font>异常伤害<br />触发间隔为 $1s$，持续 $10s$ | 1250% |
| <font color="#fe437e">侵蚀</font> | 62.5% | 20 | 使敌人受到攻击时触发一次<font color="#fe437e">以太属性</font>异常伤害<br />触发间隔为 $0.5s$，持续 $10s$ | 1250% |
| <font color="#a6c5fd">风化</font> | 1250% | 1 | 使敌人受到的<font color="#a6c5fd">**风属性**</font>**直接攻击伤害**提升 $10\%$，持续 $30s$<br /><font color="#a6c5fd">侵染</font>：使敌人受到的首次接触的**非风属性的直接攻击伤害**提升 $10\%$，重新<font color="#a6c5fd">风化</font>后重置 | 1250% |

---

## 异化

> <font color="#ffa9dd">流明属性</font>代理人的部分攻击可以直接为敌人施加<font color="#ffa9dd">**流明**</font>**积蓄点**，若敌人身上有<font color="#ffa9dd">流明</font>积蓄点，在即将进入异常状态时，该异常状态会被<font color="#ffa9dd">异化</font>，[<font color="#ffa9dd">异化</font>]后该异常状态的**异常效果强度**会根据<font color="#ffa9dd">流明</font>积蓄点提供者的<font color="#ffa9dd">**异化**</font>**系数**进行强化，此次异常状态所能造成的总伤害会随之提升
>
> <font color="#ffa9dd">异化</font>伤害始终被认为是<font color="#ffa9dd">流明</font>积蓄点施加者触发

$$
\begin{align*}
	异化系数 & = 流明属性积蓄点施加者的异常精通 \times 0.02\% + 异化度提升\% \\
	\\
    异化伤害 & = 通用伤害(攻击力，异常属性倍率) \times \frac{异常精通}{100} \times 防御区 \\
    	& \times trunc(1 + \frac{\text{等级} - 1}{59}, 4) \\
    	& \times (1 + 异常增伤\% + 异常易伤\%) \\
    	& \times (1 + 异化系数\%)
\end{align*}
$$

> <font color="#ffa9dd">流明属性</font>代理人会根据队伍中下一位代理人的基础属性进行**属性流变**，属性流变后，代理人造成<font color="#ffa9dd">流明属性</font>伤害时，会视为造成属性流变目标属性的属性伤害，但不会积累对应的属性异常积蓄值
>
> <font color="#ffa9dd">流明属性</font>为特殊的变种属性时会保留其原属性的性质，该效果并无实战意义

> 异化度：单次异化消耗<font color="#ffa9dd">流明</font>积蓄点的数量，当异化度为 $1/2/3/4$ 时将会额外获得 $0\%/20\%/35\%/40\%$ 的<font color="#ffa9dd">异化</font>系数
>

> <font color="#ffa9dd">异化</font>结算的异常效果将会继承原异常属性的效果，属于对应属性伤害

### 耀变

<font color="#ffa9dd">耀变</font>伤害是<font color="#ffa9dd">流明属性</font>代理人触发<font color="#ffa9dd">异化</font>反应后会记录本次异化反应的**异常效果强度**，对敌人造成固定倍率的已储存的所有**虚曜**的属性异常伤害

> 异常效果强度：会记录本次异常状态的==加权施加者==的等级、攻击力、异常精通、穿透率、穿透值、无视抗性、增伤

$$
\begin{align*}
	耀变倍率 & = 固定倍率\% * (1 + 流明属性积蓄点施加者的异常精通 \times 0.2\%) \\
	\\
    耀变伤害 & = 通用伤害(攻击力，耀变倍率) \times \frac{异常精通}{100} \times 防御区 \\
    	& \times trunc(1 + \frac{\text{等级} - 1}{59}, 4) \\
    	& \times (1 + 异常增伤\% + 异常易伤\%) \\
    	& \times (1 + 异化系数\%)
\end{align*}
$$

> <font color="#ffa9dd">耀变</font>结算的异常效果将会继承原异常属性的效果，属于对应属性伤害，但无法享受对应的异常增伤，该效果不锁面板

---

## 异常积蓄值

> 角色造成**属性伤害**的同时，会累积对应属性的**异常积蓄值**
> 异常积蓄值累积到上限后，敌人将陷入**属性异常状态**，触发后一段时间内，该敌人不会再次陷入同属性的属性异常状态
> 属性异常状态的效果，和参与累积异常积蓄值的角色及其贡献有关

$$
\begin{align*}
    异常积蓄值 & = 基础积蓄值 \times \frac{异常掌控}{100} \\
    	& \times (1 + 积蓄效率提升\% - 积蓄效率降低\% + 积蓄值提升) \\
    	& \times (1 - 积蓄抗性提升\% + 积蓄抗性减少\%) \times 距离衰减区 \\
\\
    异常积蓄阈值(不包含风) & =
    \left|
	\begin{aligned}
    	a_1 & = 600, && 物理:a_1 = 720 \\
    	\\
    	a_n & = \lfloor a_{n-1} \times 1.02 \rfloor, && n \ge 2 \\
	\end{aligned}
	\right.
	\qquad (n为触发次数) \\
\\
    普通:精英:首领 & = 600:2250:3000
\end{align*}
$$

<font color="#a6c5fd">风属性</font>积蓄条仅前两次比标准积蓄条短

| 已触发次数 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9+ |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 普通敌人 | 600 | 612 | 624 | 636 | 648 | 660 | 673 | 686 | 699 | 712 |
| 精英敌人 | 2250 | 2295 | 2340 | 2386 | 2433 | 2481 | 2530 | 2580 | 2631 | 2683 |
| 首领敌人 | 3000 | 3060 | 3121 | 3183 | 3246 | 3310 | 3376 | 3443 | 3511 | 3581 |
| <font color="#f0d12b">普通敌人(物理)</font> | <font color="#f0d12b">720</font>  | <font color="#f0d12b">734</font>  | <font color="#f0d12b">748</font>  | <font color="#f0d12b">762</font>  | <font color="#f0d12b">777</font>  | <font color="#f0d12b">792</font>  | <font color="#f0d12b">807</font>  | <font color="#f0d12b">823</font>  | <font color="#f0d12b">839</font>  | <font color="#f0d12b">855</font>  |
| <font color="#f0d12b">精英敌人(物理)</font> | <font color="#f0d12b">2700</font> | <font color="#f0d12b">2754</font> | <font color="#f0d12b">2809</font> | <font color="#f0d12b">2865</font> | <font color="#f0d12b">2922</font> | <font color="#f0d12b">2980</font> | <font color="#f0d12b">3039</font> | <font color="#f0d12b">3099</font> | <font color="#f0d12b">3160</font> | <font color="#f0d12b">3223</font> |
| <font color="#f0d12b">首领敌人(物理)</font> | <font color="#f0d12b">3600</font> | <font color="#f0d12b">3672</font> | <font color="#f0d12b">3745</font> | <font color="#f0d12b">3819</font> | <font color="#f0d12b">3895</font> | <font color="#f0d12b">3972</font> | <font color="#f0d12b">4051</font> | <font color="#f0d12b">4132</font> | <font color="#f0d12b">4214</font> | <font color="#f0d12b">4298</font> |
| <font color="#a6c5fd">普通敌人(风)</font> | <font color="#a6c5fd">300</font>  | <font color="#a6c5fd">500</font>  | <font color="#a6c5fd">624</font>  | <font color="#a6c5fd">636</font>  | <font color="#a6c5fd">648</font>  | <font color="#a6c5fd">660</font>  | <font color="#a6c5fd">673</font>  | <font color="#a6c5fd">686</font>  | <font color="#a6c5fd">699</font>  | <font color="#a6c5fd">712</font>  |
| <font color="#a6c5fd">精英敌人(风)</font> | <font color="#a6c5fd">1150</font> | <font color="#a6c5fd">2000</font> | <font color="#a6c5fd">2340</font> | <font color="#a6c5fd">2386</font> | <font color="#a6c5fd">2433</font> | <font color="#a6c5fd">2481</font> | <font color="#a6c5fd">2530</font> | <font color="#a6c5fd">2580</font> | <font color="#a6c5fd">2631</font> | <font color="#a6c5fd">2683</font> |
| <font color="#a6c5fd">首领敌人(风)</font> | <font color="#a6c5fd">1500</font> | <font color="#a6c5fd">2700</font> | <font color="#a6c5fd">3121</font> | <font color="#a6c5fd">3183</font> | <font color="#a6c5fd">3246</font> | <font color="#a6c5fd">3310</font> | <font color="#a6c5fd">3376</font> | <font color="#a6c5fd">3443</font> | <font color="#a6c5fd">3511</font> | <font color="#a6c5fd">3581</font> |

> 实际上部分敌人的异常条比标准异常条要长，因此实际的异常积蓄值需要乘算**异常条系数**

---

## 异放

异放是一种特殊的结算异常属性影响下的敌人的伤害方式，此类攻击不会影响当前异常状态
$$
\begin{align*}
	异放倍率 & = 异常属性倍率 \times 代理人技能描述比例 \\
	\\
    异放伤害 & = 通用伤害(攻击力，异放倍率) \times \frac{异常精通}{100} \times 防御区 \\
    	& \times trunc(1 + \frac{\text{等级} - 1}{59}, 4) \\
    	& \times (1 + 异常增伤\% + 异常易伤\%) \\
    	& \times (1 + 异化系数\%)
\end{align*}
$$

部分代理人的异放结算为固定倍率，直接查询即可，以下列出需要换算的代理人的异放倍率

| 属性 | 倍率 | 格莉丝 | 柏妮思 | 薇薇安 | 爱芮 | 南宫羽 |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| <font color="#f0d12b">物理</font> | <font color="#f0d12b">713%</font> | <font color="#f0d12b">356.5%</font> | <font color="#f0d12b">285.2%</font> | <font color="#f0d12b">0.53475% / 精通</font> | <font color="#f0d12b">1.9251% / 初始掌控</font> | <font color="#f0d12b">449.19%</font> |
| <font color="#98eff0">冰</font> | <font color="#98eff0">500%</font> | <font color="#98eff0">350%</font> | <font color="#98eff0">300%</font> | <font color="#98eff0">0.54% / 精通</font> | <font color="#98eff0">1.9% / 初始掌控</font> | <font color="#98eff0">450%</font> |
| <font color="#ff5521">火</font> | <font color="#ff5521">50%</font> | <font color="#ff5521">350%</font> | <font color="#ff5521">300%</font> | <font color="#ff5521">0.4% / 精通</font> | <font color="#ff5521">1.88% / 初始掌控</font> | <font color="#ff5521">450%</font> |
| <font color="#2eb6ff">电</font> | <font color="#2eb6ff">125%</font> | <font color="#2eb6ff">350%</font> | <font color="#2eb6ff">300%</font> | <font color="#2eb6ff">0.4% / 精通</font> | <font color="#2eb6ff">1.8875% / 初始掌控</font> | <font color="#2eb6ff">450%</font> |
| <font color="#fe437e">以太</font> | <font color="#fe437e">62.5%</font> | <font color="#fe437e">350%</font> | <font color="#fe437e">300%</font> | <font color="#fe437e">0.384375% / 精通</font> | <font color="#fe437e">1.8125% / 初始掌控</font> | <font color="#fe437e">450%</font> |
| <font color="#a6c5fd">风</font> | <font color="#a6c5fd">1250%</font> | <font color="#a6c5fd">350%</font> | <font color="#a6c5fd">300%</font> | <font color="#a6c5fd">0.4% / 精通</font> | <font color="#a6c5fd">1.75% / 初始掌控</font> | <font color="#a6c5fd">450%</font> |

> 异放结算的异常效果将会继承原异常属性的效果，属于对应属性伤害

---

## 紊乱

> 对已经陷入==属性异常状态==的敌人，再次施加其他类型的属性异常效果时，将覆盖原本的状态，并触发**紊乱**效果
> 触发后 $3s$ 内，无法再次触发紊乱效果
> 紊乱效果能够基于原本的状态进行结算，额外造成伤害并累积失衡值

$$
\begin{align*}
    紊乱倍率 & = 450 \% +
    \left|
	\begin{aligned}
        & 7.5\% \times \lfloor t \rfloor && 畏缩 \\
        \\
        & 7.5\% \times \lfloor t \rfloor && 霜寒 \\
        \\
        & 75\% \times \lfloor t + 2 \rfloor && 霜寒·烈霜 \\
        \\
        & 50\% \times \lfloor \frac{t}{0.5} \rfloor && 灼烧 \\
        \\
        & 125\% \times \lfloor t \rfloor && 感电 \\
        \\
        & 62.5\% \times \lfloor \frac{t}{0.5} \rfloor && 侵蚀 \\
	\end{aligned}
	\right.
	\qquad (t为剩余时间) \\
	\\
	紊乱伤害 & = 通用伤害(攻击力，紊乱倍率) \times \frac{异常精通}{100} \times 防御区 \\
    	& \times trunc(1 + \frac{\text{等级} - 1}{59}, 4) \\
    	& \times (1 + 异常增伤\% + 异常易伤\%) \\
    	& \times (1 + 异化系数\%) \\
    \\
    失衡倍率 & = 200\% \\
\end{align*}
$$

> 紊乱结算的异常效果将会继承原异常属性的效果，属于对应属性伤害，但无法享受对应的异常增伤

### 极性紊乱

|                   属性                    |                 紊乱总倍率                 |                     柳                      |                    南宫羽                    |
| :---------------------------------------: | :----------------------------------------: | :-----------------------------------------: | :------------------------------------------: |
| <font color="#f0d12b">物理</font> | <font color="#f0d12b">525%</font>  | <font color="#f0d12b">78.75%</font> | <font color="#f0d12b">131.25%</font> |
|  <font color="#98eff0">冰</font>  | <font color="#98eff0">525%</font>  | <font color="#98eff0">78.75%</font> | <font color="#98eff0">131.25%</font> |
| <font color="#98eff0">烈霜</font> | <font color="#98eff0">2100%</font> |  <font color="#98eff0">315%</font>  |  <font color="#98eff0">525%</font>   |
|  <font color="#ff5521">火</font>  | <font color="#ff5521">1450%</font> | <font color="#ff5521">217.5%</font> | <font color="#ff5521">362.5%</font>  |
|  <font color="#2eb6ff">电</font>  | <font color="#2eb6ff">1700%</font> |  <font color="#2eb6ff">255%</font>  |  <font color="#2eb6ff">425%</font>   |
| <font color="#fe437e">以太</font> | <font color="#fe437e">1700%</font> |  <font color="#fe437e">255%</font>  |  <font color="#fe437e">425%</font>   |
|  <font color="#a6c5fd">风</font>  |                     -                      |  <font color="#a6c5fd">15%</font>   |   <font color="#a6c5fd">25%</font>   |

> 上述倍率为完美结算后的倍率
> 柳的核心被动会使上述极性紊乱倍率固定增加 $37.5\%$ 且天赋中 $3200\% × 异常精通$ 视为额外提升部分

---

## 乱流

>对已经陷入==属性异常状态==的敌人，再次施加其他类型的属性异常效果时，若其中一种异常效果为<font color="#a6c5fd">风化</font>，将不触发==紊乱==效果，而改为触发**乱流**效果：触发时，对<font color="#a6c5fd">风化</font>外的另一种属性异常状态进行结算，造成对应属性的范围异常伤害
>乱流效果始终被认为是<font color="#a6c5fd">风化</font>状态施加者触发
>触发乱流后的 $3s$ 内，无法再次触发乱流效果

$$
\begin{align*}
    乱流伤害倍率 &=
    \left|
    \begin{aligned}
        & 800\% + 7.5\% \times \lfloor t \rfloor && 强击 \\
        \\
        & 1300\% + 7.5\% \times \lfloor t \rfloor && 碎冰 \\
        \\
        & 0\% + 75\% \times \lfloor t \rfloor && 碎冰·烈霜 \\
        \\
        & 900\% + 50\% \times \lfloor \frac{t}{0.5} \rfloor && 灼烧 \\
        \\
        & 650\% + 125\% \times \lfloor t \rfloor && 感电 \\
        \\
        & 650\% + 62.5\% \times \lfloor \frac{t}{0.5} \rfloor && 侵蚀
    \end{aligned}
    \right.
    \qquad (t为剩余时间) \\
    \\
	乱流伤害 & = 通用伤害(攻击力，乱流倍率) \times \frac{异常精通}{100} \times 防御区 \\
    	& \times trunc(1 + \frac{\text{等级} - 1}{59}, 4) \\
    	& \times (1 + 异常增伤\% + 异常易伤\%) \\
    	& \times (1 + 异化系数\%)
\end{align*}
$$

| 异常类型 | 基础总倍率 | 乱流总倍率 |
| :-: | :-: | :-: |
| <font color="#f0d12b">强击</font> | <font color="#f0d12b">713%</font> | <font color="#f0d12b">1588%</font> |
| <font color="#98eff0">碎冰</font> | <font color="#98eff0">500%</font> | <font color="#98eff0">1875%</font> |
| <font color="#98eff0">碎冰·烈霜</font> | <font color="#98eff0">500%</font> | <font color="#98eff0">2000%</font> |
| <font color="#ff5521">灼烧</font> | <font color="#ff5521">1000%</font> | <font color="#ff5521">1900%</font> |
| <font color="#2eb6ff">感电</font> | <font color="#2eb6ff">1250%</font> | <font color="#2eb6ff">1900%</font> |
| <font color="#fe437e">侵蚀</font> | <font color="#fe437e">1250%</font> | <font color="#fe437e">1900%</font> |

> 乱流结算的异常效果将会继承原异常属性的效果，属于对应属性伤害

---

## 加权规则

对于==异常伤害==、==异常积蓄==和==紊乱失衡积蓄==来说，最后结算时会按照此刻攻击的贡献所占对应状态的百分比参与结算
$$
积蓄值百分比 = \frac{此刻攻击积蓄值}{总积蓄值 - 邦布累计积蓄值} \times 100\%
$$

> 异常伤害参与加权的属性有：等级、攻击力、异常精通、穿透率、穿透值、无视抗性、增伤区、异常增伤区

>异常积蓄参与加权的属性有：异常积蓄值

>紊乱失衡积蓄参与加权的属性有：等级  $(1 + 0.0075 \times lv)$  、冲击力、失衡效率区

---

## 失衡值

当敌人受到攻击时会累积**失衡值**，失衡值累积到一定程度后，敌人会陷入失衡状态
$$
\begin{align*}
    失衡值 & = 冲击力 \times 失衡倍率 \times (1 - 失衡抗性\%) \\
        & \times (1 + 造成的失衡值提升\% - 造成的失衡值降低\%) \\
        & \times (1 + 受到的失衡值提升\% - 受到的失衡值降低\%) \\
        & \times 距离衰减区
\end{align*}
$$
>各乘区可以**统计的数值**上下限：
>
>冲击力：$[0, 1000]$
>失衡抗性区：$[-1, 1]$
>失衡值提升区：$[-1, 3]$
>受到失衡值提升区：$[-1, 3]$

---

## 能量与喧响

$$
能量回复值 = (能量自动回复 \times 时间 + 固定能量获得) \times (1 + 能量获得效率\%)
$$

> 各乘区可以**统计的数值**上下限：
>
> 能量获得效率区：$[-1, 2]$

> 基础能量自动回复由白值 $0/1/1.2/1.56/2$ 与 $(1 + 驱动盘2件套\% + 驱动盘主词条\% + 音擎高级属性\%)$ 相乘，同三大基础属性
>
> 仅有处于**接战状态**的代理人才可以触发**能量自动回复**，且全队角色共享接战状态
> 固定能量获取一般为代理人的攻击与敌人被击败后掉落的能量球

> **闪能**与**能量**实际上是同一机制的不同名词，因此可以享受上述机制

$$
喧响回复值 = 基础喧响值 \times (1 + 喧响值获得效率\%) \times 伴随获得效率\%
$$

> 各乘区可以**统计的数值**上下限：
>
> 喧响值获得效率区：$[-1, 2]$

> 基础喧响值获取一般为代理人的攻击与敌人不同的交互

|  特殊动作  | 破招 |  连携   | 极限闪避 | 部位破坏 | 招架/回避/快速 支援 | 异常：普通/精英/首领 | 紊乱/乱流：普通/精英/首领 |
| :--------: | :--: | :-----: | :------: | :------: | :-----------------: | :------------------: | :-----------------------: |
| 基础喧响值 |  10  | 10 / 次 |    20    |    20    |   215 / 215 / 20    |    35 / 125 / 170    |       15 / 65 / 85        |

> 一般来说攻击或特殊动作的触发者的**伴随获得效率**为 $100\%$，而其他代理人为 $50\%$
>  ==可琳==、==比利==、==悠真==、==伯妮思==、==朱鸢==的伴随获得效率为 $52.5\%$
>  而对于代理人通过特殊效果如时光切片的被动、星见雅的影画[皲裂]、危局强袭战中对未知复合侵蚀体触发腿部[部位破坏]等方式获得额外的喧响值时，则不会被其他代理人伴随获得喧响值

---

## 距离衰减区

目前只有部分代理人会受到该乘区影响：默认型、格莉丝型、扳机型、耀嘉音型
$$
\begin{align*}
    \text{距离衰减区} =
    \left|
    \begin{aligned}
        & 25\% + 25\% \times \lfloor \frac{d-15}{5} \rfloor && d \geq 15\,m && 比利、丽娜、朱鸢等 \\
        \\
        & 30\% && d \geq 15\,m && 格莉丝 \\
        \\
        & 100\% && && 其他代理人
    \end{aligned}
    \right.
    \qquad (d为敌我距离)
\end{align*}
$$
