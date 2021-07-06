export default {
    props: ['value'],
    render(h) {
        return h('input', {
            domProps: {
                value: this.value
            },
            on: {
                input: e => {
                    this.$emit('input', e.target.value)
                },
                keydown: e => {
                    if (e.code === 'Enter' || e.keyCode === 13) {
                        this.$emit('enter', e.target.value)
                    } else if (e.code === 'Escape' || e.keyCode === 27) {
                        this.$emit('esc', e)
                    }
                },
                blur: e => {
                    this.$emit('blur', e.target.value)
                }
            }
        })
    }
}