import React, { Component } from 'react'
import { Spring } from 'react-spring'
import { LOGO_BEFORE, LOGO_AFTER } from "../assets/LogoPath"

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', willChange: 'background'  },
  shape: { width: 400, height: 400, willChange: 'transform' }
}


const Content = ({ toggle, color, scale, shape, start, end, stop, rotation }) => (
  <div style={{ ...styles.container, background: `radial-gradient(ellipse at center, ${start} ${stop}, ${end} 50%)` }}>
    <svg
      style={{ ...styles.shape, transform: `scale3d(${scale}, ${scale}, ${scale}) rotate(${rotation})` }}
      version="1.1"
      viewBox="0 0 400 400">
      <g style={{ cursor: 'pointer' }} fill={color} fillRule="evenodd" onClick={toggle}>
        <path id="path-1" d={shape} />
      </g>
    </svg>
  </div>
)

export default class AnimationContainer extends Component {
  state = { toggle: true }
  toggle = () => this.setState(state => ({ toggle: !state.toggle }))
  render() {
    const toggle = this.props.isToggled
    return (
      <Spring
        from={{ color: 'black' }}
        to={{
          color: toggle ? "#4990e2": "rgba(63,226,177,0.55) 0%;" ,
          start: toggle ? 'rgba(63,226,177,.25)':'rgba(63,226,157,0.55)',
          end: toggle ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0)',
          scale: toggle ? 1 : 1.2,
          shape: toggle ? LOGO_BEFORE : LOGO_AFTER,
          stop: toggle ? '0%' : '0%',
          rotation: toggle ? '0deg' : '0deg'
        }}
        toggle={this.props.toggle} // Additional props will be spread over the child
        children={Content} // Render prop
      />
    )
  }
}