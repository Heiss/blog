import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                background: colors.grey.lighten5, // Not automatically applied
            },
            dark: {
                background: colors.grey.darken4, // If not using lighten/darken, use base to return hex
            },
        },
    }
});
