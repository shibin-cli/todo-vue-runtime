const barlist = ['all', 'active', 'completed']
import Bus from '../bus'

export default {
    props: ['remainingCount', 'visibility', 'completedCount'],
    render(h) {
        return h('footer', {
            attrs: {
                class: 'footer'
            }
        }, [
            h('span', {
                attrs: {
                    class: 'todo-count'
                }
            }, [
                h('strong', this.remainingCount),
                ' item left'
            ]),
            h('ul', {
                    attrs: {
                        class: 'filters'
                    }
                },
                barlist.map(item => h('li', [
                    h('a', {
                        class: {
                            selected: item === this.visibility
                        },
                        attrs: {
                            href: `#${item}`
                        }
                    }, item.slice(0, 1).toUpperCase() + item.slice(1))
                ]))
            ),
            h('button', {
                attrs: {
                    class: 'clear-completed'
                },
                style: {
                    display: this.completedCount > 0 ? '' : 'none'
                },
                on: {
                    click: () => {
                        Bus.$emit('clearCompleted')
                    }
                }
            }, 'Clear completed')
        ])
    }
}