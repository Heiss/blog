

const getDefaultState = () => {
    return {
        posts: {
            17: {
                content: `# md rulez

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet vestibulum dui. Maecenas tincidunt laoreet odio, sed egestas justo suscipit id. Nullam orci nisl, blandit eget purus consectetur, suscipit mattis odio. Aenean ut bibendum purus. Cras sem ex, dapibus quis accumsan at, porttitor ut enim. Aliquam erat volutpat. In in fermentum est. Nam aliquam pharetra nisi at vestibulum. Sed erat metus, ullamcorper id sodales ac, semper at erat. Vestibulum lectus diam, sagittis id ante vitae, molestie euismod elit. Morbi pharetra est sed dui varius laoreet. Donec vulputate arcu ullamcorper dapibus aliquet.

Sed suscipit turpis sed justo maximus, vitae elementum mauris pellentesque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc pretium metus at risus blandit, at rutrum sapien condimentum. Cras convallis rutrum augue non mollis. Nulla malesuada mi in nunc molestie, at semper odio rutrum. Etiam vitae erat vel massa efficitur blandit. Aliquam vitae gravida ligula. Donec sit amet vulputate quam, non consequat nunc. Aliquam at semper neque.

Ut et vehicula lacus. Curabitur felis metus, condimentum eget interdum id, mattis et ex. Suspendisse facilisis eleifend ante eu fringilla. Curabitur pretium sem eu egestas pellentesque. Duis quam quam, suscipit vitae accumsan eu, suscipit non nisi. Curabitur nec auctor purus. Sed elit ante, finibus non ante id, malesuada scelerisque lectus. Aenean bibendum diam justo, eu porttitor velit rhoncus nec. Cras eget urna vehicula, bibendum mauris nec, interdum lacus. In sed ullamcorper orci, sit amet sodales lectus. Nam sodales diam a cursus vestibulum. Nunc vitae lacus vitae diam pellentesque rhoncus. In eu diam quis ante cursus placerat quis id ex. Praesent ac libero eu elit vehicula dictum id non justo. Aenean fringilla molestie mauris quis scelerisque. Donec vel tortor accumsan, finibus tortor vel, fermentum mi.

Cras turpis nisl, congue eget eleifend quis, venenatis sed nibh. Donec in viverra augue. Nulla a viverra lacus. Nam lacinia luctus nisl. Fusce viverra non odio eget dignissim. Pellentesque sed erat et orci porta ornare. Maecenas ac dictum felis. Nam vehicula libero sit amet nisi tristique, vel faucibus est suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi vitae molestie nisl. Suspendisse potenti.

In ut imperdiet neque. Nunc ornare risus sed ex lobortis, in elementum ipsum cursus. Nunc tristique maximus tellus et fringilla. Phasellus consectetur justo sed posuere porta. Phasellus vel ipsum pellentesque, finibus ante sed, bibendum quam. Suspendisse efficitur feugiat faucibus. Aliquam turpis dui, suscipit sit amet urna non, efficitur dapibus est. Vestibulum tempor, lacus eget maximus aliquet, purus odio vehicula elit, at convallis ante risus non odio.`,
                title: "Supertitel123"
            },
            2: {
                content: `# md rulez

wenn ich jetzt hier viel tippe, dann geht das gut
            
## uiuiui
            
asd`,
                title: "Supertitel21"
            },
            3: {
                content: `# md rulez

wenn ich jetzt hier viel tippe, dann geht das gut
            
## uiuiui
            
asd`,
                title: "Supertitel333"
            },
            4: {
                content: `# md rulez

wenn ich jetzt hier viel tippe, dann geht das gut
            
## uiuiui
            
asd`,
                title: "Supertitel"
            }
            , 5: {
                content: `# md rulez

wenn ich jetzt hier viel tippe, dann geht das gut
            
## uiuiui
            
asd`,
                title: "Supertitel"
            }, 6: {
                content: `# md rulez

wenn ich jetzt hier viel tippe, dann geht das gut
            
## uiuiui
            
asd`,
                title: "Supertitel"
            }
        },
    }
}


export default {
    getDefaultState,
    name: "BlogpostsStore",
    install: function (Vue) {
        let $socket = Vue.prototype.$socket
        Vue.prototype.$services = Vue.prototype.$services || {}
        Vue.prototype.$services.Blog = {
            getPosts(index = 0, length = 10) {
                $socket.client.emit("getPosts", { index: index, length: length });
            },
            getLatestPosts(length = 10) {
                this.getPosts(0, length)
            },
            getPostUpdate(postId) {
                $socket.client.emit("getPostUpdate", { id: postId });
            },
            getPost(postId) {
                $socket.client.emit("getPost", { id: postId });
            }
        }
    },
    store: {
        // You can use it as state property
        state: getDefaultState(),

        // You can use it as a state getter function (probably the best solution)
        getters: {
            getPosts(state) {
                return state.posts;
            }
        },

        // Mutation for when you use it as state property
        mutations: {
            resetState(state) {
                // Merge rather than replace so we don't lose observers
                // https://github.com/vuejs/vuex/issues/1118
                Object.assign(state, getDefaultState())
            },
            setPost(state, payload) {
                state.posts[payload.id] = payload.content
            }
        },
        actions: {
            SOCKET_newPost(context, state) {
                context.commit('setPost', {
                    id: state.id,
                    content: state.content
                })
            },
            SOCKET_postUpdated(context, state) {
                context.commit('setPost', {
                    id: state.id,
                    content: state.content
                })
            },
            SOCKET_sentPosts(context, state) {
                state.forEach(post => {
                    context.commit('setPost', {
                        id: post.id,
                        content: post.content
                    })
                });
            }
        },
    }
};