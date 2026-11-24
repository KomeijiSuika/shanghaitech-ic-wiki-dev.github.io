<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, withBase } from 'vitepress'
import { clusters, directions, directionById, type ClusterId } from '../../data/directions'
import { faculty } from '../../data/faculty'

const W = 1000
const H = 700
const CX = W / 2
const CY = H / 2
const R1 = { x: 215, y: 165 }
const R2 = { x: 395, y: 292 }

const router = useRouter()
const hovered = ref<string | null>(null)
const activeCluster = ref<ClusterId | null>(null)

const rad = (deg: number) => (deg * Math.PI) / 180

const labelWidth = (s: string) => [...s].reduce((w, ch) => w + (/[\x00-\x7f]/.test(ch) ? 8.4 : 14.6), 30)

const dirNodes = computed(() =>
  directions.map((d, i) => {
    const a = -90 + (360 / directions.length) * i
    return {
      ...d,
      key: 'd:' + d.id,
      angle: a,
      w: labelWidth(d.short),
      x: CX + R1.x * Math.cos(rad(a)),
      y: CY + R1.y * Math.sin(rad(a))
    }
  })
)

const dirAngle = (id: string) => dirNodes.value.find((d) => d.id === id)!.angle

// 外环：每位教授的目标角度 = 主方向角度（略偏向交叉方向），
// 再在圆周上做一维松弛，保证相邻节点不小于最小间距，使课题组团簇落在对应方向的延长线上。
const profNodes = computed(() => {
  const n = faculty.length
  const minGap = (360 / n) * 0.92
  const wrap = (a: number) => ((a % 360) + 360) % 360
  const target = (f: (typeof faculty)[number]) => {
    const p = dirAngle(f.dirs[0])
    if (!f.dirs[1]) return p
    let d = dirAngle(f.dirs[1]) - p
    if (d > 180) d -= 360
    if (d < -180) d += 360
    return p + Math.sign(d) * Math.min(Math.abs(d) * 0.25, minGap)
  }
  const items = faculty
    .map((f) => ({ f, want: target(f), a: target(f) }))
    .sort((x, y) => wrap(x.want + 90) - wrap(y.want + 90))
  // 展开为从 -90 开始的单调序列
  for (const it of items) it.a = -90 + wrap(it.want + 90)
  for (let iter = 0; iter < 400; iter++) {
    for (let i = 0; i < n; i++) {
      const cur = items[i]
      const next = items[(i + 1) % n]
      const nextA = i === n - 1 ? next.a + 360 : next.a
      const gap = nextA - cur.a
      if (gap < minGap) {
        const push = (minGap - gap) / 2
        cur.a -= push
        next.a += push
      }
    }
    // 轻微回拉到目标角度
    for (const it of items) it.a += (-90 + wrap(it.want + 90) - it.a) * 0.02
  }
  return items.map(({ f, a }) => {
    const x = CX + R2.x * Math.cos(rad(a))
    const y = CY + R2.y * Math.sin(rad(a))
    const right = Math.cos(rad(a)) >= 0
    return { ...f, key: 'p:' + f.name, angle: a, x, y, right }
  })
})

interface Edge {
  key: string
  from: string
  to: string
  d: string
  cluster: ClusterId
  primary: boolean
}

const edges = computed<Edge[]>(() => {
  const list: Edge[] = []
  for (const d of dirNodes.value) {
    list.push({
      key: 'c-' + d.id,
      from: 'center',
      to: d.key,
      d: `M${CX},${CY} L${d.x},${d.y}`,
      cluster: d.cluster,
      primary: true
    })
  }
  for (const p of profNodes.value) {
    p.dirs.forEach((id, i) => {
      const d = dirNodes.value.find((x) => x.id === id)
      if (!d) return
      const mx = (p.x + d.x) / 2
      const my = (p.y + d.y) / 2
      const qx = mx + (CX - mx) * 0.18
      const qy = my + (CY - my) * 0.18
      list.push({
        key: `e-${p.name}-${id}`,
        from: d.key,
        to: p.key,
        d: `M${d.x},${d.y} Q${qx},${qy} ${p.x},${p.y}`,
        cluster: d.cluster,
        primary: i === 0
      })
    })
  }
  return list
})

const neighbors = computed(() => {
  const m = new Map<string, Set<string>>()
  const add = (a: string, b: string) => {
    if (!m.has(a)) m.set(a, new Set([a]))
    m.get(a)!.add(b)
  }
  for (const e of edges.value) {
    add(e.from, e.to)
    add(e.to, e.from)
  }
  return m
})

