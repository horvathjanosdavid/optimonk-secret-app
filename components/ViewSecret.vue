<template>
    <div class="container">
        <div>
            The secret: <span>{{secret.secretText}}</span>
        </div>
        <div>
            Created at: <span>{{ createdAt }}</span>
        </div>
        <div>
            Remaining views: <span>{{secret.remainingViews}}</span>
        </div>
        <div v-if="secret.expiresAt">
            Can be viewed till: <span>{{ expiresAt }}</span>
        </div>

    </div>
</template>

<script>
import { format } from 'date-fns'

    export default {
        props: {
            secret: {
                type: Object,
                default: () => ({})
            }
        },
        data: () => ({}),
        computed: {
            expiresAt() {
                return this.secret.expiresAt ? this.formatDate(this.secret.expiresAt) : '';
            },
            createdAt() {
                return this.secret.createdAt ? this.formatDate(this.secret.createdAt) : '';
            }
        },
        methods: {
            formatDate(date) {
                return format(new Date(date), 'yyyy.MM.dd HH:mm');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        font-size: 20px;
        span {
            font-weight: bold;
        }
    }
</style>