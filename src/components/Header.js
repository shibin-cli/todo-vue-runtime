import Bus from '../bus'
import Input from './Input'

export default {
    name: 'TodoHeader',
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        addTodo() {
            if (this.keyword.trim() === '') {
                return
            }
            Bus.$emit('addTodo', this.keyword)
            this.keyword = ''
        }
    },
    render(h) {
        return h('header', {
            attrs: {
                class: 'header'
            }
        }, [
            h('h1', 'todos'),
            h(Input, {
                props: {
                    value: this.keyword
                },
                attrs: {
                    class: 'new-todo',
                    placeholder: 'What needs to be done',
                    autofocus: true,
                    autocomplete: 'off'
                },
                on: {
                    enter: this.addTodo,
                    input: val => {
                        this.keyword = val
                    }
                }
            })
        ])
    }
}