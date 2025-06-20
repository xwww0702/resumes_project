<template>
 <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="Title" prop="title" />
    <el-table-column label="Date" prop="updatedAt" />
    <el-table-column align="right" >
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope" >
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRefs,computed } from 'vue'
import { userGetAllResume } from '../service/saveResume'
import { useResumeStore } from '../store/useResumeStore'
import type { ResumeData } from '../type/Resume'
import router from '../router'
const loading = ref(true)
const currentDate = new Date().toDateString()
const { fetchData } = userGetAllResume('user123')
const { resumeList } = toRefs(useResumeStore())
onMounted(async () => {
  let res = []
  try { res = await fetchData()
    console.log(res)
   }
  catch (err) {
    console.error(err)
  }
  resumeList.value = res as ResumeData[]
})



const search = ref('')
const filterTableData = computed(() =>
resumeList.value.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleDelete = (index: number, row: ResumeData) => {
  console.log(index, row)
}
const handleEdit = (index: number, row: ResumeData) => {
  console.log(index, row)
  router.push({ path: '/Home', query: { id:row.id, title:row.title } })
}
</script>

<style></style>