function nodeCluster(key: string): ClusterId | null {
  if (key.startsWith('d:')) return directionById[key.slice(2)]?.cluster ?? null
  if (key.startsWith('p:')) {
    const f = faculty.find((x) => 'p:' + x.name === key)
    return f ? directionById[f.dirs[0]]?.cluster ?? null : null
  }
  return null
}

function isLit(key: string): boolean {
  if (hovered.value) return neighbors.value.get(hovered.value)?.has(key) ?? key === hovered.value
  if (activeCluster.value) {
    if (key === 'center') return true
    if (key.startsWith('p:')) {
      const f = faculty.find((x) => 'p:' + x.name === key)
      return !!f?.dirs.some((d) => directionById[d]?.cluster === activeCluster.value)
    }
    return nodeCluster(key) === activeCluster.value
  }
  return true
}

function edgeLit(e: Edge): boolean {
  if (hovered.value) return e.from === hovered.value || e.to === hovered.value
  if (activeCluster.value) return e.cluster === activeCluster.value
  return true
}

const info = computed(() => {
  const k = hovered.value
  if (!k || k === 'center') return null
  if (k.startsWith('d:')) {
    const d = directionById[k.slice(2)]
    const n = faculty.filter((f) => f.dirs.includes(d.id)).length
    return { title: d.name, sub: `${clusters.find((c) => c.id === d.cluster)?.name} · ${n} 位相关教授`, body: d.summary, hint: '点击查看方向介绍' }
  }
  const f = faculty.find((x) => 'p:' + x.name === k)!
  return {
    title: `${f.name} ${f.title}`,
    sub: f.lab ?? f.center,
    body: f.focus,
    hint: '点击打开课题组 / 个人主页'
  }
})

function openDir(link: string) {
  router.go(withBase(link))
}
function openProf(url: string) {
  window.open(url, '_blank', 'noopener')
}
</script>

