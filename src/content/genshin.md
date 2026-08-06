## 防御力 抗性

通用抗性公式：

$$
抗性系数 = 
\left|
\begin{aligned}
	& 1 - \frac{抗性}{2} & 抗性 \leqslant 0 \\
	& 1 - 抗性 & 0 \leqslant 抗性 \leqslant 75\% \\
	& \frac{1}{4 \times 抗性 + 1} & 75\% \leqslant 抗性
\end{aligned}
\right.
$$

角色攻击敌人时的防御系数：

$$
防御系数 = \frac{角色等级 + 100}{(角色等级 + 100) + (敌人等级 + 100) \times (1 - 减防) \times (1 - 无视防御)}
$$
（来自角色的减防不能超过 $90\%$ ，无视防御不能超过 $100\%$）

敌人攻击角色时的防御系数：

$$
防御系数 = \frac{5 \times 敌人等级 + 500}{5 \times 敌人等级 + 500 + 角色防御}
$$

---

## 常规伤害

角色造成的常规伤害：

$$
\begin{aligned} 
最终伤害 & = (基础属性 \times 倍率 \times 倍率增幅\% + 激化值 + 基础值加成) \\
	& \times (1 + 增伤\% + 易伤\% - 减伤\%) \\
	& \times 抗性系数 \times 防御系数 \\
	& \times 暴击区 \times 蒸发融化系数
\end{aligned}
$$

注：若攻击没有出现伤害数字（例如命中**护盾**），则本次伤害**不会计算蒸发融化系数**

**倍率增幅**：描述中带有【造成原本 **X%**的伤害】的效果
**基础值加成**：描述中带有【造成的伤害提高 **X**】的效果

**增伤**：描述中带有【我方造成的伤害提升 **X%**】的效果
**易伤**：描述中带有【目标受到的伤害提升 **X%**】的效果
**减伤**：描述中带有【目标受到的伤害降低 **X%**】的效果

**激化值**：见【激化反应】章节
**蒸发融化系数**：见【增幅反应】章节

---

## 增幅反应

增幅反应包括：蒸发、融化
触发增幅反应时，会为本次伤害附加**蒸发融化系数**（完整公式见【常规伤害】章节）
若攻击没有出现伤害数字（例如命中**护盾**），则本次伤害不会计算**蒸发融化系数**
$$
\begin{aligned}
	蒸发融化系数 &= 基础系数 \times ( 1 + \frac{2.78 \times 元素精通}{元素精通 + 1400} + 反应增伤\%) \\
	\\
	基础系数 &= 
	\left|
	\begin{aligned}
		& 2.0 & 蒸发 \ 水→火 \\
		& 2.0 & 融化 \ 火→冰 \\
		& 1.5 & 蒸发 \ 火→水 \\
		& 1.5 & 融化 \ 冰→火
	\end{aligned}
	\right.
\end{aligned}
$$

---

## 激化反应

当<span class="electro">**雷元素**</span>触及<span class="dendro">**草元素**</span>时，会按照 $1:1:1$ 的比例互相消耗并生成**原激化元素**
原激化元素可以发生<span class="dendro">绽放</span>和<span class="pyro">燃烧</span>反应，在这些反应中的表现**和**<span class="dendro">**草元素**</span>**相同**
原激化元素的持续时间：$(6+5\times元素量)$ 秒

<span class="electro">雷</span>和<span class="dendro">草</span>不共存，但原激化和<span class="electro">雷</span>、原激化和<span class="dendro">草</span>都可以共存
当**附着**<span class="electro">**雷**</span>/<span class="dendro">**草**</span>**元素的攻击**命中具有原激化的目标时，将分别引发<span class="electro">**超激化**</span>/<span class="dendro">**蔓激化**</span>反应，不消耗任何元素，但为本次伤害贡献**激化值**（完整公式见【常规伤害】章节）
$$
\begin{aligned}
	超激化值 &= 1446.85 \times 1.15 \times (1 + \frac{5 \times 元素精通}{元素精通 + 1200} + 超激化提高\%) \\
	\\
	蔓激化值 &= 1446.85 \times 1.25 \times (1 + \frac{5 \times 元素精通}{元素精通 + 1200} + 蔓激化提高\%)
\end{aligned}
$$

当敌人触发上述反应时，原本的 $1446.85$ 的数值有变化：
90级 $1202.81$ | 95级 $1411.74$ | 100级 $1674.81$
105级 $1884.98$ | 110级 $1963.85$

---

## 剧变反应

剧变反应包括：<span class="pyro">超载</span>、<span class="cryo">超导</span>、<span class="electro">感电</span>、<span class="pyro">燃烧</span>、碎冰、<span class="anemo">扩散</span>、<span class="dendro">绽放</span>、<span class="dendro">超绽放</span>、<span class="dendro">烈绽放</span>
剧变反应造成的伤害**不受益于常规增伤/易伤/减伤**，且**无视防御力**、**不能暴击**
$$
\begin{aligned}
	剧变基础 &= 1446.85 \times 反应倍率 \times ( 1 + \frac{16 \times 元素精通}{元素精通 + 2000} + 反应增伤\%) \\
	\\
	剧变伤害 &=  (剧变基础 + 额外提升) \times 抗性系数
