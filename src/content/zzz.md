> **特别说明：**
>
> 可统计的部分指该乘区括号内除了"1"之外的部分
> 代理人均为60级0画12技能等级

## 名词解析

> *抗性区*
>
> **增抗**：描述中带有【敌人的抗性增加 **X%**】的效果
> **减抗**：描述中带有【敌人的抗性减少 **X%**】的效果
> **抗穿**：描述中带有【无视敌人 **X%** 抗性】的效果

> *增伤区*
>
> **增伤**：描述中带有【我方造成的伤害提升 **X%**】的效果
> **弱伤**：描述中带有【我方造成的伤害降低 **X%**】的效果

> *易伤区*
>
> **易伤**：描述中带有【目标受到的伤害提升 **X%**】的效果
> **减伤**：描述中带有【目标受到的伤害降低 **X%**】的效果

> *独立乘区（常见的）*
>
> 失衡易伤区、直接攻击伤害、贯穿增伤区、异常增伤区

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
    直伤伤害 & = (攻击力 \times 技能倍率 + 额外提升) \\
        & \times 暴击区  \times 防御区 \times 失衡易伤区 \\
        & \times (1 - 增抗\% + 减抗\% + 抗穿\%) \\
        & \times (1 + 增伤\% - 弱伤\%) \\
        & \times (1 + 易伤\% - 减伤\%) \\
        & \times (1 + 直接攻击伤害\%) \\
        & \times 距离衰减区
\end{align*}
$$

---

## 命破伤害

命破职业的代理人会在核心天赋中写明**贯穿力**额外获得生命值的提升，而贯穿力默认仅有攻击力转化
$$
\begin{align*}
    贯穿力 & = \frac{生命值}{10} + \frac{3 \times 攻击力}{10}  \\
    \\
    命破伤害 & = (贯穿力 \times 技能倍率 + 额外提升) \\
    	& \times 暴击区 \times 失衡易伤区 \\
    	& \times (1 - 增抗\% + 减抗\% + 抗穿\%) \\
    	& \times (1 + 增伤\% - 弱伤\%) \\
    	& \times (1 + 易伤\% - 减伤\%) \\
    	& \times (1 + 贯穿增伤\% - 贯穿弱伤\%) \\
    	& \times (1 + 直接攻击伤害\%)
\end{align*}
$$

> 各乘区可以**统计的数值**上下限：
> 
> 贯穿增伤区：$[-0.8, 8]$

---

## 锐化伤害

锐化伤害不会享受原本的暴击区，转而使用锐化暴伤，且锐化伤害的暴击率可以突破 $100\%$ 并在暴击率超过 $100\%$ 时根据超出的部分额外判定是否造成一次额外伤害，该伤害效果完全等同原伤害

$$
\begin{align*}
	锐化暴伤 & = 1 + 120\% + 锐化暴伤提升\% \\
	\\
    锐化伤害 & = (防御力 \times 技能倍率 + 额外提升) \\
        & \times 锐化暴伤区  \times 防御区 \times 失衡易伤区 \\
        & \times (1 - 增抗\% + 减抗\% + 抗穿\%) \\
        & \times (1 + 增伤\% - 弱伤\%) \\
        & \times (1 + 易伤\% - 减伤\%) \\
        & \times (1 + 直接攻击伤害\%)
\end{align*}
$$

---

## 异常伤害

异常职业的代理人会根据每次**可以贡献异常积蓄的攻击**时获得的增益参与本次异常效果的结算，而非仅通过最后一次完成异常条的攻击的增益提高本次异常效果
$$
\begin{align*}
    异常伤害 & = (攻击力 \times 异常属性倍率 + 额外提升) \\
    	& \times \frac{异常精通}{100} \times 暴击区 \times 防御区 \times 失衡易伤区 \\
    	& \times trunc\left(1 + \frac{\text{等级} - 1}{59}, 4\right) \\
    	& \times (1 - 增抗\% + 减抗\% + 抗穿\%) \\
    	& \times (1 + 增伤\% - 弱伤\%) \\
    	& \times (1 + 易伤\% - 减伤\%) \\
    	& \times (1 + 异常增伤\% + 异常易伤\%) \\
    	& \times (1 + 异化系数\%)
\end{align*}
$$

> 各乘区可以**统计的数值**上下限：
>
> 异常精通区：$[0, 10]$
> 伤害等级区：$[1, 2]$
> 异常增伤区：$[-1, 2]$

