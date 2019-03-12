import * as React from 'react';

interface IViewProps {
  slides: ISlides<IOneSlide>
}

export class View extends React.Component<IViewProps, IPresentation> {
  state: IPresentation = {
    slideControl: null,
    currentSlide: '1'
  }

  render () {
    if (this.props.slides[this.state.currentSlide].control) {
      let Control = this.props.slides[this.state.currentSlide].control;
      return (
        <Control {... this.props.slides[this.state.currentSlide].props} />
      )
    }
    return (
      <div>
        wait...
      </div>
    )
  }

}
