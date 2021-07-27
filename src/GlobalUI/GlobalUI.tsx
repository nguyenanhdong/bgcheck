import React from 'react'
import { NormalLoading, NormalAlert } from '../Theme';
import GlobalUIManager from './GlobalUIManager';

// import FlashMessage, { showMessage } from "react-native-flash-message";

export interface GloablUIState {
  isLoading: boolean,
  alertOpts: GlobalAlertShowingOption
  alertVisible: boolean,
  loadingMsg: string;
}

export interface GlobalAlertShowingOption {
  title?: string
  content?: string
  onConfirmPress?: () => void,
  onRequestClose?: () => void
}
const DF_ALERT_OPTS = {
  content: "",
  title: "",
  onConfirmPress: () => null,
  onRequestClose: () => null
}
type Props = {}
export default class GloablUI extends React.Component<Props, GloablUIState> {

  static DF_SUCCESS_ALERT_OPTIONS: GlobalAlertShowingOption = {
    title: "Thông báo",
    content: "Thành công"
  }

  static DF_ERROR_ALERT_OPTIONS: GlobalAlertShowingOption = {
    title: "Rất tiếc!",
    content: "Thao tác thất bại"
  }

  constructor(props: any) {
    super(props)
    this.state = {
      isLoading: false,
      alertVisible: false,
      alertOpts: DF_ALERT_OPTS,
      loadingMsg: "",
    }
    GlobalUIManager.view = this
  }

  showLoading = (loadingMsg?: string) => {
    this.setState({ isLoading: true, loadingMsg: !!loadingMsg ? loadingMsg : "" })
  }

  hideLoading = (onHidedLoading?: () => void) => {
    this.setState({ isLoading: false }, () => onHidedLoading && onHidedLoading())
  }

  showAlert = (alertOpts: GlobalAlertShowingOption) => {
    this.setState({ alertVisible: true, alertOpts })
  }

  onAlertRequestToClose = () => {
    const { alertOpts } = this.state
    alertOpts.onRequestClose && alertOpts.onRequestClose()
    this.setState({ alertVisible: false, alertOpts: DF_ALERT_OPTS })
  }

  onAlertConfirm = () => {
    const { alertOpts } = this.state
    const didSet = () => {
      setTimeout(() => {
        alertOpts.onConfirmPress && alertOpts.onConfirmPress()
      }, 200);
    }
    this.setState({ alertVisible: false, alertOpts: DF_ALERT_OPTS }, didSet)
  }

  // showFlashMessage = (
  //   message: string,
  //   description: string,
  //   type: "none" | "default" | "info" | "success" | "danger" | "warning",
  //   onPress?: () => void
  // ) => {
  //   showMessage({
  //     message,
  //     description,
  //     type,
  //     duration: 10000,
  //     onPress
  //   });
  // }

  render() {
    const { alertOpts, alertVisible, loadingMsg } = this.state;
    return (
      <>
        <NormalLoading
          isLoading={this.state.isLoading}
          text={loadingMsg}
        />
        <NormalAlert
          visible={alertVisible}
          {...alertOpts}
          onConfirmPress={this.onAlertConfirm}
          onRequestClose={this.onAlertRequestToClose}
        />
        {/* <FlashMessage position="top" /> */}
      </>
    )
  }
}