> **异常增伤**包含了子类`紊乱增伤`、`异放增伤`和`乱流增伤`
> 触发后 $3s$ 内，无法再次触发同类异常效果

| 异常类型 | 倍率 | 次数 | 异常状态说明 | 总倍率 |
| :-: | :-: | :-: | :-: | :-: |
| <span class="physical">强击</span> | 713% | 1 | <span class="physical">畏缩</span>：使敌人受到的失衡值提升 $7.5\%$，持续 $10s$ | 713% |
| <span class="ice">碎冰</span> | 500% | 1 | <span class="ice">霜寒</span>：使敌人受到的暴击伤害提升 $10\%$，持续 $10s$<br /><span class="ice">冻结</span>敌人，最多 $3.5s$，解除<span class="ice">冻结</span>后触发<span class="ice">碎冰</span> | 500% |
| <span class="fire">灼烧</span> | 50% | 20 | 使敌人每 $0.5s$ 受到一次<span class="fire">火属性</span>异常伤害，持续 $10s$ | 1000% |
| <span class="electric">感电</span> | 125% | 10 | 使敌人受到攻击时触发一次<span class="electric">电属性</span>异常伤害<br />触发间隔为 $1s$，持续 $10s$ | 1250% |
| <span class="ether">侵蚀</span> | 62.5% | 20 | 使敌人受到攻击时触发一次<span class="ether">以太属性</span>异常伤害<br />触发间隔为 $0.5s$，持续 $10s$ | 1250% |
| <span class="wind">风化</span> | 1250% | 1 | 使敌人受到的<span class="wind">**风属性**</span>**直接攻击伤害**提升 $10\%$，持续 $30s$<br /><span class="wind">侵染</span>：使敌人受到的首次接触的**非风属性的直接攻击伤害**提升 $10\%$，重新<span class="wind">风化</span>后重置 | 1250% |

---

## 异化

> <span class="lumiflux">流明属性</span>代理人的部分攻击可以直接为敌人施加<span class="lumiflux">**流明**</span>**积蓄点**，若敌人身上有<span class="lumiflux">流明</span>积蓄点，在即将进入异常状态时，该异常状态会被<span class="lumiflux">异化</span>，[<span class="lumiflux">异化</span>]后该异常状态的**异常效果强度**会根据<span class="lumiflux">流明</span>积蓄点提供者的<span class="lumiflux">**异化**</span>**系数**进行强化，此次异常状态所能造成的总伤害会随之提升
>
> <span class="lumiflux">异化</span>伤害始终被认为是<span class="lumiflux">流明</span>积蓄点施加者触发

$$
\begin{align*}
	异化系数 & = 流明属性积蓄点施加者的异常精通 \times 0.02\% + 异化系数提升\% \\
	\\
	异化伤害 & = (攻击力 \times 异常属性倍率 + 额外提升) \\
    	& \times \frac{异常精通}{100} \times 暴击区 \times 防御区 \times 失衡易伤区 \\
    	& \times trunc\left(1 + \frac{\text{等级} - 1}{59}, 4\right) \\
    	& \times (1 - 增抗\% + 减抗\% + 抗穿\%) \\
    	& \times (1 + 增伤\% - 弱伤\%) \\
    	& \times (1 + 易伤\% - 减伤\%) \\
    	& \times (1 + 异常增伤\% + 异常易伤\%) \\
    	& \times (1 + 异化系数\%)
\end{align*}
$$

> <span class="lumiflux">流明属性</span>代理人会根据队伍中下一位代理人的基础属性进行**属性流变**，属性流变后，代理人造成<span class="lumiflux">流明属性</span>伤害时，会视为造成属性流变目标属性的属性伤害，但不会积累对应的属性异常积蓄值
>
> <span class="lumiflux">流明属性</span>为特殊的变种属性时会保留其原属性的性质，该效果并无实战意义

> <span class="lumiflux">异化</span>结算的异常效果将会继承原异常属性的效果，属于对应属性伤害

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

<span class="wind">风属性</span>积蓄条仅前两次比标准积蓄条短

