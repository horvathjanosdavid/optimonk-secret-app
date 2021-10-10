export default {
    methods: {
        openNotification(type, title, message) {
            this.$notification[type]({
              title,
              description: message
            });
          },

          handleBackendError(error) {
            switch(error.status) {
              case 400: {
                this.openNotification('info', 'Info', error?.data?.message);
                break;
              }
              case 403:
              case 404: {
                this.openNotification('warning', 'Warning', error?.data?.message);
                break;
              }
              default: {
                this.openNotification('error', 'Error', error?.data?.message);
                break;
              }
            }
          }
    }
}