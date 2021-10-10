<template>
    <div class="search-secret-input-container">
        <div class="title">
          Search for secret
        </div>
        <a-input-search
          v-model="hash"
          placeholder="Hash"
          enter-button="Search"
          @search="getSecret"/>
        <a-modal v-model="isViewSecretModalVisible" title="Secret">
          <template slot="footer">
            <a-button key="submit" type="primary" @click="closeViewSecretModal">
             Ok
            </a-button>
          </template>
          <ViewSecret :secret="secret" />
        </a-modal>
    </div>
</template>
<script>
import errorHandler from '../mixins/error-handler';


    export default {
        mixins: [errorHandler],
        data: () => {
            return {
                hash: '',
                secret: undefined,
                isViewSecretModalVisible: false
            }
        },
        methods: {
            async getSecret() {
                try {
                    const result = await this.$axios.$get(`/api/secret/${this.hash}`);
                    this.secret = result;
                    this.openViewSecretModal();
                } catch (ex) {
                    this.handleBackendError(ex.response);
                }
            },
            openViewSecretModal() {
                this.isViewSecretModalVisible = true;
            },
            closeViewSecretModal() {
                this.isViewSecretModalVisible = false;
                this.secret = undefined;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search-secret-input-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        border: 1px solid;
        border-radius: 20px;
        padding: 10px;

    .title {
        align-self: flex-start;
    }
    }
</style>