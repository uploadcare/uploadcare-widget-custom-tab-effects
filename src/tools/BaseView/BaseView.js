import classnames from './BaseView.pcss'
import template from './BaseView.html'

class BaseView {
  constructor(props) {
    this.props = props
    this.title = this.props.uc.locale.t('dialog.tabs.names.preview')
    this.cn = classnames
    this.template = template
  }

  render() {
    if (typeof this.template !== 'function') {
      return
    }

    const {title, template, cn} = this
    const {uc, container, store} = this.props
    const state = store.getState()

    container.innerHTML = template({
      title,
      cn,
      t: uc.locale.t,
      state,
    })

    this.templateDidMount()
    this.imageWillLoad()

    const image = container.querySelector(`.${cn.image}`)

    if (image) {
      if (image.complete) {
        this.imageDidLoad()
      }

      image.addEventListener('load', () => this.imageDidLoad())
      image.addEventListener('error', () => this.imageDidFail())
      image.addEventListener('abort', () => this.imageDidFail())
    }
  }

  templateDidMount() {}

  imageWillLoad() {
    const {cn} = this
    const {container} = this.props
    const done = container.querySelector(`.${cn.done}`)

    container.classList.remove('uploadcare--preview_status_loaded')
    done.setAttribute('aria-disabled', true)
  }

  imageDidLoad() {
    const {cn} = this
    const {container} = this.props
    const done = container.querySelector(`.${cn.done}`)

    container.classList.add('uploadcare--preview_status_loaded')
    done.setAttribute('aria-disabled', false)
  }

  imageDidFail() {
    if (this.props.onFail) {
      this.props.onFail()
    }
  }
}

export default BaseView