| 已触发次数 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9+ |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 普通敌人 | 600 | 612 | 624 | 636 | 648 | 660 | 673 | 686 | 699 | 712 |
| 精英敌人 | 2250 | 2295 | 2340 | 2386 | 2433 | 2481 | 2530 | 2580 | 2631 | 2683 |
| 首领敌人 | 3000 | 3060 | 3121 | 3183 | 3246 | 3310 | 3376 | 3443 | 3511 | 3581 |
| <span class="physical">普通敌人(物理)</span> | <span class="physical">720</span>  | <span class="physical">734</span>  | <span class="physical">748</span>  | <span class="physical">762</span>  | <span class="physical">777</span>  | <span class="physical">792</span>  | <span class="physical">807</span>  | <span class="physical">823</span>  | <span class="physical">839</span>  | <span class="physical">855</span>  |
| <span class="physical">精英敌人(物理)</span> | <span class="physical">2700</span> | <span class="physical">2754</span> | <span class="physical">2809</span> | <span class="physical">2865</span> | <span class="physical">2922</span> | <span class="physical">2980</span> | <span class="physical">3039</span> | <span class="physical">3099</span> | <span class="physical">3160</span> | <span class="physical">3223</span> |
| <span class="physical">首领敌人(物理)</span> | <span class="physical">3600</span> | <span class="physical">3672</span> | <span class="physical">3745</span> | <span class="physical">3819</span> | <span class="physical">3895</span> | <span class="physical">3972</span> | <span class="physical">4051</span> | <span class="physical">4132</span> | <span class="physical">4214</span> | <span class="physical">4298</span> |
| <span class="wind">普通敌人(风)</span> | <span class="wind">300</span>  | <span class="wind">500</span>  | <span class="wind">624</span>  | <span class="wind">636</span>  | <span class="wind">648</span>  | <span class="wind">660</span>  | <span class="wind">673</span>  | <span class="wind">686</span>  | <span class="wind">699</span>  | <span class="wind">712</span>  |
| <span class="wind">精英敌人(风)</span> | <span class="wind">1150</span> | <span class="wind">2000</span> | <span class="wind">2340</span> | <span class="wind">2386</span> | <span class="wind">2433</span> | <span class="wind">2481</span> | <span class="wind">2530</span> | <span class="wind">2580</span> | <span class="wind">2631</span> | <span class="wind">2683</span> |
| <span class="wind">首领敌人(风)</span> | <span class="wind">1500</span> | <span class="wind">2700</span> | <span class="wind">3121</span> | <span class="wind">3183</span> | <span class="wind">3246</span> | <span class="wind">3310</span> | <span class="wind">3376</span> | <span class="wind">3443</span> | <span class="wind">3511</span> | <span class="wind">3581</span> |

> 实际上部分敌人的异常条比标准异常条要长，因此实际的异常积蓄值需要乘算**异常条系数**

---

## 异常提现伤害

异常伤害大多具有出伤后置的特点，而且随着环境的不断变化常规异常的出伤模式被多种条件所束缚，因此我们需要在能及时提现的新的异常伤害类型

