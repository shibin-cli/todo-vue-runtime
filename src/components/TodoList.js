import Bus from '../bus'
import Input from './Input'
import Checkbox from './Checkbox'

export default {
    name: 'TodoList',
    props: {
        list: {
            type: Array,
            default: []
        },
        editId: {
            type: Number,
            default: -1
        }
    },
    methods: {
        editTodo(todo) {
            Bus.$emit('editTodo', todo.id)
        },
        doneEdit(val, todo) {
            Bus.$emit('changeTodo', {
                id: todo.id,
                text: val
            })
            Bus.$emit('doneEditTodo')
        },
        backEdit(e, todo) {
            e.target.value = todo.text
            Bus.$emit('doneEditTodo')
        },
        removeTodo(todo) {
            Bus.$emit('removeTodo', todo)
        }
    },
    render(h) {
        return h('ul', {
            attrs: {
                class: 'todo-list'
            }
        }, [
            this.list.map((item) => {
                return h('li', {
                    key: item.id,
                    class: {
                        completed: item.completed,
                            editing: item.id === this.editId
                    }
                }, [h('div', {
                    attrs: {
                        class: 'view'
                    }
                }, [
                    h(Checkbox, {
                        attrs: {
                            class: 'toggle',

                        },
                        props: {
                            checked: item.completed
                        },
                        on: {
                            change: e => {
                                Bus.$emit('completedTodo', {
                                    id: item.id,
                                    completed: e.target.checked
                                })
                            }
                        }
                    }),
                    h('label', {
                        on: {
                            dblclick: () => {
                                this.editTodo(item)
                            }
                        }
                    }, item.text),
                    h('button', {
                        attrs: {
                            class: 'destroy'
                        },
                        on: {
                            click: () => {
                                this.removeTodo(item)
                            }
                        }
                    })
                ]), h(Input, {
                    attrs: {
                        class: 'edit',
                        value: item.text
                    },
                    on: {
                        enter: (val) => {
                            this.doneEdit(val, item)
                        },
                        blur: (val) => {
                            this.doneEdit(val, item)
                        },
                        esc: e => {
                            this.backEdit(e, item)
                        }
                    }
                })])
            })
        ])
    }
}