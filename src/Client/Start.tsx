import * as React from 'react';

export class Start extends React.Component<HashMap<any>, HashMap<any>> {
    state:HashMap<any> = {
        qr: false
    };

    constructor(props:HashMap<any>) {
      super(props);
      this.switchQrStatus = this.switchQrStatus.bind(this);
    }

    switchQrStatus () {
      this.setState({
        qr: !this.state.qr 
      });
    }

    render () {
      if (this.state.qr) {
        return (
          <div className='client-answers'>
            <div className='client-cross' onClick={this.switchQrStatus}>×</div>
            <img src='/resources/qr-code.gif' className='client-qr'/>
          </div>
        );
      } else {
        return (
          <div className='client-answers'>
            <img src='/resources/logo.png' className='client-logo'/>
            <p>Скоро тут появится голосование<br />
              А пока смотрите на сцену :) </p>

            <p className='client-share-qr' onClick={this.switchQrStatus}>Поделиться QR-кодом</p>
          </div>
        );
      }
    }
}
