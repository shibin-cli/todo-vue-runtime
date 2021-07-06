export default {
    name: 'TodoFooter',
    render: h => {
        return h('footer', {
            attrs: {
                class: 'info'
            }
        }, [
            h('p', 'Double-click to edit a todo'),
            h('p', [
                'Template by ',
                h('a', {
                    attrs: {
                        href: 'http://sindresorhus.com',
                        target: '_blank'
                    }
                }, 'Sindre Sorhus')
            ]),
            h('p', [
                'Created by ',
                h('a', {
                    attrs: {
                        href: 'https://github.com/shibin-cli',
                        target: '_blank'
                    }
                }, 'Shibin You')
            ]), h('p', [
                'Part of ',
                h('a', {
                    attrs: {
                        href: 'http://todomvc.com',
                        target: '_blank'
                    }
                }, 'TodoMVC')
            ])
        ])
    }
}