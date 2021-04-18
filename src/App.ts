import { Component, Vue } from 'vue-property-decorator';
import Login from '@/components/Login.vue';

@Component({
  components: {
    Login,
  },
})
export default class App extends Vue {
  get isLoggedIn() {
    return this.$store.getters.isLoggedIn;
  }

  beforeCreate() {
    this.$store.dispatch('restore');
  }
}
