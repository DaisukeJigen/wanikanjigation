<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
import { useUserDataStore } from '@/stores/userData';
const userData = useUserDataStore();
// defineProps<{
//   msg: string
// }>()
import { computed, ref } from "vue";
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';
import { toKana } from 'wanakana';

const isLoggedIn = computed(() => userData.loggedIn)

// @ts-ignore
const version = __APP_VERSION__;
const searchTerm = ref("");
const items = ref([
    {
      label: 'Login',
      route: '/login',
      visible: () => !isLoggedIn.value
    },
          {
              label: 'Verbs',
              // icon: 'pi pi-fw pi-plus',
              items: [
                  {
                      label: 'List',
                      route: 'verbs'
                  },
                  {
                      label: 'Test',
                      route: 'test/verbs'
                  }
              ],
              visible: () => isLoggedIn.value
          },
          {
              label: 'NA Adjectives',
              // icon: 'pi pi-fw pi-plus',
              items: [
                  {
                      label: 'List',
                      route: 'naadjectives'
                  },
                  {
                      label: 'Test',
                      route: 'test/naadjectives'
                  }
              ],
              visible: () => isLoggedIn.value
          },
          {
              label: 'I Adjectives',
              // icon: 'pi pi-fw pi-plus',
              items: [
                  {
                      label: 'List',
                      route: 'iadjectives'
                  },
                  {
                      label: 'Test',
                      route: 'test/iadjectives'
                  }
              ],
              visible: () => isLoggedIn.value
          },
    ]);

    function search(this: any) {
    router.push(`/verblookup/${searchTerm.value}`);
  }
</script>

<template>
  <Menubar :model="items">
    <template #start>
      <span class="title">WaniKanjigation</span>
      <span class="version">
        {{ version }}</span
      >
    </template>
    <template #item="{ label, item, props, root, hasSubmenu }">
        <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
            <a :href="routerProps.href" v-bind="props.action">
                <!-- <span v-bind="props.icon" /> -->
                <span v-bind="props.label">{{ label }}</span>
            </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <!-- <span v-bind="props.icon" /> -->
            <span v-bind="props.label">{{ label }}</span>
            <span :class="[hasSubmenu && (root ? 'pi pi-fw pi-angle-down' : 'pi pi-fw pi-angle-right')]" v-bind="props.submenuicon" />
        </a>
    </template>
    <template #end>
      <!-- <InputText placeholder="Search" type="text" /> -->
      <InputText
        v-model="searchTerm"
        @keyup.enter="search"
        @keyup="searchTerm = toKana(searchTerm)"
        ref="search"
      ></InputText>
      <Button @click="search">Verb Lookup</Button>
      <!-- <Avatar :label="userData.userData.username.substring(0,1)"></Avatar> -->
      <span>{{ userData.userData.username }}</span>
    </template>
  </Menubar>
</template>

<style scoped>
</style>