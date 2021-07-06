import TodoFooter from './components/Footer'
import TodoHeader from './components/Header'
import TodoList from './components/TodoList'
import TotoBar from './components/TotoBar'
import Checkbox from './components/Checkbox'
import Bus from './bus'
import {
    useLocalStorage
} from './storage'

let id = 0
const storage = useLocalStorage()

const filters = {
    all: function (todos) {
        return todos;
    },
    active: function (todos) {
        return todos.filter(function (todo) {
            return !todo.completed;
        });
    },
    completed: function (todos) {
        return todos.filter(function (todo) {
            return todo.completed
        })
    }
}

export default {
    data() {
        return {
            list: storage.get() || [],
            visibility: 'all', //all active completed
            editId: null
        }
    },
    created() {
        id = this.list.length && this.list[0].id
        hashListener(this)

        Bus.$on('addTodo', text => {
            this.list.unshift({
                id: ++id,
                completed: false,
                text
            })
        })
        Bus.$on('removeTodo', todo => {
            const index = this.list.indexOf(todo)
            this.list.splice(index, 1)
        })
        // 修改完成，未完成
        Bus.$on('completedTodo', ({
            id,
            completed
        }) => {
            const todo = this.list.find(item => item.id === id)
            todo.completed = completed
        })
        // 修改内容
        Bus.$on('changeTodo', ({
            id,
            text
        }) => {
            const todo = this.list.find(item => item.id === id)
            todo.text = text
        })

        // 全部完成
        Bus.$on('toggleAll', completed => {
            this.list.forEach(item => {
                item.completed = completed
            })
        })
        // 清除所有完成
        Bus.$on('clearCompleted', () => {
            this.list = filters.active(this.list)
        })

        // 编辑操作
        Bus.$on('editTodo', id => {
            this.editId = id
        })
        Bus.$on('doneEditTodo', () => {
            this.editId = null
        })
    },
    watch: {
        list: {
            deep: true,
            handler: storage.save
        }
    },
    computed: {
        filteredTodos: function () {
            return filters[this.visibility](this.list);
        },
        remainingCount() {
            return filters.active(this.list).length
        },
        completedCount() {
            return filters.completed(this.list).length
        },
        allDone: {
            get() {
                return this.remainingCount === 0
            },
            set(val) {
                Bus.$emit('toggleAll', val)
            }
        }
    },
    render(h) {
        return h('div', {
            attrs: {
                id: 'app'
            }
        }, [
            h('section', {
                attrs: {
                    class: 'todoapp'
                }
            }, [
                h(TodoHeader),
                h('div', {
                    attrs: {
                        class: 'main'
                    }
                }, [
                    h(Checkbox, {
                        props: {
                            checked: this.allDone
                        },
                        attrs: {
                            id: 'toggle-all',
                            class: 'toggle-all'

                        },
                        on: {
                            change: (e) => {
                                this.allDone = e.target.checked
                            }
                        }
                    }),
                    h('label', {
                        attrs: {
                            for: 'toggle-all'
                        }
                    }, 'Mark all as complete'),
                    h(TodoList, {
                        props: {
                            list: this.filteredTodos,
                            editId: this.editId
                        }
                    }),
                    h(TotoBar, {
                        props: {
                            remainingCount: this.remainingCount,
                            visibility: this.visibility,
                            completedCount: this.completedCount
                        },
                        style: {
                            display: this.list.length ? '' : 'none'
                        }
                    })
                ])
            ]),
            h(TodoFooter)
        ])
    }
}

function hashListener(app) {
    window.addEventListener('hashchange', () => {
        if (window.location.hash) {
            app.visibility = window.location.hash.slice(1) || 'all'
        }
    })
}