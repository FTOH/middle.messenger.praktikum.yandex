import { Block } from 'core/Block'
import { store, StoreState } from 'core/Store'
import { isEqual } from './isEqual'

export function connect<T extends Record<string, unknown>>(
  Component: new (props: Partial<T>) => Block<T>,
  mapStateToProps: (state: StoreState) => Partial<T> | undefined,
): new (props?: Partial<T>) => Block<T> {
  return class extends Component {
    public blockName = `HOC:${Component.name}`

    constructor(props: Partial<T> = {}) {
      let state = mapStateToProps(store.getState()) ?? {}
      super({ ...props, ...state })

      store.on('update', () => {
        const newState = mapStateToProps(store.getState()) ?? {}

        if (!isEqual(state, newState)) {
          this.setProps({ ...newState })
        }

        state = newState
      })
    }
  }
}
