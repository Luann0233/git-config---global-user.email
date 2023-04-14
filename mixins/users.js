export default {

  data () {
    return {
      loading: false,
      users: [],
      totalItensServer: 0
    }
  },

  methods: {
    async getUsers (config) {
      this.loading = true
      await this.$get('/users', config).then((res) => {
        this.users = [...res.data.data]
        this.totalItensServer = res.data.meta.pagination.total
      }).finally(() => {
        this.loading = false
      })
    },

    async ativarDesativarUsuario (id, acao) {
      this.loading = true

      const body = {}
      if (acao === 'ativar') {
        body.status = 'active'
      } else {
        body.status = 'inactive'
      }

      await this.$put(`/users/${id}`, body).then(async (res) => {
        // sucesso
        await this.getUsers()
      }).finally(() => {
        this.loading = false
      })
    },

    async createUser (config) {
      this.loading = true
      await this.$post('/users', config).then(async (res) => {
        // sucesso
        await this.getUsers()
      }).finally(() => {
        this.loading = false
      })
    },

    async deleteUsuario (id) {
      this.loading = true
      await this.$delete(`/users/${id}`).then(async (res) => {
        // sucesso
        await this.getUsers()
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