\end{aligned}
$$

**额外提升**：梦见月瑞希一命、菈乌玛元素爆发（不受益于**精通增伤**、**反应增伤**）

反应倍率：
<span class="pyro">燃烧</span> $0.25$ （每 0.25s 一次）
<span class="anemo">扩散</span> $0.6$ | <span class="cryo">超导</span> $1.5$ | <span class="electro">感电</span> $2$
<span class="pyro">超载</span> $2.75$ | 碎冰 $3$
<span class="dendro">绽放</span> $2$ | <span class="dendro"> 超绽放 烈绽放 </span> $3$

触发剧变反应没有冷却，但剧变反应的**伤害有冷却**：
每 **0.5s** 最多 $1$ 次：<span class="pyro">超载</span>
每 **0.5s** 最多 $2$ 次：<span class="cryo">超导</span>、碎冰、<span class="anemo">扩散</span>、<span class="dendro">绽放</span>、<span class="dendro">超绽放</span>、<span class="dendro">烈绽放</span>

当敌人触发上述反应时，原本的 $1446.85$ 的数值有变化：
90级 $1202.81$ | 95级 $1411.74$ | 100级 $1674.81$
105级 $1884.98$ | 110级 $1963.85$

---

## 结晶反应

触发<span class="geo">**结晶**</span>反应时，会掉落对应<span class="pyro">火</span>/<span class="hydro">水</span>/<span class="electro">雷</span>/<span class="cryo">冰</span>元素的晶片，拾取后可获得护盾
结晶护盾对其自身属性的伤害有 $250\%$ 的吸收效率
$$
结晶盾量 = 1851.06 \times ( 1 + \frac{4.44 \times 元素精通}{元素精通 + 1400})
$$

角色具有护盾时，护盾量还会受**护盾强效**影响，护盾强效取决于持有护盾的角色，而非创造晶片的角色

---

## 月曜反应

*仅有==部分角色==在队伍里时才能转化月曜反应*

### 反应月伤害

$$
\begin{aligned} 
	反应基础 & = 1446.85 \times 反应倍率 \times (1 + 基础提升\%) \\
		& \times (1 + \frac{精通系数 \times 元素精通}{元素精通 + 2000} + 月反应增伤\%) \\
	\\
	单次月反应伤害 & = (反应基础 + 额外提升) \times 抗性系数 \times 暴击区 \times 擢升 \\
	\\
	最终伤害 & = \frac{3}{5} \times 伤害最高角色 + \frac{3}{10} \times 第二高角色 + \frac{1}{20} \times 第三高角色 + \frac{1}{20} \times 第四高角色
\end{aligned}
$$

**反应<span class="lunar-charged-electro">月感电</span>**：反应倍率：$3$，精通系数：$6$

> 特定情况下，<span class="electro">**雷**</span>触及<span class="hydro">**水**</span>时，会生成一片不可移动的**雷暴云**，持续 **6s**
> 雷暴云：每 **2s** 攻击一次附近所有**同时具有**<span class="electro">**雷**</span>和<span class="hydro">**水**</span>的目标，并消耗 $0.4U$ 的<span class="electro">雷</span>和<span class="hydro">水</span>（**破盾效率极低**）
> 触发<span class="lunar-charged-electro">月感电</span>时，若附近已有雷暴云，则会**刷新持续时间**
> <span class="lunar-charged-electro">月感电</span>**无视防御**，**可以暴击**（取决于每个角色自己的暴击率和暴击伤害）

**反应<span class="lunar-bloom-dendro">月绽放</span>**：反应倍率为：<span class="dendro"> 绽放 </span> $2$ | <span class="dendro"> 超绽放 烈绽放 </span> $3$，精通系数为：$16$

>特定情况下，<span class="dendro">**草**</span>触及<span class="hydro">**水**</span>时，会生成<span class="dendro">草原核</span>，并为队伍提供「**草露**」，可被特定角色消耗
><span class="dendro">草原核</span>伤害**不算**<span class="lunar-bloom-dendro">**月绽放**</span>**伤害**，<span class="lunar-bloom-dendro">月绽放</span>伤害**只包括直伤**
><span class="dendro">草原核</span>伤害仍为<span class="dendro">**绽放/烈绽放/超绽放伤害**</span>
><span class="dendro">草原核</span>无**最终伤害**计算

**反应**<span class="lunar-crystallize-geo">**月结晶**</span>：反应倍率：$1.6$，精通系数：$6$

>特定情况下，<span class="geo">**岩**</span>触及<span class="hydro">**水**</span>时，会生成三枚**月笼**
>每触发 $3$ 次<span class="lunar-crystallize-geo">月结晶</span>反应，三枚月笼各造成一次<span class="lunar-crystallize-geo">**月结晶**</span>**伤害**
><span class="lunar-crystallize-geo">月结晶</span>**无视防御**，**可以暴击**（取决于每个角色自己的暴击率和暴击伤害）

