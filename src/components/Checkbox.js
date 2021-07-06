export default  {
    props: ['checked'],
    render(h) {
        return h('input', {
            domProps: {
                checked: this.checked
            },
            attrs:{
                type: 'checkbox'
            },
            on: {
                change: e => {
                    this.$emit('change', e)
                }
            }
        })
    }
}