<template>
<div>
      <v-list>
        <v-list-item
          v-for="(item) in items"
          :key="item.id"
          :value="item"
        >
          <template v-slot:prepend v-if="action">
            <v-icon icon="mdi-pencil" @click="openDialog(item.id)"></v-icon>
            <v-icon icon="mdi-trash-can" @click="deleteKnight(item.id)"></v-icon>
          </template>

          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle>
            Age {{ item.age }} | Weapons: {{ item.weapons }} | Attack:
            {{ item.attack }} | Exp: {{ item.exp }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <KnightModal v-model="dialog" v-if="dialog" :knightId="knightId"></KnightModal>
      </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "vuex";
import KnightModal from "./KnightModal.vue";

@Options({
    props: {
        action: Boolean,
        items: Array
    },
    components: { KnightModal }
})
export default class List extends Vue {
    knightId  = '';
    dialog = false;
    store = useStore();

    openDialog(id:string){
        this.knightId = id;
        this.dialog = true;
    }

    async deleteKnight(id: string){
        await this.store.dispatch('deleteKnight', id)
    }
}
</script>
