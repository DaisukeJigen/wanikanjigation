import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import axiosWaniKani from "@/axios/axios-wanikani";

export const useAssignmentsStore = defineStore('assignments', () => {
const assignments = ref<InstanceType<any>>([]);
const loading = ref(false);

    // const getAssignment = computed((id: any) => {
    //     const a = assignments.value.find((v: any) => v.data.subject_id == id);
    //     return a == undefined ? null : a.data
    //     .srs_stage;
    // })
    function getAssignment(id: any) {
        const a = assignments.value.find((v: any) => v.data.subject_id == id);
        return a == undefined ? null : a.data
        .srs_stage;
    }

    function fetchAssignments(data: any) {
        return new Promise((resolve, reject) => {
            loading.value = true;
            const url = `assignments?types=vocabulary&levels=${data}`;
            axiosWaniKani
            .get(url, {})
            .then((ret: any) => {
                assignments.value = ret;
            })
            .catch((error: any) => {
                console.log(error.message);
            })
            .then(
                (response: any) => {
                    loading.value = false;
                resolve(response); // Let the calling function know that http is done. You may send some data back
                },
                (error: any) => {
                    loading.value = false;
                // http failed, let the calling function know that action did not work out
                reject(error);
                }
            );
        });
    }
    return { assignments, fetchAssignments, getAssignment, loading }
  })