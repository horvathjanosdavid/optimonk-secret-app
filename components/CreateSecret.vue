<template>
    <div class="create-secret-input-container">
        <div class="title">
          Create secret
        </div>
        <div class="secret-text-container">
              <a-textarea
                v-model="secretText"
                placeholder="Secret text"
                :auto-size="{ minRows: 2, maxRows: 5 }"/>
        </div>
        <div class="secret-options-container">
          <a-tooltip :trigger="['focus']" placement="topLeft">
            <template slot="title">
              The secret won't be available after the given number of views.
            </template>
            <a-input
              v-model="expireAfterViews"
              placeholder="Expire after views"/>
          </a-tooltip>
          <a-tooltip :trigger="['focus']" placement="topLeft">
            <template slot="title">
              The secret won't be available after the given time. The value is provided in minutes. 0 means never expires.
            </template>
            <a-input
              v-model="expireAfterMinutes"
              placeholder="Expire after minutes"/>
          </a-tooltip>
        </div>
        <a-button
          type="primary"
          @click="createSecret">
          Create secret!
        </a-button>
        <a-modal v-model="isCreatedModalVisible" title="Secret created">
          <template slot="footer">
            <a-button key="submit" type="primary" @click="closeCreatedModal">
             I won't!!
            </a-button>
          </template>
          <SecretCreated :hash="hash" />
        </a-modal>
    </div>
</template>

<script>
import errorHandler from '../mixins/error-handler';

export default {
    mixins: [errorHandler],
    data: () => {
      return {
        secretText: '',
        expireAfterViews: 1,
        expireAfterMinutes: 0,
        hash: '',
        isCreatedModalVisible: false
      }
    },
    methods: {
        async createSecret() {
            const secret = {
                secret: this.secretText,
                expireAfterViews: this.expireAfterViews,
                expireAfter: this.expireAfterMinutes
            }
            try {
                const result = await this.$axios.$post(`/api/secret`, secret);
                this.hash = result.hash;
                this.openCreatedModal(this.hash);
            } catch (ex) {
                this.handleBackendError(ex.response);
            }
        },
        openCreatedModal(hash) {
          this.isCreatedModalVisible = true;
        },
        closeCreatedModal() {
          this.hash = '';
          this.isCreatedModalVisible = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .create-secret-input-container {
        display: flex;
        flex-direction: column;
        gap: 20px;

        border: 1px solid;
        border-radius: 20px;
        padding: 10px;

        .secret-options-container {
            display: flex;
            flex-direction: row;
            gap: 20px;
        }
    }
</style>