> 我将异常伤害的各个乘区分为：施加者乘区、触发者乘区
>
> 施加者乘区：也就是`异常效果强度`，详细见[加权规则](## 加权规则)
> 触发者乘区：倍率、异常暴击区、减防与无视防御、抗性区、异常增伤区、易伤区等

> 已知4种提现异常伤害的伤害类型（<span class="disorder">紊乱</span>、<span class="abloom">异放</span>、<span class="wind">乱流</span>、<span class="lumiflux">耀变</span>）均遵循以下规则：
>
> 1. 触发异常效果后，以上伤害类型中施加者乘区的值不会根据队伍给予的增益的增缺而改变
> 2. 触发者乘区中



### 异放

<span class="abloom">异放</span>是一种特殊的结算异常属性影响下的敌人的伤害方式，此类攻击不会影响当前异常状态
$$
\begin{align*}
	异放倍率 & = 异常属性倍率 \times 代理人技能描述比例 \\
	\\
    异放伤害 & = (攻击力 \times 异放倍率 + 额外提升) \\
    	& \times \frac{异常精通}{100} \times 暴击区 \times 防御区 \times 失衡易伤区 \\
    	& \times trunc\left(1 + \frac{\text{等级} - 1}{59}, 4\right) \\
    	& \times (1 - 增抗\% + 减抗\% + 抗穿\%) \\
    	& \times (1 + 增伤\% - 弱伤\%) \\
    	& \times (1 + 易伤\% - 减伤\%) \\
    	& \times (1 + 异常增伤\% + 异常易伤\%) \\
    	& \times (1 + 异化系数\%)
\end{align*}
$$

部分代理人的<span class="abloom">异放</span>结算为固定倍率，直接查询即可，以下列出需要换算的代理人的<span class="abloom">异放</span>倍率

| 属性 | 倍率 | 格莉丝 | 柏妮思 | 薇薇安 | 爱芮 | 南宫羽 |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| <span class="physical">物理</span> | <span class="physical">713%</span> | <span class="physical">356.5%</span> | <span class="physical">285.2%</span> | <span class="physical">$0.53475\% \times 异常精通$</span> | <span class="physical">$1.9251\% \times 初始掌控$</span> | <span class="physical">449.19%</span> |
| <span class="ice">冰</span> | <span class="ice">500%</span> | <span class="ice">350%</span> | <span class="ice">300%</span> | <span class="ice">$0.54\% \times 异常精通$</span> | <span class="ice">$1.9\% \times 初始掌控$</span> | <span class="ice">450%</span> |
| <span class="fire">火</span> | <span class="fire">50%</span> | <span class="fire">350%</span> | <span class="fire">300%</span> | <span class="fire">$0.4\% \times 异常精通$</span> | <span class="fire">$1.88\% \times 初始掌控$</span> | <span class="fire">450%</span> |
| <span class="electric">电</span> | <span class="electric">125%</span> | <span class="electric">350%</span> | <span class="electric">300%</span> | <span class="electric">$0.4\% \times 异常精通$</span> | <span class="electric">$1.8875\% \times 初始掌控$</span> | <span class="electric">450%</span> |
| <span class="ether">以太</span> | <span class="ether">62.5%</span> | <span class="ether">350%</span> | <span class="ether">300%</span> | <span class="ether">$0.384375\% \times 异常精通$</span> | <span class="ether">$1.8125\% \times 初始掌控$</span> | <span class="ether">450%</span> |
| <span class="wind">风</span> | <span class="wind">1250%</span> | <span class="wind">350%</span> | <span class="wind">300%</span> | <span class="wind">$0.4\% \times 异常精通$</span> | <span class="wind">$1.75\% \times 初始掌控$</span> | <span class="wind">450%</span> |

### 耀变

<span class="lumiflux">耀变</span>伤害是<span class="lumiflux">流明属性</span>代理人触发<span class="lumiflux">异化</span>反应后会记录本次异化反应的**异常效果强度**，对敌人造成固定倍率的已储存的所有**<span class="lumiflux">虚耀</span>**的属性异常伤害
$$
\begin{align*}
	耀变倍率 & = 固定倍率\% \times (1 + 流明属性积蓄点施加者的异常精通 \times 0.2\%) \\
	\\
    耀变伤害 & = (攻击力 \times 耀变倍率 + 额外提升) \\
    	& \times \frac{异常精通}{100} \times 防御区 \times 失衡易伤区 \\
    	& \times trunc\left(1 + \frac{\text{等级} - 1}{59}, 4\right) \\
    	& \times (1 - 增抗\% + 减抗\% + 抗穿\%) \\
    	& \times (1 + 增伤\% - 弱伤\%) \\
    	& \times (1 + 易伤\% - 减伤\%) \\
    	& \times (1 + 异常增伤\% + 异常易伤\%) \\
    	& \times (1 + 异化系数\%)
\end{align*}
$$

---

## 紊乱

> 对已经陷入`属性异常状态`的敌人，再次施加其他类型的属性异常效果时，将覆盖原本的状态，并触发**<span class="disorder">紊乱</span>**效果
> 触发后 $3s$ 内，无法再次触发<span class="disorder">紊乱</span>效果
> <span class="disorder">紊乱</span>效果能够基于原本的状态进行结算，额外造成伤害并累积失衡值

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
    紊乱伤害 & = (攻击力 \times 紊乱倍率 + 额外提升) \\
    	& \times \frac{异常精通}{100} \times 防御区 \times 失衡易伤区 \\
    	& \times trunc\left(1 + \frac{\text{等级} - 1}{59}, 4\right) \\
    	& \times (1 - 增抗\% + 减抗\% + 抗穿\%) \\
    	& \times (1 + 增伤\% - 弱伤\%) \\
    	& \times (1 + 易伤\% - 减伤\%) \\
    	& \times (1 + 异常增伤\% + 异常易伤\%) \\
    	& \times (1 + 异化系数\%) \\
    \\
    失衡倍率 & = 200\% \\
\end{align*}
$$

> <span class="disorder">紊乱</span>是提取原**异常效果强度**与**剩余持续时间**，造成新的伤害类型

### 极性紊乱

|                   属性                    |                 <span class="disorder">紊乱总倍率</span>                 |                     柳                      |                    南宫羽                    |
| :---------------------------------------: | :----------------------------------------: | :-----------------------------------------: | :------------------------------------------: |
| <span class="physical">物理</span> | <span class="physical">525%</span>  | <span class="physical">78.75%</span> | <span class="physical">131.25%</span> |
|  <span class="ice">冰</span>  | <span class="ice">525%</span>  | <span class="ice">78.75%</span> | <span class="ice">131.25%</span> |
| <span class="frost">烈霜</span> | <span class="ice">2100%</span> |  <span class="ice">315%</span>  |  <span class="ice">525%</span>   |
|  <span class="fire">火</span>  | <span class="fire">1450%</span> | <span class="fire">217.5%</span> | <span class="fire">362.5%</span>  |
|  <span class="electric">电</span>  | <span class="electric">1700%</span> |  <span class="electric">255%</span>  |  <span class="electric">425%</span>   |
| <span class="ether">以太</span> | <span class="ether">1700%</span> |  <span class="ether">255%</span>  |  <span class="ether">425%</span>   |
|  <span class="wind">风</span>  |                     -                      |  <span class="wind">15%</span>   |   <span class="wind">25%</span>   |

> 上述倍率为完美结算后的倍率
> `柳`的核心被动会使上述<span class="disorder">极性紊乱</span>倍率固定增加 $37.5\%$ 且天赋中 $3200\% × 异常精通$ 视为**额外提升**部分

---

## 乱流

>对已经陷入`属性异常状态`的敌人，再次施加其他类型的属性异常效果时，若其中一种异常效果为<span class="wind">风化</span>，将不触发`紊乱`效果，而改为触发**<span class="wind">乱流</span>**效果：触发时，对<span class="wind">风化</span>外的另一种属性异常状态进行结算，造成对应属性的**范围**异常伤害
><span class="wind">乱流</span>效果始终被认为是<span class="wind">风化</span>状态施加者触发
>触发<span class="wind">乱流</span>后的 $3s$ 内，无法再次触发<span class="wind">乱流</span>效果

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
    乱流伤害 & = (攻击力 \times 乱流倍率 + 额外提升) \\
    	& \times \frac{异常精通}{100} \times 暴击区 \times 防御区 \times 失衡易伤区 \\
    	& \times trunc\left(1 + \frac{\text{等级} - 1}{59}, 4\right) \\
    	& \times (1 - 增抗\% + 减抗\% + 抗穿\%) \\
    	& \times (1 + 增伤\% - 弱伤\%) \\
    	& \times (1 + 易伤\% - 减伤\%) \\
    	& \times (1 + 异常增伤\% + 异常易伤\%) \\
    	& \times (1 + 异化系数\%)
\end{align*}
$$

| 异常类型 | 基础总倍率 | 乱流总倍率 |
| :-: | :-: | :-: |
| <span class="physical">强击</span> | <span class="physical">713%</span> | <span class="physical">1588%</span> |
| <span class="ice">碎冰</span> | <span class="ice">500%</span> | <span class="ice">1875%</span> |
| <span class="ice">碎冰·烈霜</span> | <span class="ice">500%</span> | <span class="ice">2000%</span> |
| <span class="fire">灼烧</span> | <span class="fire">1000%</span> | <span class="fire">1900%</span> |
| <span class="electric">感电</span> | <span class="electric">1250%</span> | <span class="electric">1900%</span> |
| <span class="ether">侵蚀</span> | <span class="ether">1250%</span> | <span class="ether">1900%</span> |

> <span class="wind">乱流</span>是基于原异常伤害类型提取出来的伤害，因此<span class="wind">乱流</span>的伤害类型**仍为原异常伤害的类型**

---

## 加权规则

对于==异常伤害==和==紊乱失衡==来说，最后结算时会按照此刻攻击的贡献所占对应状态的百分比参与结算
$$
积蓄值百分比 = \frac{此刻攻击积蓄值}{总积蓄值 - 邦布累计积蓄值} \times 100\%
$$

> 异常伤害积蓄时会记录**每次攻击时的异常效果强度**从而影响本次异常伤害
>
> 异常效果强度：施加者的属性、等级、攻击力、异常精通、穿透率、穿透值、增伤区、异化区

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
>  `可琳`、`比利`、`悠真`、`伯妮思`、`朱鸢`的伴随获得效率为 $52.5\%$
>  而对于代理人通过特殊效果如时光切片的被动、`星见雅`的影画[皲裂]、危局强袭战中对未知复合侵蚀体触发腿部[部位破坏]等方式获得额外的喧响值时，则不会被其他代理人伴随获得喧响值

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
