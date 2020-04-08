$.confirm = options => {
    return new Promise((resolve, reject) => {
        const confirm = $.modal({
            title: options.title,
            width: '350px',
            closable: false,
            content: options.content,
            onClose() {
                confirm.destroy()
            },
            footerButtons: [{
                text: 'Cancel',
                type: 'secondary',
                handler() {
                    confirm.close()
                    reject()
                }
            }, {
                text: 'Delete',
                type: 'danger',
                handler() {
                    confirm.close()
                    resolve()
                }
            }]
        })
        setTimeout(() => confirm.open(), 100)
    })
}