### 直伤月伤害

$$
\begin{aligned}
	直伤基础 & = 直伤系数 \times 属性值 \times 倍率 \times (1 + 基础提升\%) \\
		& \times (1 + \frac{6 \times 元素精通}{元素精通 + 2000} + 月反应增伤\%) \\
		& \times 倍率增幅\% \\
	\\
	最终直伤 & =  (直伤基础 + 额外提升) \times 抗性系数 \times 暴击区 \times 擢升
\end{aligned}
$$

> **直伤**<span class="lunar-charged-electro">**月感电**</span>：直伤系数为：$3$
>
> **直伤**<span class="lunar-bloom-dendro">**月绽放**</span>：直伤系数为：$1$
>
> **直伤**<span class="lunar-crystallize-geo">**月结晶**</span>：直伤系数为：$1.6$

---

## 星烁反应

*仅有==部分角色==在队伍里时才能转化星反应*

### 反应星伤害

$$
\begin{aligned} 
	反应基础 & = 1446.85 \times 反应倍率 \times (1 + 基础提升\%) \\
		& \times (1 + \frac{6 \times 元素精通}{元素精通 + 2000} + 星反应增伤\%)\\
	\\
	单次星反应伤害 & = (反应基础 + 额外提升) \times 抗性系数 \times 暴击区 \times 擢升 \\
	\\
	最终伤害 & = \frac{3}{5} \times 伤害最高角色 + \frac{3}{10} \times 第二高角色 + \frac{1}{20} \times 第三高角色 + \frac{1}{20} \times 第四高角色
\end{aligned}
$$

**反应星超导**：反应倍率：$0$ 且不消耗额外提升次数

> 特定情况下，<span class="electro">**雷**</span>触及<span class="cryo">**冰**</span>时，会创造「星辉棱晶」，并将其附近的区域短暂变换为奇妙的「**极星辉域**」
> 极星辉域会每 **4s** 记录领域内的<span class="electro">雷</span>/<span class="cryo">冰</span>元素**附着次数之和**，记录上限为12次，持续 **4s**，重复触发时刷新持续时间

> 当记录次数为 $0/1/12$ 次时，会获得 $20\%/29\%/40\%$ 的<span class="electro">雷</span>/<span class="cryo">冰</span>元素增伤以及 $1/1.45/2.0$ 星超导系数
> 当记录次数大于1时，每多一次增加 $1\%$ <span class="electro">雷</span>/<span class="cryo">冰</span>元素增伤以及 $0.05$ 星超导系数
> 每次结束记录时会根据记录数增加<span class="electro">雷</span>/<span class="cryo">冰</span>元素伤害以及星超导反应系数，持续 4s

> 极星辉域内敌人物抗降低 $40\%$，持续 12s

**反应星扩散**：<span class="anemo">风属性</span>反应倍率：$0.75$，<span class="cryo">冰属性</span>反应倍率：$2$ | $3$

> 特定情况下，<span class="anemo">**风**</span>触及<span class="cryo">**冰**</span>时，会创造「星辉风旋」，**风旋**将在 **4.5s** 后引爆，造成一次<span class="stellar-swirl-cryo">冰属性星扩散反应伤害</span>，期间每次触发星扩散反应将造成一次<span class="stellar-swirl-anemo">风属性星扩散反应伤害</span>
> <span class="stellar-swirl-anemo">风属性星扩散反应伤害</span>的**最终伤害**中首位角色必定为<span class="anemo">风属性</span>角色
> <span class="stellar-swirl-cryo">冰属性星扩散反应伤害</span>的**最终伤害**中首位角色必定为<span class="cryo">冰属性</span>角色，次位必定为<span class="anemo">风属性</span>角色

> 每次触发星扩散反应时，**星辉风旋系数**会增加 $1$，最多增加至 $6$
> 风旋会在星辉风旋系数至少为 $3$ 时提升大小，并增加伤害范围与<span class="cryo">冰属性</span>反应倍率，当星辉风旋系数为 $6$ 时将提前引爆风团
> 风旋引爆时会为周围的敌人附着 $1U$ <span class="cryo">冰</span>并清空星辉风旋系数

> 星扩散**无视防御**，**可以暴击**（取决于每个角色自己的暴击率和暴击伤害）
> 「星辉风旋」爆炸后，还会短暂地赋予附近角色一次高跳能力

### 直伤星伤害

$$
\begin{aligned}
	直伤星伤害 & = 直伤系数 \times 攻击力 \times 倍率 \times (1 + 基础提升\%) \\
		& \times (1 + \frac{6 \times 元素精通}{元素精通 + 2000} + 星反应增伤\%) \\
		& \times 倍率增幅\% \\
	\\
	最终直伤 & =  (直伤基础 + 额外提升) \times 抗性系数 \times 暴击区 \times 擢升
\end{aligned}
$$

> 星超导系数会根据极星辉域记录的<span class="electro">雷</span>/<span class="cryo">冰</span>元素附着次数之和决定
>
> 星扩散系数为：$1$
