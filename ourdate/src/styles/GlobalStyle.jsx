import { createGlobalStyle } from 'styled-components';

import theme from './theme';

const colors = theme.colors;
const lightModeGradient = `linear-gradient(to bottom, ${colors.blue3}, ${colors.ourdateWhite})`;
const darkMode = colors.darkModePrimary;
const darkModeSecondary = colors.darkModeSecondary;
const btnGrey = colors.btnGrey;
const darkModeFontColor = colors.ourdateWhite;
const lightModeFontColor = colors.ourdateBlack;
const ourdateWhite = colors.ourdateWhite;

const GlobalStyle = createGlobalStyle`
  * {
	backface-visibility: hidden !important;
	-webkit-backface-visibility: hidden !important;
}
html,
body {
    height: 100%;
    margin:0;
	/* background: linear-gradient(to bottom, ${colors.blue0}, ${colors.ourdateWhite}); */
	background: ${(props) => (props.isDarkMode ? darkMode : lightModeGradient)};
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
	font-family: ${theme.fonts.fontFamily};
	color: ${(props) => (props.isDarkMode ? colors.ourdateWhite : colors.ourdateBlack)};
	
}

.btn {
	background: ${(props) => (props.isDarkMode ? darkModeSecondary : btnGrey)};
}
.vibe-btn {
	background: ${(props) => (props.isDarkMode ? darkModeSecondary : ourdateWhite)};
	color: ${(props) => (props.isDarkMode ? darkModeFontColor : lightModeFontColor)};
}

.vibe-btn.checked {
	background-color: ${colors.blue0};
}
.vibe-btn.unChecked {
	background-color: ${colors.ourdateWhite};
	color: ${colors.black}
}

.toggle-btn {
	border-radius: 25px;
	
}

.plan-container {
	color: black;

}
.section {
	margin-top: 5rem;
	padding: 2rem;
}

.container {
	display: flex;
	justify-content: center;
	padding-block-end: 3rem;
}`;

export default GlobalStyle;