<template>
  <div class="topo">
    <div class="topo-legend">
      <button :class="{ on: !activeCluster }" @click="activeCluster = null">全部</button>
      <button
        v-for="c in clusters"
        :key="c.id"
        :class="['c-' + c.id, { on: activeCluster === c.id }]"
        @click="activeCluster = activeCluster === c.id ? null : c.id"
      >
        <i />{{ c.name }}
      </button>
      <span class="topo-hint">实线：主方向 · 虚线：交叉方向</span>
    </div>
    <div class="topo-canvas">
      <svg :viewBox="`0 0 ${W} ${H}`" role="img" aria-label="上科大 IC 科研方向与课题组拓扑图">
        <defs>
          <radialGradient id="topo-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ec725e" />
            <stop offset="100%" stop-color="#b33255" />
          </radialGradient>
        </defs>
        <ellipse :cx="CX" :cy="CY" :rx="R1.x" :ry="R1.y" class="ring" />
        <ellipse :cx="CX" :cy="CY" :rx="R2.x" :ry="R2.y" class="ring ring--outer" />

        <g class="edges">
          <path
            v-for="e in edges"
            :key="e.key"
            :d="e.d"
            :class="['edge', 'c-' + e.cluster, { dashed: !e.primary, dim: !edgeLit(e) }]"
          />
        </g>

        <g
          v-for="p in profNodes"
          :key="p.key"
          :class="['prof', 'c-' + directionById[p.dirs[0]].cluster, { dim: !isLit(p.key) }]"
          :transform="`translate(${p.x},${p.y})`"
          tabindex="0"
          @mouseenter="hovered = p.key"
          @mouseleave="hovered = null"
          @focus="hovered = p.key"
          @blur="hovered = null"
          @click="openProf(p.site ?? p.home)"
          @keydown.enter="openProf(p.site ?? p.home)"
        >
          <circle r="6.5" />
          <text
            :x="p.right ? 11 : -11"
            :text-anchor="p.right ? 'start' : 'end'"
            dy="0.35em"
          >{{ p.name }}</text>
        </g>

        <g
          v-for="d in dirNodes"
          :key="d.key"
          :class="['dir', 'c-' + d.cluster, { dim: !isLit(d.key) }]"
          :transform="`translate(${d.x},${d.y})`"
          tabindex="0"
          @mouseenter="hovered = d.key"
          @mouseleave="hovered = null"
          @focus="hovered = d.key"
          @blur="hovered = null"
          @click="openDir(d.link)"
          @keydown.enter="openDir(d.link)"
        >
          <rect :x="-d.w / 2" y="-15" :width="d.w" height="30" rx="15" />
          <text text-anchor="middle" dy="0.36em">{{ d.short }}</text>
        </g>

        <g
          class="core"
          :transform="`translate(${CX},${CY})`"
          @mouseenter="hovered = 'center'"
          @mouseleave="hovered = null"
        >
          <circle r="46" fill="url(#topo-core)" />
          <circle r="54" class="core-halo" />
          <text text-anchor="middle" y="-4" class="core-t1">ShanghaiTech</text>
          <text text-anchor="middle" y="16" class="core-t2">IC</text>
        </g>
      </svg>
      <transition name="fade">
        <div v-if="info" class="topo-info">
          <strong>{{ info.title }}</strong>
          <span class="sub">{{ info.sub }}</span>
          <p>{{ info.body }}</p>
          <span class="hint">{{ info.hint }}</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.topo {
  margin: 20px 0;
}
.topo-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
}
.topo-legend button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  transition: all 0.15s;
}
.topo-legend button i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: currentColor;
}
.topo-legend button.c-device { color: var(--stic-cluster-device); }
.topo-legend button.c-circuit { color: var(--stic-cluster-circuit); }
.topo-legend button.c-system { color: var(--stic-cluster-system); }
.topo-legend button.c-eda { color: var(--stic-cluster-eda); }
.topo-legend button.on {
  border-color: currentColor;
  box-shadow: inset 0 0 0 1px currentColor;
  font-weight: 600;
}
.topo-hint {
  margin-left: auto;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.topo-canvas {
  position: relative;
  border: 1px solid var(--stic-card-border);
  border-radius: 16px;
  background:
    radial-gradient(circle at 50% 50%, var(--vp-c-brand-soft), transparent 60%),
    var(--stic-card-bg);
  overflow-x: auto;
}
svg {
  display: block;
  width: 100%;
  min-width: 680px;
  height: auto;
  font-family: var(--vp-font-family-base);
}
.ring {
  fill: none;
  stroke: var(--vp-c-divider);
  stroke-dasharray: 2 6;
}
.ring--outer {
  stroke-dasharray: 1 8;
}
.edge {
  fill: none;
  stroke-width: 1.3;
  opacity: 0.55;
  transition: opacity 0.2s, stroke-width 0.2s;
}
.edge.dashed {
  stroke-dasharray: 4 4;
  stroke-width: 1;
  opacity: 0.35;
}
.edge.dim {
  opacity: 0.06;
}
.c-device { --node: var(--stic-cluster-device); --node-soft: var(--stic-cluster-device-soft); }
.c-circuit { --node: var(--stic-cluster-circuit); --node-soft: var(--stic-cluster-circuit-soft); }
.c-system { --node: var(--stic-cluster-system); --node-soft: var(--stic-cluster-system-soft); }
.c-eda { --node: var(--stic-cluster-eda); --node-soft: var(--stic-cluster-eda-soft); }
.edge { stroke: var(--node); }

.prof, .dir, .core {
  cursor: pointer;
  outline: none;
  transition: opacity 0.2s;
}
.prof circle {
  fill: var(--vp-c-bg);
  stroke: var(--node);
  stroke-width: 2.2;
  transition: r 0.2s;
}
.prof:hover circle,
.prof:focus circle {
  fill: var(--node);
}
.prof text {
  font-size: 13px;
  fill: var(--vp-c-text-1);
  font-weight: 500;
}
.dir rect {
  fill: var(--vp-c-bg);
  stroke: var(--node);
  stroke-width: 1.6;
  transition: fill 0.2s;
}
.dir text {
  font-size: 14px;
  font-weight: 700;
  fill: var(--node);
}
.dir:hover rect,
.dir:focus rect {
  fill: var(--node);
}
.dir:hover text,
.dir:focus text {
  fill: #fff;
}
.dim {
  opacity: 0.18;
}
.core-halo {
  fill: none;
  stroke: rgba(186, 63, 92, 0.35);
  stroke-width: 1.5;
  stroke-dasharray: 3 5;
  transform-origin: center;
  animation: spin 40s linear infinite;
}
.core-t1 {
  font-size: 10px;
  fill: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.06em;
}
.core-t2 {
  font-size: 22px;
  font-weight: 800;
  fill: #fff;
  letter-spacing: 0.08em;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .core-halo { animation: none; }
}
.topo-info {
  position: absolute;
  left: 14px;
  bottom: 14px;
  max-width: 320px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--stic-card-border);
  background: var(--vp-c-bg);
  box-shadow: var(--stic-card-shadow-hover);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.topo-info strong {
  font-size: 15px;
  color: var(--vp-c-text-1);
}
.topo-info .sub {
  font-size: 12px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.topo-info p {
  margin: 4px 0 2px;
  font-size: 13px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}
.topo-info .hint {
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
