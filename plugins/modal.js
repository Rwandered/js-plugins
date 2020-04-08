Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}

function noop() {}

const _createFooter = buttons => {

    const footerWrapper = document.createElement('div')
    footerWrapper.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || secondary}`)
        $btn.textContent = btn.text
        $btn.onclick = btn.handler || noop
        footerWrapper.appendChild($btn)
    })

    return footerWrapper
}

const _createModal = options => {
        const DEFAULT_WIDTH = '600px'
        const modal = document.createElement('div')
        modal.classList.add('rmodal')
        modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close='true'>
    <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
        <div class="modal-header">
            <span class="modal-title">${options.title || "Window"}</span>
            ${options.closable ? `<span class="modal-close" data-close='true'>&times;</span>` : ''}
        </div>
        <div class="modal-body" data-content>
            ${options.content || ''}
        </div>
    </div>
    </div>`)
  document.body.appendChild( modal)
  const footer = _createFooter(options.footerButtons)        
  // footer.appendAfter(modal.querySelector(' [data-content]')) // -> добавили в прототип элемента метод
  //или так
  modal.querySelector(' [data-content]').after(footer)
  return modal
}

/*
* Реализовать options title: string +
* closable : boolean+
* content: string+
* width: string ('400px')+
*destroy() : void + 
* Окно должно закрываться + 
* setContent(html: string): void + 
*-------------------s
* onClose(): void
*onOpen(): void
* beforeClose() : void
--------------------
 */


$.modal = options => {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false
    let destroyed = false

    const modal = {
      open() {
        
        if(destroyed) {
          return console.log('Modal is destroyed');
        }
        !closing && $modal.classList.add('open')
      },

      close() {
        $modal.classList.remove('open')
        $modal.classList.add('hide')
        closing = true
        setTimeout(() => {
            $modal.classList.remove('hide')
            closing = false
            if(typeof options.onClose === 'function') {
              options.onClose()
            }
        }, ANIMATION_SPEED)
      },

      setContent(html) {
        $modal.querySelector('[data-content]').innerHTML = html
      }
    }

  const listenerModal = () => {
    // console.log(event)
    if(event.target.dataset.close) {
      modal.close()
    }
  }

   $modal.addEventListener('click', listenerModal)

    return Object.assign(modal, { 
      destroy() {
        $modal.remove()
        $modal.removeEventListener('click', listenerModal)
        destroyed = true
      } 
    })
}