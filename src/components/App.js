import React from "react";
import { connect } from "react-redux";
import "./App.css";
import Toast from "./Toast";
import ButtonContainer from "./ButtonContainer";
import LanguageInterfaceToggle from "./LanguageInterfaceToggle";
import RulesComponent from "./RulesComponent";
import LanguageRecognitionSelector from "./LanguageRecognitionSelector";
import SpeechRecognitionComponent from "./SpeechRecognitionComponent"; // Импорт нового компонента
import {ContactUs} from "./ContactUs";
import logo from '../icons/logo.png';
function App({ interfaceLanguage }) {
  return (
    <div className="app-container">
      <div className="logo-container">
        <div>
          <img src={logo} alt="Logo" className="app-logo" />
        </div>
  
      </div>
      <LanguageInterfaceToggle />
      <div className="title">{interfaceLanguage.app_title}</div>
      <LanguageRecognitionSelector />
      <ButtonContainer />
      <SpeechRecognitionComponent />
      <Toast />
      <RulesComponent />
      <ContactUs/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  interfaceLanguage: state.transcript.interfaceLanguage,
});

export default connect(mapStateToProps)(App);
