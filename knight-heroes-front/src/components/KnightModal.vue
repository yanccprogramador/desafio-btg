<template>
  <v-dialog v-model="modelValue" width="60%" persistent >
    <v-card>

      <v-card-text>
        <form v-if="knightId" @submit.prevent="submit('edit', knightId)">
          <v-text-field v-model="nickname" :label="loading? 'carregando' :'Nickname'" :disabled="loading"></v-text-field>
          <v-btn class="me-4" type="submit" color="primary"> Submit </v-btn>
          <v-btn
            class="me-4"
            type="button"
            color="error"
            @click="closeDialog()"
          >
            Close
          </v-btn>
        </form>
        <form v-else @submit.prevent="submit('create')">
          <v-text-field v-model="knight.name" label="Name"></v-text-field>
          <v-text-field
            v-model="knight.nickname"
            label="Nickname"
          ></v-text-field>
          <v-date-picker
            v-model="knight.birthday"
            title="Birthday"
            show-adjacent-months
          ></v-date-picker>
          <v-input>
            <datepicker
              v-model="knight.birthday"
              :upperLimit="new Date()"
              title="Birthday"
              class="v-field__input"
            />
          </v-input>
          <v-select
            :items="attributes"
            @update:modelValue="setKeyAttribute"
            label="Key Attribute"
          ></v-select>
          <h3>
            Weapons
            <v-btn
              icon="mdi-plus"
              color="primary"
              @click="addNewWeapon"
            ></v-btn>
          </h3>
          <div v-for="(weapon, index) in knight.weapons" :key="index">
            <v-text-field
              v-model="weapon.name"
              label="Weapon name"
            ></v-text-field>
            <v-text-field
              v-model="weapon.mod"
              type="number"
              label="Weapon mod"
            ></v-text-field>
            <v-select
              :items="attributes"
              @update:modelValue="(val) => setWeaponAttribute(val, index)"
              label="Weapon Attr"
            ></v-select>
            <v-checkbox label="Equipped" v-model="weapon.equipped"></v-checkbox>
          </div>
          <v-text-field
            v-for="(attribute, key) in attributes"
            :key="key"
            v-model="knight.attributes[attribute.toLowerCase()]"
             type="number"
            :label="attribute"
          ></v-text-field>

          <v-btn class="me-4" type="submit" color="primary"> Submit </v-btn>
          <v-btn
            class="me-4"
            type="button"
            color="error"
            @click="closeDialog()"
          >
            Close
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import { useStore } from "vuex";
import { Knight } from "@/types";
import Datepicker from "vue3-datepicker";
import { Watch } from 'vue-facing-decorator'

class Props {
    knightId=  prop({ type: String, required: false });
    knightNickname=  prop({ type: String, required: false });
    modelValue= prop( Boolean);
}
@Options({
  components: { Datepicker },
})
export default class KnightModal extends Vue.with(Props) {
  loading = false
  defaultWeapons = { name: "", mod: 0, attr: "", equipped: false };
  nickname = "";
  defaultKnight: Knight = {
    name: "",
    nickname: "",
    birthday: new Date(),
    weapons: [this.defaultWeapons],
    attributes: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    keyAttribute: "",
  };
  knight: Knight = { ...this.defaultKnight };

  attributes = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma",
  ];
  store = useStore();
  closeDialog() {
    this.$emit("update:modelValue", false);
  }

  async submit(type: string, id?: string) {
    if (type == "edit") {
      await this.store.dispatch("updateKnight", {
        id: id,
        body: { nickname: this.nickname },
      });
    } else {
      await this.store.dispatch("createKnight", this.knight);
    }
    this.knight = { ...this.defaultKnight };
    this.closeDialog();
  }
  setKeyAttribute(val: string) {
    this.knight.keyAttribute = val.toLowerCase();
  }
  setWeaponAttribute(val: string, weaponindex: number) {
    this.knight.weapons[weaponindex].attr = val.toLowerCase();
  }

  addNewWeapon() {
    this.knight.weapons.push({ ...this.defaultWeapons });
  }
 
  async mounted() {
    if(this.knightId) {
        this.loading = true
        let knight = await this.store.dispatch('getKnight', this.knightId)
        this.nickname = knight.nickname;
        this.loading = false
    }
  }
}
</script>