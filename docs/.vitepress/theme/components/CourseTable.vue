<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { courses, courseAreas } from '../../data/courses'

const props = defineProps<{
  /** 只显示某个课程领域（courses.ts 的 courseAreas key） */
  area?: string
  /** 只显示指定课程代码，逗号分隔 */
  codes?: string
  /** 显示交互筛选条（课程总览页使用） */
  filter?: boolean
}>()

const activeArea = ref<string>('')
const activeLevel = ref<string>('')
const query = ref('')

const list = computed(() => {
  let l = courses
  if (props.codes) {
    const want = props.codes.split(',').map((s) => s.trim())
    l = want.map((c) => courses.find((x) => x.code === c)).filter((x): x is (typeof courses)[number] => !!x)
  }
  const area = props.area || activeArea.value
  if (area) l = l.filter((c) => c.areas.includes(area))
  if (activeLevel.value) l = l.filter((c) => c.level === activeLevel.value)
  const q = query.value.trim().toLowerCase()
  if (q) {
    l = l.filter((c) =>
      [c.code, c.name, c.en, c.instructors].some((s) => s.toLowerCase().includes(q))
    )
  }
  return l
})
</script>

<template>
  <div class="course-table">
    <div v-if="filter" class="filters">
      <div class="row">
        <button :class="{ on: !activeArea }" @click="activeArea = ''">全部领域</button>
        <button
          v-for="(label, key) in courseAreas"
          :key="key"
          :class="{ on: activeArea === key }"
          @click="activeArea = activeArea === key ? '' : key"
        >{{ label }}</button>
      </div>
      <div class="row">
        <button :class="{ on: !activeLevel }" @click="activeLevel = ''">全部层次</button>
        <button :class="{ on: activeLevel === '本科' }" @click="activeLevel = '本科'">本科课程</button>
        <button :class="{ on: activeLevel === '研究生' }" @click="activeLevel = '研究生'">研究生课程（本研共享）</button>
        <input v-model="query" type="search" placeholder="搜索代码 / 课名 / 教师" />
      </div>
      <p class="count">共 {{ list.length }} 门</p>
    </div>
    <div class="scroll">
    <table>
      <thead>
        <tr>
          <th>代码</th>
          <th>课程</th>
          <th>类型</th>
          <th>学分</th>
          <th>学期</th>
          <th>授课教师（2026-27）</th>
          <th>先修</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in list" :key="c.code + c.name">
          <td class="code">
            <a v-if="c.page" :href="withBase(c.page)">{{ c.code }}</a>
            <span v-else>{{ c.code }}</span>
          </td>
          <td>
            <div class="name">{{ c.name }}</div>
            <div class="en">{{ c.en }}</div>
          </td>
          <td><span class="tag" :class="'tag--' + (c.level === '研究生' ? 'grad' : c.type === '必修' ? 'req' : 'opt')">{{ c.level === '研究生' ? '研究生' : c.type }}</span></td>
          <td>{{ c.credit }}</td>
          <td>{{ c.semester }}</td>
          <td class="inst">{{ c.instructors }}</td>
          <td class="pre">{{ c.prereq === 'None' ? '无' : c.prereq }}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<style scoped>
.course-table { margin: 16px 0 24px; }
.filters { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
.row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.row button {
  font-size: 12.5px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  transition: all 0.15s;
}
.row button:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.row button.on { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff; }
.row input {
  margin-left: auto;
  min-width: 200px;
  font-size: 13px;
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}
.count { margin: 0 !important; font-size: 12px; color: var(--vp-c-text-3); }
.scroll { overflow-x: auto; }
table { display: table; width: 100%; font-size: 13px; margin: 0 !important; }
th { white-space: nowrap; }
td.code { font-family: var(--vp-font-family-mono); font-weight: 600; white-space: nowrap; }
.name { font-weight: 600; color: var(--vp-c-text-1); }
.en { font-size: 11.5px; color: var(--vp-c-text-3); line-height: 1.4; }
.inst { min-width: 120px; }
.pre { font-size: 12px; color: var(--vp-c-text-2); max-width: 220px; }
.tag { font-size: 11px; padding: 2px 7px; border-radius: 6px; white-space: nowrap; font-weight: 600; }
.tag--req { background: var(--stic-accent-soft); color: var(--stic-accent); }
.tag--opt { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); }
.tag--grad { background: var(--vp-c-default-soft); color: var(--vp-c-text-2); }
</style>
