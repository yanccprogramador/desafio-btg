<template>
  <v-container>
    <v-flex xs10 v-if="loading"  class="mx-auto">
    <v-progress-circular 
      indeterminate
      color="primary"
      
      class="mx-auto"
      :size="70"
    ></v-progress-circular>
    </v-flex>
    <div v-else>
      <h1>Knights <v-btn icon="mdi-plus" color="primary" @click="dialog = true"></v-btn></h1>
      <List :items="knights" :action="true"></List>
    
    <h1>Hall of heroes</h1>
      <List :items="heroes" :action="false"></List>
      </div>
    <KnightModal v-model="dialog"/>
  </v-container>
</template>

<script lang="ts">
import KnightModal from "@/components/KnightModal.vue";
import List from "@/components/List.vue";
import { computed } from "vue";
import { Options, Vue } from "vue-class-component";
import { useStore } from "vuex";

@Options({
  components: {List, KnightModal},
  emits:[]
})
export default class HomeView extends Vue {
  store = useStore();
  data() {
    return {
      knights: computed(() => this.store.getters.knights),
      heroes: computed(() => this.store.getters.heroes),
      loading: computed(() => this.store.getters.loading),
      dialog: false,
    };
  }

  created() {
    this.store.dispatch("init");
  }
}
</script>
